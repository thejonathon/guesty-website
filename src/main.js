const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const trackAnalyticsEvent = (name, params = {}) => {
  if (!name) return;
  const eventParams = { ...params, transport_type: "beacon" };
  if (typeof window.gtag === "function") {
    window.gtag("event", name, eventParams);
    return;
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...eventParams });
  }
};

document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[data-analytics-event], button[data-analytics-event]");
  if (!anchor || !document.body.contains(anchor)) return;

  const eventName = anchor.dataset.analyticsEvent;
  if (!eventName) return;

  const eventCategory = eventName.startsWith("booking_")
    ? "booking"
    : eventName.startsWith("contact_")
      ? "contact"
      : "engagement";

  trackAnalyticsEvent(eventName, {
    event_category: eventCategory,
    event_label: anchor.dataset.analyticsLabel || "tracked_link",
    link_location: anchor.dataset.analyticsLocation || "unknown",
    link_url: anchor.getAttribute("href") || "",
    link_text: anchor.textContent?.trim() || "",
  });
});

const trackContactError = (type, details = {}) => {
  trackAnalyticsEvent("contact_form_validation_error", {
    event_category: "contact",
    error_type: type,
    ...details,
  });
};

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

// Contact form — validates, then opens mailto to the host email
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const captchaQuestion = document.getElementById("captcha-question");
  const captchaInput = document.getElementById("contact-captcha");
  const statusBanner = document.getElementById("form-status");
  const hostEmail = "thejonathontaylor@gmail.com";

  let num1 = Math.floor(Math.random() * 8) + 2;
  let num2 = Math.floor(Math.random() * 8) + 1;
  let expectedAnswer = num1 + num2;

  if (captchaQuestion) {
    captchaQuestion.textContent = `${num1} + ${num2} = ?`;
  }

  const refreshCaptcha = () => {
    num1 = Math.floor(Math.random() * 8) + 2;
    num2 = Math.floor(Math.random() * 8) + 1;
    expectedAnswer = num1 + num2;
    if (captchaQuestion) captchaQuestion.textContent = `${num1} + ${num2} = ?`;
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const captchaValue = parseInt((formData.get("captcha") || "").toString().trim(), 10);

    if (captchaValue !== expectedAnswer) {
      trackContactError("captcha_mismatch", { event_label: "captcha_invalid" });
      statusBanner.className = "form-status error";
      statusBanner.textContent = "Security challenge incorrect. Please double-check the math answer.";
      captchaInput?.focus();
      return;
    }

    if (!contactForm.checkValidity()) {
      trackContactError("validation_failed", { event_label: "required_fields" });
      statusBanner.className = "form-status error";
      statusBanner.textContent = "Please fill out all required fields with valid values.";
      contactForm.reportValidity();
      return;
    }

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const subject = encodeURIComponent(`Central Island Home inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "(not provided)"}\n\n${message}`,
    );

    trackAnalyticsEvent("contact_form_submit", { event_category: "contact", event_label: "mailto_open" });
    statusBanner.className = "form-status success";
    statusBanner.textContent = "Opening your email app to send the message.";
    window.location.href = `mailto:${hostEmail}?subject=${subject}&body=${body}`;
    contactForm.reset();
    refreshCaptcha();
  });
}
