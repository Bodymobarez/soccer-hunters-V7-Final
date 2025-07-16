import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDocumentDirection } from "@/hooks/use-document-direction";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";
import { Navbar } from "@/components/navbar";
import { ChatProvider } from "@/components/chat/chat-provider";
import ChatButton from "@/components/chat/chat-button";
import { TranslationProvider } from "@/hooks/use-translation";
import { SimpleTranslationProvider } from "@/hooks/use-simple-translate";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetails from "@/pages/service-details";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import AuthPage from "@/pages/auth-page";
import CategoryPage from "@/pages/category-page";
import ServicesPage from "@/pages/services-page";
import TestTranslation from "@/pages/test-translation";
import SimpleTranslationTest from "@/pages/simple-translation-test";
import FinalTranslationTest from "@/pages/final-translation-test";
import TalentDashboard from "@/pages/talent-dashboard";
import CoachDashboard from "@/pages/coach-dashboard";
import ClubDashboard from "@/pages/club-dashboard";
import AgentDashboard from "@/pages/agent-dashboard";
import DoctorDashboard from "@/pages/doctor-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import MeetingRoom from "@/pages/meeting-room";
import MeetingRecordings from "@/pages/meeting-recordings";
import UploadPage from "@/pages/upload-page";
import HealthCheck from "@/pages/health-check";

function Router() {
  return (
    <Switch>
      {/* صفحة تسجيل الدخول الوحيدة التي يمكن الوصول إليها بدون تسجيل دخول */}
      <Route path="/" component={AuthPage} />
      
      {/* كل المسارات الأخرى محمية وتتطلب تسجيل دخول */}
      <Route path="/home">
        {() => (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/service/:id">
        {() => (
          <ProtectedRoute>
            <ServiceDetails />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/contact">
        {() => (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/about">
        {() => (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/category/:categoryName">
        {() => (
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/services">
        {() => (
          <ProtectedRoute>
            <ServicesPage />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/test-translation">
        {() => (
          <ProtectedRoute>
            <TestTranslation />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/simple-translation">
        {() => (
          <ProtectedRoute>
            <SimpleTranslationTest />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/final-translation">
        {() => (
          <ProtectedRoute>
            <FinalTranslationTest />
          </ProtectedRoute>
        )}
      </Route>

      {/* مسارات محمية حسب الدور */}
      <Route path="/talent-dashboard">
        {() => (
          <ProtectedRoute roles={["talent"]}>
            <TalentDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/coach-dashboard">
        {() => (
          <ProtectedRoute roles={["coach"]}>
            <CoachDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/club-dashboard">
        {() => (
          <ProtectedRoute roles={["club"]}>
            <ClubDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/agent-dashboard">
        {() => (
          <ProtectedRoute roles={["agent"]}>
            <AgentDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/doctor-dashboard">
        {() => (
          <ProtectedRoute roles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* تحديث لوحة تحكم المدير بحيث تكون محمية أيضًا */}
      <Route path="/admin-dashboard">
        {() => (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* صفحة غرفة الاجتماع */}
      <Route path="/meeting-room/:sessionId">
        {() => (
          <ProtectedRoute>
            <MeetingRoom />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* صفحة مشاهدة تسجيلات الاجتماعات */}
      <Route path="/meeting-recordings/:sessionId">
        {() => (
          <ProtectedRoute>
            <MeetingRecordings />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* صفحة رفع الملفات - متاحة للجميع بدون تسجيل دخول */}
      <Route path="/upload">
        <UploadPage />
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// مكون لاستخدام هوك اتجاه المستند بعد تهيئة مزود الترجمة
function DocumentDirectionHandler() {
  // استخدام الهوك للحصول على الاتجاه الحالي واللغة
  const { dir, currentLanguage } = useDocumentDirection();
  
  // الاستماع لأحداث تغيير اللغة وتحديث الاتجاه تلقائيًا
  useEffect(() => {
    const handleLanguageChanged = () => {
      // التحقق من التخزين المحلي لقيمة اللغة الجديدة
      const appLocale = localStorage.getItem('app-locale');
      if (appLocale) {
        // تحديث اتجاه المستند
        const newDir = appLocale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = newDir;
        document.documentElement.lang = appLocale;
        console.log(`✅ DocumentDirectionHandler: تم تحديث اتجاه المستند إلى ${newDir}`);
      }
    };
    
    // تسجيل المستمع
    window.addEventListener('languageChanged', handleLanguageChanged);
    
    // إزالة المستمع عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChanged);
    };
  }, []);
  
  return null;
}

function App() {
  const [location] = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TranslationProvider>
          <SimpleTranslationProvider>
            <DocumentDirectionHandler />
            <ChatProvider>
              <TooltipProvider>
                {/* Skip to content link for keyboard users */}
                <a href="#main-content" className="skip-to-content">
                  تخطي إلى المحتوى الرئيسي
                </a>
                
                <Toaster />
                {/* عرض شريط التنقل فقط في حالة تسجيل الدخول */}
                {location !== "/" && <Navbar />}
                <main id="main-content" className="min-h-screen" tabIndex={-1}>
                  <Router />
                </main>
                {location !== "/" && <ChatButton />}
              </TooltipProvider>
            </ChatProvider>
          </SimpleTranslationProvider>
        </TranslationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
