# Recovery runbook

## Review checkpoints

Every reviewable design is committed with a plain-language message and pushed to its feature branch. Record the Git commit and Vercel preview together. Earlier versions remain recoverable through Git history.

## Full recovery verification

Run this before a production release and after changes to the generator, dependencies, Vercel configuration, or Guesty integration:

1. Create an immutable `release-*` tag for the approved commit.
2. Clone or create a detached worktree from the tag in an empty temporary directory.
3. Run `npm ci`, `npm run verify`, and serve `dist/` locally.
4. Smoke-test `/`, `/stay/`, `/gallery/`, `/location/`, and `/faq/`.
5. Confirm the Guesty fallback link works when third-party scripts are blocked.
6. Create a Vercel preview and confirm its commit SHA matches the tag.
7. Save the commit, tag, preview URL, Node version, build command, and configuration names. Never record secret values.

## Phone recovery

A request such as “go back to Homepage v1” creates a recovery branch from the requested commit and produces a preview first. Production changes only after explicit approval.
