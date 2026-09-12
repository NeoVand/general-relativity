import { expect, test } from '@playwright/test';

test('sidebar toggle and icon column remain stable on every frame of opening and closing', async ({
  page
}) => {
  await page.goto('/chapter-23.html');
  const toggle = page.locator('.nav-toggle');
  await expect(toggle).toBeEnabled();
  for (const direction of ['close', 'open']) {
    const frames = await page.evaluate(async () => {
      const sidebar = document.querySelector('.reader-sidebar')!;
      const glyphs = [...sidebar.querySelectorAll('.nav-toggle svg, .group-toggle .nav-glyph svg')];
      const samples: {
        width: number;
        margin: number;
        icons: { x: number; y: number; width: number; height: number }[];
      }[] = [];
      // Let the initial layout paint before starting a CSS transition.
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      sidebar.getBoundingClientRect();
      (document.querySelector('.nav-toggle') as HTMLButtonElement).click();
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const frame = () => {
          samples.push({
            width: sidebar.getBoundingClientRect().width,
            margin: parseFloat(
              getComputedStyle(document.querySelector('.reader-page')!).marginLeft
            ),
            icons: glyphs.map((icon) => {
              const { x, y, width, height } = icon.getBoundingClientRect();
              return { x, y, width, height };
            })
          });
          if (performance.now() - start < 350) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
      });
      return samples;
    });
    expect(frames.filter((frame) => frame.width > 69 && frame.width < 287).length).toBeGreaterThan(
      1
    );
    for (const [index, frame] of frames.entries()) {
      expect(Math.abs(frame.width - frame.margin)).toBeLessThan(1);
      for (const [iconIndex, icon] of frame.icons.entries()) {
        expect(icon.width).toBe(20);
        expect(icon.height).toBe(20);
        expect(icon.x + icon.width / 2).toBe(34);
        // Chapter groups can move vertically as children reveal, but never reverse direction.
        if (index > 0) {
          const delta = icon.y - frames[index - 1].icons[iconIndex].y;
          if (direction === 'open') expect(delta).toBeGreaterThanOrEqual(-0.1);
          else expect(delta).toBeLessThanOrEqual(0.1);
        }
      }
      expect(frame.icons[0].y).toBe(frames[0].icons[0].y);
      expect(frame.icons[1].y).toBe(frames[0].icons[1].y);
    }
    expect(frames.at(-1)!.width).toBe(direction === 'open' ? 288 : 68);
    if (direction === 'close') {
      await expect(toggle).toHaveAccessibleName('Expand contents');
      await expect(page.locator('.chapter-reveal.shown')).toHaveCount(0);
      expect(
        await page
          .locator('.chapter-reveal')
          .evaluateAll((els) => els.every((el) => (el as HTMLElement).inert))
      ).toBe(true);
    }
  }
});

test('collapsed icons survive keyboard focus, scrolling, rapid toggles and reduced motion', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/chapter-23.html');
  const toggle = page.locator('.nav-toggle');
  await toggle.click();
  await expect(page.locator('.reader-sidebar')).toHaveCSS('width', '68px');
  await expect(page.locator('.sidebar-copy').first()).toHaveCSS('visibility', 'hidden');
  await page.getByRole('button', { name: 'Reference', exact: true }).focus();
  await page.keyboard.press('Escape');
  await page
    .locator('.group-toggle')
    .last()
    .evaluate((el) => el.scrollIntoView({ inline: 'center', block: 'nearest' }));
  expect((await toggle.locator('svg').boundingBox())!.x).toBe(24);
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.reader-sidebar')).toHaveCSS('width', '288px');
  await page.evaluate(async () => {
    for (let i = 0; i < 5; i++) {
      (document.querySelector('.nav-toggle') as HTMLButtonElement).click();
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  });
  await expect(page.locator('.reader-sidebar')).toHaveCSS('width', '68px');
  expect((await toggle.locator('svg').boundingBox())!.width).toBe(20);
  await expect(page.locator('.chapter-reveal').first()).toHaveCSS('visibility', 'hidden');
});

test('header has translucent frosted glass in both themes while the book scrolls underneath', async ({
  page
}) => {
  await page.goto('/chapter-23.html');
  await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }));
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
    const glass = await page.locator('.reader-header').evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        background: style.backgroundColor,
        filter: style.backdropFilter,
        top: el.getBoundingClientRect().top
      };
    });
    expect(glass.filter).toContain('blur(20px)');
    expect(glass.background).toMatch(/\/ 0\.(65|78)\)/);
    expect(glass.top).toBe(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(200);
  }
});

test('mobile contents opens and closes with the sidebar toggle visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/chapter-23.html');
  await page.locator('.mobile-menu').click();
  const sidebar = page.locator('.reader-sidebar');
  await expect(sidebar).toHaveClass(/open/);
  await expect(page.locator('.nav-toggle')).toBeVisible();
  expect((await page.locator('.nav-toggle svg').boundingBox())!.width).toBe(20);
  await page.locator('.nav-toggle').click();
  await expect(sidebar).not.toHaveClass(/open/);
  await expect(sidebar).toHaveAttribute('inert', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
