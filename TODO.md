- [ ] Add 5-minute (300s) resend OTP cooldown timer to `app/forgot-password/page.tsx`
- [ ] Start countdown after successful OTP send / when moving to step 2
- [ ] Add “Resend OTP” button in step 2 UI; disable during cooldown
- [x] Implement resend handler calling existing `forgot-password-otp` endpoint

- [x] Ensure interval cleanup (useEffect cleanup) and correct formatting MM:SS

- [ ] Manually test send OTP -> countdown -> resend enablement
