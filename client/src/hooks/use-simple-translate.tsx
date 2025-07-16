import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import translations from '@/lib/translations';
import { locales, Locale } from '@/lib/i18n';

export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it' | 'la';

// كائن يخزن أسماء اللغات
export const LANGUAGE_NAMES = {
  ar: 'العربية',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
  la: 'Latina'
};

// اللغة الافتراضية
export const DEFAULT_LANGUAGE: Language = 'ar';

// نوع سياق الترجمة
type TranslationContextType = {
  t: (key: string) => string;
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
};

// إنشاء سياق الترجمة
const TranslationContext = createContext<TranslationContextType | null>(null);

// مزود الترجمة
export function SimpleTranslationProvider({ children }: { children: ReactNode }) {
  // الحصول على اللغة المخزنة محليًا أو استخدام اللغة الافتراضية
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  // الاستماع للتغييرات في اللغة من مصادر مختلفة
  useEffect(() => {
    // 1. الاستماع للتغييرات في التخزين المحلي (للتغييرات من علامات تبويب أخرى)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'siteLanguage' || event.key === 'app-locale') {
        const newLanguage = event.newValue as Language | null;
        if (newLanguage && Object.keys(LANGUAGE_NAMES).includes(newLanguage) && newLanguage !== currentLanguage) {
          console.log(`🌐 تغيير اللغة إلى:`, newLanguage);
          setCurrentLanguage(newLanguage);
          // تحديث اتجاه المستند
          const newDir = newLanguage === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.dir = newDir;
          document.documentElement.lang = newLanguage;
          console.log(`✅ اتجاه المستند: ${newDir}`);
          console.log(`✅ لغة المستند: ${newLanguage}`);
        }
      }
    };
    
    // 2. الاستماع لأحداث تغيير اللغة من useTranslation وغيرها
    const handleLanguageChanged = () => {
      // التحقق من التخزين المحلي لقيمة اللغة الجديدة
      const appLocale = localStorage.getItem('app-locale') as Language | null;
      if (appLocale && Object.keys(LANGUAGE_NAMES).includes(appLocale) && appLocale !== currentLanguage) {
        console.log(`✅ تم الكشف عن تغيير اللغة من مكون آخر: ${appLocale}`);
        setCurrentLanguage(appLocale);
      }
    };
    
    // تسجيل المستمعين
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChanged', handleLanguageChanged);
    
    // إزالة المستمعين عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleLanguageChanged);
    };
  }, [currentLanguage]);

  // تهيئة اللغة عند تحميل التطبيق
  useEffect(() => {
    try {
      // تحقق من وجود اللغة في كلا النظامين
      const appLocale = localStorage.getItem('app-locale') as Language | null;
      const siteLanguage = localStorage.getItem('siteLanguage') as Language | null;
      
      // الأولوية الأولى: استخدام app-locale إذا كان صالحًا
      if (appLocale && Object.keys(LANGUAGE_NAMES).includes(appLocale)) {
        setCurrentLanguage(appLocale);
        // التأكد من تزامن siteLanguage
        if (siteLanguage !== appLocale) {
          localStorage.setItem('siteLanguage', appLocale);
        }
        console.log(`✅ تم تهيئة اللغة من app-locale: ${appLocale}`);
      }
      // الأولوية الثانية: استخدام siteLanguage إذا كان صالحًا
      else if (siteLanguage && Object.keys(LANGUAGE_NAMES).includes(siteLanguage)) {
        setCurrentLanguage(siteLanguage);
        // التأكد من تزامن app-locale
        localStorage.setItem('app-locale', siteLanguage);
        console.log(`✅ تم تهيئة اللغة من siteLanguage: ${siteLanguage}`);
      }
      // الحالة الافتراضية: لم يتم العثور على لغة صالحة
      else {
        setCurrentLanguage(DEFAULT_LANGUAGE);
        // تعيين كلا النظامين إلى الافتراضي
        localStorage.setItem('app-locale', DEFAULT_LANGUAGE);
        localStorage.setItem('siteLanguage', DEFAULT_LANGUAGE);
        console.log(`✅ تم تهيئة اللغة الافتراضية: ${DEFAULT_LANGUAGE}`);
      }
      
      // تعيين خصائص المستند بناءً على اللغة
      document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLanguage;
      console.log(`✅ اتجاه المستند: ${document.documentElement.dir}`);
      console.log(`✅ لغة المستند: ${document.documentElement.lang}`);
    } catch (error) {
      console.error('❗ خطأ في تهيئة اللغة:', error);
      setCurrentLanguage(DEFAULT_LANGUAGE);
    }
  }, [currentLanguage]);

  // وظيفة الترجمة
  const t = (key: string): string => {
    try {
      // التحقق من وجود اللغة في الترجمات
      if (!translations[currentLanguage]) {
        console.warn(`اللغة ${currentLanguage} غير متوفرة في ملف الترجمات`);
        // إذا لم تكن اللغة متوفرة، استخدام اللغة الافتراضية
        return translations['ar'][key] || translations['en'][key] || key;
      }
      
      // الحصول على ترجمات اللغة الحالية
      const currentTranslations = translations[currentLanguage];
      
      // البحث عن المفتاح في الترجمات
      return currentTranslations[key] || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  // وظيفة تغيير اللغة
  const changeLanguage = (language: Language) => {
    if (!Object.keys(LANGUAGE_NAMES).includes(language)) {
      console.error('Unsupported language:', language);
      return;
    }
    
    try {
      console.log(`✅ تغيير اللغة بواسطة useSimpleTranslate إلى ${language}`);
      
      // تخزين اللغة الجديدة في كلا الموقعين
      localStorage.setItem('siteLanguage', language);
      localStorage.setItem('app-locale', language);
      
      // تغيير اتجاه المستند واللغة
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      console.log(`✅ اتجاه المستند: ${document.documentElement.dir}`);
      console.log(`✅ لغة المستند: ${document.documentElement.lang}`);
      
      // تحديث حالة اللغة
      setCurrentLanguage(language);
      
      // إطلاق حدث تغيير اللغة لجميع المكونات
      const event = new Event('languageChanged');
      window.dispatchEvent(event);
      console.log('✅ تم إطلاق حدث تغيير اللغة لجميع المكونات');
      
      // تطبيق التغييرات دون إعادة تحميل الصفحة
      console.log('✅ تم تغيير اللغة: ' + language);
      console.log('✅ تم تطبيق التغييرات في اللغة دون إعادة تحميل الصفحة');
    } catch (error) {
      console.error('❌ حدث خطأ في تغيير اللغة:', error);
    }
  };

  return (
    <TranslationContext.Provider value={{ t, currentLanguage, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

// هوك استخدام الترجمة
export function useSimpleTranslate() {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useSimpleTranslate must be used within a SimpleTranslationProvider');
  }
  
  return context;
}