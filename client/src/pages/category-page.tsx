import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { Loader2, Search } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

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
import { playerPositions } from "@/data/player-positions";

// Category page component
export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTalents, setFilteredTalents] = useState([]);
  const { categoryName } = useParams();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  // Redirect to professional pages for specific categories
  useEffect(() => {
    const redirectMap: { [key: string]: string } = {
      striker: "/striker",
      strikers: "/striker",
      forwards: "/striker",
      goalkeeper: "/goalkeeper",
      goalkeepers: "/goalkeeper",
      "left-wing": "/left-wing",
      "right-wing": "/right-wing",
      "attacking-midfielder": "/attacking-midfielder",
      "attacking-midfielders": "/attacking-midfielder",
      "left-back": "/left-back",
      "right-back": "/right-back",
      "center-back": "/center-back",
      "center-backs": "/center-back",
      "defensive-midfielder": "/defensive-midfielder",
      "defensive-midfielders": "/defensive-midfielder",
    };

    if (categoryName && redirectMap[categoryName]) {
      setLocation(redirectMap[categoryName]);
      return;
    }
  }, [categoryName, setLocation]);

  // Translation function for player positions
  const translatePosition = (position) => {
    if (!position) return "";

    const positionMap = {
      مهاجم: t("striker_position"),
      "وسط مهاجم": t("attackingMid"),
      "وسط مدافع": t("defensiveMid"),
      "وينج أيسر": t("leftWing"),
      "وينج أيمن": t("rightWing"),
      "جناح أيسر": t("leftWing"),
      "جناح أيمن": t("rightWing"),
      "مدافع أيسر": t("leftBack"),
      "مدافع أيمن": t("rightBack"),
      مدافع: t("centerBack"),
      "حارس مرمى": t("goalkeeper_position"),
      "رأس حربة": t("targetMan"),
      مساك: t("sweeper"),
    };

    return positionMap[position] || position;
  };

  // Translation function for specializations
  const translateSpecialization = (specialization) => {
    if (!specialization) return "";

    const specializationMap = {
      "مدير فني": t("technicalDirector"),
      "مدرب عام": t("headCoach"),
      "مدرب مساعد": t("assistantCoach"),
      "مدرب حراس": t("goalkeepingCoaches"),
      "مدرب حراس مرمى": t("goalkeepingCoaches"),
      "مدرب لياقة": t("fitnessCoaches"),
      "محلل أداء": t("analyst"),
      "أخصائي علاج طبيعي": t("physiotherapist"),
      "أخصائي تغذية": t("nutritionist"),
      "مدير فريق": t("teamManager"),
      "مسؤول ملابس": t("kitManager"),
      كشاف: t("scoutingTeam"),
      "طب رياضي": t("sportsMedicine"),
      "جراحة العظام": t("orthopedicSurgery"),
      "العلاج الطبيعي": t("physiotherapy"),
      "أمراض القلب": t("cardiology"),
      "الأمراض العصبية": t("neurology"),
      "التغذية الرياضية": t("sportsNutrition"),
      "علم النفس الرياضي": t("sportsPsychology"),
      "طب الطوارئ": t("emergencyMedicine"),
      "طب التأهيل": t("rehabilitationMedicine"),
      "طب عام": t("generalMedicine"),
    };

    return specializationMap[specialization] || specialization;
  };

  // Get the proper category title for display
  const getCategoryTitle = () => {
    // أولاً، تحقق من وجود عنوان فرعي
    const subTitle = getSubCategoryTitle();
    if (subTitle) {
      return subTitle;
    }

    // إذا لم يكن هناك عنوان فرعي، استخدم العنوان الرئيسي
    switch (categoryName) {
      case "players":
      case "all-players":
        return t("players");
      case "coaches":
      case "all-coaches":
        return t("coaches");
      case "clubs-list":
        return t("clubs");
      case "agents-list":
        return t("agents");
      case "doctors-list":
        return t("doctors");
      default:
        return t("categories");
    }
  };

  // Map category to appropriate ID
  const getCategoryId = () => {
    switch (categoryName) {
      // اللاعبين
      case "players":
      case "all-players":
      case "forwards":
      case "midfielders":
      case "defenders":
      case "goalkeepers":
      case "wingbacks":
      // مراكز اللاعبين الجديدة
      case "goalkeeper":
      case "centerback":
      case "sweeper":
      case "rightback":
      case "leftback":
      case "defensivemid":
      case "attackingmid":
      case "rightwing":
      case "leftwing":
      case "striker":
        return 1;
      // المدربين
      case "coaches":
      case "all-coaches":
      case "technical-director":
      case "head-coach":
      case "assistant-coach":
        return 2;
      // مدربي حراس
      case "goalkeeping-coaches":
        return 5;
      // مدربي اللياقة
      case "fitness":
        return 4;
      // الجهاز المعاون
      case "assistant":
      case "analyst":
      case "physiotherapist":
      case "nutritionist":
      case "team-manager":
      case "kit-manager":
      case "scouting-team":
        return 2;
      // الأندية/الوكلاء/الأطباء
      case "clubs-list":
        return 6;
      case "agents-list":
        return 7;
      case "doctors-list":
        return 8;
      default:
        return null;
    }
  };

  // تحديد العنوان الفرعي استنادًا إلى الفئة الفرعية
  const getSubCategoryTitle = () => {
    // استخدام قائمة مراكز اللاعبين
    const position = playerPositions.find((pos) => pos.id === categoryName);
    if (position) {
      // Use translation system instead of hardcoded Arabic
      return t(position.id);
    }

    switch (categoryName) {
      // لاعبين
      case "forwards":
        return t("forwards");
      case "midfielders":
        return t("midfielders");
      case "defenders":
        return t("defenders");
      case "goalkeepers":
        return t("goalkeepers");
      case "wingbacks":
        return t("wingbacks");

      // مدربين
      case "technical-director":
        return t("technicalDirector");
      case "head-coach":
        return t("headCoach");
      case "assistant-coach":
        return t("assistantCoach");
      case "goalkeeping-coaches":
        return t("goalkeepingCoaches");
      case "fitness":
        return t("fitnessCoaches");

      // الجهاز المعاون
      case "assistant":
        return t("assistant");
      case "analyst":
        return t("analyst");
      case "physiotherapist":
        return t("physiotherapist");
      case "nutritionist":
        return t("nutritionist");
      case "team-manager":
        return t("teamManager");
      case "kit-manager":
        return t("kitManager");
      case "scouting-team":
        return t("scoutingTeam");

      default:
        return null;
    }
  };

  // تحديد نوع الترشيح المناسب للفئة الفرعية
  const getSubCategoryFilter = () => {
    // لاعبين حسب المركز
    const position = playerPositions.find((pos) => pos.id === categoryName);
    if (position) {
      return { position: position.nameAr };
    }

    switch (categoryName) {
      // لاعبين حسب المركز - بديل تقليدي
      case "goalkeepers":
        return { position: "حارس مرمى" };
      case "center-backs":
      case "defenders":
        return { position: "مدافع" };
      case "sweeper":
        return { position: "مساك" };
      case "right-back":
      case "wingbacks":
        return { position: "مدافع أيمن" };
      case "left-back":
        return { position: "مدافع أيسر" };
      case "defensive-midfielders":
      case "midfielders":
        return { position: "وسط مدافع" };
      case "attacking-midfielders":
        return { position: "وسط مهاجم" };
      case "right-wing":
        return { position: "وينج أيمن" };
      case "left-wing":
        return { position: "وينج أيسر" };
      case "strikers":
      case "forwards":
        return { position: "مهاجم" };

      // مدربين حسب التخصص
      case "technical-director":
        return { specialization: "مدير فني" };
      case "head-coach":
        return { specialization: "مدرب عام" };
      case "assistant-coach":
        return { specialization: "مدرب مساعد" };
      case "goalkeeping-coaches":
        return { specialization: "مدرب حراس" };
      case "fitness":
        return { specialization: "مدرب لياقة" };

      // الجهاز المعاون
      case "assistant":
        return { specialization: "مساعد" };
      case "analyst":
        return { specialization: "محلل أداء" };
      case "physiotherapist":
        return { specialization: "أخصائي علاج طبيعي" };
      case "nutritionist":
        return { specialization: "أخصائي تغذية" };
      case "team-manager":
        return { specialization: "مدير فريق" };
      case "kit-manager":
        return { specialization: "مسؤول ملابس" };
      case "scouting-team":
        return { specialization: "كشاف" };

      default:
        return null;
    }
  };

  // Fetch talents based on category
  const {
    data: talents,
    isLoading,
    error,
  } = useQuery({
    queryKey: getCategoryId()
      ? ["/api/category", getCategoryId(), categoryName]
      : ["/api/services"],
    queryFn: async () => {
      if (getCategoryId()) {
        const res = await fetch(`/api/services?categoryId=${getCategoryId()}`);
        if (!res.ok) throw new Error(t("error"));
        let data = await res.json();

        // تطبيق الترشيح المناسب للفئة الفرعية
        const subCategoryFilter = getSubCategoryFilter();
        if (subCategoryFilter) {
          console.log("Applying sub-category filter:", subCategoryFilter);
          // قبل التصفية، نطبع الوسيط للتمكن من تتبع المشكلة
          console.log(`المركز المطلوب في التصفية:`, subCategoryFilter);

          // تحسين فلترة مراكز اللاعبين
          if (subCategoryFilter && subCategoryFilter.position) {
            const positionFilter = subCategoryFilter.position;

            // فلترة مخصصة للمراكز
            if (positionFilter === "مهاجم") {
              data = data.filter((item) => item.position === "مهاجم");
            } else if (positionFilter === "وسط مهاجم") {
              data = data.filter((item) => item.position === "وسط مهاجم");
            } else {
              // الفلترة العامة
              data = data.filter((item) => {
                for (const [key, value] of Object.entries(subCategoryFilter)) {
                  // التحقق من تطابق القيمة بالضبط بدل من البحث عن تضمين جزئي
                  if (key === "position") {
                    if (
                      !item[key] ||
                      item[key].trim() !== value.toString().trim()
                    ) {
                      return false;
                    }
                  } else if (
                    !item[key] ||
                    !item[key]
                      .toLowerCase()
                      .includes(value.toString().toLowerCase())
                  ) {
                    return false;
                  }
                }
                return true;
              });
            }
          } else {
            // الفلترة العامة لبقية الحالات
            data = data.filter((item) => {
              for (const [key, value] of Object.entries(subCategoryFilter)) {
                // معالجة خاصة لحقل specialization
                if (key === "specialization") {
                  if (
                    !item[key] ||
                    item[key].trim() !== value.toString().trim()
                  ) {
                    return false;
                  }
                } else if (
                  !item[key] ||
                  !item[key]
                    .toLowerCase()
                    .includes(value.toString().toLowerCase())
                ) {
                  return false;
                }
              }
              return true;
            });
          }
          console.log("Filtered data:", data);
        }

        return data;
      } else {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error(t("error"));
        return await res.json();
      }
    },
  });

  // Filter talents based on search term
  useEffect(() => {
    if (talents) {
      setFilteredTalents(
        talents.filter(
          (talent) =>
            talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.description.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, talents]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  // Handle no talents in category
  if (talents && talents.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="mb-8 text-3xl font-extrabold text-center">
          {getCategoryTitle()}
        </h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">
            {t("noDataAvailable").replace("{category}", getCategoryTitle())}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("checkBackLater")}</p>
          <Link href="/">
            <Button className="mt-4">{t("backToHome")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-extrabold text-center">
        {getCategoryTitle()}
      </h1>

      {/* Search bar */}
      <div className="relative mx-auto mb-8 max-w-md">
        <Input
          type="text"
          placeholder={`${t("search")} ${getCategoryTitle()}...`}
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <Tabs defaultValue="grid" className="mb-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">{t("gridView")}</TabsTrigger>
            <TabsTrigger value="list">{t("listView")}</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            {t("found")} {filteredTalents.length} {getCategoryTitle()}
          </p>
        </div>

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
                        `https://via.placeholder.com/400x225?text=${encodeURIComponent(t("noImage"))}`
                      }
                      alt={talent.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2 line-clamp-1">
                    {talent.name}
                  </CardTitle>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {talent.description}
                  </p>
                  {talent.position && (
                    <p className="mt-2 text-sm font-medium">
                      {t("position")}:{" "}
                      <span className="text-primary">
                        {translatePosition(talent.position)}
                      </span>
                    </p>
                  )}
                  {talent.specialization && (
                    <p className="mt-2 text-sm font-medium">
                      {t("specialization")}:{" "}
                      <span className="text-primary">
                        {translateSpecialization(talent.specialization)}
                      </span>
                    </p>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div>
                    {talent.rating && (
                      <div className="flex items-center">
                        <span className="text-amber-500">★</span>
                        <span className="ml-1 text-sm">{talent.rating}/5</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/service/${talent.id}`}>
                    <Button size="sm">{t("view")}</Button>
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
                        `https://via.placeholder.com/400x225?text=${encodeURIComponent(t("noImage"))}`
                      }
                      alt={talent.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{talent.name}</h3>
                        <p className="mt-2 text-muted-foreground">
                          {talent.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          {talent.position && (
                            <p className="text-sm mb-1">
                              {t("position")}:{" "}
                              <span className="font-medium text-primary">
                                {translatePosition(talent.position)}
                              </span>
                            </p>
                          )}
                          {talent.specialization && (
                            <p className="text-sm">
                              {t("specialization")}:{" "}
                              <span className="font-medium text-primary">
                                {translateSpecialization(talent.specialization)}
                              </span>
                            </p>
                          )}
                        </div>
                        <Link href={`/service/${talent.id}`}>
                          <Button>{t("view")}</Button>
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
    </div>
  );
}
