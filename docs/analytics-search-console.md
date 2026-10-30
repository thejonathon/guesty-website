# Analytics and Search Console checklist

Build-time wiring is already in the site. Scripts stay off until environment variables are set.

## GA4 (required for event reporting)

1. Create a GA4 property for `centralislandhome.com` and copy the Measurement ID (`G-XXXXXXXXXX`).
2. In Vercel → Project → Settings → Environment Variables, set:
   - `GA_MEASUREMENT_ID=G-XXXXXXXXXX` (Production + Preview as desired)
   - Optional: `VERCEL_ANALYTICS=1` for Vercel Web Analytics while GA4 is settling
3. Redeploy the branch/commit you want to measure.
4. View page source and confirm:
   - `https://www.googletagmanager.com/gtag/js?id=G-…` is present when `GA_MEASUREMENT_ID` is set
   - `/_vercel/insights/script.js` appears only when Vercel Analytics is enabled
5. In GA4 Realtime, load `/` and click a Book / Guesty CTA. Expect `page_view` and `booking_cta_click`.
6. On `/contact/`, fail the captcha once and submit once. Expect `contact_form_validation_error` and `contact_form_submit`.

## Google Search Console

1. Add a Domain (preferred) or URL-prefix property for `centralislandhome.com`.
2. Verify ownership (DNS TXT, HTML file, or HTML tag).
3. Submit `https://centralislandhome.com/sitemap.xml`.
4. Connect the GA4 property for shared reporting.
5. After deploy, use URL Inspection on `/`, `/stay/`, `/gallery/`, `/location/`, `/faq/`, `/contact/`, and `/guide/`.

## If GA4 is not ready yet

Keep `VERCEL_ANALYTICS=1` for basic page-view signals in the Vercel dashboard, then re-run this checklist when the Measurement ID exists. Do not leave both stacks unverified after production enablement.

## Weekly smoke (after enablement)

- Hit all seven routes.
- Click one booking CTA per route that exposes one.
- Confirm events in GA4 Realtime within a few minutes.
