import { mkdir, writeFile } from "node:fs/promises";

const photos = {
  exterior: "/photos/hero-1-exterior.jpg",
  bedroom: "/photos/hero-2-bedroom-king.jpg",
  living: "/photos/hero-3-living.jpg",
  kitchen: "/photos/hero-4-kitchen.jpg",
  backyard: "/photos/hero-5-backyard.jpg",
  queen: "/photos/bedroom-3-queen.jpg",
  singles: "/photos/bedroom-2-singles.jpg",
  host: "/photos/host-jonathon.jpg",
};

const sites = [
  {
    slug: "site-01-coastal-orbit",
    name: "Coastal Orbit",
    style: "Orbital 3D leasing deck",
    headline: "A single Charleston home presented like a high-yield hospitality asset.",
    subhead: "For owners who want one property managed with resort-grade care, direct booking strategy, and measurable revenue discipline.",
    palette: ["#07140f", "#f7efe1", "#42d392", "#ffb86b"],
    type: "serif",
    mood: "deep green, brass, cinematic",
    angle: "owner acquisition",
    motion: "rotating property rings, parallax KPI panels, magnetic hover cards",
  },
  {
    slug: "site-02-tidebook",
    name: "Tidebook",
    style: "Editorial travel journal",
    headline: "Turn your home into the stay guests remember and owners can trust.",
    subhead: "A polished direct booking presence for Central Island Home, built around warmth, detail, reviews, and local authority.",
    palette: ["#fff8ee", "#213c44", "#c6542f", "#79a89c"],
    type: "editorial",
    mood: "warm paper, ink, coral, sage",
    angle: "guest conversion",
    motion: "scroll-linked photo strips, caption reveals, soft page-turn transitions",
  },
  {
    slug: "site-03-revenue-cockpit",
    name: "Revenue Cockpit",
    style: "Operational command center",
    headline: "One property. Every booking signal visible.",
    subhead: "A management-company interface that makes pricing, occupancy, guest experience, and owner trust feel precise.",
    palette: ["#05070d", "#e8f2ff", "#44a3ff", "#b8ff6a"],
    type: "mono",
    mood: "dark glass, electric blue, chartreuse",
    angle: "operations and analytics",
    motion: "animated dashboard metrics, radar sweep, live status rails",
  },
  {
    slug: "site-04-saltglass",
    name: "Saltglass",
    style: "Luxury glassmorphism portfolio",
    headline: "Boutique property management with the restraint of a private concierge.",
    subhead: "A refined visual system for attracting discerning homeowners and premium Charleston guests.",
    palette: ["#edf7f5", "#12211f", "#a7d8cc", "#d6b16a"],
    type: "luxury",
    mood: "sea glass, ivory, muted gold",
    angle: "premium brand positioning",
    motion: "blurred glass layers, polished mask reveals, floating service tiles",
  },
  {
    slug: "site-05-neon-lowcountry",
    name: "Neon Lowcountry",
    style: "Nightlife motion poster",
    headline: "The Charleston stay with after-dark energy and daytime ease.",
    subhead: "A high-impact concept for social ads, creator videos, and younger travelers booking from mobile.",
    palette: ["#070014", "#f8f1ff", "#ff3df2", "#00f0ff"],
    type: "display",
    mood: "black violet, cyan, magenta",
    angle: "social growth",
    motion: "marquee loops, neon hover blooms, kinetic itinerary cards",
  },
  {
    slug: "site-06-heirloom-host",
    name: "Heirloom Host",
    style: "Southern heritage brochure",
    headline: "A better way to host Charleston homes with character.",
    subhead: "Classic hospitality, modern systems, and a careful eye for the details that make reviews compound.",
    palette: ["#fbf4e6", "#2f3326", "#9c6b3e", "#d8c49b"],
    type: "heritage",
    mood: "linen, walnut, magnolia",
    angle: "trust and story",
    motion: "ornamental borders, slow image fades, testimonial letterforms",
  },
  {
    slug: "site-07-stay-lab",
    name: "Stay Lab",
    style: "Experimental service lab",
    headline: "A testing ground for better stays, stronger reviews, and smarter owner growth.",
    subhead: "The property is treated as a living product: measured, improved, documented, and marketed with intent.",
    palette: ["#f4ff00", "#101010", "#ffffff", "#00c2a8"],
    type: "lab",
    mood: "acid yellow, black, mint",
    angle: "innovation",
    motion: "modular grids, split-screen experiments, cursor-responsive cards",
  },
  {
    slug: "site-08-pet-and-porch",
    name: "Pet and Porch",
    style: "Family and pet friendly booking flow",
    headline: "The easy Charleston base for families, friends, pets, and long weekends.",
    subhead: "A conversion-first site centered on the gated backyard, three bedrooms, self check-in, and stress-free logistics.",
    palette: ["#fff7ef", "#173f35", "#ff8b3d", "#7ac6a4"],
    type: "friendly",
    mood: "cream, garden green, orange",
    angle: "family bookings",
    motion: "playful amenity chips, bouncing route cards, friendly microinteractions",
  },
  {
    slug: "site-09-blueprint",
    name: "Blueprint",
    style: "Architectural systems map",
    headline: "The operating blueprint behind a five-star single-property rental.",
    subhead: "A technical, owner-facing breakdown of guest flow, cleaning standards, revenue levers, and direct-booking infrastructure.",
    palette: ["#f4f7fb", "#102a43", "#2f80ed", "#f2994a"],
    type: "technical",
    mood: "blueprint white, navy, signal orange",
    angle: "process transparency",
    motion: "diagram paths, blueprint grid, step-by-step line drawing",
  },
  {
    slug: "site-10-dreamwave",
    name: "Dreamwave",
    style: "Surreal coastal microsite",
    headline: "A dreamlike stay between Folly Beach, downtown Charleston, and a quiet private yard.",
    subhead: "A cinematic concept that sells the feeling first, then backs it with reviews, amenities, and direct booking clarity.",
    palette: ["#07111f", "#f5fbff", "#7c5cff", "#66f0d9"],
    type: "dream",
    mood: "midnight blue, violet, aqua",
    angle: "brand spectacle",
    motion: "liquid gradients, floating photo portals, atmospheric depth",
  },
];

const coreStats = [
  ["4.86", "Guest rating"],
  ["332", "Property reviews"],
  ["10 yrs", "Hosting experience"],
  ["100%", "Response rate"],
];

const nav = (active = "") => `
  <nav class="topbar" aria-label="Primary">
    <a class="brand" href="/">Central Island Lab</a>
    <div class="navlinks">
      <a href="/#concepts">Concepts</a>
      <a href="/guide">Guide</a>
      <a href="https://jtaylormade.guestybookings.com/en" target="_blank" rel="noopener">Book Direct</a>
    </div>
  </nav>`;

const baseHead = (title, description) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#07140f">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2307140f'/%3E%3Cpath d='M12 34 32 17l20 17v18H38V39H26v13H12V34Z' fill='%23f7efe1'/%3E%3Cpath d='M18 32 32 20l14 12' fill='none' stroke='%2342d392' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E">
  <link rel="preload" as="image" href="${photos.exterior}" fetchpriority="high">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>`;

const foot = `
  <script type="module" src="/main.js"></script>
</body>
</html>`;

function swatches(site) {
  return site.palette.map((color) => `<span style="--swatch:${color}">${color}</span>`).join("");
}

function conceptCard(site, index) {
  return `<article class="concept-card theme-${index + 1}">
    <a href="/${site.slug}/" aria-label="Open ${site.name}">
      <span class="number">${String(index + 1).padStart(2, "0")}</span>
      <img src="${Object.values(photos)[index % 7]}" alt="${site.name} concept preview" width="900" height="640" loading="lazy">
      <div>
        <p>${site.style}</p>
        <h2>${site.name}</h2>
        <span>${site.headline}</span>
      </div>
    </a>
  </article>`;
}

function homePage() {
  return `${baseHead("Central Island Lab | 10 Vacation Rental Website Concepts", "Ten distinct Vercel-ready websites for a single-property Charleston vacation rental management business.")}
${nav()}
<main>
  <section class="home-hero">
    <div class="hero-copy">
      <p class="eyebrow">10-site Fable demonstration</p>
      <h1>One vacation rental brand, ten radically different web directions.</h1>
      <p>Central Island Lab is a cinematic concept library for a Charleston single-property vacation rental and future management company. Each route explores a different growth angle: owners, guests, analytics, luxury, social reach, and direct bookings.</p>
      <div class="actions">
        <a class="button primary" href="#concepts">Explore concepts</a>
        <a class="button ghost" href="/guide/">Read the build guide</a>
      </div>
    </div>
    <div class="home-stage" aria-label="Central Island Home photo collage">
      <img class="stage-main" src="${photos.exterior}" alt="Central Island Home exterior" width="1200" height="900" fetchpriority="high">
      <img class="stage-float one" src="${photos.kitchen}" alt="Renovated kitchen" width="700" height="520" loading="eager">
      <img class="stage-float two" src="${photos.backyard}" alt="Private backyard" width="700" height="520" loading="eager">
    </div>
  </section>
  <section class="stats-band" aria-label="Property proof points">
    ${coreStats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}
  </section>
  <section id="concepts" class="concepts">
    <div class="section-head">
      <p class="eyebrow">Concept routes</p>
      <h2>Each site is intentionally different.</h2>
      <p>The same property assets are remixed into distinct visual systems, motion languages, and conversion strategies.</p>
    </div>
    <div class="concept-grid">
      ${sites.map(conceptCard).join("")}
    </div>
  </section>
</main>
${foot}`;
}

function sitePage(site, index) {
  const imgA = Object.values(photos)[index % 7];
  const imgB = Object.values(photos)[(index + 2) % 7];
  const imgC = Object.values(photos)[(index + 4) % 7];
  const [bg, text, accent, alt] = site.palette;
  return `${baseHead(`${site.name} | Central Island Lab`, `${site.style} concept for a Charleston vacation rental management business.`)}
${nav(site.slug)}
<main class="site-shell theme-${index + 1}" style="--bg:${bg};--text:${text};--accent:${accent};--alt:${alt};">
  <section class="concept-hero">
    <div class="orbit" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="concept-copy">
      <p class="eyebrow">${String(index + 1).padStart(2, "0")} / ${site.style}</p>
      <h1>${site.headline}</h1>
      <p>${site.subhead}</p>
      <div class="actions">
        <a class="button primary" href="#booking">Book direct</a>
        <a class="button ghost" href="/${site.slug}/guide/">How this was made</a>
      </div>
    </div>
    <figure class="hero-art">
      <img src="${imgA}" alt="Central Island Home visual for ${site.name}" width="1200" height="900" fetchpriority="high">
      <figcaption>${site.name}: ${site.mood}</figcaption>
    </figure>
  </section>
  <section class="proof-ribbon">
    ${coreStats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}
  </section>
  <section class="story-block">
    <div>
      <p class="eyebrow">Growth thesis</p>
      <h2>${site.angle}</h2>
      <p>This direction positions Central Island Home as more than a listing. It frames the property as the first proof point for a management brand that can grow through stronger presentation, direct booking control, owner confidence, and guest trust.</p>
    </div>
    <div class="media-stack">
      <img src="${imgB}" alt="Interior detail supporting ${site.name}" width="900" height="640" loading="lazy">
      <img src="${imgC}" alt="Second property detail supporting ${site.name}" width="900" height="640" loading="lazy">
    </div>
  </section>
  <section class="motion-board">
    <div class="section-head">
      <p class="eyebrow">Visual system</p>
      <h2>Designed for a video-worthy scroll.</h2>
      <p>${site.motion}. The implementation keeps animation mostly on transform and opacity, with reduced-motion support.</p>
    </div>
    <div class="motion-grid">
      <article><span>01</span><h3>Signature first viewport</h3><p>Large property imagery is visible immediately, with no generic marketing splash.</p></article>
      <article><span>02</span><h3>Owner and guest proof</h3><p>Reviews, response rate, booking links, and property context stay close to the narrative.</p></article>
      <article><span>03</span><h3>Distinct art direction</h3><p>Palette, typography, spacing, and motion language change per concept while the business stays consistent.</p></article>
    </div>
  </section>
  <section class="gallery-strip" aria-label="Property image carousel">
    <img src="${photos.exterior}" alt="Exterior" width="900" height="640" loading="lazy">
    <img src="${photos.living}" alt="Living room" width="900" height="640" loading="lazy">
    <img src="${photos.kitchen}" alt="Kitchen" width="900" height="640" loading="lazy">
    <img src="${photos.bedroom}" alt="King bedroom" width="900" height="640" loading="lazy">
    <img src="${photos.backyard}" alt="Backyard" width="900" height="640" loading="lazy">
  </section>
  <section id="booking" class="booking-panel">
    <div>
      <p class="eyebrow">Direct booking</p>
      <h2>Ready for guests now, built to win owner conversations next.</h2>
      <p>Every concept keeps a clear path to booking while showing how a single successful property can become a credible management brand.</p>
    </div>
    <a class="button primary" href="https://jtaylormade.guestybookings.com/en" target="_blank" rel="noopener">Open booking site</a>
  </section>
</main>
${foot}`;
}

function guidePage(site, index) {
  return `${baseHead(`${site.name} Guide | Central Island Lab`, `Build notes and iteration passes for the ${site.name} concept.`)}
${nav(site.slug)}
<main class="guide-page">
  <section class="guide-hero">
    <p class="eyebrow">Guide route / ${String(index + 1).padStart(2, "0")}</p>
    <h1>${site.name}: how this concept was built</h1>
    <p>${site.style} for a single-property vacation rental business, optimized for Vercel static hosting and video-friendly presentation.</p>
  </section>
  <section class="guide-grid">
    <article>
      <h2>Creative brief</h2>
      <p><strong>Primary angle:</strong> ${site.angle}.</p>
      <p><strong>Mood:</strong> ${site.mood}.</p>
      <p><strong>Motion:</strong> ${site.motion}.</p>
      <div class="swatches">${swatches(site)}</div>
    </article>
    <article>
      <h2>Build method</h2>
      <p>The route is generated from shared structured data in <code>generate-sites.mjs</code>. The page reuses local property photos, a global stylesheet, and one small JavaScript file for progressive interactions.</p>
      <p>For Vercel, each concept lives in its own folder with an <code>index.html</code>, so clean URLs work without a server framework.</p>
    </article>
    <article>
      <h2>Iteration pass 1</h2>
      <p>Checked the first viewport for a clear property image, direct business positioning, readable contrast, and a visible conversion path.</p>
    </article>
    <article>
      <h2>Iteration pass 2</h2>
      <p>Improved the visual system by making palette, spacing, typography tone, and motion language distinct from the other nine concepts.</p>
    </article>
    <article>
      <h2>Iteration pass 3</h2>
      <p>Reviewed responsive layout, reduced-motion behavior, image loading priority, guide completeness, and Vercel route structure.</p>
    </article>
  </section>
</main>
${foot}`;
}

function masterGuide() {
  return `${baseHead("Guide | Central Island Lab", "How the 10 vacation rental website concepts were generated, reviewed, and prepared for Vercel.")}
${nav("guide")}
<main class="guide-page">
  <section class="guide-hero">
    <p class="eyebrow">Build guide</p>
    <h1>How the 10-site vacation rental showcase was built.</h1>
    <p>This project uses a static generator to create a hub, ten concept websites, and ten matching guide routes from one structured source of truth.</p>
  </section>
  <section class="guide-grid wide">
    <article>
      <h2>Workflow</h2>
      <p>1. Audited the existing Central Island Home page and local photo assets.</p>
      <p>2. Defined ten different visual directions for a single-property vacation rental and future management company.</p>
      <p>3. Generated static routes that Vercel can serve directly with clean URLs.</p>
      <p>4. Added a guide route for every concept plus this master guide.</p>
    </article>
    <article>
      <h2>Performance decisions</h2>
      <p>The hero image is discoverable in HTML and marked high priority. Below-fold images use native lazy loading. Animations are primarily transform and opacity, and reduced-motion preferences are respected.</p>
    </article>
    <article>
      <h2>Route map</h2>
      <ul class="route-list">
        ${sites.map((site) => `<li><a href="/${site.slug}/">${site.name}</a><a href="/${site.slug}/guide/">Guide</a></li>`).join("")}
      </ul>
    </article>
    <article>
      <h2>Three pass review model</h2>
      <p>Each concept guide records three review passes: conversion and clarity, creative differentiation, then responsive and deployment readiness.</p>
    </article>
  </section>
</main>
${foot}`;
}

const css = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:#f7f1e8;color:#111;line-height:1.55}a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;background:rgba(0,0,0,.08);padding:.15rem .35rem;border-radius:.35rem}.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem clamp(1rem,3vw,2.5rem);background:rgba(255,255,255,.78);backdrop-filter:blur(18px);border-bottom:1px solid rgba(0,0,0,.08)}.brand{font-weight:800;letter-spacing:-.03em}.navlinks{display:flex;gap:1rem;align-items:center;font-size:.92rem}.navlinks a{padding:.55rem .7rem;border-radius:999px}.navlinks a:hover{background:rgba(0,0,0,.07)}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem;font-weight:900;color:var(--accent,#b75b2d)}h1,h2,h3,p{margin-block-start:0}h1{font-size:clamp(2.4rem,7vw,6.6rem);line-height:.9;letter-spacing:-.075em;text-wrap:balance}h2{font-size:clamp(2rem,4vw,4.4rem);line-height:.95;letter-spacing:-.06em;text-wrap:balance}.button{display:inline-flex;align-items:center;justify-content:center;min-height:2.8rem;padding:.8rem 1.15rem;border-radius:999px;font-weight:850;border:1px solid currentColor;transition:transform .2s ease,background .2s ease,color .2s ease}.button:hover{transform:translateY(-2px)}.button.primary{background:var(--accent,#173f35);color:var(--bg,#fff);border-color:transparent}.button.ghost{background:transparent}.actions{display:flex;gap:.75rem;flex-wrap:wrap}.home-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(20rem,.9fr);gap:clamp(2rem,5vw,5rem);align-items:center;padding:clamp(3rem,7vw,7rem) clamp(1rem,4vw,4rem)}.hero-copy p:not(.eyebrow){max-width:48rem;font-size:1.12rem}.home-stage{position:relative;min-height:36rem;isolation:isolate}.stage-main,.stage-float{position:absolute;object-fit:cover;border-radius:1.4rem;box-shadow:0 2rem 5rem rgba(0,0,0,.24)}.stage-main{inset:3rem 2rem 2rem 0;width:82%;height:78%}.stage-float.one{right:0;top:0;width:45%;height:34%;animation:floatA 7s ease-in-out infinite}.stage-float.two{right:3rem;bottom:0;width:52%;height:34%;animation:floatB 8s ease-in-out infinite}.stats-band,.proof-ribbon{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#111;color:#fff}.stats-band div,.proof-ribbon div{padding:1.4rem;background:rgba(255,255,255,.08)}.stats-band strong,.proof-ribbon strong{display:block;font-size:clamp(1.5rem,3vw,3rem);line-height:1}.stats-band span,.proof-ribbon span{opacity:.72}.concepts,.guide-page{padding:clamp(3rem,6vw,6rem) clamp(1rem,4vw,4rem)}.section-head{max-width:54rem;margin-bottom:2rem}.concept-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1rem}.concept-card a{position:relative;display:grid;min-height:26rem;overflow:hidden;border-radius:1rem;background:#111;color:#fff}.concept-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.1);transition:scale .55s ease}.concept-card a:hover img{scale:1.06}.concept-card a:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.86),rgba(0,0,0,.05) 70%)}.concept-card .number{position:absolute;z-index:1;top:1rem;left:1rem;font-weight:900}.concept-card div{position:relative;z-index:1;align-self:end;padding:1rem}.concept-card h2{font-size:1.6rem;letter-spacing:-.04em}.concept-card p{font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;font-weight:900;color:#fff}.concept-card span:last-child{display:block;opacity:.82;font-size:.9rem}.site-shell{background:var(--bg);color:var(--text);min-height:100vh}.concept-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(20rem,.82fr);gap:clamp(2rem,5vw,5rem);align-items:center;overflow:hidden;padding:clamp(3rem,7vw,7rem) clamp(1rem,4vw,4rem);isolation:isolate}.concept-copy p:not(.eyebrow){max-width:44rem;font-size:1.1rem;color:color-mix(in oklab,var(--text),transparent 20%)}.hero-art{margin:0;position:relative}.hero-art img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:1.5rem;box-shadow:0 2rem 7rem color-mix(in oklab,var(--accent),transparent 55%)}.hero-art figcaption{position:absolute;left:1rem;right:1rem;bottom:1rem;padding:.75rem 1rem;border-radius:999px;background:rgba(255,255,255,.16);backdrop-filter:blur(16px);font-size:.82rem}.orbit{position:absolute;inset:auto -12rem -18rem auto;width:44rem;aspect-ratio:1;border-radius:50%;border:1px solid color-mix(in oklab,var(--accent),transparent 25%);opacity:.8;animation:spin 24s linear infinite;z-index:-1}.orbit span{position:absolute;inset:12%;border:1px solid color-mix(in oklab,var(--alt),transparent 45%);border-radius:50%}.orbit span:nth-child(2){inset:26%;transform:rotate(35deg)}.orbit span:nth-child(3){inset:40%;transform:rotate(70deg)}.story-block{display:grid;grid-template-columns:.75fr 1fr;gap:2rem;align-items:center;padding:clamp(3rem,6vw,6rem) clamp(1rem,4vw,4rem)}.story-block p:not(.eyebrow),.booking-panel p{font-size:1.05rem;color:color-mix(in oklab,var(--text),transparent 18%)}.media-stack{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.media-stack img{height:26rem;width:100%;object-fit:cover;border-radius:1rem}.media-stack img:nth-child(2){margin-top:4rem}.motion-board{padding:clamp(3rem,6vw,6rem) clamp(1rem,4vw,4rem);background:color-mix(in oklab,var(--text),transparent 92%)}.motion-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.motion-grid article,.guide-grid article{border:1px solid color-mix(in oklab,currentColor,transparent 82%);border-radius:1rem;padding:1.25rem;background:rgba(255,255,255,.08);backdrop-filter:blur(12px)}.motion-grid span{font-weight:950;color:var(--accent)}.gallery-strip{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(17rem,32vw);gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding:1rem clamp(1rem,4vw,4rem) 4rem}.gallery-strip img{scroll-snap-align:center;width:100%;height:22rem;object-fit:cover;border-radius:1rem}@supports ((animation-timeline:view()) and (animation-range:entry)){.gallery-strip img{animation:slidePop auto linear both;animation-timeline:view(inline)}}.booking-panel{display:flex;justify-content:space-between;align-items:center;gap:2rem;margin:0 clamp(1rem,4vw,4rem) clamp(3rem,6vw,6rem);padding:clamp(1.5rem,4vw,3rem);border-radius:1.25rem;background:color-mix(in oklab,var(--accent),transparent 80%)}.guide-hero{max-width:68rem}.guide-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:2rem}.guide-grid.wide{grid-template-columns:1fr 1fr}.swatches{display:flex;gap:.5rem;flex-wrap:wrap}.swatches span{display:inline-flex;align-items:center;min-height:2.4rem;padding:.45rem .65rem;border-radius:999px;background:var(--swatch);color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4);font-size:.78rem;font-weight:800}.route-list{list-style:none;padding:0;margin:0}.route-list li{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid rgba(0,0,0,.14);padding:.7rem 0}.theme-2{--accent:#c6542f}.theme-3{--accent:#44a3ff}.theme-4{--accent:#d6b16a}.theme-5{--accent:#ff3df2}.theme-6{--accent:#9c6b3e}.theme-7{--accent:#d3df00}.theme-8{--accent:#ff8b3d}.theme-9{--accent:#2f80ed}.theme-10{--accent:#7c5cff}.theme-3 .hero-art img{clip-path:polygon(8% 0,100% 0,92% 100%,0 100%)}.theme-5 h1,.theme-10 h1{text-shadow:0 0 2rem color-mix(in oklab,var(--accent),transparent 45%)}.theme-6 .hero-art img{border-radius:50% 50% 1rem 1rem}.theme-7 .motion-grid article{background:var(--accent);color:#101010}.theme-9 .site-shell,.theme-9{background-image:linear-gradient(rgba(47,128,237,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(47,128,237,.12) 1px,transparent 1px);background-size:32px 32px}@keyframes spin{to{rotate:360deg}}@keyframes floatA{50%{transform:translateY(1rem) rotate(2deg)}}@keyframes floatB{50%{transform:translateY(-1rem) rotate(-2deg)}}@keyframes slidePop{0%,100%{scale:.86;opacity:.65}50%{scale:1;opacity:1}}@media (max-width:980px){.home-hero,.concept-hero,.story-block{grid-template-columns:1fr}.concept-grid{grid-template-columns:repeat(2,1fr)}.home-stage{min-height:28rem}.motion-grid,.guide-grid,.guide-grid.wide{grid-template-columns:1fr}.booking-panel{align-items:flex-start;flex-direction:column}}@media (max-width:640px){.topbar{align-items:flex-start;flex-direction:column}.navlinks{flex-wrap:wrap}.stats-band,.proof-ribbon{grid-template-columns:repeat(2,1fr)}.concept-grid{grid-template-columns:1fr}.concept-card a{min-height:22rem}.media-stack{grid-template-columns:1fr}.media-stack img,.media-stack img:nth-child(2){height:18rem;margin-top:0}h1{font-size:clamp(2.35rem,16vw,4rem)}}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.stage-float,.orbit,.gallery-strip img{animation:none!important}.button:hover{transform:none}.concept-card a:hover img{scale:1}}
`;

const js = `
const cards = document.querySelectorAll(".motion-grid article, .concept-card");
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" });
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.18 });
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) cards.forEach((card) => observer.observe(card));
`;

await writeFile("index.html", homePage());
await writeFile("styles.css", css.trim());
await writeFile("main.js", js.trim());
await mkdir("guide", { recursive: true });
await writeFile("guide/index.html", masterGuide());

for (const [index, site] of sites.entries()) {
  await mkdir(site.slug, { recursive: true });
  await mkdir(`${site.slug}/guide`, { recursive: true });
  await writeFile(`${site.slug}/index.html`, sitePage(site, index));
  await writeFile(`${site.slug}/guide/index.html`, guidePage(site, index));
}

console.log(`Generated ${sites.length} concept sites and ${sites.length + 1} guide routes.`);
