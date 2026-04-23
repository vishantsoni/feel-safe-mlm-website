"use client";

import { Van } from "lucide-react";
import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
            <div className="text-center mb-5">
              <Van />
              <h1 className="fw-bold mt-3" style={{ color: "#1C1C1C" }}>
                Shipping <span style={{ color: "#8DC63F" }}>Policy</span>
              </h1>
              <p className="text-muted">
                Fast, Discreet, and Reliable Delivery
              </p>
            </div>

            <section className="mb-5">
              <h4
                className="fw-bold border-bottom pb-2"
                style={{ color: "#00A9E0" }}
              >
                1. Delivery Timelines
              </h4>
              <p className="text-secondary">
                At <strong>Feel Safe Private Limited</strong>, we understand
                that personal care needs are urgent. We process all orders
                within 24 hours of placement.
              </p>
              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <div
                    className="p-3 rounded-3"
                    style={{ backgroundColor: "#BDE1F3" }}
                  >
                    <strong>Delhi & NCR:</strong> 1 - 2 Business Days
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="p-3 rounded-3"
                    style={{ backgroundColor: "#C4DF9B" }}
                  >
                    <strong>Rest of India:</strong> 3 - 5 Business Days
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-5">
              <h4
                className="fw-bold border-bottom pb-2"
                style={{ color: "#8DC63F" }}
              >
                2. Shipping Charges
              </h4>
              <ul className="text-secondary">
                <li>
                  <strong>Free Shipping:</strong> On all orders above ₹499.
                </li>
                <li>
                  <strong>Standard Shipping:</strong> A flat fee of ₹50 applies
                  to orders below ₹499.
                </li>
                <li>
                  <strong>Bulk Orders:</strong> Distributors ordering in bulk
                  may have different shipping rates calculated at checkout.
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h4
                className="fw-bold border-bottom pb-2"
                style={{ color: "#E6519B" }}
              >
                3. Discreet Packaging
              </h4>
              <p className="text-secondary">
                Your privacy is our priority. All pads and diapers are shipped
                in
                <strong> plain, unmarked outer boxes</strong> or opaque recycled
                mailers. The contents of the package are not mentioned on the
                outside label.
              </p>
            </section>

            <section className="mb-5">
              <h4
                className="fw-bold border-bottom pb-2"
                style={{ color: "#1C1C1C" }}
              >
                4. Order Tracking
              </h4>
              <p className="text-secondary">
                Once your order is dispatched from our Delhi hub, you will
                receive a tracking number via SMS and Email. You can also track
                your order directly through the{" "}
                <strong>Distributor Dashboard</strong>.
              </p>
            </section>

            <div className="bg-light p-4 rounded-4 text-center mt-5">
              <h5 className="fw-bold">Need Help with an Order?</h5>
              <p className="text-muted mb-0">
                Email us at <strong>logistics@feelsafe.co</strong> or call our
                Delhi support line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
