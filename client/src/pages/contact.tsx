import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Clock,
  Globe,
  Users,
  Headphones,
  FileText,
  CheckCircle,
  Building,
  Star,
  Calendar,
  Shield,
  Zap,
  Heart,
  HelpCircle,
  MessageCircle,
  PhoneCall,
  VideoIcon,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Contact methods data
const contactMethods = [
  {
    id: "email",
    title: "Email Support",
    description: "Get detailed responses to your inquiries",
    icon: <Mail className="w-6 h-6" />,
    contact: "support@soccerhunter.com",
    responseTime: "Within 24 hours",
    availability: "24/7",
    color: "from-blue-500 to-blue-600",
    recommended: false,
  },
  {
    id: "phone",
    title: "Phone Support",
    description: "Speak directly with our support team",
    icon: <PhoneCall className="w-6 h-6" />,
    contact: "+201061887799",
    responseTime: "Immediate",
    availability: "9AM - 6PM (GMT+3)",
    color: "from-green-500 to-green-600",
    recommended: true,
  },
  {
    id: "chat",
    title: "Live Chat",
    description: "Quick answers to common questions",
    icon: <MessageCircle className="w-6 h-6" />,
    contact: "Available on website",
    responseTime: "Instant",
    availability: "Business hours",
    color: "from-purple-500 to-purple-600",
    recommended: false,
  },
  {
    id: "video",
    title: "Video Call",
    description: "Face-to-face consultation for complex issues",
    icon: <VideoIcon className="w-6 h-6" />,
    contact: "Schedule appointment",
    responseTime: "Scheduled",
    availability: "By appointment",
    color: "from-orange-500 to-orange-600",
    recommended: false,
  },
];

// Department contacts
const departments = [
  {
    name: "General Support",
    email: "support@soccerhunter.com",
    phone: "+201061887799",
    description: "General inquiries and platform support",
    head: "Ahmed Al-Rashid",
    icon: <Headphones className="w-5 h-5" />,
  },
  {
    name: "Technical Support",
    email: "tech@soccerhunter.com",
    phone: "+966 50 123 4568",
    description: "Technical issues and platform bugs",
    head: "Sarah Al-Mansouri",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    name: "Business Development",
    email: "business@soccerhunter.com",
    phone: "+966 50 123 4569",
    description: "Partnership and business opportunities",
    head: "Fatima Al-Zahra",
    icon: <Building className="w-5 h-5" />,
  },
  {
    name: "Player Relations",
    email: "players@soccerhunter.com",
    phone: "+966 50 123 4570",
    description: "Player registration and talent support",
    head: "Mohammed Al-Ghamdi",
    icon: <Users className="w-5 h-5" />,
  },
];

// FAQ data
const faqs = [
  {
    question: "How do I register as a player?",
    answer:
      "You can register as a player by creating an account and selecting 'Player' as your role. Complete your profile with your football experience, position, and upload your videos.",
  },
  {
    question: "How do clubs find players on the platform?",
    answer:
      "Clubs can search for players using our advanced filtering system based on position, age, location, and skill level. They can also browse player profiles and contact them directly.",
  },
  {
    question: "Is the platform free to use?",
    answer:
      "Basic registration and profile creation are free. We offer premium features for enhanced visibility and advanced analytics with our subscription plans.",
  },
  {
    question: "How do I verify my coaching credentials?",
    answer:
      "Upload your coaching licenses and certifications in your profile. Our verification team will review and approve them within 24-48 hours.",
  },
  {
    question: "Can I schedule trials through the platform?",
    answer:
      "Yes! Clubs and coaches can schedule trials directly through our integrated calendar system. Players receive notifications and can confirm their attendance.",
  },
  {
    question: "How do you ensure user safety?",
    answer:
      "We have comprehensive verification processes, secure messaging systems, and strict community guidelines to ensure a safe environment for all users.",
  },
];

// Social media links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    url: "#",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5" />,
    url: "#",
    color: "hover:text-blue-400",
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
    url: "#",
    color: "hover:text-blue-800",
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    url: "#",
    color: "hover:text-pink-600",
  },
];

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    priority: "medium",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: t("messageSent"),
      description: t("messageResponseTime"),
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      department: "",
      priority: "medium",
      message: "",
    });

    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                <MessageSquare className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t("contactUs")}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("contactPageDescription")}
          </p>
          <div className="flex justify-center mt-6">
            <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 text-lg">
              <Clock className="w-4 h-4 mr-2" />
              {t("responseTime24Hours")}
            </Badge>
          </div>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method) => (
            <Card
              key={method.id}
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {method.recommended && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs px-2 py-1 rounded-bl-lg font-bold">
                  {t("recommended")}
                </div>
              )}
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}
                >
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {method.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      {t("contact")}:
                    </span>
                    <br />
                    <span className="text-blue-600">{method.contact}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {t("responseTime")}:
                    </span>
                    <br />
                    <span className="text-green-600">
                      {method.responseTime}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {t("availability")}:
                    </span>
                    <br />
                    <span className="text-gray-600">{method.availability}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact" className="flex items-center">
              <Send className="w-4 h-4 mr-2" />
              {t("sendMessage")}
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              {t("departments")}
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              {t("faq")}
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {t("location")}
            </TabsTrigger>
          </TabsList>

          {/* Contact Form Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">
                      {t("sendUsMessage")}
                    </CardTitle>
                    <p className="text-gray-600">
                      {t("contactFormDescription")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("fullName")} *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t("enterFullName")}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("email")} *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("enterEmail")}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("phoneNumber")}
                          </label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t("enterPhoneNumber")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("department")} *
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">{t("selectDepartment")}</option>
                            <option value="general">
                              {t("generalSupport")}
                            </option>
                            <option value="technical">
                              {t("technicalSupport")}
                            </option>
                            <option value="business">
                              {t("businessDevelopment")}
                            </option>
                            <option value="players">
                              {t("playerRelations")}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("subject")} *
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder={t("enterSubject")}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("priority")}
                          </label>
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="low">{t("lowPriority")}</option>
                            <option value="medium">
                              {t("mediumPriority")}
                            </option>
                            <option value="high">{t("highPriority")}</option>
                            <option value="urgent">
                              {t("urgentPriority")}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("message")} *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t("enterDetailedMessage")}
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {t("sending")}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            {t("sendMessage")}
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t("contactInformation")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("email")}
                        </p>
                        <p className="text-gray-600">
                          support@soccerhunter.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("phone")}
                        </p>
                        <p className="text-gray-600">+201061887799</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("address")}
                        </p>
                        <p className="text-gray-600">{t("fullAddress")}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("businessHours")}
                        </p>
                        <p className="text-gray-600">
                          {t("businessHoursDetails")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("followUs")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          className={`p-3 rounded-full bg-gray-100 transition-colors ${social.color}`}
                          title={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white">
                        {dept.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {dept.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{dept.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-blue-600">{dept.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-green-600" />
                            <span className="text-green-600">{dept.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-purple-600" />
                            <span className="text-gray-700">
                              {t("headedBy")}: {dept.head}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("frequentlyAskedQuestions")}
              </h2>
              <p className="text-xl text-gray-600">{t("faqDescription")}</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">
                    {t("ourLocation")}
                  </CardTitle>
                  <p className="text-gray-600">{t("locationDescription")}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Building className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("headquarters")}
                        </p>
                        <p className="text-gray-600">{t("fullAddress")}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("officeHours")}
                        </p>
                        <p className="text-gray-600">
                          {t("officeHoursDetails")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {t("nearbyLandmarks")}
                        </p>
                        <p className="text-gray-600">{t("landmarksDetails")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-800 mb-3">
                      {t("getDirections")}
                    </h4>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        {t("googleMaps")}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Globe className="w-4 h-4 mr-2" />
                        {t("appleMaps")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {t("interactiveMap")}
                      </h3>
                      <p className="text-gray-600">{t("mapComingSoon")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
