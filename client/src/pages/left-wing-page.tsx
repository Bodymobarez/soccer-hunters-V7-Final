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
  ArrowLeft,
  Crosshair,
  Wind,
} from "lucide-react";

// Mock data for left wingers with specialized metrics
const mockLeftWingers = [
  {
    id: 1,
    name: "Vinícius Júnior",
    age: 24,
    nationality: "Brazil",
    club: "Real Madrid",
    position: "Left Winger",
    marketValue: "€120M",
    contractUntil: "2027",
    rating: 9.0,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 24,
      assists: 11,
      matchesPlayed: 39,
      minutesPlayed: 3234,
      dribbles: 156,
      dribblesSuccess: 62.8,
      crosses: 89,
      crossAccuracy: 28.1,
      keyPasses: 67,
      chances: 89,
      pace: 95,
      skillMoves: 94,
      cutting: 91,
      tracking: 88,
      workRate: 89,
    },
    specialties: ["Pace", "Dribbling", "Cutting Inside", "1v1 Situations"],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "Copa America Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "176 cm",
    weight: "73 kg",
    playingStyle: "Inverted Winger",
    workRateStyle: "High/Medium",
    weakFoot: 4,
    skillMoves: 5,
  },
  {
    id: 2,
    name: "Khvicha Kvaratskhelia",
    age: 23,
    nationality: "Georgia",
    club: "Napoli",
    position: "Left Winger",
    marketValue: "€85M",
    contractUntil: "2027",
    rating: 8.8,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 12,
      assists: 13,
      matchesPlayed: 34,
      minutesPlayed: 2856,
      dribbles: 124,
      dribblesSuccess: 58.9,
      crosses: 76,
      crossAccuracy: 31.6,
      keyPasses: 89,
      chances: 102,
      pace: 89,
      skillMoves: 92,
      cutting: 94,
      tracking: 85,
      workRate: 91,
    },
    specialties: [
      "Technical Ability",
      "Creativity",
      "Set Pieces",
      "Ambidextrous",
    ],
    achievements: [
      "Serie A Winner",
      "UEFA Best Young Player",
      "Georgian Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "183 cm",
    weight: "70 kg",
    playingStyle: "Creative Winger",
    workRateStyle: "High/Medium",
    weakFoot: 5,
    skillMoves: 5,
  },
  {
    id: 3,
    name: "Rafael Leão",
    age: 25,
    nationality: "Portugal",
    club: "AC Milan",
    position: "Left Winger",
    marketValue: "€90M",
    contractUntil: "2028",
    rating: 8.6,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 14,
      assists: 9,
      matchesPlayed: 31,
      minutesPlayed: 2573,
      dribbles: 98,
      dribblesSuccess: 64.3,
      crosses: 54,
      crossAccuracy: 27.8,
      keyPasses: 45,
      chances: 58,
      pace: 97,
      skillMoves: 88,
      cutting: 86,
      tracking: 82,
      workRate: 85,
    },
    specialties: [
      "Electric Pace",
      "Direct Running",
      "Counter-Attacks",
      "Finishing",
    ],
    achievements: [
      "Serie A Winner",
      "Nations League Winner",
      "Portuguese Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "188 cm",
    weight: "84 kg",
    playingStyle: "Pace Merchant",
    workRateStyle: "High/Low",
    weakFoot: 3,
    skillMoves: 4,
  },
  {
    id: 4,
    name: "Son Heung-min",
    age: 32,
    nationality: "South Korea",
    club: "Tottenham",
    position: "Left Winger",
    marketValue: "€45M",
    contractUntil: "2025",
    rating: 8.4,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 17,
      assists: 9,
      matchesPlayed: 35,
      minutesPlayed: 2945,
      dribbles: 67,
      dribblesSuccess: 55.2,
      crosses: 42,
      crossAccuracy: 26.2,
      keyPasses: 38,
      chances: 52,
      pace: 88,
      skillMoves: 85,
      cutting: 92,
      tracking: 91,
      workRate: 95,
    },
    specialties: [
      "Two-Footed",
      "Clinical Finishing",
      "Work Rate",
      "Versatility",
    ],
    achievements: [
      "Asian Cup Winner",
      "Premier League Golden Boot",
      "Puskas Award Winner",
    ],
    experience: "Veteran",
    preferredFoot: "Right",
    height: "183 cm",
    weight: "77 kg",
    playingStyle: "Complete Winger",
    workRateStyle: "High/High",
    weakFoot: 5,
    skillMoves: 4,
  },
  {
    id: 5,
    name: "Bradley Barcola",
    age: 22,
    nationality: "France",
    club: "Paris Saint-Germain",
    position: "Left Winger",
    marketValue: "€50M",
    contractUntil: "2028",
    rating: 8.2,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 11,
      assists: 6,
      matchesPlayed: 29,
      minutesPlayed: 2088,
      dribbles: 89,
      dribblesSuccess: 61.8,
      crosses: 38,
      crossAccuracy: 23.7,
      keyPasses: 34,
      chances: 45,
      pace: 93,
      skillMoves: 87,
      cutting: 84,
      tracking: 79,
      workRate: 86,
    },
    specialties: ["Raw Pace", "Youth Potential", "Directness", "Learning"],
    achievements: [
      "Ligue 1 Winner",
      "French U21 International",
      "Rising Star Award",
    ],
    experience: "Developing",
    preferredFoot: "Right",
    height: "181 cm",
    weight: "75 kg",
    playingStyle: "Developing Talent",
    workRateStyle: "High/Medium",
    weakFoot: 3,
    skillMoves: 4,
  },
  {
    id: 6,
    name: "Luis Díaz",
    age: 27,
    nationality: "Colombia",
    club: "Liverpool",
    position: "Left Winger",
    marketValue: "€75M",
    contractUntil: "2027",
    rating: 8.3,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 13,
      assists: 5,
      matchesPlayed: 37,
      minutesPlayed: 2889,
      dribbles: 112,
      dribblesSuccess: 56.3,
      crosses: 67,
      crossAccuracy: 29.9,
      keyPasses: 56,
      chances: 71,
      pace: 91,
      skillMoves: 89,
      cutting: 87,
      tracking: 86,
      workRate: 92,
    },
    specialties: [
      "South American Flair",
      "Dribbling",
      "Work Ethic",
      "Pressing",
    ],
    achievements: [
      "Copa America Winner",
      "Champions League Finalist",
      "Colombian Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "175 cm",
    weight: "67 kg",
    playingStyle: "Flair Player",
    workRateStyle: "High/High",
    weakFoot: 4,
    skillMoves: 5,
  },
];

export default function LeftWingPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeftWingers = useMemo(() => {
    let filtered = mockLeftWingers.filter((winger) => {
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
      fastestWingers: [...mockLeftWingers]
        .sort((a, b) => b.stats.pace - a.stats.pace)
        .slice(0, 3),
      bestDribblers: [...mockLeftWingers]
        .sort((a, b) => b.stats.dribblesSuccess - a.stats.dribblesSuccess)
        .slice(0, 3),
      mostCreative: [...mockLeftWingers]
        .sort((a, b) => b.stats.keyPasses - a.stats.keyPasses)
        .slice(0, 3),
    };
  }, []);

  const StatsCard = ({ winger }: { winger: (typeof mockLeftWingers)[0] }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={winger.image}
                alt={winger.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-player.jpg";
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
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
            <p className="font-bold text-purple-600">{winger.marketValue}</p>
            <p className="text-xs text-gray-500">{t("marketValue")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Winger Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Goal className="w-4 h-4 text-purple-600 mr-1" />
              <span className="font-bold text-purple-700">
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
            <ArrowLeft className="w-3 h-3 mr-1" />
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
                  className="bg-purple-600 h-2 rounded-full"
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
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ArrowLeft className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              {t("leftWingersDirectory")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("leftWingersPageDescription")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <ArrowLeft className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{mockLeftWingers.length}</h3>
            <p className="text-sm opacity-90">{t("availableLeftWingers")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.fastestWingers[0]?.stats.pace}
            </h3>
            <p className="text-sm opacity-90">{t("fastestPlayer")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
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
                    placeholder={t("searchLeftWingers")}
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
            {filteredLeftWingers.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <ArrowLeft className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {t("noLeftWingersFound")}
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
                {filteredLeftWingers.map((winger) => (
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
                    <Wind className="w-5 h-5 mr-2 text-purple-500" />
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
                      <Badge className="bg-purple-100 text-purple-800">
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
