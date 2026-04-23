export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  distributor_code?: number | null;
}

export interface LoginResponse {
  status: boolean;
  token?: string;
  message?: string;
}

// lib/types/User.ts

export interface APIResponse {
  status?: boolean;
  success?: boolean;
  token?: string;
  message?: string;
  // data ko 'any' ya specific Order type dein
  data?: any;
}
