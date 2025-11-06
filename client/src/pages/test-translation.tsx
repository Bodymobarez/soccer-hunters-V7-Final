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
import { useTranslation } from '@/hooks/use-translation';

export default function TestTranslation() {
  const { locale, setLocale, t } = useTranslation();
  
  // وظيفة تبديل اللغة بين العربية والإنجليزية
  const toggleLanguage = () => {
    const newLang = locale === 'ar' ? 'en' : 'ar';
    if (setLocale) {
      setLocale(newLang);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{t('appName')}</CardTitle>
          <CardDescription>{t('tagline')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">{t('welcomeMessage')}</h2>
          <p>{t('strikerDescription')}</p>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${locale === 'ar' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>{t('language')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${locale === 'en' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>{t('english')}</span>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>{t('home')}:</strong> {t('home')}</p>
            <p><strong>{t('players')}:</strong> {t('players')}</p>
            <p><strong>{t('coaches')}:</strong> {t('coaches')}</p>
            <p><strong>{t('clubs')}:</strong> {t('clubs')}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={toggleLanguage}>
            {locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}