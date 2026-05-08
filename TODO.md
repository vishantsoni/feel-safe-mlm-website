# TODO

- [x] Implement State -> City dropdowns in sample modal (`componants/sections/DiscountSection.tsx`) using:
  - `GET /api/static/states`
  - `GET /api/static/cities/:stateId`
  - Replace State/City inputs with `<select>`.
  - Reset City when State changes.
  - Keep payload as `state` and `city` names (strings) as expected by backend.
- [ ] (Optional) Run `npm run lint` and `npm run build` to verify no TS/ESLint issues.
