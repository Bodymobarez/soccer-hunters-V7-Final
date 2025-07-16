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
  Briefcase,
  CheckCircle,
  Timer,
  Network,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

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

interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  specialization: string;
  experience: number;
  clients: number;
  successfulDeals: number;
  rating: number;
  reviews: number;
  imageUrl?: string;
  commission: string;
  languages: string[];
  expertise: string[];
  activeClients: number;
  founded: number;
  isVerified: boolean;
  responseTime: string;
  marketValue: string;
  yearsInBusiness: number;
  isActivelyRecruiting: boolean;
  isTopRated: boolean;
  isPremium: boolean;
}

// Agent page component
export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const { t } = useTranslation();

  // Mock agents data - replace with actual API
  const mockAgents: Agent[] = [
    {
      id: 1,
      name: "Ahmed Mohammed Al-Wakeel",
      email: "ahmed.agent@soccerhunter.com",
      phone: "+966501234567",
      location: "Riyadh, Saudi Arabia",
      description:
        "Professional players agent specializing in Saudi and Gulf players with 15 years of experience in the transfer market",
      specialization: "Players Agent",
      experience: 15,
      clients: 45,
      successfulDeals: 120,
      rating: 4.8,
      reviews: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      commission: "5-10%",
      languages: ["Arabic", "English", "French"],
      expertise: [
        "Saudi Professional League",
        "European Leagues",
        "Professional Contracts",
      ],
      activeClients: 28,
      founded: 2009,
      isVerified: true,
      responseTime: "Within 2 hours",
      marketValue: "50M+",
      yearsInBusiness: 15,
      isActivelyRecruiting: true,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 2,
      name: "Fatima Abdullah",
      email: "fatima.sports@gmail.com",
      phone: "+966502345678",
      location: "Jeddah, Saudi Arabia",
      description:
        "Sports agent specializing in women's football players and other women's sports",
      specialization: "Women's Sports Agent",
      experience: 8,
      clients: 22,
      successfulDeals: 45,
      rating: 4.9,
      reviews: 34,
      imageUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400&h=400&fit=crop&crop=face",
      commission: "8-12%",
      languages: ["Arabic", "English"],
      expertise: ["Women's Football", "Women's Sports", "Legal Consultations"],
      activeClients: 18,
      founded: 2016,
      isVerified: true,
      responseTime: "Within 4 hours",
      marketValue: "20M+",
      yearsInBusiness: 8,
      isActivelyRecruiting: true,
      isTopRated: true,
      isPremium: false,
    },
    {
      id: 3,
      name: "Mohammed Al-Otaibi",
      email: "m.alotaibi@agents.sa",
      phone: "+966503456789",
      location: "Dammam, Saudi Arabia",
      description:
        "Agent specializing in coaches and technical staff for clubs and national teams",
      specialization: "Coaches Agent",
      experience: 12,
      clients: 35,
      successfulDeals: 78,
      rating: 4.6,
      reviews: 67,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      commission: "6-9%",
      languages: ["Arabic", "English", "German"],
      expertise: [
        "Foreign Coaches",
        "Technical Staff",
        "Management Consulting",
      ],
      activeClients: 25,
      founded: 2012,
      isVerified: true,
      responseTime: "Within 6 hours",
      marketValue: "35M+",
      yearsInBusiness: 12,
      isActivelyRecruiting: false,
      isTopRated: false,
      isPremium: true,
    },
    {
      id: 4,
      name: "Sarah Al-Ghamdi",
      email: "sara.sports@outlook.com",
      phone: "+966504567890",
      location: "Abha, Saudi Arabia",
      description:
        "Young agent specializing in youth players and emerging talents",
      specialization: "Youth Talents Agent",
      experience: 5,
      clients: 18,
      successfulDeals: 25,
      rating: 4.7,
      reviews: 28,
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      commission: "4-8%",
      languages: ["Arabic", "English", "Spanish"],
      expertise: ["Academies", "Young Talents", "Career Development"],
      activeClients: 15,
      founded: 2019,
      isVerified: false,
      responseTime: "Within 1 day",
      marketValue: "10M+",
      yearsInBusiness: 5,
      isActivelyRecruiting: true,
      isTopRated: false,
      isPremium: false,
    },
  ];

  // Fetch agents (using mock data for now)
  const {
    data: agents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockAgents;
    },
  });

  // Filter and sort agents
  useEffect(() => {
    if (agents) {
      let filtered = agents.filter((agent) => {
        const matchesSearch =
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.specialization.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialization =
          selectedSpecialization === "all" ||
          agent.specialization === selectedSpecialization;

        const matchesExperience =
          selectedExperience === "all" ||
          (selectedExperience === "junior" && agent.experience < 5) ||
          (selectedExperience === "mid" &&
            agent.experience >= 5 &&
            agent.experience < 10) ||
          (selectedExperience === "senior" && agent.experience >= 10);

        return matchesSearch && matchesSpecialization && matchesExperience;
      });

      // Sort agents
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (sortBy) {
          case "name":
            aValue = a.name;
            bValue = b.name;
            break;
          case "experience":
            aValue = a.experience;
            bValue = b.experience;
            break;
          case "clients":
            aValue = a.clients;
            bValue = b.clients;
            break;
          case "rating":
            aValue = a.rating;
            bValue = b.rating;
            break;
          case "deals":
            aValue = a.successfulDeals;
            bValue = b.successfulDeals;
            break;
          default:
            aValue = a.name;
            bValue = b.name;
        }

        if (typeof aValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
      });

      setFilteredAgents(filtered);
    }
  }, [
    searchTerm,
    selectedSpecialization,
    selectedExperience,
    sortBy,
    sortOrder,
    agents,
  ]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <p className="mt-2 text-muted-foreground">
            {error instanceof Error ? error.message : t("error")}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            {t("retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container py-12">
        {/* Enhanced Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 mx-auto w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t("sportsAgentsDirectory")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("agentsPageDescription")}
          </p>

          {/* Stats Dashboard */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-4 shadow-md border">
              <div className="text-2xl font-bold text-primary">
                {agents?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("availableAgents")}
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-md border">
              <div className="text-2xl font-bold text-accent">
                {agents?.filter((a) => a.isTopRated).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("topRatedAgents")}
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-md border">
              <div className="text-2xl font-bold text-secondary">
                {agents?.filter((a) => a.isVerified).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("verifiedAgents")}
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-md border">
              <div className="text-2xl font-bold text-primary">
                {agents?.filter((a) => a.isActivelyRecruiting).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("activelyRecruiting")}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative mx-auto max-w-2xl">
            <Input
              type="text"
              placeholder={t("searchByAgent")}
              value={searchTerm}
              onChange={handleSearch}
              className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-primary/20 focus:border-primary/50 shadow-md"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t("filters")}:</span>
            </div>

            <Select
              value={selectedSpecialization}
              onValueChange={setSelectedSpecialization}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("selectSpecialization")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allSpecializations")}</SelectItem>
                <SelectItem value="Players Agent">
                  {t("playersAgent")}
                </SelectItem>
                <SelectItem value="Coaches Agent">
                  {t("coachesAgent")}
                </SelectItem>
                <SelectItem value="Women's Sports Agent">
                  {t("femaleAgent")}
                </SelectItem>
                <SelectItem value="Youth Talents Agent">
                  {t("youngTalentsAgent")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("selectExperience")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allExperience")}</SelectItem>
                <SelectItem value="junior">{t("juniorLevel")}</SelectItem>
                <SelectItem value="mid">{t("midLevel")}</SelectItem>
                <SelectItem value="senior">{t("seniorLevel")}</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("sortBy")}:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{t("name")}</SelectItem>
                  <SelectItem value="experience">{t("experience")}</SelectItem>
                  <SelectItem value="clients">{t("clients")}</SelectItem>
                  <SelectItem value="rating">{t("rating")}</SelectItem>
                  <SelectItem value="deals">{t("successfulDeals")}</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3"
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

        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {t("gridView")}
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {t("listView")}
              </TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              {t("found")} {filteredAgents.length} {t("agents")}
            </p>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30"
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      {agent.imageUrl ? (
                        <img
                          src={agent.imageUrl}
                          alt={agent.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Briefcase className="h-16 w-16 text-primary/40" />
                        </div>
                      )}

                      {/* Status Badges */}
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {agent.isVerified && (
                          <Badge
                            variant="secondary"
                            className="bg-green-500 text-white text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {t("verified")}
                          </Badge>
                        )}
                        {agent.isTopRated && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500 text-white text-xs"
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            {t("topRated")}
                          </Badge>
                        )}
                        {agent.isPremium && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-500 text-white text-xs"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            {t("premium")}
                          </Badge>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {agent.rating}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <CardTitle className="mb-2 line-clamp-1 text-lg">
                      {agent.name}
                    </CardTitle>
                    <p className="line-clamp-2 text-sm text-muted-foreground mb-3">
                      {agent.description}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-3 w-3 text-primary" />
                        <span className="font-medium">
                          {agent.specialization}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{agent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {agent.experience} {t("yearsExperience")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {agent.clients} {t("clients")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {agent.successfulDeals} {t("successfulDeals")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {t("commission")}: {agent.commission}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {t("responseTime")}: {agent.responseTime}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">
                        {agent.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({agent.reviews})
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        {t("contact")}
                      </Button>
                      <Link href={`/agent/${agent.id}`}>
                        <Button size="sm" className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {t("view")}
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="h-48 w-full lg:h-auto lg:w-64 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      {agent.imageUrl ? (
                        <img
                          src={agent.imageUrl}
                          alt={agent.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Briefcase className="h-16 w-16 text-primary/40" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold flex items-center gap-2">
                                {agent.name}
                                {agent.isVerified && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                {agent.isTopRated && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                                {agent.isPremium && (
                                  <Zap className="h-4 w-4 text-purple-500" />
                                )}
                              </h3>
                              <p className="text-sm font-medium text-primary">
                                {agent.specialization}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span className="font-medium">
                                {agent.rating}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({agent.reviews})
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">
                            {agent.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{agent.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {agent.experience} {t("yearsExperience")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {agent.clients} {t("clients")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {agent.successfulDeals} {t("successfulDeals")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {t("commission")}: {agent.commission}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4 text-muted-foreground" />
                              <span>{agent.responseTime}</span>
                            </div>
                          </div>

                          {agent.languages.length > 0 && (
                            <div className="mt-3">
                              <span className="text-sm font-medium text-muted-foreground">
                                {t("languages")}:{" "}
                              </span>
                              <span className="text-sm">
                                {agent.languages.join(", ")}
                              </span>
                            </div>
                          )}

                          {agent.expertise.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {agent.expertise.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-40">
                          <Button className="w-full flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {t("contact")}
                          </Button>
                          <Link href={`/agent/${agent.id}`}>
                            <Button
                              variant="outline"
                              className="w-full flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              {t("viewProfile")}
                            </Button>
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

        {/* No results */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("noAgentsFound")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("tryDifferentSearch")}
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialization("all");
                setSelectedExperience("all");
              }}
            >
              {t("clearFilters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
