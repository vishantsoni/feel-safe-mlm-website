"use client";

import React from "react";
import Script from "next/script";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <Script id="hero-swiper-init" strategy="afterInteractive">
        {`
          (function () {
            const init = () => {
              const SwiperCtor = window.Swiper || window.swiper;
              if (typeof SwiperCtor === 'undefined') {
                console.log("swiper is not defined GTS");
                return;
              }
              try {
                if (window.__heroSwiperInitialized) return;

                const el = document.querySelector('.main-swiper');
                if (!el) return;

                const swiper = new window.Swiper('.main-swiper', {
                  speed: 500,
                  loop: true,
                  autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  },
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                  on: {
                    init() {
                      const root = document.querySelector('.main-swiper');
                      if (!root) return;
                      root.addEventListener('mouseenter', () => {
                        try {
                          swiper.autoplay.stop();
                        } catch (e) {}
                      });
                      root.addEventListener('mouseleave', () => {
                        try {
                          swiper.autoplay.start();
                        } catch (e) {}
                      });
                    },
                  },
                });

                window.__heroSwiperInitialized = true;
              } catch (e) {
                // no-op
              }
            };

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', init);
            } else {
              init();
            }
          })();
        `}
      </Script>
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
                <div className="banner-ad large bg-info block-1" data-aos="zoom-in-up">
                  <div className="swiper main-swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="row banner-content p-xl-5 p-4">
                          <div className="content-wrapper col-md-7">
                            <div className="categories my-3">100% Safe</div>
                            <h3 className="display-4">
                              Feel Safe: Unstoppable, Every Day.
                            </h3>
                            <p>
                              Empowering Every Woman and Every Girl – Ultimate Protection & Unmatched Comfort
                              In today’s fast-paced world, nothing should stand between you and your dreams. Whether you are a student attending school, a professional leading at the workplace, or a homemaker managing your world—Feel Safe Pvt. Ltd. is here to ensure you move with freedom. Our brand ‘Feel’ is thoughtfully crafted to meet the unique hygiene needs of every woman and girl, at every stage of her life
                            </p>
                            <Link
                              href="/products"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3"
                            >
                              Try Now
                            </Link>
                          </div>
                          <div className="img-wrapper col-md-5 d-flex align-items-end">
                            <img
                              src="./assets/banner/sanitory_pad.png"
                              className="img-fluid"
                              alt="Feel Safe sanitary pads"
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
                            <h3 className="display-4">
                              Gentle Care for Your Most Sensitive Days.
                            </h3>
                            <p>
                              Our pads offer cotton-like softness and reliable
                              absorbance, making you feel fresh and secure.
                              Designed for comfort that moves with you.
                            </p>
                            <Link
                              href="/products"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                            >
                              Shop Collection
                            </Link>
                          </div>
                          <div className="img-wrapper col-md-5">
                            <img
                              src="./assets/banner/sanitary-pads.png"
                              className="img-fluid"
                              alt="Feel Safe sanitary pads"
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
                            <h3 className="display-4">
                              Worry-Free Days and Peaceful Nights.
                            </h3>
                            <p>
                              Say goodbye to leak anxiety with our advanced
                              technology and secure fit. Feel gives you the
                              protection you can depend on.
                            </p>
                            <Link
                              href="/products"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                            >
                              Shop Collection
                            </Link>
                          </div>
                          <div className="img-wrapper col-md-5">
                            <img
                              src="./assets/banner/night-pads.png"
                              className="img-fluid"
                              alt="Feel Safe night pads"
                            />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="swiper-pagination"></div>
                  </div>
                </div>

                <div
                  data-aos="zoom-in-up"
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
                  data-aos="zoom-in-up"
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
                      <h3 className="item-title">Sanitary Pads</h3>
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
