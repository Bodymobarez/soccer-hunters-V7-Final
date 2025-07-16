import { Facebook, Twitter, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="text-white text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="12 6 8 12 12 18 16 12 12 6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-white">{t('appName')}</span>
                <span className="text-xs text-gray-400">{t('tagline')}</span>
              </div>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t('services')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/category/1" className="text-base text-gray-400 hover:text-white">{t('players')}</Link></li>
              <li><Link href="/category/2" className="text-base text-gray-400 hover:text-white">{t('coaches')}</Link></li>
              <li><Link href="/clubs" className="text-base text-gray-400 hover:text-white">{t('clubs')}</Link></li>
              <li><Link href="/agents" className="text-base text-gray-400 hover:text-white">{t('agents')}</Link></li>
              <li><Link href="/doctors" className="text-base text-gray-400 hover:text-white">{t('doctors')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t('company')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-base text-gray-400 hover:text-white">{t('footerAbout')}</Link></li>
              <li><Link href="/about" className="text-base text-gray-400 hover:text-white">{t('team')}</Link></li>
              <li><Link href="/news" className="text-base text-gray-400 hover:text-white">{t('latestNews')}</Link></li>
              <li><Link href="/stadiums" className="text-base text-gray-400 hover:text-white">{t('stadiums')}</Link></li>
              <li><Link href="/stats" className="text-base text-gray-400 hover:text-white">{t('stats')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t('support')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-base text-gray-400 hover:text-white">{t('contactUs')}</Link></li>
              <li><Link href="/faq" className="text-base text-gray-400 hover:text-white">{t('faqTitle')}</Link></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">{t('termsOfService')}</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">{t('cookiePolicy')}</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="mt-12 bg-gray-800" />
        
        {/* قسم تطبيقات الموبايل */}
        <div className="mt-8 flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              {t('downloadApp')}
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block transition-transform hover:scale-105"
              >
                <img 
                  src="/images/google-play-badge.png" 
                  alt="Get it on Google Play" 
                  className="h-[60px] w-[200px] object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png";
                  }}
                />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block transition-transform hover:scale-105"
              >
                <img 
                  src="/images/app-store-badge.png" 
                  alt="Download on the App Store" 
                  className="h-[60px] w-[200px] object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg";
                  }}
                />
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="mt-8 bg-gray-800" />
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; {currentYear} {t('appName')}. {t('allRightsReserved')}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              {t('privacyPolicy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              {t('termsOfService')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              {t('cookiePolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
