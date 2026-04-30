import React from "react";
import { FileText, Award, Shield, Globe, CheckCircle } from "lucide-react";

const documents = [
    {
        id: "gst",
        title: "GST Certificate",
        description: "Goods and Services Tax Registration Certificate",
        imageUrl: "https://feelsafeco.in/wp-content/uploads/2026/01/FEEL-SAFE-CO-gst.jpg",
    },
    {
        id: "udyam",
        title: "UDYAM Certificate",
        description: "MSME Registration Certificate (UDYAM)",
        imageUrl: "https://feelsafeco.in/wp-content/uploads/2026/01/FEEL-SAFE-CO-msme.jpg",
    },
    {
        id: "iso",
        title: "ISO 9001:2015",
        description: "ISO 9001:2015 Quality Management System Certification",
        imageUrl: "https://feelsafeco.in/wp-content/uploads/2026/01/FEEL-SAFE-CO-doucment-2_page-0001.jpg",
    },
    {
        id: "iec",
        title: "IEC Certificate",
        description: "Import Export Code Certificate",
        imageUrl: "https://feelsafeco.in/wp-content/uploads/2026/01/FEEL-SAFE-CO-iec.jpg",
    },
    {
        id: "zed",
        title: "ZED Certificate",
        description: "ZED (Zero Effect Zero Defect) Certification",
        imageUrl: "https://feelsafeco.in/wp-content/uploads/2026/01/FEEL-SAFE-CO-zed-1.jpg",
    },
];

const DocumentPage = () => {
    return (
        <div className="container-fluid p-0">
            {/* Hero Section */}
            <section
                className="py-5 text-center"
                style={{ backgroundColor: "#BDE1F3" }}
            >
                <div className="container">
                    <h1 className="display-4 fw-bold" style={{ color: "#1C1C1C" }}>
                        Company{" "}
                        <span style={{ color: "#00A9E0" }}>Documents</span>
                    </h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
                        Feel Safe Private Limited is a certified company with all necessary
                        legal registrations and quality certifications. We maintain the
                        highest standards in manufacturing and business practices.
                    </p>
                </div>
            </section>

            {/* Certifications Overview Section */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div
                                className="p-4 rounded-4 shadow-sm h-100 text-center"
                                style={{ backgroundColor: "#C4DF9B" }}
                            >
                                <FileText
                                    size={40}
                                    className="mb-3"
                                    style={{ color: "#8DC63F" }}
                                />
                                <h5 className="fw-bold mb-2">GST Registered</h5>
                                <p className="text-muted mb-0 small">
                                    Legal entity registered under GST
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div
                                className="p-4 rounded-4 shadow-sm h-100 text-center"
                                style={{ backgroundColor: "#BDE1F3" }}
                            >
                                <Award
                                    size={40}
                                    className="mb-3"
                                    style={{ color: "#00A9E0" }}
                                />
                                <h5 className="fw-bold mb-2">ISO 9001:2015</h5>
                                <p className="text-muted mb-0 small">
                                    Quality Management System certified
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div
                                className="p-4 rounded-4 shadow-sm h-100 text-center"
                                style={{ backgroundColor: "#fce4ec" }}
                            >
                                <Globe
                                    size={40}
                                    className="mb-3"
                                    style={{ color: "#E6519B" }}
                                />
                                <h5 className="fw-bold mb-2">Global Export Ready</h5>
                                <p className="text-muted mb-0 small">
                                    IEC certified for international trade
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Documents Grid */}
                    <div className="row g-4">
                        {documents.map((doc) => (
                            <div key={doc.id} className="col-lg-6">
                                <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-start mb-3">
                                            <div
                                                className="rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                                                style={{
                                                    backgroundColor:
                                                        doc.id === "gst"
                                                            ? "#C4DF9B"
                                                            : doc.id === "udyam"
                                                                ? "#BDE1F3"
                                                                : doc.id === "iso"
                                                                    ? "#8DC63F"
                                                                    : doc.id === "iec"
                                                                        ? "#fce4ec"
                                                                        : "#E6519B",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            >
                                                {doc.id === "gst" && (
                                                    <FileText size={24} style={{ color: "#8DC63F" }} />
                                                )}
                                                {doc.id === "udyam" && (
                                                    <Shield size={24} style={{ color: "#00A9E0" }} />
                                                )}
                                                {doc.id === "iso" && (
                                                    <Award size={24} style={{ color: "#fff" }} />
                                                )}
                                                {doc.id === "iec" && (
                                                    <Globe size={24} style={{ color: "#E6519B" }} />
                                                )}
                                                {doc.id === "zed" && (
                                                    <CheckCircle size={24} style={{ color: "#fff" }} />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="fw-bold mb-1">{doc.title}</h4>
                                                <p className="text-muted mb-0 small">
                                                    {doc.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <a
                                                href={doc.imageUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-sm text-white"
                                                style={{ backgroundColor: "#00A9E0" }}
                                            >
                                                View Certificate
                                            </a>
                                        </div>
                                    </div>
                                    <div className=" px-4 pb-4">
                                        <div
                                            className="border rounded-3 overflow-hidden"
                                            style={{ backgroundColor: "#f8f9fa" }}
                                        >
                                            <img
                                                src={doc.imageUrl}
                                                alt={doc.title}
                                                className="img-fluid w-100"
                                                style={{
                                                    maxHeight: "350px",
                                                    objectFit: "contain",
                                                    objectPosition: "top",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badge Section */}
            <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">
                        Our{" "}
                        <span style={{ color: "#8DC63F" }}>Commitment</span> to Quality
                    </h2>
                    <div className="row g-4 mt-3">
                        <div className="col-md-4">
                            <div className="p-4">
                                <h5 className="fw-bold text-primary">Legal Compliance</h5>
                                <p className="text-muted">
                                    Fully compliant with Indian government regulations and tax laws
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4">
                                <h5 className="fw-bold" style={{ color: "#8DC63F" }}>
                                    Quality Assured
                                </h5>
                                <p className="text-muted">
                                    ISO 9001:2015 certified manufacturing processes
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4">
                                <h5 className="fw-bold" style={{ color: "#E6519B" }}>
                                    Export Ready
                                </h5>
                                <p className="text-muted">
                                    Government certified for international business
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DocumentPage;
