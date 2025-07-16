import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { Theme } from '@/types/theme';

// الألوان الرئيسية للتطبيق
const colors = {
  primary: '#10b981', // أخضر زمردي
  primaryDark: '#059669',
  secondary: '#3b82f6', // أزرق
  secondaryDark: '#2563eb',
  accent: '#d946ef', // بنفسجي
  background: '#ffffff',
  backgroundDark: '#1f2937',
  surface: '#f9fafb',
  surfaceDark: '#111827',
  text: '#1f2937',
  textDark: '#f9fafb',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#3b82f6',
};

export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
    text: colors.text,
    onSurface: colors.text,
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 8,
  dark: false,
};

export const darkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.backgroundDark,
    surface: colors.surfaceDark,
    error: colors.error,
    text: colors.textDark,
    onSurface: colors.textDark,
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  roundness: 8,
  dark: true,
};

export const fontConfig = {
  regular: {
    fontFamily: 'sans-serif',
    fontWeight: 'normal' as const,
  },
  medium: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal' as const,
  },
  light: {
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal' as const,
  },
  thin: {
    fontFamily: 'sans-serif-thin',
    fontWeight: 'normal' as const,
  },
};