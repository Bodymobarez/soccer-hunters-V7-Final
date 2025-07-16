import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Zap,
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
  ArrowRight,
  Crosshair,
  Wind,
} from "lucide-react";

// Mock data for right wingers with specialized metrics
const mockRightWingers = [
  {
    id: 1,
    name: "Mohamed Salah",
    age: 32,
    nationality: "Egypt",
    club: "Liverpool",
    position: "Right Winger",
    marketValue: "€55M",
    contractUntil: "2025",
    rating: 9.2,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 25,
      assists: 13,
      matchesPlayed: 44,
      minutesPlayed: 3696,
      dribbles: 89,
      dribblesSuccess: 56.2,
      crosses: 78,
      crossAccuracy: 32.1,
      keyPasses: 78,
      chances: 95,
      pace: 89,
      skillMoves: 88,
      cutting: 96,
      tracking: 85,
      workRate: 94,
    },
    specialties: [
      "Inverted Winger",
      "Clinical Finishing",
      "Pace",
      "Left Foot Curler",
    ],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "African Player of the Year",
    ],
    experience: "Veteran",
    preferredFoot: "Left",
    height: "175 cm",
    weight: "71 kg",
    playingStyle: "Inside Forward",
    workRateStyle: "High/Medium",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 2,
    name: "Bukayo Saka",
    age: 23,
    nationality: "England",
    club: "Arsenal",
    position: "Right Winger",
    marketValue: "€120M",
    contractUntil: "2027",
    rating: 8.9,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 16,
      assists: 9,
      matchesPlayed: 35,
      minutesPlayed: 3045,
      dribbles: 98,
      dribblesSuccess: 61.2,
      crosses: 87,
      crossAccuracy: 28.7,
      keyPasses: 67,
      chances: 82,
      pace: 88,
      skillMoves: 89,
      cutting: 91,
      tracking: 89,
      workRate: 93,
    },
    specialties: ["Versatility", "Youth Talent", "Crossing", "Work Rate"],
    achievements: [
      "FA Cup Winner",
      "England International",
      "Arsenal Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "178 cm",
    weight: "70 kg",
    playingStyle: "Modern Winger",
    workRateStyle: "High/High",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 3,
    name: "Xavi Simons",
    age: 21,
    nationality: "Netherlands",
    club: "RB Leipzig",
    position: "Right Winger",
    marketValue: "€80M",
    contractUntil: "2027",
    rating: 8.6,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 8,
      assists: 13,
      matchesPlayed: 32,
      minutesPlayed: 2544,
      dribbles: 76,
      dribblesSuccess: 58.9,
      crosses: 52,
      crossAccuracy: 26.9,
      keyPasses: 89,
      chances: 97,
      pace: 84,
      skillMoves: 92,
      cutting: 89,
      tracking: 82,
      workRate: 88,
    },
    specialties: ["Technical Ability", "Creativity", "Vision", "Young Talent"],
    achievements: [
      "Bundesliga Winner",
      "Dutch Young Player of the Year",
      "Champions League Debut",
    ],
    experience: "Developing",
    preferredFoot: "Right",
    height: "169 cm",
    weight: "70 kg",
    playingStyle: "Playmaker Winger",
    workRateStyle: "Medium/Medium",
    weakFoot: 4,
    skillMoves: 5,
  },
  {
    id: 4,
    name: "Antony",
    age: 24,
    nationality: "Brazil",
    club: "Manchester United",
    position: "Right Winger",
    marketValue: "€35M",
    contractUntil: "2027",
    rating: 8.1,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 6,
      assists: 3,
      matchesPlayed: 29,
      minutesPlayed: 2088,
      dribbles: 67,
      dribblesSuccess: 52.2,
      crosses: 34,
      crossAccuracy: 23.5,
      keyPasses: 28,
      chances: 38,
      pace: 87,
      skillMoves: 94,
      cutting: 88,
      tracking: 79,
      workRate: 85,
    },
    specialties: [
      "Brazilian Flair",
      "Skill Moves",
      "Inverted Play",
      "Showboating",
    ],
    achievements: [
      "Copa America Winner",
      "Eredivisie Winner",
      "Brazilian International",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "172 cm",
    weight: "72 kg",
    playingStyle: "Flair Player",
    workRateStyle: "Medium/Low",
    weakFoot: 2,
    skillMoves: 5,
  },
  {
    id: 5,
    name: "Jamal Musiala",
    age: 21,
    nationality: "Germany",
    club: "Bayern Munich",
    position: "Right Winger",
    marketValue: "€110M",
    contractUntil: "2026",
    rating: 8.8,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 12,
      assists: 8,
      matchesPlayed: 32,
      minutesPlayed: 2464,
      dribbles: 112,
      dribblesSuccess: 68.8,
      crosses: 42,
      crossAccuracy: 31.0,
      keyPasses: 54,
      chances: 67,
      pace: 86,
      skillMoves: 91,
      cutting: 93,
      tracking: 84,
      workRate: 89,
    },
    specialties: ["Close Control", "Agility", "Intelligence", "Versatility"],
    achievements: [
      "Bundesliga Winner",
      "World Cup Winner",
      "German Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "180 cm",
    weight: "70 kg",
    playingStyle: "Technical Dribbler",
    workRateStyle: "High/Medium",
    weakFoot: 4,
    skillMoves: 5,
  },
  {
    id: 6,
    name: "Raphinha",
    age: 27,
    nationality: "Brazil",
    club: "Barcelona",
    position: "Right Winger",
    marketValue: "€60M",
    contractUntil: "2027",
    rating: 8.4,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 10,
      assists: 12,
      matchesPlayed: 37,
      minutesPlayed: 2997,
      dribbles: 89,
      dribblesSuccess: 54.9,
      crosses: 76,
      crossAccuracy: 30.3,
      keyPasses: 62,
      chances: 74,
      pace: 89,
      skillMoves: 87,
      cutting: 86,
      tracking: 88,
      workRate: 91,
    },
    specialties: ["Brazilian Flair", "Work Rate", "Set Pieces", "Crossing"],
    achievements: [
      "Copa America Winner",
      "La Liga Winner",
      "Brazilian International",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "176 cm",
    weight: "68 kg",
    playingStyle: "Complete Winger",
    workRateStyle: "High/High",
    weakFoot: 3,
    skillMoves: 4,
  },
];

export default function RightWingPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRightWingers = useMemo(() => {
    let filtered = mockRightWingers.filter((winger) => {
      const matchesSearch =
        winger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        winger.club.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClub =
        !filterClub ||
        winger.club.toLowerCase().includes(filterClub.toLowerCase());
      const matchesNationality =
        !filterNationality ||
        winger.nationality
          .toLowerCase()
          .includes(filterNationality.toLowerCase());

      return matchesSearch && matchesClub && matchesNationality;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "age":
          return a.age - b.age;
        case "pace":
          return b.stats.pace - a.stats.pace;
        case "dribbles":
          return b.stats.dribblesSuccess - a.stats.dribblesSuccess;
        case "marketValue":
          const aValue = parseFloat(a.marketValue.replace(/[€M]/g, ""));
          const bValue = parseFloat(b.marketValue.replace(/[€M]/g, ""));
          return bValue - aValue;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterClub, filterNationality, sortBy]);

  const topPerformers = useMemo(() => {
    return {
      fastestWingers: [...mockRightWingers]
        .sort((a, b) => b.stats.pace - a.stats.pace)
        .slice(0, 3),
      bestDribblers: [...mockRightWingers]
        .sort((a, b) => b.stats.dribblesSuccess - a.stats.dribblesSuccess)
        .slice(0, 3),
      mostCreative: [...mockRightWingers]
        .sort((a, b) => b.stats.keyPasses - a.stats.keyPasses)
        .slice(0, 3),
    };
  }, []);

  const StatsCard = ({ winger }: { winger: (typeof mockRightWingers)[0] }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={winger.image}
                alt={winger.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-player.jpg";
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {winger.rating}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{winger.name}</h3>
              <p className="text-sm text-gray-600">{winger.club}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {winger.nationality}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {winger.age} {t("years")}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-orange-600">{winger.marketValue}</p>
            <p className="text-xs text-gray-500">{t("marketValue")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Winger Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Goal className="w-4 h-4 text-orange-600 mr-1" />
              <span className="font-bold text-orange-700">
                {winger.stats.goals}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("goals")}</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-4 h-4 text-blue-600 mr-1" />
              <span className="font-bold text-blue-700">
                {winger.stats.assists}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("assists")}</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-green-600 mr-1" />
              <span className="font-bold text-green-700">
                {winger.stats.pace}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("pace")}</p>
          </div>
        </div>

        {/* Playing Style */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("playingStyle")}:
          </p>
          <Badge variant="secondary" className="text-xs">
            <ArrowRight className="w-3 h-3 mr-1" />
            {winger.playingStyle}
          </Badge>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("specialties")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {winger.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Winger Specific Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {t("dribbleSuccess")}:
            </span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ width: `${winger.stats.dribblesSuccess}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {winger.stats.dribblesSuccess}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("crossAccuracy")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${winger.stats.crossAccuracy}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {winger.stats.crossAccuracy}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("skillMoves")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${winger.stats.skillMoves}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {winger.stats.skillMoves}
              </span>
            </div>
          </div>
        </div>

        {/* Creative Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-bold text-gray-700">
              {winger.stats.keyPasses}
            </div>
            <div className="text-gray-500">{t("keyPasses")}</div>
          </div>
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-bold text-gray-700">
              {winger.stats.dribbles}
            </div>
            <div className="text-gray-500">{t("dribbles")}</div>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">{t("height")}:</span> {winger.height}
          </div>
          <div>
            <span className="font-medium">{t("weight")}:</span> {winger.weight}
          </div>
          <div>
            <span className="font-medium">{t("preferredFoot")}:</span>{" "}
            {winger.preferredFoot}
          </div>
          <div>
            <span className="font-medium">{t("weakFoot")}:</span>{" "}
            {winger.weakFoot}★
          </div>
        </div>

        {/* Wing Attributes */}
        <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            {t("wingAttributes")}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-600">{t("cutting")}:</span>
              <span className="font-medium ml-1">{winger.stats.cutting}</span>
            </div>
            <div>
              <span className="text-gray-600">{t("tracking")}:</span>
              <span className="font-medium ml-1">{winger.stats.tracking}</span>
            </div>
            <div>
              <span className="text-gray-600">{t("workRate")}:</span>
              <span className="font-medium ml-1">{winger.stats.workRate}</span>
            </div>
            <div>
              <span className="text-gray-600">{t("chances")}:</span>
              <span className="font-medium ml-1">{winger.stats.chances}</span>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("achievements")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {winger.achievements.slice(0, 2).map((achievement, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ArrowRight className="w-12 h-12 text-orange-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              {t("rightWingersDirectory")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("rightWingersPageDescription")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <ArrowRight className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{mockRightWingers.length}</h3>
            <p className="text-sm opacity-90">{t("availableRightWingers")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.fastestWingers[0]?.stats.pace}
            </h3>
            <p className="text-sm opacity-90">{t("fastestPlayer")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
            <Wind className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.bestDribblers[0]?.stats.dribblesSuccess}%
            </h3>
            <p className="text-sm opacity-90">{t("bestDribbler")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Crosshair className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.mostCreative[0]?.stats.keyPasses}
            </h3>
            <p className="text-sm opacity-90">{t("mostCreative")}</p>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder={t("searchRightWingers")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t("filters")}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("club")}
                  </label>
                  <Input
                    placeholder={t("filterByClub")}
                    value={filterClub}
                    onChange={(e) => setFilterClub(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("nationality")}
                  </label>
                  <Input
                    placeholder={t("filterByNationality")}
                    value={filterNationality}
                    onChange={(e) => setFilterNationality(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("sortBy")}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="rating">{t("overallRating")}</option>
                    <option value="age">{t("age")}</option>
                    <option value="pace">{t("pace")}</option>
                    <option value="dribbles">{t("dribbleSuccess")}</option>
                    <option value="marketValue">{t("marketValue")}</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              {t("overview")}
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t("detailedAnalysis")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {filteredRightWingers.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <ArrowRight className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {t("noRightWingersFound")}
                  </h3>
                  <p className="text-gray-500">{t("tryAdjustingFilters")}</p>
                </CardContent>
              </Card>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredRightWingers.map((winger) => (
                  <StatsCard key={winger.id} winger={winger} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fastest Wingers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    {t("fastestWingers")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.fastestWingers.map((winger, index) => (
                    <div
                      key={winger.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={winger.image}
                        alt={winger.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{winger.name}</p>
                        <p className="text-sm text-gray-600">{winger.club}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {winger.stats.pace}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Best Dribblers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wind className="w-5 h-5 mr-2 text-orange-500" />
                    {t("bestDribblers")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.bestDribblers.map((winger, index) => (
                    <div
                      key={winger.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={winger.image}
                        alt={winger.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{winger.name}</p>
                        <p className="text-sm text-gray-600">{winger.club}</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">
                        {winger.stats.dribblesSuccess}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Most Creative */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crosshair className="w-5 h-5 mr-2 text-green-500" />
                    {t("mostCreative")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.mostCreative.map((winger, index) => (
                    <div
                      key={winger.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={winger.image}
                        alt={winger.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{winger.name}</p>
                        <p className="text-sm text-gray-600">{winger.club}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {winger.stats.keyPasses}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
