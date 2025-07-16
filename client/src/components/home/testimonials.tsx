import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import translations from "@/lib/translations";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  clubOrOrganization?: string;
  avatarUrl: string;
  rating: number;
  content: string;
}

export function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

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

  // Render star rating based on number
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center text-yellow-400 mb-2">
        {[...Array(5)].map((_, i) => {
          if (i < Math.floor(rating)) {
            return <Star key={i} className="h-4 w-4 fill-current" />;
          } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            return <StarHalf key={i} className="h-4 w-4 fill-current" />;
          } else {
            return <Star key={i} className="h-4 w-4 text-gray-300" />;
          }
        })}
      </div>
    );
  };

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-serif sm:text-4xl">
            {translate('testimonialTitle')}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
            {translate('testimonialSubtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            testimonials.map(testimonial => (
              <Card key={testimonial.id} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role && <span>{translate('testimonialRole')}: {testimonial.role}</span>}
                        {testimonial.clubOrOrganization && (
                          <span className="block">
                            {translate('testimonialClub')}: {testimonial.clubOrOrganization}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-600 text-sm italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
