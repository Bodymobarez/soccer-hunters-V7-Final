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
  ArrowLeft,
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

// Mock data for left backs with specialized defensive metrics
const mockLeftBacks = [
  {
    id: 1,
    name: "Andrew Robertson",
    age: 30,
    nationality: "Scotland",
    club: "Liverpool FC",
    position: "Left Back",
    marketValue: "€20M",
    contractUntil: "2026",
    rating: 8.7,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 38,
      minutesPlayed: 3420,
      cleanSheets: 15,
      tackles: 89,
      interceptions: 67,
      blocks: 23,
      crosses: 156,
      crossAccuracy: 34.6,
      assists: 8,
      keypasses: 45,
      duelsWon: 142,
      aerialWins: 34,
      recoveries: 178,
      passAccuracy: 87.3,
      longBalls: 89,
      dribbles: 67,
      pace: 92,
      defending: 85,
      crossing: 88,
    },
    specialties: [
      "Attacking Overlaps",
      "Cross Accuracy",
      "Pace",
      "Set Piece Delivery",
    ],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "UEFA Team of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "178 cm",
    weight: "64 kg",
    playingStyle: "Attacking Full-Back",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 3,
  },
  {
    id: 2,
    name: "Alphonso Davies",
    age: 24,
    nationality: "Canada",
    club: "Bayern Munich",
    position: "Left Back",
    marketValue: "€70M",
    contractUntil: "2025",
    rating: 8.8,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 32,
      minutesPlayed: 2880,
      cleanSheets: 18,
      tackles: 67,
      interceptions: 45,
      blocks: 19,
      crosses: 98,
      crossAccuracy: 32.1,
      assists: 5,
      keypasses: 34,
      duelsWon: 98,
      aerialWins: 23,
      recoveries: 134,
      passAccuracy: 89.7,
      longBalls: 67,
      dribbles: 89,
      pace: 96,
      defending: 82,
      crossing: 78,
    },
    specialties: [
      "Explosive Pace",
      "Recovery Runs",
      "Dribbling",
      "Counter-Attack Threat",
    ],
    achievements: [
      "Bundesliga Winner",
      "Champions League Winner",
      "CONCACAF Gold Cup Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "183 cm",
    weight: "73 kg",
    playingStyle: "Pace-Based Wing-Back",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 4,
  },
  {
    id: 3,
    name: "Theo Hernández",
    age: 27,
    nationality: "France",
    club: "AC Milan",
    position: "Left Back",
    marketValue: "€60M",
    contractUntil: "2026",
    rating: 8.6,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 35,
      minutesPlayed: 3150,
      cleanSheets: 12,
      tackles: 78,
      interceptions: 56,
      blocks: 21,
      crosses: 134,
      crossAccuracy: 29.8,
      assists: 11,
      keypasses: 67,
      duelsWon: 123,
      aerialWins: 29,
      recoveries: 156,
      passAccuracy: 85.4,
      longBalls: 78,
      dribbles: 78,
      pace: 89,
      defending: 83,
      crossing: 85,
    },
    specialties: [
      "Attacking Threat",
      "Ball Carrying",
      "Shot Power",
      "Link-up Play",
    ],
    achievements: [
      "Serie A Winner",
      "World Cup Winner",
      "Nations League Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "184 cm",
    weight: "75 kg",
    playingStyle: "Box-to-Box Wing-Back",
    workRate: "High/Medium",
    weakFoot: 3,
    skillMoves: 3,
  },
  {
    id: 4,
    name: "João Cancelo",
    age: 30,
    nationality: "Portugal",
    club: "Barcelona",
    position: "Left Back",
    marketValue: "€30M",
    contractUntil: "2024",
    rating: 8.5,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 29,
      minutesPlayed: 2610,
      cleanSheets: 11,
      tackles: 56,
      interceptions: 43,
      blocks: 17,
      crosses: 89,
      crossAccuracy: 35.2,
      assists: 7,
      keypasses: 89,
      duelsWon: 89,
      aerialWins: 19,
      recoveries: 123,
      passAccuracy: 91.2,
      longBalls: 56,
      dribbles: 67,
      pace: 85,
      defending: 81,
      crossing: 89,
    },
    specialties: [
      "Technical Ability",
      "Versatility",
      "Through Balls",
      "Inverted Runs",
    ],
    achievements: [
      "Premier League Winner",
      "La Liga Winner",
      "Nations League Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "182 cm",
    weight: "74 kg",
    playingStyle: "Inverted Wing-Back",
    workRate: "High/Medium",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 5,
    name: "Nuno Mendes",
    age: 22,
    nationality: "Portugal",
    club: "Paris Saint-Germain",
    position: "Left Back",
    marketValue: "€40M",
    contractUntil: "2026",
    rating: 8.2,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 31,
      minutesPlayed: 2790,
      cleanSheets: 14,
      tackles: 72,
      interceptions: 51,
      blocks: 18,
      crosses: 112,
      crossAccuracy: 31.2,
      assists: 6,
      keypasses: 43,
      duelsWon: 104,
      aerialWins: 26,
      recoveries: 145,
      passAccuracy: 88.9,
      longBalls: 65,
      dribbles: 56,
      pace: 91,
      defending: 79,
      crossing: 82,
    },
    specialties: [
      "Youth Talent",
      "Progressive Passes",
      "Recovery Pace",
      "Modern Full-Back",
    ],
    achievements: [
      "Ligue 1 Winner",
      "European U-21 Championship",
      "Primeira Liga Winner",
    ],
    experience: "Professional Level",
    preferredFoot: "Left",
    height: "176 cm",
    weight: "70 kg",
    playingStyle: "Modern Wing-Back",
    workRate: "High/High",
    weakFoot: 3,
    skillMoves: 3,
  },
  {
    id: 6,
    name: "Luke Shaw",
    age: 29,
    nationality: "England",
    club: "Manchester United",
    position: "Left Back",
    marketValue: "€25M",
    contractUntil: "2027",
    rating: 8.1,
    image: "/placeholder-player.jpg",
    stats: {
      matchesPlayed: 26,
      minutesPlayed: 2340,
      cleanSheets: 9,
      tackles: 58,
      interceptions: 39,
      blocks: 15,
      crosses: 76,
      crossAccuracy: 28.9,
      assists: 4,
      keypasses: 32,
      duelsWon: 78,
      aerialWins: 22,
      recoveries: 109,
      passAccuracy: 86.7,
      longBalls: 45,
      dribbles: 34,
      pace: 83,
      defending: 84,
      crossing: 79,
    },
    specialties: [
      "Defensive Solidity",
      "Injury Recovery",
      "Overlapping Runs",
      "Team Play",
    ],
    achievements: [
      "Europa League Winner",
      "European Championship Runner-up",
      "FA Cup Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "185 cm",
    weight: "75 kg",
    playingStyle: "Balanced Full-Back",
    workRate: "Medium/High",
    weakFoot: 3,
    skillMoves: 2,
  },
];

export default function LeftBackPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredPlayers, setFilteredPlayers] = useState(mockLeftBacks);

  // Query for left backs data
  const {
    data: leftBacks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["left-backs"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1300));
      return mockLeftBacks;
    },
  });

  // Filter and sort players
  useEffect(() => {
    if (leftBacks) {
      let filtered = leftBacks.filter((player) => {
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
  }, [leftBacks, searchTerm, selectedClub, selectedNationality, sortBy]);

  // Get unique clubs and nationalities for filters
  const clubs = [...new Set(mockLeftBacks.map((player) => player.club))];
  const nationalities = [
    ...new Set(mockLeftBacks.map((player) => player.nationality)),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("loadingLeftBacks")}
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t("leftBacks")}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("leftBackDescription")}
          </p>
          <div className="flex justify-center mt-6">
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-lg">
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
                className="pl-10 h-12 border-gray-200 focus:border-blue-500"
              />
            </div>

            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
              className="h-12 px-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-br from-white to-blue-50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
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
                          <div className="text-2xl font-bold text-blue-600">
                            {player.stats.cleanSheets}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("cleanSheets")}
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
                          <div className="text-2xl font-bold text-purple-600">
                            {player.stats.tackles}
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("tackles")}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                          <div className="text-2xl font-bold text-orange-600">
                            {player.stats.crossAccuracy.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-600">
                            {t("crossAccuracy")}
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
                                className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
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
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t("viewProfile")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
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
                  className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden bg-gradient-to-r from-white to-blue-50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
                              <div className="text-lg font-bold text-blue-600">
                                {player.stats.cleanSheets}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("cleanSheets")}
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
                              <div className="text-lg font-bold text-purple-600">
                                {player.stats.tackles}
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("tackles")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-600">
                                {player.stats.crossAccuracy.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-600">
                                {t("crossAccuracy")}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">
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
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {t("viewProfile")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
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
