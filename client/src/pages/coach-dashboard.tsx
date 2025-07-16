import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import {
  Upload,
  Edit,
  Trash2,
  FileText,
  Video,
  Image as ImageIcon,
  Settings,
  PlusCircle,
  Calendar,
  Loader2,
  Award,
  GraduationCap,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Dashboard component for coaches
export default function CoachDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadType, setUploadType] = useState<
    "image" | "video" | "document" | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);

  // Get coach profile data
  const {
    data: coachProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["/api/coach", user?.id],
    queryFn: async () => {
      if (!user) return null;

      try {
        const res = await apiRequest("GET", `/api/coach?userId=${user.id}`);

        if (res.status === 404) {
          // No profile yet, return default structure
          return {
            id: null,
            userId: user.id,
            name: user.fullName || user.username,
            description: "",
            specialization: "",
            experience: null,
            age: null,
            nationality: "",
            currentTeam: "",
            previousTeams: "",
            achievements: "",
            education: "",
            licenses: "",
            imageUrl: "",
            videoUrl: "",
            categoryId: 2,
          };
        }

        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return await res.json();
      } catch (error) {
        console.error("Error fetching coach profile:", error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Get coach achievements
  const { data: coachAchievements, isLoading: isLoadingAchievements } =
    useQuery({
      queryKey: ["/api/coach/achievements", coachProfile?.id],
      queryFn: async () => {
        if (!coachProfile?.id) return [];

        const res = await apiRequest(
          "GET",
          `/api/coach/achievements?coachId=${coachProfile.id}`,
        );
        if (!res.ok) throw new Error("فشل في تحميل الإنجازات");
        return await res.json();
      },
      enabled: !!coachProfile?.id,
    });

  // Get coach media
  const { data: coachMedia, isLoading: isLoadingMedia } = useQuery({
    queryKey: ["/api/coach/media", coachProfile?.id],
    queryFn: async () => {
      if (!coachProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/coach/media?coachId=${coachProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل الوسائط");
      return await res.json();
    },
    enabled: !!coachProfile?.id,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile) => {
      if (!coachProfile) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest(
        coachProfile.id ? "PATCH" : "POST",
        coachProfile.id ? `/api/coach/${coachProfile.id}` : "/api/coach",
        updatedProfile,
      );

      if (!res.ok) throw new Error("فشل في تحديث الملف الشخصي");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/coach", user?.id], data);
      console.log("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في تحديث الملف الشخصي:", error);
    },
  });

  // Add achievement mutation
  const addAchievementMutation = useMutation({
    mutationFn: async (newAchievement) => {
      if (!coachProfile?.id) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest("POST", "/api/coach/achievements", {
        ...newAchievement,
        coachId: coachProfile.id,
      });

      if (!res.ok) throw new Error("فشل في إضافة الإنجاز");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/coach/achievements", coachProfile?.id],
      });
      console.log("تمت إضافة الإنجاز ةنجاح");
    },
    onError: (error) => {
      console.error("خطأ في إضافة الإنجاز:", error);
    },
  });

  // Handle form submission for profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      userId: user?.id,
      name: formData.get("name"),
      description: formData.get("description"),
      specialization: formData.get("specialization"),
      experience: parseInt(formData.get("experience")),
      age: parseInt(formData.get("age")),
      nationality: formData.get("nationality"),
      currentTeam: formData.get("currentTeam"),
      previousTeams: formData.get("previousTeams"),
      achievements: formData.get("achievements"),
      education: formData.get("education"),
      licenses: formData.get("licenses"),
      categoryId: 2, // Default to "coaches" category
    };

    updateProfileMutation.mutate(updatedProfile);
  };

  // Handle adding a new achievement
  const handleAddAchievement = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAchievement = {
      title: formData.get("title"),
      year: parseInt(formData.get("year")),
      team: formData.get("team"),
      description: formData.get("description"),
    };

    addAchievementMutation.mutate(newAchievement);
  };

  // Handle media upload
  const handleMediaUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadType(null);
      queryClient.invalidateQueries({
        queryKey: ["/api/coach/media", coachProfile?.id],
      });
      console.log("تم رفع الملف بنجاح");
    }, 2000);
  };

  if (isLoadingProfile) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            جاري تحميل الملف الشخصي...
          </p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">حدث خطأ</h2>
          <p className="mt-2 text-muted-foreground">{profileError.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold">لوحة تحكم المدرب</h1>
        <p className="mt-2 text-muted-foreground">
          مرحباً، {coachProfile?.name || user?.fullName || user?.username}!
          يمكنك إدارة ملفك الشخصي ومحتواك من هنا.
        </p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="messages">الرسائل</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات المدرب</CardTitle>
                <CardDescription>
                  المعلومات الأساسية والخبرات الخاصة بك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={coachProfile?.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">نبذة تعريفية</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={coachProfile?.description}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">التخصص</Label>
                      <Select
                        name="specialization"
                        defaultValue={coachProfile?.specialization || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التخصص" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="مدرب أول">مدرب أول</SelectItem>
                          <SelectItem value="مدرب مساعد">مدرب مساعد</SelectItem>
                          <SelectItem value="مدرب حراس">
                            مدرب حراس مرمى
                          </SelectItem>
                          <SelectItem value="مدرب لياقة">
                            مدرب لياقة بدنية
                          </SelectItem>
                          <SelectItem value="محلل أداء">محلل أداء</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">سنوات الخبرة</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        defaultValue={coachProfile?.experience || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">العمر</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        defaultValue={coachProfile?.age || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">الجنسية</Label>
                      <Input
                        id="nationality"
                        name="nationality"
                        defaultValue={coachProfile?.nationality || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentTeam">الفريق الحالي</Label>
                    <Input
                      id="currentTeam"
                      name="currentTeam"
                      defaultValue={coachProfile?.currentTeam || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousTeams">الفرق السابقة</Label>
                    <Textarea
                      id="previousTeams"
                      name="previousTeams"
                      defaultValue={coachProfile?.previousTeams || ""}
                      rows={3}
                      placeholder="أدخل الفرق السابقة مفصولة بسطر جديد"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">الإنجازات البارزة</Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      defaultValue={coachProfile?.achievements || ""}
                      rows={3}
                      placeholder="أدخل أهم الإنجازات مفصولة بسطر جديد"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="education">المؤهلات الأكاديمية</Label>
                      <Textarea
                        id="education"
                        name="education"
                        defaultValue={coachProfile?.education || ""}
                        rows={3}
                        placeholder="مؤهلاتك الأكاديمية"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenses">الرخص والشهادات</Label>
                      <Textarea
                        id="licenses"
                        name="licenses"
                        defaultValue={coachProfile?.licenses || ""}
                        rows={3}
                        placeholder="مثل شهادات التدريب AFC, FIFA, etc."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      "حفظ التغييرات"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الملة الشخصي العام</CardTitle>
                <CardDescription>كيف يظهر ملفك الشخصي للزوار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {coachProfile?.imageUrl ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={coachProfile.imageUrl}
                      alt={coachProfile.name}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        لم يتم تحميل صورة
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-medium">معلومات المدرب:</h3>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">التخصص:</p>
                        <p className="font-medium">
                          {coachProfile?.specialization || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">سنوات الخبرة:</p>
                        <p className="font-medium">
                          {coachProfile?.experience || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">العمر:</p>
                        <p className="font-medium">
                          {coachProfile?.age || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الجنسية:</p>
                        <p className="font-medium">
                          {coachProfile?.nationality || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">الفريق الحالي:</p>
                        <p className="font-medium">
                          {coachProfile?.currentTeam || "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/service/${coachProfile?.id || user?.id}`}
                    target="_blank"
                  >
                    <Button variant="secondary" className="w-full">
                      معاينة الملف الشخصي
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    نسخ رابط الملف الشخصي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>إضافة إنجاز جديد</CardTitle>
                <CardDescription>
                  أضف الإنجازات والألقاب التي حققتها خلال مسيرتك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAchievement} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان الإنجاز</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="مثال: كأس الدوري، درع الاتحاد"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">السنة</Label>
                      <Input
                        id="year"
                        name="year"
                        type="number"
                        placeholder="مثال: 2023"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="team">الفريق</Label>
                      <Input
                        id="team"
                        name="team"
                        placeholder="اسم الفريق"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">تفاصيل الإنجاز</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="تفاصيل إضافية عن الإنجاز"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={addAchievementMutation.isPending}
                  >
                    {addAchievementMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإضافة...
                      </>
                    ) : (
                      "إضافة إنجاز"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>الإنجازات والألقاب</CardTitle>
                  <CardDescription>
                    الإنجازات التي حققتها خلال مسيرتك
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  ترتيب حسب السنة
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingAchievements ? (
                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : coachAchievements && coachAchievements.length > 0 ? (
                  <Table>
                    <TableCaption>إنجازات المدرب</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الإنجاز</TableHead>
                        <TableHead>السنة</TableHead>
                        <TableHead>الفريق</TableHead>
                        <TableHead>التفاصيل</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {coachAchievements.map((achievement) => (
                        <TableRow key={achievement.id}>
                          <TableCell className="font-medium">
                            {achievement.title}
                          </TableCell>
                          <TableCell>{achievement.year}</TableCell>
                          <TableCell>{achievement.team}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {achievement.description || "—"}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center">
                    <Award className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      لا توجد إنجازات
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ابدأ بإضافة إنجازاتك من النموذج المجاور
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>إضافة وسائط</CardTitle>
                <CardDescription>
                  أضف صور وفيديوهات ومستندات لتعزيز ملفك الشخصي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog
                  open={!!uploadType}
                  onOpenChange={(open) => !open && setUploadType(null)}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex h-20 flex-col items-center justify-center"
                        onClick={() => setUploadType("image")}
                      >
                        <ImageIcon className="h-6 w-6 text-primary" />
                        <span className="mt-2 text-sm">إضافة صورة</span>
                      </Button>
                    </DialogTrigger>

                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex h-20 flex-col items-center justify-center"
                        onClick={() => setUploadType("video")}
                      >
                        <Video className="h-6 w-6 text-primary" />
                        <span className="mt-2 text-sm">إضافة فيديو</span>
                      </Button>
                    </DialogTrigger>

                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex h-20 flex-col items-center justify-center"
                        onClick={() => setUploadType("document")}
                      >
                        <FileText className="h-6 w-6 text-primary" />
                        <span className="mt-2 text-sm">إضافة مستند</span>
                      </Button>
                    </DialogTrigger>
                  </div>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {uploadType === "image" && "رفع صورة جديدة"}
                        {uploadType === "video" && "رفع فيديو جديد"}
                        {uploadType === "document" && "رفع مستند جديد"}
                      </DialogTitle>
                      <DialogDescription>
                        {uploadType === "image" &&
                          "أضف صورة جديدة إلى ملفك الشخصي، يفضل الصور بجودة عالية."}
                        {uploadType === "video" &&
                          "أضف فيديو يظهر أسلوبك التدريبي ولقطات من التدريبات."}
                        {uploadType === "document" &&
                          "أضف مستندات مثل السيرة الذاتية أو الشهادات التدريبية."}
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleMediaUpload} className="space-y-4">
                      <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-primary/50">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            اسحب وأفلت أو اضغط للاختيار
                          </p>
                          <Input
                            type="file"
                            className="sr-only"
                            accept={
                              uploadType === "image"
                                ? "image/*"
                                : uploadType === "video"
                                  ? "video/*"
                                  : uploadType === "document"
                                    ? ".pdf,.doc,.docx"
                                    : undefined
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">العنوان</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="أدخل عنواناً"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">الوصف</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="أضف وصفاً للملف"
                          rows={3}
                        />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" type="button">
                            إلغاء
                          </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUploading}>
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              جاري الرفع...
                            </>
                          ) : (
                            "رفع الملف"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>الوسائط المرفوعة</CardTitle>
                <CardDescription>جميع الوسائط التي قمت برفعها</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingMedia ? (
                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : coachMedia && coachMedia.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {coachMedia.map((item) => (
                      <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-lg border"
                      >
                        <div className="aspect-video w-full">
                          {item.type === "image" ? (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : item.type === "video" ? (
                            <div className="flex h-full items-center justify-center bg-black">
                              <Video className="h-10 w-10 text-white" />
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center bg-secondary">
                              <FileText className="h-10 w-10 text-primary" />
                            </div>
                          )}
                        </div>

                        <div className="p-2">
                          <p className="font-medium line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString(
                              "ar-SA",
                            )}
                          </p>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button size="sm" variant="secondary">
                            <Edit className="mr-1 h-4 w-4" />
                            تعديل
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="mr-1 h-4 w-4" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center">
                    <p className="text-muted-foreground">
                      لا توجد وسائط مرفوعة
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ابدأ برفع وسائط لتعزيز ملفك الشخصي
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>الرسائل</CardTitle>
              <CardDescription>
                الرسائل الواردة من الأندية والوكلاء وصناع القرار
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 flex-col items-center justify-center">
                <div className="text-center">
                  <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    لا توجة رسائل حالياً
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ستظهر هنا الرسائل من الأندية والوكلاء والمهتمين بك
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الحساب</CardTitle>
              <CardDescription>إدارة إعدادات حسابك والخصوصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">إعدادات الملف الشخصي</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">عرض الملف الشخصي للعامة</p>
                      <p className="text-sm text-muted-foreground">
                        السماح للزوار بعرض تفاصيل ملفك الشخصي
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      تعديل
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">إعدادات التواصل</p>
                      <p className="text-sm text-muted-foreground">
                        إدارة من يمكنه التواصل معك
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      تعديل
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">إعدادات الحساب</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تغيير البريد الإلكتروني</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      تغيير
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تغيير كلمة المرور</p>
                      <p className="text-sm text-muted-foreground">
                        آخر تغيير: لم يتم تغيير كلمة المرور
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      تغيير
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="destructive">تعطيل الحساب</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
