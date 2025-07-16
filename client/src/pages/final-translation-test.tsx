import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// نوع اللغة المدعومة
type Language = 'ar' | 'en' | 'fr';

// أسماء اللغات المدعومة
const languageNames = {
  ar: 'العربية',
  en: 'English',
  fr: 'Français'
};

// رموز الأعلام للغات
const flags = {
  ar: '🇸🇦',
  en: '🇬🇧',
  fr: '🇫🇷'
};

// ترجمات لاختبار الصفحة
const pageTranslations = {
  ar: {
    title: 'اختبار الترجمة',
    description: 'صفحة بسيطة لاختبار نظام الترجمة',
    welcome: 'مرحباً بك في صقر هانتر',
    paragraph: 'هذه الصفحة مصممة لاختبار نظام الترجمة البسيط. يمكنك تغيير اللغة باستخدام الأزرار أدناه.',
    categories: 'الفئات',
    players: 'اللاعبين',
    coaches: 'المدربين',
    clubs: 'الأندية',
    playerTypes: 'أنواع اللاعبين',
    goalkeepers: 'حراس المرمى',
    defenders: 'المدافعين',
    midfielders: 'لاعبي الوسط',
    forwards: 'المهاجمين',
    languageSection: 'تغيير اللغة',
    footer: 'جميع الحقوق محفوظة © 2025 صقر هانتر',
    tabProfile: 'الملف الشخصي',
    tabSettings: 'الإعدادات',
    tabMessages: 'الرسائل',
    testContent: 'هذا محتوى اختباري باللغة العربية',
    activeLanguage: 'اللغة النشطة: العربية'
  },
  en: {
    title: 'Translation Test',
    description: 'A simple page to test the translation system',
    welcome: 'Welcome to Soccer Hunter',
    paragraph: 'This page is designed to test the simple translation system. You can change the language using the buttons below.',
    categories: 'Categories',
    players: 'Players',
    coaches: 'Coaches',
    clubs: 'Clubs',
    playerTypes: 'Player Types',
    goalkeepers: 'Goalkeepers',
    defenders: 'Defenders',
    midfielders: 'Midfielders',
    forwards: 'Forwards',
    languageSection: 'Change Language',
    footer: 'All rights reserved © 2025 Soccer Hunter',
    tabProfile: 'Profile',
    tabSettings: 'Settings',
    tabMessages: 'Messages',
    testContent: 'This is test content in English',
    activeLanguage: 'Active language: English'
  },
  fr: {
    title: 'Test de Traduction',
    description: 'Une page simple pour tester le système de traduction',
    welcome: 'Bienvenue sur Soccer Hunter',
    paragraph: 'Cette page est conçue pour tester le système de traduction simple. Vous pouvez changer la langue en utilisant les boutons ci-dessous.',
    categories: 'Catégories',
    players: 'Joueurs',
    coaches: 'Entraîneurs',
    clubs: 'Clubs',
    playerTypes: 'Types de Joueurs',
    goalkeepers: 'Gardiens de but',
    defenders: 'Défenseurs',
    midfielders: 'Milieux de terrain',
    forwards: 'Attaquants',
    languageSection: 'Changer de Langue',
    footer: 'Tous droits réservés © 2025 Soccer Hunter',
    tabProfile: 'Profil',
    tabSettings: 'Paramètres',
    tabMessages: 'Messages',
    testContent: 'Ceci est un contenu de test en français',
    activeLanguage: 'Langue active: Français'
  }
};

export default function FinalTranslationTest() {
  // الحصول على اللغة المخزنة أو استخدام اللغة الافتراضية
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  
  // تهيئة اللغة عند تحميل المكون
  useEffect(() => {
    const storedLanguage = localStorage.getItem('siteLanguage') as Language;
    if (storedLanguage && ['ar', 'en', 'fr'].includes(storedLanguage)) {
      setCurrentLang(storedLanguage);
      document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = storedLanguage;
    } else {
      localStorage.setItem('siteLanguage', 'ar');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, []);
  
  // تغيير اللغة
  const changeLanguage = (lang: Language) => {
    localStorage.setItem('siteLanguage', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    setCurrentLang(lang);
    window.location.reload();
  };
  
  // الحصول على ترجمات اللغة الحالية
  const t = pageTranslations[currentLang];
  
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{t.welcome}</h2>
            <p>{t.paragraph}</p>
            <p className="mt-2 font-semibold">{t.activeLanguage}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3">{t.categories}</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.players}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.coaches}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.clubs}</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3">{t.playerTypes}</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.goalkeepers}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.defenders}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.midfielders}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  <span>{t.forwards}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile">{t.tabProfile}</TabsTrigger>
              <TabsTrigger value="settings">{t.tabSettings}</TabsTrigger>
              <TabsTrigger value="messages">{t.tabMessages}</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="p-4 border rounded-md mt-2">
              {t.testContent}
            </TabsContent>
            <TabsContent value="settings" className="p-4 border rounded-md mt-2">
              {t.testContent}
            </TabsContent>
            <TabsContent value="messages" className="p-4 border rounded-md mt-2">
              {t.testContent}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">{t.languageSection}</h3>
            <div className="flex flex-wrap gap-2">
              {(['ar', 'en', 'fr'] as const).map((lang) => (
                <Button
                  key={lang}
                  variant={currentLang === lang ? "default" : "outline"}
                  onClick={() => changeLanguage(lang)}
                  className="flex items-center gap-2"
                >
                  <span>{flags[lang]}</span>
                  <span>{languageNames[lang]}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">{t.footer}</p>
        </CardFooter>
      </Card>
    </div>
  );
}