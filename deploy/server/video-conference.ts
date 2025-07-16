import { Express, Request, Response } from 'express';
import { storage } from './storage';
import { v4 as uuidv4 } from 'uuid';

export function setupVideoConference(app: Express) {
  // Create a new video session
  app.post('/api/video-sessions', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول لإنشاء جلسة فيديو' });
      }
      
      const { title, description, scheduledFor, attendees, appointmentId } = req.body;
      const sessionId = uuidv4();
      
      // Create participants array
      const participants = [];
      if (req.user && req.user.id) {
        participants.push(req.user.id);
      }
      
      if (attendees && Array.isArray(attendees) && attendees.length > 0) {
        attendees.forEach((attendeeId: number) => {
          if (!participants.includes(attendeeId)) {
            participants.push(attendeeId);
          }
        });
      }
      
      const videoSession = await storage.createVideoSession({
        sessionId,
        hostId: req.user.id,
        appointmentId: appointmentId || null,
        participants: JSON.stringify(participants),
        status: 'scheduled',
        startTime: scheduledFor ? new Date(scheduledFor) : new Date(),
        notes: description || ""
      });
      
      res.status(201).json({
        ...videoSession,
        title: title || `Session ${sessionId.slice(0, 8)}`
      });
    } catch (error) {
      console.error('Error creating video session:', error);
      res.status(500).json({ message: 'فشل في إنشاء جلسة الفيديو' });
    }
  });
  
  // Get list of video sessions available for the user
  app.get('/api/video-sessions', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول لعرض جلسات الفيديو' });
      }
      
      const userId = req.user.id;
      // Fetch all video sessions
      const allSessions = await storage.getVideoSessions();
      
      // Filter sessions where the current user is either the host or a participant
      const userSessions = allSessions.filter(session => {
        // Check if user is the host
        if (session.hostId === userId) return true;
        
        // Check if user is a participant
        let participants = [];
        try {
          participants = JSON.parse(session.participants as string);
        } catch (e) {
          console.error('Error parsing participants:', e);
        }
        
        return Array.isArray(participants) && participants.includes(userId);
      });
      
      res.json(userSessions);
    } catch (error) {
      console.error('Error fetching video sessions:', error);
      res.status(500).json({ message: 'فشل في جلب جلسات الفيديو' });
    }
  });
  
  // Join a video session
  app.post('/api/video-sessions/:sessionId/join', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول للانضمام إلى جلسة فيديو' });
      }
      
      const sessionId = req.params.sessionId;
      const userId = req.user.id;
      
      // Check if session exists
      const session = await storage.getVideoSessionBySessionId(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'جلسة الفيديو غير موجودة' });
      }
      
      // Check if user is already a participant
      let participants = [];
      try {
        participants = JSON.parse(session.participants as string);
      } catch (e) {
        console.error('Error parsing participants:', e);
        participants = [];
      }
      
      const isParticipant = Array.isArray(participants) && participants.includes(userId);
      const isHost = session.hostId === userId;
      const isAdmin = req.user.role === 'admin';
      
      // If not already a participant, add to participants list
      if (!isParticipant && !isHost) {
        participants.push(userId);
        await storage.updateVideoSessionParticipants(session.id, JSON.stringify(participants));
      }
      
      // Return session details with role information
      const userRole = isHost ? 'host' : 'attendee';
      
      res.json({
        ...session,
        userRole
      });
    } catch (error) {
      console.error('Error joining video session:', error);
      res.status(500).json({ message: 'فشل في الانضمام إلى جلسة الفيديو' });
    }
  });
  
  // بدء جلسة فيديو باستخدام معرف الجلسة (UUID)
  app.post('/api/video-sessions/:sessionId/start', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول لبدء جلسة فيديو' });
      }
      
      const sessionId = req.params.sessionId;
      const userId = req.user.id;
      
      // التحقق من وجود الجلسة باستخدام رقم الجلسة (UUID)
      const session = await storage.getVideoSessionBySessionId(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'جلسة الفيديو غير موجودة' });
      }
      
      // التحقق من أن المستخدم هو منشئ الجلسة أو مسؤول
      const isAdmin = req.user.role === 'admin';
      const isHost = session.hostId === userId;
      
      if (!isAdmin && !isHost) {
        return res.status(403).json({ message: 'ليس لديك صلاحية بدء هذه الجلسة' });
      }
      
      // تحديث حالة الجلسة إلى نشطة
      await storage.updateVideoSessionStatus(session.id, 'active');
      
      // إرجاع معلومات الجلسة مع الرسالة
      res.json({ 
        message: 'تم بدء جلسة الفيديو بنجاح',
        sessionId: session.sessionId
      });
    } catch (error) {
      console.error('Error starting video session:', error);
      res.status(500).json({ message: 'فشل في بدء جلسة الفيديو' });
    }
  });
  
  // إنهاء جلسة فيديو باستخدام معرف الجلسة (UUID)
  app.post('/api/video-sessions/:sessionId/end', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول لإنهاء جلسة فيديو' });
      }
      
      const sessionId = req.params.sessionId;
      const userId = req.user.id;
      
      // التحقق من وجود الجلسة باستخدام رقم الجلسة (UUID)
      const session = await storage.getVideoSessionBySessionId(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'جلسة الفيديو غير موجودة' });
      }
      
      // التحقق من أن المستخدم هو منشئ الجلسة أو مسؤول
      const isAdmin = req.user.role === 'admin';
      const isHost = session.hostId === userId;
      
      if (!isAdmin && !isHost) {
        return res.status(403).json({ message: 'ليس لديك صلاحية إنهاء هذه الجلسة' });
      }
      
      // تحديث حالة الجلسة إلى مكتملة
      await storage.updateVideoSessionStatus(session.id, 'completed');
      
      res.json({ message: 'تم إنهاء جلسة الفيديو بنجاح' });
    } catch (error) {
      console.error('Error ending video session:', error);
      res.status(500).json({ message: 'فشل في إنهاء جلسة الفيديو' });
    }
  });
  
  // تسجيل مكالمة فيديو
  app.post('/api/video-sessions/:id/record', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول لتسجيل جلسة فيديو' });
      }
      
      const sessionId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // التحقق من وجود الجلسة
      const session = await storage.getVideoSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'جلسة الفيديو غير موجودة' });
      }
      
      // التحقق من أن المستخدم هو مضيف الجلسة أو مسؤول
      const isHost = await storage.isSessionHost(sessionId, userId);
      const isAdmin = req.user.role === 'admin';
      
      if (!isHost && !isAdmin) {
        return res.status(403).json({ message: 'ليس لديك صلاحية تسجيل هذه الجلسة' });
      }
      
      // القيام بعملية تسجيل المكالمة (ملاحظة: هذا تنفيذ مبسط، سيتطلب تكامل مع خدمة سحابية لتسجيل الفيديو)
      const recordingUrl = `/api/recordings/${sessionId}/recording.mp4`;
      
      // تحديث الجلسة بمعلومات التسجيل
      await storage.updateVideoSessionRecording(sessionId, recordingUrl);
      
      res.json({ message: 'تم بدء تسجيل جلسة الفيديو بنجاح', recordingUrl });
    } catch (error) {
      console.error('Error recording video session:', error);
      res.status(500).json({ message: 'فشل في تسجيل جلسة الفيديو' });
    }
  });
  
  // الحصول على تسجيل جلسة فيديو
  app.get('/api/video-sessions/:id/recording', async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'يجب تسجيل الدخول لعرض تسجيل جلسة فيديو' });
      }
      
      const sessionId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // التحقق من وجود الجلسة
      const session = await storage.getVideoSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'جلسة الفيديو غير موجودة' });
      }
      
      // التحقق من أن المستخدم مدعو للجلسة أو أنه مسؤول أو مضيف الجلسة
      const isAttendee = await storage.isSessionAttendee(sessionId, userId);
      const isAdmin = req.user.role === 'admin';
      const isHost = await storage.isSessionHost(sessionId, userId);
      
      if (!isAttendee && !isAdmin && !isHost) {
        return res.status(403).json({ message: 'ليس لديك صلاحية عرض تسجيل هذه الجلسة' });
      }
      
      // التحقق من وجود تسجيل
      if (!session.recordingUrl) {
        return res.status(404).json({ message: 'لا يوجد تسجيل لهذه الجلسة' });
      }
      
      res.json({ recordingUrl: session.recordingUrl });
    } catch (error) {
      console.error('Error fetching video session recording:', error);
      res.status(500).json({ message: 'فشل في جلب تسجيل جلسة الفيديو' });
    }
  });
}
