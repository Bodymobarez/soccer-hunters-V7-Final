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
  BarChart,
  Settings,
  PlusCircle,
  Calendar,
  Loader2,
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

// Dashboard component for football talents
export default function TalentDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadType, setUploadType] = useState<
    "image" | "video" | "document" | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);

  // Get talent profile data
  const {
    data: talentProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["/api/talent", user?.id],
    queryFn: async () => {
      if (!user) return null;

      try {
        const res = await apiRequest("GET", `/api/talent?userId=${user.id}`);

        if (res.status === 404) {
          // No profile yet, return default structure
          return {
            id: null,
            userId: user.id,
            name: user.fullName || user.username,
            description: "",
            position: "",
            secondaryPosition: "",
            age: null,
            height: null,
            weight: null,
            foot: "",
            nationality: "",
            currentTeam: "",
            contractStatus: "",
            imageUrl: "",
            videoUrl: "",
            categoryId: 1,
          };
        }

        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return await res.json();
      } catch (error) {
        console.error("Error fetching talent profile:", error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Get talent stats
  const { data: talentStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["/api/talent/stats", talentProfile?.id],
    queryFn: async () => {
      if (!talentProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/talent/stats?talentId=${talentProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل الإحصائيات");
      return await res.json();
    },
    enabled: !!talentProfile?.id,
  });

  // Get talent media
  const { data: talentMedia, isLoading: isLoadingMedia } = useQuery({
    queryKey: ["/api/talent/media", talentProfile?.id],
    queryFn: async () => {
      if (!talentProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/talent/media?talentId=${talentProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل الوسائط");
      return await res.json();
    },
    enabled: !!talentProfile?.id,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile) => {
      if (!talentProfile) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest(
        talentProfile.id ? "PATCH" : "POST",
        talentProfile.id ? `/api/talent/${talentProfile.id}` : "/api/talent",
        updatedProfile,
      );

      if (!res.ok) throw new Error("فشل في تحديث الملف الشخصي");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/talent", user?.id], data);
      console.log("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في تحديث الملف الشخصي:", error);
    },
  });

  // Add stat mutation
  const addStatMutation = useMutation({
    mutationFn: async (newStat) => {
      if (!talentProfile?.id) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest("POST", "/api/talent/stats", {
        ...newStat,
        talentId: talentProfile.id,
      });

      if (!res.ok) throw new Error("فشل في إضافة الإحصائية");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/talent/stats", talentProfile?.id],
      });
      console.log("تمت إضافة الإحصائية بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في إضافة الإحصائية:", error);
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
      position: formData.get("position"),
      secondaryPosition: formData.get("secondaryPosition"),
      age: parseInt(formData.get("age")),
      height: parseInt(formData.get("height")),
      weight: parseInt(formData.get("weight")),
      foot: formData.get("foot"),
      nationality: formData.get("nationality"),
      currentTeam: formData.get("currentTeam"),
      contractStatus: formData.get("contractStatus"),
      categoryId: 1, // Default to "players" category
    };

    updateProfileMutation.mutate(updatedProfile);
  };

  // Handle adding a new stat
  const handleAddStat = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStat = {
      season: formData.get("season"),
      team: formData.get("team"),
      competition: formData.get("competition"),
      matches: parseInt(formData.get("matches")),
      goals: parseInt(formData.get("goals")),
      assists: parseInt(formData.get("assists")),
      yellowCards: parseInt(formData.get("yellowCards")),
      redCards: parseInt(formData.get("redCards")),
      minutesPlayed: parseInt(formData.get("minutesPlayed")),
    };

    addStatMutation.mutate(newStat);
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
        queryKey: ["/api/talent/media", talentProfile?.id],
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
        <h1 className="text-3xl font-extrabold">لوحة تحكم اللاعب</h1>
        <p className="mt-2 text-muted-foreground">
          مرحباً، {talentProfile?.name || user?.fullName || user?.username}!
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
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
          <TabsTrigger value="messages">الرسائل</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات اللاعب</CardTitle>
                <CardDescription>
                  المعلومات الأساسية والمهارات الخاصة بك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={talentProfile?.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">نبذة تعريفية</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={talentProfile?.description}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">المركز الأساسي</Label>
                      <Select
                        name="position"
                        defaultValue={talentProfile?.position || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المركز" />
                        </SelectTrigger>
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondaryPosition">المركز الثانوي</Label>
                      <Select
                        name="secondaryPosition"
                        defaultValue={talentProfile?.secondaryPosition || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المركز" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">بدون</SelectItem>
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
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">العمر</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        defaultValue={talentProfile?.age || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">الطول (سم)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        defaultValue={talentProfile?.height || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">الوزن (كغ)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        defaultValue={talentProfile?.weight || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foot">القدم المفضلة</Label>
                      <Select
                        name="foot"
                        defaultValue={talentProfile?.foot || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القدم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="يمنى">اليمنى</SelectItem>
                          <SelectItem value="يسرى">اليسرى</SelectItem>
                          <SelectItem value="كلتاهما">كلتاهما</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">الجنسية</Label>
                      <Input
                        id="nationality"
                        name="nationality"
                        defaultValue={talentProfile?.nationality || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentTeam">الفريق الحالي</Label>
                      <Input
                        id="currentTeam"
                        name="currentTeam"
                        defaultValue={talentProfile?.currentTeam || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contractStatus">حالة العقد</Label>
                      <Select
                        name="contractStatus"
                        defaultValue={talentProfile?.contractStatus || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="متعاقد">متعاقد</SelectItem>
                          <SelectItem value="حر">لاعب حر</SelectItem>
                          <SelectItem value="معار">معار</SelectItem>
                          <SelectItem value="ناشئ">ناشئ</SelectItem>
                        </SelectContent>
                      </Select>
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
                <CardTitle>الملف الشخصي العام</CardTitle>
                <CardDescription>كيف يظهر ملفك الشخصي للزوار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {talentProfile?.imageUrl ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={talentProfile.imageUrl}
                      alt={talentProfile.name}
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
                  <h3 className="font-medium">معلومات اللاعب:</h3>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">المركز:</p>
                        <p className="font-medium">
                          {talentProfile?.position || "غير محدد"}
                          {talentProfile?.secondaryPosition &&
                            ` / ${talentProfile.secondaryPosition}`}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">العمر:</p>
                        <p className="font-medium">
                          {talentProfile?.age || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الطول:</p>
                        <p className="font-medium">
                          {talentProfile?.height
                            ? `${talentProfile.height} سم`
                            : "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الوزن:</p>
                        <p className="font-medium">
                          {talentProfile?.weight
                            ? `${talentProfile.weight} كغ`
                            : "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">القدم المفضلة:</p>
                        <p className="font-medium">
                          {talentProfile?.foot || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الفريق الحالي:</p>
                        <p className="font-medium">
                          {talentProfile?.currentTeam || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">حالة العقد:</p>
                        <p className="font-medium">
                          {talentProfile?.contractStatus || "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/service/${talentProfile?.id || user?.id}`}
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
                          "أضف فيديو يظهر مهاراتك ولقطات من المباريات."}
                        {uploadType === "document" &&
                          "أضف مستندات مثل السيرة الذاتية أو شهادات."}
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
                ) : talentMedia && talentMedia.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {talentMedia.map((item) => (
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

        {/* Stats Tab */}
        <TabsContent value="stats">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>إضافة إحصائية جديدة</CardTitle>
                <CardDescription>أضف إحصائيات مباريات ومواسم</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddStat} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="season">الموسم</Label>
                      <Input
                        id="season"
                        name="season"
                        placeholder="مثال: 2023/2024"
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
                    <Label htmlFor="competition">المسابقة</Label>
                    <Input
                      id="competition"
                      name="competition"
                      placeholder="اسم المسابقة"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="matches">المباريات</Label>
                      <Input
                        id="matches"
                        name="matches"
                        type="number"
                        min="0"
                        defaultValue="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goals">الأهداف</Label>
                      <Input
                        id="goals"
                        name="goals"
                        type="number"
                        min="0"
                        defaultValue="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assists">التمريرات الحاسمة</Label>
                      <Input
                        id="assists"
                        name="assists"
                        type="number"
                        min="0"
                        defaultValue="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yellowCards">بطاقات صفراء</Label>
                      <Input
                        id="yellowCards"
                        name="yellowCards"
                        type="number"
                        min="0"
                        defaultValue="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="redCards">بطاقات حمراء</Label>
                      <Input
                        id="redCards"
                        name="redCards"
                        type="number"
                        min="0"
                        defaultValue="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minutesPlayed">دقائق اللعب</Label>
                      <Input
                        id="minutesPlayed"
                        name="minutesPlayed"
                        type="number"
                        min="0"
                        defaultValue="0"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={addStatMutation.isPending}
                  >
                    {addStatMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      "إضافة إحصائية"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>الإحصائيات والأرقام</CardTitle>
                  <CardDescription>إحصائيات المواسم والمباريات</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart className="mr-2 h-4 w-4" />
                  عرض الرسوم البيانية
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingStats ? (
                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : talentStats && talentStats.length > 0 ? (
                  <Table>
                    <TableCaption>إحصائيات اللاعب لكل موسم</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الموسم</TableHead>
                        <TableHead>الفريق</TableHead>
                        <TableHead>المسابقة</TableHead>
                        <TableHead className="text-center">مباريات</TableHead>
                        <TableHead className="text-center">أهداف</TableHead>
                        <TableHead className="text-center">تمريرات</TableHead>
                        <TableHead className="text-center">دقائق</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {talentStats.map((stat) => (
                        <TableRow key={stat.id}>
                          <TableCell className="font-medium">
                            {stat.season}
                          </TableCell>
                          <TableCell>{stat.team}</TableCell>
                          <TableCell>{stat.competition || "—"}</TableCell>
                          <TableCell className="text-center">
                            {stat.matches}
                          </TableCell>
                          <TableCell className="text-center">
                            {stat.goals}
                          </TableCell>
                          <TableCell className="text-center">
                            {stat.assists}
                          </TableCell>
                          <TableCell className="text-center">
                            {stat.minutesPlayed}
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
                    <p className="text-muted-foreground">لا توجد إحصائيات</p>
                    <p className="text-sm text-muted-foreground">
                      ابدأ بإضافة إحصائيات من النموذج المجاور
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
                    لا توجد رسائل حالياً
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
