import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// بيانات الترجمة المبسطة
const translations = {
  ar: {
    title: 'صفحة اختبار الترجمة',
    description: 'هذه الصفحة لاختبار نظام تغيير اللغة',
    button: 'تغيير إلى الإنجليزية',
    welcome: 'مرحباً بك في موقع Soccer Hunter',
    paragraph: 'هذا النص باللغة العربية ويجب أن يتغير عند تبديل اللغة',
  },
  en: {
    title: 'Translation Test Page',
    description: 'This page is for testing the language switching system',
    button: 'Switch to Arabic',
    welcome: 'Welcome to Soccer Hunter',
    paragraph: 'This text is in English and should change when switching languages',
  }
};

export default function TestTranslation() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  
  // وظيفة تبديل اللغة بين العربية والإنجليزية
  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };
  
  // الحصول على النصوص المترجمة حسب اللغة المحددة
  const t = translations[lang];
  
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">{t.welcome}</h2>
          <p>{t.paragraph}</p>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${lang === 'ar' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>العربية</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${lang === 'en' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>English</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={toggleLanguage}>{t.button}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}