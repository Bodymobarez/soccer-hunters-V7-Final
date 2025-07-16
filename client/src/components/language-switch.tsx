import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LANGUAGE_NAMES, Language } from '@/hooks/use-simple-translate';

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
const supportedLanguages: Language[] = ['ar', 'en', 'fr', 'es', 'de', 'pt', 'it', 'la'];

// مكون مبسط لتبديل اللغة
const LanguageSwitch = () => {
  // استخدام useState للتأكد من التحديث بعد التحميل
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  
  // الحصول على اللغة الحالية عند تحميل المكون
  useEffect(() => {
    const storedLanguage = localStorage.getItem('siteLanguage') as Language;
    if (storedLanguage && Object.keys(LANGUAGE_NAMES).includes(storedLanguage)) {
      setCurrentLang(storedLanguage);
    }
  }, []);
  
  // وظيفة تغيير اللغة
  const changeLanguage = (language: Language) => {
    console.log('🌐 تغيير اللغة إلى:', language);
    
    // حفظ اللغة في التخزين المحلي
    localStorage.setItem('siteLanguage', language);
    
    // تغيير اتجاه الصفحة واللغة
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // تحديث المتغير العام للغة
    window.currentSiteLanguage = language;
    
    // تحديث حالة المكون
    setCurrentLang(language);
    
    // إضافة تأخير بسيط للتأكد من حفظ الإعدادات قبل إعادة التحميل
    setTimeout(() => {
      // إعادة تحميل الصفحة لتطبيق التغييرات
      window.location.reload();
    }, 100);
  };
  
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2">
      {supportedLanguages.map((lang) => (
        <Button
          key={lang}
          variant={currentLang === lang ? "default" : "outline"}
          size="sm"
          onClick={() => changeLanguage(lang)}
          className="flex items-center gap-1 px-1.5 py-0.5 h-8 text-xs"
          title={`تغيير اللغة إلى ${LANGUAGE_NAMES[lang]}`}
        >
          <span>{flags[lang]}</span>
          <span className="hidden md:inline">{LANGUAGE_NAMES[lang]}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitch;