import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageDropdown from "@/components/language-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, ChevronDown, Shield } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { useTranslation } from "@/hooks/use-translation";
import { Logo } from "./logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  // Close mobile menu when changing location
  const [location] = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // الاستماع لتغييرات اللغة لتحديث المكون
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    const handleLanguageChanged = () => {
      // تحديث عرض شريط التنقل عند تغيير اللغة
      setForceUpdate((prev) => prev + 1);
      console.log(`✅ مكون Navbar: تم تحديث اللغة`);
    };

    // إضافة مستمع الحدث
    window.addEventListener("languageChanged", handleLanguageChanged);

    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChanged);
    };
  }, []);

  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user) return "/";

    switch (user.role) {
      case "talent":
        return "/talent-dashboard";
      case "coach":
        return "/coach-dashboard";
      case "club":
        return "/club-dashboard";
      case "agent":
        return "/agent-dashboard";
      case "doctor":
        return "/doctor-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  // Get dashboard label based on user role
  const getDashboardLabel = () => {
    if (!user) return "";

    const role = user.role as string;
    return t(role + "Dashboard");
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur shadow-lg border-primary/20">
      <div className="container flex h-18 items-center justify-between py-2">
        {/* Logo with Soccer Theme */}
        <Link href="/" className="flex items-center group">
          <Logo
            withText
            size="md"
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/home"
            className="px-4 py-2 text-sm font-medium hover:text-primary"
          >
            {t("home")}
          </Link>

          {/* Categories Navigation - Dropdown Menus */}
          <div className="flex items-center gap-2">
            {/* Players Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-full hover:shadow-md transition-all duration-300 flex items-center gap-1 border border-primary/20"
                >
                  {t("players")} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/striker" className="w-full">
                    {t("strikers")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/attacking-midfielder" className="w-full">
                    {t("attackingMid")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/defensive-midfielder" className="w-full">
                    {t("defensiveMidfielders")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/left-wing" className="w-full">
                    {t("leftWing")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/right-wing" className="w-full">
                    {t("rightWing")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/left-back" className="w-full">
                    {t("leftBacks")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/right-back" className="w-full">
                    {t("rightBacks")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/center-back" className="w-full">
                    {t("centerBacks")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/goalkeeper" className="w-full">
                    {t("goalkeepers")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/all-players" className="w-full">
                    {t("allPlayers")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Coaches Dropdown with Nested Categories */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 rounded-full hover:shadow-md transition-all duration-300 flex items-center gap-1 border border-secondary/20"
                >
                  {t("coaches")} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/technical-director" className="w-full">
                    {t("technicalDirector")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/head-coach" className="w-full">
                    {t("headCoach")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/assistant-coach" className="w-full">
                    {t("assistantCoach")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/goalkeeping-coach" className="w-full">
                    {t("goalkeepingCoaches")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/fitness" className="w-full">
                    {t("fitnessCoaches")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {t("supportStaff")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/category/assistant" className="w-full">
                          {t("assistant")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/category/analyst" className="w-full">
                          {t("analyst")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/category/physiotherapist"
                          className="w-full"
                        >
                          {t("physiotherapist")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/category/nutritionist" className="w-full">
                          {t("nutritionist")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/category/team-manager" className="w-full">
                          {t("teamManager")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/category/kit-manager" className="w-full">
                          {t("kitManager")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/category/scouting-team" className="w-full">
                          {t("scoutingTeam")}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem asChild>
                  <Link href="/category/all-coaches" className="w-full">
                    {t("allCoaches")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clubs Link */}
            <Link
              href="/clubs"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 rounded-full hover:shadow-md transition-all duration-300 border border-accent/20 kick-animation hover:goal-animation"
            >
              {t("clubs")}
            </Link>

            {/* Agents Link */}
            <Link
              href="/agents"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-full hover:shadow-md transition-all duration-300 border border-primary/20 kick-animation hover:goal-animation"
            >
              {t("agents")}
            </Link>

            {/* Doctors Link */}
            <Link
              href="/doctors"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 rounded-full hover:shadow-md transition-all duration-300 border border-secondary/20 kick-animation hover:goal-animation"
            >
              {t("doctors")}
            </Link>
          </div>

          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium hover:text-primary"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium hover:text-primary"
          >
            {t("contact")}
          </Link>

          {/* Accessibility Menu */}
          <AccessibilityMenu />

          {/* Language Switcher - Dropdown Menu */}
          <LanguageDropdown />

          {/* Authentication */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-sm text-muted-foreground">
                  {user.fullName || user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* User role dashboard link */}
                <DropdownMenuItem asChild>
                  <Link href={getDashboardRoute()}>
                    {user.role === "admin" ? (
                      <>
                        <Shield className="rtl:ml-2 ltr:mr-2 h-4 w-4 text-primary" />
                        <span>{t("adminDashboard")}</span>
                      </>
                    ) : (
                      t(user.role + "Dashboard")
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
                  <span>{t("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setLocation("/")} variant="default">
              {t("login")}
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Logo withText={false} size="sm" />
              <span className="sr-only">{t("openMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/home"
                className="px-4 py-2 text-sm font-medium hover:text-primary"
              >
                {t("home")}
              </Link>

              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium mb-2">{t("categories")}:</p>

                {/* Players Category - Accordion style for mobile */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1 text-primary">
                    {t("players")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/striker"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("striker")}
                    </Link>
                    <Link
                      href="/attacking-midfielder"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("attackingMid")}
                    </Link>
                    <Link
                      href="/defensive-midfielder"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("defensiveMidfielders")}
                    </Link>
                    <Link
                      href="/right-wing"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("rightWing")}
                    </Link>
                    <Link
                      href="/left-wing"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("leftWing")}
                    </Link>
                    <Link
                      href="/right-back"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("rightBacks")}
                    </Link>
                    <Link
                      href="/left-back"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("leftBacks")}
                    </Link>
                    <Link
                      href="/center-back"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("centerBacks")}
                    </Link>
                    <Link
                      href="/goalkeeper"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("goalkeeper")}
                    </Link>
                    <Link
                      href="/category/all-players"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("allPlayers")}
                    </Link>
                  </div>
                </div>

                {/* Coaches Category */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1 text-primary">
                    {t("coaches")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/technical-director"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("technicalDirector")}
                    </Link>
                    <Link
                      href="/head-coach"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("headCoach")}
                    </Link>
                    <Link
                      href="/assistant-coach"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("assistantCoach")}
                    </Link>
                    <Link
                      href="/goalkeeping-coach"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("goalkeepingCoaches")}
                    </Link>
                    <Link
                      href="/category/fitness"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("fitnessCoaches")}
                    </Link>
                  </div>
                </div>

                {/* Support Staff Category */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1 text-primary">
                    {t("supportStaff")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/category/assistant"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("assistant")}
                    </Link>
                    <Link
                      href="/category/analyst"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("analyst")}
                    </Link>
                    <Link
                      href="/category/physiotherapist"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("physiotherapist")}
                    </Link>
                    <Link
                      href="/category/nutritionist"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("nutritionist")}
                    </Link>
                    <Link
                      href="/category/team-manager"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("teamManager")}
                    </Link>
                    <Link
                      href="/category/kit-manager"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("kitManager")}
                    </Link>
                    <Link
                      href="/category/scouting-team"
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {t("scoutingTeam")}
                    </Link>
                  </div>
                </div>

                {/* Other Categories */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/clubs"
                    className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    {t("clubs")}
                  </Link>
                  <Link
                    href="/agents"
                    className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    {t("agents")}
                  </Link>
                  <Link
                    href="/doctors"
                    className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    {t("doctors")}
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium hover:text-primary"
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium hover:text-primary"
              >
                {t("contact")}
              </Link>

              {/* Accessibility and Language Options for Mobile */}
              <div className="px-4 py-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium mb-1">
                    {t("accessibilityAndLanguage")}:
                  </p>
                  <div className="flex items-center gap-2">
                    <AccessibilityMenu />
                    <LanguageDropdown />
                  </div>
                </div>
              </div>

              {isAuthenticated && user ? (
                <>
                  {/* User role dashboard link */}
                  <Link
                    href={getDashboardRoute()}
                    className="px-4 py-2 text-sm font-medium hover:text-primary flex items-center"
                  >
                    {user.role === "admin" ? (
                      <>
                        <Shield className="rtl:ml-2 ltr:mr-2 h-4 w-4 text-primary" />
                        <span>{t("adminDashboard")}</span>
                      </>
                    ) : (
                      getDashboardLabel()
                    )}
                  </Link>

                  {/* Logout button */}
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="mt-4"
                  >
                    <LogOut className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setLocation("/")}
                  variant="default"
                  className="mt-4"
                >
                  {t("login")}
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
