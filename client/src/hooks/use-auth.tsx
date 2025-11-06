import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
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
      console.log("🔍 Checking authentication state...");
      
      // Check if user just logged out (flag set by logout function)
      const justLoggedOut = sessionStorage.getItem('justLoggedOut');
      if (justLoggedOut === 'true') {
        console.log("🔴 Just logged out - preventing auto-login");
        return null;
      }
      
      // CRITICAL: Check localStorage FIRST - if no mockUser, return null immediately
      // This prevents auto-login after logout
      const storedMockUser = localStorage.getItem('mockUser');
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log("📦 Storage check:", { 
        hasMockUser: !!storedMockUser, 
        hasToken: !!storedToken, 
        hasUser: !!storedUser 
      });
      
      // If NO auth data exists, return null immediately
      if (!storedMockUser && !storedToken && !storedUser) {
        console.log("❌ No auth data found - returning null");
        return null;
      }
      
      if (config.useMockApi) {
        if (!storedMockUser) {
          console.log("❌ Mock API: No mockUser found");
          return null;
        }
        console.log("✅ Mock API: User found");
        return await mockAuth.getCurrentUser();
      }

      try {
        const res = await apiRequest("GET", "/api/user");
        if (res.status === 401) {
          console.log("❌ 401 Unauthorized");
          return null;
        }
        console.log("✅ Backend: User authenticated");
        return await res.json();
      } catch (err) {
        // Fallback to mock if backend is not available
        if (!storedMockUser) {
          console.log("❌ Backend error + No mockUser");
          return null;
        }
        console.warn("⚠️ Backend not available, checking mock authentication");
        return await mockAuth.getCurrentUser();
      }
    },
    staleTime: 0, // Always consider data stale
    gcTime: 0, // React Query v5: immediately garbage collect to prevent caching
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true, // ✅ Allow refetch on mount to check localStorage
    refetchOnReconnect: false, // Don't refetch on reconnect
    enabled: true, // Always enabled
    retry: false, // Don't retry failed auth checks
  });

  // Effect to ensure user is null if no storage data exists
  useEffect(() => {
    const storedMockUser = localStorage.getItem('mockUser');
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    // If no auth data and user is not null, force set to null
    if (!storedMockUser && !storedToken && !storedUser && user !== null) {
      console.log("⚠️ No storage data but user exists - forcing logout");
      queryClient.setQueryData(["/api/user"], null);
    }
  }, [user]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Always try mock authentication first for demo purposes
      // or if no backend is configured
      if (config.useMockApi || !config.apiBaseUrl) {
        console.info("Using mock authentication");
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
        if (error instanceof TypeError && error.message.includes("fetch")) {
          // Fallback to mock authentication
          console.warn(
            "Backend not available, falling back to mock authentication",
          );
          return await mockAuth.login(
            credentials.username,
            credentials.password,
          );
        }
        // For other network or connection errors, also fallback to mock
        if (
          error instanceof Error &&
          (error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("fetch"))
        ) {
          console.warn(
            "Network error detected, falling back to mock authentication",
          );
          return await mockAuth.login(
            credentials.username,
            credentials.password,
          );
        }
        throw error;
      }
    },
    onSuccess: (userData: User) => {
      // Clear logout flag on successful login
      sessionStorage.removeItem('justLoggedOut');
      
      queryClient.setQueryData(["/api/user"], userData);
      console.log("✅ تم تسجيل الدخول بنجاح");
    },
    onError: (error: Error) => {
      console.error("خطأ في تسجيل الدخول:", error.message);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      // Always try mock authentication first for demo purposes
      // or if no backend is configured
      if (config.useMockApi || !config.apiBaseUrl) {
        console.info("Using mock registration");
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
        if (error instanceof TypeError && error.message.includes("fetch")) {
          // Fallback to mock authentication
          console.warn(
            "Backend not available, falling back to mock registration",
          );
          return await mockAuth.register(credentials);
        }
        // For other network or connection errors, also fallback to mock
        if (
          error instanceof Error &&
          (error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("fetch"))
        ) {
          console.warn(
            "Network error detected, falling back to mock registration",
          );
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
      // Always try mock authentication first for demo purposes
      // or if no backend is configured
      if (config.useMockApi || !config.apiBaseUrl) {
        console.info("Using mock logout");
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
        if (error instanceof TypeError && error.message.includes("fetch")) {
          console.warn("Backend not available, clearing mock authentication");
          await mockAuth.logout();
          return;
        }
        // For other network or connection errors, also fallback to mock
        if (
          error instanceof Error &&
          (error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("fetch"))
        ) {
          console.warn("Network error detected, clearing mock authentication");
          await mockAuth.logout();
          return;
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Clear all storage completely
      const authKeys = ['mockUser', 'token', 'user', 'authToken', 'session', 'userData'];
      authKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // Set user data to null immediately - DO NOT refetch
      queryClient.setQueryData(["/api/user"], null);
      
      // Cancel any ongoing queries to prevent refetch
      queryClient.cancelQueries({ queryKey: ["/api/user"] });
      
      // Remove query from cache to prevent automatic refetch
      queryClient.removeQueries({ queryKey: ["/api/user"] });
      
      console.log("✅ تم تسجيل الخروج بنجاح");
    },
    onError: (error: Error) => {
      // Even on error, clear all storage
      const authKeys = ['mockUser', 'token', 'user', 'authToken', 'session', 'userData'];
      authKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // Set user data to null - DO NOT refetch
      queryClient.setQueryData(["/api/user"], null);
      
      // Cancel any ongoing queries to prevent refetch
      queryClient.cancelQueries({ queryKey: ["/api/user"] });
      
      // Remove query from cache to prevent automatic refetch
      queryClient.removeQueries({ queryKey: ["/api/user"] });
      
      console.error("❌ خطأ في تسجيل الخروج:", error.message);
    },
  });

  // Public methods
  const login = async (credentials: LoginCredentials) => {
    // Clear logout flag before login attempt
    sessionStorage.removeItem('justLoggedOut');
    await loginMutation.mutateAsync(credentials);
  };

  const register = async (credentials: RegisterCredentials) => {
    await registerMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    try {
      console.log("🔴 useAuth: Starting logout...");
      
      // Set logout flag FIRST - this prevents queryFn from returning user
      sessionStorage.setItem('justLoggedOut', 'true');
      
      // Clear all storage first to prevent getCurrentUser from returning user
      const authKeys = ['mockUser', 'token', 'user', 'authToken', 'session', 'userData'];
      authKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // Cancel any ongoing queries
      queryClient.cancelQueries({ queryKey: ["/api/user"] });
      
      // Set user data to null immediately
      queryClient.setQueryData(["/api/user"], null);
      
      console.log("✅ useAuth: Storage cleared, calling logout mutation...");
      
      // Call logout mutation
      await logoutMutation.mutateAsync();
      
      console.log("✅ useAuth: Logout mutation completed");
      
      // DO NOT refetch - just ensure data is null
    } catch (error) {
      console.error("❌ useAuth: Logout error:", error);
      
      // Set logout flag even on error
      sessionStorage.setItem('justLoggedOut', 'true');
      
      // Even if logout fails, ensure all storage is cleared
      const authKeys = ['mockUser', 'token', 'user', 'authToken', 'session', 'userData'];
      authKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // Set user data to null - DO NOT refetch
      queryClient.setQueryData(["/api/user"], null);
      queryClient.cancelQueries({ queryKey: ["/api/user"] });
      queryClient.removeQueries({ queryKey: ["/api/user"] });
    }
  };

  // Context value
  const value: AuthContextValue = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    register,
    logout,
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
