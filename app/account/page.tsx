"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import { Package, ShoppingBag, Heart, MapPin } from "lucide-react";

interface Order {
  order_id: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AccountDashboard() {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch recent orders
      const ordersRes = await serverCallFuction(
        "GET",
        "api/ecom/orders?limit=5",
      );
      if ((ordersRes as any).success) {
        setRecentOrders((ordersRes as any).data || []);
      }

      // Mock stats (replace with real API calls)
      setStats({
        totalOrders: 12,
        totalSpent: 4589,
        wishlistCount: 3,
      });
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        Loading...
      </div>
    );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="d-flex grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-white p-6 rounded-3xl shadow-xl gap-3 mb-5"
        style={{ justifyContent: "space-between" }}
      >
        <div className="card p-3 bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl w-100">
          <div className="flex items-center gap-3">
            <Package className="w-12 h-12 opacity-75" />
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className=" card p-3 bg-gradient-to-br from-green-500 to-green-600  p-6 rounded-2xl shadow-xl w-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-12 h-12 opacity-75" />
            <div>
              <p className="text-green-100 text-sm font-medium">Total Spent</p>
              <p className="text-3xl font-bold">
                ₹{stats.totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-3 bg-gradient-to-br from-pink-500 to-pink-600  p-6 rounded-2xl shadow-xl w-100">
          <div className="flex items-center gap-3">
            <Heart className="w-12 h-12 opacity-75" />
            <div>
              <p className="text-pink-100 text-sm font-medium">Wishlist</p>
              <p className="text-3xl font-bold">{stats.wishlistCount}</p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Quick Actions */}
      <div
        className="d-flex align-items-center justify-content-space-arround grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        style={{
          justifyContent: "space-around",
        }}
      >
        <Link
          href="/products"
          className="group card p-3 border-0 shadow-sm rounded-4"
        >
          <div className=" border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 group-hover:text-primary mb-4" />
            <h5 className="text-xl font-bold text-gray-900 mb-2">
              Continue Shopping
            </h5>
            <p className="text-gray-500">Browse new products</p>
          </div>
        </Link>

        <Link
          href="/account/orders"
          className="group card p-3 border-0 shadow-sm rounded-4"
        >
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col items-center justify-center">
            <Package className="w-16 h-16 text-gray-400 group-hover:text-primary mb-4" />
            <h5 className="text-xl font-bold text-gray-900 mb-2">
              View Orders
            </h5>
            <p className="text-gray-500">Track your purchases</p>
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="group card p-3 border-0 shadow-sm rounded-4"
        >
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col items-center justify-center">
            <Heart className="w-16 h-16 text-gray-400 group-hover:text-primary mb-4" />
            <h5 className="text-xl font-bold text-gray-900 mb-2">
              My Wishlist
            </h5>
            <p className="text-gray-500">Saved items</p>
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="group card p-3 border-0 shadow-sm rounded-4"
        >
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col items-center justify-center">
            <MapPin className="w-16 h-16 text-gray-400 group-hover:text-primary mb-4" />
            <h5 className="text-xl font-bold text-gray-900 mb-2">
              Manage Addresses
            </h5>
            <p className="text-gray-500">Update delivery info</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div>
        <hr />
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
        {error ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <p className="text-yellow-800">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
            <Package className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-6">
              Your recent purchases will appear here.
            </p>
            <Link href="/products" className="btn-primary btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{Number(order.total_amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/orders/success/${order.order_id}`}
                          className="text-primary hover:text-blue-700 font-medium"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t">
              <Link
                href="/account/orders"
                className="text-primary hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All Orders →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
