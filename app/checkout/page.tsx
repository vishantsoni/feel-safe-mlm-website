import CheckoutPage from "@/componants/Checkout/CheckoutPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutPage />
      </Suspense>
    </>
  );
};

export default page;
