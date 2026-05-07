"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import serverCallFuction, { formattedAmount } from "@/lib/constantFunction";
import { IndianRupee, Minus, Plus } from "lucide-react";
import { Product } from "@/lib/types/Product";
import { Icon } from "@iconify/react";

const TrendingProSection = ({ titleShow = true, title = "Trending Products" }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await serverCallFuction("GET", "api/products/products");
        if (res.success) {
          setProducts(res.data);
        }
      } catch (error: unknown) {
        console.log(
          "Product fetching error - ",
          error instanceof Error ? error.message : String(error),
        );
      }
    };

    void loadProducts();
  }, []);


  return (
    <>
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="bootstrap-tabs product-tabs">
                {titleShow &&
                  <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                    <h3>{title}</h3>

                  </div>
                }

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-all"
                    role="tabpanel"
                    aria-labelledby="nav-all-tab"
                  >
                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                      {/* Product Item Start */}
                      {products.map((item, index) => {
                        const total_price = item.taxable_price;
                        let tax_amount = 0;
                        if (item.tax_data) {
                          tax_amount =
                            (total_price * item.tax_data.percentage) / 100;
                          // total_price += tax_amount;
                        }

                        return (
                          <div className="col" key={index}>
                            <div className="product-item">
                              <span className="badge bg-success position-absolute m-3">
                                {item.discount}
                              </span>
                              {/* <a
                                href="#"
                                className="btn-wishlist"
                                onClick={() => { }}
                              >
                                <svg width="24" height="24">
                                  <use xlinkHref="#heart" />
                                </svg>
                              </a> */}
                              <figure>
                                <Link
                                  href={`/products/${item.slug}`}
                                  title={item.name}
                                >
                                  <img
                                    src={item.f_image}
                                    className="tab-image"
                                    alt={item.name}
                                  />
                                </Link>
                              </figure>
                              <h3>{item.name}</h3>
                              <span className="qty">{item.qty}</span>
                              <span className="price">
                                <IndianRupee className="p-1" />
                                {formattedAmount(total_price)}
                              </span>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="input-group product-qty">
                                  <span className="input-group-btn">
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-number"
                                    >
                                      <Minus size={16} />
                                      {/* <svg width="16" height="16">
                                        <use xlinkHref="#minus" />
                                      </svg> */}
                                    </button>
                                  </span>
                                  {/* In React/Next, use defaultValue for inputs if not controlled by state */}
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control input-number"
                                    defaultValue="1"
                                  />
                                  <span className="input-group-btn">
                                    <button
                                      type="button"
                                      className="btn btn-success btn-number"
                                    >
                                      <Plus size={16} />
                                      {/* <svg width="16" height="16">
                                        <use xlinkHref="#plus" />
                                      </svg> */}
                                    </button>
                                  </span>
                                </div>
                                <a href="#" className="nav-link">
                                  Add to Cart <Icon icon="uil:shopping-cart" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingProSection;
