import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

/**
 * Component that protects routes requiring authentication
 * @param children - The components to render if user is authenticated
 * @param roles - Optional array of roles allowed to access this route
 */
export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // استخدم متغير لتتبع إذا كانت عملية التحقق من المصادقة قد اكتملت
  const hasCheckedAuth = !isLoading;
  
  // قم بتوجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مصادقًا
  useEffect(() => {
    if (hasCheckedAuth && (!isAuthenticated || !user)) {
      console.log("Redirecting to auth page - Not authenticated");
      setLocation("/");
    }
  }, [hasCheckedAuth, isAuthenticated, user, setLocation]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render anything during redirect
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check role-based access if roles are specified
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-destructive">غير مصرح بالوصول</h1>
        <p className="mb-6 text-muted-foreground">
          ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.
        </p>
        <button 
          onClick={() => setLocation("/")} 
          className="text-primary hover:underline"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
}