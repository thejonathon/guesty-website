# Analytics rollout plan for Central Island Home (GuestyWebsite)

## Decision and implementation path

Goal: traffic + behavior reporting using free/Google-native tooling with minimal runtime overhead.

- Primary: Google Analytics 4 (GA4) via Measurement ID in `GA_MEASUREMENT_ID` (free).
- Secondary (optional): Vercel Analytics script included when `VERCEL_ANALYTICS=1` or `VERCEL_ANALYTICS=true`.
- Reporting surface: GA4 Realtime + Engagement reports + custom events from tracked CTA/form interactions.

## What changed in this checkout

1. `src/templates.mjs`
   - Added analytics head injection helper in `analyticsHeadSnippet`.
   - Threaded analytics config from build into all rendered pages.
   - Added data attributes on booking CTAs and FAQ/footer booking links:
     - `header_book`
     - `home_hero`
     - `booking_band_fallback`
     - `booking_band_fallback_noscript`
     - `footer_booking`
     - `faq_booking`
     - `faq_terms`
2. `build.mjs`
   - Added build-time analytics config:
     - `GA_MEASUREMENT_ID`
     - `VERCEL_ANALYTICS` / `VERCEL` fallback gate
   - Passed config into `renderPages(analytics)`.
3. `src/main.js`
   - Added generic click analytics dispatch for elements with `data-analytics-event`.
   - Added contact form event tracking:
     - `contact_form_validation_error`
     - `contact_form_submit`

## Deployment/config checklist (Codex-ready)

1. Set GA4 in environment:
   - Add `GA_MEASUREMENT_ID=G-XXXXXXXXXX` in Vercel Project → Settings → Environment Variables.
   - Optional fallback: if Vercel is enabled, also set `VERCEL_ANALYTICS=1`.
2. Redeploy from branch/commit you want to track.
3. Verify source HTML:
   - Confirm `_next`/Vercel script appears only when expected.
   - Confirm `<script src="https://www.googletagmanager.com/gtag/js?id=...">` appears in rendered `<head>`.
4. Configure GA4 reports:
   - Realtime: confirm active users + page_view.
   - Configure events:
     - `booking_cta_click` (label carries CTA location/name)
     - `contact_form_validation_error`
     - `contact_form_submit`
5. Configure Search Console (recommended partner for traffic + search visibility):
   - Add site property (domain + URL-prefix as preferred).
   - Verify ownership using DNS/file/HTML method.
   - Connect GA4 property and import site-wide data.
   - Enable sitemap checks and inspect `sitemap.xml`.
6. Weekly validation loop:
   - 5 routes smoke check: `/`, `/stay/`, `/gallery/`, `/location/`, `/faq/`.
   - On each route:
     - click one booking CTA
     - open contact form, fail captcha once, submit once
     - confirm events arrive in GA4 real-time within minutes.

## Decision if GA4 not available

- Keep `VERCEL_ANALYTICS=1` only to preserve basic performance and page-view signals in the Vercel dashboard while GA4 is being provisioned.
- Re-run this rollout when GA Measurement ID is ready; do not leave both stacks unverified.
