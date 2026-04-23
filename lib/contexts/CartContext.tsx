"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import serverCallFuction, { BodyData } from "../constantFunction";
import type { Cart } from "@/lib/types/Cart";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  addItem: (
    productId: number,
    variantId: string | null,
    quantity: number,
    price: number,
  ) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await serverCallFuction("GET", "api/ecom/cart/");
      if (res.status && res.cart) {
        setCart(res.cart);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  const addItem = async (
    productId: number,
    variantId: string | null,
    quantity: number,
    price: number,
  ) => {
    if (!cart) return;
    try {
      setLoading(true);
      const res = await serverCallFuction("POST", "api/ecom/cart/items/", {
        product_id: productId,
        variation_id: variantId,
        quantity,
        price,
      } as BodyData);
      if (res.status) {
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        fetchCart();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cart) return;
    try {
      setLoading(true);
      const res = await serverCallFuction(
        "PUT",
        `api/ecom/cart/items/${itemId}/updateQuantity`,
        { quantity },
      );
      if (res.status) {
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      const res = await serverCallFuction(
        "DELETE",
        `api/ecom/cart/items/${itemId}/`,
      );
      if (res.status) {
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        refreshCart,
        updateQuantity,
        removeItem,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
