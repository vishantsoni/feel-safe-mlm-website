"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/contexts/CartContext";
import serverCallFuction, { formattedAmountCommas } from "@/lib/constantFunction";
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
import { useAuth } from "@/lib/contexts/AuthContext";

interface CheckoutItem {
  product_id: number;
  variation_id: string | null;
  quantity: number;
  price: number;
  product_name?: string;
  variant_sku?: string;
  variant_details: VariantDetails | null;
}

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, loading: cartLoading, fetchCart, refreshCart } = useCart();
  const { user } = useAuth();

  const dId = user?.distributor_info?.id || "";

  const productId = searchParams.get("productId");
  const variantIdParam = searchParams.get("variantId");
  const qtyParam = searchParams.get("qty") || "1";
  const slug = searchParams.get("slug") || "";

  const variantId = variantIdParam ? parseInt(variantIdParam!) : null;
  const qty = parseInt(qtyParam) || 1;

  const [singleItem, setSingleItem] = useState<CheckoutItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartError, setCartError] = useState("");

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
  const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState("");

  // Address logic
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // FIXED: State/City validation loaders & array states added matching AddressesPage
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [states, setStates] = useState<Array<{ id: number | string; name: string }>>([]);
  const [cities, setCities] = useState<Array<{ id: number | string; name: string }>>([]);
  const [selectedStateId, setSelectedStateId] = useState<number | string | null>(null);
  const [pincodeError, setPincodeError] = useState("");

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

  const { setting, getSettingByKey } = useAuth();

  const shipping = useMemo(() => {
    const res = getSettingByKey("shipping_charge");
    return res?.charge || 0;
  }, [setting, getSettingByKey]);

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
    fetchStates(); // FIXED: Initializing states on component mount
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
              variant_details: null
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

  // FIXED: Fetch States API call implementation
  const fetchStates = async () => {
    try {
      setStatesLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/static/states`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json?.status && Array.isArray(json?.data)) {
        setStates(json.data);
      } else if (Array.isArray(json)) {
        setStates(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setStatesLoading(false);
    }
  };

  // FIXED: Fetch Cities API call implementation
  const fetchCities = async (stateId: number | string) => {
    try {
      setCitiesLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/static/cities/${stateId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json?.status && Array.isArray(json?.data)) {
        setCities(json.data);
      } else if (Array.isArray(json)) {
        setCities(json);
      } else {
        setCities([]);
      }
    } catch (e) {
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

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
    setCities([]);
    setSelectedStateId(null);
    setPincodeError("");
    setError("");
    setShowAddModal(true);
    setShowEditModal(false);
  };

  const openEditModal = async (addr: Address) => {
    setAddressFormData({
      full_name: addr.full_name,
      phone: addr.phone,
      address_line1: addr.address_line1,
      address_line2: addr.address_line2 || "",
      city: addr.city,
      state: addr.state,
      country: "India",
      pincode: addr.pincode,
      landmark: addr.landmark || "",
      is_default: addr.is_default || false,
    });
    setEditingAddress(addr);
    setPincodeError("");
    setError("");
    setShowEditModal(true);
    setShowAddModal(false);

    // FIXED: Dynamically map state ID to pre-fetch corresponding cities on Edit view
    const matchedState = states.find((s) => String(s.name) === String(addr.state));
    if (matchedState) {
      setSelectedStateId(matchedState.id);
      await fetchCities(matchedState.id);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingAddress(null);
    setSelectedStateId(null);
    setCities([]);
    setPincodeError("");
    setError("");
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // FIXED: Strict 6-digit numeric validation block
    const pincode = addressFormData.pincode?.trim() || "";
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError("Pincode must be exactly 6 digits.");
      return;
    }
    setPincodeError("");

    // FIXED: Strict 10-digit numeric validation block
    const phone = (addressFormData.phone || "").trim();
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!addressFormData.state || !addressFormData.city) {
      setError("Please select state and city.");
      return;
    }

    setAddressLoading(true);
    try {
      let res: any;
      const payload = { ...addressFormData };

      if (editingAddress) {
        res = await updateAddress(editingAddress.id, payload as any);
      } else {
        res = await addAddress(payload as any);
      }

      if (res && res.status) {
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

  const isConsistentFormat = isCartMode
    ? cart!.items.every(item => item.distributor_id === cart!.items[0].distributor_id)
    : true;

  const formatError = !isConsistentFormat
    ? "Mixed Fulfillment Error: Your cart contains items from different sources. Please ensure all items are from the same distributor or all from Main Store in your cart."
    : null;

  useEffect(() => {
    if (dId === "") {
      setPaymentMethod("razorpay");
    } else {
      if (cart && cart.items && cart.items.length > 0) {
        if (cart.items[0].distributor_id === null) {
          setPaymentMethod("razorpay");
        } else {
          setPaymentMethod("cod");
        }
      } else {
        setPaymentMethod("razorpay");
      }
    }
  }, [cart, dId]);

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

    const orderItems = displayItems.map((item: any) => ({
      product_id: item.product_id,
      variation_id: item.variation_id || null,
      quantity: Number(item.quantity || item.qty || 1),
      price: Number(item.price || item.unit_price || 0),
      product_name: item.product_name || "Product",
      variant_sku: item.variant_sku || (item.variation_id ? "Variant" : "Standard"),
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
        full_name: useAddress.full_name,
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
      order_for: dId === "" ? "admin" : `distributor_${dId}`,
      distributor_id: dId
    };

    try {
      const res = (await serverCallFuction(
        "POST",
        "api/orders",
        orderPayload,
      )) as any;

      if (res.success) {
        if (paymentMethod === "razorpay") {
          await handlepayment(res);
        } else {
          await refreshCart();
          const orderId = res.data?.order_id || res.order_id;
          router.push(`/orders/success/${orderId}`);
        }
      } else {
        setError(res?.message || "Order failed");
      }
    } catch (err: any) {
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

    try {
      const orderId = orderRes.data?.order_id || orderRes.order_id;
      const order = await createRazorpayOrder(totalAmount, {
        amount: 100,
        currency: "",
        receipt: `receipt_${orderId}_${Date.now()}`,
      });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Sfdk41BOifNjN9",
        amount: order.amount,
        currency: order.currency,
        name: "Feel Safe Shop",
        description: `Order Total ₹${totalAmount.toLocaleString()}`,
        order_id: order.id,
        prefill: {
          name: selectedAddress?.full_name || "",
          email: user?.email || "",
          contact: selectedAddress?.phone || formData.phone,
        },
        theme: { color: "#3399cc" },
        handler: async (response: any) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
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
      if (!selectedAddress && !formData.pincode) {
        alert("Please select or enter Shipping Address");
        return;
      }
      const res = await serverCallFuction("POST", "api/payment/create-order", {
        amount: Math.round(amt),
        currency: "INR",
        receipt: cartItems.receipt,
      });

      if (!res.status) throw new Error(res.message || "Order creation failed");
      return res.order;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  };

  const verifyPayment = async (paymentData: any) => {
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
                              const unit_price = parseFloat(item.unit_price || item.price || 0);
                              let total_price = parseFloat(item.price || 0);
                              let taxable_amount = 0;

                              if (item.tax_data != null) {
                                taxable_amount = (unit_price * parseFloat(item.tax_data.percentage)) / 100;
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
                                            (attr: any, i: number) => (
                                              <small
                                                key={i}
                                                className="badge bg-primary text-white d-block mt-1"
                                              >
                                                {attr.attribute_name}: {attr.attribute_val}
                                              </small>
                                            ),
                                          )
                                          : "N/A"}
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                      <li>Price : <IndianRupee size={15} /> {unit_price}</li>
                                      <li>GST : <IndianRupee size={15} /> {taxable_amount}</li>
                                      <li><b>T. : <IndianRupee size={15} /> {total_price}</b></li>
                                    </ul>
                                  </td>
                                  <td>{item.quantity || item.qty || 1}</td>
                                  <td>
                                    <IndianRupee size={15} />
                                    {Number(total_price * (item.quantity || item.qty || 1)).toFixed(2)}
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
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading addresses...</span>
                            </div>
                          </div>
                        ) : addresses.length === 0 ? (
                          <div className="text-center py-4 text-muted">
                            No saved addresses.{" "}
                            <button className="btn btn-link p-0" onClick={openAddModal}>
                              Add your first address
                            </button>
                          </div>
                        ) : (
                          <div className="row g-3">
                            {addresses.map((addr) => (
                              <div key={addr.id} className="col-md-6">
                                <div className="card border h-100">
                                  <div className="card-body d-flex flex-column">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="address"
                                        id={`addr-${addr.id}`}
                                        checked={selectedAddressId === addr.id}
                                        onChange={() => setSelectedAddressId(addr.id)}
                                        disabled={addressLoading}
                                      />
                                      <label
                                        className="form-check-label w-100 cursor-pointer text-dark"
                                        htmlFor={`addr-${addr.id}`}
                                      >
                                        <strong>{addr.full_name}</strong>
                                        <br />
                                        <small>{addr.address_line1}</small>
                                        {addr.address_line2 && <small>, {addr.address_line2}</small>}
                                        <br />
                                        <small>{addr.city}, {addr.state} - {addr.pincode}</small>
                                        <br />
                                        <small className="text-muted">Phone: {addr.phone}</small>
                                      </label>
                                    </div>
                                    {addr.is_default && (
                                      <span className="badge bg-success mt-2 align-self-start">Default</span>
                                    )}
                                    <div className="mt-auto pt-3 btn-group btn-group-sm">
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={(e) => { e.stopPropagation(); openEditModal(addr); }}
                                        disabled={addressLoading}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }}
                                        disabled={addressLoading}
                                      >
                                        Delete
                                      </button>
                                      {!addr.is_default && (
                                        <button
                                          type="button"
                                          className="btn btn-outline-primary"
                                          onClick={(e) => { e.stopPropagation(); handleSetDefault(addr.id); }}
                                          disabled={addressLoading}
                                        >
                                          Set Default
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column Summary Section */}
                  <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
                      <div className="card-body px-4">
                        <h5 className="fw-bold mb-3">Order Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal ({displayItems.length} items):</span>
                          <span>
                            <IndianRupee size={16} />
                            {formattedAmountCommas(subTotal)}
                          </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-bold h6 mb-0">Tax:</span>
                          <span className="fw-bold h6 mb-0">
                            <IndianRupee size={15} />
                            {formattedAmountCommas(tax_amount)}
                          </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-bold h6 mb-0">Shipping Charge:</span>
                          <span className="fw-bold h6 mb-0">
                            <IndianRupee size={15} />
                            {shipping.toFixed(2)}
                          </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-bold h4 mb-0">Total:</span>
                          <span className="fw-bold h4 mb-0">
                            <IndianRupee size={20} />
                            {formattedAmountCommas((totalAmount + shipping).toFixed(2))}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div className="col-md-12 px-4 mb-2">
                        <label className="form-label">Coupon Code</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter code"
                          />
                          <button className="btn btn-primary" type="button">Apply</button>
                        </div>
                      </div>
                      <hr />
                      <div className="px-4 mb-4">
                        <label className="form-label">Payment Method</label>
                        <select className="form-control" value={paymentMethod} disabled>
                          <option value="razorpay">Online (Razorpay)</option>
                          <option value="cod">Cash on Delivery</option>
                        </select>
                      </div>

                      {formatError && (
                        <div className="alert alert-warning mb-4 mx-4 shadow-sm border-warning">
                          <small className="fw-bold">{formatError}</small>
                          <div className="mt-2">
                            <Link href="/cart" className="btn btn-sm btn-outline-warning">
                              Go to Cart to Fix
                            </Link>
                          </div>
                        </div>
                      )}

                      {error && <div className="alert alert-danger mb-4 mx-4">{error}</div>}

                      <div className="gap-2 d-flex justify-content-space-between mb-4 px-4">
                        <Link href="/cart" className="btn btn-secondary btn-md w-100">
                          ← Edit Cart
                        </Link>
                        {isConsistentFormat && (
                          <button
                            type="button"
                            className="btn btn-primary btn-md px-4 w-100"
                            onClick={handlePlaceOrder}
                            disabled={orderLoading || displayItems.length === 0 || (!selectedAddress && !formData.pincode)}
                          >
                            {orderLoading ? "Placing Order..." : `Place Order`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </ProtectedRoute>

      {/* FIXED: Dynamic State & City Dropdown Modal Implementation */}
      {(showAddModal || showEditModal) && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}></div>
          <div className="modal show d-block fade show" style={{ zIndex: 1050 }} tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <form onSubmit={handleAddressSubmit}>
                  <div className="modal-body p-4">
                    {error && <div className="alert alert-danger rounded-3 p-2 small">{error}</div>}

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Full Name *</label>
                      {/* <input
                        type="text"
                        className="form-control"
                        value={addressFormData.full_name}
                        onChange={(e) => setAddressFormData({ ...addressFormData, full_name: e.target.value })}
                        placeholder="Full Name"
                        required
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        value={addressFormData.full_name}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allows only letters (both uppercase and lowercase) and spaces
                          if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
                            setAddressFormData({ ...addressFormData, full_name: value });
                          }
                        }}
                        placeholder="Full Name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address Line 1 *</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={addressFormData.address_line1}
                        onChange={(e) => setAddressFormData({ ...addressFormData, address_line1: e.target.value })}
                        placeholder="House no, Street, etc."
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address Line 2 (Landmark)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={addressFormData.address_line2}
                        onChange={(e) => setAddressFormData({ ...addressFormData, address_line2: e.target.value })}
                        placeholder="Landmark / Sector"
                      />
                    </div>

                    {/* FIXED: Dynamic Cascading States Dropdown */}
                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">State *</label>
                        <select
                          value={addressFormData.state}
                          onChange={async (e) => {
                            const nextStateName = e.target.value;
                            const nextState = states.find((s) => String(s.name) === String(nextStateName));
                            const nextStateId = nextState?.id ?? null;

                            setSelectedStateId(nextStateId);
                            setAddressFormData({ ...addressFormData, state: nextStateName, city: "" });

                            if (nextStateId !== null) {
                              await fetchCities(nextStateId);
                            } else {
                              setCities([]);
                            }
                          }}
                          className="form-control"
                          required
                          disabled={statesLoading}
                        >
                          <option value="">{statesLoading ? "Loading..." : "Select State"}</option>
                          {states.map((s) => (
                            <option key={String(s.id)} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* FIXED: Dynamic Cities Dropdown dependent on State selection */}
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">City *</label>
                        <select
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                          className="form-control"
                          required
                          disabled={!addressFormData.state || citiesLoading}
                        >
                          <option value="">{citiesLoading ? "Loading..." : "Select City"}</option>
                          {cities.map((c) => (
                            <option key={String(c.id)} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Pincode *</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="6 Digits"
                          value={addressFormData.pincode}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setAddressFormData({ ...addressFormData, pincode: next });
                            if (pincodeError) setPincodeError("");
                          }}
                          className={`form-control ${pincodeError ? "is-invalid" : ""}`}
                          required
                        />
                        {pincodeError && <div className="invalid-feedback d-block small">{pincodeError}</div>}
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Phone *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10 Digits"
                          value={addressFormData.phone}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setAddressFormData({ ...addressFormData, phone: next });
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is_default"
                        checked={addressFormData.is_default}
                        onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
                      />
                      <label className="form-check-label fw-medium" htmlFor="is_default">
                        Set as default address
                      </label>
                    </div>
                  </div>

                  <div className="modal-footer border-0 pt-0">
                    <button type="button" className="btn btn-light" onClick={closeModal} disabled={addressLoading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={addressLoading}>
                      {addressLoading ? "Saving..." : editingAddress ? "Update" : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;