// Generates decorative sea/sand textures via the OpenAI Images API.
// Property imagery is never generated (see AGENTS.md) — these are ambient
// backgrounds only. Output: src/generated/*.png (processed by build.mjs).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const env = Object.fromEntries(
  (await readFile(".env.local", "utf8")).split("\n").filter((l) => l.includes("=")).map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);
const key = env.OPENAI_API_KEY;
if (!key) { console.error("OPENAI_API_KEY missing from .env.local"); process.exit(1); }

const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
const models = await fetch("https://api.openai.com/v1/models", { headers }).then((r) => r.json());
const ids = (models.data ?? []).map((m) => m.id);
const model = ["gpt-image-2", "gpt-image-1.5", "gpt-image-1"].find((m) => ids.includes(m));
if (!model) { console.error("No gpt-image model on this key. Image models:", ids.filter((i) => i.includes("image")).join(", ") || "none"); process.exit(1); }
console.log("Using model:", model);

const assets = [
  {
    id: "seafloor-sand",
    size: "1536x1024",
    prompt:
      "Photograph taken looking straight down through crystal-clear shallow Caribbean water at rippled white-gold sand on the seafloor. Bright natural caustic light webs dance across the sand. Pale turquoise water tint. No fish, no objects, no people, no text. Even lighting, seamless natural texture, photorealistic, serene.",
  },
  {
    id: "sea-horizon",
    size: "1536x1024",
    prompt:
      "Serene minimalist photograph of the open Caribbean sea near Tulum, Mexico, seen from just above the surface. Vivid gradient from pale luminous aqua shallows in the foreground to deep saturated turquoise-teal at the horizon. Gentle glassy swell, soft hazy sky occupying the top fifth. No boats, no people, no birds, no text. Luminous, tranquil, high clarity.",
  },
  {
    id: "lagoon-aerial",
    size: "1024x1536",
    prompt:
      "Aerial drone photograph looking straight down at a turquoise Caribbean lagoon in Mexico. Abstract painterly gradients of pale aqua, mint, and deep teal, with soft white sandbars and delicate wave texture threading through. No boats, no people, no buildings, no text. Luminous and clean, like a living watercolor.",
  },
];

await mkdir("src/generated", { recursive: true });
for (const a of assets) {
  console.log("Generating", a.id, "…");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers,
    body: JSON.stringify({ model, prompt: a.prompt, size: a.size, quality: "high", n: 1 }),
  });
  const data = await res.json();
  if (!res.ok) { console.error(a.id, "failed:", data.error?.message ?? res.status); process.exit(1); }
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) { console.error(a.id, "no image data returned"); process.exit(1); }
  await writeFile(join("src/generated", `${a.id}.png`), Buffer.from(b64, "base64"));
  console.log("Saved src/generated/" + a.id + ".png");
}
console.log("Done.");
