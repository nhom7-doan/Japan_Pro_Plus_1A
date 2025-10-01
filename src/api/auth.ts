import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { API_BASE_URL, createHeaders, handleResponse } from "./config";

// Khởi tạo Supabase client
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Interface cho User
export interface User {
  id: string;
  email: string;
  fullName?: string;
}

// Interface cho Sign Up response
export interface SignUpResponse {
  message: string;
  userId?: string;
}

// Interface cho Sign In response  
export interface SignInResponse {
  message: string;
  session: any;
  user: any;
}

// ==================== API Đăng ký ====================
export const signup = async (
  email: string, 
  password: string, 
  fullName: string, 
  phone?: string
): Promise<{ data: SignUpResponse | null; error: string | null }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({ email, password, fullName, phone })
    });

    return handleResponse<SignUpResponse>(response);
  } catch (error) {
    console.error('Signup error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Đăng ký thất bại' };
  }
};

// ==================== API Đăng nhập ====================
export const signin = async (
  email: string, 
  password: string
): Promise<{ data: SignInResponse | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { 
      data: {
        message: 'Đăng nhập thành công',
        session: data.session,
        user: data.user
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Đăng nhập thất bại' };
  }
};

// ==================== API Đăng xuất ====================
export const signout = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: error instanceof Error ? error.message : 'Đăng xuất thất bại' };
  }
};

// ==================== Lấy session hiện tại ====================
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return { session: null, error: error.message };
    }
    return { session: data.session, error: null };
  } catch (error) {
    console.error('Get session error:', error);
    return { session: null, error: error instanceof Error ? error.message : 'Lỗi lấy session' };
  }
};

// ==================== Lấy user hiện tại ====================
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    return {
      id: user.id,
      email: user.email || '',
      fullName: user.user_metadata?.full_name
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// ==================== Lấy access token ====================
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch (error) {
    console.error('Get access token error:', error);
    return null;
  }
};
