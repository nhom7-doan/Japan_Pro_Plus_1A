import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export interface User {
  id: string;
  email: string;
  fullName?: string;
}

export class AuthService {
  // Sign up new user
  static async signup(email: string, password: string, fullName: string, phone?: string) {
    try {
      const response = await fetch(
        `${API_BASE}/api/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, fullName, phone })
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to sign up' };
    }
  }

  // Sign in
  static async signin(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to sign in' };
    }
  }

  // Sign out
  static async signout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to sign out' };
    }
  }

  // Get current session
  static async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session: data.session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error: error instanceof Error ? error.message : 'Failed to get session' };
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
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
  }

  // Get access token
  static async getAccessToken(): Promise<string | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      console.error('Get access token error:', error);
      return null;
    }
  }
}