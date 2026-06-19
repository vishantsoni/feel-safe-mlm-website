# TODO

- [ ] Understand current notification popup gating and mapping logic (`useNotifications.ts`, `NotificationsPopup.tsx`).
- [ ] Implement robust `display_type` -> `category` mapping (trim + tolerant matching) so POPUP items are not filtered out.
- [ ] Keep current behavior: show once per session on initial home page load, and do not show on SPA navigation.
- [ ] Add a lightweight guard to ensure popup only triggers on initial load (current code uses `sessionStorage`, but we will ensure it marks shown at first display).
- [ ] Verify by running dev server and checking popup behavior on refresh vs navigation.
