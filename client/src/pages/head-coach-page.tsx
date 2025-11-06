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
  Gamepad2,
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
  Flag,
  Crosshair,
  Command,
  Megaphone,
  Tactics,
  Strategy,
  Brain,
  Zap as Lightning,
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

interface HeadCoach {
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
  tacticalStyle: string;
  preferredFormation: string;
  philosophy: string;
  isVerified: boolean;
  isAvailable: boolean;
  contractType: string;
  marketValue: string;
  trophiesWon: number;
  playersCoached: number;
  matchesManaged: number;
  winPercentage: number;
  currentLeague: string;
  coachingLicense: string;
  mediaRating: number;
  playerDevelopmentScore: number;
  tacticalInnovationScore: number;
  leadershipScore: number;
  motivationScore: number;
  education: string[];
  certifications: string[];
  ageRange: string;
  careerHighlights: string[];
  specializations: string[];
  communicationStyle: string;
  pressConferenceRating: number;
  clubCultureFit: number;
  transferMarketInfluence: number;
  youthDevelopmentExperience: boolean;
  internationalExperience: boolean;
  isTopRated: boolean;
  isPremium: boolean;
  isLegendary: boolean;
}

// Head Coach page component
export default function HeadCoachPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredCoaches, setFilteredCoaches] = useState<HeadCoach[]>([]);
  const { t } = useTranslation();

  // Mock head coaches data - replace with actual API
  const mockCoaches: HeadCoach[] = [
    {
      id: 1,
      name: "Pep Guardiola",
      email: "p.guardiola@cityfc.com",
      phone: "+44 161 444 1894",
      location: "Manchester, England",
      description:
        "Visionary head coach known for revolutionary possession-based football and tactical innovation with unprecedented success across multiple elite clubs",
      experience: 16,
      currentClub: "Manchester City",
      previousClubs: ["FC Barcelona", "Bayern Munich"],
      achievements: [
        "4x Premier League Champion",
        "3x Champions League Winner",
        "14x Domestic League Titles",
        "36+ Major Trophies",
      ],
      rating: 4.95,
      reviews: 289,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      languages: ["Spanish", "Catalan", "English", "German", "Italian"],
      tacticalStyle: "Possession-based Tiki-Taka",
      preferredFormation: "4-3-3 / 3-2-4-1",
      philosophy:
        "Football is about controlling space and time through intelligent possession and positional play",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€25M annually",
      trophiesWon: 36,
      playersCoached: 650,
      matchesManaged: 890,
      winPercentage: 73.2,
      currentLeague: "Premier League",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.8,
      playerDevelopmentScore: 96,
      tacticalInnovationScore: 99,
      leadershipScore: 95,
      motivationScore: 92,
      education: ["UEFA Pro License", "Sports Science Background"],
      certifications: ["Advanced Tactical Analysis", "Youth Development"],
      ageRange: "53 years",
      careerHighlights: [
        "Youngest coach to win Champions League",
        "Only coach to win league titles in Spain, Germany, and England",
        "Revolutionized modern football tactics",
      ],
      specializations: [
        "Tactical Innovation",
        "Possession Football",
        "Player Development",
        "Youth Integration",
      ],
      communicationStyle: "Philosophical and Detailed",
      pressConferenceRating: 4.6,
      clubCultureFit: 95,
      transferMarketInfluence: 92,
      youthDevelopmentExperience: true,
      internationalExperience: false,
      isTopRated: true,
      isPremium: true,
      isLegendary: true,
    },
    {
      id: 2,
      name: "Jurgen Klopp",
      email: "j.klopp@lfc.com",
      phone: "+44 151 263 2361",
      location: "Liverpool, England",
      description:
        "Charismatic and passionate head coach known for high-intensity pressing football and building incredible team spirit with emotional leadership",
      experience: 22,
      currentClub: "Available",
      previousClubs: ["Liverpool FC", "Borussia Dortmund", "FSV Mainz 05"],
      achievements: [
        "1x Premier League Champion",
        "1x Champions League Winner",
        "2x Bundesliga Champion",
        "Multiple Cup Winners",
      ],
      rating: 4.89,
      reviews: 456,
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      languages: ["German", "English"],
      tacticalStyle: "High-Intensity Gegenpressing",
      preferredFormation: "4-3-3 / 4-2-3-1",
      philosophy:
        "We must turn from doubters to believers through passionate, relentless football and never giving up",
      isVerified: true,
      isAvailable: true,
      contractType: "Sabbatical/Available",
      marketValue: "€20M annually",
      trophiesWon: 13,
      playersCoached: 580,
      matchesManaged: 1024,
      winPercentage: 61.8,
      currentLeague: "Available",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.9,
      playerDevelopmentScore: 91,
      tacticalInnovationScore: 88,
      leadershipScore: 98,
      motivationScore: 99,
      education: ["UEFA Pro License", "Sports Psychology"],
      certifications: ["Advanced Press Resistance", "Mental Coaching"],
      ageRange: "57 years",
      careerHighlights: [
        "Liverpool's first Premier League title in 30 years",
        "Transformed Liverpool into European champions",
        "Master of emotional motivation and team building",
      ],
      specializations: [
        "Team Motivation",
        "High Pressing",
        "Mental Coaching",
        "Counter-Attacking",
      ],
      communicationStyle: "Passionate and Emotional",
      pressConferenceRating: 4.8,
      clubCultureFit: 96,
      transferMarketInfluence: 85,
      youthDevelopmentExperience: true,
      internationalExperience: false,
      isTopRated: true,
      isPremium: true,
      isLegendary: true,
    },
    {
      id: 3,
      name: "Carlo Ancelotti",
      email: "c.ancelotti@realmadrid.com",
      phone: "+34 91 398 4300",
      location: "Madrid, Spain",
      description:
        "Legendary head coach with unmatched experience across Europe's top leagues, known for man-management skills and tactical adaptability",
      experience: 28,
      currentClub: "Real Madrid",
      previousClubs: ["Napoli", "Bayern Munich", "Chelsea", "PSG", "AC Milan"],
      achievements: [
        "4x Champions League Winner",
        "5x League Titles across Europe",
        "Only coach to win all top 5 European leagues",
        "25+ Major Trophies",
      ],
      rating: 4.82,
      reviews: 341,
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      languages: ["Italian", "Spanish", "English", "French", "German"],
      tacticalStyle: "Tactical Flexibility & Adaptation",
      preferredFormation: "4-3-3 / 4-2-3-1 / 3-5-2",
      philosophy:
        "Football is about adapting to your players' strengths and finding the right balance for each situation",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€15M annually",
      trophiesWon: 25,
      playersCoached: 890,
      matchesManaged: 1456,
      winPercentage: 59.7,
      currentLeague: "La Liga",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.7,
      playerDevelopmentScore: 89,
      tacticalInnovationScore: 85,
      leadershipScore: 94,
      motivationScore: 87,
      education: ["UEFA Pro License", "Psychology Degree"],
      certifications: ["International Coaching", "Advanced Man Management"],
      ageRange: "65 years",
      careerHighlights: [
        "Only manager to win Champions League 4 times",
        "Won league titles in Italy, England, France, Germany, Spain",
        "Master of big-game management",
      ],
      specializations: [
        "Man Management",
        "Big Game Experience",
        "Tactical Adaptation",
        "European Competitions",
      ],
      communicationStyle: "Calm and Diplomatic",
      pressConferenceRating: 4.5,
      clubCultureFit: 91,
      transferMarketInfluence: 88,
      youthDevelopmentExperience: false,
      internationalExperience: true,
      isTopRated: true,
      isPremium: true,
      isLegendary: true,
    },
    {
      id: 4,
      name: "Mikel Arteta",
      email: "m.arteta@arsenal.com",
      phone: "+44 20 7619 5003",
      location: "London, England",
      description:
        "Innovative young head coach combining modern tactical approaches with strong leadership, transforming Arsenal's playing style and culture",
      experience: 5,
      currentClub: "Arsenal FC",
      previousClubs: ["Manchester City (Assistant)"],
      achievements: [
        "FA Cup Winner 2020",
        "Community Shield Winner",
        "Champions League Qualification",
        "Arsenal's Tactical Revolution",
      ],
      rating: 4.71,
      reviews: 198,
      imageUrl:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      languages: ["Spanish", "English", "Basque"],
      tacticalStyle: "Positional Play & Build-up",
      preferredFormation: "4-3-3 / 4-2-3-1",
      philosophy:
        "Football is about controlling the game through intelligent positioning and quick decision-making",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€8M annually",
      trophiesWon: 3,
      playersCoached: 180,
      matchesManaged: 245,
      winPercentage: 58.4,
      currentLeague: "Premier League",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.3,
      playerDevelopmentScore: 87,
      tacticalInnovationScore: 89,
      leadershipScore: 86,
      motivationScore: 88,
      education: ["UEFA Pro License", "Modern Tactical Analysis"],
      certifications: ["Advanced Analytics", "Youth Development"],
      ageRange: "42 years",
      careerHighlights: [
        "Transformed Arsenal's playing style",
        "Developed young talents into stars",
        "Return to Champions League football",
      ],
      specializations: [
        "Youth Development",
        "Modern Tactics",
        "Team Building",
        "Press Resistance",
      ],
      communicationStyle: "Analytical and Passionate",
      pressConferenceRating: 4.2,
      clubCultureFit: 89,
      transferMarketInfluence: 78,
      youthDevelopmentExperience: true,
      internationalExperience: false,
      isTopRated: true,
      isPremium: false,
      isLegendary: false,
    },
    {
      id: 5,
      name: "Thomas Tuchel",
      email: "t.tuchel@bayern.com",
      phone: "+49 89 69931222",
      location: "Munich, Germany",
      description:
        "Tactical mastermind known for detailed preparation and innovative defensive systems, with proven ability to win major trophies quickly",
      experience: 13,
      currentClub: "Bayern Munich",
      previousClubs: ["Chelsea FC", "Paris Saint-Germain", "Borussia Dortmund"],
      achievements: [
        "1x Champions League Winner",
        "2x Ligue 1 Champion",
        "Multiple Domestic Cups",
        "Bundesliga Champion",
      ],
      rating: 4.76,
      reviews: 267,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      languages: ["German", "English", "French"],
      tacticalStyle: "Defensive Solidity & Counter-Attack",
      preferredFormation: "3-4-2-1 / 3-5-2",
      philosophy:
        "Success comes from tactical discipline, detailed preparation, and maximizing each player's potential",
      isVerified: true,
      isAvailable: false,
      contractType: "Medium-term",
      marketValue: "€12M annually",
      trophiesWon: 11,
      playersCoached: 320,
      matchesManaged: 487,
      winPercentage: 64.3,
      currentLeague: "Bundesliga",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.1,
      playerDevelopmentScore: 83,
      tacticalInnovationScore: 91,
      leadershipScore: 82,
      motivationScore: 79,
      education: ["UEFA Pro License", "Advanced Tactical Studies"],
      certifications: ["Defensive Systems", "Set Piece Specialist"],
      ageRange: "51 years",
      careerHighlights: [
        "Won Champions League within 5 months at Chelsea",
        "Transformed Chelsea's defensive record",
        "Master of big-game tactics",
      ],
      specializations: [
        "Defensive Organization",
        "Set Pieces",
        "Tactical Preparation",
        "Big Game Management",
      ],
      communicationStyle: "Intense and Detailed",
      pressConferenceRating: 3.9,
      clubCultureFit: 78,
      transferMarketInfluence: 82,
      youthDevelopmentExperience: true,
      internationalExperience: false,
      isTopRated: true,
      isPremium: true,
      isLegendary: false,
    },
  ];

  // Fetch head coaches (using mock data for now)
  const {
    data: coaches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["head-coaches"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1400));
      return mockCoaches;
    },
  });

  // Filter and sort coaches
  useEffect(() => {
    if (coaches) {
      let filtered = coaches.filter((coach) => {
        const matchesSearch =
          coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coach.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coach.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coach.tacticalStyle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          coach.specializations.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesExperience =
          selectedExperience === "all" ||
          (selectedExperience === "emerging" && coach.experience < 8) ||
          (selectedExperience === "experienced" &&
            coach.experience >= 8 &&
            coach.experience < 15) ||
          (selectedExperience === "veteran" && coach.experience >= 15);

        const matchesAvailability =
          selectedAvailability === "all" ||
          (selectedAvailability === "available" && coach.isAvailable) ||
          (selectedAvailability === "contracted" && !coach.isAvailable);

        const matchesStyle =
          selectedStyle === "all" ||
          coach.tacticalStyle
            .toLowerCase()
            .includes(selectedStyle.toLowerCase());

        return (
          matchesSearch &&
          matchesExperience &&
          matchesAvailability &&
          matchesStyle
        );
      });

      // Sort coaches
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
          case "winRate":
            aValue = a.winPercentage;
            bValue = b.winPercentage;
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

      setFilteredCoaches(filtered);
    }
  }, [
    searchTerm,
    selectedExperience,
    selectedAvailability,
    selectedStyle,
    sortBy,
    sortOrder,
    coaches,
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
            <Megaphone className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary/60" />
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("loadingHeadCoaches")}
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/8">
      <div className="container py-8">
        {/* Elite Header Section */}
        <div className="relative mb-12 text-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/10 to-secondary/15 rounded-3xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-card via-card/98 to-card/95 border-2 border-primary/30 rounded-3xl p-10 shadow-2xl backdrop-blur">
            <div className="mb-8 mx-auto w-28 h-28 bg-gradient-to-br from-primary via-accent to-secondary rounded-full flex items-center justify-center shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <Megaphone className="h-14 w-14 text-white" />
            </div>

            <h1 className="mb-6 text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Elite Head Coaches
              </span>
            </h1>

            <p className="mx-auto max-w-4xl text-xl text-muted-foreground leading-relaxed mb-8">
              Connect with world-class head coaches who define modern football
              through tactical mastery, inspirational leadership, and
              championship-winning mentality at the highest levels of the game.
            </p>

            {/* Advanced Stats Dashboard */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/25 to-accent/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-primary">
                      {coaches?.length || 0}
                    </div>
                    <Megaphone className="h-8 w-8 text-primary/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Elite Coaches
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/25 to-emerald-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-green-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-green-600">
                      {coaches?.filter((c) => c.isAvailable).length || 0}
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Available
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-yellow-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-yellow-600">
                      {coaches?.filter((c) => c.isLegendary).length || 0}
                    </div>
                    <Crown className="h-8 w-8 text-yellow-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Legendary
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/25 to-yellow-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-amber-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-amber-600">
                      {coaches?.reduce((sum, c) => sum + c.trophiesWon, 0) || 0}
                    </div>
                    <Trophy className="h-8 w-8 text-amber-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Total Trophies
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-blue-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {coaches?.reduce((sum, c) => sum + c.winPercentage, 0) /
                        (coaches?.length || 1) || 0}
                      %
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Avg Win Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Search and Filters */}
        <div className="mb-12 space-y-8">
          {/* Elite Search Bar */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/25 to-accent/25 rounded-3xl blur-xl" />
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, location, tactical style, philosophy, or specialization..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-16 pr-8 py-5 text-lg rounded-3xl border-2 border-primary/40 focus:border-primary/70 shadow-xl bg-card/98 backdrop-blur"
              />
              <Search className="absolute left-6 top-1/2 h-7 w-7 -translate-y-1/2 text-primary/70" />
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center gap-8 justify-center bg-card/60 backdrop-blur rounded-2xl p-8 border border-border/60 shadow-xl">
            <div className="flex items-center gap-4">
              <Filter className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">
                Professional Filters:
              </span>
            </div>

            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="w-60 bg-background/90 border-primary/30 h-12">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allExperienceLevels')}</SelectItem>
                <SelectItem value="emerging">{t('emerging')} (0-8 {t('years')})</SelectItem>
                <SelectItem value="experienced">
                  Experienced (8-15 years)
                </SelectItem>
                <SelectItem value="veteran">{t('veteran')} (15+ {t('years')})</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedAvailability}
              onValueChange={setSelectedAvailability}
            >
              <SelectTrigger className="w-56 bg-background/90 border-primary/30 h-12">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCoachesFilter')}</SelectItem>
                <SelectItem value="available">{t('availableNow')}</SelectItem>
                <SelectItem value="contracted">{t('currentlyContracted')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="w-64 bg-background/90 border-primary/30 h-12">
                <SelectValue placeholder="Tactical Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allTacticalStyles')}</SelectItem>
                <SelectItem value="possession">{t('possessionBased')}</SelectItem>
                <SelectItem value="pressing">{t('highPressing')}</SelectItem>
                <SelectItem value="counter">{t('counterAttacking')}</SelectItem>
                <SelectItem value="defensive">{t('defensive')}</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-foreground">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background/90 border-primary/30 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="trophies">Trophies Won</SelectItem>
                  <SelectItem value="winRate">Win Percentage</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-4 h-12 bg-background/90 border-primary/30 hover:bg-primary/15"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-5 w-5" />
                ) : (
                  <SortDesc className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-10">
            <TabsList className="bg-card/70 backdrop-blur border border-border/60 shadow-xl h-14">
              <TabsTrigger
                value="grid"
                className="flex items-center gap-3 text-base data-[state=active]:bg-primary/25 px-8 h-12"
              >
                <BarChart3 className="h-5 w-5" />
                Tactical Overview
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex items-center gap-3 text-base data-[state=active]:bg-primary/25 px-8 h-12"
              >
                <Clipboard className="h-5 w-5" />
                Detailed Analysis
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4 bg-card/70 backdrop-blur rounded-xl px-6 py-3 border border-border/60 shadow-xl">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium">
                <span className="text-primary font-bold text-xl">
                  {filteredCoaches.length}
                </span>{" "}
                Elite Coaches Found
              </span>
            </div>
          </div>

          {/* Tactical Overview Grid */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
              {filteredCoaches.map((coach) => (
                <Card
                  key={coach.id}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/50 bg-gradient-to-br from-card via-card/98 to-card/95"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <CardHeader className="relative p-0">
                    <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15">
                      {coach.imageUrl ? (
                        <img
                          src={coach.imageUrl}
                          alt={coach.name}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Megaphone className="h-24 w-24 text-primary/40" />
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Elite Status Badges */}
                      <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                        {coach.isVerified && (
                          <Badge
                            variant="secondary"
                            className="bg-green-500/95 text-white text-sm backdrop-blur font-semibold"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {coach.isLegendary && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/95 text-white text-sm backdrop-blur font-semibold"
                          >
                            <Crown className="h-4 w-4 mr-1" />
                            Legendary
                          </Badge>
                        )}
                        {coach.isPremium && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-500/95 text-white text-sm backdrop-blur font-semibold"
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Availability */}
                      <div className="absolute top-5 right-5">
                        <Badge
                          variant="secondary"
                          className={`text-sm backdrop-blur font-semibold ${
                            coach.isAvailable
                              ? "bg-green-500/95 text-white"
                              : "bg-red-500/95 text-white"
                          }`}
                        >
                          {coach.isAvailable ? "Available" : "Contracted"}
                        </Badge>
                      </div>

                      {/* Key Stats */}
                      <div className="absolute bottom-5 left-5 flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{coach.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-bold">
                            {coach.winPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative p-8">
                    <div className="mb-6">
                      <CardTitle className="mb-3 text-2xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {coach.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {coach.location}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {coach.experience} years
                        </span>
                      </div>
                      <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                        {coach.description}
                      </p>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        <div>
                          <div className="font-bold text-yellow-700 dark:text-yellow-300">
                            {coach.trophiesWon}
                          </div>
                          <div className="text-yellow-800 dark:text-yellow-200 text-xs">
                            Trophies
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-green-700 dark:text-green-300">
                            {coach.winPercentage}%
                          </div>
                          <div className="text-green-800 dark:text-green-200 text-xs">
                            Win Rate
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-blue-700 dark:text-blue-300">
                            {coach.playersCoached}
                          </div>
                          <div className="text-blue-800 dark:text-blue-200 text-xs">
                            Players
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                        <Gamepad2 className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-bold text-purple-700 dark:text-purple-300">
                            {coach.matchesManaged}
                          </div>
                          <div className="text-purple-800 dark:text-purple-200 text-xs">
                            Matches
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tactical Style */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-muted-foreground mb-2">
                        TACTICAL STYLE
                      </h4>
                      <Badge
                        variant="outline"
                        className="bg-primary/15 border-primary/30 text-primary font-semibold"
                      >
                        {coach.tacticalStyle}
                      </Badge>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Formation: {coach.preferredFormation}
                      </div>
                    </div>

                    {/* Philosophy */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-muted-foreground mb-2">
                        PHILOSOPHY
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-3 italic leading-relaxed border-l-3 border-primary pl-4">
                        "{coach.philosophy}"
                      </p>
                    </div>

                    {/* Specializations */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-muted-foreground mb-3">
                        SPECIALIZATIONS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {coach.specializations
                          .slice(0, 3)
                          .map((spec, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-accent/15 border-accent/30"
                            >
                              {spec}
                            </Badge>
                          ))}
                        {coach.specializations.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-muted/50"
                          >
                            +{coach.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="relative p-8 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold text-primary">
                        {coach.marketValue}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-primary/15"
                      >
                        <Phone className="h-4 w-4" />
                        Contact
                      </Button>
                      <Link href={`/head-coach/${coach.id}`}>
                        <Button
                          size="sm"
                          className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                        >
                          <Eye className="h-4 w-4" />
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
            <div className="space-y-8">
              {filteredCoaches.map((coach) => (
                <Card
                  key={coach.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/40 bg-gradient-to-r from-card via-card/99 to-card/97"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="h-72 w-full lg:h-auto lg:w-96 overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15 relative">
                      {coach.imageUrl ? (
                        <img
                          src={coach.imageUrl}
                          alt={coach.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Megaphone className="h-24 w-24 text-primary/40" />
                        </div>
                      )}

                      {/* Status Indicators */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Badge
                          variant="secondary"
                          className={`backdrop-blur font-semibold ${
                            coach.isAvailable
                              ? "bg-green-500/95 text-white"
                              : "bg-red-500/95 text-white"
                          }`}
                        >
                          {coach.isAvailable ? "Available" : "Contracted"}
                        </Badge>
                        {coach.isLegendary && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/95 text-white backdrop-blur font-semibold"
                          >
                            <Crown className="h-4 w-4 mr-1" />
                            Legendary
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 p-10">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <h3 className="text-3xl font-bold flex items-center gap-4 mb-3">
                                {coach.name}
                                {coach.isVerified && (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                )}
                                {coach.isLegendary && (
                                  <Crown className="h-6 w-6 text-yellow-500" />
                                )}
                                {coach.isPremium && (
                                  <Zap className="h-6 w-6 text-purple-500" />
                                )}
                              </h3>
                              <div className="flex items-center gap-6 mb-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-5 w-5 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {coach.location}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-5 w-5 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {coach.experience} years experience
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Building className="h-5 w-5 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {coach.currentClub}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-muted/60 px-6 py-3 rounded-xl">
                              <Star className="h-6 w-6 text-amber-500" />
                              <span className="font-bold text-2xl">
                                {coach.rating}
                              </span>
                              <span className="text-muted-foreground">
                                ({coach.reviews} reviews)
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                            {coach.description}
                          </p>

                          {/* Performance Dashboard */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                                <span className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                                  TROPHIES
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                                {coach.trophiesWon}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-3 mb-3">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                                <span className="text-sm font-bold text-green-800 dark:text-green-200">
                                  WIN RATE
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                                {coach.winPercentage}%
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Users className="h-6 w-6 text-blue-600" />
                                <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                                  PLAYERS
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                {coach.playersCoached}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Gamepad2 className="h-6 w-6 text-purple-600" />
                                <span className="text-sm font-bold text-purple-800 dark:text-purple-200">
                                  MATCHES
                                </span>
                              </div>
                              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                                {coach.matchesManaged}
                              </div>
                            </div>
                          </div>

                          {/* Tactical Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                TACTICAL APPROACH
                              </h4>
                              <p className="text-sm mb-4 font-semibold text-primary">
                                {coach.tacticalStyle}
                              </p>

                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                PREFERRED FORMATION
                              </h4>
                              <p className="text-sm mb-4">
                                {coach.preferredFormation}
                              </p>

                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                LANGUAGES
                              </h4>
                              <p className="text-sm">
                                {coach.languages.join(", ")}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                MARKET VALUE
                              </h4>
                              <p className="text-sm mb-4 font-bold text-primary text-lg">
                                {coach.marketValue}
                              </p>

                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                CURRENT LEAGUE
                              </h4>
                              <p className="text-sm mb-4">
                                {coach.currentLeague}
                              </p>

                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                COACHING LICENSE
                              </h4>
                              <p className="text-sm">{coach.coachingLicense}</p>
                            </div>
                          </div>

                          {/* Philosophy */}
                          <div className="mb-8">
                            <h4 className="text-sm font-bold text-muted-foreground mb-3">
                              COACHING PHILOSOPHY
                            </h4>
                            <p className="text-sm italic bg-muted/40 p-6 rounded-xl leading-relaxed border-l-4 border-primary">
                              "{coach.philosophy}"
                            </p>
                          </div>

                          {/* Specializations */}
                          <div className="mb-8">
                            <h4 className="text-sm font-bold text-muted-foreground mb-4">
                              CORE SPECIALIZATIONS
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {coach.specializations.map((spec, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-primary/15 text-primary border-primary/30 font-semibold"
                                >
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Career Highlights */}
                          <div className="mb-8">
                            <h4 className="text-sm font-bold text-muted-foreground mb-4">
                              CAREER HIGHLIGHTS
                            </h4>
                            <div className="space-y-3">
                              {coach.careerHighlights.map(
                                (highlight, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">
                                      {highlight}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 lg:w-56">
                          <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg h-12">
                            <Phone className="h-5 w-5" />
                            Contact Coach
                          </Button>
                          <Link href={`/head-coach/${coach.id}`}>
                            <Button
                              variant="outline"
                              className="w-full flex items-center gap-2 hover:bg-primary/15 h-12"
                            >
                              <Eye className="h-5 w-5" />
                              Full Profile
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2 text-muted-foreground hover:text-primary"
                          >
                            <BookOpen className="h-4 w-4" />
                            Tactical Portfolio
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2 text-muted-foreground hover:text-primary"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Video Analysis
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
        {filteredCoaches.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-8 mx-auto w-32 h-32 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
              <Megaphone className="h-16 w-16 text-muted-foreground/50" />
            </div>
            <h3 className="text-3xl font-bold mb-4">No Head Coaches Found</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
              Adjust your search criteria or filters to discover elite head
              coaches that match your tactical requirements and team philosophy.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedExperience("all");
                setSelectedAvailability("all");
                setSelectedStyle("all");
              }}
              className="bg-gradient-to-r from-primary to-accent px-8 py-3 text-lg"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
