# TODO

- [ ] Update CheckoutPage shipping logic: if subTotal <= 260 then apply shipping_charge from settings, else shipping = 0.
- [ ] Ensure UI and finalTotal/payment logic use computed shipping.
- [ ] Update coupon validation payload to use computed shipping (not totalAmount + old shipping).
- [ ] Run lint/build to verify TypeScript/React correctness.
