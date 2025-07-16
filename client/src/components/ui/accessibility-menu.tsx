import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accessibility,
  Eye,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  VolumeX,
  Volume2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "@/hooks/use-translation";

interface AccessibilitySettings {
  theme: "light" | "dark" | "system";
  highContrast: boolean;
  fontSize: number;
  voiceNavigation: boolean;
  reduceMotion: boolean;
}

const getInitialSettings = (): AccessibilitySettings => {
  // Load settings from localStorage if available, otherwise use defaults
  const savedSettings = localStorage.getItem("accessibility_settings");

  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error("Failed to parse accessibility settings:", e);
    }
  }

  // Default settings
  return {
    theme: "system",
    highContrast: false, // تباين عالي مغلق افتراضياً
    fontSize: 1, // normal
    voiceNavigation: false,
    reduceMotion: false,
  };
};

export function AccessibilityMenu() {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(getInitialSettings);
  const { t } = useTranslation();

  // Apply settings on initial load and whenever they change
  useEffect(() => {
    // Apply theme
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDarkMode =
      settings.theme === "dark" ||
      (settings.theme === "system" && systemPrefersDark);

    document.documentElement.classList.toggle("dark", isDarkMode);

    // Apply high contrast
    document.documentElement.classList.toggle(
      "high-contrast",
      settings.highContrast,
    );

    // Apply font size
    document.documentElement.style.fontSize = `${100 * settings.fontSize}%`;

    // Apply reduced motion
    document.documentElement.classList.toggle(
      "reduce-motion",
      settings.reduceMotion,
    );

    // Save settings to localStorage
    localStorage.setItem("accessibility_settings", JSON.stringify(settings));
  }, [settings]);

  // Listen for system theme changes
  useEffect(() => {
    if (settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [settings.theme]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Setup voice navigation if enabled
  useEffect(() => {
    if (!settings.voiceNavigation) {
      // Clean up any speech synthesis
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    // Add the hover handler to document to simplify the implementation
    // and avoid type errors with element-specific event listeners
    const handleDocumentMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      // Only handle interactive elements that are focusable
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT"
      ) {
        const text =
          target.textContent ||
          target.getAttribute("aria-label") ||
          target.getAttribute("placeholder") ||
          "Clickable element";

        if ("speechSynthesis" in window) {
          // Cancel any ongoing speech
          window.speechSynthesis.cancel();

          // Read the text
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = document.documentElement.lang || "ar";
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    // Add a single event listener to document
    document.addEventListener("mouseover", handleDocumentMouseOver);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mouseover", handleDocumentMouseOver);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [settings.voiceNavigation]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("accessibilitySettings")}
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>{t("accessibilitySettings")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Theme Options */}
        <div className="px-2 py-2">
          <h3 className="mb-2 text-sm font-medium">{t("displayMode")}</h3>
          <div className="flex gap-2">
            <Button
              variant={settings.theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSetting("theme", "light")}
              className="flex-1"
            >
              <Sun className="ml-2 h-4 w-4" />
              {t("lightMode")}
            </Button>
            <Button
              variant={settings.theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSetting("theme", "dark")}
              className="flex-1"
            >
              <Moon className="ml-2 h-4 w-4" />
              {t("darkMode")}
            </Button>
            <Button
              variant={settings.theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSetting("theme", "system")}
              className="flex-1"
            >
              {t("systemMode")}
            </Button>
          </div>
        </div>

        {/* High Contrast Toggle */}
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <Label htmlFor="high-contrast" className="text-sm cursor-pointer">
              {t("highContrast")}
            </Label>
          </div>
          <Switch
            id="high-contrast"
            checked={settings.highContrast}
            onCheckedChange={(checked) =>
              updateSetting("highContrast", checked)
            }
          />
        </div>

        {/* Font Size Slider */}
        <div className="px-2 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ZoomOut className="h-4 w-4" />
              <Label htmlFor="font-size" className="text-sm">
                {t("fontSize")}
              </Label>
            </div>
            <ZoomIn className="h-4 w-4" />
          </div>
          <Slider
            id="font-size"
            min={0.8}
            max={1.5}
            step={0.1}
            value={[settings.fontSize]}
            onValueChange={(value) => updateSetting("fontSize", value[0])}
          />
        </div>

        {/* Voice Navigation Toggle */}
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Label
              htmlFor="voice-navigation"
              className="text-sm cursor-pointer"
            >
              {t("voiceNavigation")}
            </Label>
          </div>
          <Switch
            id="voice-navigation"
            checked={settings.voiceNavigation}
            onCheckedChange={(checked) =>
              updateSetting("voiceNavigation", checked)
            }
          />
        </div>

        {/* Reduce Motion Toggle */}
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VolumeX className="h-4 w-4" />
            <Label htmlFor="reduce-motion" className="text-sm cursor-pointer">
              {t("reduceMotion")}
            </Label>
          </div>
          <Switch
            id="reduce-motion"
            checked={settings.reduceMotion}
            onCheckedChange={(checked) =>
              updateSetting("reduceMotion", checked)
            }
          />
        </div>

        {/* Reset Button */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer justify-center"
          onClick={() => setSettings(getInitialSettings())}
        >
          {t("resetSettings")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
