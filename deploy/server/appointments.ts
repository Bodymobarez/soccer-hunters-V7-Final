import { Express, Request, Response } from "express";
import { z } from "zod";
import { storage } from "./storage";

// Validation schema for appointments
const appointmentSchema = z.object({
  title: z.string().min(3, { message: "العنوان يجب أن يكون ٣ أحرف على الأقل" }),
  description: z.string().optional(),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "التاريخ غير صالح. يجب أن يكون بصيغة ISO"
  }),
  endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "التاريخ غير صالح. يجب أن يكون بصيغة ISO"
  }),
  talentId: z.number().optional(),
  clubId: z.number().optional(),
  agentId: z.number().optional(),
  doctorId: z.number().optional(),
  attendees: z.array(z.number()).optional(),
  isVideoMeeting: z.boolean().optional(),
  meetingLink: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).default("pending"),
  location: z.string().optional(),
});

export const setupAppointments = (app: Express) => {
  // Create a new appointment
  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول لحجز موعد" });
      }
      
      const validatedData = appointmentSchema.parse(req.body);
      
      const appointment = await storage.createAppointment({
        ...validatedData,
        createdBy: req.user.id,
      });
      
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "خطأ في البيانات المدخلة", details: error.errors });
      }
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "فشل في إنشاء الموعد" });
    }
  });
  
  // Get all appointments for the current user
  app.get("/api/appointments", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول" });
      }
      
      const appointments = await storage.getUserAppointments(req.user.id);
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "فشل في جلب المواعيد" });
    }
  });
  
  // Get a specific appointment
  app.get("/api/appointments/:id", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول" });
      }
      
      const appointmentId = parseInt(req.params.id);
      const appointment = await storage.getAppointment(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "الموعد غير موجود" });
      }
      
      // Check if user has permission to view this appointment
      // User can view if they created it, are an attendee, or are the related talent/club/agent/doctor
      const isCreator = appointment.createdBy === req.user.id;
      const isRelatedEntity = 
        (appointment.talentId === req.user.id) ||
        (appointment.clubId === req.user.id) ||
        (appointment.agentId === req.user.id) ||
        (appointment.doctorId === req.user.id);
      
      // Check if user is an attendee
      let isAttendee = false;
      if (appointment.attendees) {
        const attendeesList = typeof appointment.attendees === 'string' 
          ? JSON.parse(appointment.attendees) 
          : appointment.attendees;
          
        if (Array.isArray(attendeesList) && attendeesList.includes(req.user.id)) {
          isAttendee = true;
        }
      }
      
      if (!isCreator && !isRelatedEntity && !isAttendee) {
        return res.status(403).json({ message: "غير مصرح بالوصول لهذا الموعد" });
      }
      
      res.json(appointment);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      res.status(500).json({ message: "فشل في جلب الموعد" });
    }
  });
  
  // Update appointment status
  app.patch("/api/appointments/:id/status", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول" });
      }
      
      const appointmentId = parseInt(req.params.id);
      const { status } = req.body;
      
      const appointment = await storage.getAppointment(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "الموعد غير موجود" });
      }
      
      // Only the creator or the related entity can update status
      if (appointment.createdBy !== req.user.id && 
          !((appointment.talentId === req.user.id) ||
            (appointment.clubId === req.user.id) ||
            (appointment.agentId === req.user.id) ||
            (appointment.doctorId === req.user.id))) {
        return res.status(403).json({ message: "غير مصرح بتعديل هذا الموعد" });
      }
      
      const updatedAppointment = await storage.updateAppointmentStatus(appointmentId, status);
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ message: "فشل في تحديث حالة الموعد" });
    }
  });
  
  // Delete appointment
  app.delete("/api/appointments/:id", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول" });
      }
      
      const appointmentId = parseInt(req.params.id);
      
      const appointment = await storage.getAppointment(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "الموعد غير موجود" });
      }
      
      // Only the creator can delete an appointment
      if (appointment.createdBy !== req.user.id) {
        return res.status(403).json({ message: "غير مصرح بحذف هذا الموعد" });
      }
      
      await storage.deleteAppointment(appointmentId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ message: "فشل في حذف الموعد" });
    }
  });
  
  // Add an attendee to an appointment
  app.post("/api/appointments/:id/attendees", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول" });
      }
      
      const appointmentId = parseInt(req.params.id);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "يجب تحديد معرف المستخدم" });
      }
      
      const appointment = await storage.getAppointment(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "الموعد غير موجود" });
      }
      
      // Only the creator or the related entity can add attendees
      if (appointment.createdBy !== req.user.id && 
          !((appointment.talentId === req.user.id) ||
            (appointment.clubId === req.user.id) ||
            (appointment.agentId === req.user.id) ||
            (appointment.doctorId === req.user.id))) {
        return res.status(403).json({ message: "غير مصرح بتعديل هذا الموعد" });
      }
      
      const updatedAppointment = await storage.addAppointmentAttendee(appointmentId, userId);
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Error adding attendee:", error);
      res.status(500).json({ message: "فشل في إضافة الحضور" });
    }
  });
  
  // Update meeting link
  app.patch("/api/appointments/:id/meeting", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول" });
      }
      
      const appointmentId = parseInt(req.params.id);
      const { meetingLink, isVideoMeeting } = req.body;
      
      if (!meetingLink) {
        return res.status(400).json({ message: "يجب تحديد رابط الإجتماع" });
      }
      
      const appointment = await storage.getAppointment(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "الموعد غير موجود" });
      }
      
      // Only the creator or the related entity can update the meeting link
      if (appointment.createdBy !== req.user.id && 
          !((appointment.talentId === req.user.id) ||
            (appointment.clubId === req.user.id) ||
            (appointment.agentId === req.user.id) ||
            (appointment.doctorId === req.user.id))) {
        return res.status(403).json({ message: "غير مصرح بتعديل هذا الموعد" });
      }
      
      const updatedAppointment = await storage.updateAppointmentMeeting(
        appointmentId, 
        { meetingLink, isVideoMeeting }
      );
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Error updating meeting link:", error);
      res.status(500).json({ message: "فشل في تحديث رابط الإجتماع" });
    }
  });
};