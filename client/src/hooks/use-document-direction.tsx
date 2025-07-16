import { useEffect } from "react";
import { useTranslation } from "./use-translation";

/**
 * هذا الهوك يتحكم في اتجاه المستند بناءً على اللغة المختارة
 * RTL للعربية واللغات الأخرى التي تكتب من اليمين إلى اليسار
 * LTR للغات التي تكتب من اليسار إلى اليمين
 */
export function useDocumentDirection() {
  const { locale: currentLanguage } = useTranslation();

  useEffect(() => {
    // تحديد اتجاه المستند بناءً على اللغة
    const direction = currentLanguage === "ar" ? "rtl" : "ltr";

    // تطبيق الاتجاه على عنصر html الرئيسي
    document.documentElement.dir = direction;

    // إضافة سمة البيانات للاتجاه على الجسم لاستخدامها في CSS
    document.body.dataset.direction = direction;

    // إضافة فئة rtl أو ltr إلى الجسم للتنسيقات المحددة
    if (direction === "rtl") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }

    console.log(`✅ تم تحديث اتجاه المستند إلى: ${direction}`);

    // تنظيف عند إلغاء التركيب
    return () => {
      document.body.classList.remove("rtl", "ltr");
      delete document.body.dataset.direction;
    };
  }, [currentLanguage]);

  // إرجاع الاتجاه الحالي لاستخدامه في المكونات
  const dir = currentLanguage === "ar" ? "rtl" : "ltr";
  return { dir, currentLanguage };
}
