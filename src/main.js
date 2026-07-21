const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

for (const line of document.querySelectorAll("[data-photo-line]")) {
  const rail = line.querySelector(".photo-rail");
  const items = [...line.querySelectorAll("[data-gallery-item]")];
  const status = line.querySelector("[data-gallery-status]");
  const previous = line.querySelector("[data-gallery-prev]");
  const next = line.querySelector("[data-gallery-next]");
  let activeIndex = 0;

  const setActive = (index, announce = false) => {
    activeIndex = Math.max(0, Math.min(items.length - 1, index));
    items.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === activeIndex));
    if (announce && status) {
      const caption = items[activeIndex].querySelector("figcaption")?.textContent.trim() ?? "Photograph";
      status.textContent = `Photograph ${activeIndex + 1} of ${items.length}: ${caption}`;
    }
  };

  const moveTo = (index) => {
    setActive(index, true);
    items[activeIndex].scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
  };

  previous?.addEventListener("click", () => moveTo(activeIndex - 1));
  next?.addEventListener("click", () => moveTo(activeIndex + 1));
  rail.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); moveTo(activeIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveTo(activeIndex + 1); }
    if (event.key === "Home") { event.preventDefault(); moveTo(0); }
    if (event.key === "End") { event.preventDefault(); moveTo(items.length - 1); }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(items.indexOf(visible.target));
    }, { root: rail, threshold: [0.45, 0.65, 0.8] });
    items.forEach((item) => observer.observe(item));
  } else {
    setActive(0);
  }

  let pointerId = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;
  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    dragged = false;
    rail.setPointerCapture(pointerId);
  });
  rail.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 5) dragged = true;
    if (dragged) rail.scrollLeft = startScroll - delta;
  });
  rail.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pointerId) return;
    rail.releasePointerCapture(pointerId);
    pointerId = null;
  });
  rail.addEventListener("click", (event) => { if (dragged) event.preventDefault(); }, true);
  setActive(0);
}

const guestyTarget = document.querySelector("[data-guesty-widget]");
if (guestyTarget) {
  let requested = false;
  const loadGuesty = () => {
    if (requested) return;
    requested = true;
    guestyTarget.dataset.state = "loading";
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.css";
    document.head.append(stylesheet);

    const script = document.createElement("script");
    script.src = "https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.js";
    script.async = true;
    script.addEventListener("load", async () => {
      try {
        await window.GuestySearchBarWidget?.create({ rootElementID: "search-widget_IO312PWQ", siteUrl: "jtaylormade.guestybookings.com", color: "#ff6a52" });
        guestyTarget.dataset.state = "loaded";
      } catch (error) {
        guestyTarget.dataset.state = "failed";
        console.warn("Guesty widget unavailable; the direct booking link remains active.", error);
      }
    });
    script.addEventListener("error", () => { guestyTarget.dataset.state = "failed"; });
    document.head.append(script);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadGuesty();
      observer.disconnect();
    }
  }, { rootMargin: "600px 0px" });
  observer.observe(guestyTarget);
  if (location.hash === "#booking") loadGuesty();
}

// Lazy calendar iframe — src attaches only as the panel approaches
for (const frame of document.querySelectorAll(".calendar-frame iframe[data-src]")) {
  const attach = () => { if (!frame.src) frame.src = frame.dataset.src; };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { attach(); io.disconnect(); }
    }, { rootMargin: "800px 0px" });
    io.observe(frame);
  } else attach();
  if (location.hash === "#booking") attach();
}

// Header: glass once the page starts moving
const header = document.querySelector("[data-header]");
if (header) {
  const setHeader = () => header.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", setHeader, { passive: true });
  setHeader();
}

// Reveal on scroll
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add("io-visible"); io.unobserve(entry.target); }
    }
  }, { rootMargin: "0px 0px -8%" });
  for (const el of reveals) { el.classList.add("io-pending"); io.observe(el); }
}
