import { Express, Request as ExpressRequest, Response, NextFunction, static as expressStatic } from "express";
import multer from "multer";
import { User } from "@shared/schema";

// Extend Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

type Request = ExpressRequest;
import path from "path";
import fs from "fs-extra";
import { storage } from "./storage";
import { z } from "zod";

// Create upload directory if it doesn't exist
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
fs.ensureDirSync(UPLOAD_DIR);

// Create thumbnails directory
const THUMBNAIL_DIR = path.join(UPLOAD_DIR, "thumbnails");
fs.ensureDirSync(THUMBNAIL_DIR);

// Define storage for uploaded files
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter function
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // Videos
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("نوع الملف غير مدعوم"), false);
  }
};

// Create multer instance
const upload = multer({
  storage: fileStorage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
});

// Schema for file uploads
const uploadSchema = z.object({
  description: z.string().optional(),
  talentId: z.number().optional(),
  isPublic: z.boolean().optional(),
});

export const setupFileUpload = (app: Express) => {
  // Serve static files from the uploads directory
  // Make the upload directory accessible via /uploads
  app.use("/uploads", expressStatic(UPLOAD_DIR));

  // Handle errors
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "حجم الملف كبير جدًا" });
      }
      return res.status(400).json({ message: `خطأ في تحميل الملف: ${err.message}` });
    }
    next(err);
  });

  // Upload an image file - accessible to anyone
  app.post("/api/upload/image", upload.single("image"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لم يتم تحديد ملف للتحميل" });
      }
      
      const data = uploadSchema.parse(req.body);
      
      // Create file record in database
      const fileUrl = `/uploads/${req.file.filename}`;
      const mediaFile = await storage.createMediaFile({
        userId: req.user?.id || 0, // Use 0 for anonymous users
        fileType: "image",
        fileUrl,
        description: data.description || 'تم رفعه بواسطة مستخدم مجهول',
        talentId: data.talentId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        isPublic: true, // Public by default
      });
      
      res.status(201).json(mediaFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "خطأ في البيانات المدخلة", details: error.errors });
      }
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "فشل في تحميل الصورة" });
    }
  });
  
  // Upload a PDF document - accessible to anyone
  app.post("/api/upload/document", upload.single("document"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لم يتم تحديد ملف للتحميل" });
      }
      
      const data = uploadSchema.parse(req.body);
      
      // Create file record in database
      const fileUrl = `/uploads/${req.file.filename}`;
      const mediaFile = await storage.createMediaFile({
        userId: req.user?.id || 0, // Use 0 for anonymous users
        fileType: "document",
        fileUrl,
        description: data.description || 'تم رفعه بواسطة مستخدم مجهول',
        talentId: data.talentId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        isPublic: true, // Public by default
      });
      
      res.status(201).json(mediaFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "خطأ في البيانات المدخلة", details: error.errors });
      }
      console.error("Error uploading document:", error);
      res.status(500).json({ message: "فشل في تحميل المستند" });
    }
  });
  
  // Upload a video file - accessible to anyone
  app.post("/api/upload/video", upload.single("video"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لم يتم تحديد ملف للتحميل" });
      }
      
      const data = uploadSchema.parse(req.body);
      
      // Create file record in database
      const fileUrl = `/uploads/${req.file.filename}`;
      const mediaFile = await storage.createMediaFile({
        userId: req.user?.id || 0, // Use 0 for anonymous users
        fileType: "video",
        fileUrl,
        description: data.description || 'تم رفعه بواسطة مستخدم مجهول',
        talentId: data.talentId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        isPublic: true, // Public by default
      });
      
      res.status(201).json(mediaFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "خطأ في البيانات المدخلة", details: error.errors });
      }
      console.error("Error uploading video:", error);
      res.status(500).json({ message: "فشل في تحميل الفيديو" });
    }
  });
  
  // Get all media files for a user
  app.get("/api/media/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const mediaFiles = await storage.getMediaFiles(userId);
      res.json(mediaFiles);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "فشل في جلب الملفات" });
    }
  });
  
  // Get all media files for a talent
  app.get("/api/media/talent/:talentId", async (req: Request, res: Response) => {
    try {
      const talentId = parseInt(req.params.talentId);
      
      const mediaFiles = await storage.getMediaFilesByTalent(talentId);
      res.json(mediaFiles);
    } catch (error) {
      console.error("Error fetching talent media files:", error);
      res.status(500).json({ message: "فشل في جلب ملفات اللاعب" });
    }
  });
  
  // Delete a media file
  app.delete("/api/media/:fileId", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "يجب تسجيل الدخول لحذف الملفات" });
      }
      
      const fileId = parseInt(req.params.fileId);
      const file = await storage.getMediaFileById(fileId);
      
      if (!file) {
        return res.status(404).json({ message: "الملف غير موجود" });
      }
      
      // Check if user is the owner of the file
      if (file.userId !== req.user.id) {
        return res.status(403).json({ message: "غير مصرح بحذف هذا الملف" });
      }
      
      // Delete the file from the filesystem
      try {
        if (file.fileUrl) {
          const filePath = path.join(process.cwd(), file.fileUrl.replace(/^\//, ''));
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          // If it's an image and has a thumbnail, delete that too
          if (file.fileType === 'image') {
            const filename = path.basename(file.fileUrl);
            const thumbnailPath = path.join(THUMBNAIL_DIR, filename);
            if (fs.existsSync(thumbnailPath)) {
              fs.unlinkSync(thumbnailPath);
            }
          }
        }
      } catch (fsError) {
        console.error('Error deleting file from filesystem:', fsError);
        // Continue with deletion from database even if file removal fails
      }
      
      // Delete the file from the database
      await storage.deleteMediaFile(fileId);
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media file:", error);
      res.status(500).json({ message: "فشل في حذف الملف" });
    }
  });
};