import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Target,
  Filter,
  Grid3X3,
  List,
  Star,
  TrendingUp,
  Award,
  Goal,
  Activity,
  Users,
  Calendar,
  MapPin,
  ChevronDown,
  BarChart3,
  Timer,
  Zap,
  Crosshair,
  Heart,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Trophy,
  Play,
  CheckCircle,
  Clock,
  Globe,
  Building,
  UserCheck,
  Gamepad2,
  Flag,
  Navigation,
} from "lucide-react";

// Mock data for strikers with specialized attacking metrics
const mockStrikers = [
  {
    id: 1,
    name: "Erling Haaland",
    age: 24,
    nationality: "Norway",
    club: "Manchester City",
    position: "Striker",
    marketValue: "€180M",
    contractUntil: "2027",
    rating: 9.5,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 52,
      assists: 9,
      matchesPlayed: 53,
      minutesPlayed: 4347,
      shotsOnTarget: 89,
      shotAccuracy: 67.2,
      conversionRate: 28.4,
      bigChances: 73,
      bigChancesMissed: 21,
      penaltyGoals: 7,
      headers: 12,
      leftFootGoals: 15,
      rightFootGoals: 28,
      goalsPerMatch: 0.98,
      xG: 45.3,
      xGOverperformance: 6.7,
      dribbles: 34,
      keyPasses: 23,
    },
    specialties: [
      "Clinical Finishing",
      "Pace",
      "Physical Presence",
      "Penalty Expert",
    ],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "Golden Boot",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "194 cm",
    weight: "88 kg",
    playingStyle: "Complete Striker",
    workRate: "High/Medium",
    weakFoot: 4,
    skillMoves: 3,
  },
  {
    id: 2,
    name: "Kylian Mbappé",
    age: 25,
    nationality: "France",
    club: "Real Madrid",
    position: "Striker",
    marketValue: "€180M",
    contractUntil: "2029",
    rating: 9.4,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 44,
      assists: 10,
      matchesPlayed: 43,
      minutesPlayed: 3698,
      shotsOnTarget: 76,
      shotAccuracy: 58.9,
      conversionRate: 25.8,
      bigChances: 65,
      bigChancesMissed: 24,
      penaltyGoals: 4,
      headers: 3,
      leftFootGoals: 8,
      rightFootGoals: 33,
      goalsPerMatch: 1.02,
      xG: 38.7,
      xGOverperformance: 5.3,
      dribbles: 89,
      keyPasses: 45,
    },
    specialties: ["Pace", "Dribbling", "Versatility", "Big Game Player"],
    achievements: [
      "World Cup Winner",
      "La Liga Winner",
      "Champions League Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "178 cm",
    weight: "73 kg",
    playingStyle: "Pacey Striker",
    workRate: "High/Medium",
    weakFoot: 4,
    skillMoves: 5,
  },
  {
    id: 3,
    name: "Harry Kane",
    age: 31,
    nationality: "England",
    club: "Bayern Munich",
    position: "Striker",
    marketValue: "€100M",
    contractUntil: "2027",
    rating: 9.1,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 44,
      assists: 12,
      matchesPlayed: 45,
      minutesPlayed: 3960,
      shotsOnTarget: 82,
      shotAccuracy: 64.1,
      conversionRate: 24.7,
      bigChances: 68,
      bigChancesMissed: 24,
      penaltyGoals: 6,
      headers: 11,
      leftFootGoals: 8,
      rightFootGoals: 29,
      goalsPerMatch: 0.98,
      xG: 41.2,
      xGOverperformance: 2.8,
      dribbles: 23,
      keyPasses: 67,
    },
    specialties: [
      "Clinical Finishing",
      "Playmaking",
      "Set Pieces",
      "Leadership",
    ],
    achievements: ["Bundesliga Winner", "England Captain", "Golden Boot"],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "188 cm",
    weight: "86 kg",
    playingStyle: "Complete Forward",
    workRate: "High/High",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 4,
    name: "Robert Lewandowski",
    age: 35,
    nationality: "Poland",
    club: "Barcelona",
    position: "Striker",
    marketValue: "€15M",
    contractUntil: "2026",
    rating: 8.9,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 33,
      assists: 8,
      matchesPlayed: 42,
      minutesPlayed: 3528,
      shotsOnTarget: 71,
      shotAccuracy: 62.3,
      conversionRate: 23.1,
      bigChances: 59,
      bigChancesMissed: 26,
      penaltyGoals: 5,
      headers: 9,
      leftFootGoals: 6,
      rightFootGoals: 22,
      goalsPerMatch: 0.79,
      xG: 29.8,
      xGOverperformance: 3.2,
      dribbles: 18,
      keyPasses: 34,
    },
    specialties: [
      "Positioning",
      "Clinical Finishing",
      "Experience",
      "Penalty Expert",
    ],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "Ballon d'Or Nominee",
    ],
    experience: "Veteran",
    preferredFoot: "Right",
    height: "185 cm",
    weight: "81 kg",
    playingStyle: "Poacher",
    workRate: "Medium/Medium",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 5,
    name: "Viktor Osimhen",
    age: 25,
    nationality: "Nigeria",
    club: "Galatasaray",
    position: "Striker",
    marketValue: "€75M",
    contractUntil: "2025",
    rating: 8.7,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 31,
      assists: 5,
      matchesPlayed: 39,
      minutesPlayed: 3234,
      shotsOnTarget: 58,
      shotAccuracy: 59.8,
      conversionRate: 22.6,
      bigChances: 52,
      bigChancesMissed: 21,
      penaltyGoals: 3,
      headers: 8,
      leftFootGoals: 7,
      rightFootGoals: 21,
      goalsPerMatch: 0.79,
      xG: 27.4,
      xGOverperformance: 3.6,
      dribbles: 45,
      keyPasses: 19,
    },
    specialties: [
      "Pace",
      "Physical Strength",
      "Aerial Ability",
      "Clinical Finishing",
    ],
    achievements: [
      "Serie A Winner",
      "African Player of the Year",
      "UEFA Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "185 cm",
    weight: "70 kg",
    playingStyle: "Physical Striker",
    workRate: "High/Medium",
    weakFoot: 3,
    skillMoves: 4,
  },
  {
    id: 6,
    name: "Darwin Núñez",
    age: 25,
    nationality: "Uruguay",
    club: "Liverpool",
    position: "Striker",
    marketValue: "€70M",
    contractUntil: "2028",
    rating: 8.4,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 18,
      assists: 13,
      matchesPlayed: 41,
      minutesPlayed: 2847,
      shotsOnTarget: 42,
      shotAccuracy: 51.2,
      conversionRate: 18.9,
      bigChances: 38,
      bigChancesMissed: 20,
      penaltyGoals: 2,
      headers: 5,
      leftFootGoals: 6,
      rightFootGoals: 10,
      goalsPerMatch: 0.44,
      xG: 21.3,
      xGOverperformance: -3.3,
      dribbles: 56,
      keyPasses: 28,
    },
    specialties: ["Pace", "Work Rate", "Versatility", "Press Resistance"],
    achievements: [
      "Copa America Winner",
      "Primeira Liga Winner",
      "Champions League Runner-up",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "187 cm",
    weight: "81 kg",
    playingStyle: "Mobile Striker",
    workRate: "High/High",
    weakFoot: 4,
    skillMoves: 4,
  },
];

export default function StrikerPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredPlayers, setFilteredPlayers] = useState(mockStrikers);

  // Query for strikers data
  const {
    data: strikers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["strikers"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1300));
      return mockStrikers;
    },
  });

  // Filter and sort players
  useEffect(() => {
    if (strikers) {
      let filtered = strikers.filter((player) => {
        const matchesSearch =
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.nationality.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesClub = selectedClub === "" || player.club === selectedClub;
        const matchesNationality =
          selectedNationality === "" ||
          player.nationality === selectedNationality;

        return matchesSearch && matchesClub && matchesNationality;
      });

      // Sort players
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "age":
            return a.age - b.age;
          case "marketValue":
            return (
              parseInt(b.marketValue.replace(/[€M]/g, "")) -
              parseInt(a.marketValue.replace(/[€M]/g, ""))
            );
          case "name":
            return a.name.localeCompare(b.name);
          case "goals":
            return b.stats.goals - a.stats.goals;
          case "conversionRate":
            return b.stats.conversionRate - a.stats.conversionRate;
          default:
            return 0;
        }
      });

      setFilteredPlayers(filtered);
    }
  }, [strikers, searchTerm, selectedClub, selectedNationality, sortBy]);

  // Get unique clubs and nationalities for filters
  const clubs = [...new Set(mockStrikers.map((player) => player.club))];
  const nationalities = [
    ...new Set(mockStrikers.map((player) => player.nationality)),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("loadingStrikers")}
              </h3>
              <p className="text-gray-600">{t("pleaseWait")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("errorLoading")}
              </h3>
              <p className="text-gray-600 mb-4">{t("tryAgainLater")}</p>
              <Button onClick={() => window.location.reload()}>
                {t("refresh")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Target className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Goal className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t("strikers")}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("strikerDescription")}
          </p>
          <div className="flex justify-center mt-6">
            <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 text-lg">
              <Users className="w-4 h-4 mr-2" />
              {filteredPlayers.length} {t("players")}
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t("searchPlayers")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-red-500"
              />
            </div>

            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
            >
              <option value="">{t("allClubs")}</option>
              {clubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>

            <select
              value={selectedNationality}
              onChange={(e) => setSelectedNationality(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
            >
              <option value="">{t("allNationalities")}</option>
              {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
            >
              <option value="rating">{t("sortByRating")}</option>
              <option value="age">{t("sortByAge")}</option>
              <option value="marketValue">{t("sortByValue")}</option>
              <option value="name">{t("sortByName")}</option>
              <option value="goals">{t("sortByGoals")}</option>
              <option value="conversionRate">{t("sortByConversion")}</option>
            </select>

            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="flex-1 rounded-none border-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="flex-1 rounded-none border-0 border-l"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Players Grid/List */}
        <Tabs value={viewMode} onValueChange={setViewMode}>
          {/* Grid View */}
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player) => (
                <Card
                  key={player.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-br from-white to-red-50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                            {player.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {player.club} • {player.nationality}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {player.rating}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-red-600">
                            {player.stats.goals}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("goals")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-blue-600">
                            {player.stats.assists}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("assists")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-green-600">
                            {player.stats.conversionRate.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("conversion")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-purple-600">
                            {player.stats.shotAccuracy.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("shotAccuracy")}
                          </div>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          {t("specialties")}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {player.specialties
                            .slice(0, 3)
                            .map((specialty, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-red-100 text-red-700 hover:bg-red-200"
                              >
                                {specialty}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {player.age} {t("years")}
                        </div>
                        <div className="flex items-center">
                          <Timer className="w-3 h-3 mr-1" />
                          {player.height}
                        </div>
                        <div className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {player.preferredFoot}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {player.marketValue}
                        </div>
                      </div>

                      {/* Goal Distribution */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                          <div className="text-sm font-bold text-gray-700">
                            {player.stats.rightFootGoals}
                          </div>
                          <div className="text-gray-500">{t("rightFoot")}</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                          <div className="text-sm font-bold text-gray-700">
                            {player.stats.leftFootGoals}
                          </div>
                          <div className="text-gray-500">{t("leftFoot")}</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                          <div className="text-sm font-bold text-gray-700">
                            {player.stats.headers}
                          </div>
                          <div className="text-gray-500">{t("headers")}</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t("viewProfile")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredPlayers.map((player) => (
                <Card
                  key={player.id}
                  className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-r from-white to-red-50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-800">
                              {player.name}
                            </h3>
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              {player.rating}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700">
                                {t("club")}
                              </p>
                              <p className="text-gray-600">{player.club}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                {t("nationality")}
                              </p>
                              <p className="text-gray-600">
                                {player.nationality}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                {t("marketValue")}
                              </p>
                              <p className="text-gray-600">
                                {player.marketValue}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                {t("contract")}
                              </p>
                              <p className="text-gray-600">
                                {player.contractUntil}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-6 gap-4 mt-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">
                                {player.stats.goals}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("goals")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">
                                {player.stats.assists}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("assists")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">
                                {player.stats.conversionRate.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("conversion")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">
                                {player.stats.shotAccuracy.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("shotAccuracy")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-600">
                                {player.stats.goalsPerMatch.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("goalsPerMatch")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-indigo-600">
                                {player.stats.bigChances}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("bigChances")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {t("viewProfile")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          {t("favorite")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("noPlayersFound")}
            </h3>
            <p className="text-gray-600 mb-4">{t("tryDifferentFilters")}</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedClub("");
                setSelectedNationality("");
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
