# TODO

- [ ] Add shared CTA button on both Login and Register pages that performs: fetch user existence -> login if exists, else register.
- [ ] Implement backend-first flow for manual email/password: call an endpoint that checks existence by email (or reuse existing auth endpoints if available).
- [ ] Ensure Google sign-in uses the same existence-check endpoint already implemented (`api/ecom/auth/google-check`).
- [ ] Update UI so CTA text is consistent on both pages.
- [ ] Run Next.js typecheck/lint (and optionally dev server) to confirm builds.
