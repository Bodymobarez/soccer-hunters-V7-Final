import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Export all types from this file
export * from "drizzle-orm/sqlite-core";

// Existing user schema
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(), // "user", "admin", "player", "coach", "agent", "doctor"
  email: text("email").notNull(),
  phone: text("phone"),
  fullName: text("full_name"),
  profileImage: text("profile_image"),
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  email: true,
  phone: true,
  fullName: true,
  profileImage: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories for football talent (players, coaches, etc.)
export const serviceCategories = sqliteTable("service_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(), // "لاعبين", "مدربين", "حراس مرمى", etc.
  description: text("description"),
});

export const insertServiceCategorySchema = createInsertSchema(serviceCategories).pick({
  name: true,
  description: true,
});

export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;
export type ServiceCategory = typeof serviceCategories.$inferSelect;

// Football talent profiles (renamed from services)
export const footballTalents = sqliteTable("football_talents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: integer("category_id").notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"), // Video highlights
  age: integer("age"),
  height: integer("height"), // In cm
  weight: integer("weight"), // In kg
  position: text("position"), // Primary position
  secondaryPosition: text("secondary_position"), // Secondary position
  foot: text("foot"), // "right", "left", "both"
  nationality: text("nationality"),
  currentClub: text("current_club"),
  experience: text("experience"), // Brief career history
  achievements: text("achievements"), // Notable achievements
  rating: real("rating"),
  reviewCount: integer("review_count"),
  salary: text("salary"), // Salary expectations
  transferFee: text("transfer_fee"), // Transfer fee expectations
  location: text("location"), // Current location
  availability: text("availability"), // Availability status
  isTopRated: integer("is_top_rated", { mode: "boolean" }).default(false),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  badge: text("badge"), // "نجم صاعد", "أفضل صفقة", "موهبة مميزة", etc.
});

export const insertFootballTalentSchema = createInsertSchema(footballTalents).pick({
  name: true,
  description: true,
  categoryId: true,
  imageUrl: true,
  videoUrl: true,
  age: true,
  height: true,
  weight: true,
  position: true,
  secondaryPosition: true,
  foot: true,
  nationality: true,
  currentClub: true,
  experience: true,
  achievements: true,
  rating: true,
  reviewCount: true,
  salary: true,
  transferFee: true,
  location: true,
  availability: true,
  isTopRated: true,
  isFeatured: true,
  badge: true,
});

export type InsertFootballTalent = z.infer<typeof insertFootballTalentSchema>;
export type FootballTalent = typeof footballTalents.$inferSelect;

// Contract details (renamed from pricing items)
export const contracts = sqliteTable("contracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  talentId: integer("talent_id").notNull(),
  type: text("type").notNull(), // "دائم", "إعارة", "تدريب", etc.
  duration: text("duration").notNull(), // Contract duration
  value: text("value").notNull(), // Contract value
  description: text("description"),
  additionalTerms: text("additional_terms"), // Additional contract terms
});

export const insertContractSchema = createInsertSchema(contracts).pick({
  talentId: true,
  type: true,
  duration: true,
  value: true,
  description: true,
  additionalTerms: true,
});

export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;

// Football skills and stats (renamed from features)
export const footballStats = sqliteTable("football_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  talentId: integer("talent_id").notNull(),
  statName: text("stat_name").notNull(), // "سرعة", "قوة تسديد", "تمرير", "مراوغة", etc.
  value: text("value").notNull(), // Rating out of 10 or specific stat value
});

export const insertFootballStatSchema = createInsertSchema(footballStats).pick({
  talentId: true,
  statName: true,
  value: true,
});

export type InsertFootballStat = z.infer<typeof insertFootballStatSchema>;
export type FootballStat = typeof footballStats.$inferSelect;

// Performance history
export const performances = sqliteTable("performances", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  talentId: integer("talent_id").notNull(),
  season: text("season").notNull(), // e.g., "2023-2024"
  team: text("team").notNull(),
  competition: text("competition"), // League or tournament
  matches: integer("matches"),
  goals: integer("goals"),
  assists: integer("assists"), 
  cleanSheets: integer("clean_sheets"), // For goalkeepers
  yellowCards: integer("yellow_cards"),
  redCards: integer("red_cards"),
  minutesPlayed: integer("minutes_played"),
});

export const insertPerformanceSchema = createInsertSchema(performances).pick({
  talentId: true,
  season: true,
  team: true,
  competition: true,
  matches: true,
  goals: true,
  assists: true,
  cleanSheets: true,
  yellowCards: true,
  redCards: true,
  minutesPlayed: true,
});

export type InsertPerformance = z.infer<typeof insertPerformanceSchema>;
export type Performance = typeof performances.$inferSelect;

// Testimonials schema (updated for football context)
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role"), // "مدرب", "مدير فني", "زميل سابق", etc. 
  clubOrOrganization: text("club_or_organization"),
  avatarUrl: text("avatar_url"),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  talentId: integer("talent_id"), // Which player/coach this is about
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  clubOrOrganization: true,
  avatarUrl: true,
  rating: true,
  content: true,
  talentId: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// FAQs schema (maintained, updated content)
export const faqs = sqliteTable("faqs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"), // To group FAQs by type: "عام", "تسجيل", "تعاقدات", etc.
  sortOrder: integer("sort_order"),
});

export const insertFaqSchema = createInsertSchema(faqs).pick({
  question: true,
  answer: true,
  category: true,
  sortOrder: true,
});

export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;

// Clubs schema for football clubs/teams
export const clubs = sqliteTable("clubs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  country: text("country").notNull(),
  city: text("city"),
  league: text("league"),
  foundedYear: integer("founded_year"),
  stadiumName: text("stadium_name"),
  stadiumCapacity: integer("stadium_capacity"),
  website: text("website"),
  description: text("description"),
  userId: integer("user_id").notNull(), // Link to the user who manages this club
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertClubSchema = createInsertSchema(clubs).pick({
  name: true,
  logoUrl: true,
  country: true,
  city: true,
  league: true,
  foundedYear: true,
  stadiumName: true,
  stadiumCapacity: true,
  website: true,
  description: true,
  userId: true,
});

export type InsertClub = z.infer<typeof insertClubSchema>;
export type Club = typeof clubs.$inferSelect;

// Sports doctors/medical specialists
export const doctors = sqliteTable("doctors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(), // e.g., "Orthopedic Surgeon", "Physiotherapist", etc.
  hospital: text("hospital"),
  clinic: text("clinic"),
  experience: text("experience"), // Years of experience or description
  qualifications: text("qualifications"), // Academic and professional qualifications
  imageUrl: text("image_url"),
  contact: text("contact"),
  bio: text("bio"),
  userId: integer("user_id").notNull(), // Link to the user who manages this profile
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertDoctorSchema = createInsertSchema(doctors).pick({
  name: true,
  specialization: true,
  hospital: true,
  clinic: true,
  experience: true,
  qualifications: true,
  imageUrl: true,
  contact: true,
  bio: true,
  userId: true,
});

export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type Doctor = typeof doctors.$inferSelect;

// Player agents
export const agents = sqliteTable("agents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  agency: text("agency"),
  licenseNumber: text("license_number"),
  experience: text("experience"),
  clients: text("clients"), // Notable clients or number of clients
  languages: text("languages"), // Languages spoken
  imageUrl: text("image_url"),
  contact: text("contact"),
  bio: text("bio"),
  userId: integer("user_id").notNull(), // Link to the user who manages this profile
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertAgentSchema = createInsertSchema(agents).pick({
  name: true,
  agency: true,
  licenseNumber: true,
  experience: true,
  clients: true,
  languages: true,
  imageUrl: true,
  contact: true,
  bio: true,
  userId: true,
});

export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;

// Football news
export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category"), // e.g., "Transfers", "Match Results", "Injuries", etc.
  tags: text("tags"),
  published: integer("published", { mode: "boolean" }).default(false),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  authorId: integer("author_id").notNull(), // User ID of the author
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  content: true,
  imageUrl: true,
  category: true,
  tags: true,
  published: true,
  authorId: true,
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Stadiums information
export const stadiums = sqliteTable("stadiums", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  capacity: integer("capacity"),
  yearBuilt: integer("year_built"),
  surfaceType: text("surface_type"), // e.g., "Natural Grass", "Artificial Turf"
  dimensions: text("dimensions"), // Field dimensions
  imageUrl: text("image_url"),
  description: text("description"),
  facilities: text("facilities"), // Available facilities
  homeClub: text("home_club"), // The club that uses this stadium as home
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertStadiumSchema = createInsertSchema(stadiums).pick({
  name: true,
  city: true,
  country: true,
  capacity: true,
  yearBuilt: true,
  surfaceType: true,
  dimensions: true,
  imageUrl: true,
  description: true,
  facilities: true,
  homeClub: true,
});

export type InsertStadium = z.infer<typeof insertStadiumSchema>;
export type Stadium = typeof stadiums.$inferSelect;

// Media uploads (photos, videos, CVs)
export const mediaFiles = sqliteTable("media_files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  talentId: integer("talent_id"), // Optional: related talent ID
  fileType: text("file_type").notNull(), // "image", "video", "document"
  fileUrl: text("file_url").notNull(),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  description: text("description"),
  isPublic: integer("is_public", { mode: "boolean" }).default(true),
  uploadedAt: integer("uploaded_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).pick({
  userId: true,
  talentId: true,
  fileType: true,
  fileUrl: true,
  fileName: true,
  fileSize: true,
  description: true,
  isPublic: true,
});

export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
export type MediaFile = typeof mediaFiles.$inferSelect;

// Chat messages schema (maintained)
export const chatMessages = sqliteTable("chat_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id"),
  talentId: integer("talent_id"), // Optional: which talent this chat is about
  clubId: integer("club_id"), // Optional: which club this chat is about
  agentId: integer("agent_id"), // Optional: which agent this chat is about
  doctorId: integer("doctor_id"), // Optional: which doctor this chat is about
  message: text("message").notNull(),
  isFromUser: integer("is_from_user", { mode: "boolean" }).notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  userId: true,
  talentId: true,
  clubId: true,
  agentId: true,
  doctorId: true,
  message: true,
  isFromUser: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Appointments and scheduling schema
export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  createdBy: integer("created_by").notNull(), // User ID who created the appointment
  talentId: integer("talent_id"), // For player/coach appointments
  clubId: integer("club_id"), // For club appointments
  agentId: integer("agent_id"), // For agent appointments
  doctorId: integer("doctor_id"), // For doctor appointments
  attendees: text("attendees").default('[]'), // JSON string of user IDs
  isVideoMeeting: integer("is_video_meeting", { mode: "boolean" }).default(false),
  meetingLink: text("meeting_link"), // Video meeting link
  status: text("status").default("pending"), // "pending", "confirmed", "cancelled", "completed"
  location: text("location"), // Physical location (if not a video meeting)
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  title: true,
  description: true,
  startDate: true,
  endDate: true,
  createdBy: true,
  talentId: true,
  clubId: true,
  agentId: true,
  doctorId: true,
  attendees: true,
  isVideoMeeting: true,
  meetingLink: true,
  status: true,
  location: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Video call sessions
export const videoSessions = sqliteTable("video_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  appointmentId: integer("appointment_id"),
  sessionId: text("session_id").notNull().unique(), // Unique session identifier
  hostId: integer("host_id").notNull(), // User ID of the host
  participants: text("participants").default('[]'), // JSON string of user IDs
  startTime: integer("start_time", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  endTime: integer("end_time", { mode: "timestamp" }),
  status: text("status").default("scheduled"), // "scheduled", "active", "completed", "cancelled"
  recordingUrl: text("recording_url"), // URL to recording (if available)
  notes: text("notes"), // Session notes
});

export const insertVideoSessionSchema = createInsertSchema(videoSessions).pick({
  appointmentId: true,
  sessionId: true,
  hostId: true,
  participants: true,
  startTime: true,
  endTime: true,
  status: true,
  recordingUrl: true,
  notes: true,
});

export type InsertVideoSession = z.infer<typeof insertVideoSessionSchema>;
export type VideoSession = typeof videoSessions.$inferSelect;
