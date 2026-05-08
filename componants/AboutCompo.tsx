"use client"
import React from 'react'
import { Mail, MapPin, PhoneCall, ShieldCheck, Heart, Leaf, Users, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Icon } from "@iconify/react";
import { useAuth } from '@/lib/contexts/AuthContext';
import { ContactData } from '@/lib/types/Setting';
import LogoCompo from './logo/LogoCompo';
const AboutCompo = () => {

    const { setting, getSettingByKey } = useAuth();

    const [contactData, setContactData] = React.useState<ContactData | null>(null);



    React.useEffect(() => {
        let active = true;

        const loadContactData = async () => {
            try {
                const data = await getSettingByKey("contact_us") as ContactData;
                console.log("data - contact data = ", data);

                if (active) {
                    setContactData(data);
                }
            } catch (error) {
                console.error("Failed to load contact data", error);
            }
        };

        loadContactData();

        return () => {
            active = false;
        };
    }, [setting]);




    return (
        <div className="container-fluid p-0 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* Hero Section */}
            <section className="py-5" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 100%)" }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-12 mx-auto">
                            <span className="badge px-3 py-2 mb-3 rounded-pill" style={{ backgroundColor: "#8DC63F", color: "#fff" }}>
                                CIN: U13996DL2026PTC465812
                            </span>
                            {/* <h1 className="display-3 fw-bold mb-3" style={{ color: "#1C1C1C" }}>
                                Feel Safe <span style={{ color: "#00A9E0" }}>Pvt. Ltd.</span>
                            </h1> */}
                            <LogoCompo />

                            <p className="lead text-muted mb-4 shadow-none">
                                A leading manufacturer and distributor based in Najafgarh, New Delhi,
                                committed to transforming women’s hygiene and health standards across India.
                            </p>
                            <div className="d-flex gap-3 flex-column flex-md-row">
                                <button className="btn btn-lg shadow-sm px-4 text-white" style={{ backgroundColor: "#00A9E0" }} onClick={() => {
                                    navigation.navigate("/become-distributor")
                                }} >
                                    Join Sakhi Mission
                                </button>
                                <button className="btn btn-lg btn-outline-dark px-4" onClick={() => {
                                    navigation.navigate('/products')
                                }}>Our Products</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Identity & Core Values */}
            <section className="py-5 container text-center">
                <div className="row mb-5">
                    <div className="col-md-8 mx-auto">
                        <h2 className="fw-bold mb-3">Our Identity</h2>
                        <p className="text-muted">Founded by <strong>Ram Niwas</strong>, the company is built on quality, trust, and social responsibility, focusing on creating both health awareness and economic opportunities for women.</p>
                    </div>
                </div>
                <div className="row g-4">
                    {[
                        { icon: <ShieldCheck size={40} />, title: "Mission", text: "Providing safe, affordable, high-quality sanitary products.", color: "#00A9E0", bg: "#e0f2fe" },
                        { icon: <Heart size={40} />, title: "Vision", text: "An India where menstrual health awareness is normalized.", color: "#E6519B", bg: "#fdf2f8" },
                        { icon: <Leaf size={40} />, title: "Sustainability", text: "Safe hygiene solutions for a healthier tomorrow.", color: "#8DC63F", bg: "#f0fdf4" }
                    ].map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="p-5 rounded-4 h-100 border-0 shadow-sm transition-hover" style={{ backgroundColor: item.bg }}>
                                <div className="mb-3" style={{ color: item.color }}>{item.icon}</div>
                                <h4 className="fw-bold">{item.title}</h4>
                                <p className="text-muted mb-0">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Highlight */}
            <section className="py-5 bg-light rounded">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h6 className="text-uppercase fw-bold" style={{ color: "#8DC63F" }}>Flagship Brand</h6>
                            <h2 className="display-5 fw-bold mb-4">FEEL <span style={{ color: "#E6519B" }}>Sanitary Pads</span></h2>
                            <ul className="list-unstyled">
                                {[
                                    "100% Hygiene Protection",
                                    "Skin-friendly Material",
                                    "High Absorbency for long-lasting protection",
                                    "ISO 9001:2015 & ISO 13485 Certified"
                                ].map((text, i) => (
                                    <li key={i} className="mb-3 d-flex align-items-center">
                                        <CheckCircle className="me-2" size={20} color="#8DC63F" />
                                        <span className="text-muted fs-5">{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="alert bg-white border-start border-4 border-info shadow-sm mt-4">
                                We strictly adhere to <strong>Bureau of Indian Standards (BIS)</strong> guidelines.
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="p-5 rounded-circle d-inline-block shadow-lg bg-white">
                                <Icon icon="solar:shield-user-bold" style={{ fontSize: "180px", color: "#00A9E0" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sakhi Yojna Section */}
            <section className="py-5 bg-gray mt-4 rounded" style={{ backgroundColor: "#ffb9dc" }}>
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="display-6 fw-bold">Vision 2030: <span style={{ color: "#E6519B" }}>1 Lakh Sakhi Mission</span></h2>
                        <p className="lead opacity-75 text-dark">Nurturing women as Entrepreneurs, Leaders, and Ambassadors.</p>
                    </div>

                    <div className="row g-4 text-center">
                        {[
                            { step: "1", title: "Register", desc: "Join as a Sakhi partner" },
                            { step: "2", title: "Training", desc: "Get professional support" },
                            { step: "3", title: "Awareness", desc: "Educate your community" },
                            { step: "4", title: "Earn", desc: "Stable growing income" }
                        ].map((item, i) => (
                            <div className="col-md-3" key={i}>
                                <div className="h1 fw-bold text-dark mb-0" style={{ fontSize: '4rem' }}>{item.step}</div>
                                <h5 className="fw-bold" style={{ color: "#E6519B" }}>{item.title}</h5>
                                <p className="small opacity-75 text-dark">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance & Contact */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 h-100">
                                <h4 className="fw-bold mb-4">Contact Info</h4>
                                <div className="d-flex mb-4">
                                    <PhoneCall className="me-3" color="#00A9E0" />
                                    <div>
                                        <p className="mb-0 fw-bold">24x7 Support</p>
                                        <p className="text-muted">+91 {contactData?.phone}</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-4">
                                    <Mail className="me-3" color="#E6519B" />
                                    <div>
                                        <p className="mb-0 fw-bold">Email Us</p>
                                        <p className="text-muted">{contactData?.email_1}</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <MapPin className="me-3" color="#8DC63F" />
                                    <div>
                                        <p className="mb-0 fw-bold">Location</p>
                                        <p className="text-muted small">{contactData?.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm p-4 h-100 bg-light">
                                <h4 className="fw-bold mb-3 text-center">Legal Compliance</h4>
                                <p className="text-center text-muted px-lg-5 mb-4">
                                    Fully transparent organization adhering to the <strong>Direct Selling Rules, 2021</strong>.
                                    All transactions are secured via Razorpay.
                                </p>
                                <div className="row text-center g-3">
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <TrendingUp size={24} color="#8DC63F" className="mb-2" />
                                            <p className="small fw-bold mb-0">Direct Selling</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <Award size={24} color="#00A9E0" className="mb-2" />
                                            <p className="small fw-bold mb-0">ISO Certified</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <Users size={24} color="#E6519B" className="mb-2" />
                                            <p className="small fw-bold mb-0">1 Lakh Sakhis</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <ShieldCheck size={24} color="#00A9E0" className="mb-2" />
                                            <p className="small fw-bold mb-0">BIS Standards</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grievance Footer Section */}
            <section className="py-4 border-top">
                <div className="container text-center">
                    <p className="text-muted small mb-0">
                        For legal concerns, contact our <strong>Grievance Cell</strong>: grievance@feelsafeco.in | +91 8796262996
                    </p>
                </div>
            </section>

        </div>
    )
}

export default AboutCompo
