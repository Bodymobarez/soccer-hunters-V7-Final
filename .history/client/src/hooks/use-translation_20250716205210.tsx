import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Locale = "ar" | "en" | "fr" | "es" | "de" | "pt" | "it" | "la";

export const defaultLocale: Locale = "en";

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

import translations from "@/lib/translations";

// Context type
type TranslationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Determine text direction based on locale
  const rtlLanguages: Locale[] = ["ar"];
  const dir = rtlLanguages.includes(locale) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  // Translation function
  const t = (key: string): string => {
    return translations[locale]?.[key] || key;
  };

  const setLocale = (newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
    }
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
