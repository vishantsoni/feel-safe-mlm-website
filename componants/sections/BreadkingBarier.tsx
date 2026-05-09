import React from "react";

const BreakingBarriers = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-5">
        <div className="row align-items-center g-5">
          {/* Left Content Column */}
          <div className="col-lg-6">
            <div className="pe-lg-4">
              <span
                className="text-uppercase fw-bold mb-3 d-block"
                style={{ color: "#999", letterSpacing: "1px", fontSize: "14px" }}
              >
                Breaking Barriers
              </span>
              <h2 className="fw-bold mb-4 display-6" style={{ color: "#1C1C1C", lineHeight: "1.2" }}>
                Solving India’s Menstrual Health Crisis with <br />
                <span style={{ color: "#1C1C1C" }}>Feel Safe Pvt. Ltd..</span>
              </h2>
              <div className="text-secondary" style={{ fontSize: "15px", lineHeight: "1.7" }}>
                <p className="mb-3">
                  Across India, millions of women face serious challenges during their periods —
                  from limited access to safe menstrual products and unsafe alternatives to health
                  risks and social stigma.
                </p>
                <p className="mb-3">
                  At Feel Safe PVt. Ltd.., we are committed to changing this reality. Through our
                  affordable, eco-friendly, and high-quality sanitary pads, we prioritize comfort,
                  safety, and dignity for every woman.
                </p>
                <p className="mb-0">
                  By making safe period care accessible, we’re not only improving hygiene — we’re
                  empowering women to live healthier, more confident lives.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden shadow-lg">
              <img
                src="/assets/banner/feel-safe-sanitary-pads.jpeg" // Ensure this matches your asset path
                alt="Feel Safe Empowerment"
                className="img-fluid w-100 object-fit-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakingBarriers;