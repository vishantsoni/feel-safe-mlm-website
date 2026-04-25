interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  discounted_price: number;
  rating: number;
  f_image: string;
  g_images: string[];
  specs: Record<string, string>;
  category: Category;
  qty: number;
  tax_data: {
    name: string;
    percentage: number;
  } | null;
}
interface Category {
  id: number;
  name: string;
  slug: string;
}
interface ProductAttributes {
  id: number;
  name: string;
  values: [{ id: number; value: string }];
}

interface ProVariant {
  id: number;
  bv_point: number;
  price: number;
  sku: string;
  stock: number;
  attr_combinations: [
    {
      attr_id: number;
      attr_value_id: number;
      value: string;
    },
  ];
}

interface ProductApiResponse {
  product: Product;
  category: Category;
  product_attributes: ProductAttributes[];
  variants: ProVariant[];
}

export type {
  Product,
  Category,
  ProductApiResponse,
  ProductAttributes,
  ProVariant,
};
