import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/lib/i18n";
import { localeNames } from "@/lib/i18n";

// Remove usage of 't' destructuring since 't' is not exported from i18n.ts
// Replace usage of 't' with direct calls to useTranslation hook
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Loader2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MonitorX,
  Users,
  Maximize,
  MessageSquare,
  Settings,
  PlayCircle,
} from "lucide-react";
import { useParams } from "wouter";
import { simplifiedWebRTC } from "@/lib/simplified-webrtc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MeetingRoom() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  // Remove the previous 't' assignment
  // Use useTranslation hook directly where needed
  const { toast } = useToast();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participantsList, setParticipantsList] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Check if this is a demo session
  const isDemoSession = sessionId?.startsWith("demo-");

  // استعلام API لجلب معلومات الجلسة
  const {
    data: sessionData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [`/api/video-sessions/${sessionId}/join`],
    queryFn: async () => {
      try {
        // If this is a demo session, return mock data immediately
        if (isDemoSession) {
          return {
            sessionId: sessionId,
            title: "اجتماع تجريبي",
            status: "active",
            userRole: "host",
            participants: ["مستخدم تجريبي"],
            isDemoMode: true,
          };
        }

        // لا نستمر إذا لم يكن هناك مستخدم مسجل دخوله
        if (!user) {
          throw new Error("يجب تسجيل الدخول للانضمام إلى المكالمة");
        }

        const res = await apiRequest(
          "POST",
          `/api/video-sessions/${sessionId}/join`,
        );
        return res.json();
      } catch (err) {
        console.error("Error joining meeting:", err);
        const errorMessage =
          err instanceof Error ? err.message : "فشل في الانضمام إلى المكالمة";

        // إذا كان الخطأ يتعلق بالمصادقة
        if (
          errorMessage.includes("401") ||
          errorMessage.includes("يجب تسجيل الدخول")
        ) {
          // توجيه المستخدم لصفحة تسجيل الدخول بعد فترة قصيرة
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
        throw new Error(errorMessage);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // إذا كان هناك خطأ، نعرض رسالة الخطأ للمستخدم
  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({
        title: "خطأ في الانضمام إلى الاجتماع",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  // متابعة انتهاء الجلسة
  const endSessionMutation = useMutation({
    mutationFn: async () => {
      // If this is a demo session, just return a success response
      if (isDemoSession) {
        return Promise.resolve({ ok: true });
      }
      return apiRequest("POST", `/api/video-sessions/${sessionId}/end`);
    },
    onSuccess: () => {
      toast({
        title: "تم إنهاء الجلسة",
        description: "تم إنهاء جلسة الفيديو بنجاح",
      });
      window.close();
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "فشل في إنهاء جلسة الفيديو",
        variant: "destructive",
      });
    },
  });

  // Initialize WebRTC call
  useEffect(() => {
    if (sessionData && sessionData.status === "active" && user) {
      const initializeCall = async () => {
        try {
          // Connect to WebSocket signaling server
          await simplifiedWebRTC.connect(sessionId, user.id);

          // Request user media (camera and microphone)
          const stream = await simplifiedWebRTC.startLocalStream(
            videoEnabled,
            audioEnabled,
          );

          // Display local video
          if (localVideoRef.current && stream) {
            localVideoRef.current.srcObject = stream;
          }

          // Handle incoming video streams
          simplifiedWebRTC.onTrack((userId, stream) => {
            console.log(`Received stream from user ${userId}`);
            // Display the remote video
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          });

          // Handle user disconnection
          simplifiedWebRTC.onUserDisconnect((userId) => {
            console.log(`User ${userId} disconnected`);
            // If the main video was from this user, clear it
            if (videoRef.current && videoRef.current.srcObject) {
              // Simple version - in a real app we would manage multiple streams
              videoRef.current.srcObject = null;
            }
          });

          toast({
            title: "تم الاتصال",
            description: "تم الاتصال بالمكالمة بنجاح",
          });
        } catch (error) {
          console.error("Failed to initialize call:", error);
          toast({
            title: "خطأ في الاتصال",
            description:
              error instanceof Error
                ? error.message
                : "فشل في الاتصال بالمكالمة",
            variant: "destructive",
          });
        }
      };

      initializeCall();

      // Clean up when component unmounts
      return () => {
        simplifiedWebRTC.closeAll();
      };
    }
  }, [sessionData, sessionId, user, videoEnabled, audioEnabled]);

  // تبديل حالة الفيديو
  const toggleVideo = () => {
    const newState = !videoEnabled;
    setVideoEnabled(newState);

    // تنفيذ منطق WebRTC لإيقاف/تشغيل الفيديو
    if (simplifiedWebRTC) {
      const success = simplifiedWebRTC.toggleVideo(newState);
      if (!success) {
        toast({
          title: "خطأ",
          description: "فشل في تغيير حالة الفيديو. يرجى إعادة الاتصال.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: newState ? "تم تشغيل الفيديو" : "تم إيقاف الفيديو",
    });
  };

  // تبديل حالة الصوت
  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);

    // تنفيذ منطق WebRTC لإيقاف/تشغيل الصوت
    if (simplifiedWebRTC) {
      const success = simplifiedWebRTC.toggleAudio(newState);
      if (!success) {
        toast({
          title: "خطأ",
          description: "فشل في تغيير حالة الصوت. يرجى إعادة الاتصال.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: newState ? "تم تشغيل الصوت" : "تم كتم الصوت",
    });
  };

  // تكبير الشاشة
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable full-screen mode: ${e.message}`,
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  // إنهاء المكالمة
  const endCall = () => {
    // إغلاق جميع اتصالات WebRTC
    simplifiedWebRTC.closeAll();

    // تحديث حالة الجلسة في الخادم
    endSessionMutation.mutate();
  };

  // في حالة حدوث خطأ أثناء الانضمام
  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">
              خطأ في الانضمام للاجتماع
            </CardTitle>
            <CardDescription>
              لم نتمكن من الانضمام إلى جلسة الفيديو. يرجى التحقق من الرابط أو
              المحاولة مرة أخرى لاحقاً.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => window.close()} className="w-full">
              إغلاق
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // في حالة تحميل بيانات الجلسة
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2">جاري الانضمام إلى الاجتماع...</p>
        </div>
      </div>
    );
  }

  // في حالة نجاح الانضمام وتحميل البيانات
  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      {/* شريط العنوان */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-4 py-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">
            {sessionData?.title || "اجتماع جديد"}
          </h1>
          <Badge
            variant="outline"
            className={`${sessionData?.status === "active" ? "bg-blue-900/20 text-blue-400" : "bg-yellow-900/20 text-yellow-400"}`}
          >
            {sessionData?.status === "active" ? "نشط" : "في انتظار البدء"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* منطقة الفيديو الرئيسية */}
      <div className="relative flex flex-1 flex-col">
        {sessionData?.status !== "active" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/80">
            <div className="max-w-md rounded-lg bg-gray-800 p-6 text-center">
              <h2 className="mb-2 text-xl font-bold">
                الاجتماع في انتظار البدء
              </h2>
              <p className="mb-4 text-gray-400">
                سيتم بدء الاجتماع قريباً. يمكنك الاستعداد وضبط إعدادات الصوت
                والفيديو الآن.
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="ml-2 h-4 w-4" />
                  إعدادات الصوت والفيديو
                </Button>
                {(sessionData?.userRole === "host" ||
                  user?.role === "admin") && (
                  <Button
                    onClick={async () => {
                      try {
                        // تحقق من حالة تسجيل الدخول أولاً
                        if (!user) {
                          toast({
                            title: "يجب تسجيل الدخول",
                            description: "يجب تسجيل الدخول لبدء جلسة فيديو",
                            variant: "destructive",
                          });
                          return;
                        }

                        try {
                          // If this is a demo session, just update the status
                          if (isDemoSession) {
                            queryClient.invalidateQueries({
                              queryKey: [
                                `/api/video-sessions/${sessionId}/join`,
                              ],
                            });
                            toast({
                              title: "تم بدء الاجتماع (وضع التجربة)",
                              description: "تم بدء الاجتماع في وضع التجربة",
                            });
                            return;
                          }

                          const res = await apiRequest(
                            "POST",
                            `/api/video-sessions/${sessionId}/start`,
                          );

                          queryClient.invalidateQueries({
                            queryKey: [`/api/video-sessions/${sessionId}/join`],
                          });
                          toast({
                            title: "تم بدء الاجتماع",
                            description: "تم بدء الاجتماع بنجاح",
                          });
                        } catch (err) {
                          // معالجة خطأ الاستجابة
                          const errorMessage =
                            err instanceof Error
                              ? err.message
                              : "فشل في بدء الاجتماع";
                          console.error(
                            "Error starting meeting:",
                            errorMessage,
                          );

                          // إذا كان خطأ 401 غير مصرح، اقترح على المستخدم تسجيل الدخول مرة أخرى
                          if (
                            errorMessage.includes("401") ||
                            errorMessage.includes("يجب تسجيل الدخول")
                          ) {
                            toast({
                              title: "جلسة منتهية",
                              description:
                                "انتهت جلسة تسجيل الدخول، يرجى تسجيل الدخول مرة أخرى",
                              variant: "destructive",
                            });
                            // توجيه المستخدم لصفحة تسجيل الدخول
                            window.location.href = "/";
                          } else {
                            toast({
                              title: "خطأ في بدء الاجتماع",
                              description: errorMessage,
                              variant: "destructive",
                            });
                          }
                        }
                      } catch (error) {
                        console.error("Error starting meeting:", error);
                        toast({
                          title: "خطأ في بدء الاجتماع",
                          description:
                            error instanceof Error
                              ? error.message
                              : "حدث خطأ أثناء محاولة بدء الاجتماع",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <Video className="ml-2 h-4 w-4" />
                    بدء الاجتماع
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-1 p-4 overflow-hidden">
          {/* عرض الفيديو الرئيسي */}
          <div className="relative flex-1 rounded-lg bg-gray-800 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`h-full w-full object-cover ${!videoEnabled ? "hidden" : ""}`}
            />

            {!videoEnabled && (
              <div className="flex h-full w-full items-center justify-center">
                <div className="rounded-full bg-gray-700 p-8">
                  <Users className="h-16 w-16 text-gray-500" />
                </div>
              </div>
            )}

            {/* عرض الفيديو المحلي (الخاص بالمستخدم) */}
            <div className="absolute bottom-4 right-4 h-36 w-48 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className={`h-full w-full object-cover ${!videoEnabled ? "hidden" : ""}`}
              />

              {!videoEnabled && (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="rounded-full bg-gray-700 p-4">
                    <Users className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
              )}
            </div>

            {/* زر تكبير الشاشة */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-gray-900/50 p-0 text-white hover:bg-gray-800"
              onClick={toggleFullScreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* شريط أدوات التحكم */}
        <div className="flex justify-center border-t border-gray-800 bg-gray-950 px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              className={`h-12 w-12 rounded-full p-0 ${audioEnabled ? "text-white" : "bg-red-500/10 text-red-500"}`}
              onClick={toggleAudio}
            >
              {audioEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className={`h-12 w-12 rounded-full p-0 ${videoEnabled ? "text-white" : "bg-red-500/10 text-red-500"}`}
              onClick={toggleVideo}
            >
              {videoEnabled ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              className="h-12 w-12 rounded-full p-0"
              onClick={endCall}
            >
              <Phone className="h-5 w-5 rotate-135 transform" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-12 rounded-full p-0 text-white"
              onClick={() =>
                toast({ title: "مشاركة الشاشة", description: "قريباً" })
              }
            >
              <MonitorX className="h-5 w-5" />
            </Button>

            {/* زر مشاهدة التسجيل */}
            {sessionData?.status === "completed" &&
              sessionData?.recordingUrl && (
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-12 w-12 rounded-full p-0 text-white"
                  onClick={() =>
                    (window.location.href = `/meeting-recordings/${sessionId}`)
                  }
                >
                  <PlayCircle className="h-5 w-5" />
                </Button>
              )}
          </div>
        </div>
      </div>

      {/* مربع حوار الإعدادات */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إعدادات الاتصال</DialogTitle>
            <DialogDescription>
              قم بضبط إعدادات الصوت والفيديو للحصول على أفضل تجربة اتصال.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="camera" className="text-right">
                الكاميرا
              </label>
              <select
                id="camera"
                className="col-span-3 rounded-md bg-gray-800 p-2"
              >
                <option>كاميرا الويب الافتراضية</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="microphone" className="text-right">
                الميكروفون
              </label>
              <select
                id="microphone"
                className="col-span-3 rounded-md bg-gray-800 p-2"
              >
                <option>الميكروفون الافتراضي</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="speaker" className="text-right">
                السماعة
              </label>
              <select
                id="speaker"
                className="col-span-3 rounded-md bg-gray-800 p-2"
              >
                <option>السماعة الافتراضية</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              إلغاء
            </Button>
            <Button
              onClick={() => {
                setIsSettingsOpen(false);
                toast({ title: "تم حفظ الإعدادات" });
              }}
            >
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
