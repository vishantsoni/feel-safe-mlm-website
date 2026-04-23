"use client";

import React from "react";

const TermsAndConditions = () => {
  const lastUpdated = "April 02, 2026";

  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
            <div className="text-center mb-5">
              <h1 className="fw-bold" style={{ color: "#1C1C1C" }}>
                Terms & <span style={{ color: "#00A9E0" }}>Conditions</span>
              </h1>
              <p className="text-muted">
                Agreement between User and Feel Safe Private Limited (Ganesh
                Tech Solutions)
              </p>
              <hr
                className="w-25 mx-auto"
                style={{ color: "#8DC63F", height: "3px" }}
              />
            </div>

            <section className="mb-5">
              <h4 className="fw-bold" style={{ color: "#00A9E0" }}>
                1. Acceptance of Terms
              </h4>
              <p className="text-secondary">
                By accessing <strong>Feel Safe Private Limited</strong>, you
                agree to comply with and be bound by these Terms and Conditions.
                Our business operates out of <strong>Delhi, India</strong>, and
                all legal matters are subject to the jurisdiction of Delhi
                courts.
              </p>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold" style={{ color: "#8DC63F" }}>
                2. Distributor/MLM Policy
              </h4>
              <div
                className="p-3 rounded-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderLeft: "5px solid #8DC63F",
                }}
              >
                <ul className="text-secondary mb-0">
                  <li>
                    <strong>Eligibility:</strong> You must be at least 18 years
                    old to become a Distributor.
                  </li>
                  <li>
                    <strong>Hierarchy:</strong> Once registered under a Referrer
                    ID, the position in the tree is permanent and cannot be
                    changed.
                  </li>
                  <li>
                    <strong>Commissions:</strong> Commissions are calculated
                    based on product sales within your downline and are subject
                    to tax (TDS) as per Indian Government regulations.
                  </li>
                  <li>
                    <strong>Prohibited Acts:</strong> "Cross-lining" or
                    attempting to move members from other teams is strictly
                    prohibited and results in immediate termination.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold" style={{ color: "#E6519B" }}>
                3. E-commerce & Payments
              </h4>
              <p className="text-secondary">
                We strive to provide accurate pricing for all pads and diapers.
                However, in case of a pricing error, Feel Safe Private Limited
                reserves the right to cancel the order. Payments are processed
                through secure gateways, and your financial data is never stored
                on our local servers.
              </p>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold" style={{ color: "#00A9E0" }}>
                4. Shipping & Returns
              </h4>
              <p className="text-secondary">
                Since our products (pads and diapers) are hygiene-sensitive,{" "}
                <strong>
                  returns are only accepted if the original packaging is
                  unopened
                </strong>{" "}
                or if the product is found to be defective upon delivery.
                Shipping times to Delhi and surrounding areas typically range
                from 2–4 business days.
              </p>
            </section>

            <section className="mb-5 border-top pt-4 text-center">
              <h5 className="fw-bold">Contact for Legal Inquiries</h5>
              <p className="text-muted mb-1">
                Feel Safe Private Limited (Legal Dept.)
              </p>
              <p className="text-muted mb-1">Corporate Office: Delhi, India</p>
              <p className="text-muted mb-0">Email: legal@feelsafe.co</p>
            </section>

            <div className="text-center mt-4">
              <small className="text-muted italic">
                Last Updated: {lastUpdated}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
