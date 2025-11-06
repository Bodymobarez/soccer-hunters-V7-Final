import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useTranslation,
  localeNames,
  type Locale,
} from "@/hooks/use-translation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

// الأعلام للغات المدعومة
const flags: Record<Locale, string> = {
  ar: "🇸🇦", // السعودية
  en: "🇬🇧", // بريطانيا
  fr: "🇫🇷", // فرنسا
  es: "🇪🇸", // إسبانيا
  de: "🇩🇪", // ألمانيا
  pt: "🇵🇹", // البرتغال
  it: "🇮🇹", // إيطاليا
  la: "🇻🇦", // فاتيكان (أقرب علم للغة اللاتينية)
};

// قائمة اللغات المدعومة للعرض في الواجهة
const supportedLanguages: Locale[] = [
  "ar",
  "en",
  "fr",
  "es",
  "de",
  "pt",
  "it",
  "la",
];

// مكون قائمة اللغات المنسدلة
const LanguageDropdown = () => {
  // استخدام هوك الترجمة الرئيسي
  const { locale, setLocale } = useTranslation();

  // استخدام useState للتأكد من التحديث بعد التحميل
  const [currentLang, setCurrentLang] = useState<Locale>("ar");

  // الحصول على اللغة الحالية عند تحميل المكون
  useEffect(() => {
    const storedLanguage = localStorage.getItem("siteLanguage") as Locale;
    if (storedLanguage && Object.keys(localeNames).includes(storedLanguage)) {
      setCurrentLang(storedLanguage);
    } else if (locale) {
      setCurrentLang(locale);
    }
  }, [locale]);

  // وظيفة تغيير اللغة
  const changeLanguage = (language: Locale) => {
    console.log("🌐 تغيير اللغة إلى:", language);

    try {
      // تحديث حالة اللغة الحالية فورًا للاستجابة السريعة في واجهة المستخدم
      setCurrentLang(language);

      // حفظ اللغة في التخزين المحلي بطريقة متزامنة
      localStorage.setItem("siteLanguage", language);

      // تحديث اتجاه المستند ولغته مباشرة
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
      console.log(`✅ اتجاه المستند: ${document.documentElement.dir}`);
      console.log(`✅ لغة المستند: ${document.documentElement.lang}`);

      // تحديث المتغير العام للغة (إذا كان موجوداً)

      // تم تحديث حالة اللغة الحالية سابقًا

      // تحديث حالات اللغة في نظامي الترجمة
      // تحقق من عدم وجود خطأ طباعي واسم الدالة الصحيح

      if (setLocale) {
        setLocale(language);
      }

      // إطلاق حدث لإعلام جميع المكونات بتغيير اللغة
      const event = new Event("languageChanged");
      window.dispatchEvent(event);
      console.log(`✅ تم تغيير اللغة إلى ${language} دون إعادة تحميل الصفحة`);
    } catch (error) {
      console.error("حدث خطأ أثناء تغيير اللغة:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-2 h-9 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Globe className="h-4 w-4" />
          <span>{flags[currentLang]}</span>
          <span className="font-medium">{localeNames[currentLang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className={`flex items-center gap-3 cursor-pointer ${currentLang === lang ? "bg-accent font-bold" : ""}`}
            onClick={() => changeLanguage(lang)}
          >
            <span className="text-lg">{flags[lang]}</span>
            <span>{localeNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
