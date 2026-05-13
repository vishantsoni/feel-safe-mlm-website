import Link from "next/link";
import React from "react";

const MiddleAdsSection = () => {
  return (
    <section className="py-5 section21">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
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
                    <Link href="/become-distributor" className="btn btn-dark text-uppercase">
                      Start Earning
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
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
                    <Link href="https://panel.feelsafeco.in/signup" target="_blank" className="btn btn-dark text-uppercase">
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default MiddleAdsSection;
