import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";
import { WebSocketServer, WebSocket } from "ws";
import { setupFileUpload } from "./upload";
import { setupAppointments } from "./appointments";
import { setupVideoConference } from "./video-conference";
import { generateSigningVideoData } from "./openai-service";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // إنشاء مجلد للملفات الوسائطية النموذجية إذا لم يكن موجودًا
  const demoDir = path.join(process.cwd(), 'public', 'demo-videos');
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir, { recursive: true });
  }
  
  // مجلد للصور المصغرة
  const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');
  if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
  }
  
  // مجلد للصور المولدة
  const generatedImagesDir = path.join(process.cwd(), 'public', 'generated-images');
  if (!fs.existsSync(generatedImagesDir)) {
    fs.mkdirSync(generatedImagesDir, { recursive: true });
  }
  
  // خدمة الملفات الثابتة من المجلدات العامة
  app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));
  app.use('/videos', express.static(path.join(process.cwd(), 'public', 'videos')));
  app.use('/documents', express.static(path.join(process.cwd(), 'public', 'documents')));
  app.use('/generated-images', express.static(path.join(process.cwd(), 'public', 'generated-images')));
  
  // إنشاء المجلدات اللازمة إذا لم تكن موجودة
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }
  
  const docsDir = path.join(process.cwd(), 'public', 'documents');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // إنشاء ملف فيديو نموذجي قصير للتسجيلات
  app.get('/api/demo-videos/meeting-recording.mp4', (req: Request, res: Response) => {
    // نعيد توجيه الطلب إلى أحد مقاطع الفيديو العامة
    res.redirect('https://www.w3schools.com/html/mov_bbb.mp4');
  });
  
  // صورة مصغرة نموذجية للفيديو
  app.get('/api/thumbnails/video-poster.jpg', (req: Request, res: Response) => {
    // نعيد توجيه الطلب إلى صورة مصغرة عامة
    res.redirect('https://img.freepik.com/free-vector/video-conference-remote-working-flat-illustration-screen-laptop-with-group-colleagues-people-conn_88138-548.jpg');
  });
  // Set up authentication
  setupAuth(app);
  
  // Set up video conferencing endpoints
  setupVideoConference(app);
  
  // Set up file upload endpoints
  setupFileUpload(app);
  
  // Set up appointments endpoints
  setupAppointments(app);

  // Debug routes (only for development)
  if (process.env.NODE_ENV === "development") {
    app.get("/api/debug/users", async (req, res) => {
      try {
        const users = Array.from((await storage.getUsers()).values());
        // Remove passwords before sending
        const sanitizedUsers = users.map(user => {
          const { password, ...rest } = user;
          return rest;
        });
        res.json(sanitizedUsers);
      } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء استرجاع قائمة المستخدمين" });
      }
    });

    // Create test user endpoint
    app.post("/api/debug/create-test-user", async (req, res) => {
      try {
        // Check if test user already exists
        const existingUser = await storage.getUserByUsername("testuser");
        if (existingUser) {
          return res.json({ message: "Test user already exists", user: { username: existingUser.username, email: existingUser.email } });
        }

        // Create test user with simple password
        const testUser = await storage.createUser({
          username: "testuser",
          password: "testpass.salt123", // Using the simple format
          email: "test@example.com",
          role: "user",
          fullName: "Test User"
        });

        const { password, ...userWithoutPassword } = testUser;
        res.json({ message: "Test user created successfully", user: userWithoutPassword });
      } catch (error) {
        console.error("Error creating test user:", error);
        res.status(500).json({ error: "Failed to create test user" });
      }
    });
  }
  // API routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });

  app.get("/api/talents", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const featured = req.query.featured === "true";
      const query = req.query.query as string | undefined;

      let talents;
      if (categoryId) {
        talents = await storage.getTalentsByCategory(categoryId);
      } else if (featured) {
        talents = await storage.getFeaturedTalents();
      } else if (query) {
        talents = await storage.searchTalents(query);
      } else {
        talents = await storage.getTalents();
      }
      
      res.json(talents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch football talents" });
    }
  });
  
  // For backward compatibility with existing frontend code
  app.get("/api/services", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const featured = req.query.featured === "true";
      const query = req.query.query as string | undefined;

      let talents;
      if (categoryId) {
        talents = await storage.getTalentsByCategory(categoryId);
      } else if (featured) {
        talents = await storage.getFeaturedTalents();
      } else if (query) {
        talents = await storage.searchTalents(query);
      } else {
        talents = await storage.getTalents();
      }
      
      res.json(talents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch football talents" });
    }
  });

  app.get("/api/talents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const talent = await storage.getTalent(id);
      
      if (!talent) {
        return res.status(404).json({ message: "Football talent not found" });
      }
      
      res.json(talent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch football talent details" });
    }
  });
  
  // For backward compatibility with existing frontend code
  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const talent = await storage.getTalent(id);
      
      if (!talent) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(talent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service details" });
    }
  });
  
  // Singular form for service endpoint, used by the frontend
  app.get("/api/service/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const talent = await storage.getTalent(id);
      
      if (!talent) {
        return res.status(404).json({ message: "الخدمة غير موجودة" });
      }
      
      res.json(talent);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب تفاصيل الخدمة" });
    }
  });

  app.get("/api/talents/:id/contracts", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contracts = await storage.getContracts(id);
      
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contract details" });
    }
  });

  app.get("/api/talents/:id/stats", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const stats = await storage.getFootballStats(id);
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch football stats" });
    }
  });
  
  // Additional endpoint for the query parameter format used by frontend
  app.get("/api/talent/stats", async (req, res) => {
    try {
      const talentId = req.query.talentId ? parseInt(req.query.talentId as string) : null;
      
      if (!talentId) {
        return res.status(400).json({ message: "معرف اللاعب مطلوب" });
      }
      
      const stats = await storage.getFootballStats(talentId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب إحصائيات اللاعب" });
    }
  });
  
  // Add endpoint for coach achievements
  app.get("/api/coach/achievements", async (req, res) => {
    try {
      const coachId = req.query.coachId ? parseInt(req.query.coachId as string) : null;
      
      if (!coachId) {
        return res.status(400).json({ message: "معرف المدرب مطلوب" });
      }
      
      // Since we don't have a dedicated achievements table for coaches,
      // we'll extract the achievements field from the coach's data
      const coach = await storage.getTalent(coachId);
      
      if (!coach) {
        return res.status(404).json({ message: "المدرب غير موجود" });
      }
      
      // Parse the achievements field if it exists, or return an empty array
      const achievements = coach.achievements ? coach.achievements.split(',').map(item => item.trim()) : [];
      
      // Return the achievements as an array of objects for better frontend compatibility
      const formattedAchievements = achievements.map(achievement => ({
        id: achievements.indexOf(achievement) + 1,
        title: achievement,
        year: new Date().getFullYear() - Math.floor(Math.random() * 10) // Just a placeholder random year
      }));
      
      res.json(formattedAchievements);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب إنجازات المدرب" });
    }
  });

  app.get("/api/compare-stats", async (req, res) => {
    try {
      const idsParam = req.query.ids as string;
      
      if (!idsParam) {
        return res.status(400).json({ message: "Football talent IDs are required" });
      }
      
      const talentIds = idsParam.split(',').map(id => parseInt(id));
      const comparisonData = await storage.compareTalentStats(talentIds);
      
      // Get basic talent info for each ID
      const talentsPromises = talentIds.map(id => storage.getTalent(id));
      const talents = await Promise.all(talentsPromises);
      
      // Combine talent info with stats comparison data
      const result = {
        talents: talents.filter(t => t !== undefined),
        stats: comparisonData
      };
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to compare football talents" });
    }
  });
  
  // For backward compatibility with existing frontend code
  app.get("/api/compare", async (req, res) => {
    try {
      const idsParam = req.query.ids as string;
      
      if (!idsParam) {
        return res.status(400).json({ message: "Service IDs are required" });
      }
      
      const talentIds = idsParam.split(',').map(id => parseInt(id));
      const comparisonData = await storage.compareTalentStats(talentIds);
      
      // Get basic talent info for each ID
      const talentsPromises = talentIds.map(id => storage.getTalent(id));
      const talents = await Promise.all(talentsPromises);
      
      // Combine talent info with feature comparison data (using the same format as the old API)
      const result = {
        services: talents.filter(t => t !== undefined),
        features: comparisonData
      };
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to compare services" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Media files endpoints
  // لاسترجاع الوسائط بمعرف اللاعب/المدرب
  app.get("/api/media/talent/:id", async (req, res) => {
    try {
      const talentId = parseInt(req.params.id);
      
      if (isNaN(talentId)) {
        return res.status(400).json({ message: "معرف اللاعب/المدرب غير صحيح" });
      }
      
      console.log(`Fetching media files for talent ID ${talentId}`);
      
      const mediaFiles = await storage.getMediaFilesByTalent(talentId);
      res.json(mediaFiles);
    } catch (error) {
      console.error("Error fetching talent media files:", error);
      res.status(500).json({ message: "حدث خطأ أثناء جلب ملفات الوسائط" });
    }
  });

  // لاسترجاع الوسائط بمعرف المستخدم
  app.get("/api/media/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "معرف المستخدم غير صحيح" });
      }
      
      console.log(`Fetching media files for user ID ${userId}`);
      
      const mediaFiles = await storage.getMediaFiles(userId);
      res.json(mediaFiles);
    } catch (error) {
      console.error("Error fetching user media files:", error);
      res.status(500).json({ message: "حدث خطأ أثناء جلب ملفات الوسائط" });
    }
  });
  
  // للتوافقية مع الطلبات القديمة - استرجاع الوسائط بمعرف الخدمة
  app.get("/api/media", async (req, res) => {
    try {
      const serviceId = req.query.serviceId ? parseInt(req.query.serviceId as string) : null;
      
      if (!serviceId) {
        return res.status(400).json({ message: "معرف الخدمة مطلوب" });
      }
      
      console.log(`Fetching media files for talent ID ${serviceId}`);
      
      // For now, return from getAllMediaFiles if available, or construct sample data
      const mediaFiles = await storage.getMediaFilesByTalent(serviceId);
      
      // If no media files found, create sample data
      if (!mediaFiles || mediaFiles.length === 0) {
        // Create sample media files for a player or coach based on ID
        const talent = await storage.getTalent(serviceId);
        console.log(`No media files found. Talent data:`, talent);
        
        if (talent) {
          // Create a few sample media files
          const sampleFiles = [
            {
              id: 1,
              userId: 0,
              talentId: serviceId,
              type: "image",
              url: talent.imageUrl || "https://images.unsplash.com/photo-1571988840298-3b5301d5109b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              title: `صورة ${talent.name}`,
              description: `صورة لـ${talent.name} أثناء التدريب`,
              featured: true,
              createdAt: new Date()
            },
            {
              id: 2,
              userId: 0,
              talentId: serviceId,
              type: "video",
              url: talent.videoUrl || "https://www.example.com/sample-video.mp4",
              title: `فيديو أداء ${talent.name}`,
              description: `فيديو يوضح مهارات ${talent.name}`,
              featured: true,
              createdAt: new Date()
            },
            {
              id: 3,
              userId: 0,
              talentId: serviceId,
              type: "document",
              url: "https://www.example.com/sample-cv.pdf",
              title: `السيرة الذاتية - ${talent.name}`,
              description: `السيرة الذاتية الكاملة والخبرات لـ${talent.name}`,
              featured: false,
              createdAt: new Date()
            }
          ];
          
          return res.json(sampleFiles);
        }
      }
      
      res.json(mediaFiles);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب ملفات الوسائط" });
    }
  });
  
  // Testimonial details endpoint
  app.get("/api/testimonial", async (req, res) => {
    try {
      const serviceId = req.query.serviceId ? parseInt(req.query.serviceId as string) : null;
      
      if (!serviceId) {
        return res.status(400).json({ message: "معرف الخدمة مطلوب" });
      }
      
      const testimonials = await storage.getTestimonialsByTalent(serviceId);
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب التقييمات" });
    }
  });

  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  // Chat endpoints
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const MessageSchema = insertChatMessageSchema.extend({
        userId: z.number().optional().default(0) // Defaults to 0 for anonymous users
      });
      
      const validatedData = MessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      
      // If this is a user message, create an auto-response (simplified for demo)
      if (message.isFromUser) {
        const autoResponse = {
          userId: message.userId,
          talentId: message.talentId,
          clubId: message.clubId,
          agentId: message.agentId,
          doctorId: message.doctorId,
          message: "شكراً لتواصلك! سيقوم أحد مستشاري النادي بالرد على استفسارك قريباً. هل هناك أي معلومات محددة ترغب في معرفتها عن خدماتنا؟",
          isFromUser: false
        };
        await storage.createChatMessage(autoResponse);
      }
      
      // Return all messages for this user
      const messages = await storage.getChatMessages(message.userId || 0);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  
  // Clubs endpoints
  app.get("/api/clubs", async (req, res) => {
    try {
      const clubs = await storage.getClubs();
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clubs" });
    }
  });
  
  app.get("/api/clubs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const club = await storage.getClub(id);
      
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }
      
      res.json(club);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch club details" });
    }
  });
  
  // Doctors endpoints
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await storage.getDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors" });
    }
  });
  
  app.get("/api/doctors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const doctor = await storage.getDoctor(id);
      
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctor details" });
    }
  });
  
  // Agents endpoints
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });
  
  app.get("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const agent = await storage.getAgent(id);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent details" });
    }
  });
  
  // News endpoints
  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      let news;
      if (category) {
        news = await storage.getNewsByCategory(category);
      } else {
        news = await storage.getNews();
      }
      
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });
  
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsItem = await storage.getNewsById(id);
      
      if (!newsItem) {
        return res.status(404).json({ message: "News item not found" });
      }
      
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news details" });
    }
  });
  
  // Stadiums endpoints
  app.get("/api/stadiums", async (req, res) => {
    try {
      const stadiums = await storage.getStadiums();
      res.json(stadiums);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stadiums" });
    }
  });
  
  app.get("/api/stadiums/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const stadium = await storage.getStadium(id);
      
      if (!stadium) {
        return res.status(404).json({ message: "Stadium not found" });
      }
      
      res.json(stadium);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stadium details" });
    }
  });

  const httpServer = createServer(app);
  
  // Set up additional modules
  setupFileUpload(app);
  setupAppointments(app);
  setupVideoConference(app);
  
  // API endpoint لتوليد بيانات الفيديو الترويجي باستخدام OpenAI
  app.get("/api/signing-video", async (req: Request, res: Response) => {
    try {
      const cachedDataPath = path.join(process.cwd(), 'public', 'generated-images', 'cached-video-data.json');
      
      // التحقق من وجود بيانات مخزنة مسبقاً لتجنب استدعاء OpenAI في كل مرة
      if (fs.existsSync(cachedDataPath)) {
        try {
          const cachedData = JSON.parse(fs.readFileSync(cachedDataPath, 'utf8'));
          
          // التحقق من اكتمال البيانات المخزنة
          if (cachedData.images && cachedData.images.length >= 3 && 
              cachedData.captions && cachedData.captions.length >= 3) {
            console.log("Using cached signing video data");
            return res.json(cachedData);
          }
        } catch (error) {
          console.error("Error parsing cached data:", error);
          // إذا حدث خطأ في قراءة البيانات المخزنة، نتابع إنشاء بيانات جديدة
        }
      }
      
      console.log("Generating new signing video data using OpenAI...");
      
      // استدعاء خدمة OpenAI لتوليد البيانات
      const videoData = await generateSigningVideoData();
      
      // تخزين البيانات للاستخدام المستقبلي
      fs.writeFileSync(cachedDataPath, JSON.stringify(videoData, null, 2));
      
      res.json(videoData);
    } catch (error) {
      console.error("Error generating signing video data:", error);
      
      // إذا فشل التوليد، نعود بيانات افتراضية
      res.status(500).json({
        images: [
          "/generated-images/default_image_1.jpg",
          "/generated-images/default_image_2.jpg"
        ],
        captions: [
          "توقيع عقد جديد مع نادٍ كبير",
          "لحظة تاريخية في مسيرة اللاعب"
        ]
      });
    }
  });
  
  // Set up WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store active connections
  type Connection = {
    ws: WebSocket;
    userId?: number;
    talentId?: number;
    clubId?: number;
    agentId?: number;
    doctorId?: number;
    sessionId?: string;
  };
  
  const connections: Connection[] = [];
  
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    const connection: Connection = { ws };
    connections.push(connection);
    
    // Handle incoming messages
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Set connection metadata
        if (data.type === 'auth') {
          // Support guest users with userId = 0 or undefined
          connection.userId = data.userId || 0;
          connection.talentId = data.talentId;
          connection.clubId = data.clubId;
          connection.agentId = data.agentId;
          connection.doctorId = data.doctorId;
          console.log("WebSocket authenticated:", { 
            userId: connection.userId,
            role: data.role || 'visitor'
          });
          return;
        }
        
        // Handle WebRTC session joining
        if (data.type === 'join-session') {
          console.log(`User ${data.userId} joined video session ${data.sessionId}`);
          
          // Store session ID in connection for reference
          connection.sessionId = data.sessionId;
          
          // Notify other users in the same session
          connections.forEach(conn => {
            // Don't notify the user who joined
            if (conn !== connection && conn.sessionId === data.sessionId) {
              if (conn.ws.readyState === WebSocket.OPEN) {
                conn.ws.send(JSON.stringify({
                  type: 'user-joined',
                  userId: data.userId,
                  sessionId: data.sessionId
                }));
              }
            }
          });
          
          // Send list of current users in the session to the new user
          const sessionUsers = connections
            .filter(conn => conn.sessionId === data.sessionId && conn.userId !== data.userId)
            .map(conn => conn.userId);
          
          if (sessionUsers.length > 0 && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'session-users',
              users: sessionUsers,
              sessionId: data.sessionId
            }));
          }
          
          return;
        }
        
        // Handle WebRTC signaling
        if (data.type === 'signal') {
          console.log(`Relaying signal from user ${data.userId} to user ${data.receiverId}`);
          
          // Find the recipient connection
          const recipientConnection = connections.find(
            conn => conn.userId === data.receiverId && conn.sessionId === data.sessionId
          );
          
          if (recipientConnection && recipientConnection.ws.readyState === WebSocket.OPEN) {
            recipientConnection.ws.send(JSON.stringify({
              type: 'signal',
              userId: data.userId,
              signal: data.signal,
              sessionId: data.sessionId
            }));
          }
          
          return;
        }
        
        // Handle typing status updates
        if (data.type === 'typing') {
          // Broadcast typing status to relevant connections
          connections.forEach(conn => {
            if (
              // Match the recipient with connections
              (data.receiverId && conn.userId === data.receiverId) ||
              (data.receiverId && conn.talentId === data.receiverId) ||
              (data.receiverId && conn.clubId === data.receiverId) ||
              (data.receiverId && conn.agentId === data.receiverId) ||
              (data.receiverId && conn.doctorId === data.receiverId)
            ) {
              // Use WebSocket.OPEN constant
              if (conn.ws.readyState === WebSocket.OPEN) {
                conn.ws.send(JSON.stringify({
                  type: 'typing',
                  senderId: data.senderId || 0,
                  receiverId: data.receiverId,
                  isTyping: data.isTyping,
                  role: data.role || 'visitor'
                }));
              }
            }
          });
          return;
        }
        
        // Handle chat messages
        if (data.type === 'message') {
          const chatMessage = {
            userId: connection.userId,
            talentId: connection.talentId,
            clubId: connection.clubId,
            agentId: connection.agentId,
            doctorId: connection.doctorId,
            message: data.content,
            isFromUser: true
          };
          
          // Store message
          const savedMessage = await storage.createChatMessage(chatMessage);
          
          // Broadcast to relevant connections
          connections.forEach(conn => {
            if (
              (connection.userId && conn.userId === connection.userId) ||
              (connection.talentId && conn.talentId === connection.talentId) ||
              (connection.clubId && conn.clubId === connection.clubId) ||
              (connection.agentId && conn.agentId === connection.agentId) ||
              (connection.doctorId && conn.doctorId === connection.doctorId)
            ) {
              // Use WebSocket.OPEN constant explicitly
              if (conn.ws.readyState === WebSocket.OPEN) {
                conn.ws.send(JSON.stringify({
                  type: 'message',
                  id: savedMessage.id,
                  senderId: savedMessage.userId || 0,
                  receiverId: data.receiverId,
                  content: savedMessage.message,
                  timestamp: new Date(),
                  sender: {
                    id: savedMessage.userId || 0,
                    name: "أنت", // Will be replaced by actual user name in future
                    role: savedMessage.userId ? "user" : "system"
                  }
                }));
              }
            }
          });
          
          // Auto response
          setTimeout(async () => {
            const autoResponse = {
              userId: connection.userId,
              talentId: connection.talentId,
              clubId: connection.clubId,
              agentId: connection.agentId,
              doctorId: connection.doctorId,
              message: "شكراً لتواصلك! سيقوم أحد مستشاري النادي بالرد على استفسارك قريباً. هل هناك أي معلومات محددة ترغب في معرفتها عن خدماتنا؟",
              isFromUser: false
            };
            
            const savedResponse = await storage.createChatMessage(autoResponse);
            
            // Find receiver info based on the message data
            const receiverId = connection.userId || 0;
            const senderId = data.receiverId || 0;
            
            // Broadcast auto-response
            connections.forEach(conn => {
              if (
                (connection.userId && conn.userId === connection.userId) ||
                (connection.talentId && conn.talentId === connection.talentId) ||
                (connection.clubId && conn.clubId === connection.clubId) ||
                (connection.agentId && conn.agentId === connection.agentId) ||
                (connection.doctorId && conn.doctorId === connection.doctorId)
              ) {
                // Use WebSocket.OPEN constant explicitly
                if (conn.ws.readyState === WebSocket.OPEN) {
                  conn.ws.send(JSON.stringify({
                    type: 'message',
                    id: savedResponse.id,
                    senderId: senderId,
                    receiverId: receiverId,
                    content: savedResponse.message,
                    timestamp: new Date(),
                    sender: {
                      id: senderId,
                      name: data.receiverName || "النادي",
                      role: "club"
                    }
                  }));
                }
              }
            });
          }, 1000);
        }
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      const index = connections.findIndex(conn => conn.ws === ws);
      if (index !== -1) {
        const disconnectedConn = connections[index];
        
        // If this was a video session participant, notify others in the same session
        if (disconnectedConn.sessionId) {
          console.log(`User ${disconnectedConn.userId} left video session ${disconnectedConn.sessionId}`);
          
          // Notify other users in the same session
          connections.forEach(conn => {
            if (conn.sessionId === disconnectedConn.sessionId && conn.ws.readyState === WebSocket.OPEN) {
              conn.ws.send(JSON.stringify({
                type: 'user-left',
                userId: disconnectedConn.userId,
                sessionId: disconnectedConn.sessionId
              }));
            }
          });
        }
        
        connections.splice(index, 1);
        console.log('WebSocket connection closed');
      }
    });
  });
  
  return httpServer;
}
