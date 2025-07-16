import { useState, useMemo } from "react";
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
  Target,
  Save,
  Users,
  Calendar,
  MapPin,
  ChevronDown,
  BarChart3,
  Timer,
  Zap,
} from "lucide-react";

// Mock data for goalkeepers with specialized metrics
const mockGoalkeepers = [
  {
    id: 1,
    name: "Manuel Neuer",
    age: 37,
    nationality: "Germany",
    club: "Bayern Munich",
    position: "Goalkeeper",
    marketValue: "€4M",
    contractUntil: "2024",
    rating: 9.2,
    image: "/placeholder-player.jpg",
    stats: {
      cleanSheets: 18,
      saves: 127,
      savePercentage: 87.3,
      penaltySaves: 4,
      distribution: 92.1,
      aerialDuels: 89.5,
      commandOfArea: 95,
      reflexes: 94,
      positioning: 96,
      communication: 98,
    },
    specialties: ["Sweeper Keeper", "Long Distribution", "Penalty Expert"],
    achievements: [
      "World Cup Winner",
      "Champions League Winner",
      "Bundesliga Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "193 cm",
    weight: "92 kg",
    matchesPlayed: 28,
    goalsAgainst: 19,
    minutesPlayed: 2520,
  },
  {
    id: 2,
    name: "Alisson Becker",
    age: 30,
    nationality: "Brazil",
    club: "Liverpool",
    position: "Goalkeeper",
    marketValue: "€45M",
    contractUntil: "2027",
    rating: 9.0,
    image: "/placeholder-player.jpg",
    stats: {
      cleanSheets: 15,
      saves: 89,
      savePercentage: 84.7,
      penaltySaves: 2,
      distribution: 88.9,
      aerialDuels: 91.2,
      commandOfArea: 92,
      reflexes: 91,
      positioning: 93,
      communication: 89,
    },
    specialties: ["Shot Stopping", "Distribution", "Leadership"],
    achievements: [
      "Champions League Winner",
      "Premier League Winner",
      "Copa America Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "191 cm",
    weight: "91 kg",
    matchesPlayed: 25,
    goalsAgainst: 22,
    minutesPlayed: 2250,
  },
  {
    id: 3,
    name: "Thibaut Courtois",
    age: 31,
    nationality: "Belgium",
    club: "Real Madrid",
    position: "Goalkeeper",
    marketValue: "€35M",
    contractUntil: "2026",
    rating: 8.8,
    image: "/placeholder-player.jpg",
    stats: {
      cleanSheets: 16,
      saves: 102,
      savePercentage: 85.1,
      penaltySaves: 3,
      distribution: 86.3,
      aerialDuels: 88.7,
      commandOfArea: 90,
      reflexes: 89,
      positioning: 91,
      communication: 87,
    },
    specialties: ["Aerial Ability", "Shot Stopping", "Big Game Player"],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "World Cup Bronze",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "199 cm",
    weight: "96 kg",
    matchesPlayed: 26,
    goalsAgainst: 20,
    minutesPlayed: 2340,
  },
  {
    id: 4,
    name: "Gianluigi Donnarumma",
    age: 25,
    nationality: "Italy",
    club: "Paris Saint-Germain",
    position: "Goalkeeper",
    marketValue: "€50M",
    contractUntil: "2026",
    rating: 8.7,
    image: "/placeholder-player.jpg",
    stats: {
      cleanSheets: 14,
      saves: 94,
      savePercentage: 83.2,
      penaltySaves: 5,
      distribution: 85.7,
      aerialDuels: 87.9,
      commandOfArea: 88,
      reflexes: 88,
      positioning: 89,
      communication: 85,
    },
    specialties: ["Penalty Specialist", "Young Leader", "Reflexes"],
    achievements: ["European Champion", "Ligue 1 Winner", "Serie A Winner"],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "196 cm",
    weight: "90 kg",
    matchesPlayed: 24,
    goalsAgainst: 18,
    minutesPlayed: 2160,
  },
  {
    id: 5,
    name: "Marc-André ter Stegen",
    age: 31,
    nationality: "Germany",
    club: "Barcelona",
    position: "Goalkeeper",
    marketValue: "€25M",
    contractUntil: "2025",
    rating: 8.6,
    image: "/placeholder-player.jpg",
    stats: {
      cleanSheets: 12,
      saves: 76,
      savePercentage: 82.1,
      penaltySaves: 1,
      distribution: 91.4,
      aerialDuels: 86.3,
      commandOfArea: 87,
      reflexes: 86,
      positioning: 88,
      communication: 84,
    },
    specialties: ["Ball Playing", "Distribution", "Sweeper Keeper"],
    achievements: [
      "Champions League Winner",
      "La Liga Winner",
      "World Cup Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Right",
    height: "187 cm",
    weight: "85 kg",
    matchesPlayed: 22,
    goalsAgainst: 25,
    minutesPlayed: 1980,
  },
  {
    id: 6,
    name: "Ederson",
    age: 30,
    nationality: "Brazil",
    club: "Manchester City",
    position: "Goalkeeper",
    marketValue: "€40M",
    contractUntil: "2026",
    rating: 8.5,
    image: "/placeholder-player.jpg",
    stats: {
      cleanSheets: 17,
      saves: 68,
      savePercentage: 79.4,
      penaltySaves: 2,
      distribution: 94.2,
      aerialDuels: 84.1,
      commandOfArea: 86,
      reflexes: 84,
      positioning: 87,
      communication: 83,
    },
    specialties: ["Distribution", "Sweeper Keeper", "Ball Playing"],
    achievements: [
      "Premier League Winner",
      "Champions League Winner",
      "Copa America Winner",
    ],
    experience: "Senior Level",
    preferredFoot: "Left",
    height: "188 cm",
    weight: "86 kg",
    matchesPlayed: 29,
    goalsAgainst: 28,
    minutesPlayed: 2610,
  },
];

export default function GoalkeeperPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredGoalkeepers = useMemo(() => {
    let filtered = mockGoalkeepers.filter((goalkeeper) => {
      const matchesSearch =
        goalkeeper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goalkeeper.club.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClub =
        !filterClub ||
        goalkeeper.club.toLowerCase().includes(filterClub.toLowerCase());
      const matchesNationality =
        !filterNationality ||
        goalkeeper.nationality
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
        case "savePercentage":
          return b.stats.savePercentage - a.stats.savePercentage;
        case "cleanSheets":
          return b.stats.cleanSheets - a.stats.cleanSheets;
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
      highestRated: [...mockGoalkeepers]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
      bestSavePercentage: [...mockGoalkeepers]
        .sort((a, b) => b.stats.savePercentage - a.stats.savePercentage)
        .slice(0, 3),
      mostCleanSheets: [...mockGoalkeepers]
        .sort((a, b) => b.stats.cleanSheets - a.stats.cleanSheets)
        .slice(0, 3),
    };
  }, []);

  const StatsCard = ({
    goalkeeper,
  }: {
    goalkeeper: (typeof mockGoalkeepers)[0];
  }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={goalkeeper.image}
                alt={goalkeeper.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-player.jpg";
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {goalkeeper.rating}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                {goalkeeper.name}
              </h3>
              <p className="text-sm text-gray-600">{goalkeeper.club}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {goalkeeper.nationality}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {goalkeeper.age} {t("years")}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">{goalkeeper.marketValue}</p>
            <p className="text-xs text-gray-500">{t("marketValue")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key GK Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Save className="w-4 h-4 text-green-600 mr-1" />
              <span className="font-bold text-green-700">
                {goalkeeper.stats.cleanSheets}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("cleanSheets")}</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-blue-600 mr-1" />
              <span className="font-bold text-blue-700">
                {goalkeeper.stats.savePercentage}%
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("savePercentage")}</p>
          </div>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("specialties")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {goalkeeper.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* GK Specific Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("reflexes")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${goalkeeper.stats.reflexes}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {goalkeeper.stats.reflexes}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("positioning")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${goalkeeper.stats.positioning}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {goalkeeper.stats.positioning}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("distribution")}:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${goalkeeper.stats.distribution}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {goalkeeper.stats.distribution}
              </span>
            </div>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">{t("height")}:</span>{" "}
            {goalkeeper.height}
          </div>
          <div>
            <span className="font-medium">{t("weight")}:</span>{" "}
            {goalkeeper.weight}
          </div>
          <div>
            <span className="font-medium">{t("preferredFoot")}:</span>{" "}
            {goalkeeper.preferredFoot}
          </div>
          <div>
            <span className="font-medium">{t("experience")}:</span>{" "}
            {goalkeeper.experience}
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("achievements")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {goalkeeper.achievements.slice(0, 2).map((achievement, index) => (
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              {t("goalkeepersDirectory")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("goalkeepersPageDescription")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{mockGoalkeepers.length}</h3>
            <p className="text-sm opacity-90">{t("availableGoalkeepers")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Star className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.highestRated[0]?.rating}
            </h3>
            <p className="text-sm opacity-90">{t("topRated")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.bestSavePercentage[0]?.stats.savePercentage}%
            </h3>
            <p className="text-sm opacity-90">{t("bestSavePercentage")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <Save className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.mostCleanSheets[0]?.stats.cleanSheets}
            </h3>
            <p className="text-sm opacity-90">{t("mostCleanSheets")}</p>
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
                    placeholder={t("searchGoalkeepers")}
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
                    <option value="savePercentage">
                      {t("savePercentage")}
                    </option>
                    <option value="cleanSheets">{t("cleanSheets")}</option>
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
            {filteredGoalkeepers.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {t("noGoalkeepersFound")}
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
                {filteredGoalkeepers.map((goalkeeper) => (
                  <StatsCard key={goalkeeper.id} goalkeeper={goalkeeper} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Rated */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    {t("topRatedGoalkeepers")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.highestRated.map((goalkeeper, index) => (
                    <div
                      key={goalkeeper.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={goalkeeper.image}
                        alt={goalkeeper.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{goalkeeper.name}</p>
                        <p className="text-sm text-gray-600">
                          {goalkeeper.club}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {goalkeeper.rating}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Best Save Percentage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-500" />
                    {t("bestSavePercentage")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.bestSavePercentage.map((goalkeeper, index) => (
                    <div
                      key={goalkeeper.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={goalkeeper.image}
                        alt={goalkeeper.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{goalkeeper.name}</p>
                        <p className="text-sm text-gray-600">
                          {goalkeeper.club}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {goalkeeper.stats.savePercentage}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Most Clean Sheets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Save className="w-5 h-5 mr-2 text-green-500" />
                    {t("mostCleanSheets")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.mostCleanSheets.map((goalkeeper, index) => (
                    <div
                      key={goalkeeper.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={goalkeeper.image}
                        alt={goalkeeper.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-player.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{goalkeeper.name}</p>
                        <p className="text-sm text-gray-600">
                          {goalkeeper.club}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {goalkeeper.stats.cleanSheets}
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
