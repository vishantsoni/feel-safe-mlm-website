"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IndianRupee, Star } from "lucide-react";
import { Product, ProductAttributes, ProVariant } from "@/lib/types/Product";
import { useCart } from "@/lib/contexts/CartContext";

interface Props {
  product: Product;
  attributes: ProductAttributes[];
  variants: ProVariant[];
}

const ProductDetail: React.FC<Props> = ({ product, attributes, variants }) => {
  const [selectedImage, setSelectedImage] = useState(product.f_image);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, number>
  >({});

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const { addItem, loading } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Default select 0th index attribute values on mount
  useEffect(() => {
    if (attributes && attributes.length > 0) {
      const defaultSelection: Record<number, number> = {};
      attributes.forEach((attr) => {
        if (attr.values && attr.values.length > 0) {
          // Har attribute ki pehli value (0 index) select kar rahe hain
          defaultSelection[attr.id] = attr.values[0].id;
        }
      });
      setSelectedAttributes(defaultSelection);
    }
  }, [attributes]);

  let originalPrice = product.base_price || 0;
  const basePrice = product.discounted_price || product.base_price;
  const taxPrice = product.tax_data
    ? (originalPrice * product.tax_data.percentage) / 100
    : 0;

  originalPrice += taxPrice;

  const currentVariant = useMemo(() => {
    if (variants.length === 0) return null;
    return (
      variants.find((variant) => {
        return (
          variant.attr_combinations.every((comb) => {
            return selectedAttributes[comb.attr_id] === comb.attr_value_id;
          }) &&
          Object.keys(selectedAttributes).length ===
            variant.attr_combinations.length
        );
      }) || null
    );
  }, [selectedAttributes, variants]);

  const currentPrice = useMemo(
    () => (currentVariant ? currentVariant.price : basePrice),
    [currentVariant, basePrice],
  );

  const taxablePrice = useMemo(
    () =>
      currentVariant ? currentVariant.price + taxPrice : basePrice + taxPrice,
    [currentVariant, basePrice],
  );

  const isOutOfStock = useMemo(
    () => (currentVariant ? currentVariant.stock <= 0 : false),
    [currentVariant],
  );

  const relatedProducts = [
    {
      name: "Sanitary Pad Regular",
      slug: "sanitory-pad",
      price: 12.0,
      image: "/assets/product/sanitory_pad.png",
    },
    {
      name: "Adult Diaper Large",
      slug: "adult-diaper",
      price: 25.0,
      image: "/assets/product/adult_diaper.png",
    },
  ].filter((p) => p.slug !== product.slug);

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      setMessageType("error");
      setMessage("This variant is out of stock!");
      return;
    }

    try {
      await addItem(
        product.id,
        currentVariant ? currentVariant.id.toString() : null,
        quantity,
        taxablePrice,
      );
      setMessageType("success");
      setMessage(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      setMessageType("error");
      setMessage("Failed to add to cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      alert("This variant is out of stock!");
      return;
    }
    const variantId = (currentVariant?.id || "").toString();
    const params = new URLSearchParams({
      productId: product.id.toString(),
      variantId,
      slug: product.slug,
      qty: quantity.toString(),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <section className="pb-5 pt-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5">
            {/* Image Gallery */}
            <div
              className="position-relative w-100 mb-3"
              style={{ aspectRatio: "1/1" }}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="img-fluid rounded object-fit-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {currentPrice < originalPrice && (
                <div className="position-absolute top-0 end-0 badge bg-success fs-6 m-2">
                  -
                  {Math.round(
                    ((originalPrice - currentPrice) / originalPrice) * 100,
                  )}
                  %
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {(product.g_images || []).length > 0 && (
              <div className="row mt-3 g-1">
                {[product.f_image, ...product.g_images].map((img, idx) => (
                  <div key={idx} className="col-2">
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={100}
                      height={100}
                      className={`img-fluid rounded cursor-pointer border ${
                        selectedImage === img
                          ? "border-success border-3"
                          : "border-secondary"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-7">
            <h1 className="fw-bold mb-1">{product.name}</h1>
            <span className="fw-bold mb-2 badge bg-primary">
              {product.category?.name}
            </span>
            <p className="lead mb-2">{product.description}</p>

            <div className="">
              <span className="fs-1 fw-bold text-success">
                <IndianRupee className="inline-block" size={24} />
                {taxablePrice.toFixed(2)}
              </span>
              <span className="text-muted text-decoration-line-through ms-3 fs-4">
                <IndianRupee className="inline-block" size={18} />
                {originalPrice.toFixed(2)}
              </span>
            </div>

            {/* Attributes selection */}
            <div className="mb-3">
              {attributes.map((attr) => (
                <div
                  key={attr.id}
                  className="d-flex gap-2 my-2 align-items-center"
                >
                  <strong>{attr.name}:</strong>
                  <div className="d-flex gap-2">
                    {attr.values.map((v) => {
                      const isSelected = selectedAttributes[attr.id] === v.id;
                      return (
                        <span
                          key={v.id}
                          className={`badge cursor-pointer p-2 ${
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-light text-dark border"
                          }`}
                          onClick={() => {
                            setSelectedAttributes((prev) => {
                              const newSelected = { ...prev };
                              if (isSelected) {
                                delete newSelected[attr.id];
                              } else {
                                newSelected[attr.id] = v.id;
                              }
                              return newSelected;
                            });
                          }}
                        >
                          {v.value}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity & Actions */}
            <div className="row align-items-end mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Quantity:</label>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-md-12 mt-4">
                {isOutOfStock ? (
                  <div className="alert alert-warning">Out of Stock</div>
                ) : (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-success btn-lg flex-grow-1"
                      onClick={handleAddToCart}
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add to Cart"}
                    </button>
                    <button
                      className="btn btn-primary btn-lg flex-grow-1"
                      onClick={handleBuyNow}
                      disabled={loading}
                    >
                      Buy Now
                    </button>
                  </div>
                )}
                {message && (
                  <div
                    className={`alert alert-${
                      messageType === "success" ? "success" : "danger"
                    } mt-3`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="mb-4">
              <h5>Product Specifications:</h5>
              <ul className="list-group list-group-flush">
                {product.specs &&
                  Object.entries(product.specs).map(([key, value]) => (
                    <li
                      key={key}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{key}</span>
                      <strong>{String(value)}</strong>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Full Tabs Section */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs" id="productTabs">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                >
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#specs"
                >
                  Specifications
                </button>
              </li>
            </ul>
            <div className="tab-content border border-top-0 p-4">
              <div className="tab-pane fade show active" id="description">
                {product.description}
              </div>
              <div className="tab-pane fade" id="specs">
                {/* Same specs list or table */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
