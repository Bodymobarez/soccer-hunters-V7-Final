import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import translations from "@/lib/translations.js";

export type Locale = "ar" | "en" | "fr" | "es" | "de" | "pt" | "it" | "la";

// Default locale
export const defaultLocale: Locale = "ar";

// Supported locales
export const locales: Locale[] = [
  "ar",
  "en",
  "fr",
  "es",
  "de",
  "pt",
  "it",
  "la",
];

// Human-readable names for each locale
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  la: "Latina",
};

// Define the shape of our translation context
type UnifiedTranslationContextType = {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  dir: "rtl" | "ltr";
  isRTL: boolean;
  localeNames: Record<Locale, string>;
  supportedLocales: Locale[];
};

// Create the context
const UnifiedTranslationContext = createContext<
  UnifiedTranslationContextType | undefined
>(undefined);

// Storage keys
const STORAGE_KEYS = {
  locale: "app-locale",
  siteLanguage: "siteLanguage", // For backward compatibility
};

// Get current locale from localStorage or use default
export const getCurrentLocale = (): Locale => {
  if (typeof window === "undefined") return defaultLocale;

  try {
    // Check both storage keys for backward compatibility
    const storedLocale =
      localStorage.getItem(STORAGE_KEYS.locale) ||
      localStorage.getItem(STORAGE_KEYS.siteLanguage);

    if (storedLocale && locales.includes(storedLocale as Locale)) {
      return storedLocale as Locale;
    }
  } catch (error) {
    console.warn("Error reading locale from localStorage:", error);
  }

  return defaultLocale;
};

// Set current locale in localStorage
export const setCurrentLocale = (locale: Locale): void => {
  if (typeof window === "undefined") return;

  try {
    // Store in both keys for compatibility
    localStorage.setItem(STORAGE_KEYS.locale, locale);
    localStorage.setItem(STORAGE_KEYS.siteLanguage, locale);
  } catch (error) {
    console.warn("Error saving locale to localStorage:", error);
  }
};

// Initialize document properties
const initializeDocument = (locale: Locale): void => {
  if (typeof window === "undefined") return;

  const dir = locale === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = locale;

  // Set global variable for backward compatibility
  (window as any).currentSiteLanguage = locale;
};

// Get translation for a key with parameter substitution
export const getTranslation = (
  key: string,
  locale: Locale,
  params?: Record<string, string | number>,
): string => {
  const localeTranslations = translations[locale];

  if (!localeTranslations) {
    console.warn(`Translation not found for locale: ${locale}, using default`);
    return getTranslationFallback(key, params);
  }

  let translation = localeTranslations[key];

  if (!translation) {
    console.warn(`Translation not found for key: ${key} in locale: ${locale}`);
    return getTranslationFallback(key, params);
  }

  // Substitute parameters if provided
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      const paramValue = String(params[paramKey]);
      translation = translation.replace(
        new RegExp(`{${paramKey}}`, "g"),
        paramValue,
      );
    });
  }

  return translation;
};

// Fallback translation function
const getTranslationFallback = (
  key: string,
  params?: Record<string, string | number>,
): string => {
  // Try English first, then Arabic, then return the key
  let fallback =
    translations[defaultLocale]?.[key] || translations["en"]?.[key] || key;

  // Apply parameter substitution to fallback
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      const paramValue = String(params[paramKey]);
      fallback = fallback.replace(new RegExp(`{${paramKey}}`, "g"), paramValue);
    });
  }

  return fallback;
};

/**
 * Unified Translation Provider
 */
export function UnifiedTranslationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(getCurrentLocale());

  // Initialize document on mount
  useEffect(() => {
    const initialLocale = getCurrentLocale();
    setLocaleState(initialLocale);
    initializeDocument(initialLocale);

    console.log("🌐 Unified Translation System initialized:", {
      locale: initialLocale,
      direction: initialLocale === "ar" ? "rtl" : "ltr",
    });
  }, []);

  // Determine text direction
  const isRTL = locale === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  // Update document when locale changes
  useEffect(() => {
    initializeDocument(locale);
  }, [locale]);

  // Listen for storage events for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === STORAGE_KEYS.locale ||
        event.key === STORAGE_KEYS.siteLanguage
      ) {
        const newLocale = event.newValue as Locale;
        if (newLocale && locales.includes(newLocale) && newLocale !== locale) {
          console.log("🔄 Locale changed in another tab:", newLocale);
          setLocaleState(newLocale);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [locale]);

  // Listen for custom language change events
  useEffect(() => {
    const handleLanguageChanged = () => {
      const newLocale = getCurrentLocale();
      if (newLocale !== locale) {
        console.log("🔄 Language change event detected:", newLocale);
        setLocaleState(newLocale);
      }
    };

    window.addEventListener("languageChanged", handleLanguageChanged);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChanged);
  }, [locale]);

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    return getTranslation(key, locale, params);
  };

  // Function to change the locale
  const setLocale = (newLocale: Locale) => {
    if (!newLocale || newLocale === locale || !locales.includes(newLocale)) {
      console.warn("Invalid locale or same locale:", newLocale);
      return;
    }

    try {
      console.log(`🔄 Changing locale: ${locale} → ${newLocale}`);

      // Update storage
      setCurrentLocale(newLocale);

      // Update state
      setLocaleState(newLocale);

      // Dispatch custom event for other components
      const event = new CustomEvent("languageChanged", {
        detail: { oldLocale: locale, newLocale },
      });
      window.dispatchEvent(event);

      console.log(`✅ Locale successfully changed to: ${newLocale}`);
    } catch (error) {
      console.error("❌ Error changing locale:", error);
    }
  };

  const contextValue: UnifiedTranslationContextType = {
    t,
    locale,
    setLocale,
    dir,
    isRTL,
    localeNames,
    supportedLocales: locales,
  };

  return (
    <UnifiedTranslationContext.Provider value={contextValue}>
      {children}
    </UnifiedTranslationContext.Provider>
  );
}

/**
 * Hook to use the unified translation system
 */
export function useUnifiedTranslation(): UnifiedTranslationContextType {
  const context = useContext(UnifiedTranslationContext);

  if (context === undefined) {
    throw new Error(
      "useUnifiedTranslation must be used within a UnifiedTranslationProvider",
    );
  }

  return context;
}

// Export aliases for backward compatibility
export const useTranslation = useUnifiedTranslation;
export const TranslationProvider = UnifiedTranslationProvider;

// Utility functions
export const isRTLLocale = (locale: Locale): boolean => locale === "ar";
export const getLocaleDirection = (locale: Locale): "rtl" | "ltr" =>
  isRTLLocale(locale) ? "rtl" : "ltr";
