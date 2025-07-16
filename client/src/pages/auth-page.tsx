import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Shield, UserRound, Users, Activity, Medal, Search } from "lucide-react";

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

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  role: z.string({
    required_error: "يرجى اختيار نوع الحساب",
  }),
  fullName: z.string().optional(),
  phone: z.string().optional(),
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register, user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

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
      // التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
      setLocation("/home");
      console.log("Redirecting to home page after login");
    } catch (error) {
      // Error handling is done in the login function
      console.error("Login error:", error);
    }
  }

  // Handle registration submission
  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await register(values);
      // التوجيه إلى الصفحة الرئيسية بعد إنشاء الحساب
      setLocation("/home");
      console.log("Redirecting to home page after registration");
    } catch (error) {
      // Error handling is done in the register function
      console.error("Registration error:", error);
    }
  }

  // التوجيه إلى الصفحة الرئيسية إذا كان المستخدم قد سجل دخوله بالفعل
  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to home page");
      setLocation("/home");
    }
  }, [user, setLocation]);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Auth forms */}
        <div className="lg:order-2">
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                {activeTab === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === "login"
                  ? "قم بتسجيل الدخول للوصول إلى حسابك"
                  : "قم بإنشاء حساب جديد للاستفادة من خدماتنا"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                  <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسم المستخدم</FormLabel>
                            <FormControl>
                              <Input placeholder="اسم المستخدم" {...field} />
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
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="كلمة المرور" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسم المستخدم</FormLabel>
                            <FormControl>
                              <Input placeholder="اسم المستخدم" {...field} />
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
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="البريد الإلكتروني" {...field} />
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
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="كلمة المرور" {...field} />
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
                            <FormLabel>نوع الحساب</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر نوع الحساب" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="user">مستخدم عادي</SelectItem>
                                <SelectItem value="talent">لاعب</SelectItem>
                                <SelectItem value="coach">مدرب</SelectItem>
                                <SelectItem value="club">نادي</SelectItem>
                                <SelectItem value="agent">وكيل لاعبين</SelectItem>
                                <SelectItem value="doctor">طبيب</SelectItem>
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
                            <FormLabel>الاسم الكامل</FormLabel>
                            <FormControl>
                              <Input placeholder="الاسم الكامل" {...field} />
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
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input placeholder="رقم الهاتف" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "جاري التحميل..." : "إنشاء حساب"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="text-center">
              <p className="w-full text-sm text-muted-foreground">
                {activeTab === "login"
                  ? "ليس لديك حساب؟ "
                  : "لديك حساب بالفعل؟ "}
                <button
                  type="button"
                  className="font-bold text-primary hover:underline"
                  onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                >
                  {activeTab === "login" ? "إنشاء حساب جديد" : "تسجيل الدخول"}
                </button>
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Hero section */}
        <div className="flex flex-col items-center justify-center space-y-4 lg:order-1">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">
                Soccer Hunter
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              منصة تسويق اللاعبين والمدربين الرائدة في العالم العربي
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Medal className="w-5 h-5" />
                </div>
                <p>سجل واعرض مهاراتك للعالم</p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Users className="w-5 h-5" />
                </div>
                <p>تواصل مع النوادي والمدربين والوكلاء</p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Search className="w-5 h-5" />
                </div>
                <p>ابحث عن أفضل اللاعبين والمدربين</p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Activity className="w-5 h-5" />
                </div>
                <p>احصل على استشارات طبية متخصصة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}