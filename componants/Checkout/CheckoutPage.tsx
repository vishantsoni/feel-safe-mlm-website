"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/contexts/CartContext";
import serverCallFuction from "@/lib/constantFunction";
import { IndianRupee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/componants/ProtectedRoute/ProtectedRoute";
import type { Address } from "@/lib/types/Address";
import type { CartItem, VariantDetails } from "@/lib/types/Cart";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/addressApi";
import Script from "next/script";

interface CheckoutItem {
  product_id: number;
  variation_id: string | null;
  quantity: number;
  price: number;

  product_name?: string;
  variant_sku?: string;
  variant_details: VariantDetails | null;
}

// interface ShippingAddress removed - using Address type

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, loading: cartLoading, fetchCart, refreshCart } = useCart();

  const productId = searchParams.get("productId");
  const variantIdParam = searchParams.get("variantId");
  const qtyParam = searchParams.get("qty") || "1";
  const slug = searchParams.get("slug") || "";

  const variantId = variantIdParam ? parseInt(variantIdParam!) : null;
  const qty = parseInt(qtyParam) || 1;

  const [singleItem, setSingleItem] = useState<CheckoutItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartError, setCartError] = useState("");
  // formData repurposed for manual entry fallback
  const [formData, setFormData] = useState({
    address_line1: "",
    address_line2: "",
    fullAddress: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet");
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState("");

  // Address logic
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    is_default: false,
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const isCartMode = !!(cart && cart.items.length > 0);
  const displayItems = isCartMode
    ? cart!.items
    : singleItem
    ? [singleItem]
    : [];

  const subTotal = isCartMode
    ? Number(cart!.subtotal)
    : singleItem
    ? singleItem.price * singleItem.quantity
    : 0;
  const totalAmount = isCartMode
    ? Number(cart!.total)
    : singleItem
    ? singleItem.price * singleItem.quantity
    : 0;

  const tax_amount = isCartMode
    ? Number(cart!.total_tax)
    : singleItem
    ? singleItem.price * singleItem.quantity
    : 0;

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (err) {
        console.error("Cart load error:", err);
        setCartError("Cart unavailable - proceeding with empty cart");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (!isCartMode && productId && slug) {
      const fetchItem = async () => {
        try {
          const res = await serverCallFuction(
            "GET",
            `api/products/product-detail/${slug}`,
          );
          const data = res as any;
          if (data?.success && data.data) {
            const apiProduct = data.data;
            let unitPrice =
              (apiProduct.product as any)?.discounted_price ||
              (apiProduct.product as any)?.base_price ||
              0;
            if (variantId) {
              const v = apiProduct.variants?.find(
                (vv: any) => vv.id === variantId,
              );
              if (v) unitPrice = v.price;
            }
            setSingleItem({
              product_id: parseInt(productId),
              variation_id: variantId ? variantId.toString() : null,
              quantity: qty,
              price: unitPrice,
              product_name:
                (apiProduct.product as any)?.name || `Product #${productId}`,
              variant_sku: variantId ? "Variant" : "Standard",
            });
          }
        } catch (err) {
          setError("Could not load product details");
        }
      };
      fetchItem();
    }
  }, [isCartMode, productId, variantId, qty, slug]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setAddressesLoading(true);
        const res = await getAddresses();
        if (res.status && res.data) {
          setAddresses(res.data);
          // Auto-select default
          const defaultAddr = res.data.find((addr) => addr.is_default);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
      } finally {
        setAddressesLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  // Address handlers
  const selectedAddress =
    addresses.find((addr) => addr.id === selectedAddressId) || null;

  const openAddModal = () => {
    setAddressFormData({
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      landmark: "",
      is_default: false,
    });
    setEditingAddress(null);
    setShowAddModal(true);
    setShowEditModal(false);
  };

  const openEditModal = (addr: Address) => {
    setAddressFormData({
      full_name: addr.full_name,
      phone: addr.phone,
      address_line1: addr.address_line1,
      address_line2: addr.address_line2,
      city: addr.city,
      state: addr.state,
      country: "India",
      pincode: addr.pincode,
      landmark: addr.landmark || "",
      is_default: addr.is_default || false,
    });
    setEditingAddress(addr);
    setShowEditModal(true);
    setShowAddModal(false);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingAddress(null);
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressLoading(true);
    setError(""); // Purana error clear karein

    try {
      let res: any;
      // addressFormData ko casting dena zaroori hai agar API keys mismatch hain
      const payload = { ...addressFormData };

      if (editingAddress) {
        res = await updateAddress(editingAddress.id, payload as any);
      } else {
        res = await addAddress(payload as any);
      }

      if (res && res.status) {
        // Refresh addresses list
        const freshRes = await getAddresses();
        if (freshRes.status && freshRes.data) {
          setAddresses(freshRes.data);
          if (!selectedAddressId && freshRes.data.length > 0) {
            setSelectedAddressId(freshRes.data[0].id);
          }
        }
        closeModal();
      } else {
        setError(res?.message || "Address save failed");
      }
    } catch (err: any) {
      setError(err?.message || "Address save failed");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Delete this address?")) return;
    setAddressLoading(true);
    try {
      const res = await deleteAddress(id);
      if (res.status) {
        const freshRes = await getAddresses();
        if (freshRes.status && freshRes.data) {
          setAddresses(freshRes.data);
          if (selectedAddressId === id) {
            setSelectedAddressId(null);
          }
        }
      } else {
        setError("Delete failed");
      }
    } catch (err) {
      setError("Delete failed");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    setAddressLoading(true);
    try {
      const res = await setDefaultAddress(id);
      if (res.status) {
        const freshRes = await getAddresses();
        if (freshRes.status && freshRes.data) {
          setAddresses(freshRes.data);
          setSelectedAddressId(id);
        }
      } else {
        setError("Set default failed");
      }
    } catch (err) {
      setError("Set default failed");
    } finally {
      setAddressLoading(false);
    }
  };

  // const handlePlaceOrder = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setOrderLoading(true);
  //   setError("");

  //   const useAddress = selectedAddress || null;
  //   if (
  //     !useAddress &&
  //     (!formData.fullAddress ||
  //       !formData.city ||
  //       !formData.pincode ||
  //       !formData.phone)
  //   ) {
  //     setError("Please select an address or fill manual shipping address.");
  //     setOrderLoading(false);
  //     return;
  //   }

  //   if (displayItems.length === 0) {
  //     setError("No items to checkout. Go to cart.");
  //     setOrderLoading(false);
  //     return;
  //   }

  //   const orderItems = displayItems.map(
  //     (item: CartItem | CheckoutItem) =>
  //       ({
  //         product_id: item.product_id,
  //         variation_id: item.variation_id || null,
  //         quantity: Number(item.quantity || (item as any).qty || 1),
  //         price: Number((item.price as any) || (item as any).unit_price),
  //         product_name: item.product_name || "Unknown Product",
  //         ...(item.variant_details && {
  //           variant_sku: "Variant",
  //           variant_details: JSON.stringify(item.variant_details),
  //         }),
  //       } as any),
  //   );

  //   const shippingData = useAddress
  //     ? {
  //         address_line1: useAddress.address_line1,
  //         address_line2: useAddress.address_line2,
  //         city: useAddress.city,
  //         state: useAddress.state,
  //         pincode: useAddress.pincode,
  //         phone: useAddress.phone,
  //       }
  //     : {
  //         address_line1: formData.address_line1,
  //         address_line2: formData.address_line2,

  //         city: formData.city!,
  //         state: formData.state,
  //         pincode: formData.pincode!,
  //         phone: formData.phone!,
  //       };

  //   const orderData = {
  //     items: orderItems,
  //     shipping_address: shippingData,
  //     coupon_code: couponCode || undefined,
  //     payment_method: paymentMethod,
  //     order_for: "distributor_65",
  //   };

  //   try {
  //     const res = (await serverCallFuction(
  //       "POST",
  //       "api/orders",
  //       orderData,
  //     )) as any;
  //     const data = res;
  //     if (data?.success) {
  //       await refreshCart();
  //       router.push(`/orders/success/${data.data.order_id}`);
  //     } else {
  //       setError(data?.message || "Order failed");
  //     }
  //   } catch (err: any) {
  //     setError(err.message || "Order placement failed");
  //   } finally {
  //     setOrderLoading(false);
  //   }
  // };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderLoading(true);
    setError("");

    const useAddress = selectedAddress;
    if (
      !useAddress &&
      (!formData.fullAddress ||
        !formData.city ||
        !formData.pincode ||
        !formData.phone)
    ) {
      setError("Please select an address or fill manual shipping address.");
      setOrderLoading(false);
      return;
    }

    if (displayItems.length === 0) {
      setError("No items to checkout.");
      setOrderLoading(false);
      return;
    }

    // Mapping items safely
    const orderItems = displayItems.map((item: any) => ({
      product_id: item.product_id,
      variation_id: item.variation_id || null,
      // Handle both quantity (Cart) and qty (Manual)
      quantity: Number(item.quantity || item.qty || 1),
      price: Number(item.price || item.unit_price || 0),
      product_name: item.product_name || "Product",
      variant_sku:
        item.variant_sku || (item.variation_id ? "Variant" : "Standard"),
      ...(item.variant_details && {
        variant_details:
          typeof item.variant_details === "string"
            ? item.variant_details
            : JSON.stringify(item.variant_details),
      }),
    }));

    const shippingData = useAddress
      ? {
          address_line1: useAddress.address_line1,
          address_line2: useAddress.address_line2,
          city: useAddress.city,
          state: useAddress.state,
          pincode: useAddress.pincode,
          phone: useAddress.phone,
          full_name: useAddress.full_name, // Recommended
        }
      : {
          address_line1: formData.address_line1 || formData.fullAddress,
          address_line2: formData.address_line2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
        };

    const orderPayload = {
      items: orderItems,
      shipping_address: shippingData,
      coupon_code: couponCode || undefined,
      payment_method: paymentMethod,
      order_for: "distributor_65",
    };

    try {
      const res = (await serverCallFuction(
        "POST",
        "api/orders",
        orderPayload,
      )) as any;
      console.log("res - ", res);

      if (res.success) {
        // iniitpayment flow
        // if (paymentMethod === "razorpay") {
        handlepayment(res);
        // }

        // await refreshCart();
        // const orderId = res.data?.order_id || res.order_id;
        // router.push(`/orders/success/${orderId}`);
      } else {
        console.log("order placed res =- ", res);

        setError(res?.message || "Order failed");
      }
    } catch (err: any) {
      console.log("order plance time error - ", err);

      setError(err.message || "Order placement failed");
    } finally {
      setOrderLoading(false);
    }
  };

  const handlepayment = async (orderRes) => {
    if (!window.Razorpay || !razorpayLoaded) {
      alert("Razorpay loading... Please wait");
      return;
    }

    console.log("handle payment func - ", orderRes);

    try {
      const orderId = orderRes.data?.order_id || orderRes.order_id;

      const order = await createRazorpayOrder(totalAmount, {
        amount: 100,
        currency: "",
        receipt: `receipt_${orderId}_${Date.now()}`,
      });
      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Sfdk41BOifNjN9",
        amount: order.amount,
        currency: order.currency,
        name: "Feel Safe Shop",
        description: `Order Total ₹${totalAmount.toLocaleString()}`,
        order_id: order.id,
        prefill: {
          name: selectedAddress.full_name,
          email: formData.email || "",
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
        handler: async (response: any) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            // await placePurchaseOrder(response.razorpay_order_id, "razorpay");
            router.push(`/orders/success/${orderId}`);
          } catch (err) {
            alert(`Payment failed: ${(err as Error).message}`);
            router.push("/");
          }
        },
      };

      const paymentObject = new (window.Razorpay as any)(options);
      paymentObject.open();
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  const createRazorpayOrder = async (amt: number, cartItems) => {
    try {
      if (!selectedAddress) {
        alert("Please select Shipping Address");
        return;
      }
      const res = await serverCallFuction("POST", "api/payment/create-order", {
        amount: Math.round(amt),
        currency: "INR",
        // cart_items: cartItems.map((item) => ({
        //   id: item.id,
        //   product_id: item.product_id,
        //   quantity: item.quantity,
        //   price: item.price,
        // })),
        receipt: cartItems.receipt,
      });
      console.log("create order ra - ", res);

      if (!res.status) throw new Error(res.message || "Order creation failed");
      return res.order;
    } catch (error) {
      console.log("error or razorpay create order", error);

      throw new Error("Failed to create order");
    }
  };

  const verifyPayment = async (paymentData: RazorpayPaymentResponse) => {
    try {
      const res = await serverCallFuction(
        "POST",
        "api/payment/verify",
        paymentData,
      );
      if (!res.success)
        throw new Error(res.message || "Payment verification failed");
      return res.data;
    } catch (error) {
      throw new Error("Payment verification failed");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => setRazorpayLoaded(true)}
      />
      <ProtectedRoute>
        <section className="py-5">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="d-flex align-items-center mb-4">
                  <h1 className="fw-bold mb-0">Checkout</h1>
                  {isCartMode && (
                    <span className="badge bg-primary ms-3">
                      {displayItems.length} items
                    </span>
                  )}
                  {cartError && (
                    <span className="badge bg-warning ms-3">{cartError}</span>
                  )}
                </div>

                <div className="row g-4">
                  <div className="col-lg-8">
                    {/* Cart Items Summary */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-white border-0 py-3">
                        <h5 className="mb-0 fw-bold">Review Items</h5>
                      </div>
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayItems.map((item, idx) => {
                              let total_price = parseFloat(item.price);
                              let taxable_amount = 0;

                              if (item.tax_data != null) {
                                taxable_amount =
                                  (total_price *
                                    parseFloat(item.tax_data.percentage)) /
                                  100;

                                total_price += taxable_amount;
                              }

                              return (
                                <tr key={idx}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <Image
                                        src={
                                          ("f_image" in item
                                            ? item.f_image
                                            : "/assets/product/sanitory_pad.png") ||
                                          "/assets/product/sanitory_pad.png"
                                        }
                                        alt={item.product_name || "Product"}
                                        width={60}
                                        height={60}
                                        className="rounded me-3"
                                      />
                                      <div>
                                        <div className="fw-bold">
                                          {item.product_name}
                                        </div>
                                        {item.variant_details
                                          ? item.variant_details.attributes.map(
                                              (attr, idx) => (
                                                <small
                                                  key={idx}
                                                  className="badge bg-primary text-white d-block"
                                                >
                                                  {attr.attribute_name}:{" "}
                                                  {attr.value}
                                                </small>
                                              ),
                                            )
                                          : "N/A"}
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <ul style={{ listStyle: "none" }}>
                                      <li>
                                        <IndianRupee size={15} />
                                        {item.price}
                                      </li>
                                      <li className="">
                                        GST :
                                        <IndianRupee size={15} />
                                        {taxable_amount}
                                      </li>
                                      <li>
                                        T. :
                                        <IndianRupee size={15} />
                                        {total_price}
                                      </li>
                                    </ul>
                                  </td>
                                  <td>
                                    {("quantity" in item
                                      ? item.quantity
                                      : item.qty) || 1}
                                  </td>
                                  <td>
                                    <IndianRupee size={15} />
                                    {"price" in item && "quantity" in item
                                      ? Number(
                                          total_price * item.quantity,
                                        ).toFixed(2)
                                      : Number(
                                          total_price ||
                                            item.unit_price *
                                              (item.quantity || item.qty || 1),
                                        ).toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Address Selection */}
                    <div className="card mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Shipping Address</h5>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={openAddModal}
                          disabled={addressLoading}
                        >
                          + Add New
                        </button>
                      </div>
                      <div className="card-body">
                        {addressesLoading ? (
                          <div className="text-center py-4">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading addresses...
                              </span>
                            </div>
                          </div>
                        ) : addresses.length === 0 ? (
                          <div className="text-center py-4 text-muted">
                            No saved addresses.{" "}
                            <button
                              className="btn btn-link p-0"
                              onClick={openAddModal}
                            >
                              Add your first address
                            </button>
                          </div>
                        ) : (
                          <div className="row g-3">
                            {addresses.map((addr) => (
                              <div key={addr.id} className="col-md-6">
                                <div className="card border h-100">
                                  <div className="card-body">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="address"
                                        id={`addr-${addr.id}`}
                                        checked={selectedAddressId === addr.id}
                                        onChange={() =>
                                          setSelectedAddressId(addr.id)
                                        }
                                        disabled={addressLoading}
                                      />
                                      <label
                                        className="form-check-label w-100 p-3 border rounded cursor-pointer h-100 d-flex flex-column"
                                        htmlFor={`addr-${addr.id}`}
                                      >
                                        <div>
                                          <strong>{addr.full_name}</strong>
                                          <br />
                                          <small>{addr.address_line1}</small>,
                                          <small> {addr.address_line2}</small>
                                          {addr.city}, {addr.state} -{" "}
                                          {addr.pincode}
                                          <br />
                                          <small className="text-muted">
                                            Phone: {addr.phone}
                                          </small>
                                        </div>
                                        {addr.is_default && (
                                          <span className="badge bg-success mt-2">
                                            Default
                                          </span>
                                        )}
                                        <div className="mt-auto pt-2">
                                          <div
                                            className="btn-group btn-group-sm"
                                            role="group"
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-outline-secondary"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(addr);
                                              }}
                                              disabled={addressLoading}
                                            >
                                              Edit
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-outline-danger"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteAddress(addr.id);
                                              }}
                                              disabled={addressLoading}
                                            >
                                              Delete
                                            </button>
                                            {!addr.is_default && (
                                              <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSetDefault(addr.id);
                                                }}
                                                disabled={addressLoading}
                                              >
                                                Set Default
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Manual Entry Fallback */}
                        {(!selectedAddress || addresses.length === 0) && (
                          <div className="mt-4 pt-4 border-top">
                            <h6>Or enter new address</h6>
                            <div className="row g-3">
                              <div className="col-md-12">
                                <label className="form-label">
                                  Full Address *
                                </label>
                                <textarea
                                  className="form-control"
                                  rows={2}
                                  value={formData.fullAddress}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      fullAddress: e.target.value,
                                    })
                                  }
                                  placeholder="House no, Street, Landmark"
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">City *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.city}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      city: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">State</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.state}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      state: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">Pincode *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.pincode}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      pincode: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="col-md-12">
                                <label className="form-label">Phone *</label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm me-2"
                                onClick={openAddModal}
                              >
                                Save & Reuse
                              </button>
                              <small className="text-muted">
                                Save for future use or enter once
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* right section */}
                  <div className="col-lg-4">
                    <div
                      className="card border-0 shadow-sm sticky-top"
                      style={{ top: "20px" }}
                    >
                      <div className="card-body px-4">
                        <h5 className="fw-bold mb-3">Order Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal ({displayItems.length} items):</span>
                          <span>
                            <IndianRupee />
                            {subTotal.toFixed(2)}
                          </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-bold h6 mb-0">Tax:</span>
                          <span className="fw-bold h6 mb-0">
                            <IndianRupee size={15} />
                            {tax_amount.toFixed(2)}
                          </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-bold h4 mb-0">Total:</span>
                          <span className="fw-bold h4 mb-0">
                            <IndianRupee />
                            {totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <hr />
                      {/* Coupon & Payment */}
                      <div className="col-md-12 px-4 mb-2">
                        <label className="form-label">Coupon Code</label>
                        <div className="input-group ">
                          <input
                            type="text"
                            className="form-control"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter code"
                          />
                          <button className="btn btn-primary" type="button">
                            Apply
                          </button>
                        </div>
                      </div>

                      <hr />
                      <div className="px-4 mb-4">
                        <label className="form-label">Payment Method</label>
                        <select
                          className="form-control"
                          value={paymentMethod}
                          onChange={(e) =>
                            setPaymentMethod(e.target.value as "wallet")
                          }
                        >
                          <option value="razorpay">Online (Razorpay)</option>
                          <option value="wallet">Wallet</option>
                        </select>
                      </div>

                      {error && (
                        <div className="alert alert-danger mb-4">{error}</div>
                      )}

                      <div className="gap-2 d-flex justify-content-space-between mb-4 px-4">
                        <Link
                          href="/cart"
                          className="btn btn-secondary me-md-2 btn-md w-100"
                        >
                          ← Edit Cart
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary btn-md px-4 w-100"
                          form="orderForm"
                          onClick={handlePlaceOrder}
                          disabled={
                            orderLoading ||
                            displayItems.length === 0 ||
                            (!selectedAddress &&
                              (!formData.fullAddress ||
                                !formData.city ||
                                !formData.pincode ||
                                !formData.phone))
                          }
                        >
                          {orderLoading
                            ? "Placing Order..."
                            : `Place Order - ₹${totalAmount.toFixed(2)}`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ProtectedRoute>

      {/* Add/Edit Address Modal */}
      {showAddModal || showEditModal ? (
        <>
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex={-1}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <form onSubmit={handleAddressSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Full Address *</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={addressFormData.full_name}
                        onChange={(e) =>
                          setAddressFormData({
                            ...addressFormData,
                            full_name: e.target.value,
                          })
                        }
                        placeholder="Full Name *"
                        required
                      />
                      <textarea
                        className="form-control"
                        rows={2}
                        value={addressFormData.address_line1}
                        onChange={(e) =>
                          setAddressFormData({
                            ...addressFormData,
                            address_line1: e.target.value,
                          })
                        }
                        placeholder="Address Line 1 (House, Street, etc.) *"
                        required
                      />
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={addressFormData.address_line2}
                        onChange={(e) =>
                          setAddressFormData({
                            ...addressFormData,
                            address_line2: e.target.value,
                          })
                        }
                        placeholder="Address Line 2 (Landmark)"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={addressFormData.city}
                          onChange={(e) =>
                            setAddressFormData({
                              ...addressFormData,
                              city: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={addressFormData.state}
                          onChange={(e) =>
                            setAddressFormData({
                              ...addressFormData,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Pincode *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={addressFormData.pincode}
                          onChange={(e) =>
                            setAddressFormData({
                              ...addressFormData,
                              pincode: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="form-label">Phone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={addressFormData.phone}
                        onChange={(e) =>
                          setAddressFormData({
                            ...addressFormData,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                      disabled={addressLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={addressLoading}
                    >
                      {addressLoading
                        ? "Saving..."
                        : editingAddress
                        ? "Update"
                        : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CheckoutPage;
