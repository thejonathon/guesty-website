import { pages, photos, site } from "./content.mjs";
const photo = Object.fromEntries(photos.map((p) => [p.id, p]));
const navRoutes = [pages.home, pages.stay, pages.gallery, pages.contact];

function analyticsHeadSnippet({ measurementId = "", enableVercelFallback = false } = {}) {
  const escapedId = measurementId.replace(/[^A-Za-z0-9-]/g, "");
  const ga = measurementId && escapedId ? escapedId : "";
  const vercelFallback = enableVercelFallback
    ? `<script defer src="/_vercel/insights/script.js"></script>`
    : "";
  if (!ga && !enableVercelFallback) return "";

  const gtag = ga
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "${ga}", { send_page_view: true });
</script>`
    : "";

  return `${gtag}${vercelFallback}`;
}

function nav(active) {
  const links = navRoutes.map((page) => {
    const label = page.path === "/" ? "Home" : page.path.split("/")[1][0].toUpperCase() + page.path.split("/")[1].slice(1);
    return `<li><a href="${page.path}"${active === page.path ? ' aria-current="page"' : ""}>${label}</a></li>`;
  }).join("");
  return `<header class="site-header" data-header>
    <a class="brand" href="/" aria-label="Central Island Home, home"><span>Central Island</span><em>Home</em></a>
    <nav aria-label="Primary"><ul>${links}</ul></nav>
    <a class="button button-coral button-small" href="${site.bookingUrl}" data-analytics-event="booking_cta_click" data-analytics-label="header_book" data-analytics-location="header">Book</a>
  </header>`;
}

function picture(p, { className = "", eager = false, sizes = "(max-width: 720px) 92vw, 50vw" } = {}) {
  return `<picture${className ? ` class="${className}"` : ""}>
    <source type="image/avif" srcset="/assets/images/${p.id}-480.avif 480w, /assets/images/${p.id}-768.avif 768w, /assets/images/${p.id}-1200.avif 1200w" sizes="${sizes}">
    <source type="image/webp" srcset="/assets/images/${p.id}-480.webp 480w, /assets/images/${p.id}-768.webp 768w, /assets/images/${p.id}-1200.webp 1200w" sizes="${sizes}">
    <img src="/assets/images/${p.id}-1200.jpg" srcset="/assets/images/${p.id}-480.jpg 480w, /assets/images/${p.id}-768.jpg 768w, /assets/images/${p.id}-1200.jpg 1200w" sizes="${sizes}" width="1200" height="900" alt="${p.alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  </picture>`;
}

function bookingBand(id = "booking", { glass = true } = {}) {
  return `<section class="booking-band${glass ? " sea-section" : ""}" id="${id}" aria-labelledby="booking-title">
    <div${glass ? ' class="glass"' : ""}>
      <div class="booking-head">
        <p class="eyebrow">Direct Guesty Booking</p>
        <h2 id="booking-title">Choose your dates when you’re ready.</h2>
        <p>Guesty holds live availability, real-time rates, and instant reservation confirmation.</p>
      </div>
      <div class="booking-widget-shell">
        <div id="search-widget_IO312PWQ" data-guesty-widget aria-label="Guesty availability search"></div>
        <div class="booking-direct-card">
          <div class="direct-perks">
            <div class="perk"><span>✓</span> Best Rate Direct</div>
            <div class="perk"><span>✓</span> Instant Confirmation</div>
            <div class="perk"><span>✓</span> Live Calendar</div>
          </div>
          <a class="button button-coral" href="${site.bookingUrl}" data-analytics-event="booking_cta_click" data-analytics-label="booking_band_direct" data-analytics-location="booking_band">Check Live Calendar on Guesty →</a>
        </div>
        <p class="booking-fallback">Prefer a full page? <a href="${site.bookingUrl}" data-analytics-event="booking_cta_click" data-analytics-label="booking_band_fallback" data-analytics-location="booking_band">Open the property calendar on Guesty</a>.</p>
        <noscript><p><a class="button button-coral" href="${site.bookingUrl}" data-analytics-event="booking_cta_click" data-analytics-label="booking_band_fallback_noscript" data-analytics-location="booking_band">Check availability on Guesty</a></p></noscript>
      </div>
    </div>
  </section>`;
}

function galleryRail(items = photos, compact = false) {
  return `<div class="photo-line${compact ? " photo-line-compact" : ""}" data-photo-line>
    <div class="line-controls">
      <p id="gallery-instructions">Swipe, drag, or use the arrow keys to move along the photo line.</p>
      <div><button type="button" data-gallery-prev aria-label="Previous photograph">←</button><button type="button" data-gallery-next aria-label="Next photograph">→</button></div>
    </div>
    <ul class="photo-rail" tabindex="0" aria-label="Property photo gallery" aria-describedby="gallery-instructions">
      ${items.map((p, index) => `<li class="hanging-print" style="--tilt:${[-2.2, 1.5, -1.1, 2, -1.6, 1.2, -0.8][index % 7]}deg;--drop:${[1.5, 4.4, 2.6, 5.2, 2, 4, 1][index % 7]}rem" data-gallery-item>
        <figure>${picture(p, { sizes: compact ? "(max-width: 720px) 78vw, 30vw" : "(max-width: 720px) 82vw, 38vw" })}<figcaption><span>${String(index + 1).padStart(2, "0")}</span>${p.caption}</figcaption></figure>
      </li>`).join("")}
    </ul>
    <p class="gallery-status visually-hidden" aria-live="polite" data-gallery-status></p>
  </div>`;
}

function intro(page) {
  return `<section class="page-intro" id="page-intro"><p class="eyebrow">${page.eyebrow}</p><h1>${page.heading}</h1><p class="lede">${page.intro}</p></section>`;
}

function home() {
  const page = pages.home;
  return `<main id="main" tabindex="-1">
    <section class="sea-hero" id="page-intro">
      <p class="eyebrow">${page.eyebrow}</p>
      <h1><span class="hero-line"><span>Come home to</span></span><span class="hero-line"><span>the <em>slower side</em></span></span><span class="hero-line"><span>of the coast.</span></span></h1>
      <p class="lede">${page.intro}</p>
      <div class="actions"><a class="button" href="#booking" data-analytics-event="booking_cta_click" data-analytics-label="hero_book" data-analytics-location="home_hero">Book</a><a class="button button-outline" href="/stay/">Step inside</a></div>
      <p class="scroll-cue" aria-hidden="true">Descend</p>
    </section>
    <section class="sea-section reveal" aria-labelledby="stay-title">
      <div class="glass">
        <p class="eyebrow">The stay</p>
        <h2 id="stay-title">Shared spaces for the easy parts of the day.</h2>
        <p>Morning coffee at the island. Dinner under the shade sail. A fire in the pit as the light goes. Every photograph on this site is a real space at the property.</p>
        <a class="text-link" href="/stay/">See inside the home <span aria-hidden="true">→</span></a>
      </div>
    </section>
    ${bookingBand("booking", { glass: true })}
    <div class="shore">
      <section class="gallery-preview reveal" aria-labelledby="gallery-preview-title">
        <div class="section-heading"><div><p class="eyebrow">The photo line</p><h2 id="gallery-preview-title">Washed ashore, still dripping.</h2></div><a class="text-link" href="/gallery/">Open the full gallery <span aria-hidden="true">→</span></a></div>
        ${galleryRail([photo["fire-pit"], photo["living-overview"], photo["patio-dining"]], true)}
      </section>
      <section class="editorial-split reveal">
        <div class="glass" style="padding: clamp(1.8rem, 3.5vw, 2.5rem);">
          <p class="eyebrow">Outside</p><h2>The backyard keeps its own schedule.</h2>
        </div>
        <div class="glass" style="padding: clamp(1.8rem, 3.5vw, 2.5rem);">
          <p>A fire pit, a grill patio with its own television, an outdoor shower for sandy feet, and a long lawn under mature trees. The best room in the house isn’t in the house.</p><a class="text-link" href="/gallery/">See the outdoors <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <section class="location-teaser reveal"><p class="eyebrow">Plan the days</p><h2>Keep Charleston at the center of the story.</h2><p>We protect the home’s exact location while giving you a thoughtful starting point for the wider Charleston area.</p><a class="button button-outline" href="/stay/">Explore the stay</a></section>
    </div>
  </main>`;
}

function stay() {
  const page = pages.stay;
  return `<main id="main" tabindex="-1">${intro(page)}
    <section class="room-story reveal"><div>${picture(photo["living-overview"], { eager: true, sizes: "(max-width: 800px) 94vw, 55vw" })}</div><article><p class="eyebrow">Gather</p><h2>An open place to reconnect.</h2><p>The photographed living area brings seating, television, and an indoor bar into one shared setting.</p></article></section>
    <section class="room-story room-story-reverse reveal"><div>${picture(photo["kitchen-range"], { sizes: "(max-width: 800px) 94vw, 55vw" })}</div><article><p class="eyebrow">Cook</p><h2>The kitchen stays close to the conversation.</h2><p>A stainless range, breakfast bar seating, and a coffee station anchor the open kitchen. Full amenity details remain available during booking.</p></article></section>
    <section class="room-story reveal"><div>${picture(photo["dining-room"], { sizes: "(max-width: 800px) 94vw, 55vw" })}</div><article><p class="eyebrow">Dine</p><h2>Six chairs and no hurry.</h2><p>The dining room seats six around an oval table, a short carry from the kitchen.</p></article></section>
    <section class="bedroom-section reveal"><div class="section-heading"><div><p class="eyebrow">Rest</p><h2>Three photographed sleeping spaces.</h2></div><p>Bed sizes and occupancy are confirmed during the Guesty booking journey.</p></div><div class="bedroom-grid">${[photo["bright-bedroom"], photo["two-beds"], photo["large-bed"]].map((p) => `<figure>${picture(p)}<figcaption>${p.caption}</figcaption></figure>`).join("")}</div></section>
    <section class="bedroom-section reveal"><div class="section-heading"><div><p class="eyebrow">Bathe</p><h2>Two bright baths, one outdoor rinse.</h2></div></div><div class="bedroom-grid">${[photo["bath-aqua"], photo["bath-yellow"], photo["outdoor-shower"]].map((p) => `<figure>${picture(p)}<figcaption>${p.caption}</figcaption></figure>`).join("")}</div></section>
    ${bookingBand("booking")}
  </main>`;
}

function gallery() {
  const page = pages.gallery;
  return `<main id="main" tabindex="-1">${intro(page)}<section class="gallery-stage" aria-labelledby="gallery-title"><h2 class="visually-hidden" id="gallery-title">Property photographs</h2>${galleryRail()}</section><section class="photo-index reveal"><div class="section-heading"><div><p class="eyebrow">All photographs</p><h2>A still view of every space on the line.</h2></div></div><div class="photo-grid">${photos.map((p) => `<figure>${picture(p, { sizes: "(max-width: 720px) 92vw, 32vw" })}<figcaption>${p.caption}</figcaption></figure>`).join("")}</div></section>${bookingBand("booking")}</main>`;
}

function location() {
  const page = pages.location;
  return `<main id="main" tabindex="-1">${intro(page)}
    <section class="coastal-field reveal" aria-label="Charleston-area planning notes"><article><span>01</span><h2>Build around the pace you want.</h2><p>Use confirmed booking information as the source for arrival details. Keep the rest of the itinerary as open or as full as the trip requires.</p></article><article><span>02</span><h2>Ask before assuming.</h2><p>Travel times, access details, and the exact address are intentionally not estimated on this site.</p></article><article><span>03</span><h2>Let Guesty hold the particulars.</h2><p>Your confirmed reservation is the dependable place for property-specific logistics and current terms.</p></article></section>
    <section class="location-quote reveal"><p>“Create memories today to last a lifetime.”</p><span>— Current Guesty booking page</span></section>${bookingBand("booking")}</main>`;
}

function faq() {
  const page = pages.faq;
  const faqs = [
    ["How do I check availability?", `Use the booking section on this site or continue to <a href="${site.bookingUrl}" data-analytics-event="booking_cta_click" data-analytics-label="faq_booking" data-analytics-location="faq">Guesty</a> for current dates.`],
    ["Where will I see pricing?", "Guesty shows current pricing during the date and guest search."],
    ["Where can I review reservation terms?", `Review the <a href="${site.bookingUrl}/terms" data-analytics-event="booking_cta_click" data-analytics-label="faq_terms" data-analytics-location="faq">current Guesty terms</a> during your booking journey.`],
    ["Why is the exact address not shown here?", "The public site protects the property’s precise location. Confirmed arrival information is shared through the reservation process."],
    ["Are the photographs real?", "Yes. Every property photograph on this site is a real image of Central Island Home. The only AI-generated imagery is the decorative ocean water and sand textures — and those are labeled in the maker's guide."],
    ["How can I ask another question?", `Email <a href="mailto:${site.email}">${site.email}</a> or use the contact details provided by Guesty.`],
  ];
  return `<main id="main" tabindex="-1">${intro(page)}<section class="faq-layout reveal"><div><p class="eyebrow">Useful details</p><h2>Verified guidance, without guesswork.</h2></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join("")}</div></section>${bookingBand("booking")}</main>`;
}

function guide() {
  const page = pages.guide;
  const swatches = [["Abyss", "#032f3d"], ["Deep", "#0b7c96"], ["Turquoise", "#1fc4cc"], ["Aqua", "#a9f0e9"], ["Foam", "#f2fffb"], ["Sand", "#f6eedd"], ["Ink", "#06323c"], ["Coral", "#ff6a52"]];
  return `<main id="main" tabindex="-1">${intro(page)}
  <article class="guide-article">
    <section class="reveal">
      <h2>1 · The idea: the water is the interface</h2>
      <p>The brief was a booking site where a turquoise, <em>see-through</em> Caribbean sea sits behind everything — including the live Guesty calendar. So the home page is built as a water column: a sunlit sand seafloor at the very back, a real-time WebGL water surface in front of it, and the content floating between them in panels of glass. Scrolling doesn’t move past the ocean; it descends through it, until the page finally washes ashore onto sand.</p>
    </section>
    <section class="reveal">
      <h2>2 · A transparent Gerstner ocean</h2>
      <p>The sea is a Three.js <code>ShaderMaterial</code> on a 340×340 plane. Five Gerstner waves are composited in the vertex shader — the classic trochoidal wave model, where each point moves in a circle, so crests sharpen the way real water does:</p>
      <pre tabindex="0"><code>void gerstner(vec2 dir, float steep, float len, vec3 p0, …){
  float k = 6.28318 / len;
  float c = sqrt(9.8 / k);          // deep-water wave speed
  float f = k * (dot(d, p0.xz) - c * uTime);
  float a = steep / k;
  disp += vec3(d.x * a * cos(f), a * sin(f), d.y * a * cos(f));
  …
}</code></pre>
      <p>The trick that makes it Mexican-Caribbean and transparent is all in the fragment shader. Color mixes from a deep petrol teal into bright turquoise by crest height, then toward a pale-aqua sky by fresnel. Alpha is <em>lowest looking straight down into troughs</em> — so the seafloor glows through the clear water — and rises at grazing angles, on crests, and with foam:</p>
      <pre tabindex="0"><code>vec3 col = mix(uDeep, uShal, crest);       // #0b7c96 → #3fd6d9
col = mix(col, uSky, fresnel * 0.6);       // horizon goes pale
float alpha = 0.34 + fresnel * 0.5
            + crest * 0.18 + foam * 0.5;   // clear in the troughs
gl_FragColor = vec4(col, alpha);</code></pre>
      <p>The renderer is created with <code>alpha: true</code> and clears to nothing, so whatever the DOM puts behind the canvas — here, an AI-generated sunlit seafloor with caustic light webs — reads through the surface. Scroll position feeds a <code>uDepth</code> uniform that darkens the water and lowers the camera: the descent.</p>
    </section>
    <section class="reveal">
      <h2>3 · The calendar beneath the surface</h2>
      <p>The Guesty search widget and full booking calendar sit in a glass panel (<code>backdrop-filter: blur(20px) saturate(1.5)</code>) over the living water. Both are lazy: an <code>IntersectionObserver</code> injects Guesty’s script only when the panel approaches the viewport, and the calendar iframe gets its <code>src</code> the same way. If either fails, a plain link to the booking page remains — availability and pricing always setupScrollReveal();</section>
    <section class="reveal">
      <h2>4 · Palette &amp; type</h2>
      <p>Eight tokens run the whole site — a water column from abyss to foam, warm sand for the shore, and one coral accent used sparingly:</p>
      <ul class="swatch-row">${swatches.map(([n, c]) => `<li><i style="background:${c}"></i>${n}<br>${c}</li>`).join("")}</ul>
      <p>Display type is <a href="https://fonts.google.com/specimen/Fraunces">Fraunces</a>, self-hosted as a variable font with its <code>WONK</code> axis switched on — the slightly drunken letterforms give the serifs a hand-set, salt-warped character. UI text is Manrope. Both load as single variable <code>woff2</code> files.</p>
      <pre tabindex="0"><code>h1 { font-family: "Fraunces";
     font-variation-settings: "SOFT" 0, "WONK" 1; }</code></pre>
    </section>
    <section class="reveal">
      <h2>5 · AI-generated textures (and a hard rule)</h2>
      <p>Three decorative images were generated with the OpenAI Images API: the sunlit seafloor sand, an open-sea horizon (the no-WebGL fallback), and an aerial lagoon used as a section backdrop. The hard rule: <strong>generated imagery never depicts the property.</strong> Every room, deck, and fire pit photo is a real photograph of the real home. AI paints the ocean; the house plays itself.</p>
    </section>
    <section class="reveal">
      <h2>6 · Motion that respects the reader</h2>
      <p>Hero lines rise from a clipped mask on load. Sections reveal with a small IntersectionObserver that flips a class — chosen over CSS <code>view()</code> timelines after testing showed steadier behavior across browsers and capture tools. The depth veil darkens on a <code>scroll(root)</code> timeline as pure progressive enhancement. Everything honors <code>prefers-reduced-motion</code>: the sea renders a single still frame, and every animation collapses to its end state.</p>
    </section>
    <section class="reveal">
      <h2>7 · Three passes with a fine-toothed comb</h2>
      <p>After the first complete build, the site went through three full iteration passes: screenshot every route at 390×844, 768×1024, and 1440×1000; critique hierarchy, spacing, color, motion, loading states, and accessibility (axe); fix everything; re-shoot. The third pass added Lighthouse, reduced-motion, and WebGL-failure checks. The rule was simple: nothing ships on the first draft.</p>
    </section>
    <section class="reveal">
      <h2>Credits</h2>
      <p>Designed and built end-to-end by <strong>Claude (Fable 5)</strong> — concept, shaders, design system, copy, and QA — for Jonathon Taylor. Ocean mathematics after Gerstner (1802). Live availability by Guesty. Property photographs are real and untouched.</p>
    </section>
  </article>
  ${bookingBand("booking")}</main>`;
}

function schema() {
  return JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.domain, description: pages.home.description });
}

function contactSection() {
  return `<section class="contact-section reveal" id="contact" aria-labelledby="contact-title">
    <div class="contact-card">
      <header>
        <p class="eyebrow">Get in Touch</p>
        <h2 id="contact-title">Have questions about your stay?</h2>
        <p>Send us a message and we’ll get back to you promptly.</p>
      </header>
      <form class="contact-form" id="contact-form" novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="contact-name">Name *</label>
            <input type="text" id="contact-name" name="name" required placeholder="Your full name" autocomplete="name">
          </div>
          <div class="field">
            <label for="contact-email">Email *</label>
            <input type="email" id="contact-email" name="email" required placeholder="you@example.com" autocomplete="email">
          </div>
        </div>
        <div class="field">
          <label for="contact-phone">Phone Number</label>
          <input type="tel" id="contact-phone" name="phone" placeholder="(555) 000-0000" autocomplete="tel">
        </div>
        <div class="field">
          <label for="contact-message">Message *</label>
          <textarea id="contact-message" name="message" required placeholder="Tell us about your upcoming trip or ask any questions..."></textarea>
        </div>
        <div class="field captcha-box">
          <label for="contact-captcha">Security Challenge: <strong id="captcha-question">5 + 3 = ?</strong> *</label>
          <input type="text" id="contact-captcha" name="captcha" required placeholder="Answer" autocomplete="off">
        </div>
        <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
        <button type="submit" class="button button-coral">Send Message</button>
      </form>
    </div>
  </section>`;
}

function contact() {
  const page = pages.contact;
  return `<main id="main" tabindex="-1">
    <section class="sea-hero" id="page-intro">
      <p class="eyebrow">${page.eyebrow}</p>
      <h1><span class="hero-line"><span>${page.heading}</span></span></h1>
      <p class="lede">${page.intro}</p>
    </section>
    <section class="contact-page reveal" style="width:min(1060px,100%);margin:0 auto 4rem;position:relative;z-index:1;">
      ${contactSection()}
    </section>
  </main>`;
}

function shell(page, active, body, { sea = true, analytics = {} } = {}) {
  const analyticsHead = analyticsHeadSnippet(analytics);
  const oceanScripts = `<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}</script><link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin><script type="module" src="/assets/ocean.js"></script>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b7c96"><title>${page.title}</title><meta name="description" content="${page.description}"><meta name="robots" content="index,follow"><link rel="canonical" href="${site.domain}${page.path}"><meta property="og:type" content="website"><meta property="og:site_name" content="${site.name}"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${site.domain}${page.path}"><meta property="og:image" content="${site.domain}/assets/images/kitchen-living-1200.jpg"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/fonts/fraunces.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/styles.css">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;600&family=Playfair+Display&family=Roboto+Mono&display=swap" rel="stylesheet"><link rel="expect" href="#page-intro" blocking="render"><script type="application/ld+json">${schema()}</script>${analyticsHead}<script type="module" src="/assets/main.js"></script>${oceanScripts}</head><body class="page-sea"><a class="skip-link" href="#main">Skip to main content</a><div class="sea-stage" aria-hidden="true"><div class="seafloor"></div><div class="light-sweep"></div><canvas id="sea-canvas"></canvas><div class="depth-veil"></div></div>${nav(active)}${body}<footer><a class="brand footer-brand" href="/"><span>Central Island</span><em>Home</em></a><p>A real-property coastal stay, with booking details provided by Guesty.</p><div><a href="${site.bookingUrl}" data-analytics-event="booking_cta_click" data-analytics-label="footer_booking" data-analytics-location="footer">Guesty booking</a><a href="/contact/">Contact us</a><a href="mailto:${site.email}">Email</a></div></footer></body></html>`;
}

export function renderPages(analytics = {}) {
  return [
    { path: "index.html", html: shell(pages.home, "/", home(), { sea: true, analytics }) },
    { path: "stay/index.html", html: shell(pages.stay, "/stay/", stay(), { sea: true, analytics }) },
    { path: "gallery/index.html", html: shell(pages.gallery, "/gallery/", gallery(), { sea: true, analytics }) },
    { path: "location/index.html", html: shell(pages.location, "/location/", location(), { sea: true, analytics }) },
    { path: "faq/index.html", html: shell(pages.faq, "/faq/", faq(), { sea: true, analytics }) },
    { path: "guide/index.html", html: shell(pages.guide, "/guide/", guide(), { sea: true, analytics }) },
    { path: "contact/index.html", html: shell(pages.contact, "/contact/", contact(), { sea: true, analytics }) },
  ];
}
