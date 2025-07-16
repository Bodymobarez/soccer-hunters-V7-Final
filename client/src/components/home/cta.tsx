import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white font-serif sm:text-4xl">
          {t("transferSeasonOpen")}
        </h2>
        <p className="mt-3 max-w-md mx-auto text-lg text-primary-100 sm:text-xl md:mt-5 md:max-w-3xl">
          {t("joinUs")}
        </p>
        <div className="mt-10 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <Link href="#services">
              <Button
                variant="secondary"
                size="lg"
                className="w-full md:w-auto md:px-10"
              >
                {t("exploreOpportunities")}
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
                {t("registerAsProfessional")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
