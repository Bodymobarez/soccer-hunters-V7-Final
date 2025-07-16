import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Users,
  Globe,
  Award,
  Star,
  TrendingUp,
  Shield,
  Heart,
  Zap,
  Eye,
  Handshake,
  Rocket,
  Building,
  MapPin,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  UserCheck,
  Trophy,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import { Link } from "wouter";

// Company statistics and achievements
const companyStats = {
  founded: "2020",
  activeUsers: "50,000+",
  successfulMatches: "12,500+",
  countries: "25+",
  totalClubs: "800+",
  totalPlayers: "35,000+",
  totalCoaches: "5,000+",
  totalAgents: "1,200+",
};

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "أحمد الراشد",
    position: "الرئيس التنفيذي",
    image: "/placeholder-ceo.jpg",
    experience: "15 سنة",
    background: "مدير تنفيذي سابق في الفيفا",
    specialization: "إدارة رياضية",
    achievements: ["معتمد من الفيفا", "مرخص من اليويفا", "قائد أعمال رياضية"],
  },
  {
    id: 2,
    name: "سارة المنصوري",
    position: "مديرة التكنولوجيا",
    image: "/placeholder-cto.jpg",
    experience: "12 سنة",
    background: "هندسة البرمجيات",
    specialization: "تطوير المنصات",
    achievements: [
      "جائزة الابتكار التقني",
      "أخصائية ذكاء اصطناعي",
      "مهندسة معمارية للمنصات",
    ],
  },
  {
    id: 3,
    name: "محمد الغامدي",
    position: "رئيس العمليات الرياضية",
    image: "/placeholder-coo.jpg",
    experience: "18 سنة",
    background: "مدرب كرة قدم محترف",
    specialization: "تطوير المواهب",
    achievements: [
      "مدرب مرخص من الاتحاد الآسيوي",
      "خبير تطوير الشباب",
      "كشاف مواهب",
    ],
  },
  {
    id: 4,
    name: "فاطمة الزهراء",
    position: "رئيسة الشراكات الاستراتيجية",
    image: "/placeholder-partnerships.jpg",
    experience: "10 سنوات",
    background: "التسويق الرياضي",
    specialization: "علاقات الأندية",
    achievements: ["تميز في الشراكات", "التوسع الإقليمي", "تطوير الأندية"],
  },
];

// Company milestones
const milestones = [
  {
    year: "2020",
    title: "تأسيس الشركة",
    description:
      "تم تأسيس صقر هانتر برؤية إحداث ثورة في إدارة المواهب الرياضية",
    achievement: "إطلاق المنصة الأولية",
  },
  {
    year: "2021",
    title: "التوسع الإقليمي",
    description:
      "توسعت العمليات إلى 10 دول عبر منطقة الشرق الأوسط وشمال أفريقيا",
    achievement: "أكثر من 10,000 مستخدم",
  },
  {
    year: "2022",
    title: "الابتكار التقني",
    description:
      "إطلاق منصة مطابقة المواهب المدعومة بالذكاء ةلاصطناعي والتحليلات الشاملة",
    achievement: "الفائز بجائزة التكنولوجيا",
  },
  {
    year: "2023",
    title: "الاعتراف العالمي",
    description:
      "تم الاعتراف بها كمنصة المواهب الرياضية الرائدة في منطقة الشرق الأوسط وشمال أفريقيا",
    achievement: "أكثر من 25,000 مستخدم نشط",
  },
  {
    year: "2024",
    title: "التميز المهةي",
    description:
      "تحقيق أكثر من 50,000 مستخدم مة أكثر من 12,500 مطابقة موهبة ناجحة",
    achievement: "مكانة الرائد في الصناعة",
  },
];

// Core values
const coreValues = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "التميز",
    description:
      "نسعى للتميز في كل ما نقوم به، من تطوير المنصة إلى خدمة العملاء",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "النزاهة",
    description: "نحافظ على أعلى معايير النزاهة والشفافية في جميع عملياتنا",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "الشغف",
    description: "شغفنا بكرة القدم وتطوير المواهب يحرك كل ما نقوم به",
    color: "from-red-500 to-red-600",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "الابتكار",
    description: "نبتكر باستمرار لتقديم حلول متطورة لصناعة الرياضة",
    color: "from-purple-500 to-purple-600",
  },
];

// Services overview
const services = [
  {
    title: "اكتشاف المواهب",
    description: "منصة متطورة لاكتشاف واستطلاع المواهب بالذكاء الاصطناعي",
    features: [
      "تحليلات اللاعبين",
      "مقاييس الأداء",
      "تحليل الفيديو",
      "تقييم المهارات",
    ],
  },
  {
    title: "الشبكات المهنية",
    description: "ربط اللاعبين والمدربين والأندية والوكلاء في منصة مهنية واحدة",
    features: [
      "المراسلة المباشرة",
      "الملفات الشخصية المهنية",
      "مطابقة المواهب",
      "أدوات التعاون",
    ],
  },
  {
    title: "تطوير المسيرة المهنية",
    description: "تطوير وتتبع شامل للمسيرة المهنية والتقدم",
    features: [
      "تخطيط المسيرة المهنية",
      "تطوير المهارات",
      "برامج التدريب",
      "الارشاد والتوجيه",
    ],
  },
  {
    title: "ذكاء السوق",
    description: "رؤى وتحليلات فورية للسوق لاتخاذ قرارات مدروسة",
    features: [
      "تحليل السوق",
      "رؤى الانتقالات",
      "تقارير الاتجاهات",
      "بيانات الأداء",
    ],
  },
];

export default function About() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">صقر هانتر</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("aboutPageDescription")}
          </p>
          <div className="flex justify-center mt-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 text-lg">
              {t("establishedIn")} {companyStats.founded}
            </Badge>
          </div>
        </div>

        {/* Company Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{companyStats.activeUsers}</h3>
            <p className="text-sm opacity-90">{t("activeUsers")}</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Handshake className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {companyStats.successfulMatches}
            </h3>
            <p className="text-sm opacity-90">{t("successfulMatches")}</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <Globe className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{companyStats.countries}</h3>
            <p className="text-sm opacity-90">{t("countries")}</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <Building className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{companyStats.totalClubs}</h3>
            <p className="text-sm opacity-90">{t("partneredClubs")}</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {t("overview")}
            </TabsTrigger>
            <TabsTrigger value="mission" className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              {t("missionVision")}
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {t("ourTeam")}
            </TabsTrigger>
            <TabsTrigger value="journey" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t("ourJourney")}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Core Values */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {t("coreValues")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => (
                  <Card
                    key={index}
                    className="text-center p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center text-white`}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Services Overview */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {t("ourServices")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-gray-800">
                        {service.title}
                      </CardTitle>
                      <p className="text-gray-600">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {service.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Mission & Vision Tab */}
          <TabsContent value="mission" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mission */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-blue-600 mr-3" />
                    <CardTitle className="text-2xl text-gray-800">
                      {t("ourMission")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("missionDescription")}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">
                        {t("missionPoint1")}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">
                        {t("missionPoint2")}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">
                        {t("missionPoint3")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-l-green-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <Eye className="w-8 h-8 text-green-600 mr-3" />
                    <CardTitle className="text-2xl text-gray-800">
                      {t("ourVision")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("visionDescription")}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span className="text-gray-700">{t("visionPoint1")}</span>
                    </div>
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span className="text-gray-700">{t("visionPoint2")}</span>
                    </div>
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <span className="text-gray-700">{t("visionPoint3")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("meetOurTeam")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("teamDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-team.jpg";
                      }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.position}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        <span>{member.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{member.background}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">
                        {t("specialization")}:
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {member.specialization}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">
                        {t("achievements")}:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.achievements
                          .slice(0, 2)
                          .map((achievement, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {achievement}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journey Tab */}
          <TabsContent value="journey" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("ourJourney")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("journeyDescription")}
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {milestone.year}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {milestone.description}
                        </p>
                        <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                          <Trophy className="w-4 h-4 mr-2" />
                          {milestone.achievement}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 text-center">
          <CardContent>
            <h2 className="text-3xl font-bold mb-4">{t("joinOurMission")}</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t("joinMissionDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {t("getStarted")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {t("contactUs")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">{t("emailUs")}</h3>
            <p className="text-gray-600">info@soccerhunter.com</p>
          </Card>
          <Card className="text-center p-6">
            <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">{t("callUs")}</h3>
            <p className="text-gray-600">+966 50 123 4567</p>
          </Card>
          <Card className="text-center p-6">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">{t("visitUs")}</h3>
            <p className="text-gray-600">{t("headquartersLocation")}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
