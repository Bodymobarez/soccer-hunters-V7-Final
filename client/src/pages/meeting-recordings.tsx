import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function MeetingRecordings() {
  const { t } = useTranslation();
  const { sessionId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  // جلب بيانات الجلسة المسجلة
  // ملاحظة: هنا نموذج لاستخدام البيانات من نماذج للعرض أثناء التطوير
  // في التطبيق الفعلي سنستخدم البيانات من API
  const mockSessions = {
    "meeting-session-1": {
      title: "مقابلة مع لاعب",
      createdAt: new Date(2025, 4, 5).toISOString(),
      recordingUrl: null,
    },
    "meeting-session-2": {
      title: "اجتماع فريق المدربين",
      createdAt: new Date(2025, 4, 6).toISOString(),
      recordingUrl: null,
    },
    "meeting-session-3": {
      title: "فحص طبي عن بعد",
      createdAt: new Date(2025, 4, 2).toISOString(),
      recordingUrl: "/api/demo-videos/meeting-recording.mp4",
    },
  };

  // نستخدم البيانات المزودة مسبقًا للعرض
  const { data: apiSessionData, isLoading: isApiLoading } = useQuery({
    queryKey: [`/api/video-sessions/${sessionId}`],
    enabled: !!sessionId,
  });

  const sessionData =
    sessionId && mockSessions[sessionId]
      ? mockSessions[sessionId]
      : apiSessionData;
  const isLoading = isApiLoading;

  // التحكم في تشغيل الفيديو
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // تحميل الفيديو
  const downloadRecording = () => {
    if (sessionData?.recordingUrl) {
      window.open(sessionData.recordingUrl, "_blank");
    } else {
      toast({
        title: "خطأ في التحميل",
        description: "رابط التسجيل غير متوفر",
        variant: "destructive",
      });
    }
  };

  // عودة إلى لوحة التحكم
  // استخدام دالة التنقل بشكل مباشر

  const goBack = () => {
    // نتنقل إلى لوحة التحكم مباشرة
    window.location.href = "/admin-dashboard";
  };

  // تهيئة مشغل الفيديو عند تحميل البيانات
  useEffect(() => {
    if (sessionData?.recordingUrl && videoRef.current) {
      videoRef.current.src = sessionData.recordingUrl;
    }
  }, [sessionData]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-4">
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-[70vh] w-full rounded-lg" />
        <div className="mt-4 flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">الجلسة غير موجودة</h1>
        <p className="mb-6 text-gray-500">لم يتم العثور على الجلسة المطلوبة</p>
        <Button onClick={goBack}>
          <ArrowLeft className="ml-2 h-4 w-4" />
          العودة
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" onClick={goBack} className="mb-4">
        <ArrowLeft className="ml-2 h-4 w-4" />
        العودة
      </Button>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{sessionData.title || "تسجيل اجتماع"}</CardTitle>
          <CardDescription>
            تاريخ التسجيل:{" "}
            {new Date(sessionData.createdAt || Date.now()).toLocaleDateString(
              "ar-EG",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessionData.recordingUrl ? (
            <div className="flex justify-center">
              <video
                ref={videoRef}
                className="aspect-video w-full max-w-4xl rounded-md"
                controls
                poster="/api/thumbnails/video-poster.jpg"
              >
                <source src={sessionData.recordingUrl} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
              <p className="text-center text-gray-500">التسجيل غير متوفر</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={togglePlay}
            disabled={!sessionData.recordingUrl}
          >
            <Play className="ml-2 h-4 w-4" />
            {isPlaying ? "إيقاف" : "تشغيل"}
          </Button>
          <Button
            onClick={downloadRecording}
            disabled={!sessionData.recordingUrl}
          >
            <Download className="ml-2 h-4 w-4" />
            تحميل التسجيل
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
