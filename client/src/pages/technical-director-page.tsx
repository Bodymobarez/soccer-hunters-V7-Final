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
  Brain,
  Clipboard,
  BarChart3,
  Settings,
  Users2,
  Medal,
  ChevronRight,
  PlayCircle,
  BookOpen,
  Lightbulb,
  PieChart,
  TrendingDown,
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

interface TechnicalDirector {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  experience: number;
  currentClub?: string;
  previousClubs: string[];
  achievements: string[];
  rating: number;
  reviews: number;
  imageUrl?: string;
  languages: string[];
  expertise: string[];
  philosophy: string;
  tacticalApproach: string;
  isVerified: boolean;
  isAvailable: boolean;
  contractType: string;
  marketValue: string;
  trophiesWon: number;
  playersManaged: number;
  transfersCompleted: number;
  budgetManaged: string;
  mediaRating: number;
  playerDevelopmentScore: number;
  strategicVisionScore: number;
  leadershipScore: number;
  education: string[];
  certifications: string[];
  successRate: number;
  preferredFormation: string;
  ageRange: string;
  careerHighlights: string[];
  isTopRated: boolean;
  isPremium: boolean;
}

// Technical Director page component
export default function TechnicalDirectorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredDirectors, setFilteredDirectors] = useState<
    TechnicalDirector[]
  >([]);
  const { t } = useTranslation();

  // Mock technical directors data - replace with actual API
  const mockDirectors: TechnicalDirector[] = [
    {
      id: 1,
      name: "Roberto Martinez",
      email: "r.martinez@techdir.com",
      phone: "+34 600 123 456",
      location: "Madrid, Spain",
      description:
        "Experienced technical director with 15+ years in elite football management, specializing in youth development and strategic planning",
      experience: 18,
      currentClub: "Available for new opportunity",
      previousClubs: ["Real Sociedad", "Everton FC", "Belgium National Team"],
      achievements: [
        "UEFA Nations League Semi-Final 2021",
        "Belgium's Golden Generation Development",
        "FA Cup Runner-up 2016",
        "Multiple Youth Development Awards",
      ],
      rating: 4.9,
      reviews: 147,
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      languages: ["Spanish", "English", "French", "Dutch"],
      expertise: [
        "Youth Development",
        "Strategic Planning",
        "International Football",
        "Tactical Innovation",
        "Player Scouting",
      ],
      philosophy:
        "Developing young talent while maintaining competitive excellence through innovative tactical approaches",
      tacticalApproach:
        "Possession-based football with emphasis on technical skills and tactical flexibility",
      isVerified: true,
      isAvailable: true,
      contractType: "Full-time",
      marketValue: "€2.5M annually",
      trophiesWon: 8,
      playersManaged: 450,
      transfersCompleted: 89,
      budgetManaged: "€150M+",
      mediaRating: 4.7,
      playerDevelopmentScore: 95,
      strategicVisionScore: 92,
      leadershipScore: 89,
      education: [
        "UEFA Pro License",
        "Sports Management Master's",
        "Psychology Degree",
      ],
      certifications: [
        "FIFA Technical Director Certificate",
        "UEFA Elite Youth License",
      ],
      successRate: 87,
      preferredFormation: "4-3-3 / 3-4-3",
      ageRange: "48 years",
      careerHighlights: [
        "Transformed Belgium into World Cup contenders",
        "Developed 15+ international players",
        "Record transfer profit of €80M in one season",
      ],
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 2,
      name: "Michael Edwards",
      email: "m.edwards@sporting.com",
      phone: "+44 7700 900 123",
      location: "Liverpool, England",
      description:
        "Former Liverpool sporting director known for revolutionary recruitment strategies and data-driven decision making",
      experience: 12,
      currentClub: "Available",
      previousClubs: ["Liverpool FC", "Tottenham Hotspur", "Portsmouth FC"],
      achievements: [
        "Premier League Champion 2019-20",
        "UEFA Champions League Winner 2019",
        "Revolutionary Transfer Strategy",
        "€200M+ Transfer Profit",
      ],
      rating: 4.8,
      reviews: 98,
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      languages: ["English", "German", "Spanish"],
      expertise: [
        "Data Analytics",
        "Player Recruitment",
        "Contract Negotiations",
        "Squad Planning",
        "Market Analysis",
      ],
      philosophy:
        "Data-driven recruitment combined with traditional scouting to identify undervalued talent",
      tacticalApproach:
        "Flexible tactical systems based on player strengths and opposition analysis",
      isVerified: true,
      isAvailable: true,
      contractType: "Consultant/Full-time",
      marketValue: "€3.2M annually",
      trophiesWon: 6,
      playersManaged: 320,
      transfersCompleted: 156,
      budgetManaged: "€500M+",
      mediaRating: 4.9,
      playerDevelopmentScore: 88,
      strategicVisionScore: 98,
      leadershipScore: 91,
      education: ["Sports Science Degree", "Data Analytics Certification"],
      certifications: [
        "Advanced Scouting License",
        "Football Analytics Certificate",
      ],
      successRate: 92,
      preferredFormation: "4-2-3-1 / 4-3-3",
      ageRange: "44 years",
      careerHighlights: [
        "Signed Salah, Mané, Van Dijk for combined €200M",
        "Generated €300M+ in player sales",
        "Transformed Liverpool's recruitment model",
      ],
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 3,
      name: "Luis Campos",
      email: "l.campos@director.com",
      phone: "+33 6 12 34 56 78",
      location: "Paris, France",
      description:
        "Innovative technical director with expertise in French and European markets, known for discovering world-class talents",
      experience: 16,
      currentClub: "Paris Saint-Germain",
      previousClubs: ["AS Monaco", "LOSC Lille", "Real Madrid (Scout)"],
      achievements: [
        "Ligue 1 Champion with Monaco 2016-17",
        "Discovered Mbappé, Fabinho, Bernardo Silva",
        "Champions League Semi-Final 2017",
        "Multiple Scouting Awards",
      ],
      rating: 4.7,
      reviews: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      languages: ["Portuguese", "French", "Spanish", "English"],
      expertise: [
        "Talent Identification",
        "South American Networks",
        "Youth Academies",
        "Transfer Strategy",
        "Club Development",
      ],
      philosophy:
        "Identifying young talents with potential for exponential growth and development",
      tacticalApproach:
        "Attacking minded football with emphasis on technical skills and pace",
      isVerified: true,
      isAvailable: false,
      contractType: "Full-time",
      marketValue: "€2.8M annually",
      trophiesWon: 12,
      playersManaged: 380,
      transfersCompleted: 134,
      budgetManaged: "€400M+",
      mediaRating: 4.6,
      playerDevelopmentScore: 97,
      strategicVisionScore: 88,
      leadershipScore: 85,
      education: ["Sports Management", "International Relations"],
      certifications: ["FIFA Agent License", "UEFA Technical Director"],
      successRate: 85,
      preferredFormation: "4-4-2 / 4-2-3-1",
      ageRange: "59 years",
      careerHighlights: [
        "Discovered and developed Kylian Mbappé",
        "Built Monaco's title-winning squad for €100M",
        "Over €1B in successful transfers",
      ],
      isTopRated: true,
      isPremium: false,
    },
    {
      id: 4,
      name: "Andrea Berta",
      email: "a.berta@atletico.com",
      phone: "+39 335 123 456",
      location: "Madrid, Spain",
      description:
        "Strategic technical director with deep knowledge of European and South American markets, expert in defensive organization",
      experience: 14,
      currentClub: "Atlético Madrid",
      previousClubs: ["Genoa CFC", "UC Sampdoria", "Parma FC"],
      achievements: [
        "La Liga Champion 2020-21",
        "UEFA Champions League Finalist 2016",
        "Europa League Winner 2018",
        "Consistent Top 4 Finishes",
      ],
      rating: 4.6,
      reviews: 76,
      imageUrl:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      languages: ["Italian", "Spanish", "English", "Portuguese"],
      expertise: [
        "Defensive Systems",
        "Italian Markets",
        "Contract Management",
        "Team Building",
        "Tactical Analysis",
      ],
      philosophy:
        "Building solid defensive foundations while maintaining attacking threat through strategic recruitment",
      tacticalApproach:
        "Compact defensive structure with quick counter-attacking transitions",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€2.1M annually",
      trophiesWon: 9,
      playersManaged: 290,
      transfersCompleted: 98,
      budgetManaged: "€200M+",
      mediaRating: 4.4,
      playerDevelopmentScore: 82,
      strategicVisionScore: 89,
      leadershipScore: 88,
      education: ["Law Degree", "Sports Management"],
      certifications: ["UEFA A License", "FIFA Technical Course"],
      successRate: 81,
      preferredFormation: "4-4-2 / 5-3-2",
      ageRange: "52 years",
      careerHighlights: [
        "Signed João Félix for record fee",
        "Built Atlético's defensive dynasty",
        "Consistent Champions League qualification",
      ],
      isTopRated: false,
      isPremium: true,
    },
  ];

  // Fetch technical directors (using mock data for now)
  const {
    data: directors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["technical-directors"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return mockDirectors;
    },
  });

  // Filter and sort directors
  useEffect(() => {
    if (directors) {
      let filtered = directors.filter((director) => {
        const matchesSearch =
          director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          director.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          director.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          director.expertise.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesExperience =
          selectedExperience === "all" ||
          (selectedExperience === "junior" && director.experience < 8) ||
          (selectedExperience === "mid" &&
            director.experience >= 8 &&
            director.experience < 15) ||
          (selectedExperience === "senior" && director.experience >= 15);

        const matchesAvailability =
          selectedAvailability === "all" ||
          (selectedAvailability === "available" && director.isAvailable) ||
          (selectedAvailability === "contracted" && !director.isAvailable);

        return matchesSearch && matchesExperience && matchesAvailability;
      });

      // Sort directors
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
          case "rating":
            aValue = a.rating;
            bValue = b.rating;
            break;
          case "trophies":
            aValue = a.trophiesWon;
            bValue = b.trophiesWon;
            break;
          case "success":
            aValue = a.successRate;
            bValue = b.successRate;
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

      setFilteredDirectors(filtered);
    }
  }, [
    searchTerm,
    selectedExperience,
    selectedAvailability,
    sortBy,
    sortOrder,
    directors,
  ]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary/60" />
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("loadingTechnicalDirectors")}
          </p>
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/2 to-accent/5">
      <div className="container py-8">
        {/* Professional Header Section */}
        <div className="relative mb-12 text-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 rounded-3xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-card via-card/95 to-card/90 border border-primary/20 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6 mx-auto w-24 h-24 bg-gradient-to-br from-primary via-accent to-secondary rounded-full flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Brain className="h-12 w-12 text-white" />
            </div>

            <h1 className="mb-4 text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Elite Technical Directors
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Connect with world-class technical directors who shape the future
              of football through strategic vision, innovative recruitment, and
              exceptional leadership in elite sports organizations.
            </p>

            {/* Enhanced Stats Dashboard */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/90 backdrop-blur rounded-xl p-6 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold text-primary">
                      {directors?.length || 0}
                    </div>
                    <Users2 className="h-8 w-8 text-primary/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Elite Directors
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/90 backdrop-blur rounded-xl p-6 border border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold text-accent">
                      {directors?.filter((d) => d.isAvailable).length || 0}
                    </div>
                    <CheckCircle className="h-8 w-8 text-accent/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Available Now
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/90 backdrop-blur rounded-xl p-6 border border-secondary/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold text-secondary">
                      {directors?.filter((d) => d.isTopRated).length || 0}
                    </div>
                    <Crown className="h-8 w-8 text-secondary/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Top Rated
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/90 backdrop-blur rounded-xl p-6 border border-yellow-500/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold text-yellow-600">
                      {directors?.reduce((sum, d) => sum + d.trophiesWon, 0) ||
                        0}
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Total Trophies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg" />
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, location, expertise, or philosophy..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-14 pr-6 py-4 text-lg rounded-2xl border-2 border-primary/30 focus:border-primary/60 shadow-lg bg-card/95 backdrop-blur"
              />
              <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-primary/60" />
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="flex flex-wrap items-center gap-6 justify-center bg-card/50 backdrop-blur rounded-xl p-6 border border-border/50 shadow-lg">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Advanced Filters:
              </span>
            </div>

            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="w-52 bg-background/80 border-primary/20">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience Levels</SelectItem>
                <SelectItem value="junior">Emerging (5-8 years)</SelectItem>
                <SelectItem value="mid">Experienced (8-15 years)</SelectItem>
                <SelectItem value="senior">Elite (15+ years)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedAvailability}
              onValueChange={setSelectedAvailability}
            >
              <SelectTrigger className="w-52 bg-background/80 border-primary/20">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Directors</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="contracted">Currently Contracted</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 bg-background/80 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="trophies">Trophies Won</SelectItem>
                  <SelectItem value="success">Success Rate</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3 bg-background/80 border-primary/20 hover:bg-primary/10"
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
          <div className="flex justify-between items-center mb-8">
            <TabsList className="bg-card/60 backdrop-blur border border-border/50 shadow-lg">
              <TabsTrigger
                value="grid"
                className="flex items-center gap-2 data-[state=active]:bg-primary/20"
              >
                <BarChart3 className="h-4 w-4" />
                Executive View
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex items-center gap-2 data-[state=active]:bg-primary/20"
              >
                <Clipboard className="h-4 w-4" />
                Detailed Analysis
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3 bg-card/60 backdrop-blur rounded-lg px-4 py-2 border border-border/50 shadow-lg">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                <span className="text-primary font-semibold">
                  {filteredDirectors.length}
                </span>{" "}
                Elite Directors Found
              </span>
            </div>
          </div>

          {/* Executive Grid View */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              {filteredDirectors.map((director) => (
                <Card
                  key={director.id}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/40 bg-gradient-to-br from-card via-card/95 to-card/90"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative p-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      {director.imageUrl ? (
                        <img
                          src={director.imageUrl}
                          alt={director.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Brain className="h-20 w-20 text-primary/40" />
                        </div>
                      )}

                      {/* Status Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Status Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {director.isVerified && (
                          <Badge
                            variant="secondary"
                            className="bg-green-500/90 text-white text-xs backdrop-blur"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {director.isTopRated && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/90 text-white text-xs backdrop-blur"
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            Elite
                          </Badge>
                        )}
                        {director.isPremium && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-500/90 text-white text-xs backdrop-blur"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Availability Status */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className={`text-xs backdrop-blur ${
                            director.isAvailable
                              ? "bg-green-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {director.isAvailable ? "Available" : "Contracted"}
                        </Badge>
                      </div>

                      {/* Rating & Experience */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {director.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur">
                          <Calendar className="h-4 w-4" />
                          <span>{director.experience}y</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative p-6">
                    <div className="mb-4">
                      <CardTitle className="mb-2 text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {director.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {director.location}
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                        {director.description}
                      </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                      <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <div>
                          <div className="font-semibold text-yellow-600">
                            {director.trophiesWon}
                          </div>
                          <div className="text-muted-foreground">Trophies</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-accent/5 rounded-lg p-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-600">
                            {director.successRate}%
                          </div>
                          <div className="text-muted-foreground">Success</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary/5 rounded-lg p-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-semibold text-blue-600">
                            {director.playersManaged}
                          </div>
                          <div className="text-muted-foreground">Players</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-100/50 rounded-lg p-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="font-semibold text-purple-600">
                            {director.budgetManaged}
                          </div>
                          <div className="text-muted-foreground">Budget</div>
                        </div>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {director.expertise.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-primary/10 border-primary/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {director.expertise.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-muted/50"
                          >
                            +{director.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Philosophy */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                        PHILOSOPHY
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 italic leading-relaxed">
                        "{director.philosophy}"
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="relative p-6 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-foreground">
                        {director.marketValue}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 hover:bg-primary/10"
                      >
                        <Phone className="h-3 w-3" />
                        Contact
                      </Button>
                      <Link href={`/technical-director/${director.id}`}>
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                        >
                          <Eye className="h-3 w-3" />
                          Profile
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Detailed Analysis List View */}
          <TabsContent value="list">
            <div className="space-y-6">
              {filteredDirectors.map((director) => (
                <Card
                  key={director.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/30 bg-gradient-to-r from-card via-card/98 to-card/95"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="h-64 w-full lg:h-auto lg:w-80 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative">
                      {director.imageUrl ? (
                        <img
                          src={director.imageUrl}
                          alt={director.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Brain className="h-20 w-20 text-primary/40" />
                        </div>
                      )}

                      {/* Availability Indicator */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className={`backdrop-blur ${
                            director.isAvailable
                              ? "bg-green-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {director.isAvailable ? "Available" : "Contracted"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold flex items-center gap-3 mb-2">
                                {director.name}
                                {director.isVerified && (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                                {director.isTopRated && (
                                  <Crown className="h-5 w-5 text-yellow-500" />
                                )}
                                {director.isPremium && (
                                  <Zap className="h-5 w-5 text-purple-500" />
                                )}
                              </h3>
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {director.location}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {director.experience} years experience
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
                              <Star className="h-5 w-5 text-amber-500" />
                              <span className="font-bold text-lg">
                                {director.rating}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({director.reviews} reviews)
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {director.description}
                          </p>

                          {/* Key Performance Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-yellow-600" />
                                <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-200">
                                  TROPHIES
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                                {director.trophiesWon}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                <span className="text-xs font-semibold text-green-800 dark:text-green-200">
                                  SUCCESS RATE
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                {director.successRate}%
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-800 dark:text-blue-200">
                                  PLAYERS
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                {director.playersManaged}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-purple-600" />
                                <span className="text-xs font-semibold text-purple-800 dark:text-purple-200">
                                  BUDGET
                                </span>
                              </div>
                              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                                {director.budgetManaged}
                              </div>
                            </div>
                          </div>

                          {/* Professional Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                CURRENT STATUS
                              </h4>
                              <p className="text-sm mb-3">
                                {director.currentClub}
                              </p>

                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                LANGUAGES
                              </h4>
                              <p className="text-sm">
                                {director.languages.join(", ")}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                MARKET VALUE
                              </h4>
                              <p className="text-sm mb-3 font-semibold text-primary">
                                {director.marketValue}
                              </p>

                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                PREFERRED FORMATION
                              </h4>
                              <p className="text-sm">
                                {director.preferredFormation}
                              </p>
                            </div>
                          </div>

                          {/* Philosophy & Approach */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                              PHILOSOPHY
                            </h4>
                            <p className="text-sm italic bg-muted/30 p-4 rounded-lg leading-relaxed border-l-4 border-primary">
                              "{director.philosophy}"
                            </p>
                          </div>

                          {/* Expertise */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                              CORE EXPERTISE
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {director.expertise.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-primary/10 text-primary border-primary/20"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Career Highlights */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                              CAREER HIGHLIGHTS
                            </h4>
                            <div className="space-y-2">
                              {director.careerHighlights
                                .slice(0, 3)
                                .map((highlight, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">
                                      {highlight}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:w-48">
                          <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                            <Phone className="h-4 w-4" />
                            Contact Director
                          </Button>
                          <Link href={`/technical-director/${director.id}`}>
                            <Button
                              variant="outline"
                              className="w-full flex items-center gap-2 hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4" />
                              Full Profile
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2 text-muted-foreground hover:text-primary"
                          >
                            <BookOpen className="h-4 w-4" />
                            Portfolio
                          </Button>
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
        {filteredDirectors.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-6 mx-auto w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
              <Brain className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">
              No Technical Directors Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Adjust your search criteria or filters to discover elite technical
              directors that match your requirements.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedExperience("all");
                setSelectedAvailability("all");
              }}
              className="bg-gradient-to-r from-primary to-accent"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
