import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useUnifiedTranslation,
  type Locale,
} from "@/hooks/use-unified-translation";
import UnifiedLanguageSwitcher, {
  CompactLanguageSwitcher,
  IconLanguageSwitcher,
} from "@/components/unified-language-switcher";
import { Globe, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function UnifiedTranslationTest() {
  const { t, locale, setLocale, dir, isRTL, localeNames, supportedLocales } =
    useUnifiedTranslation();
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  // Test keys to verify translations
  const testKeys = [
    "appName",
    "tagline",
    "home",
    "players",
    "coaches",
    "login",
    "search",
    "loading",
    "welcomeMessage",
    "changeLanguage",
    "darkMode",
    "lightMode",
    "statistics",
    "profile",
    "settings",
    "contact",
    "about",
    "save",
    "cancel",
    "success",
    "error",
  ];

  // Test all translation keys for current language
  const runTranslationTest = () => {
    const results: Record<string, boolean> = {};

    testKeys.forEach((key) => {
      const translation = t(key);
      // Test passes if translation exists and is not the same as the key
      results[key] = translation !== key && translation.length > 0;
    });

    setTestResults(results);
  };

  // Test parameter substitution
  const testParameterSubstitution = () => {
    // This would need to be implemented in the translation function
    const testTranslation = t("found", { count: 5, category: "players" });
    console.log("Parameter substitution test:", testTranslation);
  };

  // Test language switching
  const testLanguageSwitch = async (targetLocale: Locale) => {
    console.log(`Testing language switch to: ${targetLocale}`);
    setLocale(targetLocale);

    // Run tests after language change
    setTimeout(() => {
      runTranslationTest();
    }, 100);
  };

  const passedTests = Object.values(testResults).filter(Boolean).length;
  const totalTests = testKeys.length;
  const testPassPercentage =
    totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  return (
    <div className="container mx-auto p-6 space-y-6" dir={dir}>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Globe className="w-8 h-8" />
          {t("testTranslationSystem") || "Unified Translation System Test"}
        </h1>
        <p className="text-muted-foreground">
          {t("testTranslationDescription") ||
            "Test and verify the unified translation system functionality"}
        </p>
      </div>

      {/* Current Language Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t("currentLanguageStatus") || "Current Language Status"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-sm font-medium">
                {t("currentLanguage") || "Current Language"}:
              </span>
              <Badge variant="default" className="text-lg">
                {localeNames[locale]} ({locale.toUpperCase()})
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">
                {t("textDirection") || "Text Direction"}:
              </span>
              <Badge variant={isRTL ? "secondary" : "outline"}>
                {dir.toUpperCase()} {isRTL ? "(RTL)" : "(LTR)"}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">
                {t("supportedLanguages") || "Supported Languages"}:
              </span>
              <Badge variant="outline">
                {supportedLocales.length} {t("languages") || "languages"}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">
                {t("testResults") || "Test Results"}:
              </span>
              <Badge
                variant={testPassPercentage >= 80 ? "default" : "destructive"}
              >
                {passedTests}/{totalTests} ({testPassPercentage}%)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Switcher Components */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("languageSwitchers") || "Language Switcher Components"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">
                {t("defaultSwitcher") || "Default Switcher"}
              </h4>
              <UnifiedLanguageSwitcher />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">
                {t("compactSwitcher") || "Compact Switcher"}
              </h4>
              <CompactLanguageSwitcher />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">
                {t("iconOnlySwitcher") || "Icon Only Switcher"}
              </h4>
              <IconLanguageSwitcher />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {t("translationTests") || "Translation Tests"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={runTranslationTest}>
              {t("runTests") || "Run Translation Tests"}
            </Button>
            <Button variant="outline" onClick={testParameterSubstitution}>
              {t("testParameters") || "Test Parameters"}
            </Button>
          </div>

          {Object.keys(testResults).length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">
                {t("testResults") || "Test Results"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {testKeys.map((key) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-2 rounded border ${
                      testResults[key]
                        ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                        : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                    }`}
                  >
                    <span className="text-sm font-mono">{key}</span>
                    {testResults[key] ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language Switch Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t("languageSwitchTests") || "Language Switch Tests"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("languageSwitchDescription") ||
                "Test language switching functionality by clicking the buttons below"}
            </p>
            <div className="flex flex-wrap gap-2">
              {supportedLocales.map((testLocale) => (
                <Button
                  key={testLocale}
                  variant={locale === testLocale ? "default" : "outline"}
                  size="sm"
                  onClick={() => testLanguageSwitch(testLocale)}
                  disabled={locale === testLocale}
                >
                  {localeNames[testLocale]} ({testLocale.toUpperCase()})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Translations */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("sampleTranslations") || "Sample Translations"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testKeys.slice(0, 10).map((key) => (
                <div key={key} className="space-y-1">
                  <span className="text-xs text-muted-foreground font-mono">
                    {key}
                  </span>
                  <div className="p-2 bg-muted rounded text-sm">{t(key)}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("systemInformation") || "System Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t("documentDirection") || "Document Direction"}:</span>
              <span className="font-mono">{document.documentElement.dir}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("documentLanguage") || "Document Language"}:</span>
              <span className="font-mono">{document.documentElement.lang}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("localStorage") || "Local Storage (app-locale)"}:</span>
              <span className="font-mono">
                {localStorage.getItem("app-locale")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                {t("localStorage") || "Local Storage (siteLanguage)"}:
              </span>
              <span className="font-mono">
                {localStorage.getItem("siteLanguage")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-sm text-muted-foreground">
        <p>
          {t("translationSystemVersion") || "Unified Translation System v1.0"} |{" "}
          {t("currentLocale") || "Current"}: {locale} |{" "}
          {t("direction") || "Direction"}: {dir}
        </p>
      </div>
    </div>
  );
}
