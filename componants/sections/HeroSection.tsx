import React from "react";

const HeroSection = () => {
  return (
    <>
      <section
        className="py-3"
        style={{
          backgroundImage: "url('images/background-pattern.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="banner-blocks">
                <div className="banner-ad large bg-info block-1">
                  <div className="swiper main-swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="row banner-content p-xl-5 p-4">
                          <div className="content-wrapper col-md-7">
                            <div className="categories my-3">100% Safe</div>
                            <h3 className="display-4">
                              Feel Unstoppable, Every Day.
                            </h3>
                            <p>
                              Experience ultimate leak protection and
                              unparalleled comfort with [Your Brand Name]. Move
                              with confidence, live with ease.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3"
                            >
                              Try Now
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5 d-flex align-items-end">
                            <img
                              src="./assets/banner/sanitory_pad.png"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="swiper-slide">
                        <div className="row banner-content p-xl-5 p-4">
                          <div className="content-wrapper col-md-7">
                            <div className="categories mb-3 pb-3">
                              100% natural
                            </div>
                            <h3 className="banner-title">
                              Gentle Care for Your Most Sensitive Days.
                            </h3>
                            <p>
                              Our pads offer cotton-like softness and reliable
                              absorbance, making you feel fresh and secure.
                              Designed for comfort that moves with you.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                            >
                              Shop Collection
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5">
                            <img
                              src="./assets/banner/sanitary-pads.png"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="swiper-slide">
                        <div className="row banner-content p-xl-5 p-4">
                          <div className="content-wrapper col-md-7">
                            <div className="categories mb-3 pb-3">
                              100% peaceful
                            </div>
                            <h3 className="banner-title">
                              Worry-Free Days and Peaceful Nights.
                            </h3>
                            <p>
                              Say goodbye to leak anxiety with our advanced
                              technology and secure fit. Feel gives you the
                              protection you can depend on.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                            >
                              Shop Collection
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5">
                            <img
                              src="./assets/banner/night-pads.png"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="swiper-pagination"></div>
                  </div>
                </div>

                <div
                  className="banner-ad bg-success-subtle block-2"
                  style={{
                    background:
                      "url('./assets/banner/adult-diaper.png') no-repeat",
                    backgroundPosition: "right bottom",
                  }}
                >
                  <div className="row banner-content p-xl-5 p-2">
                    <div className="content-wrapper col-md-7">
                      <div className="categories sale mb-3 pb-3">20% off</div>
                      <h3 className="banner-title">Adult Diapers</h3>
                      <a
                        href="#"
                        className="d-flex align-items-center nav-link"
                      >
                        View Details{" "}
                        <svg width="24" height="24">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className="banner-ad bg-pink block-3"
                  style={{
                    background:
                      "url('./assets/banner/sanitory_pad_2.png') no-repeat",
                    backgroundPosition: "right bottom",
                  }}
                >
                  <div className="row banner-content p-5">
                    <div className="content-wrapper col-md-7">
                      <div className="categories sale mb-3 pb-3">15% off</div>
                      <h3 className="item-title">Sanitory Pads</h3>
                      <a
                        href="#"
                        className="d-flex align-items-center nav-link"
                      >
                        Shop Collection{" "}
                        <svg width="24" height="24">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
