import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

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

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  consultationFee?: number;
  imageUrl?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

const appointmentTypes = [
  {
    id: "consultation",
    nameEn: "General Consultation",
    nameAr: "استشارة عامة",
  },
  { id: "followup", nameEn: "Follow-up Visit", nameAr: "زيارة متابعة" },
  {
    id: "emergency",
    nameEn: "Emergency Consultation",
    nameAr: "استشارة طارئة",
  },
  {
    id: "injury",
    nameEn: "Sports Injury Assessment",
    nameAr: "تقييم إصابة رياضية",
  },
  { id: "checkup", nameEn: "Regular Check-up", nameAr: "فحص دوري" },
];

export function BookingModal({ isOpen, onClose, doctor }: BookingModalProps) {
  const { t, locale: currentLanguage } = useTranslation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "",
    symptoms: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (
      !formData.patientName ||
      !formData.patientPhone ||
      !formData.appointmentDate ||
      !formData.appointmentTime ||
      !formData.appointmentType
    ) {
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
      // Simulate API call to book appointment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title:
          currentLanguage === "ar"
            ? "تم حجز الموعد بنجاح"
            : "Appointment Booked Successfully",
        description:
          currentLanguage === "ar"
            ? `تم حجز موعدك مع ${doctor.name} في ${formData.appointmentDate} الساعة ${formData.appointmentTime}`
            : `Your appointment with ${doctor.name} has been booked for ${formData.appointmentDate} at ${formData.appointmentTime}`,
      });

      // Reset form and close modal
      setFormData({
        patientName: "",
        patientPhone: "",
        patientEmail: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentType: "",
        symptoms: "",
        notes: "",
      });
      onClose();
    } catch (error) {
      toast({
        title: currentLanguage === "ar" ? "خطأ في الحجز" : "Booking Error",
        description:
          currentLanguage === "ar"
            ? "حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى"
            : "An error occurred while booking the appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAppointmentTypeName = (type: any) => {
    return currentLanguage === "ar" ? type.nameAr : type.nameEn;
  };

  // Get today's date for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              {doctor.imageUrl ? (
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="text-2xl">👨‍⚕️</div>
              )}
            </div>
            <div>
              <h3 className="font-semibold">
                {currentLanguage === "ar"
                  ? "حجز موعد مع"
                  : "Book Appointment with"}
              </h3>
              <p className="text-sm text-muted-foreground">{doctor.name}</p>
              <p className="text-xs text-muted-foreground">
                {doctor.specialization}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            {currentLanguage === "ar"
              ? "املأ البيانات التالية لحجز موعد مع الطبيب"
              : "Fill in the details below to book an appointment with the doctor"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              {currentLanguage === "ar"
                ? "معلومات المريض"
                : "Patient Information"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="patientName">
                  {currentLanguage === "ar" ? "اسم المريض" : "Patient Name"} *
                </Label>
                <Input
                  id="patientName"
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    handleInputChange("patientName", e.target.value)
                  }
                  placeholder={
                    currentLanguage === "ar"
                      ? "أدخل اسم المريض"
                      : "Enter patient name"
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="patientPhone">
                  {currentLanguage === "ar" ? "رقم الهاتف" : "Phone Number"} *
                </Label>
                <Input
                  id="patientPhone"
                  type="tel"
                  value={formData.patientPhone}
                  onChange={(e) =>
                    handleInputChange("patientPhone", e.target.value)
                  }
                  placeholder={
                    currentLanguage === "ar" ? "رقم الهاتف" : "Phone number"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="patientEmail">
                {currentLanguage === "ar"
                  ? "البريد الإلكتروني"
                  : "Email Address"}
              </Label>
              <Input
                id="patientEmail"
                type="email"
                value={formData.patientEmail}
                onChange={(e) =>
                  handleInputChange("patientEmail", e.target.value)
                }
                placeholder={
                  currentLanguage === "ar"
                    ? "البريد الإلكتروني (اختياري)"
                    : "Email address (optional)"
                }
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {currentLanguage === "ar"
                ? "تفاصيل الموعد"
                : "Appointment Details"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="appointmentDate">
                  {currentLanguage === "ar"
                    ? "تاريخ الموعد"
                    : "Appointment Date"}{" "}
                  *
                </Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  min={today}
                  value={formData.appointmentDate}
                  onChange={(e) =>
                    handleInputChange("appointmentDate", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="appointmentTime">
                  {currentLanguage === "ar" ? "وقت الموعد" : "Appointment Time"}{" "}
                  *
                </Label>
                <Select
                  value={formData.appointmentTime}
                  onValueChange={(value) =>
                    handleInputChange("appointmentTime", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        currentLanguage === "ar" ? "اختر الوقت" : "Select time"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="appointmentType">
                {currentLanguage === "ar"
                  ? "نوع الاستشارة"
                  : "Appointment Type"}{" "}
                *
              </Label>
              <Select
                value={formData.appointmentType}
                onValueChange={(value) =>
                  handleInputChange("appointmentType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      currentLanguage === "ar"
                        ? "اختر نوع الاستشارة"
                        : "Select appointment type"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {getAppointmentTypeName(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {currentLanguage === "ar"
                ? "المعلومات الطبية"
                : "Medical Information"}
            </h4>

            <div>
              <Label htmlFor="symptoms">
                {currentLanguage === "ar"
                  ? "الأعراض أو سبب الزيارة"
                  : "Symptoms or Reason for Visit"}
              </Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                placeholder={
                  currentLanguage === "ar"
                    ? "اذكر الأعراض أو سبب الزيارة..."
                    : "Describe symptoms or reason for visit..."
                }
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="notes">
                {currentLanguage === "ar"
                  ? "ملاحظات إضافية"
                  : "Additional Notes"}
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder={
                  currentLanguage === "ar"
                    ? "أي ملاحظات إضافية..."
                    : "Any additional notes..."
                }
                className="min-h-[60px]"
              />
            </div>
          </div>

          {/* Fee Information */}
          {doctor.consultationFee && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {currentLanguage === "ar"
                    ? "رسوم الاستشارة:"
                    : "Consultation Fee:"}
                </span>
                <span className="text-lg font-bold text-primary">
                  {doctor.consultationFee}{" "}
                  {currentLanguage === "ar" ? "ريال" : "SAR"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {currentLanguage === "ar"
                  ? "سيتم تأكيد الرسوم عند الحضور للموعد"
                  : "Fees will be confirmed upon arrival for appointment"}
              </p>
            </div>
          )}

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
                  {currentLanguage === "ar" ? "جاري الحجز..." : "Booking..."}
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  {currentLanguage === "ar" ? "تأكيد الحجز" : "Confirm Booking"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
