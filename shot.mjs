import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: "hero.png" });

await page.evaluate(() => window.scrollTo(0, 300));
await page.waitForTimeout(300);
await page.screenshot({ path: "nav-scrolled.png" });

const sneak = await page.$("#home ~ * .sneak-peek, .sneak-peek");
if (sneak) {
  await sneak.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "sneak-peek.png" });
}

await browser.close();
