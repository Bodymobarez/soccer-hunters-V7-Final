import SimplePeer from 'simple-peer';

type Connection = {
  peer: any; // SimplePeer.Instance
  userId: number;
  stream?: MediaStream;
  remoteTracks?: MediaStreamTrack[];
};

type SignalData = {
  userId: number;
  sessionId: string;
  signal: any; // SimplePeer.SignalData
};

class WebRTCService {
  private connections: Map<number, Connection> = new Map();
  private localStream: MediaStream | null = null;
  private ws: WebSocket | null = null;
  private sessionId: string | null = null;
  private userId: number | null = null;
  private onTrackCallbacks: ((userId: number, stream: MediaStream) => void)[] = [];
  private onUserDisconnectCallbacks: ((userId: number) => void)[] = [];
  private wsReconnectTimeout: number | null = null;
  
  constructor() {
    // Handle network changes to reconnect if needed
    window.addEventListener('online', () => this.handleNetworkChange(true));
    window.addEventListener('offline', () => this.handleNetworkChange(false));
  }
  
  /**
   * Handle network changes (online/offline)
   */
  private handleNetworkChange(isOnline: boolean) {
    if (isOnline && this.sessionId && this.userId && !this.ws) {
      // Reconnect after going back online
      this.connect(this.sessionId, this.userId).catch(err => {
        console.error('Failed to reconnect WebSocket after going online:', err);
      });
    }
  }
  
  /**
   * بدء الاتصال بخادم WebSocket
   */
  public connect(sessionId: string, userId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      // تخزين معرف الجلسة والمستخدم للاستخدام في إعادة الاتصال
      this.sessionId = sessionId;
      this.userId = userId;
      
      if (this.ws) {
        this.ws.close();
      }
      
      // إنشاء اتصال WebSocket باستخدام البروتوكول المناسب
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      try {
        this.ws = new WebSocket(wsUrl);
        
        this.ws.onopen = () => {
          console.log('WebSocket connection established');
          
          // إرسال معلومات المستخدم والجلسة
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
              type: 'join-session',
              userId: userId,
              sessionId: sessionId
            }));
          }
          
          resolve();
        };
        
        this.ws.onmessage = (event) => {
          this.handleWebSocketMessage(JSON.parse(event.data));
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(new Error('فشل في الاتصال بخادم الإشارات'));
        };
        
        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
          
          // محاولة إعادة الاتصال بعد 5 ثوان في حالة انقطاع الاتصال غير المقصود
          if (this.sessionId && this.userId) {
            if (this.wsReconnectTimeout) {
              window.clearTimeout(this.wsReconnectTimeout);
            }
            
            this.wsReconnectTimeout = window.setTimeout(() => {
              this.connect(this.sessionId!, this.userId!).catch(err => {
                console.error('Failed to reconnect WebSocket:', err);
              });
            }, 5000);
          }
        };
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        reject(error);
      }
    });
  }
  
  /**
   * معالجة الرسائل الواردة من خادم WebSocket
   */
  private handleWebSocketMessage(data: any) {
    switch (data.type) {
      case 'user-joined':
        console.log(`User ${data.userId} joined the session`);
        // بدء اتصال P2P مع المستخدم الجديد إذا كان لدينا بالفعل بث محلي
        if (this.localStream) {
          this.initiatePeerConnection(data.userId, true);
        }
        break;
        
      case 'session-users':
        console.log(`Current users in session: ${data.users.join(', ')}`);
        // إنشاء اتصال P2P مع كل مستخدم موجود في الجلسة
        if (this.localStream) {
          data.users.forEach((userId: number) => {
            this.initiatePeerConnection(userId, true);
          });
        }
        break;
        
      case 'signal':
        // معالجة إشارة WebRTC واردة من مستخدم آخر
        this.handleSignal(data.userId, data.signal);
        break;
        
      case 'user-left':
        // إزالة الاتصال بالمستخدم الذي غادر الجلسة
        this.handleUserDisconnect(data.userId);
        break;
        
      default:
        console.log('Unhandled WebSocket message type:', data.type);
    }
  }
  
  /**
   * بدء اتصال peer مع مستخدم محدد
   */
  private initiatePeerConnection(remoteUserId: number, initiator: boolean) {
    // تحقق من وجود الاتصال مسبقاً
    if (this.connections.has(remoteUserId)) {
      console.log(`Connection to user ${remoteUserId} already exists.`);
      return;
    }
    
    // التحقق من وجود البث المحلي
    if (!this.localStream) {
      console.error('Cannot initiate peer connection without local stream');
      return;
    }
    
    // إنشاء اتصال Peer جديد
    try {
      const peer = new SimplePeer({
        initiator: initiator,
        stream: this.localStream,
        trickle: true,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });
      
      // إضافة الاتصال إلى القائمة
      const connection: Connection = {
        peer,
        userId: remoteUserId
      };
      
      this.connections.set(remoteUserId, connection);
      
      // التعامل مع أحداث Peer
      peer.on('signal', (signal: any) => {
        this.sendSignal(remoteUserId, signal);
      });
      
      peer.on('stream', (stream: MediaStream) => {
        console.log(`Received stream from user ${remoteUserId}`);
        connection.stream = stream;
        
        // إعلام المكونات بالبث الجديد
        this.onTrackCallbacks.forEach(callback => {
          callback(remoteUserId, stream);
        });
      });
      
      peer.on('track', (track: MediaStreamTrack, stream: MediaStream) => {
        console.log(`Received track from user ${remoteUserId}:`, track.kind);
        if (!connection.remoteTracks) {
          connection.remoteTracks = [];
        }
        connection.remoteTracks.push(track);
      });
      
      peer.on('connect', () => {
        console.log(`Connected to user ${remoteUserId}`);
      });
      
      peer.on('close', () => {
        console.log(`Connection to user ${remoteUserId} closed`);
        this.handleUserDisconnect(remoteUserId);
      });
      
      peer.on('error', (err: Error) => {
        console.error(`Error in connection to user ${remoteUserId}:`, err);
      });
      
    } catch (error) {
      console.error('Failed to create peer connection:', error);
    }
  }
  
  /**
   * معالجة إشارة WebRTC واردة من مستخدم آخر
   */
  private handleSignal(userId: number, signal: any) {
    const connection = this.connections.get(userId);
    
    if (connection) {
      connection.peer.signal(signal);
    } else if (this.localStream) {
      // إذا لم يكن لدينا اتصال موجود، قم بإنشاء واحد جديد
      this.initiatePeerConnection(userId, false);
      
      // بعد إنشاء الاتصال، قم بمعالجة الإشارة
      window.setTimeout(() => {
        const newConnection = this.connections.get(userId);
        if (newConnection) {
          newConnection.peer.signal(signal);
        }
      }, 100);
    }
  }
  
  /**
   * إرسال إشارة WebRTC إلى مستخدم محدد عبر WebSocket
   */
  private sendSignal(receiverId: number, signal: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.sessionId && this.userId) {
      this.ws.send(JSON.stringify({
        type: 'signal',
        userId: this.userId,
        receiverId: receiverId,
        sessionId: this.sessionId,
        signal: signal
      }));
    }
  }
  
  /**
   * معالجة قطع اتصال مستخدم من الجلسة
   */
  private handleUserDisconnect(userId: number) {
    const connection = this.connections.get(userId);
    
    if (connection) {
      // إغلاق الاتصال
      if (!connection.peer.destroyed) {
        connection.peer.destroy();
      }
      
      // إزالة الاتصال من القائمة
      this.connections.delete(userId);
      
      // إعلام المكونات بانقطاع الاتصال
      this.onUserDisconnectCallbacks.forEach(callback => {
        callback(userId);
      });
    }
  }
  
  /**
   * طلب إذن الوصول إلى الميكروفون والكاميرا وبدء البث المحلي
   */
  public async startLocalStream(video: boolean = true, audio: boolean = true): Promise<MediaStream> {
    try {
      // إغلاق البث القديم إذا كان موجوداً
      if (this.localStream) {
        this.stopLocalStream();
      }
      
      // طلب الوصول إلى الأجهزة
      const stream = await navigator.mediaDevices.getUserMedia({
        video: video ? { width: 640, height: 480 } : false,
        audio: audio
      });
      
      this.localStream = stream;
      
      // تحديث جميع الاتصالات الموجودة بالبث الجديد
      this.updateConnectionsWithLocalStream();
      
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw new Error('فشل في الوصول إلى الكاميرا أو الميكروفون. يرجى التأكد من أذونات الوصول.');
    }
  }
  
  /**
   * إيقاف البث المحلي وإغلاق جميع المسارات
   */
  public stopLocalStream() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        track.stop();
      });
      this.localStream = null;
    }
  }
  
  /**
   * تبديل حالة الفيديو (تشغيل/إيقاف)
   */
  public toggleVideo(enabled: boolean): boolean {
    if (!this.localStream) return false;
    
    const videoTracks = this.localStream.getVideoTracks();
    if (videoTracks.length === 0) return false;
    
    videoTracks.forEach(track => {
      track.enabled = enabled;
    });
    
    return true;
  }
  
  /**
   * تبديل حالة الصوت (تشغيل/إيقاف)
   */
  public toggleAudio(enabled: boolean): boolean {
    if (!this.localStream) return false;
    
    const audioTracks = this.localStream.getAudioTracks();
    if (audioTracks.length === 0) return false;
    
    audioTracks.forEach(track => {
      track.enabled = enabled;
    });
    
    return true;
  }
  
  /**
   * تحديث جميع الاتصالات بالبث المحلي الجديد
   */
  private updateConnectionsWithLocalStream() {
    if (!this.localStream) return;
    
    // استخدم Array.from لتحويل Iterator إلى مصفوفة
    const connectionEntries = Array.from(this.connections.entries());
    
    for (const [userId, connection] of connectionEntries) {
      const peer = connection.peer;
      
      // إضافة المسارات الجديدة
      this.localStream.getTracks().forEach(track => {
        peer.addTrack(track, this.localStream!);
      });
    }
  }
  
  /**
   * تسجيل دالة لمعالجة المسارات الواردة الجديدة
   */
  public onTrack(callback: (userId: number, stream: MediaStream) => void) {
    this.onTrackCallbacks.push(callback);
  }
  
  /**
   * تسجيل دالة لمعالجة قطع اتصال المستخدمين
   */
  public onUserDisconnect(callback: (userId: number) => void) {
    this.onUserDisconnectCallbacks.push(callback);
  }
  
  /**
   * الحصول على تدفق مستخدم محدد
   */
  public getUserStream(userId: number): MediaStream | undefined {
    const connection = this.connections.get(userId);
    return connection?.stream;
  }
  
  /**
   * إغلاق جميع الاتصالات وتنظيف الموارد
   */
  public closeAll() {
    // إغلاق البث المحلي
    this.stopLocalStream();
    
    // إغلاق جميع اتصالات Peer
    // استخدم Array.from لتحويل Iterator إلى مصفوفة
    const connectionEntries = Array.from(this.connections.entries());
    
    for (const [userId, connection] of connectionEntries) {
      if (!connection.peer.destroyed) {
        connection.peer.destroy();
      }
    }
    
    // مسح قائمة الاتصالات
    this.connections.clear();
    
    // إغلاق اتصال WebSocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    // إلغاء معرفات الجلسة والمستخدم
    this.sessionId = null;
    this.userId = null;
    
    // إلغاء مؤقت إعادة الاتصال
    if (this.wsReconnectTimeout) {
      window.clearTimeout(this.wsReconnectTimeout);
      this.wsReconnectTimeout = null;
    }
  }
}

export const webRTCService = new WebRTCService();
