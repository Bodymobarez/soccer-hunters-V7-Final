import React, { createContext, ReactNode, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import config from "@/lib/config";
import { mockAuth } from "@/lib/mockAuth";

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  fullName?: string;
  phone?: string;
  profileImage?: string;
  verified: boolean;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  email: string;
  role?: string;
  fullName?: string;
  phone?: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextValue | null>(null);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {

  // Fetch current user
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      // Use mock authentication if no backend is configured
      if (config.useMockApi) {
        return await mockAuth.getCurrentUser();
      }
      
      try {
        const res = await apiRequest("GET", "/api/user");
        if (res.status === 401) return null;
        return await res.json();
      } catch (err) {
        // Fallback to mock if backend is not available
        console.warn("Backend not available, checking mock authentication");
        return await mockAuth.getCurrentUser();
      }
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Use mock authentication if no backend is configured
      if (config.useMockApi) {
        return await mockAuth.login(credentials.username, credentials.password);
      }
      
      try {
        const res = await apiRequest("POST", "/api/login", credentials);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "فشل تسجيل الدخول");
        }
        return await res.json();
      } catch (error) {
        // Check if it's a network error (backend not available)
        if (error instanceof TypeError && error.message.includes('fetch')) {
          // Fallback to mock authentication
          console.warn("Backend not available, using mock authentication");
          return await mockAuth.login(credentials.username, credentials.password);
        }
        throw error;
      }
    },
    onSuccess: (userData: User) => {
      queryClient.setQueryData(["/api/user"], userData);
      console.log("تم تسجيل الدخول بنجاح");
    },
    onError: (error: Error) => {
      console.error("خطأ في تسجيل الدخول:", error.message);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      // Use mock authentication if no backend is configured
      if (config.useMockApi) {
        return await mockAuth.register(credentials);
      }
      
      try {
        const res = await apiRequest("POST", "/api/register", credentials);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "فشل التسجيل");
        }
        return await res.json();
      } catch (error) {
        // Check if it's a network error (backend not available)
        if (error instanceof TypeError && error.message.includes('fetch')) {
          // Fallback to mock authentication
          console.warn("Backend not available, using mock authentication");
          return await mockAuth.register(credentials);
        }
        throw error;
      }
    },
    onSuccess: (userData: User) => {
      queryClient.setQueryData(["/api/user"], userData);
      console.log("تم التسجيل بنجاح");
    },
    onError: (error: Error) => {
      console.error("خطأ في التسجيل:", error.message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Use mock authentication if no backend is configured
      if (config.useMockApi) {
        await mockAuth.logout();
        return;
      }
      
      try {
        const res = await apiRequest("POST", "/api/logout");
        if (!res.ok) {
          throw new Error("فشل تسجيل الخروج");
        }
      } catch (error) {
        // Even if backend logout fails, clear local mock data
        if (error instanceof TypeError && error.message.includes('fetch')) {
          console.warn("Backend not available, clearing mock authentication");
          await mockAuth.logout();
          return;
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      console.log("تم تسجيل الخروج بنجاح");
    },
    onError: (error: Error) => {
      console.error("خطأ في تسجيل الخروج:", error.message);
    },
  });

  // Public methods
  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const register = async (credentials: RegisterCredentials) => {
    await registerMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // Context value
  const value: AuthContextValue = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    register,
    logout: async () => {
      // Use the normal logout process
      await logoutMutation.mutateAsync();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}