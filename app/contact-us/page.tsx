import { Mail, MapPin, PhoneCall } from "lucide-react";
import React from "react";

const ContactPage = () => {
  return (
    <div className="container-fluid p-0 bg-white">
      {/* Header Section */}
      <section
        className="py-5 text-center"
        style={{ backgroundColor: "#BDE1F3" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold" style={{ color: "#1C1C1C" }}>
            Get In <span style={{ color: "#00A9E0" }}>Touch</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Have a question about our premium pads, diapers, or interested in
            joining our growing distributor network? Our team is ready to
            support you.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-5">
          {/* Contact Information Cards */}
          <div className="col-lg-5">
            <div className="mb-5">
              <h2 className="fw-bold mb-4" style={{ color: "#1C1C1C" }}>
                Contact Information
              </h2>
              <p className="text-muted mb-5">
                Reach out to us through any of these channels. We aim to respond
                to all inquiries within 24 business hours.
              </p>

              {/* Phone Card */}
              <div className="d-flex align-items-start mb-4">
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    backgroundColor: "#C4DF9B",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  {/* <Icon icon="solar:phone-calling-rounded" style={{ color: "#8DC63F", fontSize: "28px" }} /> */}
                  <PhoneCall />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Call Support</h5>
                  <p className="text-muted mb-0">+91 98765 43210</p>
                  <small className="text-brand-green fw-medium">
                    Mon-Sat, 9am - 6pm
                  </small>
                </div>
              </div>

              {/* Email Card */}
              <div className="d-flex align-items-start mb-4">
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    backgroundColor: "#fce4ec",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  {/* <Icon icon="solar:letter-bold" style={{ color: "#E6519B", fontSize: "28px" }} /> */}
                  <Mail />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Email Us</h5>
                  <p className="text-muted mb-0">support@feelsafe.co</p>
                  <p className="text-muted mb-0">info@feelsafe.co</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="d-flex align-items-start">
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    backgroundColor: "#BDE1F3",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  {/* <Icon icon="solar:map-point-bold" style={{ color: "#00A9E0", fontSize: "28px" }} /> */}
                  <MapPin />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Office Location</h5>
                  <p className="text-muted mb-0">
                    Feel Safe Private Limited Headquarters,
                  </p>
                  <p className="text-muted mb-0">Business District, Hathras,</p>
                  <p className="text-muted mb-0">Uttar Pradesh - 204101</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4">
              <h3 className="fw-bold mb-4">Send us a Message</h3>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-3"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control bg-light border-0 py-3"
                      placeholder="+91 XXXX-XXXXXX"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control bg-light border-0 py-3"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>
                    <select className="form-select bg-light border-0 py-3">
                      <option>General Inquiry</option>
                      <option>Product Feedback</option>
                      <option>Join Distributor Network</option>
                      <option>Bulk Order Request</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control bg-light border-0 py-3"
                      rows={5}
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button
                      className="btn w-100 text-white fw-bold py-3 shadow"
                      style={{ backgroundColor: "#00A9E0", transition: "0.3s" }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Placeholder */}
      <section className="container-fluid p-0 mt-5 mb-5">
        <div
          style={{ width: "100%", height: "400px", backgroundColor: "#eee" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p className="text-muted">
            Google Maps Embed for Delhi Location Goes Here
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
