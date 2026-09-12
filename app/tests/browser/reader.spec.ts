import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';

const pages = JSON.parse(fs.readFileSync('src/lib/server/generated/pages.json', 'utf8'));
async function ready(page: Page, path = '/chapter-0.html') {
  await page.goto(path);
  await page.waitForFunction(() => document.body.dataset.readingReady === 'true');
}
function audio(seconds = 24) {
  const samples = 24000 * seconds,
    wav = Buffer.alloc(44 + samples * 2);
  wav.write('RIFF');
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(24000, 24);
  wav.writeUInt32LE(48000, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write('data', 36);
  wav.writeUInt32LE(samples * 2, 40);
  return wav.toString('base64');
}
async function providers(page: Page) {
  const requests: { provider: string; body: Record<string, unknown> }[] = [];
  await page.addInitScript(() =>
    sessionStorage.setItem(
      'gr-study-settings',
      JSON.stringify({
        openaiKey: 'test-openai',
        elevenKey: 'test-eleven',
        voiceId: 'test-voice',
        model: 'test-model'
      })
    )
  );
  await page.route('https://api.openai.com/**', async (route) => {
    const body = route.request().postDataJSON();
    requests.push({ provider: 'openai', body });
    const content = body.response_format
      ? JSON.stringify({
          passages: JSON.parse(body.messages.at(-1).content).requested.map((p: { id: string }) => ({
            id: p.id,
            text: 'The equation relates the changing position to the measured acceleration.'
          }))
        })
      : 'The metric $g_{\\mu\\nu}$ tells us how to measure. <img src=x onerror="window.injected=true">';
    await route.fulfill({
      json: { choices: [{ finish_reason: 'stop', message: { role: 'assistant', content } }] }
    });
  });
  await page.route('https://api.elevenlabs.io/**', async (route) => {
    const body = route.request().postDataJSON();
    requests.push({ provider: 'eleven', body });
    const characters = Array.from(body.text as string);
    await route.fulfill({
      json: {
        audio_base64: audio(),
        alignment: {
          characters,
          character_start_times_seconds: characters.map((_, i) => (i * 24) / characters.length),
          character_end_times_seconds: characters.map((_, i) => ((i + 1) * 24) / characters.length)
        }
      }
    });
  });
  return requests;
}
test('equations stay inline at desktop and mobile widths', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await ready(page, '/course-map.html');
    const item = page
      .locator('.skill-preparation li')
      .filter({ has: page.locator('a', { hasText: 'A law needs a starting state' }) })
      .first();
    await expect(item).toBeVisible();
    const height = await item.evaluate((el) => el.getBoundingClientRect().height);
    expect(height).toBeLessThan(220);
    expect(
      await item
        .locator('.katex-html .mord')
        .first()
        .evaluate((el) => getComputedStyle(el).display)
    ).not.toBe('block');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true
    );
  }
});
test('assistant leaves a readable book column and closing it restores reading geometry', async ({
  page
}) => {
  await ready(page);
  await page.locator('#main h3').first().scrollIntoViewIfNeeded();
  const before = await page.locator('#main').boundingBox();
  const y = await page.evaluate(() => scrollY);
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Study companion' })).toBeVisible();
  const after = await page.locator('#main').boundingBox();
  const companion = await page.getByRole('dialog', { name: 'Study companion' }).boundingBox();
  expect(after!.x + after!.width).toBeLessThan(companion!.x);
  expect(after!.width).toBeGreaterThan(480);
  expect(await page.locator('#main').evaluate((el) => el.closest('[inert]'))).toBeNull();
  await page.getByRole('button', { name: 'Close study companion' }).click();
  await expect.poll(async () => Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThan(2);
  expect((await page.locator('#main').boundingBox())?.width).toBe(before?.width);
  expect(await page.getByRole('button', { name: /Minimize/ }).count()).toBe(0);
});
test('chat survives navigation and renders safe mathematics', async ({ page }) => {
  await providers(page);
  await ready(page);
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await page.getByLabel('Ask a question', { exact: true }).fill('What is the metric?');
  await page.getByRole('button', { name: 'Send question' }).click();
  await expect(page.locator('.message.assistant .katex')).toBeVisible();
  expect(await page.evaluate(() => Reflect.get(window, 'injected'))).toBeUndefined();
  await page.getByRole('button', { name: 'Close study companion' }).click();
  await page.locator('.chapters a[href$="chapter-1.html"]').click();
  await expect(page).toHaveURL(/chapter-1.html$/);
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await expect(page.locator('.message.user')).toHaveText(/What is the metric/);
  await expect(page.locator('.message.assistant .katex')).toBeVisible();
});
test('narration batches source passages, buffers continuity, pauses and survives navigation', async ({
  page
}) => {
  const requests = await providers(page);
  await ready(page);
  await page.getByRole('button', { name: 'Listen', exact: true }).click();
  await page.getByRole('button', { name: 'From the beginning' }).click();
  await expect(page.getByRole('button', { name: 'Pause narration', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close study companion' }).click();
  await expect
    .poll(() => requests.filter((r) => r.provider === 'eleven').length)
    .toBeGreaterThan(1);
  const clips = requests.filter((r) => r.provider === 'eleven');
  expect((clips[0].body.text as string).length).toBeGreaterThan(500);
  expect(clips[1].body.previous_text).toBeTruthy();
  expect(await page.locator('.audio-progress').count()).toBe(0);
  await page.getByRole('button', { name: 'Pause narration', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume narration', exact: true })).toBeVisible();
  await page.locator('.chapters a[href$="chapter-1.html"]').click();
  await expect(page).toHaveURL(/chapter-1.html$/);
  await page.getByRole('button', { name: 'Resume narration', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause narration', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Stop narration' }).click();
  await expect(page.getByRole('button', { name: 'Stop narration' })).toHaveCount(0);
});
test('temporary provider errors are retried quietly and failures retain details', async ({
  page
}) => {
  await providers(page);
  let count = 0;
  await page.route('https://api.openai.com/**', async (route) => {
    count++;
    if (count === 1)
      return route.fulfill({
        status: 503,
        json: { error: { message: 'Temporarily unavailable' } }
      });
    return route.fulfill({
      json: { choices: [{ message: { role: 'assistant', content: 'A recovered answer.' } }] }
    });
  });
  await ready(page);
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await page.getByLabel('Ask a question', { exact: true }).fill('Explain this.');
  await page.getByRole('button', { name: 'Send question' }).click();
  await expect(page.getByText('A recovered answer.')).toBeVisible();
  expect(count).toBe(2);
  await expect(page.locator('.issue-notice')).toHaveCount(0);
  await page.route('https://api.openai.com/**', (route) =>
    route.fulfill({
      status: 400,
      headers: { 'x-request-id': 'req-test' },
      json: { error: { message: 'Unsupported model parameter' } }
    })
  );
  await page.getByLabel('Ask a question', { exact: true }).fill('Try another question.');
  await page.getByRole('button', { name: 'Send question' }).click();
  await expect(page.locator('.issue-notice')).toBeVisible();
  await page.getByText('Details', { exact: true }).click();
  await expect(page.getByText('Unsupported model parameter')).toBeVisible();
});
test('learning checks and notebook interactions still work', async ({ page }) => {
  await ready(page, '/course-map.html');
  const root = page.locator('[data-diagnostic="initial-data-and-oscillations"]');
  await root.locator(':scope>summary').click();
  await root.locator('input').fill('3');
  await root.getByRole('button', { name: 'Check', exact: true }).click();
  await expect(root.locator('[role=status]')).toContainText('example checks');
  await page.getByRole('link', { name: 'Field notebook', exact: true }).click();
  await page.locator('[data-journal]').fill('A note preserved through navigation.');
  await page.locator('[data-journal]').blur();
  await page.reload();
  await expect(page.locator('[data-journal]')).toHaveValue('A note preserved through navigation.');
});
test('every chapter and appendix is a valid SvelteKit route', async ({ request }) => {
  for (const id of Object.keys(pages)) {
    const response = await request.get(`/${id}.html`);
    expect(response.status(), id).toBe(200);
    const text = await response.text();
    expect(text).toContain('id="main"');
  }
});

test('mobile controls remain named and spoken edits are used on replay', async ({ page }) => {
  const requests = await providers(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  await page.getByRole('button', { name: 'Listen', exact: true }).click();
  await page.getByRole('button', { name: 'From the beginning' }).click();
  await expect(page.locator('.listening-settings blockquote')).toBeVisible();
  await page.getByText('Spoken explanations', { exact: true }).click();
  await page.getByRole('button', { name: 'Edit spoken passage' }).click();
  await page
    .getByLabel('Spoken passage', { exact: true })
    .fill('A revised spoken explanation of this passage.');
  await page.getByRole('button', { name: 'Save and replay' }).click();
  await expect
    .poll(() =>
      requests.some(
        (r) =>
          r.provider === 'eleven' && String(r.body.text).includes('A revised spoken explanation')
      )
    )
    .toBe(true);
  await page.getByRole('button', { name: 'Close study companion' }).click();
  await page.getByRole('button', { name: 'Stop narration' }).click();
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Study companion' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true
  );
});

test('stopping narration cancels a pending provider result', async ({ page }) => {
  await providers(page);
  let sent = false;
  let resolve!: () => void;
  const release = new Promise<void>((r) => (resolve = r));
  await page.route('https://api.elevenlabs.io/**', async (route) => {
    sent = true;
    await release;
    await route
      .fulfill({
        json: {
          audio_base64: audio(),
          alignment: {
            characters: [],
            character_start_times_seconds: [],
            character_end_times_seconds: []
          }
        }
      })
      .catch(() => {});
  });
  await ready(page);
  await page.getByRole('button', { name: 'Listen', exact: true }).click();
  await page.getByRole('button', { name: 'From the beginning' }).click();
  await expect.poll(() => sent).toBe(true);
  await page.getByRole('button', { name: 'Close study companion' }).click();
  await page.getByRole('button', { name: 'Stop narration' }).click();
  resolve();
  await expect(page.locator('.compact-player')).toHaveCount(0);
  await page.waitForTimeout(150);
  await expect(page.locator('.compact-player')).toHaveCount(0);
});
