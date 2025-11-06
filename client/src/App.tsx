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
import { TranslationProvider, useTranslation } from "@/hooks/use-translation";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetails from "@/pages/service-details";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import AuthPage from "@/pages/auth-page";
import CategoryPage from "@/pages/category-page";
import ServicesPage from "@/pages/services-page";
import TestTranslation from "@/pages/test-translation";
import TalentDashboard from "@/pages/talent-dashboard";
import CoachDashboard from "@/pages/coach-dashboard";
import ClubDashboard from "@/pages/club-dashboard";
import AgentDashboard from "@/pages/agent-dashboard";
import DoctorDashboard from "@/pages/doctor-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import SetupProfile from "@/pages/setup-profile";
import DoctorsPage from "@/pages/doctors-page";
import ClubsPage from "@/pages/clubs-page";
import AgentsPage from "@/pages/agents-page";
import TechnicalDirectorPage from "@/pages/technical-director-page";
import HeadCoachPage from "@/pages/head-coach-page";
import AssistantCoachPage from "@/pages/assistant-coach-page";
import GoalkeepingCoachPage from "@/pages/goalkeeping-coach-page";
import GoalkeeperPage from "@/pages/goalkeeper-page";
import StrikerPage from "@/pages/striker-page";
import LeftWingPage from "@/pages/left-wing-page";
import RightWingPage from "@/pages/right-wing-page";
import AttackingMidfielderPage from "@/pages/attacking-midfielder-page";
import LeftBackPage from "@/pages/left-back-page";
import RightBackPage from "@/pages/right-back-page";
import CenterBackPage from "@/pages/center-back-page";
import DefensiveMidfielderPage from "@/pages/defensive-midfielder-page";
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

      <Route path="/doctors">
        {() => (
          <ProtectedRoute>
            <DoctorsPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/clubs">
        {() => (
          <ProtectedRoute>
            <ClubsPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/agents">
        {() => (
          <ProtectedRoute>
            <AgentsPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/technical-director">
        {() => (
          <ProtectedRoute>
            <TechnicalDirectorPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/head-coach">
        {() => (
          <ProtectedRoute>
            <HeadCoachPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/assistant-coach">
        {() => (
          <ProtectedRoute>
            <AssistantCoachPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/goalkeeping-coach">
        {() => (
          <ProtectedRoute>
            <GoalkeepingCoachPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/goalkeeper">
        {() => (
          <ProtectedRoute>
            <GoalkeeperPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/striker">
        {() => (
          <ProtectedRoute>
            <StrikerPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/left-wing">
        {() => (
          <ProtectedRoute>
            <LeftWingPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/right-wing">
        {() => (
          <ProtectedRoute>
            <RightWingPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/attacking-midfielder">
        {() => (
          <ProtectedRoute>
            <AttackingMidfielderPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/left-back">
        {() => (
          <ProtectedRoute>
            <LeftBackPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/right-back">
        {() => (
          <ProtectedRoute>
            <RightBackPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/center-back">
        {() => (
          <ProtectedRoute>
            <CenterBackPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/defensive-midfielder">
        {() => (
          <ProtectedRoute>
            <DefensiveMidfielderPage />
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


      {/* صفحة إعداد الملف الشخصي للاعبين والمدربين */}
      <Route path="/setup-profile">
        {() => (
          <ProtectedRoute roles={["talent", "coach"]}>
            <SetupProfile />
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

      {/* صفحة فحص حالة النظام - متاحة للجمةع */}
      <Route path="/health-check">
        <HealthCheck />
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
      const siteLanguage = localStorage.getItem("siteLanguage");
      if (siteLanguage) {
        // تحديث اتجاه المستند
        const newDir = siteLanguage === "ar" ? "rtl" : "ltr";
        document.documentElement.dir = newDir;
        document.documentElement.lang = siteLanguage;
        console.log(
          `✅ DocumentDirectionHandler: تم تحديث اتجاه المستند إلى ${newDir}`,
        );
      }
    };

    // تسجيل المستمع
    window.addEventListener("languageChanged", handleLanguageChanged);

    // إزالة المستمع ةند إلغاء تحميل المكون
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChanged);
    };
  }, []);

  return null;
}

function SkipToContentLink() {
  const { t } = useTranslation();
  return (
    <a href="#main-content" className="skip-to-content">
      {t("skipToContent")}
    </a>
  );
}

function App() {
  const [location] = useLocation();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TranslationProvider>
            <DocumentDirectionHandler />
            <ChatProvider>
              <TooltipProvider>
                {/* Skip to content link for keyboard users */}
                <SkipToContentLink />

                <Toaster />
                {/* عرض شريط التنقل فقط في حالة تسجيل الدخول وليس في صفحة الإعداد */}
                {location !== "/" && location !== "/setup-profile" && <Navbar />}
                <main id="main-content" className="min-h-screen" tabIndex={-1}>
                  <Router />
                </main>
                {location !== "/" && location !== "/setup-profile" && <ChatButton />}
              </TooltipProvider>
            </ChatProvider>
          </TranslationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
