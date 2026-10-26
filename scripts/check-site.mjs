import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { generated, photos } from "../src/content.mjs";

const routes = ["index.html", "stay/index.html", "gallery/index.html", "location/index.html", "faq/index.html", "contact/index.html", "guide/index.html"];
const failures = [];
for (const route of routes) {
  const path = join("dist", route);
  try { await access(path); } catch { failures.push(`${route}: missing`); continue; }
  const html = await readFile(path, "utf8");
  for (const [label, pattern] of [
    ["title", /<title>[^<]+<\/title>/], ["description", /<meta name="description"/], ["canonical", /<link rel="canonical"/],
    ["skip link", /class="skip-link"/], ["main", /<main id="main" tabindex="-1">/], ["h1", /<h1>.+<\/h1>/],
    ["footer", /<footer>/], ["Guesty fallback", /jtaylormade\.guestybookings\.com\/en/],
  ]) if (!pattern.test(html)) failures.push(`${route}: missing ${label}`);
  if (route === "contact/index.html" && !/id="contact-form"/.test(html)) failures.push(`${route}: missing contact form`);
  for (const img of html.matchAll(/<img\s+([^>]+)>/g)) {
    if (!/alt="[^"]*"/.test(img[1])) failures.push(`${route}: image missing alt`);
    if (!/width="\d+"/.test(img[1]) || !/height="\d+"/.test(img[1])) failures.push(`${route}: image missing dimensions`);
  }
}
for (const required of ["assets/styles.css", "assets/main.js", "assets/ocean.js", "robots.txt", "sitemap.xml", "assets/fonts/fraunces.woff2", "assets/fonts/fraunces-italic.woff2", "assets/fonts/manrope.woff2"]) {
  try { await access(join("dist", required)); } catch { failures.push(`${required}: missing`); }
}
const expected = (photos.length + generated.length) * 9;
const imageFiles = await readdir(join("dist", "assets", "images"));
if (imageFiles.length !== expected) failures.push(`expected ${expected} responsive images, found ${imageFiles.length}`);
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`Validated ${routes.length} routes and ${imageFiles.length} responsive images.`);
