"use client";

import { BanknoteArrowDown, TriangleAlert } from "lucide-react";
import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
            <div className="text-center mb-5">
                <BanknoteArrowDown />
              {/* <iconify-icon 
                icon="solar:refresh-square-bold-duotone" 
                style={{ fontSize: "64px", color: "#E6519B" }} 
              /> */}
              <h1 className="fw-bold mt-3" style={{ color: "#1C1C1C" }}>
                Return & <span style={{ color: "#E6519B" }}>Refund</span> Policy
              </h1>
              <p className="text-muted">Our Commitment to Hygiene and Quality</p>
            </div>

            {/* Hygiene Warning Box */}
            <div className="alert d-flex align-items-center border-0 p-4 mb-5" style={{ backgroundColor: "#fce4ec", borderRadius: "15px" }}>
              {/* <iconify-icon icon="solar:danger-bold" className="me-3" style={{ color: "#E6519B", fontSize: "32px" }} /> */}
              <TriangleAlert  style={{ color: "#E6519B", fontSize: "32px" }} className="me-3"/>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: "#E6519B" }}>Hygiene Notice</h6>
                <p className="mb-0 text-secondary small">
                  Due to the nature of our products (Sanitary Pads & Diapers), <strong>opened or used items 
                  cannot be returned or exchanged</strong> under any circumstances for safety reasons.
                </p>
              </div>
            </div>

            <section className="mb-5">
              <h4 className="fw-bold border-bottom pb-2" style={{ color: "#00A9E0" }}>
                1. Eligibility for Returns
              </h4>
              <p className="text-secondary">
                You may request a return within <strong>7 days</strong> of delivery if:
              </p>
              <ul className="text-secondary">
                <li>The outer seal of the product packaging is <strong>completely intact</strong> and untampered.</li>
                <li>You received the wrong item or a different variant than what was ordered.</li>
                <li>The product arrived with visible manufacturing defects.</li>
              </ul>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold border-bottom pb-2" style={{ color: "#8DC63F" }}>
                2. Refund Process
              </h4>
              <p className="text-secondary">
                Once we receive and inspect your returned item at our <strong>Delhi warehouse</strong>, 
                we will notify you of the approval or rejection of your refund.
              </p>
              <ul className="text-secondary">
                <li><strong>Approved Refunds:</strong> Credit will be applied to your original payment method within 5-7 business days.</li>
                <li><strong>MLM Commissions:</strong> If a refund is processed, any commissions paid to the upline for that specific sale will be reversed from their wallet.</li>
              </ul>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold border-bottom pb-2" style={{ color: "#E6519B" }}>
                3. Non-Returnable Items
              </h4>
              <p className="text-secondary">
                The following cannot be returned:
              </p>
              <ul className="text-secondary">
                <li>Items on "Clearance" or "Flash Sale."</li>
                <li>Packs where the plastic wrapping or seal has been broken.</li>
                <li>Items returned after the 7-day window.</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="fw-bold border-bottom pb-2" style={{ color: "#1C1C1C" }}>
                4. Damaged Items
              </h4>
              <p className="text-secondary">
                If you receive a damaged box, please take a photo and an "unboxing video" and 
                email it to <strong>support@feelsafe.co</strong> immediately. We will ship a 
                replacement at no extra cost.
              </p>
            </section>

            <div className="text-center mt-5">
              <p className="text-muted small">
                All disputes are subject to the exclusive jurisdiction of the courts in **Delhi**, India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;