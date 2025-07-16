import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Stethoscope,
  Filter,
  Grid3X3,
  List,
  Star,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Users,
  ChevronDown,
  BarChart3,
  Shield,
  BookOpen,
  Zap,
  Heart,
  Activity,
} from "lucide-react";

// Comprehensive mock data for medical specialists with professional metrics
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Ahmed Al-Rashid",
    age: 45,
    nationality: "Saudi Arabia",
    hospital: "King Fahd Medical City",
    specialization: "Sports Medicine",
    subSpecialty: "Orthopedic Sports Medicine",
    experience: 18,
    rating: 9.4,
    reviewCount: 324,
    image: "/placeholder-doctor.jpg",
    stats: {
      patientsHealed: 2840,
      successRate: 96.8,
      yearsExperience: 18,
      surgicalProcedures: 450,
      researchPapers: 23,
      consultationsToday: 12,
      emergencyResponse: 4.2,
      patientSatisfaction: 97.5,
      continuingEducation: 95,
    },
    specialties: [
      "ACL Reconstruction",
      "Shoulder Surgery",
      "Sports Injuries",
      "Arthroscopy",
    ],
    achievements: [
      "Saudi Board Certified",
      "FIFA Medical Officer",
      "Olympic Team Doctor",
    ],
    languages: ["Arabic", "English", "French"],
    consultationFee: 500,
    availability: "Available Today",
    emergencyAvailable: true,
    telemedicine: true,
    clinicHours: "8:00 AM - 6:00 PM",
    education: "Harvard Medical School, Johns Hopkins Fellowship",
    certifications: [
      "Board Certified Orthopedic Surgeon",
      "Sports Medicine Fellowship",
      "Arthroscopy Certification",
    ],
  },
  {
    id: 2,
    name: "Dr. Fatima Al-Zahra",
    age: 38,
    nationality: "Saudi Arabia",
    hospital: "King Abdulaziz Medical City",
    specialization: "Cardiology",
    subSpecialty: "Sports Cardiology",
    experience: 14,
    rating: 9.2,
    reviewCount: 278,
    image: "/placeholder-doctor.jpg",
    stats: {
      patientsHealed: 1950,
      successRate: 94.5,
      yearsExperience: 14,
      surgicalProcedures: 280,
      researchPapers: 19,
      consultationsToday: 8,
      emergencyResponse: 3.8,
      patientSatisfaction: 96.2,
      continuingEducation: 92,
    },
    specialties: [
      "Cardiac Screening",
      "Heart Rhythm Disorders",
      "Exercise Testing",
      "Preventive Cardiology",
    ],
    achievements: [
      "European Society of Cardiology Fellow",
      "Women in Medicine Award",
      "Research Excellence Award",
    ],
    languages: ["Arabic", "English", "German"],
    consultationFee: 450,
    availability: "Available Tomorrow",
    emergencyAvailable: true,
    telemedicine: true,
    clinicHours: "9:00 AM - 5:00 PM",
    education: "University of Cambridge, Mayo Clinic Fellowship",
    certifications: [
      "Board Certified Cardiologist",
      "Sports Cardiology Certificate",
      "Echocardiography Certification",
    ],
  },
  {
    id: 3,
    name: "Dr. Mohammed Al-Ghamdi",
    age: 42,
    nationality: "Saudi Arabia",
    hospital: "Prince Sultan Medical Center",
    specialization: "Physiotherapy",
    subSpecialty: "Sports Rehabilitation",
    experience: 16,
    rating: 9.0,
    reviewCount: 195,
    image: "/placeholder-doctor.jpg",
    stats: {
      patientsHealed: 3200,
      successRate: 92.3,
      yearsExperience: 16,
      surgicalProcedures: 0,
      researchPapers: 12,
      consultationsToday: 15,
      emergencyResponse: 4.5,
      patientSatisfaction: 94.8,
      continuingEducation: 88,
    },
    specialties: [
      "Post-Surgery Rehabilitation",
      "Movement Analysis",
      "Injury Prevention",
      "Performance Enhancement",
    ],
    achievements: [
      "FIFA Physiotherapist",
      "Paralympic Games Therapist",
      "Excellence in Rehabilitation Award",
    ],
    languages: ["Arabic", "English", "Spanish"],
    consultationFee: 300,
    availability: "Available Today",
    emergencyAvailable: false,
    telemedicine: true,
    clinicHours: "7:00 AM - 8:00 PM",
    education: "King Saud University, Australian Sports Medicine Fellowship",
    certifications: [
      "Licensed Physiotherapist",
      "Sports Medicine Certificate",
      "Manual Therapy Certification",
    ],
  },
  {
    id: 4,
    name: "Dr. Nora Al-Mansouri",
    age: 35,
    nationality: "Saudi Arabia",
    hospital: "National Guard Health Affairs",
    specialization: "Sports Nutrition",
    subSpecialty: "Performance Nutrition",
    experience: 10,
    rating: 8.9,
    reviewCount: 142,
    image: "/placeholder-doctor.jpg",
    stats: {
      patientsHealed: 1680,
      successRate: 91.7,
      yearsExperience: 10,
      surgicalProcedures: 0,
      researchPapers: 15,
      consultationsToday: 6,
      emergencyResponse: 0,
      patientSatisfaction: 93.5,
      continuingEducation: 96,
    },
    specialties: [
      "Athlete Nutrition Plans",
      "Weight Management",
      "Supplement Consultation",
      "Eating Disorder Treatment",
    ],
    achievements: [
      "Registered Dietitian",
      "Sports Nutrition Specialist",
      "Young Professional Award",
    ],
    languages: ["Arabic", "English"],
    consultationFee: 250,
    availability: "Available Today",
    emergencyAvailable: false,
    telemedicine: true,
    clinicHours: "8:00 AM - 4:00 PM",
    education: "King Abdulaziz University, Penn State Nutrition Program",
    certifications: [
      "Board Certified Nutritionist",
      "Sports Dietitian Certificate",
      "Clinical Nutrition Certification",
    ],
  },
  {
    id: 5,
    name: "Dr. Khalid Al-Harbi",
    age: 50,
    nationality: "Saudi Arabia",
    hospital: "King Faisal Specialist Hospital",
    specialization: "Orthopedic Surgery",
    subSpecialty: "Spinal Surgery",
    experience: 22,
    rating: 9.6,
    reviewCount: 412,
    image: "/placeholder-doctor.jpg",
    stats: {
      patientsHealed: 3850,
      successRate: 98.1,
      yearsExperience: 22,
      surgicalProcedures: 1200,
      researchPapers: 35,
      consultationsToday: 4,
      emergencyResponse: 3.5,
      patientSatisfaction: 98.7,
      continuingEducation: 94,
    },
    specialties: [
      "Spinal Fusion",
      "Minimally Invasive Surgery",
      "Scoliosis Treatment",
      "Disc Replacement",
    ],
    achievements: [
      "Department Head",
      "International Spine Society Fellow",
      "Surgical Excellence Award",
    ],
    languages: ["Arabic", "English", "French"],
    consultationFee: 600,
    availability: "Booking Required",
    emergencyAvailable: true,
    telemedicine: false,
    clinicHours: "8:00 AM - 3:00 PM",
    education: "University of Toronto, Mayo Clinic Fellowship",
    certifications: [
      "Board Certified Orthopedic Surgeon",
      "Spine Surgery Fellowship",
      "Minimally Invasive Surgery Certificate",
    ],
  },
  {
    id: 6,
    name: "Dr. Reem Al-Dosari",
    age: 36,
    nationality: "Saudi Arabia",
    hospital: "Armed Forces Hospital",
    specialization: "Sports Psychology",
    subSpecialty: "Performance Psychology",
    experience: 11,
    rating: 8.8,
    reviewCount: 89,
    image: "/placeholder-doctor.jpg",
    stats: {
      patientsHealed: 980,
      successRate: 89.4,
      yearsExperience: 11,
      surgicalProcedures: 0,
      researchPapers: 18,
      consultationsToday: 7,
      emergencyResponse: 0,
      patientSatisfaction: 91.2,
      continuingEducation: 98,
    },
    specialties: [
      "Mental Performance",
      "Anxiety Management",
      "Team Dynamics",
      "Motivational Coaching",
    ],
    achievements: [
      "Licensed Clinical Psychologist",
      "Sports Psychology Certification",
      "Mental Health Advocate Award",
    ],
    languages: ["Arabic", "English"],
    consultationFee: 350,
    availability: "Available Tomorrow",
    emergencyAvailable: false,
    telemedicine: true,
    clinicHours: "10:00 AM - 6:00 PM",
    education: "King Saud University, Stanford Psychology Program",
    certifications: [
      "Licensed Clinical Psychologist",
      "Sports Psychology Certificate",
      "Cognitive Behavioral Therapy Certification",
    ],
  },
];

export default function DoctorsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHospital, setFilterHospital] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = useMemo(() => {
    let filtered = mockDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHospital =
        !filterHospital ||
        doctor.hospital.toLowerCase().includes(filterHospital.toLowerCase());
      const matchesSpecialization =
        !filterSpecialization ||
        doctor.specialization
          .toLowerCase()
          .includes(filterSpecialization.toLowerCase());

      return matchesSearch && matchesHospital && matchesSpecialization;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "successRate":
          return b.stats.successRate - a.stats.successRate;
        case "consultationFee":
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterHospital, filterSpecialization, sortBy]);

  const topPerformers = useMemo(() => {
    return {
      highestRated: [...mockDoctors]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
      mostExperienced: [...mockDoctors]
        .sort((a, b) => b.experience - a.experience)
        .slice(0, 3),
      highestSuccess: [...mockDoctors]
        .sort((a, b) => b.stats.successRate - a.stats.successRate)
        .slice(0, 3),
    };
  }, []);

  const StatsCard = ({ doctor }: { doctor: (typeof mockDoctors)[0] }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-doctor.jpg";
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {doctor.rating}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.hospital}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {doctor.nationality}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {doctor.experience} {t("years")}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">
              {doctor.consultationFee} SAR
            </p>
            <p className="text-xs text-gray-500">{t("consultationFee")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Medical Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Heart className="w-4 h-4 text-blue-600 mr-1" />
              <span className="font-bold text-blue-700">
                {doctor.stats.patientsHealed}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("patientsHealed")}</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-4 h-4 text-green-600 mr-1" />
              <span className="font-bold text-green-700">
                {doctor.stats.successRate}%
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("successRate")}</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="w-4 h-4 text-purple-600 mr-1" />
              <span className="font-bold text-purple-700">
                {doctor.stats.researchPapers}
              </span>
            </div>
            <p className="text-xs text-gray-600">{t("researchPapers")}</p>
          </div>
        </div>

        {/* Specialization */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("specialization")}:
          </p>
          <Badge variant="secondary" className="text-xs">
            <Stethoscope className="w-3 h-3 mr-1" />
            {doctor.specialization}
          </Badge>
          {doctor.subSpecialty && (
            <Badge variant="outline" className="text-xs ml-1">
              {doctor.subSpecialty}
            </Badge>
          )}
        </div>

        {/* Medical Specialties */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("medicalSpecialties")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {doctor.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Medical Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {t("patientSatisfaction")}:
            </span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${doctor.stats.patientSatisfaction}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {doctor.stats.patientSatisfaction}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {t("continuingEducation")}:
            </span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${doctor.stats.continuingEducation}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {doctor.stats.continuingEducation}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Status */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            {doctor.emergencyAvailable && (
              <Badge variant="destructive" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {t("emergency")}
              </Badge>
            )}
            {doctor.telemedicine && (
              <Badge variant="outline" className="text-xs">
                📱 {t("telemedicine")}
              </Badge>
            )}
          </div>
        </div>

        {/* Availability & Contact */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            {t("availability")}
          </h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-2 text-gray-600" />
              <span className="text-green-600 font-medium">
                {doctor.availability}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-2 text-gray-600" />
              <span>{doctor.clinicHours}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-2 text-gray-600" />
              <span>
                {doctor.stats.consultationsToday} {t("consultationsToday")}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Qualifications */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("topAchievements")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {doctor.achievements.slice(0, 2).map((achievement, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t("languages")}:
          </p>
          <div className="flex flex-wrap gap-1">
            {doctor.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                🌐 {language}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              {t("medicalSpecialistsDirectory")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("medicalSpecialistsPageDescription")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Stethoscope className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{mockDoctors.length}</h3>
            <p className="text-sm opacity-90">{t("availableDoctors")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Star className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.highestRated[0]?.rating}
            </h3>
            <p className="text-sm opacity-90">{t("topRated")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.highestSuccess[0]?.stats.successRate}%
            </h3>
            <p className="text-sm opacity-90">{t("highestSuccessRate")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {topPerformers.mostExperienced[0]?.experience}
            </h3>
            <p className="text-sm opacity-90">{t("mostExperienced")}</p>
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
                    placeholder={t("searchDoctors")}
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
                    {t("hospital")}
                  </label>
                  <Input
                    placeholder={t("filterByHospital")}
                    value={filterHospital}
                    onChange={(e) => setFilterHospital(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("specialization")}
                  </label>
                  <Input
                    placeholder={t("filterBySpecialization")}
                    value={filterSpecialization}
                    onChange={(e) => setFilterSpecialization(e.target.value)}
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
                    <option value="experience">{t("experience")}</option>
                    <option value="successRate">{t("successRate")}</option>
                    <option value="consultationFee">
                      {t("consultationFee")}
                    </option>
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
            {filteredDoctors.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {t("noDoctorsFound")}
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
                {filteredDoctors.map((doctor) => (
                  <StatsCard key={doctor.id} doctor={doctor} />
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
                    {t("topRatedDoctors")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.highestRated.map((doctor, index) => (
                    <div
                      key={doctor.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-doctor.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{doctor.name}</p>
                        <p className="text-sm text-gray-600">
                          {doctor.specialization}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {doctor.rating}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Most Experienced */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    {t("mostExperienced")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.mostExperienced.map((doctor, index) => (
                    <div
                      key={doctor.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-doctor.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{doctor.name}</p>
                        <p className="text-sm text-gray-600">
                          {doctor.specialization}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {doctor.experience} {t("years")}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Highest Success Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-500" />
                    {t("highestSuccessRate")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topPerformers.highestSuccess.map((doctor, index) => (
                    <div
                      key={doctor.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-doctor.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{doctor.name}</p>
                        <p className="text-sm text-gray-600">
                          {doctor.specialization}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {doctor.stats.successRate}%
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
