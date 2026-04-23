# Address Form Fix TODO

**Status: Implemented**

## Steps:
- [x] 1. Analyzed files: types/Address.ts, addresses/page.tsx, checkout/page.tsx, addressApi.ts
- [x] 2. Updated app/account/addresses/page.tsx:
  - Imported CreateAddressData type
  - Fixed formData to CreateAddressData (full_name, address_line1/2, country="India", landmark via line2, is_default checkbox)
  - Updated form: full_name input, address_line1 textarea, line2 input, city/state/pincode/phone rows, checkbox
  - Fixed openEdit: maps full_name, line1/2/landmark, country, is_default
  - Updated display: full_name, line1 + line2, city/state/pincode, phone
  - Removed local outdated interface
- [x] 3. Form now sends correct API body matching backend req.body (full_name, address_line1/2, city, state, pincode, phone, country, landmark?, is_default)
- [x] 4. Fetched display consistent with new fields
- [x] 5. Task complete: Address add form fixed to match create API expected body

**Changes:** app/account/addresses/page.tsx fully updated and consistent with checkout/page.tsx and types.

