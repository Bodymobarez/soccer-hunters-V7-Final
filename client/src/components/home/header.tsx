import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Shirt } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { name: "الرئيسية", href: "/" },
    { name: "اللاعبين", href: "/category/1" },
    { name: "المدربين", href: "/category/2" },
    { name: "الأندية", href: "/clubs" },
    { name: "الوكلاء", href: "/agents" },
    { name: "الأطباء", href: "/doctors" },
    { name: "الأخبار", href: "/news" },
    { name: "اتصل بنا", href: "/contact" }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="text-primary text-2xl sm:text-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-7 sm:h-7">
                {/* Football player figure */}
                <circle cx="9" cy="7" r="3" /> {/* Head */}
                <line x1="9" y1="10" x2="9" y2="15" /> {/* Body */}
                <line x1="9" y1="12" x2="6" y2="15" /> {/* Left leg */}
                <line x1="9" y1="12" x2="12" y2="15" /> {/* Right leg */}
                <line x1="9" y1="11" x2="5" y2="9" /> {/* Left arm */}
                <line x1="9" y1="11" x2="11" y2="8" /> {/* Right arm with ball */}
                <circle cx="11" cy="8" r="1" /> {/* Football */}
                
                {/* Hunter figure */}
                <circle cx="16" cy="9" r="2.5" /> {/* Head */}
                <line x1="16" y1="11.5" x2="16" y2="17" /> {/* Body */}
                <line x1="16" y1="13" x2="13" y2="12" /> {/* Left arm as net */}
                <path d="M13,12 C12,13 12,15 13,16" /> {/* Net curve */}
                <line x1="16" y1="13" x2="19" y2="14" /> {/* Right arm */}
                <line x1="16" y1="17" x2="14" y2="20" /> {/* Left leg */}
                <line x1="16" y1="17" x2="18" y2="20" /> {/* Right leg */}
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl text-gray-900">Soccer Hunter</span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:block">وجهتك الأولى للمواهب الرياضية</span>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`px-3 py-2 text-sm font-medium ${
                  (location === item.href || (item.href !== "/" && location.startsWith(item.href))) 
                    ? "text-primary" 
                    : "text-gray-900 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center">
            <Button className="hidden md:inline-flex text-sm px-4 py-2">
              تسجيل الدخول
            </Button>
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden ml-2 h-10 w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header with logo */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="text-primary text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="7" r="3" />
                          <line x1="9" y1="10" x2="9" y2="15" />
                          <line x1="9" y1="12" x2="6" y2="15" />
                          <line x1="9" y1="12" x2="12" y2="15" />
                          <line x1="9" y1="11" x2="5" y2="9" />
                          <line x1="9" y1="11" x2="11" y2="8" />
                          <circle cx="11" cy="8" r="1" />
                          <circle cx="16" cy="9" r="2.5" />
                          <line x1="16" y1="11.5" x2="16" y2="17" />
                          <line x1="16" y1="13" x2="13" y2="12" />
                          <path d="M13,12 C12,13 12,15 13,16" />
                          <line x1="16" y1="13" x2="19" y2="14" />
                          <line x1="16" y1="17" x2="14" y2="20" />
                          <line x1="16" y1="17" x2="18" y2="20" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg text-gray-900">Soccer Hunter</span>
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {navItems.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
                          (location === item.href || (item.href !== "/" && location.startsWith(item.href))) 
                            ? "bg-primary text-white shadow-lg" 
                            : "bg-gray-50 text-gray-900 hover:bg-primary hover:text-white active:scale-95"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Login button */}
                  <div className="p-4 border-t border-gray-200">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-lg">
                      تسجيل الدخول
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
