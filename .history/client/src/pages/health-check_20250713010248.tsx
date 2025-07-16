import { useState, useEffect } from "react";

/**
 * Simple health check page to verify the application is working
 */
export default function HealthCheck() {
  const [apiStatus, setApiStatus] = useState<string>("جاري الفحص...");
  const [frontendStatus] = useState<string>("يعمل بنجاح ✅");

  useEffect(() => {
    // Test API connectivity
    const testAPI = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          setApiStatus("يعمل بنجاح ✅");
        } else {
          setApiStatus(`خطأ: ${response.status} ❌`);
        }
      } catch (error) {
        setApiStatus(`خطأ في الاتصال: ${error} ❌`);
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
