import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Target,
  Shield,
  Circle,
  Users,
  Award,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  Globe,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Zap,
  Heart,
  Eye,
  MessageSquare,
  Building,
  Stethoscope,
  Briefcase,
  Trophy,
  Goal,
  Activity,
  Timer,
  BarChart3,
  Crown,
  Crosshair,
  ArrowLeft,
  ArrowUp,
  ChevronRight,
  PlayCircle,
  Clock,
} from "lucide-react";
import ChatWidget from "@/components/ui/chat-widget";

export default function Home() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  // Featured player categories
  const playerCategories = [
    {
      id: "goalkeeper",
      name: t("goalkeepers"),
      description: t("goalkeeperDescription"),
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-blue-600 to-cyan-600",
      route: "/goalkeeper",
      count: "150+",
      featured: true,
    },
    {
      id: "striker",
      name: t("strikers"),
      description: t("strikerDescription"),
      icon: <Target className="w-8 h-8" />,
      gradient: "from-red-600 to-orange-600",
      route: "/striker",
      count: "200+",
      featured: true,
    },
    {
      id: "left-wing",
      name: t("leftWing"),
      description: t("leftWingDescription"),
      icon: <ArrowLeft className="w-8 h-8" />,
      gradient: "from-purple-600 to-pink-600",
      route: "/left-wing",
      count: "120+",
      featured: true,
    },
    {
      id: "right-wing",
      name: t("rightWing"),
      description: t("rightWingDescription"),
      icon: <ArrowRight className="w-8 h-8" />,
      gradient: "from-indigo-600 to-purple-600",
      route: "/right-wing",
      count: "130+",
      featured: true,
    },
    {
      id: "attacking-midfielder",
      name: t("attackingMid"),
      description: t("attackingMidDescription"),
      icon: <Star className="w-8 h-8" />,
      gradient: "from-green-600 to-emerald-600",
      route: "/attacking-midfielder",
      count: "180+",
      featured: true,
    },
    {
      id: "defensive-midfielder",
      name: t("defensiveMidfielders"),
      description: t("defensiveMidfielderDescription"),
      icon: <Circle className="w-8 h-8" />,
      gradient: "from-purple-600 to-violet-600",
      route: "/defensive-midfielder",
      count: "160+",
      featured: true,
    },
  ];

  // Professional services
  const professionalServices = [
    {
      id: "coaches",
      name: t("coaches"),
      description: t("coachesDescription"),
      icon: <Users className="w-8 h-8" />,
      gradient: "from-amber-600 to-yellow-600",
      route: "/category/coaches",
      specialties: [
        t("technicalDirector"),
        t("headCoach"),
        t("assistantCoach"),
        t("goalkeepingCoaches"),
      ],
    },
    {
      id: "doctors",
      name: t("doctors"),
      description: t("doctorsDescription"),
      icon: <Stethoscope className="w-8 h-8" />,
      gradient: "from-blue-600 to-green-600",
      route: "/doctors",
      specialties: [
        t("sportsMedicine"),
        t("physiotherapy"),
        t("sportsNutrition"),
        t("sportsPsychology"),
      ],
    },
    {
      id: "clubs",
      name: t("clubs"),
      description: t("clubsDescription"),
      icon: <Building className="w-8 h-8" />,
      gradient: "from-slate-600 to-gray-600",
      route: "/clubs",
      specialties: [
        t("professionalClubs"),
        t("academies"),
        t("youthDevelopment"),
        t("scouting"),
      ],
    },
    {
      id: "agents",
      name: t("agents"),
      description: t("agentsDescription"),
      icon: <Briefcase className="w-8 h-8" />,
      gradient: "from-teal-600 to-cyan-600",
      route: "/agents",
      specialties: [
        t("talentManagement"),
        t("contractNegotiation"),
        t("careerDevelopment"),
        t("transfers"),
      ],
    },
  ];

  // Platform statistics
  const platformStats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "50,000+",
      label: t("activeUsers"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      number: "12,500+",
      label: t("successfulMatches"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      number: "25+",
      label: t("countries"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Star className="w-6 h-6" />,
      number: "4.9/5",
      label: t("userRating"),
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to services with search
      window.location.href = `/services?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-green-600/10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Trophy className="w-14 h-14 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-gray-800 mb-6">
              Soccer Hunters
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {t("tagline")}
            </p>
            <div className="flex justify-center mb-8">
              <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 text-lg">
                <Globe className="w-5 h-5 mr-2" />
                {t("worldClassPlatform")}
              </Badge>
            </div>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {t("search")}
                </Button>
              </div>
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {platformStats.map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-4 text-white`}
                  >
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Player Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {t("featuredPlayerCategories")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("explorePlayerPositions")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playerCategories.map((category) => (
            <Link key={category.id} href={category.route}>
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden cursor-pointer h-full">
                <CardHeader className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-700">
                      {category.count}
                    </Badge>
                    {category.featured && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3 mr-1" />
                        {t("featured")}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>{t("exploreCategory")}</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Professional Services */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t("professionalServices")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("comprehensiveSportsEcosystem")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalServices.map((service) => (
              <Link key={service.id} href={service.route}>
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden cursor-pointer h-full bg-white">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-gray-800">
                        {t("specializations")}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>{t("exploreService")}</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {t("quickActions")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("getStartedToday")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t("createProfile")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("createProfileDescription")}
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                {t("getStarted")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t("findTalent")}
            </h3>
            <p className="text-gray-600 mb-6">{t("findTalentDescription")}</p>
            <Link href="/services">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                {t("startSearching")}
                <Search className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t("getSupport")}
            </h3>
            <p className="text-gray-600 mb-6">{t("getSupportDescription")}</p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                {t("contactUs")}
                <MessageSquare className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              {t("joinSoccerHunter")}
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t("joinDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  {t("joinNow")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  {t("learnMore")}
                  <Eye className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
