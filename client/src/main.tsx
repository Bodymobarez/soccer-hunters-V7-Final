import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Node.js polyfills for browser compatibility with modules like simple-peer
if (typeof window !== 'undefined') {
  // Global object polyfill
  if (typeof window.global === 'undefined') {
    window.global = window;
  }
  
  // Process polyfill
  if (typeof window.process === 'undefined') {
    window.process = { env: {} } as any;
  }
  
  // Buffer polyfill (empty implementation, if needed by simple-peer)
  if (typeof window.Buffer === 'undefined') {
    window.Buffer = { isBuffer: () => false } as any;
  }
}

// نظام لغة بسيط وفعال
type SiteLanguage = 'ar' | 'en' | 'fr';

function initSiteLanguage(): SiteLanguage {
  const storedLanguage = localStorage.getItem('siteLanguage');
  
  // إذا كانت اللغة غير موجودة أو غير صالحة، نضبط اللغة العربية كلغة افتراضية
  if (!storedLanguage || !['ar', 'en', 'fr'].includes(storedLanguage)) {
    localStorage.setItem('siteLanguage', 'ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    return 'ar';
  } else {
    // تعيين اتجاه الصفحة واللغة
    const lang = storedLanguage as SiteLanguage;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    return lang;
  }
}

// تهيئة اللغة
const currentLanguage = initSiteLanguage();

// رسائل تصحيح
console.log("✅ تم تهيئة اللغة:", currentLanguage);
console.log("✅ اتجاه المستند:", document.documentElement.dir);
console.log("✅ لغة المستند:", document.documentElement.lang);

// تعريف متغير عام للغة الحالية ليتم استخدامه في جميع أنحاء التطبيق
window.currentSiteLanguage = currentLanguage;

createRoot(document.getElementById("root")!).render(<App />);
