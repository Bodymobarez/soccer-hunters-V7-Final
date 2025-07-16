import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { UserPlus, Upload, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDoctorAdded: (doctor: any) => void;
}

const specializations = [
  { id: "sports-medicine", nameEn: "Sports Medicine", nameAr: "طب رياضي" },
  { id: "orthopedic", nameEn: "Orthopedic Surgery", nameAr: "جراحة العظام" },
  { id: "physiotherapy", nameEn: "Physiotherapy", nameAr: "العلاج الطبيعي" },
  { id: "cardiology", nameEn: "Cardiology", nameAr: "أمراض القلب" },
  { id: "neurology", nameEn: "Neurology", nameAr: "الأمراض العصبية" },
  { id: "nutrition", nameEn: "Sports Nutrition", nameAr: "التغذية الرياضية" },
  {
    id: "psychology",
    nameEn: "Sports Psychology",
    nameAr: "علم النفس الرياضي",
  },
  { id: "emergency", nameEn: "Emergency Medicine", nameAr: "طب الطوارئ" },
  {
    id: "rehabilitation",
    nameEn: "Rehabilitation Medicine",
    nameAr: "طب التأهيل",
  },
  { id: "general", nameEn: "General Medicine", nameAr: "طب عام" },
];

export function AddDoctorModal({
  isOpen,
  onClose,
  onDoctorAdded,
}: AddDoctorModalProps) {
  const { t, locale: currentLanguage } = useTranslation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
    location: "",
    description: "",
    consultationFee: "",
    languages: "",
    certifications: "",
    teamAffiliations: "",
    emergencyAvailable: false,
    imageFile: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageFile: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.specialization || !formData.experience) {
      toast({
        title:
          currentLanguage === "ar" ? "خطأ في البيانات" : "Validation Error",
        description:
          currentLanguage === "ar"
            ? "يرجى ملء جميع الحقول المطلوبة"
            : "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Create new doctor object
      const newDoctor = {
        id: Date.now(), // Temporary ID for demo
        name: formData.name,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
        rating: 0, // New doctor starts with no rating
        reviewCount: 0,
        location:
          formData.location ||
          (currentLanguage === "ar"
            ? "الرياض، السعودية"
            : "Riyadh, Saudi Arabia"),
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
        languages: formData.languages
          ? formData.languages.split(",").map((l) => l.trim())
          : [],
        availability:
          currentLanguage === "ar" ? "متاح للحجز" : "Available for booking",
        consultationFee: formData.consultationFee
          ? parseInt(formData.consultationFee)
          : undefined,
        certifications: formData.certifications
          ? formData.certifications.split(",").map((c) => c.trim())
          : [],
        teamAffiliations: formData.teamAffiliations
          ? formData.teamAffiliations.split(",").map((t) => t.trim())
          : [],
        emergencyAvailable: formData.emergencyAvailable,
        imageUrl: imagePreview, // In real app, this would be uploaded to server
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title:
          currentLanguage === "ar"
            ? "تم إضافة الطبيب بنجاح"
            : "Doctor Added Successfully",
        description:
          currentLanguage === "ar"
            ? `تم إضافة ${formData.name} إلى قائمة الأطباء`
            : `${formData.name} has been added to the doctors list`,
      });

      // Call parent component to add doctor to list
      onDoctorAdded(newDoctor);

      // Reset form and close modal
      setFormData({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
        location: "",
        description: "",
        consultationFee: "",
        languages: "",
        certifications: "",
        teamAffiliations: "",
        emergencyAvailable: false,
        imageFile: null,
      });
      setImagePreview(null);
      onClose();
    } catch (error) {
      toast({
        title:
          currentLanguage === "ar"
            ? "خطأ في إضافة الطبيب"
            : "Error Adding Doctor",
        description:
          currentLanguage === "ar"
            ? "حدث خطأ أثناء إضافة الطبيب. يرجى المحاولة مرة أخرى"
            : "An error occurred while adding the doctor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSpecializationName = (spec: any) => {
    return currentLanguage === "ar" ? spec.nameAr : spec.nameEn;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">
                {currentLanguage === "ar"
                  ? "إضافة طبيب جديد"
                  : "Add New Doctor"}
              </h3>
            </div>
          </DialogTitle>
          <DialogDescription>
            {currentLanguage === "ar"
              ? "املأ البيانات التالية لإضافة طبيب جديد إلى المنصة"
              : "Fill in the details below to add a new doctor to the platform"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Photo */}
          <div className="space-y-3">
            <Label>
              {currentLanguage === "ar" ? "صورة الطبيب" : "Doctor Photo"}
            </Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Doctor preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserPlus className="h-8 w-8 text-gray-400" />
                </div>
              )}

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="doctor-photo"
                />
                <Label htmlFor="doctor-photo" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">
                      {currentLanguage === "ar" ? "رفع صورة" : "Upload Photo"}
                    </span>
                  </div>
                </Label>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium">
              {currentLanguage === "ar"
                ? "المعلومات الأساسية"
                : "Basic Information"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  {currentLanguage === "ar" ? "اسم الطبيب" : "Doctor Name"} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={
                    currentLanguage === "ar"
                      ? "د. أحمد محمد"
                      : "Dr. Ahmed Mohammed"
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="specialization">
                  {currentLanguage === "ar" ? "التخصص" : "Specialization"} *
                </Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) =>
                    handleInputChange("specialization", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        currentLanguage === "ar"
                          ? "اختر التخصص"
                          : "Select specialization"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem
                        key={spec.id}
                        value={getSpecializationName(spec)}
                      >
                        {getSpecializationName(spec)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">
                  {currentLanguage === "ar"
                    ? "سنوات الخبرة"
                    : "Years of Experience"}{" "}
                  *
                </Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="consultationFee">
                  {currentLanguage === "ar"
                    ? "رسوم الاستشارة (ريال)"
                    : "Consultation Fee (SAR)"}
                </Label>
                <Input
                  id="consultationFee"
                  type="number"
                  min="0"
                  value={formData.consultationFee}
                  onChange={(e) =>
                    handleInputChange("consultationFee", e.target.value)
                  }
                  placeholder="300"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium">
              {currentLanguage === "ar"
                ? "معلومات الاتصال"
                : "Contact Information"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">
                  {currentLanguage === "ar" ? "رقم الهاتف" : "Phone Number"}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+966501234567"
                />
              </div>

              <div>
                <Label htmlFor="email">
                  {currentLanguage === "ar"
                    ? "البريد الإلكتروني"
                    : "Email Address"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="doctor@hospital.sa"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">
                {currentLanguage === "ar" ? "الموقع/المدينة" : "Location/City"}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder={
                  currentLanguage === "ar"
                    ? "الرياض، السعودية"
                    : "Riyadh, Saudi Arabia"
                }
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h4 className="font-medium">
              {currentLanguage === "ar"
                ? "المعلومات المهنية"
                : "Professional Information"}
            </h4>

            <div>
              <Label htmlFor="description">
                {currentLanguage === "ar" ? "وصف الطبيب" : "Doctor Description"}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder={
                  currentLanguage === "ar" ? "أخصائي في..." : "Specialist in..."
                }
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="languages">
                {currentLanguage === "ar"
                  ? "اللغات (مفصولة بفاصلة)"
                  : "Languages (comma separated)"}
              </Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleInputChange("languages", e.target.value)}
                placeholder={
                  currentLanguage === "ar"
                    ? "العربية, الإنجليزية, الفرنسية"
                    : "Arabic, English, French"
                }
              />
            </div>

            <div>
              <Label htmlFor="certifications">
                {currentLanguage === "ar"
                  ? "الشهادات (مفصولة بفاصلة)"
                  : "Certifications (comma separated)"}
              </Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) =>
                  handleInputChange("certifications", e.target.value)
                }
                placeholder={
                  currentLanguage === "ar"
                    ? "شهادة البورد السعودي, زمالة..."
                    : "Saudi Board Certificate, Fellowship..."
                }
              />
            </div>

            <div>
              <Label htmlFor="teamAffiliations">
                {currentLanguage === "ar"
                  ? "الفرق المنتسب إليها (مفصولة بفاصلة)"
                  : "Team Affiliations (comma separated)"}
              </Label>
              <Input
                id="teamAffiliations"
                value={formData.teamAffiliations}
                onChange={(e) =>
                  handleInputChange("teamAffiliations", e.target.value)
                }
                placeholder={
                  currentLanguage === "ar"
                    ? "نادي الهلال, المنتخب السعودي"
                    : "Al-Hilal Club, Saudi National Team"
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emergencyAvailable"
                checked={formData.emergencyAvailable}
                onChange={(e) =>
                  handleInputChange("emergencyAvailable", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="emergencyAvailable" className="text-sm">
                {currentLanguage === "ar"
                  ? "متاح للحالات الطارئة"
                  : "Available for emergencies"}
              </Label>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {currentLanguage === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {currentLanguage === "ar" ? "جاري الإةافة..." : "Adding..."}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {currentLanguage === "ar" ? "إضافة الطبيب" : "Add Doctor"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
