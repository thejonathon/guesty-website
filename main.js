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