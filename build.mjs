import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { generated, photos, site } from "./src/content.mjs";
import { renderPages } from "./src/templates.mjs";

const out = "dist";
const analytics = {
  measurementId: process.env.GA_MEASUREMENT_ID || "",
  enableVercelFallback: process.env.VERCEL_ANALYTICS === "true" || process.env.VERCEL_ANALYTICS === "1" || process.env.VERCEL === "1",
};

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "assets", "images"), { recursive: true });
await mkdir(join(out, "assets", "fonts"), { recursive: true });

const generatedPages = renderPages(analytics);
for (const page of generatedPages) {
  const destination = join(out, page.path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, page.html);
}

await copyFile("src/styles.css", join(out, "assets", "styles.css"));
await copyFile("src/main.js", join(out, "assets", "main.js"));
await copyFile("src/ocean.js", join(out, "assets", "ocean.js"));
await copyFile("node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2", join(out, "assets", "fonts", "fraunces.woff2"));
await copyFile("node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2", join(out, "assets", "fonts", "fraunces-italic.woff2"));
await copyFile("node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", join(out, "assets", "fonts", "manrope.woff2"));

for (const photo of [...photos, ...generated]) {
  const image = sharp(photo.source).rotate();
  for (const width of [480, 768, 1200]) {
    await image.clone().resize({ width, withoutEnlargement: true }).avif({ quality: 58 }).toFile(join(out, "assets", "images", `${photo.id}-${width}.avif`));
    await image.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(out, "assets", "images", `${photo.id}-${width}.webp`));
    await image.clone().resize({ width, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(out, "assets", "images", `${photo.id}-${width}.jpg`));
  }
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#0b7c96"/><path d="M9 37c12-16 23 13 46-10-8 18-27 25-46 10Z" fill="#a9f0e9"/><circle cx="46" cy="17" r="7" fill="#ff6a52"/></svg>`;
await writeFile(join(out, "assets", "favicon.svg"), favicon);
await writeFile(join(out, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`);
await writeFile(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/stay/", "/gallery/", "/location/", "/faq/", "/contact/", "/guide/"].map((path) => `<url><loc>${site.domain}${path}</loc></url>`).join("")}</urlset>`);
await writeFile(join(out, "404.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/assets/styles.css"><title>Page not found | Central Island Home</title><body class="page-sand"><main class="page-intro" id="main" style="padding:20vh 8vw"><p class="eyebrow">Lost at sea</p><h1>This page drifted out of view.</h1><p><a class="button" href="/">Return home</a></p></main></body></html>`);

console.log(`Built ${generatedPages.length} routes with ${(photos.length + generated.length) * 9} responsive image assets.`);
