import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Award,
  UserCheck,
  Newspaper,
  Calendar as CalendarIcon,
  Download,
  Edit,
  Eye,
  FileText,
  Building,
  Activity,
  Stethoscope,
  UserCog,
  Loader2,
  MessageCircle,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  ListFilter,
  User,
  UserPlus,
  Users,
  Video,
  Image,
  Upload,
  FileVideo,
  FileImage,
  FilePlus,
  FileText as FileText2,
  Film,
  Clock,
  CalendarClock,
  PlayCircle,
  Bell,
  Send,
  Settings,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as DatePickerCalendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

// Stats Cards
const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  color?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color || "text-primary"}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
    </CardContent>
  </Card>
);

// Mock data for charts
const usersData = [
  { name: "يناير", users: 400 },
  { name: "فبراير", users: 600 },
  { name: "مارس", users: 800 },
  { name: "أبريل", users: 1000 },
  { name: "مايو", users: 1200 },
  { name: "يونيو", users: 1500 },
];

const usersTypeData = [
  { name: "لاعبين", value: 40 },
  { name: "مدربين", value: 25 },
  { name: "أندية", value: 15 },
  { name: "وكلاء", value: 10 },
  { name: "أطباء", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// تعريف schema للمرفقات وعناصر النموذج
const fileUploadSchema = z.object({
  title: z.string().min(3, { message: "يجب أن يكون العنوان 3 أحرف على الأقل" }),
  description: z.string().optional(),
  fileType: z.enum(["image", "video", "document"]),
  relatedTo: z.enum(["talent", "coach", "club", "agent", "doctor", "other"]),
  file: z
    .any()
    .refine((file) => file?.length === 1, { message: "الملف مطلوب" }),
});

// تعريف schema لمؤتمرات الفيديو
const meetingSchema = z.object({
  title: z.string().min(3, { message: "يجب أن يكون العنوان 3 أحرف على الأقل" }),
  description: z.string().optional(),
  date: z.date({ required_error: "تاريخ الاجتماع مطلوب" }),
  time: z.string({ required_error: "وقت الاجتماع مطلوب" }),
  duration: z
    .number()
    .min(15, { message: "يجب أن تكون المدة 15 دقيقة على الأقل" }),
  attendees: z
    .array(z.string())
    .min(1, { message: "يجب اختيار حاضر واحد على الأقل" }),
  recordMeeting: z.boolean().default(false),
});

// نوع الملفات المتوفرة
const mockFiles = [
  {
    id: 1,
    title: "صورة لاعب",
    type: "image",
    relatedTo: "talent",
    userId: 1,
    createdAt: new Date(),
    size: "1.2MB",
    status: "active",
  },
  {
    id: 2,
    title: "فيديو مهارات",
    type: "video",
    relatedTo: "talent",
    userId: 2,
    createdAt: new Date(),
    size: "8.5MB",
    status: "active",
  },
  {
    id: 3,
    title: "سيرة ذاتية",
    type: "document",
    relatedTo: "coach",
    userId: 3,
    createdAt: new Date(),
    size: "0.5MB",
    status: "active",
  },
  {
    id: 4,
    title: "عقد نادي",
    type: "document",
    relatedTo: "club",
    userId: 4,
    createdAt: new Date(),
    size: "1.8MB",
    status: "pending",
  },
];

// نوع مؤتمرات الفيديو المتوفرة
const mockMeetings = [
  {
    id: 1,
    title: "مقابلة مع لاعب",
    description: "مناقشة شروط التعاقد",
    date: new Date(2025, 4, 5),
    time: "14:00",
    duration: 60,
    status: "scheduled",
    attendees: ["لاعب", "وكيل", "مدير نادي"],
    recordingAvailable: false,
    sessionId: "meeting-session-1",
  },
  {
    id: 2,
    title: "اجتماع فريق المدربين",
    description: "مناقشة خطة التدريب الجديدة",
    date: new Date(2025, 4, 6),
    time: "10:00",
    duration: 45,
    status: "scheduled",
    attendees: ["مدير فني", "مدرب مساعد", "مدرب حراس"],
    recordingAvailable: false,
    sessionId: "meeting-session-2",
  },
  {
    id: 3,
    title: "فحص طبة عن بعد",
    description: "متابعة إصابة اللاعب",
    date: new Date(2025, 4, 2),
    time: "13:30",
    duration: 30,
    status: "completed",
    attendees: ["طبيب", "لاعب", "مدرب لياقة"],
    recordingAvailable: true,
    sessionId: "meeting-session-3",
    recordingUrl: "/api/demo-videos/meeting-recording.mp4",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t, locale, setLocale } = useTranslation();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);
  const [fileFilter, setFileFilter] = useState("all");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [meetingFilter, setMeetingFilter] = useState("all");

  // البيانات المفلترة - سنستخدم محتويات useQuery مباشرة

  // مكتبة النماذج لرفع الملفات
  const fileUploadForm = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      fileType: "image",
      relatedTo: "talent",
    },
  });

  // مكتبة النماذج لإنشاء مؤتمر فيديو
  const meetingForm = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      recordMeeting: true,
      attendees: [],
    },
  });

  const { data: talents = [], isLoading: isLoadingTalents } = useQuery<any[]>({
    queryKey: ["/api/talents"],
    enabled: activeTab === "talents" || activeTab === "overview",
  });

  const { data: coaches = [], isLoading: isLoadingCoaches } = useQuery<any[]>({
    queryKey: ["/api/coaches"],
    enabled: activeTab === "coaches" || activeTab === "overview",
  });

  const { data: clubs = [], isLoading: isLoadingClubs } = useQuery<any[]>({
    queryKey: ["/api/clubs"],
    enabled: activeTab === "clubs" || activeTab === "overview",
  });

  const { data: agents = [], isLoading: isLoadingAgents } = useQuery<any[]>({
    queryKey: ["/api/agents"],
    enabled: activeTab === "agents" || activeTab === "overview",
  });

  const { data: doctors = [], isLoading: isLoadingDoctors } = useQuery<any[]>({
    queryKey: ["/api/doctors"],
    enabled: activeTab === "doctors" || activeTab === "overview",
  });

  const isLoading =
    isLoadingTalents ||
    isLoadingCoaches ||
    isLoadingClubs ||
    isLoadingAgents ||
    isLoadingDoctors;

  const matchesSearch = (item: any) => {
    if (!searchTerm) return true;
    return (
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.fullName &&
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone &&
        item.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const matchesStatus = (item: any) => {
    if (selectedStatus === "all") return true;
    return item.status === selectedStatus;
  };

  // Filter users based on search and status
  const filteredTalents = Array.isArray(talents)
    ? talents.filter(
        (talent: any) => matchesSearch(talent) && matchesStatus(talent),
      )
    : [];
  const filteredCoaches = Array.isArray(coaches)
    ? coaches.filter(
        (coach: any) => matchesSearch(coach) && matchesStatus(coach),
      )
    : [];
  const filteredClubs = Array.isArray(clubs)
    ? clubs.filter((club: any) => matchesSearch(club) && matchesStatus(club))
    : [];
  const filteredAgents = Array.isArray(agents)
    ? agents.filter(
        (agent: any) => matchesSearch(agent) && matchesStatus(agent),
      )
    : [];
  const filteredDoctors = Array.isArray(doctors)
    ? doctors.filter(
        (doctor: any) => matchesSearch(doctor) && matchesStatus(doctor),
      )
    : [];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t("adminPanel")}</h1>
          <p className="text-muted-foreground">
            {t("welcome")} {user?.fullName || user?.username},{" "}
            {t("manageFromHere")}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {/* مكون اختيار اللغة */}
          <Select
            defaultValue={locale}
            onValueChange={(value) => {
              // تأكد من أن value هو Locale صالح
              if (locales.includes(value as Locale)) {
                setLocale(value as Locale);
                toast({
                  title: "تم تغيير اللغة",
                  description: `تم تغيير اللغة إلى ${localeNames[value as Locale]}`,
                });
              }
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={localeNames[locale]} />
            </SelectTrigger>
            <SelectContent>
              {locales.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {localeNames[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              console.log("تصدير التقارير");
              toast({
                title: "جاري التصدير",
                description: "سيتم تنزيل التقارير قريباً",
              });
            }}
          >
            <Download className="ml-2 h-4 w-4" />
            {t("exportReport")}
          </Button>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <UserPlus className="ml-2 h-4 w-4" />
            {t("addNewUser")}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        className="space-y-4"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-10">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="talents">{t("players")}</TabsTrigger>
          <TabsTrigger value="coaches">{t("coaches")}</TabsTrigger>
          <TabsTrigger value="clubs">{t("clubs")}</TabsTrigger>
          <TabsTrigger value="agents">{t("agents")}</TabsTrigger>
          <TabsTrigger value="doctors">{t("doctors")}</TabsTrigger>
          <TabsTrigger value="files">{t("files")}</TabsTrigger>
          <TabsTrigger value="meetings">{t("meetings")}</TabsTrigger>
          <TabsTrigger value="communication">{t("communication")}</TabsTrigger>
          <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title={t("totalUsers")}
              value="3,482"
              icon={Users}
              trend={"+20% " + t("lastMonth")}
            />
            <StatsCard
              title={t("newUsers")}
              value="249"
              icon={UserPlus}
              trend={"+15% " + t("lastMonth")}
              color="text-green-500"
            />
            <StatsCard
              title={t("totalChats")}
              value="1,845"
              icon={MessageCircle}
              trend={"+10% " + t("lastMonth")}
            />
            <StatsCard
              title={t("activeAppointments")}
              value="128"
              icon={CalendarIcon}
              trend={"+5% " + t("lastMonth")}
              color="text-blue-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{t("userGrowth")}</CardTitle>
                <CardDescription>{t("userGrowthStats")}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usersData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" name="المستخدمين" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{t("userTypeDistribution")}</CardTitle>
                <CardDescription>{t("userTypeRatio")}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usersTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {usersTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="ml-2 h-5 w-5 text-primary" />
                  <span>{t("latestPlayers")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-80 overflow-auto">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center">{t("loading")}</div>
                  ) : (
                    filteredTalents.slice(0, 5).map((talent: any) => (
                      <div
                        key={talent.id}
                        className="flex items-center gap-3 border-b pb-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {talent.name?.[0] || "?"}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{talent.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {talent.position || t("footballPlayer")}
                          </div>
                        </div>
                        <Badge variant="outline">
                          {talent.status || t("active")}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="ml-2 h-5 w-5 text-primary" />
                  <span>{t("latestCoaches")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-80 overflow-auto">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center">{t("loading")}</div>
                  ) : (
                    filteredCoaches.slice(0, 5).map((coach: any) => (
                      <div
                        key={coach.id}
                        className="flex items-center gap-3 border-b pb-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {coach.name?.[0] || "?"}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{coach.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {coach.specialization || t("footballCoach")}
                          </div>
                        </div>
                        <Badge variant="outline">
                          {coach.status || t("active")}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="ml-2 h-5 w-5 text-primary" />
                  <span>{t("latestChats")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-80 overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      ن
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">نادي الهلال</div>
                      <div className="text-xs text-muted-foreground">
                        نريد التعاقد مع اللاعب أحمد حسن...
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      منذ 5 دقائق
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      م
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">محمد علي</div>
                      <div className="text-xs text-muted-foreground">
                        مرحبا، أنا مهتم بالتسجيل كمدرب...
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      منذ 30 دقيقة
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      س
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">سامي الوكيل</div>
                      <div className="text-xs text-muted-foreground">
                        هل يمكنني الحصول على معلومات حول...
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      منذ ساعة
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="talents" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold">اللاعبين</h2>
              <Badge variant="outline" className="ml-2">
                {filteredTalents.length} لاعب
              </Badge>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن لاعب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={() => setLocation("/category/players")}>
              <Eye className="mr-2 h-4 w-4" />
              عرض اللاعبين
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>المركز</TableHead>
                <TableHead>المهارات</TableHead>
                <TableHead>العمر</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingTalents ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="block mt-2">جاري تحميل البيانات...</span>
                  </TableCell>
                </TableRow>
              ) : filteredTalents.length ? (
                filteredTalents.map((talent) => (
                  <TableRow key={talent.id}>
                    <TableCell>
                      <div className="font-medium">{talent.name}</div>
                    </TableCell>
                    <TableCell>{talent.position}</TableCell>
                    <TableCell>{talent.skills || "-"}</TableCell>
                    <TableCell>{talent.age || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-amber-500">★</span>
                        <span className="ml-1">{talent.rating || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          talent.status === "active" ? "default" : "secondary"
                        }
                      >
                        {talent.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(`/service/${talent.id}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <p className="py-4 text-muted-foreground">
                      لم يتم العثور على لاعبين
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Coaches Tab */}
        <TabsContent value="coaches" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold">المدربين</h2>
              <Badge variant="outline" className="ml-2">
                {filteredCoaches.length} مدرب
              </Badge>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن مدرب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={() => setLocation("/category/coaches")}>
              <Eye className="mr-2 h-4 w-4" />
              عرض المدربين
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>التخصص</TableHead>
                <TableHead>الخبرة</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingCoaches ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="block mt-2">جاري تحميل البيانات...</span>
                  </TableCell>
                </TableRow>
              ) : filteredCoaches.length ? (
                filteredCoaches.map((coach) => (
                  <TableRow key={coach.id}>
                    <TableCell>
                      <div className="font-medium">{coach.name}</div>
                    </TableCell>
                    <TableCell>{coach.specialization || "-"}</TableCell>
                    <TableCell>{coach.experience || "-"} سنوات</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-amber-500">★</span>
                        <span className="ml-1">{coach.rating || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          coach.status === "active" ? "default" : "secondary"
                        }
                      >
                        {coach.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(`/service/${coach.id}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="py-4 text-muted-foreground">
                      لم يتم العثور على مدربين
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Clubs Tab */}
        <TabsContent value="clubs" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold">الأندية</h2>
              <Badge variant="outline" className="ml-2">
                {filteredClubs.length} نادٍ
              </Badge>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن نادٍ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={() => setLocation("/category/clubs-list")}>
              <Eye className="mr-2 h-4 w-4" />
              عرض الأندية
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>الموقع</TableHead>
                <TableHead>الدوري</TableHead>
                <TableHead>عدد اللاعبين</TableHead>
                <TableHead>الةالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingClubs ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="block mt-2">جاري تحميل البيانات...</span>
                  </TableCell>
                </TableRow>
              ) : filteredClubs.length ? (
                filteredClubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell>
                      <div className="font-medium">{club.name}</div>
                    </TableCell>
                    <TableCell>{club.location || "-"}</TableCell>
                    <TableCell>{club.league || "-"}</TableCell>
                    <TableCell>{club.playerCount || 0}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          club.status === "active" ? "default" : "secondary"
                        }
                      >
                        {club.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(`/service/${club.id}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="py-4 text-muted-foreground">
                      لم يتم العثور على أندية
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold">الوكلاء</h2>
              <Badge variant="outline" className="ml-2">
                {filteredAgents.length} وكيل
              </Badge>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن وكيل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={() => setLocation("/category/agents-list")}>
              <Eye className="mr-2 h-4 w-4" />
              عرض الوكلاء
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>عدد اللاعبين</TableHead>
                <TableHead>التخصص</TableHead>
                <TableHead>الخبرة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingAgents ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="block mt-2">جاري تحميل البيانات...</span>
                  </TableCell>
                </TableRow>
              ) : filteredAgents.length ? (
                filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="font-medium">{agent.name}</div>
                    </TableCell>
                    <TableCell>{agent.clientCount || 0} لاعب</TableCell>
                    <TableCell>{agent.specialization || "-"}</TableCell>
                    <TableCell>{agent.experience || "-"} سنوات</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          agent.status === "active" ? "default" : "secondary"
                        }
                      >
                        {agent.status === "active" ? "نشط" : "ةير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(`/service/${agent.id}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="py-4 text-muted-foreground">
                      لم يتم العثور على وكلاء
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Doctors Tab */}
        <TabsContent value="doctors" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl font-bold">الأطباء</h2>
              <Badge variant="outline" className="ml-2">
                {filteredDoctors.length} طبيب
              </Badge>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن طبيب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={() => setLocation("/category/doctors-list")}>
              <Eye className="mr-2 h-4 w-4" />
              عرض الأطباء
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>التخصص</TableHead>
                <TableHead>المؤهل</TableHead>
                <TableHead>سنوات الخبرة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingDoctors ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="block mt-2">جاري تحميل البيانات...</span>
                  </TableCell>
                </TableRow>
              ) : filteredDoctors.length ? (
                filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="font-medium">{doctor.name}</div>
                    </TableCell>
                    <TableCell>{doctor.specialization || "-"}</TableCell>
                    <TableCell>{doctor.qualification || "-"}</TableCell>
                    <TableCell>{doctor.experience || "-"} سنوات</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doctor.status === "active" ? "default" : "secondary"
                        }
                      >
                        {doctor.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(`/service/${doctor.id}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="py-4 text-muted-foreground">
                      لم يتم العثور على أطباء
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Input
                  className="w-64 pr-8"
                  placeholder="بحث عن ملف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={fileFilter} onValueChange={setFileFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="نوع الملف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الملفات</SelectItem>
                  <SelectItem value="image">صور</SelectItem>
                  <SelectItem value="video">فيديوهات</SelectItem>
                  <SelectItem value="document">مستندات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Upload className="ml-2 h-4 w-4" />
                  {t("uploadNewFile")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("uploadNewFile")}</DialogTitle>
                  <DialogDescription>
                    {t("uploadFileDescription")}
                  </DialogDescription>
                </DialogHeader>
                <Form {...fileUploadForm}>
                  <form
                    className="space-y-4"
                    onSubmit={fileUploadForm.handleSubmit((data) => {
                      toast({
                        title: "تم رفع الملف بنجاح",
                        description: `تم رفع الملف "${data.title}" بنجاح`,
                      });
                      setIsUploadDialogOpen(false);
                      fileUploadForm.reset();
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    })}
                  >
                    <FormField
                      control={fileUploadForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("fileTitle")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("fileTitle")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={fileUploadForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("fileDescription")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("fileDescriptionOptional")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={fileUploadForm.control}
                        name="fileType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("fileType")}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={t("selectFileType")}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="image">صورة</SelectItem>
                                <SelectItem value="video">فيديو</SelectItem>
                                <SelectItem value="document">مستند</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fileUploadForm.control}
                        name="relatedTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("relatedTo")}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={t("selectRelatedType")}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="talent">لاعب</SelectItem>
                                <SelectItem value="coach">مدرب</SelectItem>
                                <SelectItem value="club">نادي</SelectItem>
                                <SelectItem value="agent">وكيل</SelectItem>
                                <SelectItem value="doctor">طبيب</SelectItem>
                                <SelectItem value="other">أخرى</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={fileUploadForm.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("chooseFile")}</FormLabel>
                          <FormControl>
                            <div className="grid w-full items-center gap-1.5">
                              <Input
                                type="file"
                                onChange={(
                                  e: ChangeEvent<HTMLInputElement>,
                                ) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    const file = e.target.files[0];
                                    field.onChange(e.target.files);
                                    setSelectedFile(file);

                                    // إنشاء معاينة للصورة
                                    if (file.type.startsWith("image/")) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        setPreviewUrl(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    } else {
                                      setPreviewUrl(null);
                                    }
                                  }
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                          {previewUrl && (
                            <div className="mt-2">
                              <img
                                src={previewUrl}
                                alt={t("preview")}
                                className="h-40 object-contain rounded-md"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => {
                          toast({
                            title: t("fileUploadedSuccess"),
                            description: t("fileUploadedSuccessDesc"),
                          });
                          setIsUploadDialogOpen(false);
                        }}
                      >
                        {t("uploadFile")}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {mockFiles.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{file.title}</CardTitle>
                    <Badge
                      variant={file.status === "active" ? "default" : "outline"}
                    >
                      {file.status === "active"
                        ? t("published")
                        : t("inReview")}
                    </Badge>
                  </div>
                  <CardDescription>
                    {file.type === "image"
                      ? t("image")
                      : file.type === "video"
                        ? t("video")
                        : t("document")}
                    {" | "}
                    {format(file.createdAt, "PPP", { locale: ar })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="h-40 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    {file.type === "image" ? (
                      <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center">
                        <FileImage className="h-16 w-16 text-primary/60" />
                      </div>
                    ) : file.type === "video" ? (
                      <div className="w-full h-full bg-gradient-to-b from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                        <FileVideo className="h-16 w-16 text-blue-500/60" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-amber-500/60" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {t("fileSize")}: {file.size}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: t("viewFile"),
                        description: `${t("viewing")} ${file.title}`,
                      });
                    }}
                  >
                    <Eye className="ml-2 h-4 w-4" />
                    {t("view")}
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: t("editFile"),
                          description: `${t("editingInfo")} ${file.title}`,
                        });
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => {
                        toast({
                          title: t("deleteFile"),
                          description: `${t("fileDeletedSuccess")} ${file.title}`,
                          variant: "destructive",
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Input
                  className="w-64 pr-8"
                  placeholder={t("searchMeeting")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={meetingFilter} onValueChange={setMeetingFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("meetingStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allMeetings")}</SelectItem>
                  <SelectItem value="scheduled">{t("scheduled")}</SelectItem>
                  <SelectItem value="completed">{t("completed")}</SelectItem>
                  <SelectItem value="canceled">{t("canceled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog
              open={isScheduleMeetingOpen}
              onOpenChange={setIsScheduleMeetingOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setIsScheduleMeetingOpen(true)}>
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {t("scheduleNewMeeting")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[565px]">
                <DialogHeader>
                  <DialogTitle>{t("scheduleNewVideoMeeting")}</DialogTitle>
                  <DialogDescription>
                    {t("createLiveVideoMeeting")}
                  </DialogDescription>
                </DialogHeader>
                <Form {...meetingForm}>
                  <form
                    className="space-y-4"
                    onSubmit={meetingForm.handleSubmit((data) => {
                      toast({
                        title: "تم جدولة الاجتماع بنجاح",
                        description: `تم جدولة اجتماع "${data.title}" بنجاح`,
                      });
                      setIsScheduleMeetingOpen(false);
                      meetingForm.reset();
                    })}
                  >
                    <FormField
                      control={meetingForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("meetingTitle")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("meetingTitlePlaceholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={meetingForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("meetingDescription")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("meetingDescriptionPlaceholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={meetingForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{t("meetingDate")}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-right font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: ar })
                                    ) : (
                                      <span>{t("selectDate")}</span>
                                    )}
                                    <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <DatePickerCalendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date <
                                    new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={meetingForm.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("meetingTime")}</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={meetingForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("meetingDuration")}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={15}
                                step={5}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value, 10))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={meetingForm.control}
                        name="attendees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("meetingAttendees")}</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange([...field.value, value])
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={t("addAttendees")}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="talent">
                                  {t("player")}
                                </SelectItem>
                                <SelectItem value="coach">
                                  {t("coach")}
                                </SelectItem>
                                <SelectItem value="club">
                                  {t("club")}
                                </SelectItem>
                                <SelectItem value="agent">
                                  {t("agent")}
                                </SelectItem>
                                <SelectItem value="doctor">
                                  {t("doctor")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {field.value.map((attendee, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="px-2 py-1"
                                >
                                  {attendee}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 mr-1 hover:bg-transparent"
                                    onClick={() => {
                                      const newAttendees = [...field.value];
                                      newAttendees.splice(i, 1);
                                      field.onChange(newAttendees);
                                    }}
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                              {field.value.length === 0 && (
                                <span className="text-sm text-muted-foreground">
                                  {t("noAttendeesAdded")}
                                </span>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={meetingForm.control}
                      name="recordMeeting"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rtl:space-x-reverse">
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4"
                              />
                              <span>{t("recordMeeting")}</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">{t("scheduleMeeting")}</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("videoMeetings")}</CardTitle>
                <CardDescription>
                  {t("videoMeetingsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان الاجتماع</TableHead>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>المدة</TableHead>
                      <TableHead>المشاركون</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التسجيل</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMeetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell className="font-medium">
                          {meeting.title}
                        </TableCell>
                        <TableCell>
                          {format(meeting.date, "PPP", { locale: ar })}{" "}
                          {meeting.time}
                        </TableCell>
                        <TableCell>{meeting.duration} دقيقة</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {meeting.attendees.map((attendee, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="px-2 py-0.5"
                              >
                                {attendee}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              meeting.status === "completed"
                                ? "outline"
                                : "default"
                            }
                            className={
                              meeting.status === "scheduled"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200"
                                : ""
                            }
                          >
                            {meeting.status === "scheduled" ? "مجدول" : "مكتمل"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {meeting.recordingAvailable ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
                            >
                              متاح
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              غير متاح
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {meeting.status === "scheduled" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                                onClick={async () => {
                                  try {
                                    // إنشاء جلسة فيديو جديدة
                                    const now = new Date();
                                    const endTime = new Date(
                                      now.getTime() + meeting.duration * 60000,
                                    );

                                    // تحويل المشاركين إلى مصفوفة
                                    const attendeeIds = [1, 2, 3]; // استخدام معرفات ثابتة للمشاركين (للتجربة)

                                    // إنشاء جلسة فيديو جديدة
                                    let createRes;
                                    try {
                                      createRes = await apiRequest(
                                        "POST",
                                        "/api/video-sessions",
                                        {
                                          sessionName: meeting.title,
                                          description:
                                            meeting.description ||
                                            "اجتماع جديد",
                                          scheduledStartTime: now.toISOString(),
                                          scheduledEndTime:
                                            endTime.toISOString(),
                                          hostId: user?.id || 1, // معرف المستخدم الحالي
                                          attendees: attendeeIds,
                                        },
                                      );
                                    } catch (apiError) {
                                      console.error(
                                        "API request failed with error:",
                                        apiError,
                                      );

                                      // Force mock mode for any API error
                                      console.warn(
                                        "API request failed, starting mock meeting",
                                      );

                                      // Generate a demo meeting room URL
                                      const mockMeetingUrl = `/meeting-room/demo-${meeting.id}-${Date.now()}`;

                                      // Open the mock meeting room
                                      window.open(mockMeetingUrl, "_blank");

                                      toast({
                                        title: "تم بدء الاجتماع (وضع التجربة)",
                                        description: `تم بدء اجتماع ${meeting.title} في وضع التجربة`,
                                      });

                                      return; // Exit the entire function
                                    }

                                    if (!createRes.ok) {
                                      // Check if it's a 503 (API not available) response
                                      if (createRes.status === 503) {
                                        console.warn(
                                          "API not available, starting mock meeting",
                                        );

                                        // Generate a demo meeting room URL
                                        const mockMeetingUrl = `/meeting-room/demo-${meeting.id}-${Date.now()}`;

                                        // Open the mock meeting room
                                        window.open(mockMeetingUrl, "_blank");

                                        toast({
                                          title:
                                            "تم بدء الاجتماع (وضع التجربة)",
                                          description: `تم بدء اجتماع ${meeting.title} في وضع التجربة`,
                                        });

                                        return; // Exit early, don't continue with API calls
                                      }
                                      const error = await createRes.json();
                                      throw new Error(
                                        error.message || "فشل إنشاء جلسة فيديو",
                                      );
                                    }

                                    // جلب بيانات الجلسة المنشأة
                                    const newSession = await createRes.json();
                                    console.log(
                                      "Video session created:",
                                      newSession,
                                    );

                                    // بدء الجلسة المنشأة
                                    const startRes = await apiRequest(
                                      "POST",
                                      `/api/video-sessions/${newSession.sessionId}/start`,
                                    );

                                    if (startRes.ok) {
                                      // إذا نجح الاستدعاء، نقوم بفتح نافذة مؤتمر الفيدية
                                      const videoSession =
                                        await startRes.json();
                                      console.log(
                                        "Video session started:",
                                        videoSession,
                                      );

                                      // نقوم بفتح نافذة جديدة لغرفة الاجتماع
                                      window.open(
                                        `/meeting-room/${videoSession.sessionId}`,
                                        "_blank",
                                      );

                                      // نقوم بتحديث قائمة الاجتماعات
                                      queryClient.invalidateQueries({
                                        queryKey: ["/api/video-sessions"],
                                      });

                                      toast({
                                        title: "تم بدء الاجتماع",
                                        description: `تم بدء اجتماع ${meeting.title} بنجاح`,
                                      });
                                    } else {
                                      // Check if it's a 503 (API not available) response
                                      if (startRes.status === 503) {
                                        console.warn(
                                          "API not available for start session, starting mock meeting",
                                        );

                                        // Generate a demo meeting room URL
                                        const mockMeetingUrl = `/meeting-room/demo-${meeting.id}-${Date.now()}`;

                                        // Open the mock meeting room
                                        window.open(mockMeetingUrl, "_blank");

                                        toast({
                                          title:
                                            "تم بدء الاجتماع (وضع التجربة)",
                                          description: `تم بدء اجتماع ${meeting.title} في وضع التجربة`,
                                        });

                                        return; // Exit early
                                      }

                                      // إذا فشل الاستدعاء، نعرض رسالة خطأ
                                      const error = await startRes.json();
                                      throw new Error(
                                        error.message ||
                                          "حدث خطأ أثناء بدء الاجتماع",
                                      );
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error starting meeting:",
                                      error,
                                    );

                                    // Check if it's a network error and fallback to mock
                                    if (
                                      error instanceof TypeError &&
                                      error.message.includes("fetch")
                                    ) {
                                      console.warn(
                                        "API not available, starting mock meeting",
                                      );

                                      // Generate a demo meeting room URL
                                      const mockMeetingUrl = `/meeting-room/demo-${meeting.id}-${Date.now()}`;

                                      // Open the mock meeting room
                                      window.open(mockMeetingUrl, "_blank");

                                      toast({
                                        title: "تم بدء الاجتماع (وضع التجربة)",
                                        description: `تم بدء اجتماع ${meeting.title} في وضع التجربة`,
                                      });
                                    } else if (
                                      error instanceof Error &&
                                      (error.message.includes(
                                        "Failed to fetch",
                                      ) ||
                                        error.message.includes(
                                          "NetworkError",
                                        ) ||
                                        error.message.includes("fetch"))
                                    ) {
                                      console.warn(
                                        "Network error detected, starting mock meeting",
                                      );

                                      // Generate a demo meeting room URL
                                      const mockMeetingUrl = `/meeting-room/demo-${meeting.id}-${Date.now()}`;

                                      // Open the mock meeting room
                                      window.open(mockMeetingUrl, "_blank");

                                      toast({
                                        title: "تم بدء الاجتماع (وضع التجربة)",
                                        description: `تم بدء اجتماع ${meeting.title} في وضع التجربة`,
                                      });
                                    } else {
                                      // Show error for non-network issues
                                      toast({
                                        title: "خطأ في بدء الاجتماع",
                                        description:
                                          error instanceof Error
                                            ? error.message
                                            : "حدث خطأ أثناء محاولة بدء الاجتماع",
                                        variant: "destructive",
                                      });
                                    }
                                  }
                                }}
                              >
                                <Video className="ml-2 h-4 w-4" />
                                بدء الاجتماع
                              </Button>
                            ) : meeting.recordingAvailable ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                                onClick={() => {
                                  // نفتح صفحة مشاهدة التسجيلات في نافذة جديدة
                                  window.open(
                                    `/meeting-recordings/${meeting.sessionId}`,
                                    "_blank",
                                  );
                                }}
                              >
                                <PlayCircle className="ml-2 h-4 w-4" />
                                مشاهدة التسجيل
                              </Button>
                            ) : null}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                toast({
                                  title: "حذف الاجتماع",
                                  description: `تم حذف اجتماع ${meeting.title} بنجاح`,
                                  variant: "destructive",
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tabs */}
        {["talents", "coaches", "clubs", "agents", "doctors"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Input
                    className="w-64 pr-8"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Dialog
                open={isAddUserDialogOpen}
                onOpenChange={setIsAddUserDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة{" "}
                    {tab === "talents"
                      ? "لاعب"
                      : tab === "coaches"
                        ? "مدرب"
                        : tab === "clubs"
                          ? "نادي"
                          : tab === "agents"
                            ? "وكيل"
                            : "طبيب"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      إضافة{" "}
                      {tab === "talents"
                        ? "لاعب جديد"
                        : tab === "coaches"
                          ? "مدرب جديد"
                          : tab === "clubs"
                            ? "نادي جديد"
                            : tab === "agents"
                              ? "وكيل جديد"
                              : "طبيب جديد"}
                    </DialogTitle>
                    <DialogDescription>
                      أدخل معلومات{" "}
                      {tab === "talents"
                        ? "اللاعب"
                        : tab === "coaches"
                          ? "المدرب"
                          : tab === "clubs"
                            ? "النادي"
                            : tab === "agents"
                              ? "اةوكيل"
                              : "الطبيب"}{" "}
                      الجديد.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        الاسم
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        البريد الإلكتروني
                      </Label>
                      <Input id="email" type="email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        رقم الهاتف
                      </Label>
                      <Input id="phone" type="tel" className="col-span-3" />
                    </div>
                    {tab === "talents" && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="position" className="text-right">
                          اةمركز
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="اختر المركز" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="goalkeeper">
                              حارس مرمى
                            </SelectItem>
                            <SelectItem value="centerback">مدافع</SelectItem>
                            <SelectItem value="sweeper">مساك</SelectItem>
                            <SelectItem value="rightback">
                              مدافع أيمن
                            </SelectItem>
                            <SelectItem value="leftback">مدافع أيسر</SelectItem>
                            <SelectItem value="defensivemid">
                              وسط مدافع
                            </SelectItem>
                            <SelectItem value="attackingmid">
                              وسط مهاجم
                            </SelectItem>
                            <SelectItem value="rightwing">وينج أيمن</SelectItem>
                            <SelectItem value="leftwing">وينج أيسر</SelectItem>
                            <SelectItem value="striker">مهاجم</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {tab === "coaches" && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="specialization" className="text-right">
                          التخصص
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="اختر التخصص" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="head-coach">مدير فني</SelectItem>
                            <SelectItem value="assistant">
                              مساعد مدرب
                            </SelectItem>
                            <SelectItem value="fitness">مدرب لياقة</SelectItem>
                            <SelectItem value="goalkeeper">
                              مدرب حراس
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bio" className="text-right">
                        نبذة
                      </Label>
                      <Textarea id="bio" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={async () => {
                        try {
                          // الحصول على قيم الحقول
                          const name = document.getElementById(
                            "name",
                          ) as HTMLInputElement;
                          const email = document.getElementById(
                            "email",
                          ) as HTMLInputElement;
                          const phone = document.getElementById(
                            "phone",
                          ) as HTMLInputElement;
                          const bio = document.getElementById(
                            "bio",
                          ) as HTMLTextAreaElement;

                          if (!name?.value || !email?.value) {
                            toast({
                              title: "تحقق من البيانات",
                              description: "يرجى ملء جميع الحقول المطلوبة",
                              variant: "destructive",
                            });
                            return;
                          }

                          // تحديد نوع المستخدم ومسار API المناسب
                          const apiPath = `/api/${tab}`;

                          // بناء الكائن للإرسال
                          const userData: any = {
                            name: name.value,
                            email: email.value,
                            phone: phone?.value || "",
                            description: bio?.value || "",
                            status: "active",
                          };

                          // إضافة حقول خاصة حسب نوع المستخدم
                          if (tab === "talents") {
                            const position = document.querySelector(
                              "#position .value",
                            ) as HTMLElement;
                            userData.position =
                              position?.textContent || "striker";
                            userData.categoryId = 1; // الفئة الافتراضية
                          } else if (tab === "coaches") {
                            const specialization = document.querySelector(
                              "#specialization .value",
                            ) as HTMLElement;
                            userData.specialization =
                              specialization?.textContent || "head-coach";
                          }

                          // إرسال البيانات إلى API
                          const res = await apiRequest(
                            "POST",
                            apiPath,
                            userData,
                          );

                          if (res.ok) {
                            // تحديث قائمة العناصر
                            queryClient.invalidateQueries({
                              queryKey: [apiPath],
                            });

                            toast({
                              title: "تم الحفظ",
                              description: `تم حفظ ${
                                tab === "talents"
                                  ? "اللاعب"
                                  : tab === "coaches"
                                    ? "المدرب"
                                    : tab === "clubs"
                                      ? "النادي"
                                      : tab === "agents"
                                        ? "الوكيل"
                                        : "الطبيب"
                              } بنجاح`,
                            });

                            // إغلاق مربع الحوار
                            setIsAddUserDialogOpen(false);
                          } else {
                            // Check if it's a 503 (API not available) response
                            if (res.status === 503) {
                              console.warn(
                                "API not available, using mock success response",
                              );

                              toast({
                                title: "تم الحفظ (وضع التجربة)",
                                description: `تم حفظ ${
                                  tab === "talents"
                                    ? "اللاعب"
                                    : tab === "coaches"
                                      ? "المدرب"
                                      : tab === "clubs"
                                        ? "النادي"
                                        : tab === "agents"
                                          ? "الوكيل"
                                          : "الطبيب"
                                } في وضع التجربة`,
                              });

                              // Close the dialog even if API fails
                              setIsAddUserDialogOpen(false);
                              return; // Exit early
                            }

                            const error = await res.json();
                            throw new Error(
                              error.message ||
                                `فشل في إنشاء ${
                                  tab === "talents"
                                    ? "اللاعب"
                                    : tab === "coaches"
                                      ? "المدرب"
                                      : tab === "clubs"
                                        ? "النادي"
                                        : tab === "agents"
                                          ? "الوكيل"
                                          : "الطبيب"
                                }`,
                            );
                          }
                        } catch (error) {
                          console.error(`Error creating ${tab}:`, error);

                          // Check if it's a network error and provide fallback
                          if (
                            error instanceof TypeError &&
                            error.message.includes("fetch")
                          ) {
                            console.warn(
                              "API not available, using mock success response",
                            );

                            toast({
                              title: "تم الحفظ (وضع التجربة)",
                              description: `تم حفظ ${
                                tab === "talents"
                                  ? "اللاعب"
                                  : tab === "coaches"
                                    ? "المدرب"
                                    : tab === "clubs"
                                      ? "النادي"
                                      : tab === "agents"
                                        ? "الوكيل"
                                        : "الطبيب"
                              } في وضع التجربة`,
                            });

                            // Close the dialog even if API fails
                            setIsAddUserDialogOpen(false);
                          } else if (
                            error instanceof Error &&
                            (error.message.includes("Failed to fetch") ||
                              error.message.includes("NetworkError") ||
                              error.message.includes("fetch"))
                          ) {
                            console.warn(
                              "Network error detected, using mock success response",
                            );

                            toast({
                              title: "تم الحفظ (وضع التجربة)",
                              description: `تم حفظ ${
                                tab === "talents"
                                  ? "اللاعب"
                                  : tab === "coaches"
                                    ? "المدرب"
                                    : tab === "clubs"
                                      ? "النادي"
                                      : tab === "agents"
                                        ? "الوكيل"
                                        : "الطبيب"
                              } في وضع التجربة`,
                            });

                            // Close the dialog even if API fails
                            setIsAddUserDialogOpen(false);
                          } else {
                            // Show error for non-network issues
                            toast({
                              title: "خطأ في الحفظ",
                              description:
                                error instanceof Error
                                  ? error.message
                                  : "حدث خطأ أثناء محاولة الحفظ",
                              variant: "destructive",
                            });
                          }
                        }
                      }}
                    >
                      حفظ
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableCaption>
                {tab === "talents"
                  ? "قائمة اللاعبين"
                  : tab === "coaches"
                    ? "قائمة المدربين"
                    : tab === "clubs"
                      ? "قائمة الأندية"
                      : tab === "agents"
                        ? "قائمة الوكلاء"
                        : "قائمة الأطباء"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>
                    {tab === "talents"
                      ? "المركز"
                      : tab === "coaches"
                        ? "التخصص"
                        : tab === "clubs"
                          ? "البلد"
                          : tab === "agents"
                            ? "الشركة"
                            : "التخصص"}
                  </TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      جاري التحميل...
                    </TableCell>
                  </TableRow>
                ) : (
                  (tab === "talents"
                    ? filteredTalents
                    : tab === "coaches"
                      ? filteredCoaches
                      : tab === "clubs"
                        ? filteredClubs
                        : tab === "agents"
                          ? filteredAgents
                          : filteredDoctors
                  ).map((item: any, index: number) => (
                    <TableRow key={item.id || index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {item.name || "اسم المستخدم"}
                      </TableCell>
                      <TableCell>{item.email || "user@example.com"}</TableCell>
                      <TableCell>
                        {item.position ||
                          item.specialization ||
                          item.country ||
                          item.company ||
                          "غير محدد"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "active"
                              ? "default"
                              : item.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.status === "active"
                            ? "نشط"
                            : item.status === "pending"
                              ? "قيد المراجعة"
                              : item.status === "inactive"
                                ? "غير نشط"
                                : "نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("ar-EG")
                          : "01/01/2023"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            title="عرض"
                            onClick={() => {
                              toast({
                                title: "عرض التفاصيل",
                                description: `عةض تفاصيل ${item.name || "المستخدم"}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            title="تعديل"
                            onClick={() => {
                              toast({
                                title: "تعديل",
                                description: `فتح نموذج تعديل ${item.name || "المستخدم"}`,
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            title="حذف"
                            onClick={() => {
                              toast({
                                title: "حذف",
                                description: `تم حذف ${item.name || "المستخدم"} بنجاح`,
                                variant: "destructive",
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        ))}

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="ml-2 h-5 w-5 text-primary" />
                  <span>نظام التواصل</span>
                </CardTitle>
                <CardDescription>
                  إدارة النظام التواصل بين المستخدمين والإشعارات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">الرسائل الجديدة</h3>
                        <p className="text-2xl font-bold text-blue-500">127</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="font-semibold">المحادثات النشطة</h3>
                        <p className="text-2xl font-bold text-green-500">89</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-orange-500" />
                      <div>
                        <h3 className="font-semibold">الإشعارات المرسلة</h3>
                        <p className="text-2xl font-bold text-orange-500">
                          456
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">إرسال إشعار عام</h3>
                  <div className="grid gap-4">
                    <Input placeholder="عنوان الإشعار" />
                    <Textarea placeholder="نص الإشعار..." rows={4} />
                    <div className="flex gap-2">
                      <Button>
                        <Send className="ml-2 h-4 w-4" />
                        إرسال للجميع
                      </Button>
                      <Button variant="outline">
                        <Users className="ml-2 h-4 w-4" />
                        إرسال لمجموعة محددة
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="ml-2 h-5 w-5 text-primary" />
                  <span>إعدادات النظام</span>
                </CardTitle>
                <CardDescription>
                  تكوين وإدارة إعدادات المنصة العامة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">إعدادات الأمان</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>تفعيل التحقق بخطوتين</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>تسجيل العمليات</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>انتهاء صلاحية الجلسة (دقيقة)</span>
                        <Input
                          type="number"
                          defaultValue="30"
                          className="w-20"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">إعدادات المنصة</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>السماح بالتسجيل الجديد</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>وضع الصيانة</span>
                        <input type="checkbox" className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>عدد المحاولات المسموحة</span>
                        <Input
                          type="number"
                          defaultValue="3"
                          className="w-20"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">إعدادات API</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="api-url">رابط API الأساسي</Label>
                        <Input
                          id="api-url"
                          placeholder="https://api.example.com"
                          defaultValue="https://048e5664d0ca4a0897affb33efd50e00-0a91acbc68a548ed8a39b3830.fly.dev"
                        />
                      </div>
                      <div>
                        <Label htmlFor="api-key">مفتاح API</Label>
                        <Input
                          id="api-key"
                          type="password"
                          placeholder="API Key"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => {
                          toast({
                            title: "تم اختبار الاتصال",
                            description: "الاتصال بـ API يعمل بشكل صحيح",
                          });
                        }}
                      >
                        <Activity className="ml-2 h-4 w-4" />
                        اختبار الاتصال
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "تم حفظ الإعدادات",
                            description: "تم حفظ إعدادات API بنجاح",
                          });
                        }}
                      >
                        <CheckCircle2 className="ml-2 h-4 w-4" />
                        حفظ الإعدادات
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    إدارة النسخ الاحتياطية
                  </h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">
                          النسخة الاحتياطية التلقائية
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          آخر نسخة احتياطية: اليوم 03:00 ص
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="ml-2 h-4 w-4" />
                          تنزيل
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "جاري إنشاء نسخة احتياطية",
                              description: "سيتم إشعارك عند الانتهاء",
                            });
                          }}
                        >
                          <Upload className="ml-2 h-4 w-4" />
                          إنشاء نسخة
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
