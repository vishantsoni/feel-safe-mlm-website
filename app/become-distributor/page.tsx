"use client";

import React from "react";
import Link from "next/link";

const externalSignupUrl = "https://panel.feelsafeco.in/signup";

const faqs = [
    {
        q: "Who can apply to become a distributor?",
        a: "Retailers, wholesalers, NGOs, and business owners across India who can support distribution, promotion, and timely supply of Feel Safe products.",
    },
    {
        q: "Is there any form submission on this page?",
        a: "No. This page is only informational. To complete your application, use the button below which opens the official signup panel.",
    },
    {
        q: "What products can I distribute?",
        a: "You’ll be able to distribute eligible Feel Safe products available through the distributor panel after signup and approval.",
    },
    {
        q: "How long does approval take?",
        a: "Approval timelines can vary based on location and partner requirements. After signup, the panel will guide you through next steps.",
    },
    {
        q: "Can I promote Feel Safe products in my local market?",
        a: "Yes. Distributors are encouraged to promote Feel Safe products locally using the brand materials and support available through the panel.",
    },
];

export default function BecomeDistributorPage() {
    return (
        <main>
            {/* Hero */}
            <section
                className="py-5"
                style={{ background: "linear-gradient(90deg, #e3f8ff 0%, #ffffff 70%)" }}
            >
                <div className="container-fluid">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-7">
                            <div
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
                                style={{
                                    background: "#ffffffaa",
                                    border: "1px solid rgba(0,0,0,0.05)",
                                }}
                            >
                                <span
                                    className="d-inline-block rounded-circle"
                                    style={{ width: 10, height: 10, background: "#00a9e0" }}
                                />
                                <span className="fw-bold" style={{ color: "#222" }}>
                                    Wholesale • Distribution • PAN India
                                </span>
                            </div>

                            <h1 className="display-5 mb-3" style={{ lineHeight: 1.2 }}>
                                Become a distributor of <span style={{ color: "#00a9e0" }}>Feel Safe</span>
                            </h1>

                            <p className="mb-4" style={{ maxWidth: 620, color: "#747474" }}>
                                Expand your business with trusted, high-absorbency sanitary napkins and hygiene
                                products. Apply through the official signup panel and start distributing across
                                your market.
                            </p>

                            <div className="d-flex gap-3 flex-wrap">
                                <a
                                    href={externalSignupUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                >
                                    Apply as Distributor
                                </a>
                                <Link href="/contact-us" className="btn btn-outline-primary">
                                    Contact Us
                                </Link>
                            </div>

                            <div className="mt-4">
                                <small className="text-muted">
                                    You will be redirected to the distributor signup panel.
                                </small>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="card border-0 shadow-sm" style={{ borderRadius: 18 }}>
                                <div
                                    className="card-body p-4"
                                    style={{
                                        background:
                                            "radial-gradient(circle at top, rgba(0,169,224,0.12), transparent 60%)",
                                    }}
                                >
                                    <h3 className="h4 mb-3">What you get</h3>

                                    <ul className="list-unstyled mb-0" style={{ color: "#747474" }}>
                                        {[
                                            "Distributor panel access for orders and updates",
                                            "Product availability and business support flow",
                                            "Brand promotion guidance for your local market",
                                        ].map((t) => (
                                            <li
                                                key={t}
                                                className="mb-3 d-flex gap-2 align-items-start"
                                            >
                                                <span
                                                    className="mt-1"
                                                    style={{
                                                        width: 22,
                                                        height: 22,
                                                        borderRadius: 999,
                                                        background: "#00a9e0",
                                                        color: "#fff",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: 12,
                                                        flex: "0 0 auto",
                                                    }}
                                                >
                                                    ✓
                                                </span>
                                                <div>{t}</div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4">
                                        <a
                                            href={externalSignupUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary w-100"
                                        >
                                            Continue to Signup
                                        </a>
                                    </div>

                                    <div className="mt-2 text-center">
                                        <small className="text-muted">No form on this page</small>
                                    </div>
                                </div>
                            </div>

                            {/* Breadcrumb-like */}
                            <div className="mt-4">
                                <div
                                    className="d-flex align-items-center gap-2 text-muted small"
                                    style={{ opacity: 0.9 }}
                                >
                                    <span>Home</span>
                                    <span>•</span>
                                    <span className="fw-bold" style={{ color: "#222" }}>
                                        Become a Distributor
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why become a distributor */}
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row align-items-end mb-4 g-3">
                        <div className="col-lg-7">
                            <h2 className="mb-2">Why partner with Feel Safe?</h2>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                Build a reliable distribution channel with trusted hygiene products and a
                                streamlined onboarding experience.
                            </p>
                        </div>
                        <div className="col-lg-5 text-lg-end">
                            <a
                                href={externalSignupUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-primary"
                            >
                                Apply Now
                            </a>
                        </div>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                title: "Trusted brand",
                                desc: "Feel Safe is known for quality hygiene products and strong market presence.",
                            },
                            {
                                title: "Better distribution",
                                desc: "Help customers access authentic products through a dependable supply chain.",
                            },
                            {
                                title: "Local growth",
                                desc: "Reach new customers, build repeat demand, and expand your business locally.",
                            },
                            {
                                title: "Simple onboarding",
                                desc: "Use the distributor signup panel to submit your request and follow next steps.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="col-md-6 col-lg-3">
                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{ borderRadius: 16, background: "#fff" }}
                                >
                                    <div className="card-body p-4">
                                        <div
                                            className="mb-3"
                                            style={{
                                                width: 46,
                                                height: 46,
                                                borderRadius: 14,
                                                background: "#e3f8ff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#00a9e0",
                                                fontWeight: 800,
                                            }}
                                        >
                                            ✓
                                        </div>
                                        <h3 className="h5 mb-2" style={{ color: "#222" }}>
                                            {item.title}
                                        </h3>
                                        <p className="mb-0" style={{ color: "#747474", fontSize: 14 }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section
                className="py-5"
                style={{
                    background: "#fafafa",
                    borderTop: "1px solid #f2f2f2",
                    borderBottom: "1px solid #f2f2f2",
                }}
            >
                <div className="container-fluid">
                    <h2 className="mb-4">How it works</h2>

                    <div className="row g-4">
                        {[
                            {
                                step: "01",
                                title: "Open the distributor signup panel",
                                desc: "Use the Apply button to reach the official signup workflow.",
                            },
                            {
                                step: "02",
                                title: "Complete your request details",
                                desc: "Share basic business and location information in the panel.",
                            },
                            {
                                step: "03",
                                title: "Get onboarding updates",
                                desc: "After review, the panel will guide you through further steps.",
                            },
                            {
                                step: "04",
                                title: "Start distributing Feel Safe products",
                                desc: "Stock and sell Feel Safe hygiene products in your market.",
                            },
                        ].map((s) => (
                            <div key={s.step} className="col-md-6 col-lg-3">
                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{ borderRadius: 16, background: "#fff" }}
                                >
                                    <div className="card-body p-4">
                                        <div
                                            className="mb-2"
                                            style={{
                                                fontWeight: 900,
                                                letterSpacing: 0.4,
                                                color: "#00a9e0",
                                            }}
                                        >
                                            {s.step}
                                        </div>
                                        <h3 className="h5 mb-2" style={{ color: "#222" }}>
                                            {s.title}
                                        </h3>
                                        <p className="mb-0" style={{ color: "#747474", fontSize: 14 }}>
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                        <a
                            href={externalSignupUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                        >
                            Apply as Distributor
                        </a>
                        <Link href="/contact-us" className="btn btn-outline-primary">
                            Ask for Help
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row align-items-end mb-4">
                        <div className="col-lg-7">
                            <h2 className="mb-2">Frequently asked questions</h2>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                Quick answers about becoming a distributor and the signup process.
                            </p>
                        </div>
                        <div className="col-lg-5 text-lg-end">
                            <a
                                href={externalSignupUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-primary"
                            >
                                Go to Signup
                            </a>
                        </div>
                    </div>

                    <div className="accordion" id="becomeDistributorFaq">
                        {faqs.map((f, idx) => {
                            const collapseId = `faq-collapse-${idx}`;
                            const headingId = `faq-heading-${idx}`;
                            return (
                                <div
                                    key={f.q}
                                    className="accordion-item"
                                    style={{ border: "1px solid #f0f0f0" }}
                                >
                                    <h2 className="accordion-header" id={headingId}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${collapseId}`}
                                            aria-expanded={idx === 0}
                                            aria-controls={collapseId}
                                            style={{
                                                fontWeight: 800,
                                                background: idx === 0 ? "#e3f8ff" : "#fff",
                                            }}
                                        >
                                            {f.q}
                                        </button>
                                    </h2>
                                    <div
                                        id={collapseId}
                                        className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                                        aria-labelledby={headingId}
                                        data-bs-parent="#becomeDistributorFaq"
                                    >
                                        <div className="accordion-body" style={{ color: "#747474" }}>
                                            {f.a}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section
                className="py-5"
                style={{ background: "linear-gradient(90deg, #e3f8ff 0%, #ffffff 70%)" }}
            >
                <div className="container-fluid">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <h2 className="mb-2">Ready to partner with Feel Safe?</h2>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                Start your distributor request using the official signup panel. This page won’t
                                submit any form—only informational content.
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <a
                                href={externalSignupUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                Apply via Signup Panel
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

