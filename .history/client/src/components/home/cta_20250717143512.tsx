import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary-700 py-12 sm:py-16">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-serif">
          {t("transferSeasonOpen")}
        </h2>
        <p className="mt-2 sm:mt-3 max-w-full sm:max-w-lg md:max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-primary-100">
          {t("joinUs")}
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center gap-3">
          <div className="rounded-md shadow w-full sm:w-auto">
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
          <div className="rounded-md shadow w-full sm:w-auto">
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
