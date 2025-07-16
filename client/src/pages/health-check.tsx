import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "@/hooks/use-translation";

/**
 * Simple health check page to verify the application is working
 */
export default function HealthCheck() {
  const { t } = useTranslation();
  const [apiStatus, setApiStatus] = useState<string>(t("checking"));
  const [frontendStatus] = useState<string>(t("workingSuccessfully"));

  useEffect(() => {
    // Test API connectivity
    const testAPI = async () => {
      try {
        const response = await apiRequest("GET", "/api/categories");

        // Check if API is not available (503 status)
        if (response.status === 503) {
          setApiStatus(t("demoModeNoAPI"));
          return;
        }

        if (response.ok) {
          setApiStatus(t("workingSuccessfully"));
        } else {
          setApiStatus(`${t("error")}: ${response.status} ❌`);
        }
      } catch (error) {
        // Handle network errors specifically
        if (error instanceof TypeError && error.message.includes("fetch")) {
          setApiStatus(t("demoModeNetworkError"));
        } else {
          setApiStatus(`${t("connectionError")}: ${error} ❌`);
        }
      }
    };

    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          فحص حالة النظام
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">الواجهة الأمامية:</span>
            <span>{frontendStatus}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">الخلفية (API):</span>
            <span>{apiStatus}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            إذا كانت جميع الخدمات تعمل بنجاح، فإن التطبيق جاهز للاستخدام
          </p>
        </div>
      </div>
    </div>
  );
}
