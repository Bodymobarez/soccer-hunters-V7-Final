import {
  users, type User, type InsertUser,
  serviceCategories, type ServiceCategory, type InsertServiceCategory,
  footballTalents, type FootballTalent, type InsertFootballTalent,
  contracts, type Contract, type InsertContract,
  footballStats, type FootballStat, type InsertFootballStat,
  performances, type Performance, type InsertPerformance,
  testimonials, type Testimonial, type InsertTestimonial,
  faqs, type Faq, type InsertFaq,
  chatMessages, type ChatMessage, type InsertChatMessage,
  clubs, type Club, type InsertClub,
  doctors, type Doctor, type InsertDoctor,
  agents, type Agent, type InsertAgent,
  news, type News, type InsertNews,
  stadiums, type Stadium, type InsertStadium,
  mediaFiles, type MediaFile, type InsertMediaFile,
  appointments, type Appointment, type InsertAppointment,
  videoSessions, type VideoSession, type InsertVideoSession
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUsers(): Promise<Map<number, User>>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Category operations
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServiceCategory(id: number): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;

  // Football talent operations
  getTalents(): Promise<FootballTalent[]>;
  getTalentsByCategory(categoryId: number): Promise<FootballTalent[]>;
  getTalent(id: number): Promise<FootballTalent | undefined>;
  createTalent(talent: InsertFootballTalent): Promise<FootballTalent>;
  getFeaturedTalents(): Promise<FootballTalent[]>;
  searchTalents(query: string): Promise<FootballTalent[]>;

  // Contract operations
  getContracts(talentId: number): Promise<Contract[]>;
  createContract(contract: InsertContract): Promise<Contract>;

  // Football stats operations
  getFootballStats(talentId: number): Promise<FootballStat[]>;
  createFootballStat(stat: InsertFootballStat): Promise<FootballStat>;
  compareTalentStats(talentIds: number[]): Promise<Record<string, Record<number, string>>>;

  // Performance operations
  getPerformances(talentId: number): Promise<Performance[]>;
  createPerformance(performance: InsertPerformance): Promise<Performance>;

  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByTalent(talentId: number): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // FAQ operations
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;

  // Club operations
  getClubs(): Promise<Club[]>;
  getClub(id: number): Promise<Club | undefined>;
  getClubByUserId(userId: number): Promise<Club | undefined>;
  createClub(club: InsertClub): Promise<Club>;
  
  // Doctor operations
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: number): Promise<Doctor | undefined>;
  getDoctorByUserId(userId: number): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  // Agent operations
  getAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  getAgentByUserId(userId: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  // News operations
  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  getNewsByCategory(category: string): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  
  // Stadium operations
  getStadiums(): Promise<Stadium[]>;
  getStadium(id: number): Promise<Stadium | undefined>;
  createStadium(stadium: InsertStadium): Promise<Stadium>;
  
  // Media operations
  getMediaFiles(userId: number): Promise<MediaFile[]>;
  getMediaFilesByTalent(talentId: number): Promise<MediaFile[]>;
  createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile>;

  // Chat operations
  getChatMessages(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Appointment operations
  getAppointments(): Promise<Appointment[]>;
  getUserAppointments(userId: number): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment>;
  deleteAppointment(id: number): Promise<void>;
  addAppointmentAttendee(id: number, userId: number): Promise<Appointment>;
  updateAppointmentMeeting(id: number, meetingData: { meetingLink: string, isVideoMeeting?: boolean }): Promise<Appointment>;

  // Video session operations
  getVideoSessions(): Promise<VideoSession[]>;
  getVideoSession(id: number): Promise<VideoSession | undefined>;
  getVideoSessionBySessionId(sessionId: string): Promise<VideoSession | undefined>;
  createVideoSession(videoSession: InsertVideoSession): Promise<VideoSession>;
  updateVideoSessionStatus(id: number, status: string): Promise<VideoSession>;
  updateVideoSessionParticipants(id: number, participants: string): Promise<VideoSession>;
  updateVideoSessionRecording(id: number, recordingUrl: string): Promise<VideoSession>;
  endVideoSession(id: number, endTime?: Date): Promise<VideoSession>;
  isSessionHost(sessionId: number, userId: number): Promise<boolean>;
  isSessionAttendee(sessionId: number, userId: number): Promise<boolean>;
}

const simpleHash = (password: string): string => {
  return `${password}.salt123`; // بسيط للغاية ولكنه يعمل للتجربة
};

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private serviceCategories: Map<number, ServiceCategory>;
  private footballTalents: Map<number, FootballTalent>;
  private contracts: Map<number, Contract>;
  private footballStats: Map<number, FootballStat>;
  private performances: Map<number, Performance>;
  private testimonials: Map<number, Testimonial>;
  private faqs: Map<number, Faq>;
  private chatMessages: Map<number, ChatMessage>;
  private clubs: Map<number, Club>;
  private doctors: Map<number, Doctor>;
  private agents: Map<number, Agent>;
  private news: Map<number, News>;
  private stadiums: Map<number, Stadium>;
  private mediaFiles: Map<number, MediaFile>;
  private appointments: Map<number, Appointment>;
  private videoSessions: Map<number, VideoSession>;

  private userIdCounter: number;
  private categoryIdCounter: number;
  private talentIdCounter: number;
  private contractIdCounter: number;
  private statIdCounter: number;
  private performanceIdCounter: number;
  private testimonialIdCounter: number;
  private faqIdCounter: number;
  private chatMessageIdCounter: number;
  private clubIdCounter: number;
  private doctorIdCounter: number;
  private agentIdCounter: number;
  private newsIdCounter: number;
  private stadiumIdCounter: number;
  private mediaFileIdCounter: number;
  private appointmentIdCounter: number;
  private videoSessionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.serviceCategories = new Map();
    this.footballTalents = new Map();
    this.contracts = new Map();
    this.footballStats = new Map();
    this.performances = new Map();
    this.testimonials = new Map();
    this.faqs = new Map();
    this.chatMessages = new Map();
    this.clubs = new Map();
    this.doctors = new Map();
    this.agents = new Map();
    this.news = new Map();
    this.stadiums = new Map();
    this.mediaFiles = new Map();
    this.appointments = new Map();
    this.videoSessions = new Map();

    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.talentIdCounter = 1;
    this.contractIdCounter = 1;
    this.statIdCounter = 1;
    this.performanceIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.faqIdCounter = 1;
    this.chatMessageIdCounter = 1;
    this.clubIdCounter = 1;
    this.doctorIdCounter = 1;
    this.agentIdCounter = 1;
    this.newsIdCounter = 1;
    this.stadiumIdCounter = 1;
    this.mediaFileIdCounter = 1;
    this.appointmentIdCounter = 1;
    this.videoSessionIdCounter = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUsers(): Promise<Map<number, User>> {
    return this.users;
  }
  
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role ?? "user",
      email: insertUser.email ?? "",
      phone: insertUser.phone ?? null,
      fullName: insertUser.fullName ?? null,
      profileImage: insertUser.profileImage ?? null,
      verified: false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Service Category operations
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return Array.from(this.serviceCategories.values());
  }

  async getServiceCategory(id: number): Promise<ServiceCategory | undefined> {
    return this.serviceCategories.get(id);
  }

  async createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory> {
    const id = this.categoryIdCounter++;
    const newCategory: ServiceCategory = { 
      ...category, 
      id,
      description: category.description ?? null
    };
    this.serviceCategories.set(id, newCategory);
    return newCategory;
  }

  // Football talent operations
  async getTalents(): Promise<FootballTalent[]> {
    return Array.from(this.footballTalents.values());
  }

  async getTalentsByCategory(categoryId: number): Promise<FootballTalent[]> {
    return Array.from(this.footballTalents.values()).filter(
      (talent) => talent.categoryId === categoryId
    );
  }

  async getTalent(id: number): Promise<FootballTalent | undefined> {
    return this.footballTalents.get(id);
  }

  async createTalent(talent: InsertFootballTalent): Promise<FootballTalent> {
    const id = this.talentIdCounter++;
    const newTalent: FootballTalent = { 
      ...talent, 
      id,
      description: talent.description ?? null,
      videoUrl: talent.videoUrl ?? null,
      age: talent.age ?? null,
      height: talent.height ?? null,
      weight: talent.weight ?? null,
      position: talent.position ?? null,
      secondaryPosition: talent.secondaryPosition ?? null,
      foot: talent.foot ?? null,
      nationality: talent.nationality ?? null,
      currentClub: talent.currentClub ?? null,
      experience: talent.experience ?? null,
      achievements: talent.achievements ?? null,
      rating: talent.rating ?? null,
      reviewCount: talent.reviewCount ?? null,
      salary: talent.salary ?? null,
      transferFee: talent.transferFee ?? null,
      location: talent.location ?? null,
      availability: talent.availability ?? null,
      imageUrl: talent.imageUrl ?? null,
      isTopRated: talent.isTopRated ?? false,
      isFeatured: talent.isFeatured ?? false,
      badge: talent.badge ?? null
    };
    this.footballTalents.set(id, newTalent);
    return newTalent;
  }

  async getFeaturedTalents(): Promise<FootballTalent[]> {
    return Array.from(this.footballTalents.values()).filter(
      (talent) => talent.isFeatured
    );
  }

  async searchTalents(query: string): Promise<FootballTalent[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.footballTalents.values()).filter(
      (talent) => 
        talent.name.toLowerCase().includes(lowercaseQuery) ||
        (talent.description && talent.description.toLowerCase().includes(lowercaseQuery)) ||
        (talent.position && talent.position.toLowerCase().includes(lowercaseQuery)) ||
        (talent.nationality && talent.nationality.toLowerCase().includes(lowercaseQuery)) ||
        (talent.currentClub && talent.currentClub.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Contract operations
  async getContracts(talentId: number): Promise<Contract[]> {
    return Array.from(this.contracts.values()).filter(
      (contract) => contract.talentId === talentId
    );
  }

  async createContract(contract: InsertContract): Promise<Contract> {
    const id = this.contractIdCounter++;
    const newContract: Contract = { 
      ...contract, 
      id,
      description: contract.description ?? null,
      additionalTerms: contract.additionalTerms ?? null
    };
    this.contracts.set(id, newContract);
    return newContract;
  }

  // Football stats operations
  async getFootballStats(talentId: number): Promise<FootballStat[]> {
    return Array.from(this.footballStats.values()).filter(
      (stat) => stat.talentId === talentId
    );
  }

  async createFootballStat(stat: InsertFootballStat): Promise<FootballStat> {
    const id = this.statIdCounter++;
    const newStat: FootballStat = { ...stat, id };
    this.footballStats.set(id, newStat);
    return newStat;
  }

  async compareTalentStats(talentIds: number[]): Promise<Record<string, Record<number, string>>> {
    const result: Record<string, Record<number, string>> = {};
    
    // Get all stats for the requested talents
    const allStats = Array.from(this.footballStats.values()).filter(
      (stat) => talentIds.includes(stat.talentId)
    );

    // Group stats by stat name
    allStats.forEach(stat => {
      if (!result[stat.statName]) {
        result[stat.statName] = {};
      }
      result[stat.statName][stat.talentId] = stat.value;
    });

    return result;
  }

  // Performance operations
  async getPerformances(talentId: number): Promise<Performance[]> {
    return Array.from(this.performances.values()).filter(
      (performance) => performance.talentId === talentId
    );
  }

  async createPerformance(performance: InsertPerformance): Promise<Performance> {
    const id = this.performanceIdCounter++;
    const newPerformance: Performance = { 
      ...performance, 
      id,
      competition: performance.competition ?? null,
      matches: performance.matches ?? null,
      goals: performance.goals ?? null,
      assists: performance.assists ?? null,
      cleanSheets: performance.cleanSheets ?? null,
      yellowCards: performance.yellowCards ?? null,
      redCards: performance.redCards ?? null,
      minutesPlayed: performance.minutesPlayed ?? null
    };
    this.performances.set(id, newPerformance);
    return newPerformance;
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialsByTalent(talentId: number): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      (testimonial) => testimonial.talentId === talentId
    );
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      role: testimonial.role ?? null,
      clubOrOrganization: testimonial.clubOrOrganization ?? null,
      avatarUrl: testimonial.avatarUrl ?? null,
      talentId: testimonial.talentId ?? null
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // FAQ operations
  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values())
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const id = this.faqIdCounter++;
    const newFaq: Faq = { 
      ...faq, 
      id,
      category: faq.category ?? null,
      sortOrder: faq.sortOrder ?? null
    };
    this.faqs.set(id, newFaq);
    return newFaq;
  }

  // Club operations
  async getClubs(): Promise<Club[]> {
    return Array.from(this.clubs.values());
  }

  async getClub(id: number): Promise<Club | undefined> {
    return this.clubs.get(id);
  }

  async getClubByUserId(userId: number): Promise<Club | undefined> {
    return Array.from(this.clubs.values()).find(
      (club) => club.userId === userId
    );
  }

  async createClub(club: InsertClub): Promise<Club> {
    const id = this.clubIdCounter++;
    const newClub: Club = {
      ...club,
      id,
      logoUrl: club.logoUrl ?? null,
      city: club.city ?? null,
      league: club.league ?? null,
      foundedYear: club.foundedYear ?? null,
      stadiumName: club.stadiumName ?? null,
      stadiumCapacity: club.stadiumCapacity ?? null,
      website: club.website ?? null,
      description: club.description ?? null,
      verified: false,
      createdAt: new Date()
    };
    this.clubs.set(id, newClub);
    return newClub;
  }

  // Doctor operations
  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctor(id: number): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getDoctorByUserId(userId: number): Promise<Doctor | undefined> {
    return Array.from(this.doctors.values()).find(
      (doctor) => doctor.userId === userId
    );
  }

  async createDoctor(doctor: InsertDoctor): Promise<Doctor> {
    const id = this.doctorIdCounter++;
    const newDoctor: Doctor = {
      ...doctor,
      id,
      hospital: doctor.hospital ?? null,
      clinic: doctor.clinic ?? null,
      experience: doctor.experience ?? null,
      qualifications: doctor.qualifications ?? null,
      imageUrl: doctor.imageUrl ?? null,
      contact: doctor.contact ?? null,
      bio: doctor.bio ?? null,
      verified: false,
      createdAt: new Date()
    };
    this.doctors.set(id, newDoctor);
    return newDoctor;
  }

  // Agent operations
  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async getAgentByUserId(userId: number): Promise<Agent | undefined> {
    return Array.from(this.agents.values()).find(
      (agent) => agent.userId === userId
    );
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.agentIdCounter++;
    const newAgent: Agent = {
      ...agent,
      id,
      agency: agent.agency ?? null,
      licenseNumber: agent.licenseNumber ?? null,
      experience: agent.experience ?? null,
      clients: agent.clients ?? null,
      languages: agent.languages ?? null,
      imageUrl: agent.imageUrl ?? null,
      contact: agent.contact ?? null,
      bio: agent.bio ?? null,
      verified: false,
      createdAt: new Date()
    };
    this.agents.set(id, newAgent);
    return newAgent;
  }

  // News operations
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getNewsByCategory(category: string): Promise<News[]> {
    return Array.from(this.news.values()).filter(
      (newsItem) => newsItem.category === category
    );
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.newsIdCounter++;
    const newNews: News = {
      ...newsItem,
      id,
      imageUrl: newsItem.imageUrl ?? null,
      category: newsItem.category ?? null,
      tags: newsItem.tags ?? null,
      published: newsItem.published ?? false,
      publishedAt: newsItem.published ? new Date() : null,
      createdAt: new Date()
    };
    this.news.set(id, newNews);
    return newNews;
  }

  // Stadium operations
  async getStadiums(): Promise<Stadium[]> {
    return Array.from(this.stadiums.values());
  }

  async getStadium(id: number): Promise<Stadium | undefined> {
    return this.stadiums.get(id);
  }

  async createStadium(stadium: InsertStadium): Promise<Stadium> {
    const id = this.stadiumIdCounter++;
    const newStadium: Stadium = {
      ...stadium,
      id,
      capacity: stadium.capacity ?? null,
      yearBuilt: stadium.yearBuilt ?? null,
      surfaceType: stadium.surfaceType ?? null,
      dimensions: stadium.dimensions ?? null,
      imageUrl: stadium.imageUrl ?? null,
      description: stadium.description ?? null,
      facilities: stadium.facilities ?? null,
      homeClub: stadium.homeClub ?? null,
      createdAt: new Date()
    };
    this.stadiums.set(id, newStadium);
    return newStadium;
  }

  // Media operations
  async getMediaFiles(userId: number): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values()).filter(
      (file) => file.userId === userId
    );
  }

  async getMediaFilesByTalent(talentId: number): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values()).filter(
      (file) => file.talentId === talentId
    );
  }

  async getMediaFileById(id: number): Promise<MediaFile | undefined> {
    return this.mediaFiles.get(id);
  }

  async createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile> {
    const id = this.mediaFileIdCounter++;
    const newMediaFile: MediaFile = {
      ...mediaFile,
      id,
      talentId: mediaFile.talentId ?? null,
      fileName: mediaFile.fileName ?? null,
      fileSize: mediaFile.fileSize ?? null,
      description: mediaFile.description ?? null,
      isPublic: mediaFile.isPublic ?? true,
      uploadedAt: new Date()
    };
    this.mediaFiles.set(id, newMediaFile);
    return newMediaFile;
  }
  
  async deleteMediaFile(id: number): Promise<void> {
    this.mediaFiles.delete(id);
  }

  // Chat operations
  async getChatMessages(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => {
        const aTime = a.timestamp ? a.timestamp.getTime() : 0;
        const bTime = b.timestamp ? b.timestamp.getTime() : 0;
        return aTime - bTime;
      });
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageIdCounter++;
    const newMessage: ChatMessage = { 
      ...message, 
      id, 
      timestamp: new Date(),
      userId: message.userId ?? null,
      talentId: message.talentId ?? null,
      clubId: message.clubId ?? null,
      agentId: message.agentId ?? null,
      doctorId: message.doctorId ?? null
    };
    this.chatMessages.set(id, newMessage);
    return newMessage;
  }

  // Appointment operations
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getUserAppointments(userId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => 
        appointment.createdBy === userId || 
        appointment.hostId === userId || 
        (appointment.attendees && appointment.attendees.includes(userId))
    );
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentIdCounter++;
    const newAppointment: Appointment = {
      ...appointment,
      id,
      status: appointment.status ?? "scheduled",
      title: appointment.title ?? "",
      description: appointment.description ?? null,
      location: appointment.location ?? null,
      meetingLink: appointment.meetingLink ?? null,
      isVideoMeeting: appointment.isVideoMeeting ?? false,
      attendees: appointment.attendees ?? [],
      createdAt: new Date()
    };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
    const appointment = await this.getAppointment(id);
    if (!appointment) {
      throw new Error("الموعد غير موجود");
    }

    const updatedAppointment: Appointment = {
      ...appointment,
      status
    };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async deleteAppointment(id: number): Promise<void> {
    this.appointments.delete(id);
  }

  async addAppointmentAttendee(id: number, userId: number): Promise<Appointment> {
    const appointment = await this.getAppointment(id);
    if (!appointment) {
      throw new Error("الموعد غير موجود");
    }

    const attendees = [...(appointment.attendees || [])];
    if (!attendees.includes(userId)) {
      attendees.push(userId);
    }

    const updatedAppointment: Appointment = {
      ...appointment,
      attendees
    };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async updateAppointmentMeeting(id: number, meetingData: { meetingLink: string, isVideoMeeting?: boolean }): Promise<Appointment> {
    const appointment = await this.getAppointment(id);
    if (!appointment) {
      throw new Error("الموعد غير موجود");
    }

    const updatedAppointment: Appointment = {
      ...appointment,
      meetingLink: meetingData.meetingLink,
      isVideoMeeting: meetingData.isVideoMeeting ?? appointment.isVideoMeeting
    };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  // Video session operations
  async getVideoSession(id: number): Promise<VideoSession | undefined> {
    return this.videoSessions.get(id);
  }

  async getVideoSessionBySessionId(sessionId: string): Promise<VideoSession | undefined> {
    return Array.from(this.videoSessions.values()).find(
      session => session.sessionId === sessionId
    );
  }

  async createVideoSession(session: InsertVideoSession): Promise<VideoSession> {
    const id = this.videoSessionIdCounter++;
    const newSession: VideoSession = {
      ...session,
      id,
      status: session.status ?? "scheduled",
      description: session.description ?? null,
      appointmentId: session.appointmentId ?? null,
      attendees: session.attendees ?? [],
      actualStartTime: null,
      actualEndTime: null,
      createdAt: new Date()
    };
    this.videoSessions.set(id, newSession);
    return newSession;
  }

  async updateVideoSessionStatus(id: number, status: string): Promise<VideoSession> {
    const session = await this.getVideoSession(id);
    if (!session) {
      throw new Error("جلسة الفيديو غير موجودة");
    }

    // If status changed to active and actual start time is not set, set it now
    let actualStartTime = session.actualStartTime;
    if (status === "active" && !actualStartTime) {
      actualStartTime = new Date();
    }

    const updatedSession: VideoSession = {
      ...session,
      status,
      actualStartTime
    };
    this.videoSessions.set(id, updatedSession);
    return updatedSession;
  }

  async endVideoSession(id: number, endTime: Date = new Date()): Promise<VideoSession> {
    const session = await this.getVideoSession(id);
    if (!session) {
      throw new Error("جلسة الفيديو غير موجودة");
    }

    const updatedSession: VideoSession = {
      ...session,
      status: "completed",
      actualEndTime: endTime
    };
    this.videoSessions.set(id, updatedSession);
    return updatedSession;
  }
  
  async getVideoSessions(): Promise<VideoSession[]> {
    return Array.from(this.videoSessions.values());
  }
  
  async updateVideoSessionParticipants(id: number, participants: string): Promise<VideoSession> {
    const session = await this.getVideoSession(id);
    if (!session) {
      throw new Error("جلسة الفيديو غير موجودة");
    }
    
    const updatedSession: VideoSession = {
      ...session,
      participants
    };
    this.videoSessions.set(id, updatedSession);
    return updatedSession;
  }
  
  async updateVideoSessionRecording(id: number, recordingUrl: string): Promise<VideoSession> {
    const session = await this.getVideoSession(id);
    if (!session) {
      throw new Error("جلسة الفيديو غير موجودة");
    }
    
    const updatedSession: VideoSession = {
      ...session,
      recordingUrl
    };
    this.videoSessions.set(id, updatedSession);
    return updatedSession;
  }
  
  async isSessionHost(sessionId: number, userId: number): Promise<boolean> {
    const session = await this.getVideoSession(sessionId);
    if (!session) {
      return false;
    }
    return session.hostId === userId;
  }
  
  async isSessionAttendee(sessionId: number, userId: number): Promise<boolean> {
    const session = await this.getVideoSession(sessionId);
    if (!session) {
      return false;
    }
    
    // Check if user is the host
    if (session.hostId === userId) {
      return true;
    }
    
    // Check if user is a participant
    let participants = [];
    try {
      participants = JSON.parse(session.participants as string);
    } catch (e) {
      console.error('Error parsing participants:', e);
    }
    
    return Array.isArray(participants) && participants.includes(userId);
  }

  // Initialize with sample data
  private initializeData() {
    // Add football talent categories
    const categories = [
      { name: "لاعبين", description: "لاعبين كرة قدم محترفين وناشئين" },
      { name: "مدربين", description: "مدربين كرة قدم في مختلف التخصصات" },
      { name: "حراس مرمى", description: "حراس مرمى محترفين وناشئين" },
      { name: "مدربي لياقة", description: "مدربي لياقة بدنية متخصصين في كرة القدم" },
      { name: "مدربي حراس", description: "مدربين متخصصين في تدريب حراس المرمى" }
    ];

    categories.forEach(cat => {
      this.createServiceCategory(cat);
    });

    // Add football talents
    const talentsData = [
      {
        name: "محمد عبدالله",
        description: "لاعب وسط مهاجم موهوب بمهارات عالية في المراوغة والتسديد",
        categoryId: 1,
        imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        videoUrl: "https://example.com/video/mohamed_abdullah.mp4",
        age: 24,
        height: 178,
        weight: 73,
        position: "وسط مهاجم",
        secondaryPosition: "جناح أيمن",
        foot: "يسرى",
        nationality: "مصر",
        currentClub: "النادي الأهلي الشرقي",
        experience: "5 سنوات كمحترف، بدأ مسيرته مع فريق الشباب وتدرج للفريق الأول",
        achievements: "هداف الدوري موسم 2022، أفضل لاعب شاب 2021",
        rating: 4.8,
        reviewCount: 42,
        salary: "$10,000-15,000 شهرياً",
        transferFee: "$2.5 مليون",
        location: "القاهرة، مصر",
        availability: "متاح للانتقال في الموسم القادم",
        isTopRated: true,
        specialization: "وسط مهاجم",
      },
      {
        name: "علي المحمدي",
        description: "مهاجم متميز بقدرته على التسجيل في المباريات الكبيرة",
        categoryId: 1,
        imageUrl: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        videoUrl: "https://example.com/video/ali_mohammadi.mp4",
        age: 26,
        height: 183,
        weight: 78,
        position: "مهاجم",
        secondaryPosition: "رأس حربة",
        foot: "يمنى",
        nationality: "السعودية",
        currentClub: "نادي النصر",
        experience: "7 سنوات في الدوري السعودي، لعب 3 مواسم مع نادي الهلال",
        achievements: "هداف الدوري السعودي 2023، فائز بكأس الخليج 2022",
        rating: 4.9,
        reviewCount: 55,
        salary: "$20,000-25,000 شهرياً",
        transferFee: "$3.5 مليون",
        location: "الرياض، السعودية",
        availability: "متاح للانتقال",
        isTopRated: true,
        isFeatured: true,
        badge: "هداف الدوري",
        specialization: "مهاجم"
      },
      {
        name: "خالد النمر",
        description: "مدرب محترف حاصل على شهادات تدريب دولية مع خبرة 15 عام",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1553005746-5d30f7523713?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        videoUrl: "https://example.com/video/khaled_elnemer.mp4",
        age: 48,
        height: 183,
        weight: 82,
        position: "مدير فني",
        secondaryPosition: "مدير فني",
        specialization: "مدير فني",
        nationality: "المملكة العربية السعودية",
        currentClub: "نادي الاتحاد الرياضي",
        experience: "15 سنة خبرة في التدريب، عمل مع 4 أندية مختلفة",
        achievements: "بطل الدوري مرتين، كأس الخليج مرة واحدة",
        rating: 4.9,
        reviewCount: 68,
        salary: "$25,000-30,000 شهرياً",
        transferFee: "تفاوض",
        location: "جدة، السعودية",
        availability: "غير متاح حالياً، متاح نهاية الموسم",
        isTopRated: true,
        isFeatured: true,
        badge: "مدرب النخبة"
      },
      {
        name: "سعيد الكعبي",
        description: "حارس مرمى بطول مناسب وردود فعل سريعة، متميز في التصدي للكرات العالية",
        categoryId: 3,
        imageUrl: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        videoUrl: "https://example.com/video/saeed_alkaabi.mp4",
        age: 26,
        height: 192,
        weight: 87,
        position: "حارس مرمى",
        foot: "يمنى",
        nationality: "الإمارات",
        currentClub: "نادي الوصل",
        experience: "8 سنوات مع الفريق الأول، تدرج من فرق الناشئين",
        achievements: "أفضل حارس في الدوري 2023، 10 مباريات نظيفة الموسم الماضي",
        rating: 4.7,
        reviewCount: 35,
        salary: "$18,000-22,000 شهرياً",
        transferFee: "$1.8 مليون",
        location: "دبي، الإمارات",
        availability: "متاح للإعارة",
        isTopRated: true,
        isFeatured: true,
        badge: "الحارس الذهبي"
      },
      {
        name: "عصام الحضري",
        description: "مدرب حراس مرمى محترف وحارس مرمى سابق للمنتخب المصري والأهلي، معروف بلقب السد العالي. يعتبر عصام من أعظم حراس المرمى في تاريخ مصر وأفريقيا، ويمتلك سجلاً حافلاً من الإنجازات والأرقام القياسية. يتميز بأسلوب تدريبي فريد يركز على الجوانب الذهنية والفنية لحراس المرمى.",
        categoryId: 5,
        imageUrl: "/images/essam-el-hadary.jpg",
        videoUrl: "/videos/essam-el-hadary-training.mp4",
        age: 50,
        height: 190,
        weight: 85,
        position: "مدرب حراس مرمى",
        secondaryPosition: "حارس مرمى سابق",
        specialization: "مدرب حراس",
        nationality: "مصر",
        currentClub: "منتخب مصر الأولمبي",
        experience: "30 عاماً كحارس مرمى محترف وخبرة في تدريب حراس المرمى. لعب لأندية دمياط، الأهلي، الزمالك، المصري، الإسماعيلي، وحرس مرمى منتخب مصر لأكثر من 20 عاماً",
        achievements: "أربع بطولات كأس أمم أفريقيا مع منتخب مصر أعوام 2006، 2008، 2010 و 2017\nبطولات الدوري المصري مع الأهلي\nدوري أبطال أفريقيا مع الأهلي\nأكبر لاعب يشارك في كأس العالم 2018 بعمر 45 عاماً\nلقب أفضل حارس مرمى في أفريقيا عدة مرات\nلقب أفضل حارس مرمى في كأس الأمم الأفريقية 4 مرات",
        previousTeams: "الأهلي (1996-2008)\nالزمالك (2014-2015)\nالمصري (2013-2014)\nالإسماعيلي (2015-2016)\nالنجوم السعودي (2017)\nالاتحاد السكندري (2018-2019)",
        education: "شهادة تدريب حراس مرمى من الاتحاد الدولي لكرة القدم (FIFA)\nشهادة تدريب متقدمة من الاتحاد الأفريقي لكرة القدم",
        licenses: "رخصة تدريب من الاتحاد المصري لكرة القدم\nرخصة تدريب دولية من الفيفا",
        skills: "خبرة طويلة في تدريب حراس المرمى\nفهم عميق لتكتيكات وفنيات حراسة المرمى\nمهارات قيادية عالية\nقدرة على تطوير مواهب الحراس الشباب\nمهارات تحليلية قوية",
        rating: 4.9,
        reviewCount: 120,
        salary: "$30,000-40,000 شهرياً",
        transferFee: "تفاوض",
        location: "القاهرة، مصر",
        availability: "متاح للتعاقد",
        isTopRated: true,
        isFeatured: true,
        badge: "السد العالي"
      }
    ];

    talentsData.forEach(talent => {
      this.createTalent(talent);
    });

    // Add contract options for talents
    const contractsData = [
      // محمد عبدالله
      { talentId: 1, type: "دائم", duration: "4 سنوات", value: "$2.5 مليون إجمالي", description: "عقد دائم مع إمكانية التمديد", additionalTerms: "مكافآت إضافية للأهداف" },
      { talentId: 1, type: "إعارة", duration: "موسم واحد", value: "$800,000", description: "إعارة لمدة موسم مع خيار الشراء", additionalTerms: "حق أولوية الشراء" },
      
      // خالد النمر
      { talentId: 2, type: "دائم", duration: "3 سنوات", value: "$1.2 مليون سنوياً", description: "عقد دائم لإدارة الفريق الفني", additionalTerms: "حوافز للبطولات والإنجازات" },
      
      // سعيد الكعبي
      { talentId: 3, type: "دائم", duration: "5 سنوات", value: "$1.8 مليون إجمالي", description: "عقد طويل الأمد", additionalTerms: "حوافز للمباريات النظيفة" },
      { talentId: 3, type: "إعارة", duration: "موسم واحد", value: "$400,000", description: "إعارة موسمية", additionalTerms: "خيار الشراء بمبلغ محدد مسبقاً" },
      
      // عصام الحضري
      { talentId: 5, type: "دائم", duration: "2 سنوات", value: "$1.5 مليون سنوياً", description: "عقد لتدريب حراس المرمى مع خيار التمديد", additionalTerms: "علاوات إضافية للبطولات" },
      { talentId: 5, type: "استشاري", duration: "6 أشهر", value: "$500,000", description: "عقد استشاري لتطوير برنامج تدريب حراس المرمى", additionalTerms: "مرونة في الجدول الزمني" }
    ];

    contractsData.forEach(contract => {
      this.createContract(contract);
    });

    // Add football stats
    const statsData = [
      // محمد عبدالله stats
      { talentId: 1, statName: "سرعة", value: "8.5/10" },
      { talentId: 1, statName: "تسديد", value: "9/10" },
      { talentId: 1, statName: "تمرير", value: "8/10" },
      { talentId: 1, statName: "مراوغة", value: "9.5/10" },
      { talentId: 1, statName: "قوة بدنية", value: "7.5/10" },
      { talentId: 1, statName: "دقة رأسيات", value: "6/10" },
      
      // خالد النمر stats (coaching)
      { talentId: 2, statName: "التكتيك", value: "9.5/10" },
      { talentId: 2, statName: "بناء الفريق", value: "9/10" },
      { talentId: 2, statName: "تطوير الشباب", value: "8.5/10" },
      
      // سعيد الكعبي stats (goalkeeper)
      { talentId: 3, statName: "ردود الفعل", value: "9/10" },
      { talentId: 3, statName: "التصدي للكرات المنخفضة", value: "8.5/10" },
      { talentId: 3, statName: "التصدي للكرات العالية", value: "9.5/10" },
      
      // عصام الحضري stats (goalkeeper trainer)
      { talentId: 5, statName: "الخبرة التدريبية", value: "10/10" },
      { talentId: 5, statName: "تطوير تقنيات الحراس", value: "9.5/10" },
      { talentId: 5, statName: "التدريب البدني", value: "9/10" },
      { talentId: 5, statName: "التدريب النفسي", value: "9/10" },
      { talentId: 5, statName: "التواصل مع الحراس", value: "9.5/10" }
    ];

    statsData.forEach(stat => {
      this.createFootballStat(stat);
    });

    // Add sample testimonials
    const testimonialsData = [
      {
        name: "أحمد حسن",
        role: "مدير فني",
        clubOrOrganization: "النادي الأهلي",
        avatarUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        content: "محمد عبدالله من أفضل اللاعبين الشباب الذين عملت معهم، يمتاز بمهارة فنية عالية وحس تهديفي مميز. التزامه داخل وخارج الملعب مثالي.",
        talentId: 1
      },
      {
        name: "سلطان العامري",
        role: "رئيس نادي",
        clubOrOrganization: "نادي الفجيرة",
        avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        content: "خالد النمر مدرب استثنائي، نجح في تطوير أداء فريقنا بشكل ملحوظ خلال فترة قصيرة. يمتلك رؤية تكتيكية عالية وقدرة فريدة على التواصل مع اللاعبين.",
        talentId: 2
      },
      {
        name: "محمود الخطيب",
        role: "مدير المنتخب الأولمبي",
        clubOrOrganization: "الاتحاد المصري لكرة القدم",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        content: "عصام الحضري من أفضل مدربي حراس المرمى في مصر والمنطقة العربية. خبرته العملية كحارس مرمى متميز تعطيه قدرة فريدة على نقل المعرفة للحراس الشباب.",
        talentId: 4
      }
    ];

    testimonialsData.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });

    // Add FAQs
    const faqsData = [
      {
        question: "كيف تتحققون من معلومات اللاعبين والمدربين؟",
        answer: "نعمل مباشرة مع اللاعبين والمدربين ووكلائهم للحصول على معلومات دقيقة وموثقة. كما نقوم بمراجعة السجل التاريخي والإحصائيات الرسمية للتأكد من صحة المعلومات.",
        category: "عام",
        sortOrder: 1
      },
      {
        question: "كيف يمكنني التواصل مع اللاعب أو المدرب الذي أهتم به؟",
        answer: "يمكنك التواصل من خلال نظام المراسلة المباشرة في الموقع، أو طلب التواصل من خلال استمارة الاتصال. سنقوم بربطك بالوكيل المعتمد للاعب أو المدرب لمتابعة المفاوضات.",
        category: "تواصل",
        sortOrder: 2
      }
    ];

    faqsData.forEach(faq => {
      this.createFaq(faq);
    });

    // Add a sample user and chat messages
    this.createUser({ 
      username: "yasser",
      password: simpleHash("Yasser@123"),
      role: "admin",
      email: "yasser@example.com",
      fullName: "ياسر العربي"
    });
    
    this.createUser({ 
      username: "sportmanager",
      password: simpleHash("password123"),
      role: "user",
      email: "manager@example.com",
      phone: "+966500000000"
    }).then(user => {
      // Add some sample chat messages
      this.createChatMessage({
        userId: user.id,
        talentId: 1,
        message: "مرحباً، أنا مهتم بالتعاقد مع اللاعب محمد عبدالله. هل هو متاح حالياً؟",
        isFromUser: true
      });
      
      this.createChatMessage({
        userId: user.id,
        talentId: 1,
        message: "مرحباً بك! نعم، محمد عبدالله متاح للانتقال في الموسم القادم. هل تود معرفة تفاصيل أكثر عن شروط التعاقد؟",
        isFromUser: false
      });
    });

    // Add sample club
    this.createUser({
      username: "alahli_club",
      password: simpleHash("password123"),
      role: "club",
      email: "info@alahli.com",
      phone: "+966505555555",
      fullName: "نادي الأهلي"
    }).then(user => {
      this.createClub({
        name: "النادي الأهلي",
        country: "المملكة العربية السعودية",
        city: "جدة",
        league: "الدوري السعودي للمحترفين",
        stadiumName: "ملعب الجوهرة",
        stadiumCapacity: 62000,
        foundedYear: 1937,
        description: "نادي الأهلي السعودي، أحد أعرق الأندية في المملكة العربية السعودية والوطن العربي",
        userId: user.id
      });
    });

    // Add sample agent
    this.createUser({
      username: "agent_omar",
      password: simpleHash("password123"),
      role: "agent",
      email: "omar@sportsagency.com",
      phone: "+971501234567",
      fullName: "عمر الشمري"
    }).then(user => {
      this.createAgent({
        name: "عمر الشمري",
        agency: "وكالة النجوم الرياضية",
        licenseNumber: "FIFA-12345",
        experience: "10 سنوات في إدارة اللاعبين المحترفين",
        clients: "أكثر من 30 لاعب من مختلف دول الخليج وأوروبا",
        languages: "العربية، الإنجليزية، الإسبانية",
        contact: "+971501234567",
        bio: "وكيل لاعبين معتمد من الفيفا مع خبرة واسعة في الأسواق الأوروبية والخليجية",
        userId: user.id
      });
    });

    // Add sample doctor
    this.createUser({
      username: "dr_ahmed",
      password: simpleHash("password123"),
      role: "doctor",
      email: "dr.ahmed@sportsmedicine.com",
      phone: "+20123456789",
      fullName: "د. أحمد محمود"
    }).then(user => {
      this.createDoctor({
        name: "د. أحمد محمود",
        specialization: "جراحة العظام وإصابات الملاعب",
        hospital: "المستشفى الرياضي التخصصي",
        clinic: "عيادة طب الرياضة - القاهرة",
        experience: "15 عام في علاج إصابات الرياضيين المحترفين",
        qualifications: "دكتوراه في جراحة العظام، زمالة في طب الرياضة من جامعة برشلونة",
        contact: "+20123456789",
        bio: "متخصص في علاج إصابات الملاعب وإعادة التأهيل، عمل مع عدة أندية كبرى ومنتخبات وطنية",
        userId: user.id
      });
    });

    // Add sample stadium
    this.createStadium({
      name: "استاد القاهرة الدولي",
      city: "القاهرة",
      country: "مصر",
      capacity: 75000,
      yearBuilt: 1960,
      surfaceType: "عشب طبيعي",
      dimensions: "105 × 68 متر",
      homeClub: "المنتخب المصري",
      facilities: "مضمار ألعاب قوى، مركز إعلامي، قاعات تدريب، مركز طبي"
    });

    // Add media files for some talents
    // إضافة ملفات وسائط لعصام الحضري
    this.createMediaFile({
      userId: 1,
      talentId: 5, // عصام الحضري
      fileType: "image",
      fileUrl: "/images/essam-el-hadary.jpg",
      description: "صورة البروفايل الرسمية لعصام الحضري",
      fileName: "essam-el-hadary.jpg",
      fileSize: 52095,
      isPublic: true
    });

    // إضافة صورة لعصام الحضري أثناء الاحتفال ببطولة كأس الأمم الأفريقية
    this.createMediaFile({
      userId: 1,
      talentId: 5,
      fileType: "image",
      fileUrl: "/images/essam-hadary-celebration.png",
      description: "صورة لعصام الحضري أثناء احتفاله ببطولة الأمم الأفريقية",
      fileName: "essam-hadary-celebration.png",
      fileSize: 692588,
      isPublic: true
    });

    // إضافة سيرة ذاتية لعصام الحضري
    this.createMediaFile({
      userId: 1,
      talentId: 5,
      fileType: "document",
      fileUrl: "/documents/essam-el-hadary-cv.pdf",
      description: "السيرة الذاتية الكاملة لعصام الحضري متضمنة كل الإنجازات والألقاب والخبرات",
      fileName: "essam-el-hadary-cv.pdf",
      fileSize: 1024000,
      isPublic: true
    });

    // إضافة فيديو مهارات لعصام الحضري
    this.createMediaFile({
      userId: 1,
      talentId: 5,
      fileType: "video",
      fileUrl: "/videos/essam-el-hadary-training.mp4",
      description: "فيديو تدريبي يوضح طريقة عمل عصام الحضري مع حراس المرمى وشرح لأساسيات التدريب",
      fileName: "essam-el-hadary-training.mp4",
      fileSize: 14000000,
      isPublic: true
    });

    // إضافة صورة أخرى من التدريب
    this.createMediaFile({
      userId: 1,
      talentId: 5,
      fileType: "image",
      fileUrl: "/images/essam-el-hadary-coaching.jpg",
      description: "عصام الحضري أثناء تدريب حراس المرمى في المنتخب الأولمبي",
      fileName: "essam-el-hadary-coaching.jpg",
      fileSize: 3500,
      isPublic: true
    });

    // إضافة صورة من كأس العالم 2018
    this.createMediaFile({
      userId: 1,
      talentId: 5,
      fileType: "image",
      fileUrl: "/images/essam-el-hadary-worldcup.jpg",
      description: "عصام الحضري في مباراة السعودية بكأس العالم 2018 كأكبر لاعب يشارك في تاريخ البطولة",
      fileName: "essam-el-hadary-worldcup.jpg",
      fileSize: 4500,
      isPublic: true
    });

    // Add sample news
    this.createUser({
      username: "news_editor",
      password: simpleHash("password123"),
      role: "admin",
      email: "editor@soccerhunter.com"
    }).then(user => {
      this.createNews({
        title: "محمد صلاح يتصدر قائمة هدافي الدوري الإنجليزي للموسم الثالث",
        content: "واصل النجم المصري محمد صلاح تألقه في الدوري الإنجليزي الممتاز، ليحصد جائزة الهداف للمرة الثالثة في مسيرته مع ليفربول. وسجل صلاح 24 هدفاً هذا الموسم...",
        category: "أخبار اللاعبين",
        tags: "محمد صلاح، ليفربول، الدوري الإنجليزي",
        published: true,
        authorId: user.id
      });
    });
  }
}

export const storage = new MemStorage();