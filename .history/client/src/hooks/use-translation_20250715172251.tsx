import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Import the comprehensive translations
import { messages, t } from "@/lib/i18n";

export type Locale = "ar" | "en" | "fr" | "es" | "de";

// Default locale
export const defaultLocale: Locale = "ar";

// Supported locales
export const locales: Locale[] = ["ar", "en", "fr", "es", "de"];

// Human-readable names for each locale
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
};

// Define the shape of our translation context
type TranslationContextType = {
  t: (key: string) => string;
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  dir: "rtl" | "ltr";
};

// Create the context with undefined default value
const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

// Get current locale from localStorage or use default
export const getCurrentLocale = (): Locale => {
  if (typeof window === "undefined") return defaultLocale;

  // Force Arabic as the default locale for now
  // Check if there's a stored locale, but prioritize Arabic
  const stored =
    localStorage.getItem("app-locale") || localStorage.getItem("siteLanguage");

  // If no stored locale or if it's not Arabic, set it to Arabic
  if (!stored || stored !== "ar") {
    localStorage.setItem("app-locale", "ar");
    localStorage.setItem("siteLanguage", "ar");
    return "ar";
  }

  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }
  return defaultLocale;
};

// Set current locale in localStorage
export const setCurrentLocale = (locale: Locale): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("app-locale", locale);
  localStorage.setItem("siteLanguage", locale);
};

// Initialize locale system
export const initLocale = (): void => {
  const currentLocale = getCurrentLocale();
  setCurrentLocale(currentLocale);

  // Set document direction and lang
  const dir = currentLocale === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = currentLocale;

  console.log(
    `🌐 Translation system initialized with locale: ${currentLocale}, direction: ${dir}`,
  );
};

// Get translation for a key from nested structure
export const getTranslation = (key: string, locale: Locale): string => {
  try {
    const localeMessages = messages[locale];
    if (!localeMessages) {
      console.warn(
        `Translation not found for locale: ${locale}, using default locale`,
      );
      return messages[defaultLocale]?.common?.[key] || key;
    }

    // Check in common namespace first
    const translation = localeMessages.common?.[key];
    if (!translation) {
      console.warn(
        `Translation not found for key: ${key} in locale: ${locale}`,
      );
      // Try the default locale as fallback
      const fallback = messages[defaultLocale]?.common?.[key];
      if (!fallback) {
        console.warn(
          `Translation not found for key: ${key} in default locale either`,
        );
        return key; // Return the key itself if no translation found
      }
      return fallback;
    }

    return translation;
  } catch (error) {
    console.error("Error getting translation:", error);
    return key;
  }
};

/**
 * TranslationProvider component that wraps the app and provides translation functionality
 */
export function TranslationProvider({ children }: { children: ReactNode }) {
  // Initialize the locale system when the provider mounts
  useEffect(() => {
    initLocale();
    const initialLocale = getCurrentLocale();
    setLocaleState(initialLocale);
    console.log("TranslationProvider initialized with locale:", initialLocale);
  }, []);

  // Current locale state - force Arabic initially
  const [locale, setLocaleState] = useState<Locale>("ar");

  // Determine text direction based on the locale
  const rtlLanguages: Locale[] = ["ar"];
  const dir = rtlLanguages.includes(locale) ? "rtl" : "ltr";

  // Update document direction and lang whenever locale changes
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, dir]);

  // Listen for storage events for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "app-locale" || event.key === "siteLanguage") {
        const newLocale = event.newValue as Locale;
        if (newLocale && locales.includes(newLocale)) {
          console.log("Locale changed in another tab:", newLocale);
          setLocaleState(newLocale);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Translation function - simplified to work with flat structure
  const t = (key: string): string => {
    const translation = getTranslation(key, locale);
    // Debug logging for translation issues
    if (translation === key) {
      console.log(
        `⚠️ Translation missing for key: "${key}" in locale: "${locale}"`,
      );
    }
    return translation;
  };

  // Function to change the locale
  const setLocale = (newLocale: Locale) => {
    if (!newLocale || newLocale === locale) return;

    try {
      console.log(`⚙️ Changing locale: ${locale} → ${newLocale}`);

      // Update core state
      setCurrentLocale(newLocale);
      setLocaleState(newLocale);

      // Update document properties
      const newDir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.dir = newDir;
      document.documentElement.lang = newLocale;

      console.log(`✅ Locale changed to: ${newLocale}`);
      console.log(`✅ Document direction: ${newDir}`);

      // Notify other components about the change
      const event = new Event("languageChanged");
      window.dispatchEvent(event);

      console.log("✅ Language change event dispatched");
    } catch (error) {
      console.error("❌ Error changing locale:", error);
    }
  };

  // Provide the translation context to children
  return (
    <TranslationContext.Provider value={{ t, locale, setLocale, dir }}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Custom hook to use translations in components
 */
export function useTranslation() {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
}
