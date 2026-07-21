import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.BASE_URL || "http://localhost:3000";
const routes = ["/", "/stay/", "/gallery/", "/location/", "/faq/", "/guide/"];
const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const route of routes) {
    const errors = [];
    const onError = (error) => errors.push(error.message);
    page.on("pageerror", onError);
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    if (!response?.ok()) failures.push(`${viewport.width}px ${route}: HTTP ${response?.status()}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) failures.push(`${viewport.width}px ${route}: horizontal page overflow`);
    // Guesty's third-party select markup currently reports aria-allowed-attr/tabindex.
    // Keep it in the manual booking-flow review, but gate code owned by this repository here.
    // Third-party Guesty embeds (widget + booking iframe) stay in manual review.
    const results = await new AxeBuilder({ page }).exclude("#search-widget_IO312PWQ").exclude(".calendar-frame").analyze();
    const severe = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    if (severe.length) failures.push(`${viewport.width}px ${route}: axe ${severe.map((item) => `${item.id} [${item.nodes.map((node) => node.target.join(" ")).join("; ")}]`).join(", ")}`);
    if (errors.length) failures.push(`${viewport.width}px ${route}: page errors ${errors.join("; ")}`);
    page.off("pageerror", onError);
  }
  await context.close();
}

await browser.close();
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`Browser audit passed for ${routes.length} routes at mobile and desktop viewports.`);
