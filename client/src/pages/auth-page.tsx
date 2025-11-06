import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import {
  Shield,
  UserRound,
  Users,
  Activity,
  Medal,
  Search,
  Trophy,
  Globe,
  Video,
  MessageSquare,
  Calendar,
  Upload,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Crown,
  Star,
  Target,
  Building,
  Briefcase,
  Stethoscope,
  Languages,
  FileText,
  ShieldCheck,
  Zap,
  Award,
  PlayCircle,
  Info,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LanguageDropdown from "@/components/language-dropdown";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register, user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { t, locale } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Create schemas with translations - memoized to update when locale changes
  const loginSchema = useMemo(() => z.object({
    username: z.string().min(3, t("username") + " " + t("tooShort")),
    password: z.string().min(6, t("password") + " " + t("tooShort")),
  }), [t, locale]);

  const registerSchema = useMemo(() => z.object({
    username: z.string().min(3, t("username") + " " + t("tooShort")),
    password: z.string().min(6, t("password") + " " + t("tooShort")),
    email: z.string().email(t("invalidEmail")),
    role: z.string({
      required_error: t("required"),
    }),
    fullName: z.string().optional(),
    phone: z.string().optional(),
  }), [t, locale]);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      role: "",
      fullName: "",
      phone: "",
    },
  });

  // Handle login submission
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await login(values);
      setLocation("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  // Handle registration submission
  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await register(values);
      // Redirect to setup profile for players and coaches
      if (values.role === "talent" || values.role === "coach") {
        setLocation("/setup-profile");
      } else {
        setLocation("/home");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/home");
    }
  }, [user, setLocation]);

  // Re-initialize forms when locale changes to update validation messages
  useEffect(() => {
    loginForm.clearErrors();
    registerForm.clearErrors();
  }, [locale, loginForm, registerForm]);

  // Key features
  const keyFeatures = [
    {
      icon: <Video className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("videoConferencing"),
      description: t("videoConferencingDesc"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MessageSquare className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("instantChat"),
      description: t("instantChatDesc"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <UserRound className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("profileManagement"),
      description: t("profileManagementDesc"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FileText className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("mediaUpload"),
      description: t("mediaUploadDesc"),
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Who can join
  const whoCanJoin = [
    {
      icon: <Target className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("playersTitle"),
      description: t("playersDesc"),
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: <Medal className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("coachesTitle"),
      description: t("coachesDesc"),
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: <Building className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("clubsTitle"),
      description: t("clubsDesc"),
      gradient: "from-slate-500 to-gray-500",
    },
    {
      icon: <Briefcase className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("agentsTitle"),
      description: t("agentsDesc"),
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: <Stethoscope className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("doctorsTitle"),
      description: t("doctorsDesc"),
      gradient: "from-blue-500 to-green-500",
    },
  ];

  // Why choose us
  const whyChooseUs = [
    {
      icon: <Globe className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("globalReach"),
      description: t("globalReachDesc"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("securePlatform"),
      description: t("securePlatformDesc"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="w-6 h-6 2xl:w-8 2xl:h-8" />,
      title: t("easyToUse"),
      description: t("easyToUseDesc"),
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  // Supported languages
  const supportedLanguages = [
    t("arabic"),
    t("english"),
    t("french"),
    t("german"),
    t("spanish"),
    t("portuguese"),
    t("italian"),
    t("latin"),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-50">
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-100/50 p-2 2xl:p-3 hover:shadow-2xl transition-all duration-300">
          <LanguageDropdown />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 2xl:py-16 relative z-10">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
          
          {/* Top Section - Logo & Title (Mobile & Tablet) */}
          <div className="lg:hidden text-center mb-8 2xl:mb-12">
            <div className="flex justify-center mb-6 2xl:mb-8">
              <div className="relative group">
                <div className="w-20 h-20 2xl:w-28 2xl:h-28 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Trophy className="w-12 h-12 2xl:w-16 2xl:h-16 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 2xl:-top-4 2xl:-right-4 w-10 h-10 2xl:w-14 2xl:h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <Crown className="w-6 h-6 2xl:w-8 2xl:h-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl 2xl:text-7xl font-extrabold mb-3 2xl:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Soccer Hunters
            </h1>
            <p className="text-lg sm:text-xl 2xl:text-2xl text-gray-600">{t("tagline")}</p>
          </div>

          {/* Main Layout - 3 Columns on Large Screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 2xl:gap-12 items-start">
            
            {/* Left Sidebar - Key Features */}
            <div className="hidden lg:block lg:col-span-3 space-y-6 2xl:space-y-8">
              
              {/* Logo Section */}
              <div className="flex justify-start mb-8 2xl:mb-12">
                <div className="relative group">
                  <div className="w-20 h-20 2xl:w-28 2xl:h-28 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Trophy className="w-12 h-12 2xl:w-16 2xl:h-16 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 2xl:-top-4 2xl:-right-4 w-10 h-10 2xl:w-14 2xl:h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                    <Crown className="w-6 h-6 2xl:w-8 2xl:h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-5 2xl:space-y-6">
                <h2 className="text-xl 2xl:text-2xl font-bold text-gray-800">
                  {t("keyFeatures")}
                </h2>
                <div className="space-y-4 2xl:space-y-5">
                  {keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="group p-4 2xl:p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-transparent hover:scale-105"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-start gap-4 2xl:gap-5">
                        <div
                          className={`w-14 h-14 2xl:w-18 2xl:h-18 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 flex-shrink-0`}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base 2xl:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-sm 2xl:text-base text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 2xl:gap-5 pt-6 2xl:pt-8">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 2xl:p-6 shadow-lg text-center border border-gray-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-2xl 2xl:text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-xs 2xl:text-sm text-gray-600 mt-2">{t("activeUsers")}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 2xl:p-6 shadow-lg text-center border border-gray-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-2xl 2xl:text-3xl font-bold text-green-600">25+</div>
                  <div className="text-xs 2xl:text-sm text-gray-600 mt-2">{t("countries")}</div>
                </div>
              </div>
            </div>

            {/* Center - Auth Form */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <Card className="w-full max-w-lg 2xl:max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-2xl relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none"></div>
                
                <CardHeader className="space-y-5 2xl:space-y-6 pb-8 2xl:pb-10 relative z-10">
                  <div className="text-center space-y-3 2xl:space-y-4">
                    <CardTitle className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold">
                      {activeTab === "login" ? (
                        <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient">
                          {t("welcomeBack")}
                        </span>
                      ) : (
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                          {t("joinUs")}
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-lg 2xl:text-xl">
                      {activeTab === "login" ? (
                        <span className="text-gray-600 font-medium">
                          {t("loginToAccess")}
                        </span>
                      ) : (
                        <div className="space-y-3 2xl:space-y-4">
                          <span className="text-gray-600 font-medium block">
                            {t("registerSubtitle")}
                          </span>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm 2xl:text-base px-4 2xl:px-6 py-2 2xl:py-3 shadow-lg">
                            {t("freeRegistration")}
                          </Badge>
                        </div>
                      )}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-8 2xl:mb-10 grid w-full grid-cols-2 bg-gray-100 h-14 2xl:h-16 rounded-xl">
                      <TabsTrigger
                        value="login"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300 text-base 2xl:text-lg font-semibold rounded-xl"
                      >
                        {t("login")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 text-base 2xl:text-lg font-semibold rounded-xl"
                      >
                        {t("register")}
                      </TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login" className="space-y-6 2xl:space-y-7 mt-0">
                      <Form {...loginForm}>
                        <form
                          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                          className="space-y-6 2xl:space-y-7"
                        >
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2 text-base 2xl:text-lg">
                                  <User className="w-5 h-5 2xl:w-6 2xl:h-6" />
                                  {t("username")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("username")}
                                    className="h-14 2xl:h-16 border-2 focus:border-blue-500 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2 text-base 2xl:text-lg">
                                  <Lock className="w-5 h-5 2xl:w-6 2xl:h-6" />
                                  {t("password")}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      placeholder={t("password")}
                                      className="h-14 2xl:h-16 border-2 focus:border-blue-500 pr-12 2xl:pr-14 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                      {...field}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      {showPassword ? (
                                        <EyeOff className="w-6 h-6 2xl:w-7 2xl:h-7" />
                                      ) : (
                                        <Eye className="w-6 h-6 2xl:w-7 2xl:h-7" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center justify-end">
                            <button
                              type="button"
                              className="text-sm 2xl:text-base text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
                            >
                              {t("forgotPassword")}
                            </button>
                          </div>
                          <Button
                            type="submit"
                            className="w-full h-14 2xl:h-16 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold text-lg 2xl:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-105"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center gap-3">
                                <div className="w-6 h-6 2xl:w-7 2xl:h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                {t("loading")}
                              </span>
                            ) : (
                              <span className="flex items-center gap-3">
                                {t("login")}
                                <ArrowRight className="w-6 h-6 2xl:w-7 2xl:h-7" />
                              </span>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    {/* Register Form */}
                    <TabsContent value="register" className="space-y-5 2xl:space-y-6 mt-0">
                      <Form {...registerForm}>
                        <form
                          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                          className="space-y-5 2xl:space-y-6"
                        >
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2 text-base 2xl:text-lg">
                                  <User className="w-5 h-5 2xl:w-6 2xl:h-6" />
                                  {t("username")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("username")}
                                    className="h-14 2xl:h-16 border-2 focus:border-purple-500 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2 text-base 2xl:text-lg">
                                  <Mail className="w-5 h-5 2xl:w-6 2xl:h-6" />
                                  {t("email")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder={t("email")}
                                    className="h-14 2xl:h-16 border-2 focus:border-purple-500 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2 text-base 2xl:text-lg">
                                  <Lock className="w-5 h-5 2xl:w-6 2xl:h-6" />
                                  {t("password")}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={showConfirmPassword ? "text" : "password"}
                                      placeholder={t("password")}
                                      className="h-14 2xl:h-16 border-2 focus:border-purple-500 pr-12 2xl:pr-14 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                      {...field}
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                      }
                                      className="absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="w-6 h-6 2xl:w-7 2xl:h-7" />
                                      ) : (
                                        <Eye className="w-6 h-6 2xl:w-7 2xl:h-7" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold text-base 2xl:text-lg">
                                  {t("accountType")}
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-14 2xl:h-16 border-2 focus:border-purple-500 transition-all duration-300 text-base 2xl:text-lg rounded-xl">
                                      <SelectValue placeholder={t("selectAccountType")} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="user">{t("regularUser")}</SelectItem>
                                    <SelectItem value="talent">{t("talent")}</SelectItem>
                                    <SelectItem value="coach">{t("coach")}</SelectItem>
                                    <SelectItem value="club">{t("club")}</SelectItem>
                                    <SelectItem value="agent">{t("agent")}</SelectItem>
                                    <SelectItem value="doctor">{t("doctor")}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold text-base 2xl:text-lg">
                                  {t("fullName")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("fullName")}
                                    className="h-14 2xl:h-16 border-2 focus:border-purple-500 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2 text-base 2xl:text-lg">
                                  <Phone className="w-5 h-5 2xl:w-6 2xl:h-6" />
                                  {t("phoneNumber")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("phoneNumber")}
                                    className="h-14 2xl:h-16 border-2 focus:border-purple-500 transition-all duration-300 text-base 2xl:text-lg rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full h-14 2xl:h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg 2xl:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-105"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center gap-3">
                                <div className="w-6 h-6 2xl:w-7 2xl:h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                {t("loading")}
                              </span>
                            ) : (
                              <span className="flex items-center gap-3">
                                {t("createAccountButton")}
                                <ArrowRight className="w-6 h-6 2xl:w-7 2xl:h-7" />
                              </span>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 2xl:space-y-5 pt-8 2xl:pt-10 relative z-10">
                  <p className="text-sm 2xl:text-base text-center text-gray-600">
                    {activeTab === "login" ? (
                      <>
                        {t("noAccount")}{" "}
                        <button
                          type="button"
                          className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                          onClick={() => setActiveTab("register")}
                        >
                          {t("createAccount")}
                        </button>
                      </>
                    ) : (
                      <>
                        {t("alreadyHaveAccount")}{" "}
                        <button
                          type="button"
                          className="font-bold text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                          onClick={() => setActiveTab("login")}
                        >
                          {t("login")}
                        </button>
                      </>
                    )}
                  </p>
                  <p className="text-xs 2xl:text-sm text-center text-gray-500">
                    {t("joinThousands")}
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Right Sidebar - Additional Info */}
            <div className="hidden lg:block lg:col-span-3 space-y-6 2xl:space-y-8">
              
              {/* Who Can Join */}
              <div className="space-y-5 2xl:space-y-6">
                <h2 className="text-xl 2xl:text-2xl font-bold text-gray-800">
                  {t("whoCanJoin")}
                </h2>
                <div className="space-y-4 2xl:space-y-5">
                  {whoCanJoin.map((item, index) => (
                    <div
                      key={index}
                      className="group p-4 2xl:p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-transparent hover:scale-105"
                    >
                      <div className="flex items-start gap-4 2xl:gap-5">
                        <div
                          className={`w-14 h-14 2xl:w-18 2xl:h-18 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 flex-shrink-0`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base 2xl:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm 2xl:text-base text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="space-y-5 2xl:space-y-6 pt-6 2xl:pt-8">
                <h2 className="text-xl 2xl:text-2xl font-bold text-gray-800">
                  {t("whyChooseUs")}
                </h2>
                <div className="space-y-4 2xl:space-y-5">
                  {whyChooseUs.map((item, index) => (
                    <div
                      key={index}
                      className="group p-4 2xl:p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-transparent hover:scale-105"
                    >
                      <div className="flex items-start gap-4 2xl:gap-5">
                        <div
                          className={`w-14 h-14 2xl:w-18 2xl:h-18 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 flex-shrink-0`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base 2xl:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm 2xl:text-base text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Stats */}
              <div className="space-y-5 2xl:space-y-6 pt-6 2xl:pt-8">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 2xl:p-7 shadow-lg border border-gray-100/50">
                  <h3 className="text-base 2xl:text-lg font-bold text-gray-800 mb-4 2xl:mb-5 flex items-center gap-2">
                    <Languages className="w-5 h-5 2xl:w-6 2xl:h-6 text-purple-600" />
                    {t("supportedLanguages")}
                  </h3>
                  <div className="flex flex-wrap gap-2 2xl:gap-3">
                    {supportedLanguages.map((lang, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 text-xs 2xl:text-sm px-3 2xl:px-4 py-1 2xl:py-2"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 2xl:p-7 shadow-lg text-center border border-gray-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-2xl 2xl:text-3xl font-bold text-purple-600">12K+</div>
                  <div className="text-xs 2xl:text-sm text-gray-600 mt-2">{t("successfulMatches")}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section - Additional Info for Mobile/Tablet */}
          <div className="lg:hidden mt-8 2xl:mt-12 space-y-8 2xl:space-y-10">
            
            {/* Key Features */}
            <div className="space-y-5 2xl:space-y-6">
              <h2 className="text-2xl 2xl:text-3xl font-bold text-gray-800 text-center">
                {t("keyFeatures")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
                {keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-5 2xl:p-7 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 2xl:gap-5">
                      <div
                        className={`w-14 h-14 2xl:w-18 2xl:h-18 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-base 2xl:text-lg mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm 2xl:text-base text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who Can Join */}
            <div className="space-y-5 2xl:space-y-6">
              <h2 className="text-2xl 2xl:text-3xl font-bold text-gray-800 text-center">
                {t("whoCanJoin")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 2xl:gap-6">
                {whoCanJoin.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 2xl:p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 2xl:w-16 2xl:h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg mb-3 2xl:mb-4 mx-auto`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm 2xl:text-base mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-xs 2xl:text-sm text-gray-600 leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Languages */}
            <div className="grid grid-cols-3 gap-4 2xl:gap-6">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 2xl:p-6 shadow-lg text-center border border-gray-100/50">
                <div className="text-2xl 2xl:text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-xs 2xl:text-sm text-gray-600 mt-2">{t("activeUsers")}</div>
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 2xl:p-6 shadow-lg text-center border border-gray-100/50">
                <div className="text-2xl 2xl:text-3xl font-bold text-green-600">25+</div>
                <div className="text-xs 2xl:text-sm text-gray-600 mt-2">{t("countries")}</div>
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 2xl:p-6 shadow-lg text-center border border-gray-100/50">
                <div className="text-2xl 2xl:text-3xl font-bold text-purple-600">12K+</div>
                <div className="text-xs 2xl:text-sm text-gray-600 mt-2">{t("successfulMatches")}</div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 2xl:p-7 shadow-lg border border-gray-100/50">
              <h3 className="text-base 2xl:text-lg font-bold text-gray-800 mb-4 2xl:mb-5 flex items-center gap-2 justify-center">
                <Languages className="w-5 h-5 2xl:w-6 2xl:h-6 text-purple-600" />
                {t("supportedLanguages")}
              </h3>
              <div className="flex flex-wrap gap-2 2xl:gap-3 justify-center">
                {supportedLanguages.map((lang, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 text-xs 2xl:text-sm px-3 2xl:px-4 py-1 2xl:py-2"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
