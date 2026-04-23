"use client";
import React from "react";

const PrivacyPolicy = () => {
  const lastUpdated = "April 02, 2026";

  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
            <h1 className="fw-bold mb-2" style={{ color: "#1C1C1C" }}>
              Privacy Policy
            </h1>
            <p className="text-muted mb-5">Last Updated: {lastUpdated}</p>

            <section className="mb-5">
              <h3 className="fw-bold" style={{ color: "#00A9E0" }}>
                1. Introduction
              </h3>
              <p className="text-secondary">
                Welcome to <strong>Feel Safe Private Limited</strong> We value
                your privacy and are committed to protecting your personal data.
                This Privacy Policy explains how we collect, use, and safeguard
                your information when you visit our website or participate in
                our distributor network.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold" style={{ color: "#8DC63F" }}>
                2. Information We Collect
              </h3>
              <p className="text-secondary">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="text-secondary">
                <li>
                  <strong>Personal Identity:</strong> Name, email address, and
                  phone number.
                </li>
                <li>
                  <strong>Account Data:</strong> Login credentials and profile
                  settings.
                </li>
                <li>
                  <strong>Transaction Info:</strong> Purchase history and
                  shipping addresses.
                </li>
                <li>
                  <strong>MLM Data:</strong> Referral IDs, downline structure,
                  and commission history (for Distributors).
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold" style={{ color: "#E6519B" }}>
                3. How We Use Your Data
              </h3>
              <p className="text-secondary">We use your information to:</p>
              <ul className="text-secondary">
                <li>
                  Process your orders for pads, diapers, and other personal care
                  products.
                </li>
                <li>
                  Manage the distributor hierarchy and calculate accurate
                  commissions.
                </li>
                <li>
                  Send important updates regarding your account or our products.
                </li>
                <li>Improve our website performance and user experience.</li>
              </ul>
            </section>

            <section className="mb-5">
              <h3 className="fw-bold" style={{ color: "#00A9E0" }}>
                4. Data Sharing & MLM Hierarchy
              </h3>
              <p className="text-secondary">
                In our MLM model, your <strong>Username</strong> and{" "}
                <strong>Registration Date</strong> may be visible to your direct
                upline (the person who referred you) to help manage the team
                structure. We
                <strong> never</strong> share your private contact details or
                payment information with other distributors.
              </p>
            </section>

            <section className="mb-5 border-top pt-4">
              <h3 className="fw-bold" style={{ color: "#1C1C1C" }}>
                5. Contact Our Privacy Team
              </h3>
              <p className="text-secondary">
                If you have any questions about this policy or wish to request
                the deletion of your data, please contact us at:
              </p>
              <div className="bg-light p-3 rounded-3">
                <p className="mb-1">
                  <strong>Email:</strong> privacy@feelsafe.co
                </p>
                <p className="mb-0">
                  <strong>Address:</strong> Delhi, Delhi, India - 456789
                </p>
              </div>
            </section>

            <div className="text-center mt-4">
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn btn-outline-secondary btn-sm"
              >
                Print Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
