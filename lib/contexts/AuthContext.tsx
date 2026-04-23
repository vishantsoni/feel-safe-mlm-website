"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import type { User } from "@/lib/types/User";
import serverCallFuction from "../constantFunction";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    phone: string;
    name: string;
    email: string;
    password: string;
    distributor_code?: number | null;
  }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await serverCallFuction("GET", "api/ecom/auth/me");
      console.log("fetchUser response:", res);
      if (res.status) {
        setUser(res?.user);
        setIsAuthenticated(true);
      } else {
        // setUser(null);
        // setIsAuthenticated(false);
        // Cookies.remove("token");
      }
    } catch (err) {
      console.error("fetchUser error:", err);
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/ecom/auth/login", { email, password });
      if (res.data.token) {
        Cookies.set("token", res.data.token, { expires: 1 });
        await fetchUser();
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      throw new Error(apiErr.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    phone: string;
    name: string;
    email: string;
    password: string;
    distributor_code?: number | null;
  }) => {
    setLoading(true);
    try {
      const res = await api.post("/ecom/auth/register", data);
      if (res.data.status) {
        router.push("/login");
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      throw new Error(apiErr.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
