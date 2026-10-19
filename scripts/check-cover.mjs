import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch({
  headless: true,
  ...(process.platform === 'win32' && { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' })
});
const errors = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:3000/');
    await page.locator('.cover-objects canvas').waitFor();
    assert.equal(await page.locator('.cover-objects').getAttribute('data-letters'), 'PORTFOLIO');
    await page.mouse.click(width - 50, 180);
    assert.equal(await page.locator('.cover-objects').getAttribute('data-state'), 'revealed');
    await page.mouse.click(width - 50, 180);
    assert.equal(await page.locator('.cover-objects').getAttribute('data-state'), 'floating');
    await page.mouse.move(width - 50, 180);
    await page.mouse.down();
    await page.mouse.move(width / 2, 210, { steps: 20 });
    await page.mouse.up();
    assert.equal(await page.locator('.cover-objects').getAttribute('data-state'), 'floating');
    await page.locator('.text-type[data-complete]').waitFor();
    await page.locator('.cover-enter').click();
    await page.waitForURL('**/folders');
    assert.equal(await page.locator('.cover-objects canvas').count(), 0);
    await page.close();
  }
  const reduced = await browser.newPage({ reducedMotion: 'reduce' });
  await reduced.goto('http://127.0.0.1:3000/');
  await reduced.locator('.text-type[data-complete]').waitFor();
  assert.equal(await reduced.locator('.cover-objects canvas').count(), 0);
  assert.deepEqual(errors, []);
  console.log('Cover interaction checks passed.');
} finally {
  await browser.close();
}
