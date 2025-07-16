import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '@/api/authApi';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // التحقق من جلسة المستخدم عند بدء التطبيق
    const loadUserSession = async () => {
      try {
        setIsLoading(true);
        // محاولة استرجاع معلومات المستخدم من التخزين المحلي
        const userData = await AsyncStorage.getItem('user');
        
        if (userData) {
          // التحقق من صحة الجلسة مع الخادم
          try {
            const currentUser = await authApi.getCurrentUser();
            setUser(currentUser);
          } catch (e) {
            // في حالة فشل التحقق من صحة الجلسة، إزالة بيانات المستخدم من التخزين
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Failed to load user session', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await authApi.login(username, password);
      
      if (result.user) {
        // حفظ بيانات المستخدم ورمز الدخول
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
        if (result.token) {
          await AsyncStorage.setItem('token', result.token);
        }
        
        setUser(result.user);
        return true;
      } else {
        setError(result.message || 'فشل تسجيل الدخول');
        return false;
      }
    } catch (error) {
      console.error('Login error', error);
      setError('حدث خطأ أثناء تسجيل الدخول');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await authApi.register(userData);
      
      if (result.user) {
        // حفظ بيانات المستخدم ورمز الدخول
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
        if (result.token) {
          await AsyncStorage.setItem('token', result.token);
        }
        
        setUser(result.user);
        return true;
      } else {
        setError(result.message || 'فشل التسجيل');
        return false;
      }
    } catch (error) {
      console.error('Registration error', error);
      setError('حدث خطأ أثناء التسجيل');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // استدعاء API لتسجيل الخروج
      await authApi.logout();
    } catch (error) {
      console.error('Logout error', error);
      // في حالة حدوث خطأ، استمر في عملية تسجيل الخروج محليًا
    } finally {
      // بغض النظر عن نتيجة الاستدعاء، إزالة البيانات من التخزين المحلي
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);