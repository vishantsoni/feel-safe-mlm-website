"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import { LoginResponse } from "@/lib/types/User";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = (await serverCallFuction("POST", "api/ecom/auth/login", {
        email,
        password,
      })) as LoginResponse;
      if (res.status && res.token) {
        Cookies.set("token", res.token as string, { expires: 1 });
        window.location.href = "http://localhost:3000";
      } else {
        setError(res.message || "Login Failed");
      }
    } catch (err: unknown) {
      console.log("Login error:", err);

      const errorMessage = "Login Failed: Check credentials";
      setError((err as any)?.response?.data?.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hide Navbar/Footer effect via reduced padding for cleaner full-screen look */}
      <div
        className="bg-light min-vh-100 d-flex align-items-center py-5"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="text-center mb-5">
                    <Image
                      src="/assets/images/logo.png"
                      alt="Feel Safe Co."
                      width={80}
                      height={80}
                      className="mb-3"
                      priority
                    />
                    <h1 className="fw-bold mb-1" style={{ color: "#1C1C1C" }}>
                      Login to Feel Safe MLM
                    </h1>
                    <p className="text-muted">
                      Sign in to your distributor account
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

                  <form onSubmit={handleLogin}>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg bg-light border-0 py-3"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg bg-light border-0 py-3"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="remember"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-decoration-none text-muted"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold py-3 shadow"
                      style={{
                        backgroundColor: "#00A9E0",
                        border: "none",
                        transition: "0.3s",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Signing in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      Don&apos;t have an account?
                    </p>
                    <Link
                      href="/register"
                      className="btn btn-outline-primary px-4 py-2 fw-semibold"
                    >
                      Sign Up Now
                    </Link>
                  </div>

                  <hr className="my-4" />
                  <div className="text-center">
                    <p className="text-muted mb-3">Or continue with</p>
                    <button className="btn btn-outline-dark w-100 py-2 mb-2">
                      <i className="fab fa-google me-2"></i>Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
