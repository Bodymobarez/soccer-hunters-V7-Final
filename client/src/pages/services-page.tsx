import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Loader2, Search, Filter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Helpers
const categoryMap = {
  1: "لاعبين",
  2: "مدربين",
  3: "حراس مرمى",
  4: "مدربي لياقة",
  5: "مدربي حراس",
};

// Types
interface Talent {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  categoryId: number;
  position?: string;
  rating?: string | number;
}

// Services page component
export default function ServicesPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("name-asc");

  // Fetch all talents
  const {
    data: talents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/services");

        // Check if API is not available (503 status)
        if (res.status === 503) {
          console.warn("API not available, returning mock services data");
          return [
            {
              id: 1,
              name: "خدمة تجريبية 1",
              description: "وصف تجريبي للخدمة",
              price: "100",
              category: "تجريبي",
            },
            {
              id: 2,
              name: "خدمة تجريبية 2",
              description: "وصف تجريبي آخر",
              price: "200",
              category: "تجريبي",
            },
          ];
        }

        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        return await res.json();
      } catch (error) {
        // Handle network errors
        if (error instanceof TypeError && error.message.includes("fetch")) {
          console.warn("Network error in services page, returning mock data");
          return [
            {
              id: 1,
              name: "خدمة تجريبية 1",
              description: "وصف تجريبي للخدمة",
              price: "100",
              category: "تجريبي",
            },
          ];
        }
        throw error;
      }
    },
  });

  // Fetch categories for filtering
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/categories");

        // Check if API is not available (503 status)
        if (res.status === 503) {
          console.warn("API not available, returning mock categories data");
          return [
            { id: 1, name: "فئة تجريبية 1" },
            { id: 2, name: "فئة تجريبية 2" },
          ];
        }

        if (!res.ok) throw new Error("فشل في تحميل الفئات");
        return await res.json();
      } catch (error) {
        // Handle network errors
        if (error instanceof TypeError && error.message.includes("fetch")) {
          console.warn("Network error in categories, returning mock data");
          return [
            { id: 1, name: "فئة تجريبية 1" },
            { id: 2, name: "فئة تجريبية 2" },
          ];
        }
        throw error;
      }
    },
  });

  // Filter and sort talents
  useEffect(() => {
    if (talents) {
      let filtered = [...talents];

      // Apply category filter
      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (talent) => talent.categoryId === parseInt(selectedCategory),
        );
      }

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (talent) =>
            talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.description.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      // Apply sorting
      switch (sortOption) {
        case "name-asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "rating-desc":
          filtered.sort((a, b) => {
            const ratingA = a.rating ? parseFloat(a.rating.toString()) : 0;
            const ratingB = b.rating ? parseFloat(b.rating.toString()) : 0;
            return ratingB - ratingA;
          });
          break;
        default:
          break;
      }

      setFilteredTalents(filtered);
    }
  }, [searchTerm, talents, selectedCategory, sortOption]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">حدث خطأ</h2>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-extrabold text-center">جميع الخدمات</h1>

      {/* Search and filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="ابحث عن اسم أو وصف..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>الفئة</span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="ml-2">ترتيب حسب</span>
                {sortOption === "name-asc" && <span>الاسم (تصاعدي)</span>}
                {sortOption === "name-desc" && <span>الاسم (تنازلي)</span>}
                {sortOption === "rating-desc" && <span>التقييم</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                الاسم (تصاعدي)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("name-desc")}>
                الاسم (تنازلي)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("rating-desc")}>
                التقييم (الأعلى أولاً)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="grid" className="w-40">
          <TabsList className="w-full">
            <TabsTrigger value="grid" className="flex-1">
              شبكة
            </TabsTrigger>
            <TabsTrigger value="list" className="flex-1">
              قائمة
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-sm text-muted-foreground">
          تم العثور على {filteredTalents.length} من الخدمات
        </p>
      </div>

      {filteredTalents.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">لا توجد نتائج مطابقة للبحث</h2>
          <p className="mt-2 text-muted-foreground">
            جرب تغيير معايير البحث أو الفلترة
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4"
          >
            إعادة ضبط البحث
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="grid">
          {/* Grid View */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTalents.map((talent) => (
                <Card key={talent.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={
                          talent.imageUrl ||
                          "https://via.placeholder.com/400x225?text=صورة+غير+متوفرة"
                        }
                        alt={talent.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <CardTitle className="line-clamp-1">
                        {talent.name}
                      </CardTitle>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {categoryMap[talent.categoryId] || "غير مصنف"}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {talent.description}
                    </p>
                    {talent.position && (
                      <p className="mt-2 text-sm font-medium">
                        المركز:{" "}
                        <span className="text-primary">{talent.position}</span>
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div>
                      {talent.rating && (
                        <div className="flex items-center">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1 text-sm">
                            {talent.rating}/5
                          </span>
                        </div>
                      )}
                    </div>
                    <Link href={`/service/${talent.id}`}>
                      <Button size="sm">عرض التفاصيل</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredTalents.map((talent) => (
                <Card key={talent.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="h-48 w-full md:h-auto md:w-48 overflow-hidden">
                      <img
                        src={
                          talent.imageUrl ||
                          "https://via.placeholder.com/400x225?text=صورة+غير+متوفرة"
                        }
                        alt={talent.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">{talent.name}</h3>
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {categoryMap[talent.categoryId] || "غير مصنف"}
                            </span>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {talent.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4">
                            {talent.position && (
                              <p className="text-sm">
                                المركز:{" "}
                                <span className="font-medium text-primary">
                                  {talent.position}
                                </span>
                              </p>
                            )}
                            {talent.rating && (
                              <div className="flex items-center">
                                <span className="text-amber-500">★</span>
                                <span className="ml-1 text-sm">
                                  {talent.rating}/5
                                </span>
                              </div>
                            )}
                          </div>
                          <Link href={`/service/${talent.id}`}>
                            <Button>عرض التفاصيل</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
