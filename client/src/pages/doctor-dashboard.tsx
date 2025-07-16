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
  Activity,
  ClipboardList,
  Stethoscope,
  Heart,
  User,
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

// Dashboard component for sports injury doctors
export default function DoctorDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadType, setUploadType] = useState<
    "image" | "video" | "document" | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);

  // Get doctor profile data
  const {
    data: doctorProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["/api/doctor", user?.id],
    queryFn: async () => {
      if (!user) return null;

      try {
        const res = await apiRequest("GET", `/api/doctor?userId=${user.id}`);

        if (res.status === 404) {
          // No profile yet, return default structure
          return {
            id: null,
            userId: user.id,
            name: user.fullName || user.username,
            description: "",
            specialization: "",
            experience: null,
            education: "",
            certifications: "",
            hospitalAffiliation: "",
            clinicAddress: "",
            contactEmail: user.email,
            contactPhone: "",
            imageUrl: "",
            website: "",
          };
        }

        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return await res.json();
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        throw error;
      }
    },
    enabled: !!user,
  });

  // Get doctor's patients
  const {
    data: patients,
    isLoading: isLoadingPatients,
    refetch: refetchPatients,
  } = useQuery({
    queryKey: ["/api/doctor/patients", doctorProfile?.id],
    queryFn: async () => {
      if (!doctorProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/doctor/patients?doctorId=${doctorProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل المرضى");
      return await res.json();
    },
    enabled: !!doctorProfile?.id,
  });

  // Get appointments
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery({
    queryKey: ["/api/doctor/appointments", doctorProfile?.id],
    queryFn: async () => {
      if (!doctorProfile?.id) return [];

      const res = await apiRequest(
        "GET",
        `/api/doctor/appointments?doctorId=${doctorProfile.id}`,
      );
      if (!res.ok) throw new Error("فشل في تحميل المواعيد");
      return await res.json();
    },
    enabled: !!doctorProfile?.id,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile) => {
      if (!doctorProfile) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest(
        doctorProfile.id ? "PATCH" : "POST",
        doctorProfile.id ? `/api/doctor/${doctorProfile.id}` : "/api/doctor",
        updatedProfile,
      );

      if (!res.ok) throw new Error("فشل في تحديث الملف الشخصي");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/doctor", user?.id], data);
      console.log("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في تحديث الملف الشخصي:", error);
    },
  });

  // Add patient mutation
  const addPatientMutation = useMutation({
    mutationFn: async (patientData) => {
      if (!doctorProfile?.id) throw new Error("الملف الشخصي غير متوفر");

      const res = await apiRequest("POST", "/api/doctor/patients", {
        doctorId: doctorProfile.id,
        ...patientData,
      });

      if (!res.ok) throw new Error("فشل في إضافة المريض");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/doctor/patients", doctorProfile?.id],
      });
      setPatientDialogOpen(false);
      console.log("تمت إضافة المريض بنجاح");
    },
    onError: (error) => {
      console.error("خطأ في إضافة المريض:", error);
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
      education: formData.get("education"),
      certifications: formData.get("certifications"),
      hospitalAffiliation: formData.get("hospitalAffiliation"),
      clinicAddress: formData.get("clinicAddress"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      website: formData.get("website"),
    };

    updateProfileMutation.mutate(updatedProfile);
  };

  // Handle adding a patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const patientData = {
      talentId: parseInt(formData.get("talentId")),
      injuryType: formData.get("injuryType"),
      diagnosis: formData.get("diagnosis"),
      treatmentPlan: formData.get("treatmentPlan"),
      startDate: formData.get("startDate"),
      estimatedRecovery: formData.get("estimatedRecovery"),
    };

    addPatientMutation.mutate(patientData);
  };

  // Handle media upload
  const handleMediaUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadType(null);
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
        <h1 className="text-3xl font-extrabold">لوحة تحكم الطبيب</h1>
        <p className="mt-2 text-muted-foreground">
          مرحباً، د. {doctorProfile?.name || user?.fullName || user?.username}!
          يمكنك إدارة مرضاك ومواعيدك من هنا.
        </p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="patients">المرضى</TabsTrigger>
          <TabsTrigger value="appointments">المواعيد</TabsTrigger>
          <TabsTrigger value="resources">المصادر الطبية</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الطبيب</CardTitle>
                <CardDescription>
                  المعلومات الأساسية والمؤهلات الطبية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={doctorProfile?.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">نبذة تعريفية</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={doctorProfile?.description}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">التخصص</Label>
                      <Select
                        name="specialization"
                        defaultValue={doctorProfile?.specialization || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التخصص" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="إصابات ملاعب">
                            إصابات ملاعب
                          </SelectItem>
                          <SelectItem value="عظام">جراحة عظام</SelectItem>
                          <SelectItem value="طب رياضي">طب رياضي</SelectItem>
                          <SelectItem value="علاج طبيعي">علاج طبيعي</SelectItem>
                          <SelectItem value="تأهيل رياضي">
                            تأهيل رياضي
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">سنوات الخبرة</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        defaultValue={doctorProfile?.experience || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">المؤهلات الأكاديمية</Label>
                    <Textarea
                      id="education"
                      name="education"
                      defaultValue={doctorProfile?.education || ""}
                      rows={3}
                      placeholder="أدخل مؤهلاتك الأكاديمية مفصولة بسطر جديد"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications">الشهادات والتراخيص</Label>
                    <Textarea
                      id="certifications"
                      name="certifications"
                      defaultValue={doctorProfile?.certifications || ""}
                      rows={3}
                      placeholder="أدخل شهاداتك وتراخيصك مفصولة بسطر جديد"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalAffiliation">
                      المستشفى / المركز الصحي
                    </Label>
                    <Input
                      id="hospitalAffiliation"
                      name="hospitalAffiliation"
                      defaultValue={doctorProfile?.hospitalAffiliation || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicAddress">عنوان العيادة</Label>
                    <Input
                      id="clinicAddress"
                      name="clinicAddress"
                      defaultValue={doctorProfile?.clinicAddress || ""}
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
                          doctorProfile?.contactEmail || user?.email || ""
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">رقم الهاتف للتواصل</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        defaultValue={doctorProfile?.contactPhone || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      defaultValue={doctorProfile?.website || ""}
                      placeholder="https://example.com"
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
                <CardDescription>كيف يظهر ملفك الشخصي للزوار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {doctorProfile?.imageUrl ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={doctorProfile.imageUrl}
                      alt={doctorProfile.name}
                      className="aspect-square w-full max-w-[240px] mx-auto object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <User className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        لم يتم تحميل صورة شخصية
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-medium">معلومات الطبيب:</h3>
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">التخصص:</p>
                        <p className="font-medium">
                          {doctorProfile?.specialization || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">
                          المستشفى / المركز الصحي:
                        </p>
                        <p className="font-medium">
                          {doctorProfile?.hospitalAffiliation || "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">الخبرة:</p>
                        <p className="font-medium">
                          {doctorProfile?.experience
                            ? `${doctorProfile.experience} سنوات`
                            : "غير محدد"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">للتواصل:</p>
                        <p className="font-medium">
                          {doctorProfile?.contactEmail}
                          {doctorProfile?.contactPhone &&
                            ` | ${doctorProfile.contactPhone}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/doctor/${doctorProfile?.id || user?.id}`}
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

        {/* Patients Tab */}
        <TabsContent value="patients">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>المرضى والحالات</CardTitle>
                  <CardDescription>
                    قائمة المرضى تحت إشرافك الطبي
                  </CardDescription>
                </div>
                <Button onClick={() => setPatientDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  إضافة مريض
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingPatients ? (
                  <div className="flex h-40 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : patients && patients.length > 0 ? (
                  <Table>
                    <TableCaption>جميع المرضى تحت الإشراف</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المريض</TableHead>
                        <TableHead>نوع الإصابة</TableHead>
                        <TableHead>تاريخ البدء</TableHead>
                        <TableHead>مدة التعافي المتوقعة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={patient.talent.imageUrl}
                                  alt={patient.talent.name}
                                />
                                <AvatarFallback>
                                  {patient.talent.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {patient.talent.name}
                            </div>
                          </TableCell>
                          <TableCell>{patient.injuryType}</TableCell>
                          <TableCell>
                            {new Date(patient.startDate).toLocaleDateString(
                              "ar-SA",
                            )}
                          </TableCell>
                          <TableCell>{patient.estimatedRecovery}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                patient.status === "recovered"
                                  ? "default"
                                  : patient.status === "in-treatment"
                                    ? "secondary"
                                    : patient.status === "critical"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {patient.status === "recovered" && "متعافي"}
                              {patient.status === "in-treatment" &&
                                "تحت العلاج"}
                              {patient.status === "critical" && "حالة حرجة"}
                              {![
                                "recovered",
                                "in-treatment",
                                "critical",
                              ].includes(patient.status) && patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                title="عرض الملف الطبي"
                              >
                                <ClipboardList className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="تحديث الحالة"
                              >
                                <Activity className="h-4 w-4" />
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
                    <Users className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      لا يوجد مرضى تحت إشرافك حالياً
                    </p>
                    <p className="text-sm text-muted-foreground">
                      أضف مرضى جدد لمتابعة حالاتهم
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">تحت العلاج</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {patients?.filter((p) => p.status === "in-treatment")
                      .length || 0}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    حالات تحت الإشراف الطبي حالياً
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">المتعافون</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {patients?.filter((p) => p.status === "recovered").length ||
                      0}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    مرضى اكتملت فترة علاجهم
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">إجمالي المرضى</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {patients?.length || 0}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    العدد الإجمالي للحالات المسجلة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Add Patient Dialog */}
          <Dialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>إضافة مريض جديد</DialogTitle>
                <DialogDescription>
                  أضف مريضاً لمتابعة حالته الصحية وخطة العلاج
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddPatient} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="talentId">اختر اللاعب</Label>
                  <Select name="talentId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر من القائمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">محمد عبدالله</SelectItem>
                      <SelectItem value="3">خالد العلي</SelectItem>
                      <SelectItem value="5">عبدالرحمن سعيد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="injuryType">نوع الإصابة</Label>
                  <Input
                    id="injuryType"
                    name="injuryType"
                    placeholder="مثال: تمزق في الرباط الصليبي"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">التشخيص</Label>
                  <Textarea
                    id="diagnosis"
                    name="diagnosis"
                    placeholder="تفاصيل التشخيص الطبي..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatmentPlan">خطة العلاج</Label>
                  <Textarea
                    id="treatmentPlan"
                    name="treatmentPlan"
                    placeholder="خطوات ومراحل العلاج..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">تاريخ بدء العلاج</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedRecovery">
                      مدة التعافي المتوقعة
                    </Label>
                    <Input
                      id="estimatedRecovery"
                      name="estimatedRecovery"
                      placeholder="مثال: 6 أسابيع"
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setPatientDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={addPatientMutation.isPending}>
                    {addPatientMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإضافة...
                      </>
                    ) : (
                      "إضافة المريض"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>المواعيد القادمة</CardTitle>
              <CardDescription>جدول المواعيد والكشوفات الطبية</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAppointments ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : appointments && appointments.length > 0 ? (
                <Table>
                  <TableCaption>جميع المواعيد القادمة</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المريض</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الوقت</TableHead>
                      <TableHead>نوع الموعد</TableHead>
                      <TableHead>ملاحظات</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={appointment.talent.imageUrl}
                                alt={appointment.talent.name}
                              />
                              <AvatarFallback>
                                {appointment.talent.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {appointment.talent.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(appointment.date).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {appointment.notes || "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="تعديل الموعد"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="إلغاء الموعد"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm">
                              <Mail className="mr-2 h-4 w-4" />
                              تذكير
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center">
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    لا توجد مواعيد قادمة
                  </p>
                  <p className="text-sm text-muted-foreground">
                    أضف مواعيد جديدة لتنظيم جدولك
                  </p>
                  <Button className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    إضافة موعد جديد
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>المصادر الطبية</CardTitle>
              <CardDescription>
                منشورات ومقالات حول الإصابات الرياضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">المنشورات الطبية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex h-32 flex-col items-center justify-center">
                      <Stethoscope className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        لا توجد منشورات طبية
                      </p>
                      <Button className="mt-4" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        إضافة منشور
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">المقالات التوعوية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex h-32 flex-col items-center justify-center">
                      <Heart className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">
                        لا توجد مقالات توعوية
                      </p>
                      <Button className="mt-4" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        إضافة مقال
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                      <p className="font-medium">عرض بيانات التواصل للعامة</p>
                      <p className="text-sm text-muted-foreground">
                        السماح بعرض بيانات التواصل في صفحتك العامة
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      تعديل
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">إشعارات المواعيد</p>
                      <p className="text-sm text-muted-foreground">
                        إدارة إشعارات المواعيد والتذكيرات
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
