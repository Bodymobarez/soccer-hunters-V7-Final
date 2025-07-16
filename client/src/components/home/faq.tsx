import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import translations from "@/lib/translations";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sortOrder?: number;
}

export function FAQ() {
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
  
  const { data: faqs = [], isLoading } = useQuery<FAQ[]>({
    queryKey: ['/api/faqs'],
  });

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-serif sm:text-4xl">
            {translate('faqTitle')}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
            {translate('faqSubtitle')}
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <Card key={index} className="mb-6">
                <CardContent className="p-0">
                  <div className="px-6 py-4 flex justify-between items-center">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id.toString()}
                  className="bg-white shadow rounded-lg overflow-hidden border-none"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="text-center mt-8">
            <p className="text-gray-600">
              {translate('faqNoAnswer')}{' '}
              <Link href="/contact" className="text-primary hover:text-primary-700 font-medium">
                {translate('contactSupport')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
