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
  Users,
  Mail,
  BarChart,
  CheckCircle,
  Clock,
  XCircle,
  Briefcase,
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

// Dashboard component for football player agents
export default function AgentDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadType, setUploadType] = useState<
    "image" | "video" | "document" | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addPlayerDialogOpen, setAddPlayerDialogOpen] = useState(false);

  // Get agent profile data
  const {
    data: agentProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["/api/agent", user?.id],
    queryFn: async () => {
      if (!user) return null;

      try {
        const res = await apiRequest("GET", `/api/agent?userId=${user.id}`);

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
            experience: null,
            website: "",
            contactEmail: user.email,
            contactPhone: "",
            licenseNumber: "",
            specialization: "",
          };
        }

        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return await res.json();
      } catch (error) {
        console.error("Error fetching agent profile:", error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Get represented talents (players and coaches)
  const {
    data: representedTalents,
    isLoading: isLoadingTalents,
    refetch: refetchTalents,
  } = useQuery({
    queryKey: ["/api/agent/talents", agentProfile?.id],
    queryFn: async () => {
      if (!agentProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/agent/talents?agentId=${agentProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل المواهب");
      return await res.json();
    },
    enabled: !!agentProfile?.id,
  });

  // Get active negotiations
  const { data: negotiations, isLoading: isLoadingNegotiations } = useQuery({
    queryKey: ["/api/agent/negotiations", agentProfile?.id],
    queryFn: async () => {
      if (!agentProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/agent/negotiations?agentId=${agentProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل المفاوضات");
      return await res.json();
    },
    enabled: !!agentProfile?.id,
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
      if (!agentProfile) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest(
        agentProfile.id ? "PATCH" : "POST",
        agentProfile.id ? `/api/agent/${agentProfile.id}` : "/api/agent",
        updatedProfile,
      );

      if (!res.ok) throw new Error("فشل في تحديث الملف الشخصي");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/agent", user?.id], data);
      console.log("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في تحديث الملف الشخصي:", error);
    },
  });

  // Add represented talent mutation
  const addTalentMutation = useMutation({
    mutationFn: async (talentData) => {
      if (!agentProfile?.id) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest("POST", "/api/agent/talents", {
        agentId: agentProfile.id,
        ...talentData,
      });

      if (!res.ok) throw new Error("فشل في إضافة الموهبة");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/agent/talents", agentProfile?.id],
      });
      setAddPlayerDialogOpen(false);
      console.log("تمت إضافة الموهبة بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في إضافة الموهبة:", error);
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
      experience: parseInt(formData.get("experience")),
      website: formData.get("website"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      licenseNumber: formData.get("licenseNumber"),
      specialization: formData.get("specialization"),
    };

    updateProfileMutation.mutate(updatedProfile);
  };

  // Handle adding a talent
  const handleAddTalent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const talentData = {
      talentId: parseInt(formData.get("talentId")),
      contractStart: formData.get("contractStart"),
      contractEnd: formData.get("contractEnd"),
      commission: formData.get("commission"),
      notes: formData.get("notes"),
    };

    addTalentMutation.mutate(talentData);
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
        <h1 className="text-3xl font-extrabold">لوحة تحكم وكيل اللاعبين</h1>
        <p className="mt-2 text-muted-foreground">
          مرحباً، {agentProfile?.name || user?.fullName || user?.username}!
          يمكنك إدارة ملفك ولاعبيك من هنا.
        </p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="players">لاعبيك</TabsTrigger>
          <TabsTrigger value="negotiations">المفاوضات</TabsTrigger>
          <TabsTrigger value="messages">الرسائل</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الوكيل</CardTitle>
                <CardDescription>المعلومات الأساسية عن وكالتك</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل / اسم الوكالة</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={agentProfile?.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">نبذة عن الوكالة</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={agentProfile?.description}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع</Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={agentProfile?.location || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">سنوات الخبرة</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        defaultValue={agentProfile?.experience || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      defaultValue={agentProfile?.website || ""}
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
                          agentProfile?.contactEmail || user?.email || ""
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">رقم الهاتف للتواصل</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        defaultValue={agentProfile?.contactPhone || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">رقم الترخيص</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        defaultValue={agentProfile?.licenseNumber || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">التخصص</Label>
                      <Select
                        name="specialization"
                        defaultValue={agentProfile?.specialization || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التخصص" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="لاعبين">لاعبين</SelectItem>
                          <SelectItem value="مدربين">مدربين</SelectItem>
                          <SelectItem value="لاعبين ومدربين">
                            لاعبين ومدربين
                          </SelectItem>
                          <SelectItem value="لاعبين شباب">
                            لاعبين شباب
                          </SelectItem>
                          <SelectItem value="انتقالات دولية">
                            انتقالات دولية
                          </SelectItem>
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
                <CardDescription>كيف يظهر ملفك للزوار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {agentProfile?.logoUrl ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={agentProfile.logoUrl}
                      alt={agentProfile.name}
                      className="aspect-square w-full max-w-[240px] mx-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <Briefcase className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        لم يتم تحميل شعار الوكالة
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-medium">معلومات الوكالة:</h3>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الموقع:</p>
                        <p className="font-medium">
                          {agentProfile?.location || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">خبرة:</p>
                        <p className="font-medium">
                          {agentProfile?.experience
                            ? `${agentProfile.experience} سنوات`
                            : "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">التخصص:</p>
                        <p className="font-medium">
                          {agentProfile?.specialization || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الترخيص:</p>
                        <p className="font-medium">
                          {agentProfile?.licenseNumber || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">
                          الموقع الإلكتروني:
                        </p>
                        <p className="font-medium">
                          {agentProfile?.website ? (
                            <a
                              href={agentProfile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {agentProfile.website}
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
                    href={`/agent/${agentProfile?.id || user?.id}`}
                    target="_blank"
                  >
                    <Button variant="secondary" className="w-full">
                      معاينة صفحة الوكالة
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    نسخ رابط صفحة الوكالة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>اللاعبون الممثلون</CardTitle>
                  <CardDescription>
                    اللاعبون والمدربون الذين تمثلهم
                  </CardDescription>
                </div>
                <Button onClick={() => setAddPlayerDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  إضافة لاعب
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingTalents ? (
                  <div className="flex h-40 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : representedTalents && representedTalents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {representedTalents.map((talent) => (
                      <Card key={talent.id} className="overflow-hidden">
                        <div className="p-3 flex items-center justify-between border-b">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={talent.talent.imageUrl}
                                alt={talent.talent.name}
                              />
                              <AvatarFallback>
                                {talent.talent.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">
                                {talent.talent.name}
                              </h3>
                              <div className="flex items-center text-xs text-muted-foreground">
                                {talent.talent.position && (
                                  <span>{talent.talent.position}</span>
                                )}
                                {talent.talent.currentTeam && (
                                  <span> • {talent.talent.currentTeam}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              talent.talent.categoryId === 1
                                ? "default"
                                : "secondary"
                            }
                          >
                            {talent.talent.categoryId === 1 ? "لاعب" : "مدرب"}
                          </Badge>
                        </div>

                        <div className="p-3">
                          <div className="space-y-1 text-sm mb-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                فترة العقد:
                              </span>
                              <span className="font-medium">
                                {new Date(
                                  talent.contractStart,
                                ).toLocaleDateString("ar-SA")}{" "}
                                -
                                {new Date(
                                  talent.contractEnd,
                                ).toLocaleDateString("ar-SA")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                العمولة:
                              </span>
                              <span className="font-medium">
                                {talent.commission}%
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between gap-2 mt-4">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/service/${talent.talent.id}`}>
                                عرض الصفحة
                              </Link>
                            </Button>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <Users className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      لا يوجد لاعبين مُمثلين
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ابدأ بإضافة اللاعبين الذين تمثلهم
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>البحث عن لاعبين</CardTitle>
                <CardDescription>
                  ابحث عن لاعبين ومدربين جدد لتمثيلهم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="ابحث بالاسم، المركز، أو الفرةق الحالي..."
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
                                onClick={() => {
                                  setAddPlayerDialogOpen(true);
                                  // Pre-select this player in the dialog
                                }}
                              >
                                <UserPlus className="h-4 w-4 mr-1" />
                                تمثيل
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
          </div>

          {/* Add Player Dialog */}
          <Dialog
            open={addPlayerDialogOpen}
            onOpenChange={setAddPlayerDialogOpen}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>إضافة لاعب أو مدرب</DialogTitle>
                <DialogDescription>
                  أضف لاعباً أو مدرباً لتمثيله وإدارة شؤونه
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddTalent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="talentId">ةختر اللاعب/المدرب</Label>
                  <Select name="talentId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر من القائمة" />
                    </SelectTrigger>
                    <SelectContent>
                      {searchResults &&
                        searchResults.map((talent) => (
                          <SelectItem
                            key={talent.id}
                            value={talent.id.toString()}
                          >
                            {talent.name} (
                            {talent.categoryId === 1 ? "لاعب" : "مدرب"})
                          </SelectItem>
                        ))}
                      <SelectItem value="1">محمد عبدالله (لاعب)</SelectItem>
                      <SelectItem value="2">أحمد محمود (مدرب)</SelectItem>
                      <SelectItem value="3">خالد العلي (لاعب)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contractStart">بداية العقد</Label>
                    <Input
                      id="contractStart"
                      name="contractStart"
                      type="date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractEnd">نهاية العقد</Label>
                    <Input
                      id="contractEnd"
                      name="contractEnd"
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission">نسبة العمولة (%)</Label>
                  <Input
                    id="commission"
                    name="commission"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="ملاحظات إضافية عة اللاعب وشروط العقد..."
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setAddPlayerDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={addTalentMutation.isPending}>
                    {addTalentMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإضافة...
                      </>
                    ) : (
                      "إضافة اللاعب"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Negotiations Tab */}
        <TabsContent value="negotiations">
          <Card>
            <CardHeader>
              <CardTitle>المفاوضات النشطة</CardTitle>
              <CardDescription>المفاوضات الجارية مع الأندية</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingNegotiations ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : negotiations && negotiations.length > 0 ? (
                <Table>
                  <TableCaption>جميع المفاوضات النشطة</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اللاعب/المدرب</TableHead>
                      <TableHead>النادي</TableHead>
                      <TableHead>نوع العقد</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>تاريخ التحديث</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {negotiations.map((negotiation) => (
                      <TableRow key={negotiation.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={negotiation.talent.imageUrl}
                                alt={negotiation.talent.name}
                              />
                              <AvatarFallback>
                                {negotiation.talent.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {negotiation.talent.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={negotiation.club.logoUrl}
                                alt={negotiation.club.name}
                              />
                              <AvatarFallback>
                                {negotiation.club.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {negotiation.club.name}
                          </div>
                        </TableCell>
                        <TableCell>{negotiation.contractType}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              negotiation.status === "approved"
                                ? "default"
                                : negotiation.status === "pending"
                                  ? "secondary"
                                  : negotiation.status === "rejected"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {negotiation.status === "approved" && (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            )}
                            {negotiation.status === "pending" && (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {negotiation.status === "rejected" && (
                              <XCircle className="mr-1 h-3 w-3" />
                            )}
                            {negotiation.status === "approved" &&
                              "تمت الموافقة"}
                            {negotiation.status === "pending" && "قيد الانتظار"}
                            {negotiation.status === "rejected" && "مرفوض"}
                            {!["approved", "pending", "rejected"].includes(
                              negotiation.status,
                            ) && negotiation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(negotiation.updatedAt).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              عرض
                            </Button>
                            <Button size="sm">
                              <Mail className="mr-2 h-4 w-4" />
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
                  <Briefcase className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    لا توجد مفاوضات نشطة
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ستظهر المفاوضات مع الأندية هنا عند بدئها
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>الرسائل</CardTitle>
              <CardDescription>
                الرسائل المتبادلة مع اللاعبين والأندية
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
                    ستظهر هنا الرسائل من اللاعبين والأندية
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
                      <p className="font-medium">عرض الملف للعامة</p>
                      <p className="text-sm text-muted-foreground">
                        السماح للزوار بعرض تفاصيل وكالتك
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
                        إدارة من يمكنه الوصول إلى حساب الوكالة
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
