import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation, localeNames, type Locale } from '@/hooks/use-translation';

// الأعلام للغات المدعومة
const flags = {
  ar: '🇸🇦', // السعودية
  en: '🇬🇧', // بريطانيا
  fr: '🇫🇷', // فرنسا
  es: '🇪🇸', // إسبانيا
  de: '🇩🇪', // ألمانيا
  pt: '🇵🇹', // البرتغال
  it: '🇮🇹', // إيطاليا
  la: '🇻🇦'  // فاتيكان (أقرب علم للغة اللاتينية)
};

// قائمة اللغات المدعومة للعرض في الواجهة
const supportedLanguages: Locale[] = ['ar', 'en', 'fr', 'es', 'de', 'pt', 'it', 'la'];

// مكون مبسط لتبديل اللغة
const LanguageSwitch = () => {
  // استخدام هوك الترجمة الرئيسي
  const { locale, setLocale } = useTranslation();
  
  // وظيفة تغيير اللغة
  const changeLanguage = (language: Locale) => {
    console.log('🌐 تغيير اللغة إلى:', language);
    
    // استخدام دالة setLocale من هوك الترجمة
    if (setLocale) {
      setLocale(language);
    }
    
    // إطلاق حدث لإعلام جميع المكونات بتغيير اللغة
    const event = new Event("languageChanged");
    window.dispatchEvent(event);
    console.log(`✅ تم تغيير اللغة إلى ${language} دون إعادة تحميل الصفحة`);
  };
  
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2">
      {supportedLanguages.map((lang) => (
        <Button
          key={lang}
          variant={locale === lang ? "default" : "outline"}
          size="sm"
          onClick={() => changeLanguage(lang)}
          className="flex items-center gap-1 px-1.5 py-0.5 h-8 text-xs"
          title={`تغيير اللغة إلى ${localeNames[lang]}`}
        >
          <span>{flags[lang]}</span>
          <span className="hidden md:inline">{localeNames[lang]}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitch;