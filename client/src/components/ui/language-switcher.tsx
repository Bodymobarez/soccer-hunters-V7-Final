import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import {
  useTranslation,
  locales,
  localeNames,
  type Locale,
} from "@/hooks/use-translation";

interface LanguageSwitcherProps {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "default" | "lg";
  onChange?: (locale: Locale) => void;
}

/**
 * Language switcher component
 * Displays current language and allows switching between available languages
 */
export function LanguageSwitcher({
  variant = "outline",
  size = "default",
  onChange,
}: LanguageSwitcherProps) {
  // Use the translation hook to get the current locale and setLocale function
  const { locale, setLocale } = useTranslation();

  // Handle language change
  const handleLanguageChange = (newLocale: Locale) => {
    // Skip if trying to set the same locale
    if (newLocale === locale) return;

    try {
      console.log(`🌐 Language switcher: changing to ${newLocale}`);

      // Call the setLocale function from the translation context
      // This will handle updating localStorage, document properties, and page reload
      setLocale(newLocale);

      // Execute the optional onChange callback if provided
      if (onChange) {
        onChange(newLocale);
      }
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-flex">{localeNames[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => handleLanguageChange(localeOption)}
            className={
              localeOption === locale ? "bg-primary/10 font-medium" : ""
            }
          >
            {localeNames[localeOption]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
