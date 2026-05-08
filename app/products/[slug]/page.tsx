import React from "react";
import { notFound } from "next/navigation";

import ProductDetail from "@/componants/ProductDetail/ProductDetail";
import { Category, Product, ProductApiResponse } from "@/lib/types/Product";
import serverCallFuction from "@/lib/constantFunction";
import { APIResponse } from "@/lib/types/User";
import { cookies } from "next/headers";


interface Props {
  params: { slug: string };
}

// 2. Make the function async
export default async function ProductPage({ params }: Props) {
  // 3. UnWrap the params promise
  const { slug } = await params;

  const cookieStore = await cookies();
  const userData = cookieStore.get("user")?.value;
  const user = userData ? JSON.parse(userData) : null;

  const dId = user?.distributor_info?.id || ""; //

  // Fetch product details by ID
  let detailRes;
  try {
    const url = `api/products/product-detail/${slug}?distributor_id=${dId}`;
    console.log("url  - ", url);

    detailRes = (await serverCallFuction(
      "GET",
      url,
    )) as APIResponse;
    console.log("API Response:", detailRes);
  } catch (error) {
    console.error("API Fetch failed:", error);
    notFound();
  }
  if (!detailRes?.success || !detailRes.data) {
    console.error("No product data or API failure:", detailRes);
    notFound();
  }

  // Transform API data to match ProductDetail expected shape
  const apiProduct: ProductApiResponse = detailRes.data;

  const product: Product = {
    id: apiProduct.product.id || 0,
    name: apiProduct.product.name || "Unknown Product",
    slug,
    description: apiProduct.product.description || "No description available.",
    short_desc: apiProduct.product.short_desc || "",
    base_price: apiProduct.product.base_price || 0,
    discounted_price: apiProduct.product.discounted_price || 0,
    rating: apiProduct.product.rating || 4.5,
    f_image: apiProduct.product.f_image
      ? `${apiProduct.product.f_image}`
      : "/assets/product/sanitory_pad.png",
    g_images: (apiProduct.product.g_images || []).map((img) => `${img}`),
    specs: apiProduct.product.specs || {},
    category: (apiProduct.category as Category) || {
      id: 0,
      name: "Uncategorized",
      slug: "uncategorized",
    },
    qty: apiProduct.product.qty || 1,
    tax_data: apiProduct.tax_data,
    admin_stock: apiProduct.product.admin_stock || 0,
    distributor_stock: apiProduct.product.distributor_stock || 0,
  };

  const attributes = apiProduct.product_attributes || [];
  const variants = apiProduct.variants || [];

  return (
    <>
      {product ? (
        <ProductDetail
          product={product}
          attributes={attributes}
          variants={variants}
          dId={dId}
        />
      ) : (
        <h1 className="text-center my-4">Product Not Found</h1>
      )}
    </>
  );
}
