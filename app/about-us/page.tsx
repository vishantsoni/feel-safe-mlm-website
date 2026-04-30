import { Mail, MapPin, PhoneCall } from "lucide-react";
import React from "react";
import { Icon } from "@iconify/react";
const AboutPage = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <section className="row g-0 align-items-center bg-light">
        <div className="col-md-6 p-5">
          <h6
            className="text-uppercase fw-bold"
            style={{ color: "#8DC63F", letterSpacing: "2px" }}
          >
            Our Story
          </h6>
          <h1 className="display-4 fw-bold mb-4" style={{ color: "#1C1C1C" }}>
            Welcome to{" "}
            <span style={{ color: "#00A9E0" }}>Feel Safe Private Limited</span>
          </h1>
          <p className="lead text-muted mb-4">
            At Feel Safe Private Limited, we are dedicated to providing premium
            quality pads and diapers that prioritize your comfort and
            confidence.
          </p>
          <h6
            className="text-uppercase fw-bold"
            style={{ color: "#E6519B", letterSpacing: "2px", fontWeight: 'bold' }}
          >
            Vision 2030 (1 Lakh Sakhi Mission)
          </h6>
          <p className="text-muted mb-4">
            Our goal is to build a robust network of (One Lakh) financially independent and socially leading women across India by the year 2030. These 1 lakh empowered women will serve as the face of our 'Feel' brand, delivering the vital message of menstrual hygiene to every household and leading a change from the grassroots level.
          </p>
          <button
            // onClick={() => {
            //   navigation.navigate("/")
            // }}
            className="btn mt-3 px-4 py-2 text-white shadow-sm"
            style={{ backgroundColor: "#00A9E0" }}
          >
            Explore Our Products
          </button>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="/assets/images/about-us.png"
            alt="Feel Safe Team"
            className="img-fluid w-75 d-block mx-auto"
            style={{ minHeight: "300px", objectFit: "contain" }}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="row text-center p-5 bg-white g-4">
        <div className="col-md-4">
          <div
            className="p-4 rounded-4 shadow-sm h-100"
            style={{ backgroundColor: "#BDE1F3" }}
          >
            <Icon
              icon="solar:heart-bold"
              style={{ fontSize: "48px", color: "#E6519B" }}
            />
            <h4 className="mt-3">Quality Care</h4>
            <p className="text-muted">
              Premium materials chosen specifically for sensitive skin and
              maximum absorbency.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-4 rounded-4 shadow-sm h-100"
            style={{ backgroundColor: "#C4DF9B" }}
          >
            <Icon
              icon="solar:leaf-bold"
              style={{ fontSize: "48px", color: "#8DC63F" }}
            />
            <h4 className="mt-3">Eco Friendly</h4>
            <p className="text-muted">
              We prioritize sustainable sourcing to ensure we care for you and
              the planet.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-4 rounded-4 shadow-sm h-100"
            style={{ backgroundColor: "#BDE1F3" }}
          >
            <Icon
              icon="solar:shield-check-bold"
              style={{ fontSize: "48px", color: "#00A9E0" }}
            />
            <h4 className="mt-3">Feel Protected</h4>
            <p className="text-muted">
              Our products are designed to stay in place, giving you 24/7 peace
              of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Trust in Quality Section */}
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <div className="text-center">
                <Icon
                  icon="solar:shield-check-bold"
                  style={{ fontSize: "120px", color: "#00A9E0" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <h6
                className="text-uppercase fw-bold"
                style={{ color: "#8DC63F", letterSpacing: "2px" }}
              >
                Trust in Quality (BIS & Quality Assurance)
              </h6>
              <h2 className="fw-bold mb-4" style={{ color: "#1C1C1C" }}>
                Uncompromising Quality: BIS & Global Standards
              </h2>
              <p className="text-muted mb-4">
                We strictly adhere to the rigorous quality benchmarks set by the
                Bureau of Indian Standards (BIS). Every product under the Feel
                Safe umbrella is meticulously crafted, keeping women's safety
                and health as our top priority. Our ISO and GMP certifications
                are a testament to our unwavering commitment to manufacturing
                excellence and hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MLM / Opportunity Section */}
      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-4">
            Empowering <span style={{ color: "#E6519B" }}>Entrepreneurs</span>
          </h2>
          <p className="mx-auto text-muted" style={{ maxWidth: "800px" }}>
            Feel Safe Private Limited isn't just about products; it's about
            people. We offer a unique distributor program that allows you to
            build your own business while sharing the comfort of Feel Safe with
            your community. Grow with us, earn commissions, and lead with
            confidence.
          </p>
          <div className="mt-4">
            <button className="btn btn-outline-dark px-4 py-2 me-2">
              Learn More
            </button>
            <button
              className="btn text-white px-4 py-2"
              style={{ backgroundColor: "#8DC63F" }}
            >
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="bg-white py-5 border-top about-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-6">
              <h3 className="fw-bold mb-4">Get In Touch</h3>
              <p className="text-muted">
                Have questions about our products or our partnership program? We
                are here to help you.
              </p>

              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: "#BDE1F3" }}
                >
                  {/* <Icon icon="solar:phone-bold" style={{ color: "#00A9E0" }} /> */}
                  <PhoneCall />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Call Us</h6>
                  <p className="mb-0 text-muted">+91 9013499385</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: "#C4DF9B" }}
                >
                  {/* <Icon icon="solar:letter-bold" style={{ color: "#8DC63F" }} /> */}
                  <Mail />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Email Us</h6>
                  <p className="mb-0 text-muted">support@feelsafe.co</p>
                </div>
              </div>

              {/* <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: "#00A9E0" }}
                >
                  <Mail />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">E-Store (Order Queries)</h6>
                  <p className="mb-0 text-muted">estore@feelsafeco.in</p>
                  <small className="text-muted">(No Reply - For order related queries only)</small>
                </div>
              </div> */}

              {/* <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: "#E6519B" }}
                >
                  <Mail />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Info (Events & Offers)</h6>
                  <p className="mb-0 text-muted">info@feelsafeco.in</p>
                  <small className="text-muted">(No Reply - For registration welcome, events & offers)</small>
                </div>
              </div> */}

              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: "#fce4ec" }}
                >
                  {/* <Icon icon="solar:map-point-bold" style={{ color: "#E6519B" }} /> */}
                  <MapPin />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Visit Us</h6>
                  <p className="mb-0 text-muted">
                    Village Kharkhari Nahar Near MCD School Najafgarh South West New Delhi Delhi 110043
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 pb-5">
              <div className="card border-0 shadow-sm p-4 rounded-4">
                <h5 className="fw-bold mb-3">Send us a Message</h5>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control bg-light border-0"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control bg-light border-0"
                      rows={4}
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    className="btn w-100 text-white fw-bold py-2"
                    style={{ backgroundColor: "#00A9E0" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grievance Cell (Legal) Section */}
      <section className="bg-white py-5 border-top">
        <div className="container">
          <div className="row g-5">
            <div className="col-12 text-center mb-2">
              <h2 className="fw-bold" style={{ color: "#E6519B" }}>
                Grievance Cell (Legal)
              </h2>
              {/* <p className="text-muted mx-auto mt-3" style={{ maxWidth: "800px" }}>
                <strong>Procedure:</strong> First contact our 24x7 Support Team. If they cannot resolve your issue within the expected timeframe, then file a complaint here. Our dedicated Grievance Cell will assign a unique Case ID and ensure resolution within 30 days. A reminder will be sent after 25 days if unresolved.
              </p>
              <ul className="text-start text-muted mx-auto mt-3" style={{ maxWidth: "600px" }}>
                <li><strong>Step 1:</strong> Contact 24x7 Support Team first</li>
                <li><strong>Step 2:</strong> If unresolved, submit grievance here</li>
                <li><strong>Step 3:</strong> Receive unique Case ID</li>
                <li><strong>Step 4:</strong> Get response within 48 hours</li>
                <li><strong>Step 5:</strong> Issue resolved within 30 days</li>
                <li><strong>Reminder:</strong> Alert after 25 days if still pending</li>
              </ul> */}
            </div>
            <div className="col-md-4 mx-auto">
              <div className="card border-0 shadow-sm p-4 rounded-4" style={{ backgroundColor: "#fce4ec" }}>
                <h5 className="fw-bold mb-3">Grievance Contact</h5>
                <div className="mb-3">
                  <p className="mb-1 fw-bold">Name:</p>
                  <p className="mb-0 text-muted">Mukesh Kumar</p>
                </div>
                <div className="mb-3">
                  <p className="mb-1 fw-bold">Email:</p>
                  <p className="mb-0 text-muted">grievance@feelsafeco.in</p>
                </div>
                <div className="mb-0">
                  <p className="mb-1 fw-bold">Mobile:</p>
                  <p className="mb-0 text-muted">+91 8796262996</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
