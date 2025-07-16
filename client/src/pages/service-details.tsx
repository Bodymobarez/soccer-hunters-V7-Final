import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import {
  ChevronLeft,
  Heart,
  Share,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  Flag,
  Info,
  Link as LinkIcon,
  Loader2,
  FileBadge,
  User,
  Building,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t, locale: currentLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState("about");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  // Get service details
  const {
    data: serviceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/service", id],
    queryFn: async () => {
      const res = await fetch(`/api/service/${id}`);
      if (!res.ok) {
        throw new Error(t("failedToLoadServiceData"));
      }
      return await res.json();
    },
  });

  // Get stats if service is a football talent
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["/api/talent/stats", id],
    queryFn: async () => {
      const res = await fetch(`/api/talent/stats?talentId=${id}`);
      if (!res.ok) {
        throw new Error(t("failedToLoadStatistics"));
      }
      return await res.json();
    },
    enabled: !!serviceData && serviceData.categoryId === 1, // Only fetch for talents (players)
  });

  // Get achievements if service is a coach
  const { data: achievements, isLoading: isLoadingAchievements } = useQuery({
    queryKey: ["/api/coach/achievements", id],
    queryFn: async () => {
      const res = await fetch(`/api/coach/achievements?coachId=${id}`);
      if (!res.ok) {
        throw new Error(t("failedToLoadAchievements"));
      }
      return await res.json();
    },
    enabled:
      !!serviceData &&
      (serviceData.categoryId === 2 || serviceData.categoryId === 5), // For coaches and goalkeeper coaches
  });

  // Get media files
  const { data: mediaFiles, isLoading: isLoadingMedia } = useQuery({
    queryKey: ["/api/media", id],
    queryFn: async () => {
      // Use the correct API endpoint based on the type of service
      const endpoint = isPlayer
        ? `/api/media/talent/${id}`
        : isCoach
          ? `/api/media/talent/${id}` // Using the same path for coaches for now
          : `/api/media/user/${id}`;

      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(t("failedToLoadMedia"));
      }
      const data = await res.json();
      console.log("Media files loaded:", data);
      // Check the retrieved media data
      console.log("Media files structure:", data);
      // Check the type of the first file if it exists
      if (data && data.length > 0) {
        console.log("First media file example:", data[0]);
        console.log("Media file type:", data[0].fileType);
        console.log("Media file URL:", data[0].fileUrl);
      }
      return data;
    },
    enabled: !!serviceData,
  });

  // Get testimonials/reviews
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryKey: ["/api/testimonials", id],
    queryFn: async () => {
      const res = await fetch(`/api/testimonial?serviceId=${id}`);
      if (!res.ok) {
        throw new Error(t("failedToLoadReviews"));
      }
      return await res.json();
    },
    enabled: !!serviceData,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      if (!isAuthenticated) {
        throw new Error(t("loginRequired"));
      }

      const res = await apiRequest("POST", "/api/messages", {
        ...messageData,
        senderId: user?.id,
        senderType: user?.role,
        receiverId: parseInt(id),
        receiverType: serviceData.categoryId === 1 ? "talent" : "coach",
      });

      if (!res.ok) {
        throw new Error(t("failedToSendMessage"));
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: t("messageSentSuccessfully"),
        description: t("messageWillBeReplied"),
      });
      setIsContactDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: t("failedToSendMessage"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Add interest mutation
  const addInterestMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated || user?.role !== "club") {
        throw new Error(t("mustLoginAsClub"));
      }

      const res = await apiRequest("POST", "/api/club/interests", {
        clubId: user?.id,
        talentId: parseInt(id),
        status: "interested",
      });

      if (!res.ok) {
        throw new Error(t("failedToAddInterest"));
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: t("interestAddedSuccessfully"),
        description: t("addedToInterestList"),
      });
    },
    onError: (error) => {
      toast({
        title: t("failedToAddInterest"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: t("mustLoginFirst"),
        description: t("pleaseLoginToSendMessage"),
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.target);
    const messageData = {
      subject: formData.get("subject"),
      content: formData.get("message"),
    };

    sendMessageMutation.mutate(messageData);
  };

  // Handle adding interest
  const handleAddInterest = () => {
    if (!isAuthenticated) {
      toast({
        title: t("mustLoginFirst"),
        description: t("pleaseLoginAsClub"),
        variant: "destructive",
      });
      return;
    }

    if (user?.role !== "club") {
      toast({
        title: t("unauthorized"),
        description: t("mustBeRegisteredAsClub"),
        variant: "destructive",
      });
      return;
    }

    addInterestMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">{t("loadingDetails")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">
            {t("errorOccurred")}
          </h2>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            {t("retryAgain")}
          </Button>
        </div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{t("serviceNotFound")}</h2>
          <p className="mt-2 text-muted-foreground">
            {t("serviceNotExistOrDeleted")}
          </p>
          <Link href="/">
            <Button className="mt-4">{t("backToHomePage")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine service type
  const isPlayer = serviceData.categoryId === 1;
  const isCoach = serviceData.categoryId === 2 || serviceData.categoryId === 5; // Head coach or goalkeeper coach
  const isGoalkeeper = serviceData.categoryId === 3;
  const isGoalkeeperCoach = serviceData.categoryId === 5; // Goalkeeper coach

  // Function to translate positions from Arabic to current language
  const translatePosition = (position: string) => {
    if (!position) return position;

    // Position mapping from Arabic to translation keys
    const positionMap: Record<string, string> = {
      مهاجم: "striker_position",
      "وسط مهاجم": "attackingMid",
      "وسط مدافع": "defensiveMid",
      "وينج أيسر": "leftWing",
      "وينج أيمن": "rightWing",
      "جناح أيسر": "leftWing",
      "جناح أيمن": "rightWing",
      "مدافع أيسر": "leftBack",
      "مدافع أيمن": "rightBack",
      مدافع: "centerBack",
      "حارس مرمى": "goalkeeper_position",
      "حارس المرمى": "goalkeeper_position",
    };

    const translationKey = positionMap[position.trim()];
    return translationKey ? t(translationKey) : position;
  };

  // Function to translate descriptions from Arabic to current language
  const translateDescription = (description: string) => {
    if (!description) return description;

    // Description mapping from Arabic to translation keys
    const descriptionMap: Record<string, string> = {
      "لاعب وسط مهاجم موهوب بمهارات عالية في المراوغة والتسديد":
        "talentedAttackingMidfielder",
      "سنوات كمحترف، بدأ مسيرته مع فريق الشباب وتدرج للفريق الأول":
        "professionalCareerProgression",
      "مدافع خبير بقدرة عالية على القراءة التكتيكية للمباراة":
        "experiencedDefender",
      "حارس مرمى ماهر مع ردود أفعال سريعة وقدرة على إنقاذ الفريق":
        "skilledGoalkeeper",
      "لاعب جناح سريع مع قدرة عالية على المراوغة والتمرير": "fastWinger",
      "مهاجم قوي مع غريزة تهديفية عالية وقدرة على اللعب بالرأس":
        "strongStriker",
      "لاعب متعدد المواقع يمكنه اللعب في أكثر من مركز": "versatilePlayer",
      "موهبة شابة واعدة تحتاج إلى مزيد من التطوير": "youngTalent",
      "قائد خبير مع قدرة عالية على تحفيز الفريق": "experiencedCaptain",
      "لاعب تقني بمهارات عالية في الكرة والرؤية": "technicalPlayer",
      "لاعب قوي جسدياً مع قدرة عالية على الكفاح": "physicalPlayer",
      "صانع ألعاب مبدع مع قدرة على تنظيم اللعب": "playmaker",
      "مدرب خبير مع سنوات طويلة في تدريب الفرق المحترفة": "experiencedCoach",
      "مدرب تكتيكي ماهر في قراءة المباريات ووضع الخطط": "tacticalCoach",
      "مدرب متخصص في تطوير اللاعبين الشباب": "youthCoach",
      "مدرب لياقة بدنية متخصص في إعداد اللاعبين جسدياً": "fitnessCoach",
      "مدرب حراس مرمى متخصص في تطوير مهارات الحراسة": "goalkeepingCoach",
    };

    const translationKey = descriptionMap[description.trim()];
    return translationKey ? t(translationKey) : description;
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {t("back")}
        </Link>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {/* Left sidebar - Profile info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="mb-4 relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={serviceData.imageUrl}
                      alt={serviceData.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {serviceData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    {isPlayer
                      ? t("player")
                      : isCoach
                        ? t("coach")
                        : isGoalkeeper
                          ? t("goalkeeper")
                          : t("other")}
                  </Badge>
                </div>

                <h1 className="text-2xl font-bold">{serviceData.name}</h1>

                <div className="mt-1 flex items-center">
                  {serviceData.rating && (
                    <div className="flex items-center text-amber-500">
                      <Star className="mr-1 h-4 w-4 fill-current" />
                      <span>{serviceData.rating}</span>
                      <span className="mx-1 text-muted-foreground">/</span>
                      <span className="text-muted-foreground">5</span>
                    </div>
                  )}
                </div>

                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {translatePosition(serviceData.position)}
                  {serviceData.secondaryPosition &&
                    ` / ${translatePosition(serviceData.secondaryPosition)}`}
                </p>

                <div className="mt-6 grid w-full grid-cols-2 gap-2">
                  <Button onClick={() => setIsContactDialogOpen(true)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t("contact")}
                  </Button>

                  {user?.role === "club" && (
                    <Button variant="outline" onClick={handleAddInterest}>
                      <Heart className="mr-2 h-4 w-4" />
                      {t("interest")}
                    </Button>
                  )}
                </div>

                <div className="mt-4 w-full">
                  <Button variant="outline" className="w-full">
                    <Share className="mr-2 h-4 w-4" />
                    {t("share")}
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t pt-4">
                {serviceData.currentTeam && (
                  <div className="flex items-center">
                    <Building className="ml-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{serviceData.currentTeam}</span>
                  </div>
                )}

                {serviceData.contractStatus && (
                  <div className="flex items-center">
                    <FileBadge className="ml-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {serviceData.contractStatus}
                    </span>
                  </div>
                )}

                {serviceData.nationality && (
                  <div className="flex items-center">
                    <Flag className="ml-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{serviceData.nationality}</span>
                  </div>
                )}

                {serviceData.age && (
                  <div className="flex items-center">
                    <User className="ml-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {serviceData.age} {t("years")}
                    </span>
                  </div>
                )}

                {serviceData.experience && (
                  <div className="flex items-center">
                    <Briefcase className="ml-3 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {serviceData.experience} {t("yearsExperience")}
                    </span>
                  </div>
                )}
              </div>

              {isPlayer && (
                <div className="mt-6 grid grid-cols-3 gap-2 border-t pt-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("height")}
                    </p>
                    <p className="font-medium">{serviceData.height || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("weight")}
                    </p>
                    <p className="font-medium">{serviceData.weight || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("foot")}</p>
                    <p className="font-medium">{serviceData.foot || "—"}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="md:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">{t("overview")}</TabsTrigger>
              <TabsTrigger value="stats">
                {isPlayer
                  ? t("statistics")
                  : isCoach
                    ? t("achievements")
                    : t("information")}
              </TabsTrigger>
              <TabsTrigger value="media">{t("media")}</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isPlayer ? t("aboutPlayer") : t("aboutCoach")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{t("description")}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {serviceData.description
                          ? translateDescription(serviceData.description)
                          : t("noDescriptionAvailable")}
                      </p>
                    </div>

                    {isPlayer && (
                      <>
                        <div className="pt-2">
                          <h3 className="font-medium">{t("skills")}</h3>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                            {serviceData.skills ? (
                              serviceData.skills
                                .split("\n")
                                .map((skill, index) => (
                                  <li key={index}>{skill}</li>
                                ))
                            ) : (
                              <li>{t("noSkillsAdded")}</li>
                            )}
                          </ul>
                        </div>

                        {serviceData.previousTeams && (
                          <div className="pt-2">
                            <h3 className="font-medium">
                              {t("previousTeams")}
                            </h3>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                              {serviceData.previousTeams
                                .split("\n")
                                .map((team, index) => (
                                  <li key={index}>{team}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {isCoach && (
                      <>
                        {serviceData.specialization && (
                          <div className="pt-2">
                            <h3 className="font-medium">
                              {t("specialization")}
                            </h3>
                            <p className="mt-2 text-muted-foreground">
                              {serviceData.specialization}
                            </p>
                          </div>
                        )}

                        {serviceData.previousTeams && (
                          <div className="pt-2">
                            <h3 className="font-medium">
                              {t("previousTeams")}
                            </h3>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                              {serviceData.previousTeams
                                .split("\n")
                                .map((team, index) => (
                                  <li key={index}>{team}</li>
                                ))}
                            </ul>
                          </div>
                        )}

                        {serviceData.education && (
                          <div className="pt-2">
                            <h3 className="font-medium">
                              {t("academicQualifications")}
                            </h3>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                              {serviceData.education
                                .split("\n")
                                .map((edu, index) => (
                                  <li key={index}>{edu}</li>
                                ))}
                            </ul>
                          </div>
                        )}

                        {serviceData.licenses && (
                          <div className="pt-2">
                            <h3 className="font-medium">
                              {t("licensesAndCertificates")}
                            </h3>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                              {serviceData.licenses
                                .split("\n")
                                .map((license, index) => (
                                  <li key={index}>{license}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {testimonials && testimonials.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{t("testimonialsAndReviews")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testimonials.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="rounded-lg border p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>
                                  {testimonial.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {testimonial.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {testimonial.role && `${testimonial.role}، `}
                                  {testimonial.club}
                                </p>
                              </div>
                            </div>
                            {testimonial.rating && (
                              <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1">
                                  {testimonial.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="mt-3 text-muted-foreground">
                            {testimonial.text}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {new Date(testimonial.createdAt).toLocaleDateString(
                              "ar-SA",
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Stats/Achievements Tab */}
            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isPlayer
                      ? t("playerStatistics")
                      : isCoach
                        ? t("coachAchievements")
                        : t("additionalInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPlayer ? (
                    isLoadingStats ? (
                      <div className="flex h-48 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : stats && stats.length > 0 ? (
                      <Table>
                        <TableCaption>{t("statisticsPerSeason")}</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("season")}</TableHead>
                            <TableHead>{t("team")}</TableHead>
                            <TableHead>{t("competition")}</TableHead>
                            <TableHead className="text-center">
                              {t("matches")}
                            </TableHead>
                            <TableHead className="text-center">
                              {t("goals")}
                            </TableHead>
                            <TableHead className="text-center">
                              {t("assists")}
                            </TableHead>
                            <TableHead className="text-center">
                              {t("minutesPlayed")}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stats.map((stat) => (
                            <TableRow key={stat.id}>
                              <TableCell className="font-medium">
                                {stat.season}
                              </TableCell>
                              <TableCell>{stat.team}</TableCell>
                              <TableCell>
                                {stat.competition || "غير محدد"}
                              </TableCell>
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
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex h-48 flex-col items-center justify-center text-center">
                        <Info className="h-10 w-10 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">
                          {t("noStatisticsAvailable")}
                        </p>
                      </div>
                    )
                  ) : isCoach ? (
                    isLoadingAchievements ? (
                      <div className="flex h-48 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : achievements && achievements.length > 0 ? (
                      <div className="space-y-4">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex items-start rounded-lg border p-4"
                          >
                            <Award className="mt-1 ml-4 h-6 w-6 text-primary" />
                            <div>
                              <div className="flex items-center">
                                <Badge className="ml-2" variant="outline">
                                  {achievement.year}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                {achievement.title
                                  .split("\n")
                                  .map((item, index) => (
                                    <div key={index} className="mb-2">
                                      <h4 className="font-medium text-sm">
                                        {item}
                                      </h4>
                                    </div>
                                  ))}
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {achievement.team}
                              </p>
                              {achievement.description && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {achievement.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-48 flex-col items-center justify-center text-center">
                        <Info className="h-10 w-10 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">
                          {t("noAchievementsAvailable")}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center text-center">
                      <Info className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">
                        {t("noAdditionalInformation")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("mediaGallery")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingMedia ? (
                    <div className="flex h-48 items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : mediaFiles && mediaFiles.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {mediaFiles.map((media) => {
                        // Some APIs use 'type' and others use 'fileType'
                        const fileType = media.fileType || media.type;
                        // Similarly, some use 'url' and others use 'fileUrl'
                        const fileUrl = media.fileUrl || media.url;

                        // Log file data for debugging
                        console.log("Displaying media file:", media, {
                          fileType,
                          fileUrl,
                        });

                        // Ensure file path exists
                        if (!fileUrl) {
                          console.error("File URL is missing:", media);
                          return null;
                        }

                        // Create full URL for files
                        const mediaUrl = fileUrl.startsWith("/")
                          ? `${window.location.origin}${fileUrl}`
                          : fileUrl;

                        // Display each file based on its type
                        return (
                          <div
                            key={media.id}
                            className="overflow-hidden rounded-lg border"
                          >
                            <div className="aspect-video w-full">
                              {fileType === "image" ? (
                                <a
                                  href={mediaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={mediaUrl}
                                    alt={media.description || t("image")}
                                    className="h-full w-full object-cover"
                                  />
                                </a>
                              ) : fileType === "video" ? (
                                fileUrl.endsWith(".mp4") ? (
                                  <video
                                    src={mediaUrl}
                                    controls
                                    className="h-full w-full object-cover"
                                  >
                                    {t("browserDoesNotSupportVideo")}
                                  </video>
                                ) : (
                                  <a
                                    href={mediaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black h-full w-full flex items-center justify-center"
                                  >
                                    <svg
                                      className="w-12 h-12 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        strokeWidth="2"
                                      />
                                      <polygon
                                        fill="currentColor"
                                        points="10,8 16,12 10,16"
                                      />
                                    </svg>
                                  </a>
                                )
                              ) : fileType === "document" ? (
                                <a
                                  href={mediaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-secondary h-full w-full flex items-center justify-center"
                                >
                                  <svg
                                    className="w-12 h-12 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <div className="bg-muted h-full w-full flex items-center justify-center text-sm">
                                  {t("unknownFileType")}
                                </div>
                              )}
                            </div>
                            <div className="p-2">
                              <p className="font-medium line-clamp-1">
                                {media.fileName ||
                                  (fileType === "image"
                                    ? t("image")
                                    : fileType === "video"
                                      ? t("video")
                                      : fileType === "document"
                                        ? t("document")
                                        : t("file"))}
                              </p>
                              {media.description && (
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {media.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center text-center">
                      <Info className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">
                        {t("noMediaAvailable")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("contactWith")} {serviceData.name}
            </DialogTitle>
            <DialogDescription>
              {isPlayer ? t("messageToPlayer") : t("messageToCoach")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">{t("subject")}</Label>
              <Input
                id="subject"
                name="subject"
                placeholder={t("enterSubject")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("message")}</Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t("enterMessage")}
                rows={5}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={sendMessageMutation.isPending}>
                {sendMessageMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  t("sendMessage")
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
