"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import {
    Truck,
    Clock,
    MapPin,
    PackageCheck,
    AlertCircle,
    ShieldCheck,
    Ban,
    PhoneCall,
    Mail,
    Box,
    Store,
    Info,
    CheckCircle2
} from "lucide-react";
import React from "react";

const ShippingCompo = () => {
    const { getSettingByKey } = useAuth();
    const contact_setting = getSettingByKey("contact_us") || {};
    return (
        <div className="container my-5 py-4">
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white">

                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm"
                                style={{ backgroundColor: "#e0f2fe", width: "80px", height: "80px" }}>
                                <Truck size={40} color="#00A9E0" />
                            </div>
                            <h1 className="fw-bold display-5" style={{ color: "#1C1C1C" }}>
                                Shipping & <span style={{ color: "#8DC63F" }}>Delivery</span> Policy
                            </h1>
                            <h5 className="text-uppercase fw-bold mt-2" style={{ color: "#E6519B", letterSpacing: "1px" }}>
                                Feel Safe Private Limited
                            </h5>
                            <p className="text-muted small mb-0">CIN: U13996DL2026PTC465812</p>
                            <p className="text-muted small">Website: www.feelsafeco.in</p>
                            <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #8DC63F", opacity: 1 }} />
                        </div>

                        {/* 1. Introduction */}
                        <div className="alert border-0 p-4 mb-5 shadow-sm" style={{ backgroundColor: "#f8fafc", borderRadius: "15px" }}>
                            <h5 className="fw-bold d-flex align-items-center mb-3" style={{ color: "#1C1C1C" }}>
                                <Info className="me-2" size={20} /> 1. Introduction
                            </h5>
                            <p className="mb-0 text-secondary">
                                This Shipping & Delivery Policy outlines the terms and conditions governing the shipment and delivery of products purchased from Feel Safe Private Limited for both end customers and distributors (Sakhis). We are committed to providing fast, reliable, and secure delivery services across India.
                            </p>
                        </div>

                        <div className="row g-4">
                            {/* 2. Processing Time */}
                            <div className="col-md-6">
                                <section className="h-100 p-4 rounded-4 border border-light bg-light">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#00A9E0" }}>
                                        <Clock className="me-2" size={20} /> 2. Order Processing Time
                                    </h5>
                                    <ul className="small text-muted ps-3">
                                        <li className="mb-2">All orders are processed and dispatched within <strong>24 to 48 working hours</strong> after order confirmation.</li>
                                        <li>Orders are not processed on Sundays and public holidays.</li>
                                    </ul>
                                </section>
                            </div>

                            {/* 3. Shipping Coverage */}
                            <div className="col-md-6">
                                <section className="h-100 p-4 rounded-4 border border-light bg-light">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#8DC63F" }}>
                                        <MapPin className="me-2" size={20} /> 3. Shipping Coverage (Pan-India)
                                    </h5>
                                    <p className="small text-muted mb-2">We deliver across all regions of India, including:</p>
                                    <div className="d-flex gap-2 flex-wrap mb-3">
                                        <span className="badge bg-white text-dark border px-3 py-2">Metro cities</span>
                                        <span className="badge bg-white text-dark border px-3 py-2">Tier-1 and Tier-2 cities</span>
                                        <span className="badge bg-white text-dark border px-3 py-2">Rural and remote areas</span>
                                    </div>
                                    <p className="small text-muted italic">Our logistics network ensures that products reach every Sakhi and customer efficiently.</p>
                                </section>
                            </div>

                            {/* 4. Delivery Timeline */}
                            <div className="col-md-6">
                                <section className="h-100 p-4 rounded-4 border border-light bg-light">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#E6519B" }}>
                                        <PackageCheck className="me-2" size={20} /> 4. Delivery Timeline
                                    </h5>
                                    <p className="small text-muted">Estimated delivery timelines after dispatch:</p>
                                    <div className="space-y-2">
                                        <div className="d-flex justify-content-between border-bottom pb-1 small">
                                            <span>Metro Cities</span>
                                            <span className="fw-bold">3–5 working days</span>
                                        </div>
                                        <div className="d-flex justify-content-between border-bottom pb-1 pt-1 small">
                                            <span>Other Regions</span>
                                            <span className="fw-bold">5–7 working days</span>
                                        </div>
                                        <div className="d-flex justify-content-between pb-1 pt-1 small">
                                            <span>Remote Areas</span>
                                            <span className="fw-bold">7–10 working days</span>
                                        </div>
                                    </div>
                                    <p className="x-small text-muted mt-2">Note: Delivery timelines may vary depending on location, logistics availability, and external factors.</p>
                                </section>
                            </div>

                            {/* 5. Charges & 6. Tracking */}
                            <div className="col-md-6">
                                <section className="h-100 p-4 rounded-4 border border-light bg-light">
                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-2 text-uppercase small" style={{ color: "#1C1C1C" }}>5. Shipping Charges</h6>
                                        <ul className="x-small text-muted ps-3 mb-0">
                                            <li>Based on order value, weight, and delivery location.</li>
                                            <li>Displayed at the time of checkout.</li>
                                            <li>Free shipping may be offered for promotional/bulk orders.</li>
                                            <li>Non-refundable, unless due to company error.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-2 text-uppercase small" style={{ color: "#1C1C1C" }}>6. Order Tracking</h6>
                                        <ul className="x-small text-muted ps-3 mb-0">
                                            <li>Tracking link sent via SMS and email once dispatched.</li>
                                            <li>Track through website account dashboard.</li>
                                        </ul>
                                    </div>
                                </section>
                            </div>

                            {/* 7. Partners & 14. Local Pickup */}
                            <div className="col-md-12">
                                <section className="p-4 rounded-4 border shadow-sm">
                                    <div className="row g-4">
                                        <div className="col-md-6 border-end">
                                            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#00A9E0" }}>
                                                <Box className="me-2" size={20} /> 7. Delivery Partners
                                            </h5>
                                            <p className="small text-muted mb-2">Reputed logistics providers:</p>
                                            <div className="d-flex gap-3 align-items-center">
                                                <span className="fw-bold small text-muted border-end pe-3">Delhivery</span>
                                                <span className="fw-bold small text-muted border-end pe-3">Blue Dart</span>
                                                <span className="fw-bold small text-muted">Ecom Express</span>
                                            </div>
                                            <p className="x-small text-muted mt-3 mb-0">We may also utilize our local distributor network for last-mile delivery.</p>
                                        </div>
                                        {/* <div className="col-md-6 ps-md-4">
                                            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#8DC63F" }}>
                                                <Store className="me-2" size={20} /> 14. Local Store Pickup
                                            </h5>
                                            <p className="small text-muted mb-2">For Distributors (Sakhis) at "Feel Safe Local Center":</p>
                                            <ul className="x-small text-muted mb-0">
                                                <li>No shipping charges apply.</li>
                                                <li>Valid ID and order confirmation required.</li>
                                            </ul>
                                        </div> */}
                                        <div className="col-md-6 ps-md-4">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6 className="fw-bold small" style={{ color: "#E6519B" }}>8. Responsibility</h6>
                                                    <p className="x-small text-muted">Complete and accurate delivery address must be provided. Company is not responsible for errors in details.</p>
                                                </div>
                                                <div className="col-md-6 border-start ps-md-4">
                                                    <h6 className="fw-bold small" style={{ color: "#E6519B" }}>9. Failed Attempts</h6>
                                                    <p className="x-small text-muted">Due to incorrect address or unavailability. Re-delivery may be attempted with additional charges.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Warnings 10 & 11 */}
                            <div className="col-md-12">
                                <div className="p-4 rounded-4" style={{ backgroundColor: "#fff5f5", borderLeft: "5px solid #f87171" }}>
                                    <h5 className="fw-bold mb-3 text-error d-flex align-items-center">
                                        <ShieldCheck className="me-2" size={22} /> 10. Damaged Shipments & 11. Missing Items
                                    </h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <p className="small mb-0"><strong>Refuse Delivery:</strong> If package is damaged or tampered, refuse immediately and report within 24 hours.</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="small mb-0"><strong>Missing Products:</strong> Report within 24 hours of delivery supported with photo/video proof.</p>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <div className="bg-white p-2 rounded border border-danger-subtle text-center shadow-sm">
                                                <p className="small mb-0 text-dark fw-bold">⚠️ Important: Customers are strongly advised to record an unboxing video for verification.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 8, 9, 12, 13 General Terms */}
                            <div className="col-md-12">
                                <section className="p-4 rounded-4 border">
                                    <div className="row g-4">
                                        {/* <div className="col-md-3">
                                            <h6 className="fw-bold small" style={{ color: "#E6519B" }}>8. Responsibility</h6>
                                            <p className="x-small text-muted">Complete and accurate delivery address must be provided. Company is not responsible for errors in details.</p>
                                        </div>
                                        <div className="col-md-3 border-start ps-md-4">
                                            <h6 className="fw-bold small" style={{ color: "#E6519B" }}>9. Failed Attempts</h6>
                                            <p className="x-small text-muted">Due to incorrect address or unavailability. Re-delivery may be attempted with additional charges.</p>
                                        </div> */}
                                        <div className="col-md-6 border-start ps-md-4">
                                            <h6 className="fw-bold small" style={{ color: "#E6519B" }}>12. Partial Deliveries</h6>
                                            <p className="x-small text-muted">Orders may be shipped in multiple consignments depending on availability.</p>
                                        </div>
                                        <div className="col-md-6 border-start ps-md-4">
                                            <h6 className="fw-bold small" style={{ color: "#E6519B" }}>13. Delivery Delays</h6>
                                            <p className="x-small text-muted">Due to weather, transport, or high volumes. Company is not liable but will make efforts to deliver.</p>
                                        </div>
                                        <div className="col-md-6  ps-md-4">
                                            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#8DC63F" }}>
                                                <Store className="me-2" size={20} /> 14. Local Store Pickup
                                            </h5>
                                            <p className="small text-muted mb-2">For Distributors (Sakhis) at "Feel Safe Local Center":</p>
                                            <ul className="x-small text-muted mb-0">
                                                <li>No shipping charges apply.</li>
                                                <li>Valid ID and order confirmation required.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* 15, 16, 17, 18, 21 Specifics */}
                            <div className="col-md-12">
                                <section className="p-4 rounded-4 border bg-light">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                <CheckCircle2 className="me-2 text-success" size={18} /> 15. Distributor (Sakhi) Policy
                                            </h6>
                                            <ul className="x-small text-muted ps-3">
                                                <li>Bulk orders may require additional processing time.</li>
                                                <li>Special logistics arrangements may apply.</li>
                                                <li>Costs vary depending on order size/location.</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                <Ban className="me-2 text-error" size={18} /> 16. Cancellation & 18. International
                                            </h6>
                                            <ul className="x-small text-muted ps-3">
                                                <li>Cancel <strong>before dispatch only</strong>. No cancellation after dispatch.</li>
                                                <li>Currently, we provide shipping <strong>only within India</strong>.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <hr className="my-3 text-muted opacity-25" />
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <h6 className="fw-bold mb-2 small">17. Risk & Ownership</h6>
                                            <p className="x-small text-muted mb-0">Ownership and risk transfer upon successful delivery. Inspect packages at receipt.</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="fw-bold mb-2 small text-error">21. Important Disclaimer</h6>
                                            <p className="x-small text-muted mb-0">Delivery timelines are indicative, not guaranteed. Company not liable for delays beyond control.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Support & Footer */}
                        <div className="mt-5 pt-5 border-top">
                            <div className="row g-4 justify-content-center">
                                <div className="col-md-auto text-md-center">
                                    <h5 className="fw-bold mb-4">19. Contact for Shipping Support</h5>
                                    <div className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-md-center">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm bg-white"
                                                style={{ width: "40px", height: "40px", border: "1px solid #00A9E0" }}>
                                                <PhoneCall size={18} color="#00A9E0" />
                                            </div>
                                            <p className="fw-bold text-dark mb-0">+91 {contact_setting?.phone}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm bg-white"
                                                style={{ width: "40px", height: "40px", border: "1px solid #E6519B" }}>
                                                <Mail size={18} color="#E6519B" />
                                            </div>
                                            <p className="fw-bold text-dark mb-0">{contact_setting?.email_1}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="p-3 bg-light rounded-3 d-inline-block px-md-5 border">
                                    <p className="small fw-bold mb-0 text-dark">20. Policy Updates</p>
                                    <p className="x-small text-muted mb-0">Feel Safe Private Limited reserves the right to modify this policy at any time without prior notice.</p>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <h5 className="fw-bold" style={{ color: "#8DC63F" }}>✅ Feel Safe Private Limited</h5>
                                <p className="small text-muted italic mb-0">At Feel Safe Pvt. Ltd., we strive to ensure that every order reaches you safely, quickly, and efficiently.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .x-small { font-size: 0.8rem; }
                .italic { font-style: italic; }
                .space-y-2 > div:not(:last-child) { margin-bottom: 0.5rem; }
            `}</style>
        </div>
    );
};

export default ShippingCompo;