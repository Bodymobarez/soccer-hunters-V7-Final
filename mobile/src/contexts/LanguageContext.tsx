import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations, { Language, LANGUAGE_NAMES } from '@/localization/translations';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
  languageNames: typeof LANGUAGE_NAMES;
  isRTL: boolean;
}

const DEFAULT_LANGUAGE: Language = 'ar';

export const LanguageContext = createContext<LanguageContextType>({ 
  currentLanguage: DEFAULT_LANGUAGE,
  changeLanguage: () => {},
  t: (key: string) => key,
  languageNames: LANGUAGE_NAMES,
  isRTL: true,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    // استرجاع اللغة المخزنة في الجهاز
    const loadStoredLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage && Object.keys(LANGUAGE_NAMES).includes(storedLanguage as Language)) {
          setCurrentLanguage(storedLanguage as Language);
          setIsRTL(storedLanguage === 'ar');
        }
      } catch (error) {
        console.error('Failed to load language from storage', error);
        // استخدام اللغة الافتراضية في حالة وجود أي خطأ
        setCurrentLanguage(DEFAULT_LANGUAGE);
        setIsRTL(DEFAULT_LANGUAGE === 'ar');
      }
    };

    loadStoredLanguage();
  }, []);

  const changeLanguage = async (language: Language) => {
    try {
      await AsyncStorage.setItem('language', language);
      setCurrentLanguage(language);
      setIsRTL(language === 'ar');
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  const t = (key: string): string => {
    try {
      if (!translations[currentLanguage]) {
        // في حالة عدم وجود اللغة المطلوبة، استخدم اللغة العربية أو الإنجليزية
        return translations.ar[key] || translations.en[key] || key;
      }

      return translations[currentLanguage][key] || key;
    } catch (error) {
      console.error('Translation error', error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        t, 
        languageNames: LANGUAGE_NAMES,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);