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
  Search,
  UserPlus,
  Star,
  Building,
  Users,
  Mail,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dashboard component for football clubs
export default function ClubDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadType, setUploadType] = useState<
    "image" | "video" | "document" | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get club profile data
  const {
    data: clubProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["/api/club", user?.id],
    queryFn: async () => {
      if (!user) return null;

      try {
        const res = await apiRequest("GET", `/api/club?userId=${user.id}`);

        if (res.status === 404) {
          // No profile yet, return default structure
          return {
            id: null,
            userId: user.id,
            name: user.fullName || user.username,
            description: "",
            logoUrl: "",
            coverImageUrl: "",
            location: "",
            foundedYear: null,
            stadium: "",
            website: "",
            contactEmail: user.email,
            contactPhone: "",
            league: "",
            achievements: "",
          };
        }

        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return await res.json();
      } catch (error) {
        console.error("Error fetching club profile:", error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Get club contracts/interests with talents
  const { data: clubInterests, isLoading: isLoadingInterests } = useQuery({
    queryKey: ["/api/club/interests", clubProfile?.id],
    queryFn: async () => {
      if (!clubProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/club/interests?clubId=${clubProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل الاهتمامات");
      return await res.json();
    },
    enabled: !!clubProfile?.id,
  });

  // Get club media
  const { data: clubMedia, isLoading: isLoadingMedia } = useQuery({
    queryKey: ["/api/club/media", clubProfile?.id],
    queryFn: async () => {
      if (!clubProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/club/media?clubId=${clubProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل الوسائط");
      return await res.json();
    },
    enabled: !!clubProfile?.id,
  });

  // Search talents
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["/api/talents/search", searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) return [];

      const res = await apiRequest(
        "GET",
        `/api/services?search=${encodeURIComponent(searchTerm)}`,
      );
      if (!res.ok) throw new Error("فشل في البحث");
      return await res.json();
    },
    enabled: searchTerm.length >= 2,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile) => {
      if (!clubProfile) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest(
        clubProfile.id ? "PATCH" : "POST",
        clubProfile.id ? `/api/club/${clubProfile.id}` : "/api/club",
        updatedProfile,
      );

      if (!res.ok) throw new Error("فشل في تحديث الملف الشخصي");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/club", user?.id], data);
      console.log("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في تحديث الملف الشخصي:", error);
    },
  });

  // Add interest in talent mutation
  const addInterestMutation = useMutation({
    mutationFn: async (talentId: number) => {
      if (!clubProfile?.id) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest("POST", "/api/club/interests", {
        clubId: clubProfile.id,
        talentId,
        status: "interested", // initial status
      });

      if (!res.ok) throw new Error("فشل في إضافة الاهتمام بالموهبة");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/club/interests", clubProfile?.id],
      });
      console.log("تمت إضافة الاهتمام بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في إضافة الاهتمام:", error);
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
      location: formData.get("location"),
      foundedYear: parseInt(formData.get("foundedYear")),
      stadium: formData.get("stadium"),
      website: formData.get("website"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      league: formData.get("league"),
      achievements: formData.get("achievements"),
    };

    updateProfileMutation.mutate(updatedProfile);
  };

  // Handle adding interest in talent
  const handleAddInterest = (talentId: number) => {
    addInterestMutation.mutate(talentId);
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
        queryKey: ["/api/club/media", clubProfile?.id],
      });
      console.log("تم رفع الملف بنجاح");
    }, 2000);
  };

  // Handle search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
        <h1 className="text-3xl font-extrabold">لوحة تحكم النادي</h1>
        <p className="mt-2 text-muted-foreground">
          مرحباً، {clubProfile?.name || user?.fullName || user?.username}! يمكنك
          إدارة ملف ناديك والتواصل مع المواهب من هنا.
        </p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="talents">المواهب</TabsTrigger>
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="messages">الرسائل</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات النادي</CardTitle>
                <CardDescription>المعلومات الأساسية عن النادي</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم النادي</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={clubProfile?.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">نبذة عن النادي</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={clubProfile?.description}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع</Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={clubProfile?.location || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">سنة التأسيس</Label>
                      <Input
                        id="foundedYear"
                        name="foundedYear"
                        type="number"
                        defaultValue={clubProfile?.foundedYear || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stadium">الملعب</Label>
                      <Input
                        id="stadium"
                        name="stadium"
                        defaultValue={clubProfile?.stadium || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="league">الدوري</Label>
                      <Input
                        id="league"
                        name="league"
                        defaultValue={clubProfile?.league || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      defaultValue={clubProfile?.website || ""}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">
                        البريد الإلكتروني للتواصل
                      </Label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        defaultValue={
                          clubProfile?.contactEmail || user?.email || ""
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">رقم الهاتف للتواصل</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        defaultValue={clubProfile?.contactPhone || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">إنجازات النادي</Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      defaultValue={clubProfile?.achievements || ""}
                      rows={3}
                      placeholder="أدخل إنجازات النادي مفصولة بسطر جديد"
                    />
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
                <CardDescription>كيف يظهر ملف ناديك للزوار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {clubProfile?.logoUrl ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={clubProfile.logoUrl}
                      alt={clubProfile.name}
                      className="aspect-square w-full max-w-[240px] mx-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <Building className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        لم يتم تحميل شعار النادي
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-medium">معلومات النادي:</h3>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الموقع:</p>
                        <p className="font-medium">
                          {clubProfile?.location || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">تأسس عام:</p>
                        <p className="font-medium">
                          {clubProfile?.foundedYear || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الملعب:</p>
                        <p className="font-medium">
                          {clubProfile?.stadium || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الدوري:</p>
                        <p className="font-medium">
                          {clubProfile?.league || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">
                          الموقع الإلكتروني:
                        </p>
                        <p className="font-medium">
                          {clubProfile?.website ? (
                            <a
                              href={clubProfile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {clubProfile.website}
                            </a>
                          ) : (
                            "غير محدد"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/club/${clubProfile?.id || user?.id}`}
                    target="_blank"
                  >
                    <Button variant="secondary" className="w-full">
                      معاينة صفحة النادي
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    نسخ رابط صفحة النادي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Talents Tab */}
        <TabsContent value="talents">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>البحث عن مواهب</CardTitle>
                <CardDescription>
                  ابحث عن لاعبين ومدربين للتعاقد معهم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="ابحث بالاسم، المركز، أو الفريق الحالي..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm("لاعب وسط")}
                    >
                      لاعب وسط
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm("مهاجم")}
                    >
                      مهاجم
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm("مدافع")}
                    >
                      مدافع
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm("حارس مرمى")}
                    >
                      حارس مرمى
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm("مدرب")}
                    >
                      مدرب
                    </Button>
                  </div>

                  {isLoadingSearch ? (
                    <div className="flex h-40 items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : searchTerm.length >= 2 ? (
                    searchResults && searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {searchResults.map((result) => (
                          <Card key={result.id} className="overflow-hidden">
                            <div className="flex items-center p-3 pb-2">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src={result.imageUrl}
                                  alt={result.name}
                                />
                                <AvatarFallback>
                                  {result.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold">{result.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  {result.position && (
                                    <span>{result.position}</span>
                                  )}
                                  {result.age && <span>{result.age} سنة</span>}
                                </div>
                              </div>
                              <Badge variant="outline" className="mr-1">
                                {result.categoryId === 1
                                  ? "لاعب"
                                  : result.categoryId === 2
                                    ? "مدرب"
                                    : result.categoryId === 3
                                      ? "حارس"
                                      : "أخرى"}
                              </Badge>
                            </div>
                            <div className="px-3 pb-2 text-sm text-muted-foreground line-clamp-2">
                              {result.description}
                            </div>
                            <div className="flex justify-between items-center p-3 pt-1 border-t">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/service/${result.id}`}>
                                  عرض التفاصيل
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddInterest(result.id)}
                                disabled={addInterestMutation.isPending}
                              >
                                <UserPlus className="h-4 w-4 mr-1" />
                                إضافة اهتمام
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-40 flex-col items-center justify-center text-center">
                        <p className="text-muted-foreground">
                          لم يتم العثور على نتائج
                        </p>
                        <p className="text-sm text-muted-foreground">
                          حاول البحث بمصطلحات أخرى
                        </p>
                      </div>
                    )
                  ) : searchTerm.length === 1 ? (
                    <div className="flex h-40 flex-col items-center justify-center text-center">
                      <p className="text-muted-foreground">
                        يرجى إدخال حرفين على الأقل للبحث
                      </p>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المواهب المهتم بها</CardTitle>
                <CardDescription>
                  المواهب التي أبديت اهتمامك بها
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingInterests ? (
                  <div className="flex h-40 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : clubInterests && clubInterests.length > 0 ? (
                  <Table>
                    <TableCaption>قائمة المواهب المهتم بها</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>المركز</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>تاريخ الاهتمام</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clubInterests.map((interest) => (
                        <TableRow key={interest.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={interest.talent.imageUrl}
                                  alt={interest.talent.name}
                                />
                                <AvatarFallback>
                                  {interest.talent.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {interest.talent.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            {interest.talent.position || "غير محدد"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                interest.status === "contracted"
                                  ? "default"
                                  : interest.status === "negotiating"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {interest.status === "interested" && "مهتم"}
                              {interest.status === "contacted" && "تم التواصل"}
                              {interest.status === "negotiating" &&
                                "قيد التفاوض"}
                              {interest.status === "contracted" && "تم التعاقد"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(interest.createdAt).toLocaleDateString(
                              "ar-SA",
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/service/${interest.talent.id}`}>
                                  <span className="sr-only">عرض</span>
                                  عرض
                                </Link>
                              </Button>
                              <Button size="sm">
                                <Mail className="h-4 w-4 mr-1" />
                                تواصل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <Users className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      لم تبد اهتمامك بأي مواهب بعد
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ابحث عن المواهب وأضفها إلى قائمة اهتماماتك
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
                  أضف صور وفيديوهات ومستندات النادي
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
                          "أضف صورة تعرض مرافق النادي، المباريات، أو اللاعبين."}
                        {uploadType === "video" &&
                          "أضف فيديو يعرض مباريات أو تدريبات النادي."}
                        {uploadType === "document" &&
                          "أضف مستندات النادي والعقود."}
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
                ) : clubMedia && clubMedia.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clubMedia.map((item) => (
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
                      ابدأ برفع وسائط لتعزيز صفحة ناديك
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
                الرسائل المتبادلة مع اللاعبين والمدربين والوكلاء
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
                    ستظهر هنا الرسائل من اللاعبين والمدربين والوكلاء
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
              <CardDescription>إدارة إعدادات النادي والخصوصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">إعدادات الملف الشخصي</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">عرض الملف للعامة</p>
                      <p className="text-sm text-muted-foreground">
                        السماح للزوار بعرض تفاصيل ناديك
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      تعديل
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">إدارة الأعضاء والصلاحيات</p>
                      <p className="text-sm text-muted-foreground">
                        إدارة من يمكنه الوصول إلى حساب النادي
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
