import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { User } from '@/types/user';

// تكوين الخادم المناسب لبيئة التطوير والإنتاج
const API_URL = Platform.OS === 'web' 
  ? '/api' 
  : Platform.OS === 'android'
    ? 'http://10.0.2.2:5000/api' // عنوان للمحاكي الافتراضي لأندرويد
    : 'http://localhost:5000/api'; // عنوان لجهاز iOS

// إنشاء حالة أساسية لـ axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة معترض للطلبات لإضافة رمز المصادقة
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  // تسجيل الدخول
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login API error', error);
      return { error: true, message: 'فشل تسجيل الدخول' };
    }
  },

  // تسجيل حساب جديد
  register: async (userData: any) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      console.error('Register API error', error);
      return { error: true, message: 'فشل التسجيل' };
    }
  },

  // تسجيل الخروج
  logout: async () => {
    try {
      await api.post('/logout');
      return { success: true };
    } catch (error) {
      console.error('Logout API error', error);
      return { error: true, message: 'حدث خطأ أثناء تسجيل الخروج' };
    }
  },

  // الحصول على بيانات المستخدم الحالي
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Get current user API error', error);
      throw new Error('فشل الحصول على بيانات المستخدم');
    }
  },

  // تحديث معلومات المستخدم
  updateUserProfile: async (userData: Partial<User>) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update user profile API error', error);
      return { error: true, message: 'فشل تحديث الملف الشخصي' };
    }
  },
};

export default api;