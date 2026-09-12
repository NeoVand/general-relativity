import { test, expect } from '@playwright/test';

test('Earth texture loads and authored call-to-action colors retain contrast', async ({ page }) => {
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failed.push(response.url());
  });
  await page.goto('/');
  await expect(page.locator('[data-scene="earth"]')).toHaveAttribute('data-texture', 'ready');
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    const contrast = await page.locator('.start-link').evaluate((el) => {
      const css = getComputedStyle(el);
      const luminance = (color: string) => {
        const channels = color
          .match(/[\d.]+/g)!
          .slice(0, 3)
          .map(Number)
          .map((n) => n / 255)
          .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
        return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
      };
      const a = luminance(css.color),
        b = luminance(css.backgroundColor);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    });
    expect(contrast).toBeGreaterThan(4.5);
  }
  expect(failed).toEqual([]);
});

test('grouped icon sidebar collapses, previews chapters, and remembers the rail', async ({
  page
}) => {
  await page.goto('/chapter-23.html');
  await expect(page.getByRole('button', { name: 'Further paths', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  await expect(page.locator('.group-toggle .nav-glyph svg')).toHaveCount(7);
  await page.getByRole('button', { name: 'Collapse contents', exact: true }).click();
  await expect(page.locator('.reader-sidebar')).toHaveClass(/rail/);
  await expect
    .poll(async () => Math.round((await page.locator('.reader-sidebar').boundingBox())!.width))
    .toBe(68);
  await page.getByRole('button', { name: 'Foundations', exact: true }).hover();
  await expect(page.getByRole('navigation', { name: 'Foundations chapters' })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Foundations chapters' })
    .getByRole('link', { name: /Measurements and motion/ })
    .click();
  await expect(page).toHaveURL(/chapter-0.html$/);
  await page.reload();
  await expect(page.locator('.reader-sidebar')).toHaveClass(/rail/);
  await page.getByRole('button', { name: 'Expand contents', exact: true }).click();
  await expect(page.locator('.reader-sidebar')).not.toHaveClass(/rail/);
  await expect(page.getByRole('button', { name: 'Foundations', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
});

test('search stays in the header and Ask and Listen precede appearance controls', async ({
  page
}) => {
  await page.goto('/chapter-0.html');
  const ask = await page.getByRole('button', { name: 'Ask', exact: true }).boundingBox();
  const listen = await page.getByRole('button', { name: 'Listen', exact: true }).boundingBox();
  const type = await page.getByRole('button', { name: 'Larger text' }).boundingBox();
  expect(ask!.x).toBeLessThan(type!.x);
  expect(listen!.x).toBeLessThan(type!.x);
  await page.getByRole('button', { name: 'Search the book', exact: true }).click();
  const search = page.getByRole('combobox', { name: 'Search the book' });
  await search.fill('curvature');
  await expect(page.getByRole('option').first()).toBeVisible();
  const input = await search.boundingBox();
  const header = await page.locator('.reader-header').boundingBox();
  expect(input!.y + input!.height).toBeLessThan(header!.height);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await search.press('ArrowDown');
  await search.press('Enter');
  await expect(search).toHaveCount(0);
});

test('equation tools float without adding a row, and the book works while chat stays open', async ({
  page
}) => {
  await page.goto('/chapter-0.html');
  await page.waitForFunction(() => document.body.dataset.readingReady === 'true');
  const equation = page
    .locator('.equation:visible')
    .filter({ has: page.locator('.passage-tools') })
    .first();
  await equation.scrollIntoViewIfNeeded();
  await equation.hover();
  const tools = equation.locator('.passage-tools');
  await expect(tools).toHaveCSS('position', 'absolute');
  const before = (await equation.boundingBox())!.height;
  await tools.evaluate((el) => ((el as HTMLElement).style.display = 'none'));
  expect((await equation.boundingBox())!.height).toBeCloseTo(before, 1);
  await tools.evaluate((el) => ((el as HTMLElement).style.display = ''));
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await page
    .locator('.lesson-depths:visible')
    .first()
    .getByRole('tab', { name: 'Work it out' })
    .click();
  await expect(
    page.locator('.lesson-depths:visible').first().getByRole('tab', { name: 'Work it out' })
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('dialog', { name: 'Study companion' })).toBeVisible();
  const book = await page.locator('#main').boundingBox(),
    chat = await page.getByRole('dialog').boundingBox();
  expect(book!.x + book!.width).toBeLessThan(chat!.x);
});

test('Listen is compact with aligned controls and mobile chat leaves the book visible', async ({
  page
}) => {
  await page.goto('/chapter-23.html');
  await page.getByRole('button', { name: 'Listen', exact: true }).click();
  const panel = await page.getByRole('dialog').boundingBox();
  expect(panel!.width).toBeLessThan(400);
  expect(panel!.height).toBeLessThan(540);
  const toggle = page.getByLabel('Follow the passage');
  expect((await toggle.boundingBox())!.width).toBeLessThan(20);
  await page.getByRole('button', { name: 'Close study companion' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  const mobile = await page.getByRole('dialog').boundingBox();
  expect(mobile!.height).toBeLessThan(520);
  expect(mobile!.y).toBeGreaterThan(280);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
