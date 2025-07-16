import { useState, useEffect } from "react";

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

// Cache for translations to reduce API calls
const translationCache: Record<string, string> = {};

// Simulated AI translation API call (replace with real API integration)
async function aiTranslate(text: string, targetLocale: Locale): Promise<string> {
  // For demonstration, just return the text with locale appended
  // Replace this with actual API call to OpenAI or Google Translate
  return Promise.resolve(`[${targetLocale}] ${text}`);
}

// Get current locale from localStorage or default
function getCurrentLocale(): Locale {
  if (typeof window !== "undefined") {
    const savedLocale = localStorage.getItem("app-locale") as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      return savedLocale;
    }
  }
  return defaultLocale;
}

// Set current locale in localStorage
function setCurrentLocale(locale: Locale): void {
  if (!locales.includes(locale)) {
    console.error(`Invalid locale: ${locale}. Must be one of: ${locales.join(", ")}`);
    return;
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("app-locale", locale);
  }
}

// Async hook to get translation for a given key/text
export function useTranslation(text: string, locale?: Locale): string {
  const [translation, setTranslation] = useState<string>(text);
  const targetLocale = locale || getCurrentLocale();

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `${targetLocale}:${text}`;

    async function fetchTranslation() {
      if (translationCache[cacheKey]) {
        setTranslation(translationCache[cacheKey]);
        return;
      }
      try {
        const translated = await aiTranslate(text, targetLocale);
        translationCache[cacheKey] = translated;
        if (isMounted) {
          setTranslation(translated);
        }
      } catch (error) {
        console.error("AI translation error:", error);
        if (isMounted) {
          setTranslation(text); // fallback to original text
        }
      }
    }

    fetchTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, targetLocale]);

  return translation;
}

// Function to force clear the translation cache
export function clearTranslationCache() {
  for (const key in translationCache) {
    delete translationCache[key];
  }
}
