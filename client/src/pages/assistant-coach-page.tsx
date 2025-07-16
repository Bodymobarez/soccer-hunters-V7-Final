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

interface AssistantCoach {
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
  workingStyle: string;
  headCoachCompatibility: string[];
  philosophy: string;
  isVerified: boolean;
  isAvailable: boolean;
  contractType: string;
  marketValue: string;
  currentHeadCoach?: string;
  playersCoached: number;
  matchesAssisted: number;
  promotionRate: number;
  currentLeague: string;
  coachingLicense: string;
  mediaRating: number;
  tacticalKnowledgeScore: number;
  playerRelationshipScore: number;
  adaptabilityScore: number;
  communicationScore: number;
  education: string[];
  certifications: string[];
  ageRange: string;
  careerHighlights: string[];
  mentorshipExperience: boolean;
  youthDevelopmentExperience: boolean;
  internationalExperience: boolean;
  isTopRated: boolean;
  isPremium: boolean;
}

// Assistant Coach page component
export default function AssistantCoachPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredCoaches, setFilteredCoaches] = useState<AssistantCoach[]>([]);
  const { t } = useTranslation();

  // Mock assistant coaches data - replace with actual API
  const mockCoaches: AssistantCoach[] = [
    {
      id: 1,
      name: "Carlos Queiroz",
      email: "c.queiroz@assistantcoach.com",
      phone: "+351 91 234 5678",
      location: "Lisbon, Portugal",
      description:
        "Veteran assistant coach with extensive experience alongside world-class managers, specializing in tactical preparation and player development",
      experience: 35,
      currentClub: "Available",
      previousClubs: [
        "Manchester United",
        "Real Madrid",
        "Portugal National Team",
        "Iran National Team",
      ],
      achievements: [
        "3x Champions League Winner (as Assistant)",
        "Multiple Premier League Titles",
        "World Cup Experience",
        "Tactical Innovation Awards",
      ],
      rating: 4.85,
      reviews: 156,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      languages: ["Portuguese", "English", "Spanish", "Persian"],
      specializations: [
        "Tactical Analysis",
        "Set Pieces",
        "Player Development",
        "International Football",
      ],
      workingStyle:
        "Detailed tactical preparation with emphasis on defensive organization",
      headCoachCompatibility: [
        "Tactical Perfectionists",
        "Experienced Managers",
        "International Coaches",
      ],
      philosophy:
        "Success comes from meticulous preparation and empowering players to exceed their limitations",
      isVerified: true,
      isAvailable: true,
      contractType: "Available",
      marketValue: "€3.5M annually",
      currentHeadCoach: "Available",
      playersCoached: 850,
      matchesAssisted: 1200,
      promotionRate: 78,
      currentLeague: "Available",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.6,
      tacticalKnowledgeScore: 96,
      playerRelationshipScore: 89,
      adaptabilityScore: 92,
      communicationScore: 85,
      education: ["UEFA Pro License", "Sports Psychology Degree"],
      certifications: ["FIFA Technical Course", "Advanced Tactical Analysis"],
      ageRange: "71 years",
      careerHighlights: [
        "Sir Alex Ferguson's right-hand man at Manchester United",
        "Instrumental in Real Madrid's Galáctico era success",
        "Led Iran to World Cup as head coach",
      ],
      mentorshipExperience: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 2,
      name: "Rui Faria",
      email: "r.faria@coaching.com",
      phone: "+44 7700 123 456",
      location: "London, England",
      description:
        "High-energy assistant coach known for fitness integration and motivational leadership, former right-hand to José Mourinho",
      experience: 18,
      currentClub: "Available",
      previousClubs: [
        "AS Roma",
        "Manchester United",
        "Chelsea",
        "Real Madrid",
        "Inter Milan",
      ],
      achievements: [
        "Multiple League Titles",
        "Champions League Winner",
        "Fitness Innovation Awards",
        "Player Development Recognition",
      ],
      rating: 4.78,
      reviews: 98,
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      languages: ["Portuguese", "English", "Spanish", "Italian"],
      specializations: [
        "Fitness Integration",
        "Motivation",
        "Technical Training",
        "Team Psychology",
      ],
      workingStyle:
        "High-intensity training with focus on physical and mental preparation",
      headCoachCompatibility: [
        "Defensive Coaches",
        "Motivational Leaders",
        "Tactical Innovators",
      ],
      philosophy:
        "Physical preparation and mental strength are the foundation of tactical excellence",
      isVerified: true,
      isAvailable: true,
      contractType: "Available",
      marketValue: "€2.8M annually",
      currentHeadCoach: "Available",
      playersCoached: 420,
      matchesAssisted: 680,
      promotionRate: 82,
      currentLeague: "Available",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.2,
      tacticalKnowledgeScore: 88,
      playerRelationshipScore: 94,
      adaptabilityScore: 86,
      communicationScore: 91,
      education: ["Sports Science Degree", "UEFA Pro License"],
      certifications: ["Advanced Fitness Training", "Psychology in Sport"],
      ageRange: "49 years",
      careerHighlights: [
        "José Mourinho's trusted assistant for 17 years",
        "Key figure in multiple Champions League triumphs",
        "Revolutionized fitness integration in football",
      ],
      mentorshipExperience: true,
      youthDevelopmentExperience: false,
      internationalExperience: false,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 3,
      name: "Mikel Arteta (Previous Role)",
      email: "m.arteta.assistant@arsenal.com",
      phone: "+44 20 7619 5003",
      location: "Manchester, England",
      description:
        "Former elite assistant coach who learned under Pep Guardiola, bringing innovative tactical ideas and modern training methods",
      experience: 8,
      currentClub: "Arsenal FC (Now Head Coach)",
      previousClubs: [
        "Manchester City (Assistant)",
        "Paris Saint-Germain (Player)",
      ],
      achievements: [
        "Premier League Titles (as Assistant)",
        "FA Cup Winner",
        "Tactical Innovation Recognition",
        "Player Development Awards",
      ],
      rating: 4.72,
      reviews: 145,
      imageUrl:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      languages: ["Spanish", "English", "Basque"],
      specializations: [
        "Modern Tactics",
        "Positional Play",
        "Youth Development",
        "Technology Integration",
      ],
      workingStyle:
        "Modern analytical approach with emphasis on positional play and player intelligence",
      headCoachCompatibility: [
        "Possession Coaches",
        "Tactical Innovators",
        "Modern Methodologists",
      ],
      philosophy:
        "Football intelligence can be developed through proper positioning and understanding of space",
      isVerified: true,
      isAvailable: false,
      contractType: "Promoted to Head Coach",
      marketValue: "€2.2M annually",
      currentHeadCoach: "Self (Head Coach)",
      playersCoached: 280,
      matchesAssisted: 320,
      promotionRate: 95,
      currentLeague: "Premier League",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.4,
      tacticalKnowledgeScore: 91,
      playerRelationshipScore: 87,
      adaptabilityScore: 89,
      communicationScore: 88,
      education: ["UEFA Pro License", "Modern Football Analysis"],
      certifications: [
        "Advanced Tactical Coaching",
        "Data Analytics in Football",
      ],
      ageRange: "42 years",
      careerHighlights: [
        "Learned tactical mastery under Pep Guardiola",
        "Successfully transitioned from assistant to head coach",
        "Implemented modern training methodologies",
      ],
      mentorshipExperience: false,
      youthDevelopmentExperience: true,
      internationalExperience: false,
      isTopRated: true,
      isPremium: false,
    },
    {
      id: 4,
      name: "Steve Holland",
      email: "s.holland@england.fa.com",
      phone: "+44 20 7745 4545",
      location: "Burton upon Trent, England",
      description:
        "England's assistant coach with exceptional tactical knowledge and international tournament experience alongside Gareth Southgate",
      experience: 22,
      currentClub: "England National Team",
      previousClubs: ["Chelsea FC", "Crewe Alexandra"],
      achievements: [
        "World Cup Semi-Final 2018",
        "European Championship Final 2021",
        "Multiple Youth Tournament Wins",
        "FA Coach of the Year",
      ],
      rating: 4.69,
      reviews: 87,
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      languages: ["English"],
      specializations: [
        "International Football",
        "Tournament Preparation",
        "Set Pieces",
        "Youth Development",
      ],
      workingStyle:
        "Methodical preparation with focus on tournament psychology and tactical flexibility",
      headCoachCompatibility: [
        "International Coaches",
        "Tournament Specialists",
        "Youth Developers",
      ],
      philosophy:
        "International success requires perfect preparation and understanding each player's tournament mentality",
      isVerified: true,
      isAvailable: false,
      contractType: "Long-term",
      marketValue: "€1.8M annually",
      currentHeadCoach: "Gareth Southgate",
      playersCoached: 190,
      matchesAssisted: 150,
      promotionRate: 68,
      currentLeague: "International",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.1,
      tacticalKnowledgeScore: 87,
      playerRelationshipScore: 91,
      adaptabilityScore: 84,
      communicationScore: 89,
      education: ["UEFA Pro License", "Sports Science"],
      certifications: ["International Coaching", "Tournament Psychology"],
      ageRange: "54 years",
      careerHighlights: [
        "Led England to World Cup semi-final",
        "Key architect of England's modern playing style",
        "Developed numerous international players",
      ],
      mentorshipExperience: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: true,
      isPremium: true,
    },
    {
      id: 5,
      name: "Thierry Henry (Assistant Role)",
      email: "t.henry@belgium.fa.com",
      phone: "+32 2 477 1211",
      location: "Brussels, Belgium",
      description:
        "Legendary former player turned assistant coach, bringing elite attacking knowledge and player mentorship to the coaching staff",
      experience: 6,
      currentClub: "Available",
      previousClubs: ["Belgium National Team (Assistant)", "AS Monaco"],
      achievements: [
        "World Cup Third Place (as Assistant)",
        "UEFA Nations League Semi-Final",
        "Player Development Recognition",
        "Attacking Strategy Innovation",
      ],
      rating: 4.63,
      reviews: 76,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      languages: ["French", "English", "Spanish"],
      specializations: [
        "Attacking Play",
        "Player Mentorship",
        "Striker Development",
        "Match Analysis",
      ],
      workingStyle:
        "Player-focused approach with emphasis on individual development and attacking creativity",
      headCoachCompatibility: [
        "Attacking Coaches",
        "Player-Centered Managers",
        "Modern Tacticians",
      ],
      philosophy:
        "Great players need great guidance to reach their potential and inspire the next generation",
      isVerified: true,
      isAvailable: true,
      contractType: "Available",
      marketValue: "€2.5M annually",
      currentHeadCoach: "Available",
      playersCoached: 150,
      matchesAssisted: 95,
      promotionRate: 72,
      currentLeague: "Available",
      coachingLicense: "UEFA Pro License",
      mediaRating: 4.8,
      tacticalKnowledgeScore: 82,
      playerRelationshipScore: 96,
      adaptabilityScore: 78,
      communicationScore: 93,
      education: ["UEFA Pro License", "Player Development Course"],
      certifications: ["Elite Player Mentorship", "Attacking Strategies"],
      ageRange: "47 years",
      careerHighlights: [
        "Arsenal legend with unique playing insights",
        "Helped Belgium reach World Cup semi-final",
        "Exceptional at developing attacking talents",
      ],
      mentorshipExperience: true,
      youthDevelopmentExperience: true,
      internationalExperience: true,
      isTopRated: false,
      isPremium: true,
    },
  ];

  // Fetch assistant coaches (using mock data for now)
  const {
    data: coaches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assistant-coaches"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1100));
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
          coach.workingStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coach.specializations.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesExperience =
          selectedExperience === "all" ||
          (selectedExperience === "emerging" && coach.experience < 10) ||
          (selectedExperience === "experienced" &&
            coach.experience >= 10 &&
            coach.experience < 20) ||
          (selectedExperience === "veteran" && coach.experience >= 20);

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
          case "promotion":
            aValue = a.promotionRate;
            bValue = b.promotionRate;
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
            <HandHeart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary/60" />
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("loadingAssistantCoaches")}
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/2 to-secondary/5">
      <div className="container py-8">
        {/* Professional Header Section */}
        <div className="relative mb-12 text-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/12 via-secondary/8 to-accent/12 rounded-3xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-card via-card/98 to-card/96 border-2 border-primary/25 rounded-3xl p-10 shadow-2xl backdrop-blur">
            <div className="mb-8 mx-auto w-26 h-26 bg-gradient-to-br from-secondary via-primary to-accent rounded-full flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <HandHeart className="h-12 w-12 text-white" />
            </div>

            <h1 className="mb-6 text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                Elite Assistant Coaches
              </span>
            </h1>

            <p className="mx-auto max-w-4xl text-xl text-muted-foreground leading-relaxed mb-8">
              Connect with exceptional assistant coaches who excel in tactical
              support, player development, and seamless collaboration with head
              coaches to achieve championship success.
            </p>

            {/* Stats Dashboard */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/25 to-primary/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-secondary/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl font-bold text-secondary">
                      {coaches?.length || 0}
                    </div>
                    <HandHeart className="h-8 w-8 text-secondary/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Elite Assistants
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
                      {coaches?.filter((c) => c.isTopRated).length || 0}
                    </div>
                    <Crown className="h-8 w-8 text-yellow-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Top Rated
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur rounded-xl p-6 border border-blue-500/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {coaches?.reduce((sum, c) => sum + c.promotionRate, 0) /
                        (coaches?.length || 1) || 0}
                      %
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500/60" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Avg Promotion Rate
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
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/25 to-primary/25 rounded-3xl blur-xl" />
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, location, specialization, working style, or head coach compatibility..."
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
                <SelectItem value="all">All Experience Levels</SelectItem>
                <SelectItem value="emerging">Emerging (0-10 years)</SelectItem>
                <SelectItem value="experienced">
                  Experienced (10-20 years)
                </SelectItem>
                <SelectItem value="veteran">Veteran (20+ years)</SelectItem>
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
                <SelectItem value="all">All Coaches</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="contracted">Currently Contracted</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedSpecialization}
              onValueChange={setSelectedSpecialization}
            >
              <SelectTrigger className="w-64 bg-background/90 border-primary/30 h-12">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="tactical">Tactical Analysis</SelectItem>
                <SelectItem value="fitness">Fitness Integration</SelectItem>
                <SelectItem value="youth">Youth Development</SelectItem>
                <SelectItem value="player">Player Development</SelectItem>
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
                  <SelectItem value="promotion">Promotion Rate</SelectItem>
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
                <UserCheck className="h-5 w-5" />
                Assistant Overview
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex items-center gap-3 text-base data-[state=active]:bg-primary/25 px-8 h-12"
              >
                <ClipboardList className="h-5 w-5" />
                Detailed Profiles
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4 bg-card/70 backdrop-blur rounded-xl px-6 py-3 border border-border/60 shadow-xl">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium">
                <span className="text-primary font-bold text-xl">
                  {filteredCoaches.length}
                </span>{" "}
                Elite Assistants Found
              </span>
            </div>
          </div>

          {/* Assistant Overview Grid */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
              {filteredCoaches.map((coach) => (
                <Card
                  key={coach.id}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/50 bg-gradient-to-br from-card via-card/98 to-card/95"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-transparent to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <CardHeader className="relative p-0">
                    <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-secondary/15 to-primary/15">
                      {coach.imageUrl ? (
                        <img
                          src={coach.imageUrl}
                          alt={coach.name}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <HandHeart className="h-24 w-24 text-primary/40" />
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
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-bold">
                            {coach.promotionRate}%
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
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-green-700 dark:text-green-300">
                            {coach.promotionRate}%
                          </div>
                          <div className="text-green-800 dark:text-green-200 text-xs">
                            Promotion
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                        <Gamepad2 className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-bold text-purple-700 dark:text-purple-300">
                            {coach.matchesAssisted}
                          </div>
                          <div className="text-purple-800 dark:text-purple-200 text-xs">
                            Matches
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                        <Brain className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-bold text-orange-700 dark:text-orange-300">
                            {coach.tacticalKnowledgeScore}
                          </div>
                          <div className="text-orange-800 dark:text-orange-200 text-xs">
                            Tactical
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Working Style */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-muted-foreground mb-2">
                        WORKING STYLE
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {coach.workingStyle}
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
                              className="text-xs bg-secondary/15 border-secondary/30"
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
                      <Link href={`/assistant-coach/${coach.id}`}>
                        <Button
                          size="sm"
                          className="flex items-center gap-2 bg-gradient-to-r from-secondary to-primary hover:shadow-lg"
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

          {/* Detailed Profiles List View */}
          <TabsContent value="list">
            <div className="space-y-8">
              {filteredCoaches.map((coach) => (
                <Card
                  key={coach.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/40 bg-gradient-to-r from-card via-card/99 to-card/97"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="h-72 w-full lg:h-auto lg:w-96 overflow-hidden bg-gradient-to-br from-secondary/15 to-primary/15 relative">
                      {coach.imageUrl ? (
                        <img
                          src={coach.imageUrl}
                          alt={coach.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <HandHeart className="h-24 w-24 text-primary/40" />
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
                                <Users className="h-6 w-6 text-blue-600" />
                                <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                                  PLAYERS
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                {coach.playersCoached}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-3 mb-3">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                                <span className="text-sm font-bold text-green-800 dark:text-green-200">
                                  PROMOTION
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                                {coach.promotionRate}%
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Gamepad2 className="h-6 w-6 text-purple-600" />
                                <span className="text-sm font-bold text-purple-800 dark:text-purple-200">
                                  MATCHES
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                {coach.matchesAssisted}
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
                              <div className="flex items-center gap-3 mb-3">
                                <Brain className="h-6 w-6 text-orange-600" />
                                <span className="text-sm font-bold text-orange-800 dark:text-orange-200">
                                  TACTICAL
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                {coach.tacticalKnowledgeScore}
                              </div>
                            </div>
                          </div>

                          {/* Professional Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                WORKING STYLE
                              </h4>
                              <p className="text-sm mb-4">
                                {coach.workingStyle}
                              </p>

                              <h4 className="text-sm font-bold text-muted-foreground mb-3">
                                HEAD COACH COMPATIBILITY
                              </h4>
                              <p className="text-sm mb-4">
                                {coach.headCoachCompatibility.join(", ")}
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
                            <p className="text-sm italic bg-muted/40 p-6 rounded-xl leading-relaxed border-l-4 border-secondary">
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
                                  className="bg-secondary/15 text-secondary border-secondary/30 font-semibold"
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
                                    <ChevronRight className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
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
                          <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-secondary to-primary hover:shadow-lg h-12">
                            <Phone className="h-5 w-5" />
                            Contact Coach
                          </Button>
                          <Link href={`/assistant-coach/${coach.id}`}>
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
                            <Presentation className="h-4 w-4" />
                            Support Portfolio
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2 text-muted-foreground hover:text-primary"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Collaboration Style
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
              <HandHeart className="h-16 w-16 text-muted-foreground/50" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              No Assistant Coaches Found
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
              Adjust your search criteria or filters to discover elite assistant
              coaches that match your collaboration style and tactical
              requirements.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedExperience("all");
                setSelectedAvailability("all");
                setSelectedSpecialization("all");
              }}
              className="bg-gradient-to-r from-secondary to-primary px-8 py-3 text-lg"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
