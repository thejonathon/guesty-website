# Central Island Home agent rules

- Work on a feature branch. `main` is production and must not be rewritten or force-pushed.
- Use only the property images explicitly listed in `src/content.mjs`. Never copy the entire `photos/` directory.
- Do not invent property amenities, ratings, distances, policies, bed sizes, occupancy, or an exact address.
- Keep Guesty responsible for availability, pricing, terms, payment, and reservation completion.
- One implementation agent owns edits. Research and review agents remain read-only and return evidence to the orchestrator.
- Before presenting a preview, run `npm run verify`, test the five routes, and compare settled local and Vercel screenshots at 390x844, 768x1024, and 1440x1000.
- A Vercel preview must reference the expected branch and commit. Production requires explicit user approval.
- Recovery checks must start from a clean clone or worktree at an immutable tag and prove the site builds without ignored local files.
