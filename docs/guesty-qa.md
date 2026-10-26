# Guesty booking QA (live site)

Date: 2026-10-26 (America/New_York)  
Site tested: https://centralislandhome.com/  
Viewports: 1440×1000 and 390×844  

## Verdict

**Pass — booking handoff works** on desktop and mobile. No blockers to reservation handoff. Pricing and terms remain on Guesty.

## Checks

| Check | Desktop | Mobile |
|-------|---------|--------|
| Guesty search widget loads | Pass | Pass |
| Calendar / listing iframe loads | Pass | Pass |
| Fallback “Open the booking calendar on Guesty” | Pass | Pass |
| Header Book / booking CTAs reach Guesty UI | Pass | Pass |
| Footer Guesty booking link | Pass | Pass |
| `/stay/` and `/faq/` booking bands | Pass | Pass |
| Pricing/terms not invented on marketing pages | Pass | Pass |

## Notes

- Live listing showed Guesty pricing (example observed: $249.00 per night) inside the embed — not hardcoded on the marketing site.
- Property URL confirmed: `https://jtaylormade.guestybookings.com/en/properties/6752a56cfde24c00118255ec`
- Minor cosmetic: broken logo image inside Guesty iframe; does not block booking.
- Screenshots from the session: see agent artifacts under `guesty-qa/` from the QA run.
