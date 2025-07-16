import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Globe, Check, Languages } from "lucide-react";
import {
  useUnifiedTranslation,
  type Locale,
} from "@/hooks/use-unified-translation";

// Flag emojis for supported languages
const flags: Record<Locale, string> = {
  ar: "🇸🇦", // Saudi Arabia
  en: "🇺🇸", // United States
  fr: "🇫🇷", // France
  es: "🇪🇸", // Spain
  de: "🇩🇪", // Germany
  pt: "🇵🇹", // Portugal
  it: "🇮🇹", // Italy
  la: "🇻🇦", // Vatican (closest to Latin)
};

// Language codes for native display
const nativeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  la: "Latina",
};

// Language popularity/priority for sorting
const languagePriority: Record<Locale, number> = {
  ar: 1, // Primary language
  en: 2, // Secondary
  fr: 3,
  es: 4,
  de: 5,
  pt: 6,
  it: 7,
  la: 8, // Latin last
};

interface UnifiedLanguageSwitcherProps {
  variant?: "default" | "compact" | "icon-only";
  showLabel?: boolean;
  className?: string;
}

export default function UnifiedLanguageSwitcher({
  variant = "default",
  showLabel = true,
  className = "",
}: UnifiedLanguageSwitcherProps) {
  const { t, locale, setLocale, supportedLocales, localeNames } =
    useUnifiedTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Sort languages by priority
  const sortedLocales = [...supportedLocales].sort(
    (a, b) => languagePriority[a] - languagePriority[b],
  );

  // Handle language change with loading state
  const handleLanguageChange = async (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsChanging(true);

    try {
      console.log(`🌐 Switching language: ${locale} → ${newLocale}`);

      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Change the locale
      setLocale(newLocale);

      console.log(`✅ Language switched to: ${newLocale}`);
    } catch (error) {
      console.error("❌ Error changing language:", error);
    } finally {
      setIsChanging(false);
      setIsOpen(false);
    }
  };

  // Render different variants
  const renderTrigger = () => {
    const baseClasses = `
      flex items-center gap-2 transition-all duration-200 
      hover:bg-accent hover:text-accent-foreground
      ${isChanging ? "opacity-50 cursor-wait" : ""}
    `;

    switch (variant) {
      case "icon-only":
        return (
          <Button
            variant="ghost"
            size="sm"
            className={`${baseClasses} h-9 w-9 p-0`}
            disabled={isChanging}
            title={t("changeLanguage")}
          >
            {isChanging ? (
              <Languages className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-lg">{flags[locale]}</span>
            )}
          </Button>
        );

      case "compact":
        return (
          <Button
            variant="ghost"
            size="sm"
            className={`${baseClasses} h-8 px-2`}
            disabled={isChanging}
          >
            <span className="text-sm">{flags[locale]}</span>
            {showLabel && (
              <span className="text-xs font-medium hidden sm:inline">
                {locale.toUpperCase()}
              </span>
            )}
          </Button>
        );

      default:
        return (
          <Button
            variant="ghost"
            size="sm"
            className={`${baseClasses} h-9 px-3 rounded-md`}
            disabled={isChanging}
          >
            {isChanging ? (
              <Languages className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Globe className="h-4 w-4" />
                <span className="text-lg">{flags[locale]}</span>
                {showLabel && (
                  <span className="font-medium">{nativeNames[locale]}</span>
                )}
              </>
            )}
          </Button>
        );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className={className}>
        {renderTrigger()}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {t("changeLanguage")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {sortedLocales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className={`
              flex items-center justify-between gap-3 cursor-pointer
              transition-all duration-200 py-2.5
              ${locale === lang ? "bg-accent font-medium" : ""}
              hover:bg-accent/80
            `}
            onClick={() => handleLanguageChange(lang)}
            disabled={isChanging}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{flags[lang]}</span>
              <div className="flex flex-col">
                <span className="text-sm">{nativeNames[lang]}</span>
                <span className="text-xs text-muted-foreground">
                  {localeNames[lang]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {lang === locale && <Check className="h-4 w-4 text-primary" />}
              {lang === "ar" && (
                <Badge variant="secondary" className="text-xs">
                  {t("defaultLanguage") || "Default"}
                </Badge>
              )}
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled
          className="text-xs text-muted-foreground justify-center py-1"
        >
          {supportedLocales.length}{" "}
          {t("supportedLanguages") || "languages supported"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export compact version for use in navigation bars
export function CompactLanguageSwitcher({ className }: { className?: string }) {
  return (
    <UnifiedLanguageSwitcher
      variant="compact"
      showLabel={false}
      className={className}
    />
  );
}

// Export icon-only version for minimal UI
export function IconLanguageSwitcher({ className }: { className?: string }) {
  return (
    <UnifiedLanguageSwitcher
      variant="icon-only"
      showLabel={false}
      className={className}
    />
  );
}
