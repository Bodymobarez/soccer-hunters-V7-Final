import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translations, {
  Language,
  LANGUAGE_NAMES,
  DEFAULT_LANGUAGE,
} from "@/localization/unified-translations";

interface UnifiedLanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
  languageNames: typeof LANGUAGE_NAMES;
  isRTL: boolean;
  supportedLanguages: Language[];
}

// Storage keys (consistent with web app)
const STORAGE_KEYS = {
  locale: "app-locale",
  siteLanguage: "siteLanguage", // For backward compatibility
};

const UnifiedLanguageContext = createContext<UnifiedLanguageContextType>({
  currentLanguage: DEFAULT_LANGUAGE,
  changeLanguage: async () => {},
  t: (key: string) => key,
  languageNames: LANGUAGE_NAMES,
  isRTL: DEFAULT_LANGUAGE === "ar",
  supportedLanguages: Object.keys(LANGUAGE_NAMES) as Language[],
});

export const UnifiedLanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(DEFAULT_LANGUAGE);
  const [isRTL, setIsRTL] = useState(DEFAULT_LANGUAGE === "ar");

  // Supported languages array
  const supportedLanguages = Object.keys(LANGUAGE_NAMES) as Language[];

  useEffect(() => {
    // Load stored language on app startup
    const loadStoredLanguage = async () => {
      try {
        // Check both storage keys for consistency with web app
        const storedLocale = await AsyncStorage.getItem(STORAGE_KEYS.locale);
        const storedSiteLanguage = await AsyncStorage.getItem(
          STORAGE_KEYS.siteLanguage,
        );

        const savedLanguage = storedLocale || storedSiteLanguage;

        if (
          savedLanguage &&
          supportedLanguages.includes(savedLanguage as Language)
        ) {
          setCurrentLanguage(savedLanguage as Language);
          setIsRTL(savedLanguage === "ar");

          // Ensure both storage keys are synced
          if (storedLocale !== savedLanguage) {
            await AsyncStorage.setItem(STORAGE_KEYS.locale, savedLanguage);
          }
          if (storedSiteLanguage !== savedLanguage) {
            await AsyncStorage.setItem(
              STORAGE_KEYS.siteLanguage,
              savedLanguage,
            );
          }

          console.log(
            "🌐 Mobile: Language loaded from storage:",
            savedLanguage,
          );
        } else {
          // Set default language if no valid language found
          setCurrentLanguage(DEFAULT_LANGUAGE);
          setIsRTL(DEFAULT_LANGUAGE === "ar");
          await AsyncStorage.setItem(STORAGE_KEYS.locale, DEFAULT_LANGUAGE);
          await AsyncStorage.setItem(
            STORAGE_KEYS.siteLanguage,
            DEFAULT_LANGUAGE,
          );
          console.log("🌐 Mobile: Using default language:", DEFAULT_LANGUAGE);
        }
      } catch (error) {
        console.error("Failed to load language from storage", error);
        // Use default language on error
        setCurrentLanguage(DEFAULT_LANGUAGE);
        setIsRTL(DEFAULT_LANGUAGE === "ar");
      }
    };

    loadStoredLanguage();
  }, []);

  // Function to change language
  const changeLanguage = async (language: Language): Promise<void> => {
    if (!supportedLanguages.includes(language)) {
      console.error("Unsupported language:", language);
      return;
    }

    try {
      console.log(
        `🔄 Mobile: Changing language: ${currentLanguage} → ${language}`,
      );

      // Save to both storage keys for consistency
      await AsyncStorage.setItem(STORAGE_KEYS.locale, language);
      await AsyncStorage.setItem(STORAGE_KEYS.siteLanguage, language);

      // Update state
      setCurrentLanguage(language);
      setIsRTL(language === "ar");

      console.log(`✅ Mobile: Language changed to: ${language}`);
    } catch (error) {
      console.error("Failed to save language", error);
      throw error;
    }
  };

  // Translation function with parameter substitution
  const t = (key: string, params?: Record<string, string | number>): string => {
    try {
      if (!translations[currentLanguage]) {
        // Fallback to Arabic or English if current language not available
        console.warn(
          `Language ${currentLanguage} not available in translations`,
        );
        const fallback =
          translations[DEFAULT_LANGUAGE][key] || translations.en[key] || key;
        return applyParameters(fallback, params);
      }

      let translation = translations[currentLanguage][key];

      if (!translation) {
        // Try fallback languages
        console.warn(
          `Translation key '${key}' not found for language '${currentLanguage}'`,
        );
        translation =
          translations[DEFAULT_LANGUAGE][key] || translations.en[key] || key;
      }

      return applyParameters(translation, params);
    } catch (error) {
      console.error("Translation error:", error);
      return key;
    }
  };

  // Helper function to apply parameters to translation strings
  const applyParameters = (
    text: string,
    params?: Record<string, string | number>,
  ): string => {
    if (!params) return text;

    let result = text;
    Object.keys(params).forEach((paramKey) => {
      const paramValue = String(params[paramKey]);
      result = result.replace(new RegExp(`{${paramKey}}`, "g"), paramValue);
    });

    return result;
  };

  const contextValue: UnifiedLanguageContextType = {
    currentLanguage,
    changeLanguage,
    t,
    languageNames: LANGUAGE_NAMES,
    isRTL,
    supportedLanguages,
  };

  return (
    <UnifiedLanguageContext.Provider value={contextValue}>
      {children}
    </UnifiedLanguageContext.Provider>
  );
};

// Hook to use the unified language context
export const useUnifiedLanguage = (): UnifiedLanguageContextType => {
  const context = useContext(UnifiedLanguageContext);

  if (!context) {
    throw new Error(
      "useUnifiedLanguage must be used within a UnifiedLanguageProvider",
    );
  }

  return context;
};

// Export aliases for backward compatibility
export const useLanguage = useUnifiedLanguage;
export const LanguageContext = UnifiedLanguageContext;
export const LanguageProvider = UnifiedLanguageProvider;

export default UnifiedLanguageContext;
