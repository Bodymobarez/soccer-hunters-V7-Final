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
  Circle,
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
  Shield,
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

// Mock data for defensive midfielders with specialized metrics
const mockDefensiveMidfielders = [
  {
    id: 1,
    name: "Casemiro",
    age: 32,
    nationality: "Brazil",
    club: "Manchester United",
    position: "Defensive Midfielder",
    marketValue: "€25M",
    contractUntil: "2026",
    rating: 8.7,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 35,
      minutesPlayed: 3150,
      goals: 3,
      assists: 5,
      tackles: 89,
      interceptions: 67,
      passAccuracy: 89.2,
      keypasses: 34,
      duelsWon: 156,
      aerialWins: 89,
      recoveries: 189,
      foulsCommitted: 45,
      yellowCards: 8,
      redCards: 1,
      longBalls: 167,
      ballRecovery: 178,
      defensiveActions: 234,
      workRate: 96,
      positioning: 92,
    },
    specialties: [
      "Ball Recovery",
      "Defensive Positioning",
      "Aerial Duels",
      "Experience",
    ],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "Copa America Winner",
    ],
    experience: "Veteran Level",
    preferredFoot: "Right",
    height: "185 cm",
    weight: "84 kg",
    playingStyle: "Destroyer",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 2,
  },
  {
    id: 2,
    name: "Declan Rice",
    age: 25,
    nationality: "England",
    club: "Arsenal FC",
    position: "Defensive Midfielder",
    marketValue: "€90M",
    contractUntil: "2029",
    rating: 8.9,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 38,
      minutesPlayed: 3420,
      goals: 5,
      assists: 8,
      tackles: 78,
      interceptions: 89,
      passAccuracy: 91.4,
      keypasses: 45,
      duelsWon: 134,
      aerialWins: 67,
      recoveries: 167,
      foulsCommitted: 23,
      yellowCards: 5,
      redCards: 0,
      longBalls: 123,
      ballRecovery: 189,
      defensiveActions: 201,
      workRate: 94,
      positioning: 89,
    },
    specialties: [
      "Box-to-Box Play",
      "Modern DM",
      "Ball Progression",
      "Leadership",
    ],
    achievements: [
      "Europa League Winner",
      "England International",
      "West Ham Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "185 cm",
    weight: "80 kg",
    playingStyle: "Modern Defensive Midfielder",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 3,
  },
  {
    id: 3,
    name: "Rodri",
    age: 28,
    nationality: "Spain",
    club: "Manchester City",
    position: "Defensive Midfielder",
    marketValue: "€90M",
    contractUntil: "2027",
    rating: 9.2,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 37,
      minutesPlayed: 3330,
      goals: 8,
      assists: 9,
      tackles: 67,
      interceptions: 78,
      passAccuracy: 93.8,
      keypasses: 67,
      duelsWon: 123,
      aerialWins: 56,
      recoveries: 145,
      foulsCommitted: 18,
      yellowCards: 4,
      redCards: 0,
      longBalls: 189,
      ballRecovery: 156,
      defensiveActions: 189,
      workRate: 92,
      positioning: 95,
    },
    specialties: [
      "Pass Distribution",
      "Tactical Intelligence",
      "Ball Retention",
      "Set Piece Threat",
    ],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "European Championship Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "191 cm",
    weight: "82 kg",
    playingStyle: "Deep-Lying Playmaker",
    workRate: "Medium/High",
    weakFoot: 4,
    skillMoves: 3,
  },
  {
    id: 4,
    name: "Joshua Kimmich",
    age: 29,
    nationality: "Germany",
    club: "Bayern Munich",
    position: "Defensive Midfielder",
    marketValue: "€70M",
    contractUntil: "2025",
    rating: 9.0,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 32,
      minutesPlayed: 2880,
      goals: 6,
      assists: 12,
      tackles: 56,
      interceptions: 67,
      passAccuracy: 94.2,
      keypasses: 89,
      duelsWon: 98,
      aerialWins: 45,
      recoveries: 134,
      foulsCommitted: 21,
      yellowCards: 6,
      redCards: 0,
      longBalls: 234,
      ballRecovery: 145,
      defensiveActions: 167,
      workRate: 95,
      positioning: 93,
    },
    specialties: ["Versatility", "Crossing Ability", "Work Rate", "Set Pieces"],
    achievements: [
      "Bundesliga Winner",
      "Champions League Winner",
      "World Cup Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "177 cm",
    weight: "70 kg",
    playingStyle: "Complete Midfielder",
    workRate: "High/High",
    weakFoot: 4,
    skillMoves: 3,
  },
  {
    id: 5,
    name: "Fabinho",
    age: 31,
    nationality: "Brazil",
    club: "Al-Ittihad",
    position: "Defensive Midfielder",
    marketValue: "€15M",
    contractUntil: "2026",
    rating: 8.4,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 28,
      minutesPlayed: 2520,
      goals: 2,
      assists: 4,
      tackles: 78,
      interceptions: 89,
      passAccuracy: 88.7,
      keypasses: 23,
      duelsWon: 123,
      aerialWins: 67,
      recoveries: 167,
      foulsCommitted: 34,
      yellowCards: 7,
      redCards: 0,
      longBalls: 145,
      ballRecovery: 178,
      defensiveActions: 212,
      workRate: 91,
      positioning: 90,
    },
    specialties: [
      "Defensive Stability",
      "Long Range Shooting",
      "Experience",
      "Leadership",
    ],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "Copa America Winner",
    ],
    experience: "Veteran Level",
    preferredFoot: "Right",
    height: "188 cm",
    weight: "78 kg",
    playingStyle: "Holding Midfielder",
    workRate: "Medium/High",
    weakFoot: 3,
    skillMoves: 2,
  },
  {
    id: 6,
    name: "Aurélien Tchouaméni",
    age: 24,
    nationality: "France",
    club: "Real Madrid",
    position: "Defensive Midfielder",
    marketValue: "€80M",
    contractUntil: "2028",
    rating: 8.5,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 34,
      minutesPlayed: 3060,
      goals: 4,
      assists: 6,
      tackles: 89,
      interceptions: 78,
      passAccuracy: 90.3,
      keypasses: 34,
      duelsWon: 145,
      aerialWins: 78,
      recoveries: 156,
      foulsCommitted: 28,
      yellowCards: 6,
      redCards: 0,
      longBalls: 123,
      ballRecovery: 167,
      defensiveActions: 189,
      workRate: 93,
      positioning: 87,
    },
    specialties: [
      "Youth Talent",
      "Physical Presence",
      "Ball Winning",
      "Future Star",
    ],
    achievements: [
      "La Liga Winner",
      "Champions League Winner",
      "World Cup Runner-up",
    ],
    experience: "Professional Level",
    preferredFoot: "Right",
    height: "187 cm",
    weight: "83 kg",
    playingStyle: "Box-to-Box DM",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 3,
  },
];

export default function DefensiveMidfielderPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredPlayers, setFilteredPlayers] = useState(
    mockDefensiveMidfielders,
  );

  // Query for defensive midfielders data
  const {
    data: defensiveMidfielders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["defensive-midfielders"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1300));
      return mockDefensiveMidfielders;
    },
  });

  // Filter and sort players
  useEffect(() => {
    if (defensiveMidfielders) {
      let filtered = defensiveMidfielders.filter((player) => {
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
  }, [
    defensiveMidfielders,
    searchTerm,
    selectedClub,
    selectedNationality,
    sortBy,
  ]);

  // Get unique clubs and nationalities for filters
  const clubs = [
    ...new Set(mockDefensiveMidfielders.map((player) => player.club)),
  ];
  const nationalities = [
    ...new Set(mockDefensiveMidfielders.map((player) => player.nationality)),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Circle className="w-8 h-8 text-purple-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("loadingDefensiveMidfielders")}
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Circle className="w-8 h-8 text-red-600" />
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Circle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t("defensiveMidfielders")}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("defensiveMidfielderDescription")}
          </p>
          <div className="flex justify-center mt-6">
            <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-2 text-lg">
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
                className="pl-10 h-12 border-gray-200 focus:border-purple-500"
              />
            </div>

            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
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
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
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
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
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
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-br from-white to-purple-50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
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
                          <div className="text-2xl font-bold text-purple-600">
                            {player.stats.tackles}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("tackles")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-blue-600">
                            {player.stats.interceptions}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("interceptions")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-green-600">
                            {player.stats.assists}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("assists")}
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
                                className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200"
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
                          className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t("viewProfile")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
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
                  className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-r from-white to-purple-50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
                              <div className="text-lg font-bold text-purple-600">
                                {player.stats.tackles}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("tackles")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">
                                {player.stats.interceptions}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("interceptions")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">
                                {player.stats.assists}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("assists")}
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
                              <div className="text-lg font-bold text-red-600">
                                {player.stats.ballRecovery}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("ballRecovery")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {t("viewProfile")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
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
