import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import {
  Upload,
  Video,
  FileText,
  User,
  Trophy,
  Target,
  Award,
  Star,
  CheckCircle2,
  Loader2,
  Play,
  X,
  Plus,
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Simple Progress Component
const SimpleProgress = ({ value }: { value: number }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

// Player form schema
const playerSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  description: z.string().optional(),
  position: z.string().min(1, "المركز الأساسي مطلوب"),
  secondaryPosition: z.string().optional(),
  age: z.number().min(10).max(50).optional(),
  height: z.number().min(100).max(250).optional(),
  weight: z.number().min(30).max(150).optional(),
  foot: z.string().optional(),
  nationality: z.string().optional(),
  currentTeam: z.string().optional(),
  contractStatus: z.string().optional(),
});

// Coach form schema
const coachSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  description: z.string().optional(),
  specialization: z.string().min(1, "التخصص مطلوب"),
  experience: z.number().min(0).optional(),
  age: z.number().min(25).max(80).optional(),
  nationality: z.string().optional(),
  education: z.string().optional(),
  licenses: z.string().optional(),
  achievements: z.string().optional(),
  previousTeams: z.string().optional(),
  coachingStyle: z.string().optional(),
  tacticalApproach: z.string().optional(),
});

export default function SetupProfile() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Redirect if not logged in or not talent/coach
  useEffect(() => {
    if (!user) {
      setLocation("/");
      return;
    }
    if (user.role !== "talent" && user.role !== "coach") {
      setLocation("/home");
    }
  }, [user, setLocation]);

  const isPlayer = user?.role === "talent";
  const isCoach = user?.role === "coach";

  // Form setup
  const playerForm = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: user?.fullName || user?.username || "",
      description: "",
      position: "",
      secondaryPosition: "none",
      age: undefined,
      height: undefined,
      weight: undefined,
      foot: undefined,
      nationality: "",
      currentTeam: "",
      contractStatus: "",
    },
  });

  const coachForm = useForm<z.infer<typeof coachSchema>>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      name: user?.fullName || user?.username || "",
      description: "",
      specialization: "",
      experience: undefined,
      age: undefined,
      nationality: "",
      education: "",
      licenses: "",
      achievements: "",
      previousTeams: "",
      coachingStyle: "",
      tacticalApproach: "",
    },
  });

  const form = isPlayer ? playerForm : coachForm;

  // Handle video upload
  const handleVideoUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("description", `Video uploaded by ${user?.username}`);

      const response = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("فشل رفع الفيديو");
      }

      const result = await response.json();
      setUploadedVideos([...uploadedVideos, result]);
      toast({
        title: t("videoUploaded"),
        description: "تم رفع الفيديو بنجاح",
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "خطأ",
        description: "فشل رفع الفيديو",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Simulate video analysis
  const analyzeVideos = async () => {
    if (uploadedVideos.length === 0) {
      toast({
        title: "تحذير",
        description: "يرجى رفع فيديو واحد على الأقل",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis = {
        overallRating: Math.floor(Math.random() * 30) + 70, // 70-100
        skillLevel: ["مبتدئ", "متوسط", "متقدم", "محترف"][
          Math.floor(Math.random() * 4)
        ],
        strengths: [
          "السرعة",
          "الدقة في التمرير",
          "التحكم في الكرة",
          "اللياقة البدنية",
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        areasForImprovement: [
          "التحكم في الكرة",
          "التمرير",
          "اللياقة البدنية",
          "التركيز",
        ].slice(0, Math.floor(Math.random() * 3) + 2),
      };
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      toast({
        title: t("videoAnalysisComplete"),
        description: "تم تحليل الفيديوهات بنجاح",
      });
    }, 3000);
  };

  // Handle form submission
  const onSubmit = async (values: any) => {
    try {
      const endpoint = isPlayer ? "/api/talent" : "/api/coach";
      const response = await apiRequest("POST", endpoint, {
        ...values,
        userId: user?.id,
        skills: skills,
      });

      if (!response.ok) {
        throw new Error("فشل حفظ البيانات");
      }

      toast({
        title: "نجح",
        description: "تم حفظ الملف الشخصي بنجاح",
      });

      // Redirect to dashboard
      if (isPlayer) {
        setLocation("/talent-dashboard");
      } else {
        setLocation("/coach-dashboard");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "خطأ",
        description: "فشل حفظ البيانات",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const progress = ((activeStep - 1) / 2) * 100;

  if (!user || (user.role !== "talent" && user.role !== "coach")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {t("setupProfileTitle")}
            </h1>
            <p className="text-lg text-gray-600">{t("setupProfileDescription")}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                الخطوة {activeStep} من 3
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <SimpleProgress value={progress} />
          </div>

          {/* Step 1: Upload Videos */}
          {activeStep === 1 && (
            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("uploadVideos")}</CardTitle>
                    <CardDescription>{t("uploadVideosDescription")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVideoUpload(file);
                    }}
                    className="hidden"
                    id="video-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    {isUploading ? (
                      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    ) : (
                      <Upload className="w-12 h-12 text-gray-400" />
                    )}
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        {isUploading ? t("analyzingVideo") : t("selectVideo")}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        MP4, MOV, AVI (حد أقصى 500MB)
                      </p>
                    </div>
                  </label>
                </div>

                {/* Uploaded Videos */}
                {uploadedVideos.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">الفيديوهات المرفوعة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedVideos.map((video, index) => (
                        <div
                          key={index}
                          className="relative bg-gray-100 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Play className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {video.fileName || `فيديو ${index + 1}`}
                              </p>
                              <p className="text-sm text-gray-500">
                                {(video.fileSize / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setUploadedVideos(
                                  uploadedVideos.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analysis Button */}
                {uploadedVideos.length > 0 && !analysisResult && (
                  <Button
                    onClick={analyzeVideos}
                    disabled={isAnalyzing}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t("analyzingVideo")}
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5 mr-2" />
                        {t("videoAnalysis")}
                      </>
                    )}
                  </Button>
                )}

                {/* Analysis Results */}
                {analysisResult && (
                  <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        {t("videoAnalysisComplete")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {t("overallRating")}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold text-blue-600">
                              {analysisResult.overallRating}
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(analysisResult.overallRating / 20)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {t("skillLevel")}
                          </p>
                          <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                            {analysisResult.skillLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            {t("strengths")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.strengths.map((strength: string, i: number) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="bg-green-100 text-green-700"
                              >
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-orange-600" />
                            {t("areasForImprovement")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.areasForImprovement.map(
                              (area: string, i: number) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-orange-100 text-orange-700"
                                >
                                  {area}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={() => setActiveStep(2)}
                  disabled={uploadedVideos.length === 0}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold"
                >
                  {t("saveAndContinue")}
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Specialization Form */}
          {activeStep === 2 && (
            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("specializationForm")}</CardTitle>
                    <CardDescription>
                      {t("specializationFormDescription")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {isPlayer ? (
                      <>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("fullName")}</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نبذة تعريفية</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={4} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("primaryPosition")}</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder="اختر المركز" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="حارس مرمى">حارس مرمى</SelectItem>
                                    <SelectItem value="ظهير أيمن">ظهير أيمن</SelectItem>
                                    <SelectItem value="ظهير أيسر">ظهير أيسر</SelectItem>
                                    <SelectItem value="قلب دفاع">قلب دفاع</SelectItem>
                                    <SelectItem value="لاعب وسط دفاعي">
                                      لاعب وسط دفاعي
                                    </SelectItem>
                                    <SelectItem value="لاعب وسط">لاعب وسط</SelectItem>
                                    <SelectItem value="جناح أيمن">جناح أيمن</SelectItem>
                                    <SelectItem value="جناح أيسر">جناح أيسر</SelectItem>
                                    <SelectItem value="مهاجم">مهاجم</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="secondaryPosition"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("secondaryPosition")}</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder="اختر المركز" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="none">بدون</SelectItem>
                                    <SelectItem value="حارس مرمى">حارس مرمى</SelectItem>
                                    <SelectItem value="ظهير أيمن">ظهير أيمن</SelectItem>
                                    <SelectItem value="ظهير أيسر">ظهير أيسر</SelectItem>
                                    <SelectItem value="قلب دفاع">قلب دفاع</SelectItem>
                                    <SelectItem value="لاعب وسط دفاعي">
                                      لاعب وسط دفاعي
                                    </SelectItem>
                                    <SelectItem value="لاعب وسط">لاعب وسط</SelectItem>
                                    <SelectItem value="جناح أيمن">جناح أيمن</SelectItem>
                                    <SelectItem value="جناح أيسر">جناح أيسر</SelectItem>
                                    <SelectItem value="مهاجم">مهاجم</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("age")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value ? parseInt(e.target.value) : undefined
                                      )
                                    }
                                    className="h-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("height")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value ? parseInt(e.target.value) : undefined
                                      )
                                    }
                                    className="h-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("weight")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value ? parseInt(e.target.value) : undefined
                                      )
                                    }
                                    className="h-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="foot"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("preferredFoot")}</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder="اختر القدم" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="يمنى">اليمنى</SelectItem>
                                    <SelectItem value="يسرى">اليسرى</SelectItem>
                                    <SelectItem value="كلتاهما">كلتاهما</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="nationality"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("nationality")}</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="currentTeam"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("currentTeam")}</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Skills */}
                        <div>
                          <FormLabel>{t("skills")}</FormLabel>
                          <div className="flex gap-2 mt-2">
                            <Input
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addSkill();
                                }
                              }}
                              placeholder="أضف مهارة"
                              className="h-12"
                            />
                            <Button
                              type="button"
                              onClick={addSkill}
                              className="h-12"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm px-3 py-1"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="ml-2 hover:text-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("fullName")}</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نبذة تعريفية</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={4} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("specialization")}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || undefined}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="اختر التخصص" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="مدير فني">مدير فني</SelectItem>
                                  <SelectItem value="مدرب رئيسي">مدرب رئيسي</SelectItem>
                                  <SelectItem value="مدرب مساعد">مدرب مساعد</SelectItem>
                                  <SelectItem value="مدرب حراس المرمى">
                                    مدرب حراس المرمى
                                  </SelectItem>
                                  <SelectItem value="مدرب لياقة">مدرب لياقة</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("experience")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value ? parseInt(e.target.value) : undefined
                                      )
                                    }
                                    className="h-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("age")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value ? parseInt(e.target.value) : undefined
                                      )
                                    }
                                    className="h-12"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="nationality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("nationality")}</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="education"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("education")}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="licenses"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("licenses")}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="achievements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("achievements")}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="previousTeams"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("previousTeams")}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="coachingStyle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("coachingStyle")}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tacticalApproach"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("tacticalApproach")}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep(1)}
                        className="flex-1 h-12"
                      >
                        رجوع
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold"
                      >
                        <Save className="w-5 h-5 mr-2" />
                        {t("completeProfile")}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

