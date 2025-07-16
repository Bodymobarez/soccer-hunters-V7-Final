import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  translate, 
  getLanguage, 
  changeLanguage, 
  initLanguage, 
  type SupportedLanguage, 
  LANGUAGE_NAMES 
} from '@/lib/simple-i18n';

// مكون اختبار الترجمة البسيط
export default function SimpleTranslationTest() {
  // تهيئة اللغة عند تحميل المكون
  useEffect(() => {
    initLanguage();
    setCurrentLang(getLanguage());
  }, []);

  // حالة اللغة الحالية
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(getLanguage());

  // تغيير اللغة
  const handleLanguageChange = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{translate('welcomeMessage')}</CardTitle>
          <CardDescription>
            {translate('searchForTalent')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{translate('players')}</h3>
              <p>{translate('featuredPlayers')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{translate('coaches')}</h3>
              <p>{translate('featuredCoaches')}</p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md mt-4">
            <h3 className="font-semibold mb-2">{translate('latestNews')}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">{translate('settings')}</h3>
            <div className="space-y-2">
              {(['ar', 'en', 'fr'] as const).map((lang) => (
                <div 
                  key={lang}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                    currentLang === lang ? 'bg-primary/20' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  <div className={`w-4 h-4 rounded-full ${currentLang === lang ? 'bg-primary' : 'bg-muted-foreground'}`} />
                  <span>{LANGUAGE_NAMES[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="w-full flex justify-between border-t pt-4">
            <span>{translate('allRightsReserved')} © 2025</span>
            <span>{translate('termsOfService')}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}