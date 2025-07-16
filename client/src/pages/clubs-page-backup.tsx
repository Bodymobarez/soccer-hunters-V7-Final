import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Loader2,
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Award,
  Clock,
  Users,
  UserPlus,
  Building,
  Trophy,
  Target,
  Globe,
  MessageSquare,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  Activity,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { generateExpandedMockClubs } from "@/data/expanded-clubs-mock";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Club categories
const clubCategories = [
  { id: "all", nameEn: "All Clubs", nameAr: "جميع الأندية" },
  { id: "premier", nameEn: "Premier League", nameAr: "الدوري الممتاز" },
  {
    id: "professional",
    nameEn: "Professional League",
    nameAr: "دوري المحترفين",
  },
  { id: "first-division", nameEn: "First Division", nameAr: "الدرجة الأولى" },
  {
    id: "second-division",
    nameEn: "Second Division",
    nameAr: "الدرجة الثانية",
  },
  { id: "youth", nameEn: "Youth Academy", nameAr: "أكاديمية الشباب" },
  { id: "women", nameEn: "Women's Football", nameAr: "كرة القدم النسائية" },
];

const clubTypes = [
  { id: "all", nameEn: "All Types", nameAr: "جميع الأنواع" },
  { id: "professional", nameEn: "Professional Club", nameAr: "نادي محترف" },
  { id: "academy", nameEn: "Football Academy", nameAr: "أكاديمية كرة قدم" },
  { id: "youth", nameEn: "Youth Club", nameAr: "نادي شباب" },
  { id: "sports-center", nameEn: "Sports Center", nameAr: "مركز رياضي" },
];

const sortOptions = [
  { id: "name", nameEn: "Name", nameAr: "الاسم" },
  { id: "founded", nameEn: "Founded Year", nameAr: "سنة التأسيس" },
  { id: "players", nameEn: "Number of Players", nameAr: "عدد اللاعبين" },
  { id: "capacity", nameEn: "Stadium Capacity", nameAr: "سعة الملعب" },
];

interface Club {
  id: number;
  name: string;
  category: string;
  type: string;
  founded: number;
  location: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  description: string;
  stadium?: string;
  capacity?: number;
  achievements: string[];
  currentLeague: string;
  coachName?: string;
  playersCount?: number;
  budgetRange?: string;
  lookingFor: string[];
  marketValue?: string;
  clubRating?: number;
  yearsInTopDivision?: number;
  fanBase?: string;
  trainingFacilities?: number;
  youthAcademy?: boolean;
  internationalTournaments?: string[];
  social?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

/* Removed old generateMockClubs function - now using generateExpandedMockClubs from separate file */

export default function ClubsPage() {
    return [
      {
        id: 1,
        name: "نادي الهلال السعودي",
        category: "premier",
        type: "professional",
        founded: 1957,
        location: "الرياض، السعودية",
        phone: "+966501234567",
        email: "info@alhilal.sa",
        website: "www.alhilal.sa",
        description: "النادي الأكثر تتويجاً في آسيا ومن أعرق الأندية السعودية",
        stadium: "ملعب الملك فهد الدولي",
        capacity: 67000,
        achievements: ["دوري أبطال آسيا 4 مرات", "الدوري السعودي 18 مرة"],
        currentLeague: "دوري روشن السعودي",
        coachName: "راي الإمارات",
        playersCount: 28,
        budgetRange: "عالي",
        lookingFor: ["مهاجمين", "وسط ميدان", "أجنحة"],
        marketValue: "500 مليون ريال",
        clubRating: 4.8,
        yearsInTopDivision: 25,
        fanBase: "3.2 مليون متابع",
        trainingFacilities: 5,
        youthAcademy: true,
        internationalTournaments: ["دوري أبطال آسيا", "كأس العالم للأندية"],
      },
      {
        id: 2,
        name: "نادي النصر السعودي",
        category: "premier",
        type: "professional",
        founded: 1955,
        location: "الرياض، السعودية",
        phone: "+966502345678",
        email: "info@alnassr.sa",
        website: "www.alnassr.sa",
        description: "العالمي، نادي تاريخي وله قاعدة جماهيرية واسعة",
        stadium: "ملعب مرسول بارك",
        capacity: 25000,
        achievements: ["الدوري السعودي 9 مرات", "كأس الملك 6 مرات"],
        currentLeague: "دوري روشن السعودي",
        coachName: "ستيفان بيولي",
        playersCount: 26,
        budgetRange: "عالي جداً",
        lookingFor: ["مدافعين", "حراس مرمى"],
        marketValue: "750 مليون ريال",
        clubRating: 4.9,
        yearsInTopDivision: 30,
        fanBase: "5.1 مليون متابع",
        trainingFacilities: 5,
        youthAcademy: true,
        internationalTournaments: ["دوري أبطال آسيا", "الدوري السعودي"],
      },
      {
        id: 3,
        name: "أكاديمية مهد",
        category: "youth",
        type: "academy",
        founded: 2010,
        location: "الرياض، السعودية",
        phone: "+966503456789",
        email: "info@mahadacademy.sa",
        description:
          "أكاديمية متخصصة في تطوير المواهب الشابة وإعدادها للاحتراف",
        stadium: "ملاعب تدريبية متعددة",
        capacity: 2000,
        achievements: ["أفضل أكاديمية في المملكة 2023"],
        currentLeague: "دوري الأكاديميات",
        coachName: "محمد الشهراني",
        playersCount: 150,
        budgetRange: "متوسط",
        lookingFor: ["مواهب شابة", "مدربين شباب"],
        marketValue: "50 مليون ريال",
        clubRating: 4.6,
        yearsInTopDivision: 0,
        fanBase: "250 ألف متابع",
        trainingFacilities: 4,
        youthAcademy: true,
        internationalTournaments: ["بطولة الأكاديميات الآسيوية"],
      },
      {
        id: 4,
        name: "نادي الاتحاد",
        category: "premier",
        type: "professional",
        founded: 1927,
        location: "جدة، السعودية",
        phone: "+966504567890",
        email: "info@ittihad.sa",
        website: "www.ittihad.sa",
        description: "عميد الأندية السعودية وأول نادي سعودي يحرز لقب آسيةي",
        stadium: "ملعب الأمير عبدالله الفيصل",
        capacity: 27000,
        achievements: ["دوري أبطال آسيا 2004", "الدوري السعودي 8 مرات"],
        currentLeague: "دوري روشن السعودي",
        coachName: "مارسيلو غاياردو",
        playersCount: 25,
        budgetRange: "عالي",
        lookingFor: ["لاعبي وسط", "مهاجمين"],
        marketValue: "400 مليون ريال",
        clubRating: 4.7,
        yearsInTopDivision: 28,
        fanBase: "2.8 مليون متابع",
        trainingFacilities: 5,
        youthAcademy: true,
        internationalTournaments: ["دوري أبطال آسيا", "كأس العالم للأندية"],
      },
    ];
  } else {
    return [
      {
        id: 1,
        name: "Al Hilal Saudi Club",
        category: "premier",
        type: "professional",
        founded: 1957,
        location: "Riyadh, Saudi Arabia",
        phone: "+966501234567",
        email: "info@alhilal.sa",
        website: "www.alhilal.sa",
        description:
          "The most crowned club in Asia and one of the most prestigious Saudi clubs",
        stadium: "King Fahd International Stadium",
        capacity: 67000,
        achievements: ["AFC Champions League 4 times", "Saudi League 18 times"],
        currentLeague: "Saudi Pro League",
        coachName: "Jorge Jesus",
        playersCount: 28,
        budgetRange: "High",
        lookingFor: ["Strikers", "Midfielders", "Wingers"],
        marketValue: "500 Million SAR",
        clubRating: 4.8,
        yearsInTopDivision: 25,
        fanBase: "3.2M followers",
        trainingFacilities: 5,
        youthAcademy: true,
        internationalTournaments: [
          "AFC Champions League",
          "FIFA Club World Cup",
        ],
      },
      {
        id: 2,
        name: "Al Nassr Saudi Club",
        category: "premier",
        type: "professional",
        founded: 1955,
        location: "Riyadh, Saudi Arabia",
        phone: "+966502345678",
        email: "info@alnassr.sa",
        website: "www.alnassr.sa",
        description: "The Global club, historic club with a wide fan base",
        stadium: "Mrsool Park",
        capacity: 25000,
        achievements: ["Saudi League 9 times", "King's Cup 6 times"],
        currentLeague: "Saudi Pro League",
        coachName: "Stefano Pioli",
        playersCount: 26,
        budgetRange: "Very High",
        lookingFor: ["Defenders", "Goalkeepers"],
        marketValue: "750 Million SAR",
        clubRating: 4.9,
        yearsInTopDivision: 30,
        fanBase: "5.1M followers",
        trainingFacilities: 5,
        youthAcademy: true,
        internationalTournaments: ["AFC Champions League", "Saudi Pro League"],
      },
      {
        id: 3,
        name: "Mahd Academy",
        category: "youth",
        type: "academy",
        founded: 2010,
        location: "Riyadh, Saudi Arabia",
        phone: "+966503456789",
        email: "info@mahadacademy.sa",
        description:
          "Academy specialized in developing young talents and preparing them for professionalism",
        stadium: "Multiple training fields",
        capacity: 2000,
        achievements: ["Best Academy in the Kingdom 2023"],
        currentLeague: "Academy League",
        coachName: "Mohammed Al-Shahrani",
        playersCount: 150,
        budgetRange: "Medium",
        lookingFor: ["Young talents", "Youth coaches"],
      },
      {
        id: 4,
        name: "Al Ittihad Club",
        category: "premier",
        type: "professional",
        founded: 1927,
        location: "Jeddah, Saudi Arabia",
        phone: "+966504567890",
        email: "info@ittihad.sa",
        website: "www.ittihad.sa",
        description:
          "Dean of Saudi clubs and first Saudi club to win an Asian title",
        stadium: "Prince Abdullah Al-Faisal Stadium",
        capacity: 27000,
        achievements: ["AFC Champions League 2004", "Saudi League 8 times"],
        currentLeague: "Saudi Pro League",
        coachName: "Marcelo Gallardo",
        playersCount: 25,
        budgetRange: "High",
        lookingFor: ["Midfielders", "Strikers"],
      },
    ];
  }
};

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
    const { t, locale: currentLanguage } = useTranslation();

  // Fetch clubs data
  const {
    data: clubs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/clubs"],
    queryFn: async () => {
      // Always start with mock data as fallback
      const fallbackData = generateExpandedMockClubs(currentLanguage === "ar");

      try {
        const res = await fetch("/api/services?categoryId=3", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.warn(
            `API responded with status ${res.status}, using mock data`,
          );
          return fallbackData;
        }

        let data = await res.json();

        // If no data from API, use mock data
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.info("No clubs data from API, using mock data");
          return fallbackData;
        }

        // Transform the generic service data to club-specific format
        return data.map(
          (item: any): Club => ({
            id: item.id,
            name: item.name,
            category: item.category || "professional",
            type: item.type || "professional",
            founded: item.founded || 2000,
            location:
              item.location ||
              (currentLanguage === "ar"
                ? "الرياض, السعودية"
                : "Riyadh, Saudi Arabia"),
            phone: item.phone,
            email: item.email,
            website: item.website,
            imageUrl: item.imageUrl,
            description: item.description,
            stadium: item.stadium,
            capacity: item.capacity || 25000,
            achievements: Array.isArray(item.achievements)
              ? item.achievements
              : [],
            currentLeague:
              item.currentLeague ||
              (currentLanguage === "ar"
                ? "دوري روشن السعودي"
                : "Saudi Pro League"),
            coachName: item.coachName,
            playersCount: item.playersCount || 25,
            budgetRange:
              item.budgetRange ||
              (currentLanguage === "ar" ? "متوسط" : "Medium"),
            lookingFor: Array.isArray(item.lookingFor) ? item.lookingFor : [],
            social: item.social,
          }),
        );
      } catch (fetchError) {
        console.warn("Fetch failed, using mock data:", fetchError);
        return fallbackData;
      }
    },
    retry: false, // Don't retry on failure, just use mock data
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  // Filter and sort clubs based on search term, category, type, and sort options
  useEffect(() => {
    if (clubs && clubs.length > 0) {
      let filtered = clubs.filter((club: Club) => {
        const matchesSearch =
          club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.currentLeague.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" || club.category === selectedCategory;

        const matchesType =
          selectedType === "all" || club.type === selectedType;

        return matchesSearch && matchesCategory && matchesType;
      });

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (sortBy) {
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case "founded":
            aValue = a.founded;
            bValue = b.founded;
            break;
          case "players":
            aValue = a.playersCount || 0;
            bValue = b.playersCount || 0;
            break;
          case "capacity":
            aValue = a.capacity || 0;
            bValue = b.capacity || 0;
            break;
          default:
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        }

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setFilteredClubs(filtered);
    }
  }, [searchTerm, selectedCategory, selectedType, sortBy, sortOrder, clubs]);

  const getCategoryName = (category: any) => {
    return currentLanguage === "ar" ? category.nameAr : category.nameEn;
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">{t("error")}</h2>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            {t("retry")}
          </Button>
        </div>
      </div>
    );
  }

  if (clubs && clubs.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="mb-8 text-3xl font-extrabold text-center">
          {t("clubs")}
        </h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">
            {t("noDataAvailable").replace("{category}", t("clubs"))}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("checkBackLater")}</p>
          <Link href="/home">
            <Button className="mt-4">{t("backToHome")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container py-12">
        {/* Professional Header Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {currentLanguage === "ar"
                ? "دليل الأندية الرياضية"
                : "Professional Sports Clubs Directory"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {currentLanguage === "ar"
                ? "استكشف أفضل الأندية ومراكز التدريب والأكاديميات الرياضية مع معلومات شاملة عن التأسيس والإنجازات والفرص المتاحة"
                : "Explore the best clubs, training centers and sports academies with comprehensive information about foundation, achievements and available opportunities"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredClubs.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "ar" ? "نادي متاح" : "Available Clubs"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      filteredClubs.filter((c) => c.category === "premier")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "ar"
                      ? "أندية الدوري الممتاز"
                      : "Premier League"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredClubs.filter((c) => c.type === "academy").length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "ar"
                      ? "أكاديميات التدريب"
                      : "Training Academies"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      filteredClubs.filter(
                        (c) =>
                          Array.isArray(c.lookingFor) &&
                          c.lookingFor.length > 0,
                      ).length
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "ar"
                      ? "يبحثون عن مواهب"
                      : "Actively Recruiting"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLanguage === "ar" ? "البحث" : "Search"}
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder={
                    currentLanguage === "ar"
                      ? "ابحث عن نادي، مدينة، أو دوري..."
                      : "Search by club name, city, or league..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "الفةة" : "Category"}
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue
                      placeholder={
                        currentLanguage === "ar"
                          ? "اختر الفئة"
                          : "Select Category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {clubCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {getCategoryName(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "النوع" : "Type"}
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-12">
                    <SelectValue
                      placeholder={
                        currentLanguage === "ar" ? "اختر النوع" : "Select Type"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {clubTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {getCategoryName(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLanguage === "ar" ? "ترتيب حسب" : "Sort by"}
                </label>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {getCategoryName(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="grid">{t("gridView")}</TabsTrigger>
              <TabsTrigger value="list">{t("listView")}</TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground">
              {t("found")} {filteredClubs.length} {t("clubs")}
            </p>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredClubs.map((club) => (
                <Card
                  key={club.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
                      {club.imageUrl ? (
                        <img
                          src={club.imageUrl}
                          alt={club.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="text-6xl text-blue-400">🏟️</div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1 mb-1">
                          {club.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {club.currentLeague}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>
                          {currentLanguage === "ar" ? "تأسس" : "Founded"}:{" "}
                          {club.founded}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{club.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          {club.playersCount}{" "}
                          {currentLanguage === "ar" ? "لاعب" : "players"}
                        </span>
                      </div>

                      {club.stadium && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          <span className="line-clamp-1">{club.stadium}</span>
                        </div>
                      )}
                    </div>

                    <p className="mt-3 text-sm line-clamp-2 text-muted-foreground">
                      {club.description}
                    </p>

                    {Array.isArray(club.lookingFor) &&
                      club.lookingFor.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Target className="h-3 w-3" />
                            <span>
                              {currentLanguage === "ar"
                                ? "ابحث عن:"
                                : "Looking for:"}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {club.lookingFor.slice(0, 2).map((item, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Link href={`/service/${club.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        {t("view")}
                      </Button>
                    </Link>
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {currentLanguage === "ar" ? "تواصل" : "Contact"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredClubs.map((club) => (
                <Card
                  key={club.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="h-48 w-full md:h-auto md:w-48 overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
                      {club.imageUrl ? (
                        <img
                          src={club.imageUrl}
                          alt={club.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="text-6xl text-blue-400">🏟️</div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold">{club.name}</h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary">
                                  {club.currentLeague}
                                </Badge>
                                <Badge variant="outline">
                                  {club.type === "professional"
                                    ? currentLanguage === "ar"
                                      ? "محترف"
                                      : "Professional"
                                    : club.type === "academy"
                                      ? currentLanguage === "ar"
                                        ? "أكاديمية"
                                        : "Academy"
                                      : club.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold">
                                {currentLanguage === "ar" ? "تأسس" : "Founded"}{" "}
                                {club.founded}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{club.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {club.playersCount}{" "}
                                  {currentLanguage === "ar"
                                    ? "لاعب"
                                    : "players"}
                                </span>
                              </div>
                              {club.stadium && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Trophy className="h-4 w-4 text-muted-foreground" />
                                  <span>{club.stadium}</span>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              {club.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span>{club.phone}</span>
                                </div>
                              )}
                              {club.email && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="truncate">{club.email}</span>
                                </div>
                              )}
                              {club.website && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Globe className="h-4 w-4 text-muted-foreground" />
                                  <span className="truncate">
                                    {club.website}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-4">
                            {club.description}
                          </p>

                          {Array.isArray(club.achievements) &&
                            club.achievements.length > 0 && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                                  <Award className="h-4 w-4" />
                                  <span>
                                    {currentLanguage === "ar"
                                      ? "الإنجازات:"
                                      : "Achievements:"}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {club.achievements
                                    .slice(0, 3)
                                    .map((achievement, index) => (
                                      <Badge key={index} variant="outline">
                                        {achievement}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            )}

                          {Array.isArray(club.lookingFor) &&
                            club.lookingFor.length > 0 && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                                  <Target className="h-4 w-4" />
                                  <span>
                                    {currentLanguage === "ar"
                                      ? "يبحث عن:"
                                      : "Looking for:"}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {club.lookingFor.map((item, index) => (
                                    <Badge key={index} variant="outline">
                                      {item}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-muted-foreground">
                            {currentLanguage === "ar"
                              ? "الميزانية:"
                              : "Budget:"}{" "}
                            {club.budgetRange}
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/service/${club.id}`}>
                              <Button variant="outline">{t("view")}</Button>
                            </Link>
                            <Button>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              {currentLanguage === "ar" ? "تواصل" : "Contact"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}