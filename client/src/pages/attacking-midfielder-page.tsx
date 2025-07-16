import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Lightbulb,
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
  Crosshair,
  Eye,
  Zap,
} from "lucide-react";

// Mock data for attacking midfielders with specialized creative metrics
const mockAttackingMidfielders = [
  {
    id: 1,
    name: "Kevin De Bruyne",
    age: 33,
    nationality: "Belgium",
    club: "Manchester City",
    position: "Attacking Midfielder",
    marketValue: "€35M",
    contractUntil: "2025",
    rating: 9.4,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 18,
      assists: 27,
      matchesPlayed: 35,
      minutesPlayed: 2940,
      keyPasses: 152,
      chancesCreated: 189,
      throughBalls: 45,
      longBalls: 78,
      setpieceGoals: 6,
      shootingAccuracy: 76.3,
      passAccuracy: 89.2,
      vision: 98,
      creativity: 96,
      technique: 94,
      crossing: 92,
      freekicks: 95,
    },
    specialties: ["Playmaking", "Set Pieces", "Long Range Shooting", "Vision"],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "PFA Player of the Year",
    ],
    experience: "Veteran",
    preferredFoot: "Right",
    height: "181 cm",
    weight: "68 kg",
    playingStyle: "Deep Lying Playmaker",
    workRateStyle: "High/High",
    weakFoot: 5,
    skillMoves: 4,
  },
  {
    id: 2,
    name: "Bruno Fernandes",
    age: 30,
    nationality: "Portugal",
    club: "Manchester United",
    position: "Attacking Midfielder",
    marketValue: "€70M",
    contractUntil: "2026",
    rating: 9.0,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 15,
      assists: 13,
      matchesPlayed: 39,
      minutesPlayed: 3432,
      keyPasses: 89,
      chancesCreated: 134,
      throughBalls: 32,
      longBalls: 67,
      setpieceGoals: 8,
      shootingAccuracy: 72.8,
      passAccuracy: 84.7,
      vision: 91,
      creativity: 93,
      technique: 89,
      crossing: 85,
      freekicks: 88,
    },
    specialties: ["Penalty Expert", "Leadership", "Box-to-Box", "Set Pieces"],
    achievements: [
      "Nations League Winner",
      "Portuguese Player of the Year",
      "Premier League Player of the Month",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "179 cm",
    weight: "69 kg",
    playingStyle: "Box-to-Box Playmaker",
    workRateStyle: "High/High",
    weakFoot: 5,
    skillMoves: 4,
  },
  {
    id: 3,
    name: "Martin Ødegaard",
    age: 25,
    nationality: "Norway",
    club: "Arsenal",
    position: "Attacking Midfielder",
    marketValue: "€110M",
    contractUntil: "2028",
    rating: 8.8,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 11,
      assists: 10,
      matchesPlayed: 35,
      minutesPlayed: 3045,
      keyPasses: 78,
      chancesCreated: 98,
      throughBalls: 28,
      longBalls: 45,
      setpieceGoals: 2,
      shootingAccuracy: 68.4,
      passAccuracy: 87.3,
      vision: 88,
      creativity: 91,
      technique: 92,
      crossing: 82,
      freekicks: 85,
    },
    specialties: [
      "Technical Ability",
      "Left Foot",
      "Close Control",
      "Intelligence",
    ],
    achievements: [
      "FA Cup Winner",
      "Norway Captain",
      "Arsenal Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "178 cm",
    weight: "68 kg",
    playingStyle: "Technical Playmaker",
    workRateStyle: "High/Medium",
    weakFoot: 4,
    skillMoves: 5,
  },
  {
    id: 4,
    name: "Mason Mount",
    age: 26,
    nationality: "England",
    club: "Manchester United",
    position: "Attacking Midfielder",
    marketValue: "€55M",
    contractUntil: "2030",
    rating: 8.2,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 7,
      assists: 5,
      matchesPlayed: 25,
      minutesPlayed: 1875,
      keyPasses: 34,
      chancesCreated: 42,
      throughBalls: 12,
      longBalls: 23,
      setpieceGoals: 1,
      shootingAccuracy: 64.2,
      passAccuracy: 82.1,
      vision: 82,
      creativity: 84,
      technique: 86,
      crossing: 79,
      freekicks: 78,
    },
    specialties: ["Versatility", "Work Rate", "Youth Development", "Pressing"],
    achievements: [
      "Champions League Winner",
      "England International",
      "UEFA Youth Player of the Year",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "181 cm",
    weight: "70 kg",
    playingStyle: "Modern Attacking Midfielder",
    workRateStyle: "High/High",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 5,
    name: "Pedri",
    age: 21,
    nationality: "Spain",
    club: "Barcelona",
    position: "Attacking Midfielder",
    marketValue: "€100M",
    contractUntil: "2026",
    rating: 8.6,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 4,
      assists: 8,
      matchesPlayed: 28,
      minutesPlayed: 2352,
      keyPasses: 67,
      chancesCreated: 84,
      throughBalls: 22,
      longBalls: 34,
      setpieceGoals: 0,
      shootingAccuracy: 59.3,
      passAccuracy: 91.7,
      vision: 86,
      creativity: 88,
      technique: 94,
      crossing: 76,
      freekicks: 74,
    },
    specialties: [
      "La Masia Product",
      "Passing",
      "Youth Talent",
      "Intelligence",
    ],
    achievements: [
      "La Liga Winner",
      "European Championship Winner",
      "Golden Boy Award",
    ],
    experience: "Developing",
    preferredFoot: "Right",
    height: "174 cm",
    weight: "60 kg",
    playingStyle: "Tiki-Taka Playmaker",
    workRateStyle: "Medium/Medium",
    weakFoot: 4,
    skillMoves: 4,
  },
  {
    id: 6,
    name: "Florian Wirtz",
    age: 21,
    nationality: "Germany",
    club: "Bayer Leverkusen",
    position: "Attacking Midfielder",
    marketValue: "€130M",
    contractUntil: "2027",
    rating: 8.9,
    image: "/placeholder-player.jpg",
    stats: {
      goals: 18,
      assists: 20,
      matchesPlayed: 49,
      minutesPlayed: 3969,
      keyPasses: 89,
      chancesCreated: 127,
      throughBalls: 38,
      longBalls: 52,
      setpieceGoals: 3,
      shootingAccuracy: 71.5,
      passAccuracy: 86.8,
      vision: 89,
      creativity: 94,
      technique: 91,
      crossing: 84,
      freekicks: 82,
    },
    specialties: ["Young Talent", "Both Feet", "Pace", "Clinical Finishing"],
    achievements: [
      "Bundesliga Winner",
      "German Cup Winner",
      "European Championship Winner",
    ],
    experience: "Developing",
    preferredFoot: "Right",
    height: "176 cm",
    weight: "64 kg",
    playingStyle: "Modern Attacking Midfielder",
    workRateStyle: "High/Medium",
    weakFoot: 5,
    skillMoves: 5,
  },
];

export default function AttackingMidfielderPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAttackingMidfielders = useMemo(() => {
    let filtered = mockAttackingMidfielders.filter((midfielder) => {
      const matchesSearch =
        midfielder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        midfielder.club.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClub =
        !filterClub ||
        midfielder.club.toLowerCase().includes(filterClub.toLowerCase());
      const matchesNationality =
        !filterNationality ||
        midfielder.nationality
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
        case "assists":
          return b.stats.assists - a.stats.assists;
        case "creativity":
          return b.stats.creativity - a.stats.creativity;
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
      mostCreative: [...mockAttackingMidfielders]
        .sort((a, b) => b.stats.creativity - a.stats.creativity)
        .slice(0, 3),
      bestPassers: [...mockAttackingMidfielders]
        .sort((a, b) => b.stats.passAccuracy - a.stats.passAccuracy)
        .slice(0, 3),
      topAssists: [...mockAttackingMidfielders]
        .sort((a, b) => b.stats.assists - a.stats.assists)
        .slice(0, 3),
    };
  }, []);

  const StatsCard = ({
    midfielder,
  }: {
    midfielder: (typeof mockAttackingMidfielders)[0];
  }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={midfielder.image}
                alt={midfielder.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-player.jpg";
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {midfielder.rating}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                {midfielder.name}
              </h3>
              <p className="text-sm text-gray-600">{midfielder.club}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {midfielder.nationality}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {midfielder.age} {t("years")}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">{midfielder.marketValue}</p>
            <p className="text-xs text-gray-500">{t("marketValue")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Midfielder Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Goal className="w-4 h-4 text-blue-600 mr-1" />
              <span className="font-bold text-blue-700">
                {midfielder.stats.goals}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("goals")}</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-4 h-4 text-green-600 mr-1" />
              <span className="font-bold text-green-700">
                {midfielder.stats.assists}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("assists")}</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Lightbulb className="w-4 h-4 text-purple-600 mr-1" />
              <span className="font-bold text-purple-700">
                {midfielder.stats.creativity}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("creativity")}</p>
          </div>
        </div>

        {/* Playing Style */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("playingStyle")}:
          </p>
          <Badge variant="secondary" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            {midfielder.playingStyle}
          </Badge>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("specialties")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {midfielder.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Creative Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("passAccuracy")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${midfielder.stats.passAccuracy}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {midfielder.stats.passAccuracy}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("vision")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${midfielder.stats.vision}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {midfielder.stats.vision}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("technique")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${midfielder.stats.technique}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {midfielder.stats.technique}
              </span>
            </div>
          </div>
        </div>

        {/* Creative Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-bold text-gray-700">
              {midfielder.stats.keyPasses}
            </div>
            <div className="text-gray-500">{t("keyPasses")}</div>
          </div>
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-bold text-gray-700">
              {midfielder.stats.chancesCreated}
            </div>
            <div className="text-gray-500">{t("chances")}</div>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">{t("height")}:</span>{" "}
            {midfielder.height}
          </div>
          <div>
            <span className="font-medium">{t("weight")}:</span>{" "}
            {midfielder.weight}
          </div>
          <div>
            <span className="font-medium">{t("preferredFoot")}:</span>{" "}
            {midfielder.preferredFoot}
          </div>
          <div>
            <span className="font-medium">{t("weakFoot")}:</span>{" "}
            {midfielder.weakFoot}★
          </div>
        </div>

        {/* Playmaking Attributes */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            {t("playmakingAttributes")}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-600">{t("throughBalls")}:</span>
              <span className="font-medium ml-1">
                {midfielder.stats.throughBalls}
              </span>
            </div>
            <div>
              <span className="text-gray-600">{t("longBalls")}:</span>
              <span className="font-medium ml-1">
                {midfielder.stats.longBalls}
              </span>
            </div>
            <div>
              <span className="text-gray-600">{t("crossing")}:</span>
              <span className="font-medium ml-1">
                {midfielder.stats.crossing}
              </span>
            </div>
            <div>
              <span className="text-gray-600">{t("freekicks")}:</span>
              <span className="font-medium ml-1">
                {midfielder.stats.freekicks}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("achievements")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {midfielder.achievements.slice(0, 2).map((achievement, index) => (
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              {t("attackingMidfieldersDirectory")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("attackingMidfieldersPageDescription")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Lightbulb className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {mockAttackingMidfielders.length}
            </h3>
            <p className="text-sm opacity-90">
              {t("availableAttackingMidfielders")}
            </p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <Eye className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.mostCreative[0]?.stats.creativity}
            </h3>
            <p className="text-sm opacity-90">{t("mostCreative")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Crosshair className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.bestPassers[0]?.stats.passAccuracy}%
            </h3>
            <p className="text-sm opacity-90">{t("bestPasser")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.topAssists[0]?.stats.assists}
            </h3>
            <p className="text-sm opacity-90">{t("topAssists")}</p>
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
                    placeholder={t("searchAttackingMidfielders")}
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
                    <option value="assists">{t("assists")}</option>
                    <option value="creativity">{t("creativity")}</option>
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
            {filteredAttackingMidfielders.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {t("noAttackingMidfieldersFound")}
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
                {filteredAttackingMidfielders.map((midfielder) => (
                  <StatsCard key={midfielder.id} midfielder={midfielder} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Most Creative */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-purple-500" />
                    {t("mostCreative")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.mostCreative.map((midfielder, index) => (
                    <div
                      key={midfielder.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={midfielder.image}
                        alt={midfielder.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{midfielder.name}</p>
                        <p className="text-sm text-gray-600">
                          {midfielder.club}
                        </p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        {midfielder.stats.creativity}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Best Passers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crosshair className="w-5 h-5 mr-2 text-green-500" />
                    {t("bestPassers")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.bestPassers.map((midfielder, index) => (
                    <div
                      key={midfielder.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={midfielder.image}
                        alt={midfielder.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{midfielder.name}</p>
                        <p className="text-sm text-gray-600">
                          {midfielder.club}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {midfielder.stats.passAccuracy}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Assists */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    {t("topAssists")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.topAssists.map((midfielder, index) => (
                    <div
                      key={midfielder.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={midfielder.image}
                        alt={midfielder.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{midfielder.name}</p>
                        <p className="text-sm text-gray-600">
                          {midfielder.club}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {midfielder.stats.assists}
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
