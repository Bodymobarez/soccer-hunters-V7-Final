// نظام ترجمة مبسط للغاية
export type SupportedLanguage = 'ar' | 'en' | 'fr';

// اللغة الافتراضية
export const DEFAULT_LANGUAGE: SupportedLanguage = 'ar';

// أسماء اللغات المدعومة
export const LANGUAGE_NAMES = {
  ar: 'العربية',
  en: 'English',
  fr: 'Français'
};

// كائن الترجمات
export const translations = {
  ar: {
    // القائمة الرئيسية
    home: 'الرئيسية',
    about: 'عن المنصة',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    register: 'تسجيل جديد',
    
    // الفئات
    players: 'اللاعبين',
    coaches: 'المدربين',
    clubs: 'الأندية',
    agents: 'الوكلاء',
    doctors: 'الأطباء',
    
    // صفحة البداية
    welcomeMessage: 'مرحباً بك في منصة صقر هانتر',
    searchForTalent: 'ابحث عن المواهب الرياضية',
    featuredPlayers: 'أبرز اللاعبين',
    featuredCoaches: 'أبرز المدربين',
    latestNews: 'أحدث الأخبار',
    
    // صفحة تسجيل الدخول
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    createAccount: 'إنشاء حساب جديد',
    
    // لوحة التحكم
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    messages: 'الرسائل',
    
    // التذييل
    allRightsReserved: 'جميع الحقوق محفوظة',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
  },
  
  en: {
    // Main Menu
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    
    // Categories
    players: 'Players',
    coaches: 'Coaches',
    clubs: 'Clubs',
    agents: 'Agents',
    doctors: 'Doctors',
    
    // Home Page
    welcomeMessage: 'Welcome to Soccer Hunter',
    searchForTalent: 'Search for Sports Talents',
    featuredPlayers: 'Featured Players',
    featuredCoaches: 'Featured Coaches',
    latestNews: 'Latest News',
    
    // Login Page
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    createAccount: 'Create a new account',
    
    // Dashboard
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    messages: 'Messages',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  
  fr: {
    // Menu Principal
    home: 'Accueil',
    about: 'À Propos',
    contact: 'Contact',
    login: 'Connexion',
    logout: 'Déconnexion',
    register: 'Inscription',
    
    // Catégories
    players: 'Joueurs',
    coaches: 'Entraîneurs',
    clubs: 'Clubs',
    agents: 'Agents',
    doctors: 'Médecins',
    
    // Page d'Accueil
    welcomeMessage: 'Bienvenue sur Soccer Hunter',
    searchForTalent: 'Rechercher des Talents Sportifs',
    featuredPlayers: 'Joueurs en Vedette',
    featuredCoaches: 'Entraîneurs en Vedette',
    latestNews: 'Dernières Actualités',
    
    // Page de Connexion
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié?',
    createAccount: 'Créer un nouveau compte',
    
    // Tableau de Bord
    dashboard: 'Tableau de Bord',
    profile: 'Profil',
    settings: 'Paramètres',
    messages: 'Messages',
    
    // Pied de Page
    allRightsReserved: 'Tous droits réservés',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
  }
};

// متغير عام لتخزين اللغة الحالية
let currentLanguage: SupportedLanguage = DEFAULT_LANGUAGE;

// وظيفة لتحديد اللغة الحالية من التخزين المحلي
export function initLanguage(): void {
  try {
    // محاولة الحصول على اللغة المحفوظة من التخزين المحلي
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    
    // التحقق مما إذا كانت اللغة المحفوظة مدعومة
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en' || savedLanguage === 'fr')) {
      currentLanguage = savedLanguage;
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    } else {
      // إذا لم تكن اللغة المحفوظة مدعومة، استخدم اللغة الافتراضية
      localStorage.setItem('language', DEFAULT_LANGUAGE);
      document.documentElement.dir = DEFAULT_LANGUAGE === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = DEFAULT_LANGUAGE;
    }
  } catch (error) {
    console.error('Error initializing language:', error);
  }
}

// وظيفة للحصول على اللغة الحالية
export function getLanguage(): SupportedLanguage {
  return currentLanguage;
}

// وظيفة لتغيير اللغة
export function changeLanguage(language: SupportedLanguage): void {
  // التحقق مما إذا كانت اللغة مدعومة
  if (language !== 'ar' && language !== 'en' && language !== 'fr') {
    console.error('Unsupported language:', language);
    return;
  }
  
  // حفظ اللغة الجديدة
  currentLanguage = language;
  localStorage.setItem('language', language);
  
  // تحديث اتجاه المستند واللغة
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
  
  // إعادة تحميل الصفحة لتطبيق التغييرات
  window.location.reload();
}

// تعريف نوع لمفاتيح الترجمة
type TranslationObject = typeof translations.ar;
type TranslationKeys = keyof TranslationObject;

// وظيفة للحصول على ترجمة نص معين
export function translate(key: TranslationKeys | string): string {
  try {
    // الحصول على ترجمات اللغة الحالية
    const currentTranslations = translations[currentLanguage];
    
    // استخدام التحويل لتجنب خطأ TypeScript
    return (currentTranslations as Record<string, string>)[key] || key;
  } catch (error) {
    console.error('Translation error:', error);
    return key;
  }
}