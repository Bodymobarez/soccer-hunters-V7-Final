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
  HandHeart,
  UserCheck,
  ClipboardList,
  Presentation,
  Goal,
  Anchor,
  ShieldCheck,
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

interface GoalkeepingCoach {
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
  specializations: string[];
  trainingPhilosophy: string;
  techniques: string[];
  philosophy: string;
  isVerified: boolean;
  isAvailable: boolean;
  contractType: string;
  marketValue: string;
  goalkeepersCoached: number;
  internationalKeepers: number;
  cleanSheetImprovement: number;
  currentLeague: string;
  coachingLicense: string;
  mediaRating: number;
  technicalSkillScore: number;
  mentalTrainingScore: number;
  shotStoppingScore: number;
  distributionScore: number;
  education: string[];
  certifications: string[];
  ageRange: string;
  careerHighlights: string[];
  formerGoalkeeper: boolean;
  youthDevelopmentExperience: boolean;
  internationalExperience: boolean;
  isTopRated: boolean;
  isPremium: boolean;
}

// Goalkeeping Coach page component
export default function GoalkeepingCoachPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredCoaches, setFilteredCoaches] = useState<GoalkeepingCoach[]>(
    [],
  );
  const { t } = useTranslation();

  // Mock goalkeeping coaches data - replace with actual API
  const mockCoaches: GoalkeepingCoach[] = [
    {
      id: 1,
      name: "Xavi Valero",
      email: "x.valero@gkcoach.com",
      phone: "+34 91 234 5678",
      location: "Madrid, Spain",
      description:
        "Elite goalkeeping coach with revolutionary training methods, specializing in modern distribution and shot-stopping techniques for world-class keepers",
      experience: 15,
      currentClub: "Real Madrid",
      previousClubs: ["Valencia CF", "Villarreal CF", "Spain U-21"],
      achievements: [
        "Champions League Winner 2022",
        "La Liga Goalkeeper of Year Developer",
        "Youth Development Excellence Award",
        "Modern GK Training Innovation",
      ],
      rating: 4.92,
      reviews: 178,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      languages: ["Spanish", "English", "Catalan"],
      specializations: [
        "Shot Stopping",
        "Distribution",
        "Positioning",
        "Mental Training",
        "Youth Development",
      ],
      trainingPhilosophy:
        "Modern goalkeeping combining traditional shot-stopping with contemporary ball-playing skills",
      techniques: [
        "Diving Mechanics",
        "Footwork Drills",
        "Distribution Training",
        "1v1 Scenarios",
        "Cross Handling",
      ],
      philosophy:
        "A modern goalkeeper must be both the last defender and the first attacker in today's football",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€1.8M annually",
      goalkeepersCoached: 45,
      internationalKeepers: 8,
      cleanSheetImprovement: 38,
      currentLeague: "La Liga",
      coachingLicense: "UEFA Pro License + GK Specialist",
      mediaRating: 4.7,
      technicalSkillScore: 96,
      mentalTrainingScore: 89,
      shotStoppingScore: 94,
      distributionScore: 91,
      education: [
        "UEFA Pro License",
        "Goalkeeping Specialist Certification",
        "Sports Psychology",
      ],
      certifications: ["Advanced GK Training", "Mental Performance Coach"],
      ageRange: "41 years",
      careerHighlights: [
        "Developed Courtois into Champions League winner",
        "Transformed Real Madrid's goalkeeping department",
        "Created innovative training methodologies",
      ],
      formerGoalkeeper: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 2,
      name: "Richard Wright",
      email: "r.wright@mancity.com",
      phone: "+44 161 444 1894",
      location: "Manchester, England",
      description:
        "Former Premier League goalkeeper turned elite coach, bringing firsthand experience and modern training techniques to develop world-class keepers",
      experience: 12,
      currentClub: "Manchester City",
      previousClubs: ["England National Team", "Brentford FC"],
      achievements: [
        "Multiple Premier League Titles",
        "FA Cup Winner",
        "England GK Coach Success",
        "Youth Development Awards",
      ],
      rating: 4.85,
      reviews: 156,
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      languages: ["English"],
      specializations: [
        "Premier League Experience",
        "Shot Stopping",
        "Game Management",
        "Pressure Situations",
      ],
      trainingPhilosophy:
        "Combining traditional English goalkeeping values with modern technical innovation",
      techniques: [
        "Handling Under Pressure",
        "Communication Training",
        "Set Piece Positioning",
        "Penalty Saves",
      ],
      philosophy:
        "Experience teaches what textbooks cannot - every goalkeeper needs mentorship from someone who lived it",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€1.5M annually",
      goalkeepersCoached: 28,
      internationalKeepers: 5,
      cleanSheetImprovement: 42,
      currentLeague: "Premier League",
      coachingLicense: "UEFA Pro License + GK Specialist",
      mediaRating: 4.3,
      technicalSkillScore: 88,
      mentalTrainingScore: 94,
      shotStoppingScore: 92,
      distributionScore: 85,
      education: ["UEFA Pro License", "Former Professional Player"],
      certifications: ["GK Specialist License", "Mental Coaching"],
      ageRange: "46 years",
      careerHighlights: [
        "Played over 300 professional matches",
        "Developed Ederson's distribution skills",
        "Key figure in City's goalkeeping success",
      ],
      formerGoalkeeper: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 3,
      name: "Claudio Taffarel",
      email: "c.taffarel@brazil.fa.com",
      phone: "+55 11 98765 4321",
      location: "São Paulo, Brazil",
      description:
        "World Cup winning goalkeeper turned masterful coach, bringing Brazilian flair and international tournament experience to goalkeeper development",
      experience: 18,
      currentClub: "Brazil National Team",
      previousClubs: ["Galatasaray", "Parma FC", "Liverpool FC"],
      achievements: [
        "World Cup Winner 1994",
        "Copa America Success",
        "International Tournament Expert",
        "South American GK Development",
      ],
      rating: 4.88,
      reviews: 134,
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      languages: ["Portuguese", "Spanish", "English", "Italian"],
      specializations: [
        "International Tournaments",
        "Penalty Expertise",
        "Mental Resilience",
        "South American Style",
      ],
      trainingPhilosophy:
        "Brazilian creativity combined with European discipline creates complete goalkeepers",
      techniques: [
        "Penalty Psychology",
        "Reflex Training",
        "Agility Development",
        "Tournament Preparation",
      ],
      philosophy:
        "Goalkeeping is 50% technique, 50% mental strength, and 100% passion for the impossible save",
      isVerified: true,
      isAvailable: false,
      contractType: "International",
      marketValue: "€1.6M annually",
      goalkeepersCoached: 38,
      internationalKeepers: 12,
      cleanSheetImprovement: 35,
      currentLeague: "International",
      coachingLicense: "CBF License + International",
      mediaRating: 4.6,
      technicalSkillScore: 90,
      mentalTrainingScore: 96,
      shotStoppingScore: 89,
      distributionScore: 82,
      education: ["CBF Coaching License", "World Cup Experience"],
      certifications: ["International GK Coach", "Tournament Psychology"],
      ageRange: "58 years",
      careerHighlights: [
        "World Cup winning goalkeeper",
        "Developed multiple international keepers",
        "Master of penalty techniques",
      ],
      formerGoalkeeper: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 4,
      name: "Franco Baresi (GK Specialist)",
      email: "f.baresi@gkspecialist.com",
      phone: "+39 02 4879 5678",
      location: "Milan, Italy",
      description:
        "Legendary defender turned goalkeeping coach, bringing unique tactical understanding and positioning expertise to modern goalkeeper training",
      experience: 8,
      currentClub: "Available",
      previousClubs: ["AC Milan Youth", "Italy U-21"],
      achievements: [
        "Youth Development Excellence",
        "Tactical Innovation in GK Training",
        "AC Milan Academy Success",
        "Positioning Revolution",
      ],
      rating: 4.76,
      reviews: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      languages: ["Italian", "English", "Spanish"],
      specializations: [
        "Tactical Positioning",
        "Reading the Game",
        "Distribution",
        "Youth Development",
      ],
      trainingPhilosophy:
        "Understanding the game from a defender's perspective revolutionizes goalkeeping",
      techniques: [
        "Tactical Positioning",
        "Game Reading",
        "Sweeper Keeper Training",
        "Build-up Play",
      ],
      philosophy:
        "A goalkeeper who understands tactics becomes the most important player on the field",
      isVerified: true,
      isAvailable: true,
      contractType: "Available",
      marketValue: "€1.2M annually",
      goalkeepersCoached: 22,
      internationalKeepers: 3,
      cleanSheetImprovement: 28,
      currentLeague: "Available",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.4,
      technicalSkillScore: 85,
      mentalTrainingScore: 88,
      shotStoppingScore: 78,
      distributionScore: 94,
      education: ["UEFA Pro License", "Tactical Analysis Specialist"],
      certifications: ["Advanced Tactics", "Youth Development"],
      ageRange: "64 years",
      careerHighlights: [
        "AC Milan legend with unique perspective",
        "Revolutionized tactical goalkeeper training",
        "Developed modern sweeper-keeper concepts",
      ],
      formerGoalkeeper: false,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: true,
      isPremium: false,
    },
    {
      id: 5,
      name: "Massimo Taibi",
      email: "m.taibi@coaching.com",
      phone: "+39 335 123 4567",
      location: "Rome, Italy",
      description:
        "Experienced former international goalkeeper with extensive coaching experience, specializing in technical development and mental preparation",
      experience: 14,
      currentClub: "Available",
      previousClubs: ["AS Roma", "Italy National Team", "Reggina Calcio"],
      achievements: [
        "Serie A Experience",
        "International Caps",
        "Youth Development Success",
        "Technical Innovation",
      ],
      rating: 4.68,
      reviews: 67,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      languages: ["Italian", "English"],
      specializations: [
        "Technical Development",
        "Shot Stopping",
        "Reflexes",
        "Italian Style",
      ],
      trainingPhilosophy:
        "Technical perfection combined with mental strength creates unbeatable goalkeepers",
      techniques: [
        "Reflex Enhancement",
        "Technical Drills",
        "Shot Stopping",
        "Communication",
      ],
      philosophy:
        "Every save starts with perfect technique and absolute confidence in your abilities",
      isVerified: true,
      isAvailable: true,
      contractType: "Available",
      marketValue: "€0.9M annually",
      goalkeepersCoached: 31,
      internationalKeepers: 4,
      cleanSheetImprovement: 32,
      currentLeague: "Available",
      coachingLicense: "UEFA A License + GK Specialist",
      mediaRating: 4.1,
      technicalSkillScore: 91,
      mentalTrainingScore: 84,
      shotStoppingScore: 93,
      distributionScore: 79,
      education: ["UEFA A License", "GK Specialist Course"],
      certifications: ["Technical Development", "Shot Stopping Expert"],
      ageRange: "54 years",
      careerHighlights: [
        "International goalkeeper experience",
        "Specialist in technical development",
        "Strong track record with shot stopping",
      ],
      formerGoalkeeper: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: false,
      isPremium: true,
    },
  ];

  // Fetch goalkeeping coaches (using mock data for now)
  const {
    data: coaches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goalkeeping-coaches"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1300));
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
          coach.trainingPhilosophy
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          coach.specializations.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesExperience =
          selectedExperience === "all" ||
          (selectedExperience === "emerging" && coach.experience < 10) ||
          (selectedExperience === "experienced" &&
            coach.experience >= 10 &&
            coach.experience < 18) ||
          (selectedExperience === "veteran" && coach.experience >= 18);

        const matchesAvailability =
          selectedAvailability === "all" ||
          (selectedAvailability === "available" && coach.isAvailable) ||
          (selectedAvailability === "contracted" && !coach.isAvailable);

        const matchesSpecialization =
          selectedSpecialization === "all" ||
          coach.specializations.some((spec) =>
            spec.toLowerCase().includes(selectedSpecialization.toLowerCase()),
          );

        return (
          matchesSearch &&
          matchesExperience &&
          matchesAvailability &&
          matchesSpecialization
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
          case "improvement":
            aValue = a.cleanSheetImprovement;
            bValue = b.cleanSheetImprovement;
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
    selectedSpecialization,
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
            <ShieldCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary/60" />
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("loadingGoalkeepingCoaches")}
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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/2 to-primary/5">
      <div className="container py-8">
        {/* Professional Header Section */}
        <div className="relative mb-12 text-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/12 via-primary/8 to-secondary/12 rounded-3xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-card via-card/98 to-card/96 border-2 border-accent/25 rounded-3xl p-10 shadow-2xl backdrop-blur">
            <div className="mb-8 mx-auto w-26 h-26 bg-gradient-to-br from-accent via-secondary to-primary rounded-full flex items-center justify-center shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>

            <h1 className="mb-6 text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                Elite Goalkeeping Coaches
              </span>
            </h1>

            <p className="mx-auto max-w-4xl text-xl text-muted-foreground leading-relaxed mb-8">
              Connect with world-class goalkeeping coaches who specialize in
              developing shot-stopping excellence, distribution mastery, and
              mental resilience in the most crucial position on the field.
            </p>

            {/* Stats Dashboard */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/25 to-secondary/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-accent/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-accent">
                      {coaches?.length || 0}
                    </div>
                    <ShieldCheck className="h-8 w-8 text-accent/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Elite GK Coaches
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-cyan-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-blue-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-blue-600">
                      {coaches?.filter((c) => c.formerGoalkeeper).length || 0}
                    </div>
                    <Goal className="h-8 w-8 text-blue-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Former Keepers
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-yellow-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-yellow-600">
                      {coaches?.reduce(
                        (sum, c) => sum + c.cleanSheetImprovement,
                        0,
                      ) / (coaches?.length || 1) || 0}
                      %
                    </div>
                    <Shield className="h-8 w-8 text-yellow-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Avg Improvement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/25 to-secondary/25 rounded-3xl blur-xl" />
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, location, specialization, training philosophy, or techniques..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-16 pr-8 py-5 text-lg rounded-3xl border-2 border-accent/40 focus:border-accent/70 shadow-xl bg-card/98 backdrop-blur"
              />
              <Search className="absolute left-6 top-1/2 h-7 w-7 -translate-y-1/2 text-accent/70" />
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center gap-8 justify-center bg-card/60 backdrop-blur rounded-2xl p-8 border border-border/60 shadow-xl">
            <div className="flex items-center gap-4">
              <Filter className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold text-foreground">
                Professional Filters:
              </span>
            </div>

            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="w-60 bg-background/90 border-accent/30 h-12">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience Levels</SelectItem>
                <SelectItem value="emerging">Emerging (0-10 years)</SelectItem>
                <SelectItem value="experienced">
                  Experienced (10-18 years)
                </SelectItem>
                <SelectItem value="veteran">Veteran (18+ years)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedAvailability}
              onValueChange={setSelectedAvailability}
            >
              <SelectTrigger className="w-56 bg-background/90 border-accent/30 h-12">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coaches</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="contracted">Currently Contracted</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedSpecialization}
              onValueChange={setSelectedSpecialization}
            >
              <SelectTrigger className="w-64 bg-background/90 border-accent/30 h-12">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="shot">Shot Stopping</SelectItem>
                <SelectItem value="distribution">Distribution</SelectItem>
                <SelectItem value="mental">Mental Training</SelectItem>
                <SelectItem value="youth">Youth Development</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-foreground">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background/90 border-accent/30 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="improvement">
                    Clean Sheet Improvement
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-4 h-12 bg-background/90 border-accent/30 hover:bg-accent/15"
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
                className="flex items-center gap-3 text-base data-[state=active]:bg-accent/25 px-8 h-12"
              >
                <ShieldCheck className="h-5 w-5" />
                GK Overview
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex items-center gap-3 text-base data-[state=active]:bg-accent/25 px-8 h-12"
              >
                <Target className="h-5 w-5" />
                Detailed Analysis
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4 bg-card/70 backdrop-blur rounded-xl px-6 py-3 border border-border/60 shadow-xl">
              <Goal className="h-6 w-6 text-accent" />
              <span className="text-lg font-medium">
                <span className="text-accent font-bold text-xl">
                  {filteredCoaches.length}
                </span>{" "}
                Elite GK Coaches Found
              </span>
            </div>
          </div>

          {/* GK Overview Grid */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
              {filteredCoaches.map((coach) => (
                <Card
                  key={coach.id}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-accent/50 bg-gradient-to-br from-card via-card/98 to-card/95"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-secondary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <CardHeader className="relative p-0">
                    <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-accent/15 to-secondary/15">
                      {coach.imageUrl ? (
                        <img
                          src={coach.imageUrl}
                          alt={coach.name}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShieldCheck className="h-24 w-24 text-accent/40" />
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Status Badges */}
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
                        {coach.formerGoalkeeper && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/95 text-white text-sm backdrop-blur font-semibold"
                          >
                            <Goal className="h-4 w-4 mr-1" />
                            Former GK
                          </Badge>
                        )}
                        {coach.isTopRated && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/95 text-white text-sm backdrop-blur font-semibold"
                          >
                            <Crown className="h-4 w-4 mr-1" />
                            Top Rated
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
                          <Shield className="h-4 w-4" />
                          <span className="font-bold">
                            {coach.cleanSheetImprovement}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative p-8">
                    <div className="mb-6">
                      <CardTitle className="mb-3 text-2xl font-bold line-clamp-1 group-hover:text-accent transition-colors">
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
                      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                        <Goal className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-blue-700 dark:text-blue-300">
                            {coach.goalkeepersCoached}
                          </div>
                          <div className="text-blue-800 dark:text-blue-200 text-xs">
                            Keepers
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-green-700 dark:text-green-300">
                            {coach.cleanSheetImprovement}%
                          </div>
                          <div className="text-green-800 dark:text-green-200 text-xs">
                            Improvement
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                        <Trophy className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-bold text-purple-700 dark:text-purple-300">
                            {coach.internationalKeepers}
                          </div>
                          <div className="text-purple-800 dark:text-purple-200 text-xs">
                            Int'l
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                        <Target className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-bold text-orange-700 dark:text-orange-300">
                            {coach.shotStoppingScore}
                          </div>
                          <div className="text-orange-800 dark:text-orange-200 text-xs">
                            Stopping
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Training Philosophy */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-muted-foreground mb-2">
                        TRAINING PHILOSOPHY
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {coach.trainingPhilosophy}
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
                      <div className="text-lg font-bold text-accent">
                        {coach.marketValue}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-accent/15"
                      >
                        <Phone className="h-4 w-4" />
                        Contact
                      </Button>
                      <Link href={`/goalkeeping-coach/${coach.id}`}>
                        <Button
                          size="sm"
                          className="flex items-center gap-2 bg-gradient-to-r from-accent to-secondary hover:shadow-lg"
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
                  className="overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-accent/40 bg-gradient-to-r from-card via-card/99 to-card/97"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="h-72 w-full lg:h-auto lg:w-96 overflow-hidden bg-gradient-to-br from-accent/15 to-secondary/15 relative">
                      {coach.imageUrl ? (
                        <img
                          src={coach.imageUrl}
                          alt={coach.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShieldCheck className="h-24 w-24 text-accent/40" />
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
                        {coach.formerGoalkeeper && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/95 text-white backdrop-blur font-semibold"
                          >
                            <Goal className="h-4 w-4 mr-1" />
                            Former GK
                          </Badge>
                        )}
                        {coach.isTopRated && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/95 text-white backdrop-blur font-semibold"
                          >
                            <Crown className="h-4 w-4 mr-1" />
                            Top Rated
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
                                {coach.formerGoalkeeper && (
                                  <Goal className="h-6 w-6 text-blue-500" />
                                )}
                                {coach.isTopRated && (
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
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Goal className="h-6 w-6 text-blue-600" />
                                <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                                  KEEPERS
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                {coach.goalkeepersCoached}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Shield className="h-6 w-6 text-green-600" />
                                <span className="text-sm font-bold text-green-800 dark:text-green-200">
                                  IMPROVEMENT
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                                {coach.cleanSheetImprovement}%
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Trophy className="h-6 w-6 text-purple-600" />
                                <span className="text-sm font-bold text-purple-800 dark:text-purple-200">
                                  INT'L
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                {coach.internationalKeepers}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Target className="h-6 w-6 text-orange-600" />
                                <span className="text-sm font-bold text-orange-800 dark:text-orange-200">
                                  STOPPING
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                {coach.shotStoppingScore}
                              </div>
                            </div>
                          </div>

                          {/* Professional Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                TRAINING PHILOSOPHY
                              </h4>
                              <p className="text-sm mb-4">
                                {coach.trainingPhilosophy}
                              </p>

                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                KEY TECHNIQUES
                              </h4>
                              <p className="text-sm mb-4">
                                {coach.techniques.join(", ")}
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
                              <p className="text-sm mb-4 font-bold text-accent text-lg">
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
                              GOALKEEPING PHILOSOPHY
                            </h4>
                            <p className="text-sm italic bg-muted/40 p-6 rounded-xl leading-relaxed border-l-4 border-accent">
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
                                  className="bg-accent/15 text-accent border-accent/30 font-semibold"
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
                                    <ChevronRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
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
                          <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-accent to-secondary hover:shadow-lg h-12">
                            <Phone className="h-5 w-5" />
                            Contact Coach
                          </Button>
                          <Link href={`/goalkeeping-coach/${coach.id}`}>
                            <Button
                              variant="outline"
                              className="w-full flex items-center gap-2 hover:bg-accent/15 h-12"
                            >
                              <Eye className="h-5 w-5" />
                              Full Profile
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2 text-muted-foreground hover:text-accent"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Training Methods
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2 text-muted-foreground hover:text-accent"
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
              <ShieldCheck className="h-16 w-16 text-muted-foreground/50" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              No Goalkeeping Coaches Found
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
              Adjust your search criteria or filters to discover elite
              goalkeeping coaches that match your training philosophy and
              development needs.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedExperience("all");
                setSelectedAvailability("all");
                setSelectedSpecialization("all");
              }}
              className="bg-gradient-to-r from-accent to-secondary px-8 py-3 text-lg"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
