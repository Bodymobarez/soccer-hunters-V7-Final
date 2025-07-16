import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";

export function Hero() {
  // استخدام حالة محلية للغة للتحديث الفوري
  const [forceUpdate, setForceUpdate] = useState(0);
  const { t, locale: currentLanguage } = useTranslation();

  // الاستماع لأحداث تغيير اللغة
  useEffect(() => {
    const handleLanguageChanged = () => {
      // تحديث المكون عند تغيير اللغة
      setForceUpdate((prev) => prev + 1);
      console.log(`✅ مكون Hero: تم تحديث اللغة إلى ${currentLanguage}`);
    };

    // إضافة مستمع الحدث
    window.addEventListener("languageChanged", handleLanguageChanged);

    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChanged);
    };
  }, [currentLanguage]);
  return (
    <section className="relative overflow-hidden pitch-gradient stadium-lights">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 lg:w-full lg:max-w-6xl">
          <main className="mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 flex flex-col lg:flex-row items-center">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-right rtl:text-right ltr:text-left">
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t("searchForTalent")}
                </span>
                <span className="block soccer-field-gradient bg-clip-text text-transparent mt-2">
                  {t("featuredPlayers")} & {t("featuredCoaches")}
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 rtl:text-right ltr:text-left">
                {t("welcomeMessage")}
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start rtl:lg:justify-end gap-4">
                <div className="soccer-field-gradient rounded-lg shadow-lg">
                  <Link href="/category/players">
                    <Button
                      size="lg"
                      className="w-full btn-primary kick-animation hover:goal-animation text-white font-semibold px-8 py-4"
                    >
                      ⚽ {t("viewAll")} {t("players")}
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0">
                  <Link href="/category/coaches">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full stadium-gradient text-white border-secondary hover:bg-secondary/90 font-semibold px-8 py-4 kick-animation hover:goal-animation"
                    >
                      🏆 {t("viewAll")} {t("coaches")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
              <img
                className="h-72 sm:h-80 md:h-96 rounded-lg shadow-lg object-cover"
                src="https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt={t("footballPlayer")}
              />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default Hero;
