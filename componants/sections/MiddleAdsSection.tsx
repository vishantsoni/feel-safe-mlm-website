import React from "react";

const MiddleAdsSection = () => {
  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div
              className="banner-ad bg-pink mb-3"
              style={{
                // backgroundImage: "url('./assets/images/ad-image-3.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
              }}
            >
              <div className="banner-content p-5">
                <div className="categories  fs-3 fw-bold">
                  Earn Passive Income
                </div>
                <h3 className="banner-title">Build Your 10-Level Empire</h3>
                <p>Start with just 2 partners. Our 1X2 forced matrix allows you to earn deep into 10 levels. Small steps, massive rewards.</p>
                <a href="#" className="btn btn-dark text-uppercase">
                  Start Earning
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="banner-ad bg-info"
              style={{
                // backgroundImage: "url('./assets/images/ad-image-4.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
              }}
            >
              <div className="banner-content p-5">
                <div className="categories text-primary fs-3 fw-bold">
                  Daily Essentials, Daily Profits
                </div>
                <h3 className="banner-title">Feel Safe, Live Free</h3>
                <p>Share premium hygiene products everyone needs. Turn every diaper and pad purchase in your network into monthly commissions.</p>
                <a href="#" className="btn btn-dark text-uppercase">
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleAdsSection;
