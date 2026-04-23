"use client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useCart } from "@/lib/contexts/CartContext";
import { Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart, removeItem } = useCart();

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          <symbol id="user" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z"
            />
          </symbol>
          <symbol id="heart" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z"
            />
          </symbol>
          <symbol id="cart" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
            />
          </symbol>
          <symbol id="search" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
            />
          </symbol>
        </defs>
      </svg>

      {/* --- 1. COMMON DRAWERS (Dono Header ke liye) --- */}

      {/* Navigation Drawer */}
      <div
        className="offcanvas offcanvas-start"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav gap-2">
            <li>
              <Link href="/products/sanitory-pad" className="nav-link">
                Sanitary Pads
              </Link>
            </li>
            <li>
              <Link href="/products/adult-diaper" className="nav-link">
                Adult Diapers
              </Link>
            </li>
            <li>
              <Link href="/products/baby-diaper" className="nav-link">
                Baby Diapers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="nav-link">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className="offcanvas offcanvas-end"
        id="offcanvasCart"
        aria-labelledby="My Cart"
      >
        <div className="offcanvas-header border-bottom justify-content-between">
          <h5 className="mb-0">Your Cart</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Items</span>
            <span className="badge bg-primary rounded-pill">
              {cart?.total_items || 0}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cart?.items.map((item, index) => (
              <li
                className="list-group-item d-flex justify-content-between lh-sm"
                key={index}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.f_image}
                    alt=""
                    className="img-thumbnail me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="my-0 small">{item.product_name}</h6>
                    <small className="text-muted">
                      {item.quantity} x ₹{item.price}
                    </small>
                  </div>
                </div>
                <button
                  className="btn btn-sm"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash size={16} color="red" />
                </button>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{cart?.total}</strong>
            </li>
          </ul>
          <Link href="/checkout" className="btn btn-primary w-100">
            Continue to checkout
          </Link>
        </div>
      </div>

      {/* --- 2. DESKTOP HEADER (Original Design) --- */}
      <header className="d-none d-xl-block">
        <div className="container-fluid">
          <div className="row py-3 border-bottom align-items-center">
            <div className="col-lg-3">
              <Link href="/">
                <img
                  src="/assets/images/logo.png"
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-lg-5">
              <div className="search-bar row bg-light p-2 rounded-4 mx-0">
                <div className="col-md-4">
                  <select className="form-select border-0 bg-transparent shadow-none">
                    <option>All Categories</option>
                  </select>
                </div>
                <div className="col-md-7">
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent shadow-none"
                    placeholder="Search products..."
                  />
                </div>
                <div className="col-1">
                  <svg width="24" height="24">
                    <use xlinkHref="#search"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-end gap-4 align-items-center">
              <div className="support-box text-end d-none d-xl-block">
                <span className="fs-6 text-muted">For Support?</span>
                <h5 className="mb-0">+91 9999999999</h5>
              </div>
              <ul className="d-flex list-unstyled m-0 gap-3">
                <li className="dropdown">
                  <a
                    href="#"
                    className="rounded-circle bg-light p-2 d-block"
                    data-bs-toggle="dropdown"
                  >
                    <svg width="24" height="24">
                      <use xlinkHref="#user"></use>
                    </svg>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {isAuthenticated ? (
                      <li>
                        <button onClick={logout} className="dropdown-item">
                          Logout
                        </button>
                      </li>
                    ) : (
                      <li>
                        <Link href="/login" className="dropdown-item">
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li>
                  <a href="#" className="rounded-circle bg-light p-2 d-block">
                    <svg width="24" height="24">
                      <use xlinkHref="#heart"></use>
                    </svg>
                  </a>
                </li>
                <li>
                  <button
                    className="border-0 bg-transparent d-flex flex-column gap-1 lh-1"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCart"
                  >
                    <span className="fs-6 text-muted">Your Cart</span>
                    <span className="cart-total fs-5 fw-bold">
                      ₹{cart?.total || 0}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* Desktop Nav Links */}
          <div className="row py-2 border-bottom">
            <div className="col-12">
              <ul className="nav  gap-4">
                <li>
                  <Link
                    href="/products/sanitory-pad"
                    className="nav-link text-dark"
                  >
                    Sanitary Pads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/adult-diaper"
                    className="nav-link text-dark"
                  >
                    Adult Diapers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/baby-diaper"
                    className="nav-link text-dark"
                  >
                    Baby Diapers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="nav-link text-dark">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="nav-link text-dark">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* --- 3. MOBILE HEADER (Single Row Design) --- */}
      <header className="sticky-top bg-white border-bottom d-block d-xl-none py-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Left: Hamburger */}
            <div className="col-3">
              <button
                className="border-0 bg-transparent p-0 shadow-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
            {/* Center: Logo */}
            <div className="col-6 text-center">
              <Link href="/">
                <img
                  src="/assets/images/logo.png"
                  alt="logo"
                  style={{ maxHeight: "35px" }}
                />
              </Link>
            </div>
            {/* Right: Cart */}
            <div className="col-3 text-end">
              <button
                className="border-0 bg-transparent p-0 position-relative shadow-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
              >
                <svg width="28" height="28">
                  <use xlinkHref="#cart"></use>
                </svg>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                  style={{ fontSize: "0.6rem" }}
                >
                  {cart?.total_items || 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
