import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import translations from "@/lib/translations";

export function CTA() {
  // State to hold current language
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('siteLanguage') || 'ar');
  
  // Use effect to listen for storage changes
  useEffect(() => {
    // Initial language setup
    const storedLanguage = localStorage.getItem('siteLanguage') || 'ar';
    setCurrentLanguage(storedLanguage);
    
    // Set up storage event listener
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'siteLanguage' || event.key === 'app-locale') {
        const newLanguage = localStorage.getItem('siteLanguage') || 'ar';
        setCurrentLanguage(newLanguage);
      }
    };
    
    // Add storage event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Setup interval to check for language changes (necessary because local storage events 
    // don't trigger for changes in the same tab)
    const checkInterval = setInterval(() => {
      const currentStoredLang = localStorage.getItem('siteLanguage') || 'ar';
      if (currentStoredLang !== currentLanguage) {
        setCurrentLanguage(currentStoredLang);
      }
    }, 500); // Check every 500ms
    
    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
    };
  }, [currentLanguage]);
  
  // Get translations for the current language
  const currentTranslations = translations[currentLanguage] || translations['ar'];

  // Direct translation function
  const translate = (key: string) => {
    return currentTranslations[key] || key;
  };
  return (
    <section className="bg-primary-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white font-serif sm:text-4xl">
          {translate('transferSeasonOpen')}
        </h2>
        <p className="mt-3 max-w-md mx-auto text-lg text-primary-100 sm:text-xl md:mt-5 md:max-w-3xl">
          {translate('joinUs')}
        </p>
        <div className="mt-10 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <Link href="#services">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full md:w-auto md:px-10"
              >
                {translate('exploreOpportunities')}
              </Button>
            </Link>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full md:w-auto md:px-10 bg-primary-600 bg-opacity-60 hover:bg-opacity-70 text-white border-white"
              >
                {translate('registerAsProfessional')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
