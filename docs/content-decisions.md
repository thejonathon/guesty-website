# Content decisions (post-launch)

Decided while implementing the post-launch plan. Amenities, ratings, distances, policies, bed sizes, occupancy, and exact address remain Guesty-only per `AGENTS.md`.

| Topic | Decision |
|-------|----------|
| Amenities / facts strip | Not added. Stay copy continues to defer amenity detail to Guesty. FAQ explains why. |
| Guest reviews / ratings | Not added. No approved review quotes or scores were available. |
| Host identity | Text-only host note for Jonathon Taylor + contact/email links. `photos/host-jonathon.jpg` is a dog portrait, not a host headshot, so it is **not** listed in `src/content.mjs` until the owner supplies an approved host photo or explicit pet copy. |
| Local guide | Keep the three privacy-safe Charleston planning notes. No invented restaurants, distances, or travel times. |
| Contact page | Restored at `/contact/` with captcha + mailto handoff to `thejonathontaylor@gmail.com`. |
| Album photo | `photos/album/album-09.jpg` added as `deck-seating` with an alt/caption that match the photograph. |
| Guesty URL | Booking links and calendar iframe point at the property listing `…/properties/6752a56cfde24c00118255ec`. Terms use `/en/terms`. |
