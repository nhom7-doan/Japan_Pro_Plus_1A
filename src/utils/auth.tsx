// File này re-export từ src/api/ để tương thích với code cũ
// Để thêm hoặc sửa API, vui lòng chỉnh sửa trong thư mục src/api/

import * as AuthAPI from '../api/auth';

// Re-export tất cả từ api/auth
export { supabase, type User, type SignUpResponse, type SignInResponse } from '../api/auth';

// Tạo AuthService class để tương thích với code cũ
export class AuthService {
  // Sign up new user
  static async signup(email: string, password: string, fullName: string, phone?: string) {
    return AuthAPI.signup(email, password, fullName, phone);
  }

  // Sign in
  static async signin(email: string, password: string) {
    return AuthAPI.signin(email, password);
  }

  // Sign out
  static async signout() {
    return AuthAPI.signout();
  }

  // Get current session
  static async getSession() {
    return AuthAPI.getSession();
  }

  // Get current user
  static async getCurrentUser() {
    return AuthAPI.getCurrentUser();
  }

  // Get access token
  static async getAccessToken() {
    return AuthAPI.getAccessToken();
  }

  // Aliases cho tương thích
  static async signIn(email: string, password: string) {
    const result = await AuthAPI.signin(email, password);
    return {
      success: result.error === null,
      data: result.data,
      error: result.error
    };
  }

  static async signUp(email: string, password: string, metadata?: any) {
    const result = await AuthAPI.signup(
      email, 
      password, 
      metadata?.full_name || '', 
      metadata?.phone
    );
    return {
      success: result.error === null,
      data: result.data,
      error: result.error
    };
  }

  static async signOut() {
    const result = await AuthAPI.signout();
    return {
      success: result.error === null,
      error: result.error
    };
  }
}
