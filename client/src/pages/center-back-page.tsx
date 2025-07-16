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
  Shield,
  Filter,
  Grid3X3,
  List,
  Star,
  TrendingUp,
  Award,
  Activity,
  Users,
  Calendar,
  MapPin,
  ChevronDown,
  BarChart3,
  Timer,
  Zap,
  Crown,
  Heart,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Trophy,
  Target,
  Play,
  CheckCircle,
  Clock,
  Globe,
  Building,
  UserCheck,
  Crosshair,
  Gamepad2,
  Flag,
  Navigation,
} from "lucide-react";

// Mock data for center backs with specialized defensive metrics
const mockCenterBacks = [
  {
    id: 1,
    name: "Virgil van Dijk",
    age: 32,
    nationality: "Netherlands",
    club: "Liverpool FC",
    position: "Center Back",
    marketValue: "€30M",
    contractUntil: "2025",
    rating: 9.2,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 38,
      minutesPlayed: 3420,
      cleanSheets: 17,
      tackles: 67,
      interceptions: 89,
      blocks: 34,
      clearances: 234,
      aerialWins: 123,
      duelsWon: 189,
      passAccuracy: 92.4,
      longBalls: 167,
      recoveries: 145,
      foulsCommitted: 12,
      yellowCards: 3,
      redCards: 0,
      headersWon: 89,
      defending: 95,
      physicality: 94,
      leadership: 98,
    },
    specialties: [
      "Aerial Dominance",
      "Leadership",
      "Ball Playing Defender",
      "Set Piece Threat",
    ],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "PFA Player of the Year",
    ],
    experience: "Veteran Level",
    preferredFoot: "Right",
    height: "193 cm",
    weight: "92 kg",
    playingStyle: "Ball-Playing Center Back",
    workRate: "Medium/High",
    weakFoot: 3,
    skillMoves: 2,
  },
  {
    id: 2,
    name: "Rúben Dias",
    age: 27,
    nationality: "Portugal",
    club: "Manchester City",
    position: "Center Back",
    marketValue: "€80M",
    contractUntil: "2027",
    rating: 9.0,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 35,
      minutesPlayed: 3150,
      cleanSheets: 20,
      tackles: 78,
      interceptions: 95,
      blocks: 41,
      clearances: 189,
      aerialWins: 98,
      duelsWon: 156,
      passAccuracy: 94.7,
      longBalls: 134,
      recoveries: 167,
      foulsCommitted: 8,
      yellowCards: 2,
      redCards: 0,
      headersWon: 67,
      defending: 93,
      physicality: 89,
      leadership: 92,
    },
    specialties: [
      "Tactical Intelligence",
      "Positioning",
      "Pass Distribution",
      "Consistency",
    ],
    achievements: [
      "Premier League Winner",
      "PFA Player of the Year",
      "Nations League Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "187 cm",
    weight: "82 kg",
    playingStyle: "Modern Defender",
    workRate: "Medium/High",
    weakFoot: 3,
    skillMoves: 2,
  },
  {
    id: 3,
    name: "Antonio Rüdiger",
    age: 31,
    nationality: "Germany",
    club: "Real Madrid",
    position: "Center Back",
    marketValue: "€35M",
    contractUntil: "2026",
    rating: 8.8,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 32,
      minutesPlayed: 2880,
      cleanSheets: 18,
      tackles: 89,
      interceptions: 67,
      blocks: 28,
      clearances: 212,
      aerialWins: 87,
      duelsWon: 134,
      passAccuracy: 90.2,
      longBalls: 98,
      recoveries: 123,
      foulsCommitted: 15,
      yellowCards: 4,
      redCards: 0,
      headersWon: 78,
      defending: 90,
      physicality: 93,
      leadership: 88,
    },
    specialties: [
      "Physical Strength",
      "Aggressive Defending",
      "Ball Carrying",
      "Big Game Experience",
    ],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "World Cup Winner",
    ],
    experience: "Veteran Level",
    preferredFoot: "Right",
    height: "190 cm",
    weight: "85 kg",
    playingStyle: "Aggressive Defender",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 3,
  },
  {
    id: 4,
    name: "William Saliba",
    age: 23,
    nationality: "France",
    club: "Arsenal FC",
    position: "Center Back",
    marketValue: "€80M",
    contractUntil: "2027",
    rating: 8.6,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 36,
      minutesPlayed: 3240,
      cleanSheets: 16,
      tackles: 56,
      interceptions: 78,
      blocks: 23,
      clearances: 167,
      aerialWins: 67,
      duelsWon: 123,
      passAccuracy: 91.8,
      longBalls: 89,
      recoveries: 145,
      foulsCommitted: 9,
      yellowCards: 2,
      redCards: 0,
      headersWon: 45,
      defending: 88,
      physicality: 85,
      leadership: 82,
    },
    specialties: ["Youth Talent", "Modern Defending", "Ball Recovery", "Pace"],
    achievements: [
      "France U-21 International",
      "Arsenal Player of the Season",
      "Ligue 1 Experience",
    ],
    experience: "Professional Level",
    preferredFoot: "Right",
    height: "192 cm",
    weight: "83 kg",
    playingStyle: "Modern Center Back",
    workRate: "Medium/High",
    weakFoot: 3,
    skillMoves: 2,
  },
  {
    id: 5,
    name: "Kim Min-jae",
    age: 28,
    nationality: "South Korea",
    club: "Bayern Munich",
    position: "Center Back",
    marketValue: "€60M",
    contractUntil: "2028",
    rating: 8.7,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 31,
      minutesPlayed: 2790,
      cleanSheets: 19,
      tackles: 78,
      interceptions: 89,
      blocks: 31,
      clearances: 198,
      aerialWins: 78,
      duelsWon: 145,
      passAccuracy: 93.1,
      longBalls: 112,
      recoveries: 134,
      foulsCommitted: 11,
      yellowCards: 3,
      redCards: 0,
      headersWon: 56,
      defending: 91,
      physicality: 88,
      leadership: 85,
    },
    specialties: [
      "Asian Excellence",
      "Versatility",
      "Work Rate",
      "Team Player",
    ],
    achievements: [
      "Bundesliga Winner",
      "Serie A Defender of the Year",
      "Asian Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "190 cm",
    weight: "85 kg",
    playingStyle: "Complete Defender",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 2,
  },
  {
    id: 6,
    name: "Eder Militão",
    age: 26,
    nationality: "Brazil",
    club: "Real Madrid",
    position: "Center Back",
    marketValue: "€70M",
    contractUntil: "2028",
    rating: 8.5,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 29,
      minutesPlayed: 2610,
      cleanSheets: 15,
      tackles: 67,
      interceptions: 56,
      blocks: 19,
      clearances: 145,
      aerialWins: 56,
      duelsWon: 98,
      passAccuracy: 89.4,
      longBalls: 78,
      recoveries: 112,
      foulsCommitted: 13,
      yellowCards: 4,
      redCards: 1,
      headersWon: 34,
      defending: 87,
      physicality: 86,
      leadership: 79,
    },
    specialties: [
      "Pace & Recovery",
      "Ball Skills",
      "Versatility",
      "Brazilian Flair",
    ],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "Copa America Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "186 cm",
    weight: "78 kg",
    playingStyle: "Pace-Based Defender",
    workRate: "High/Medium",
    weakFoot: 4,
    skillMoves: 3,
  },
];

export default function CenterBackPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredPlayers, setFilteredPlayers] = useState(mockCenterBacks);

  // Query for center backs data
  const {
    data: centerBacks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["center-backs"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1300));
      return mockCenterBacks;
    },
  });

  // Filter and sort players
  useEffect(() => {
    if (centerBacks) {
      let filtered = centerBacks.filter((player) => {
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
          default:
            return 0;
        }
      });

      setFilteredPlayers(filtered);
    }
  }, [centerBacks, searchTerm, selectedClub, selectedNationality, sortBy]);

  // Get unique clubs and nationalities for filters
  const clubs = [...new Set(mockCenterBacks.map((player) => player.club))];
  const nationalities = [
    ...new Set(mockCenterBacks.map((player) => player.nationality)),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("loadingCenterBacks")}
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-red-600" />
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t("centerBacks")}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("centerBackDescription")}
          </p>
          <div className="flex justify-center mt-6">
            <Badge className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-2 text-lg">
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
                        <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
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
                            {player.stats.cleanSheets}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("cleanSheets")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-blue-600">
                            {player.stats.aerialWins}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("aerialWins")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-purple-600">
                            {player.stats.tackles}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("tackles")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-orange-600">
                            {player.stats.passAccuracy.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("passAccuracy")}
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

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
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
                        <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
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

                          <div className="grid grid-cols-5 gap-4 mt-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">
                                {player.stats.cleanSheets}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("cleanSheets")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">
                                {player.stats.aerialWins}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("aerialWins")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">
                                {player.stats.tackles}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("tackles")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-600">
                                {player.stats.passAccuracy.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("passAccuracy")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">
                                {player.stats.duelsWon}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("duelsWon")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
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
