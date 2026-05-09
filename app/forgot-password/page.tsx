"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";

type ApiStatusResponse = {
    status?: boolean;
    message?: string;
};

type ApiErrorShape = {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
};

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<1 | 2>(1);

    // Step 1
    const [identifier, setIdentifier] = useState("");
    const [loadingOtp, setLoadingOtp] = useState(false);

    // Step 2
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loadingReset, setLoadingReset] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const getErrorMessage = (err: unknown): string => {
        if (typeof err === "object" && err !== null) {
            const e = err as ApiErrorShape;
            return (
                e.response?.data?.message ||
                e.message ||
                "Something went wrong"
            );
        }
        return "Something went wrong";
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const id = identifier.trim();
        if (!id) {
            setError("Please enter your phone number");
            return;
        }

        setLoadingOtp(true);
        try {
            const res = (await serverCallFuction(
                "POST",
                "api/ecom/auth/forgot-password-otp",
                { identifier: id }
            )) as ApiStatusResponse;

            if (res?.status === false) {
                setError(res?.message || "Failed to send OTP");
                return;
            }

            setSuccess(res?.message || "OTP sent successfully");
            setStep(2);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoadingOtp(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const id = identifier.trim();
        if (!id) {
            setError("Phone number is missing");
            return;
        }
        if (!otp.trim()) {
            setError("Please enter OTP");
            return;
        }
        if (!newPassword.trim()) {
            setError("Please enter new password");
            return;
        }

        setLoadingReset(true);
        try {
            const res = (await serverCallFuction(
                "POST",
                "api/ecom/auth/reset-password",
                { identifier: id, newPassword, otp }
            )) as ApiStatusResponse;

            if (res?.status === false) {
                setError(res?.message || "Failed to reset password");
                return;
            }

            setSuccess(res?.message || "Password reset successfully");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoadingReset(false);
        }
    };

    return (
        <div
            className="bg-light min-vh-100 d-flex align-items-center py-5"
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div
                            className="card shadow-lg border-0"
                            style={{ backgroundColor: "#ffe0f0" }}
                        >
                            <div className="card-body p-md-5 p-3">
                                <div className="text-center mb-5">
                                    <Image
                                        src="/assets/images/logo.png"
                                        alt="Feel Safe Pvt. Ltd."
                                        width={80}
                                        height={80}
                                        className="mb-3"
                                        priority
                                    />
                                    <h1 className="fw-bold mb-1" style={{ color: "#1C1C1C" }}>
                                        {step === 1 ? "Forgot Password" : "Reset Password"}
                                    </h1>
                                    <p className="text-muted mb-0">
                                        {step === 1
                                            ? "Enter your phone number to receive OTP"
                                            : "Use OTP to set a new password"}
                                    </p>
                                </div>

                                {error && (
                                    <div
                                        className="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                    >
                                        {error}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setError("")}
                                        ></button>
                                    </div>
                                )}

                                {success && (
                                    <div
                                        className="alert alert-success alert-dismissible fade show"
                                        role="alert"
                                    >
                                        {success}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setSuccess("")}
                                        ></button>
                                    </div>
                                )}

                                {step === 1 ? (
                                    <form onSubmit={handleSendOtp}>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="identifier"
                                                className="form-label fw-semibold"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg bg-light border-0 py-3"
                                                id="identifier"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                                placeholder="Enter your phone number"
                                                required
                                            />
                                            <div className="form-text text-muted">
                                                We&apos;ll send an OTP to this number.
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn w-100 text-white fw-bold py-3 shadow"
                                            style={{
                                                backgroundColor: "#00A9E0",
                                                border: "none",
                                                transition: "0.3s",
                                            }}
                                            disabled={loadingOtp}
                                        >
                                            {loadingOtp ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    ></span>
                                                    Sending OTP...
                                                </>
                                            ) : (
                                                "Send OTP"
                                            )}
                                        </button>

                                        <div className="text-center mt-4">
                                            <Link
                                                href="/login"
                                                className="text-decoration-none text-muted text-sm"
                                            >
                                                Back to Login
                                            </Link>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleResetPassword}>
                                        <div className="mb-4">
                                            <label htmlFor="otp" className="form-label fw-semibold">
                                                OTP
                                            </label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                className="form-control form-control-lg bg-light border-0 py-3"
                                                id="otp"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                placeholder="Enter OTP"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="newPassword"
                                                className="form-label fw-semibold"
                                            >
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg bg-light border-0 py-3"
                                                id="newPassword"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="Enter new password"
                                                required
                                                minLength={6}
                                            />
                                            <div className="form-text text-muted">
                                                Minimum 6 characters.
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn w-100 text-white fw-bold py-3 shadow"
                                            style={{
                                                backgroundColor: "#00A9E0",
                                                border: "none",
                                                transition: "0.3s",
                                            }}
                                            disabled={loadingReset}
                                        >
                                            {loadingReset ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    ></span>
                                                    Resetting...
                                                </>
                                            ) : (
                                                "Reset Password"
                                            )}
                                        </button>

                                        <div className="d-flex justify-content-between align-items-center mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-link text-muted text-sm text-decoration-none"
                                                onClick={() => {
                                                    setError("");
                                                    setSuccess("");
                                                    setStep(1);
                                                }}
                                            >
                                                Change phone
                                            </button>

                                            <Link
                                                href="/login"
                                                className="text-decoration-none text-muted text-sm"
                                            >
                                                Back to Login
                                            </Link>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

