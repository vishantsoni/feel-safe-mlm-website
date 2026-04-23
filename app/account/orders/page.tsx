"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import {
  Package,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface Order {
  order_id: string;
  created_at: string;
  order_status: string;
  items_count: number;
  total_amount: number;
  product_name: string; // Assuming this field is returned by the API for display purposes
  product_image?: string; // Optional field for product image URL
}

interface OrdersResponse {
  success: boolean;
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = (await serverCallFuction(
        "GET",
        `api/orders/my?page=${page}&limit=10`,
      )) as OrdersResponse;
      if (res.success) {
        setOrders(res.data || []);
        setTotalPages(Math.ceil(res.total / 10) || 1);
      }
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    let bgClass = "bg-secondary";
    if (s === "completed") bgClass = "bg-success";
    if (s === "processing" || s === "pending") bgClass = "bg-warning text-dark";
    if (s === "shipped") bgClass = "bg-info text-white";
    if (s === "cancelled") bgClass = "bg-danger";

    return (
      <span className={`badge ${bgClass} rounded-pill px-3 py-2 fw-semibold`}>
        {status?.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 min-vh-50">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted fw-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-primary bg-opacity-10 p-2 rounded-3">
          <Package className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="fw-bold m-0">My Orders</h2>
          <p className="text-muted mb-0 small">
            Track and manage your order history
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger border-0 shadow-sm rounded-4 d-flex align-items-center p-4 mb-4">
          <AlertCircle className="me-3" />
          <div className="flex-grow-1">{error}</div>
          <button
            onClick={fetchOrders}
            className="btn btn-danger btn-sm rounded-pill px-3"
          >
            Retry
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center py-5">
          <div className="card-body">
            <div className="bg-light rounded-circle d-inline-flex p-4 mb-4">
              <Package size={48} className="text-muted opacity-50" />
            </div>
            <h4 className="fw-bold">No orders found</h4>
            <p
              className="text-muted mx-auto mb-4"
              style={{ maxWidth: "350px" }}
            >
              Looks like you have not placed any orders yet. Explore our
              products and start shopping!
            </p>
            <Link
              href="/products"
              className="btn btn-primary px-4 py-2 rounded-3 fw-bold shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted small uppercase fw-bold">
                  <tr>
                    <th className="px-4 py-3 border-0">Order Details</th>
                    <th className="px-4 py-3 border-0">Items</th>
                    <th className="px-4 py-3 border-0">Status</th>
                    <th className="px-4 py-3 border-0 text-end">
                      Total Amount
                    </th>
                    <th className="px-4 py-3 border-0 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          {/* 1. Product Image Thumbnail */}
                          <div className="me-3">
                            <img
                              src={
                                order.product_image ||
                                "/assets/product/placeholder.jpg"
                              }
                              alt={order.product_name}
                              className="rounded shadow-sm"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                // e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </div>

                          {/* 2. Product Details */}
                          <div>
                            <div className="fw-bold text-dark mb-0">
                              {order.product_name || "Product Deleted"}
                            </div>
                            <div className="d-flex flex-column">
                              <small
                                className="badge bg-primary w-fit-content"
                                style={{ width: "fit-content" }}
                              >
                                #{order.order_id}
                              </small>
                              <small className="text-muted">
                                Date -{" "}
                                {new Date(order.created_at).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </small>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-dark fw-medium">
                          {order.items_count}{" "}
                          {order.items_count > 1 ? "Items" : "Item"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(order.order_status)}
                      </td>
                      <td className="px-4 py-3 text-end fw-bold text-primary">
                        ₹{Number(order.total_amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          href={`/orders/success/${order.order_id}`}
                          className="btn btn-light btn-sm rounded-3 d-inline-flex align-items-center gap-2 border hover-primary"
                        >
                          <Eye size={16} /> <span>View Details</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="d-md-flex align-items-center justify-content-between px-2">
            <p className="text-muted small mb-3 mb-md-0">
              Showing page <strong>{page}</strong> of{" "}
              <strong>{totalPages}</strong>
            </p>
            <nav>
              <ul className="pagination pagination-sm mb-0 gap-2">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link rounded-3 border-0 shadow-sm px-3 py-2"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft size={18} />
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link rounded-3 border-0 shadow-sm px-3 py-2">
                    {page}
                  </span>
                </li>
                <li
                  className={`page-item ${page === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link rounded-3 border-0 shadow-sm px-3 py-2"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight size={18} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      <style jsx>{`
        .hover-primary:hover {
          background-color: #0d6efd !important;
          color: white !important;
          border-color: #0d6efd !important;
        }
        .table thead th {
          letter-spacing: 0.05rem;
        }
        .min-vh-50 {
          min-height: 50vh;
        }
      `}</style>
    </div>
  );
}
