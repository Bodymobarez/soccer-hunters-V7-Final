/**
 * Simplified WebRTC service using native browser APIs
 * This approach avoids compatibility issues with the simple-peer library
 */

type RTCPeerInfo = {
  connection: RTCPeerConnection;
  userId: number;
  stream?: MediaStream;
};

class SimplifiedWebRTC {
  private peerConnections: Map<number, RTCPeerInfo> = new Map();
  private ws: WebSocket | null = null;
  private localStream: MediaStream | null = null;
  private sessionId: string | null = null;
  private userId: number | null = null;
  private reconnectTimer: number | null = null;
  private onTrackCallbacks: ((userId: number, stream: MediaStream) => void)[] = [];
  private onUserDisconnectCallbacks: ((userId: number) => void)[] = [];

  // Default STUN servers for NAT traversal
  private iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ];

  constructor() {
    // Handle network connection changes
    window.addEventListener('online', () => this.handleNetworkChange(true));
    window.addEventListener('offline', () => this.handleNetworkChange(false));
  }

  /**
   * Handle network changes (online/offline)
   */
  private handleNetworkChange(isOnline: boolean) {
    if (isOnline && this.sessionId && this.userId && !this.ws) {
      // Try to reconnect after going back online
      this.connect(this.sessionId, this.userId).catch(err => {
        console.error('Failed to reconnect after network change:', err);
      });
    }
  }

  /**
   * Connect to the WebSocket signaling server
   */
  public connect(sessionId: string, userId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sessionId = sessionId;
      this.userId = userId;
      
      if (this.ws) {
        this.ws.close();
      }
      
      // Create WebSocket connection
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      try {
        this.ws = new WebSocket(wsUrl);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected to signaling server');
          
          // Send join session message
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
          this.handleSignalingMessage(JSON.parse(event.data));
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(new Error('فشل في الاتصال بخادم الإشارات'));
        };
        
        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
          
          // Try to reconnect after a delay
          if (this.sessionId && this.userId) {
            if (this.reconnectTimer) {
              window.clearTimeout(this.reconnectTimer);
            }
            
            this.reconnectTimer = window.setTimeout(() => {
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
   * Process messages from the signaling server
   */
  private handleSignalingMessage(data: any) {
    switch (data.type) {
      case 'user-joined':
        console.log(`User ${data.userId} joined the session`);
        // Initialize connection with new user if we have local stream
        if (this.localStream) {
          this.createPeerConnection(data.userId, true);
        }
        break;

      case 'session-users':
        console.log(`Current users in session: ${data.users.join(', ')}`);
        // Connect to all existing users
        if (this.localStream) {
          data.users.forEach((userId: number) => {
            if (userId !== this.userId) { // Don't connect to self
              this.createPeerConnection(userId, true);
            }
          });
        }
        break;

      case 'signal':
        // Handle WebRTC signaling messages (offers, answers, ICE candidates)
        if (data.signal.type === 'offer') {
          this.handleOffer(data.userId, data.signal);
        } else if (data.signal.type === 'answer') {
          this.handleAnswer(data.userId, data.signal);
        } else if (data.signal.candidate) {
          this.handleIceCandidate(data.userId, data.signal);
        }
        break;

      case 'user-left':
        this.closePeerConnection(data.userId);
        break;

      default:
        console.log('Unhandled message type:', data.type);
    }
  }

  /**
   * Create a new RTCPeerConnection to a remote user
   */
  private async createPeerConnection(remoteUserId: number, isInitiator: boolean) {
    if (this.peerConnections.has(remoteUserId)) {
      console.log(`Connection to user ${remoteUserId} already exists`);
      return;
    }

    if (!this.localStream) {
      console.error('Cannot create connection without local stream');
      return;
    }

    try {
      const peerConnection = new RTCPeerConnection({
        iceServers: this.iceServers
      });

      // Add our media tracks to the connection
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream!);
      });

      // Store the connection
      const peerInfo: RTCPeerInfo = {
        connection: peerConnection,
        userId: remoteUserId
      };
      this.peerConnections.set(remoteUserId, peerInfo);

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.sendSignal(remoteUserId, { candidate: event.candidate });
        }
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log(`Connection state with user ${remoteUserId}:`, peerConnection.connectionState);
        if (peerConnection.connectionState === 'failed' || 
            peerConnection.connectionState === 'closed') {
          this.closePeerConnection(remoteUserId);
        }
      };

      // Handle tracks from the remote peer
      peerConnection.ontrack = (event) => {
        console.log(`Received track from user ${remoteUserId}:`, event.track.kind);
        
        // Use the first stream
        const stream = event.streams[0];
        if (stream) {
          peerInfo.stream = stream;
          
          // Notify callbacks
          this.onTrackCallbacks.forEach(callback => {
            callback(remoteUserId, stream);
          });
        }
      };

      // If we're the initiator, create and send an offer
      if (isInitiator) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        this.sendSignal(remoteUserId, offer);
      }

      return peerConnection;
    } catch (error) {
      console.error('Error creating peer connection:', error);
      throw error;
    }
  }

  /**
   * Handle an incoming WebRTC offer
   */
  private async handleOffer(userId: number, offer: RTCSessionDescriptionInit) {
    try {
      // Make sure we have a local stream before handling offers
      if (!this.localStream) {
        console.error('Cannot handle offer without local stream');
        return;
      }

      // Create peer connection if it doesn't exist
      let peerInfo = this.peerConnections.get(userId);
      let peerConnection: RTCPeerConnection;

      if (!peerInfo) {
        peerConnection = await this.createPeerConnection(userId, false) as RTCPeerConnection;
      } else {
        peerConnection = peerInfo.connection;
      }

      // Set the remote description (the offer)
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      // Create and send an answer
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      this.sendSignal(userId, answer);
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  /**
   * Handle an incoming WebRTC answer
   */
  private async handleAnswer(userId: number, answer: RTCSessionDescriptionInit) {
    const peerInfo = this.peerConnections.get(userId);
    if (peerInfo) {
      try {
        await peerInfo.connection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    }
  }

  /**
   * Handle an incoming ICE candidate
   */
  private handleIceCandidate(userId: number, data: { candidate: RTCIceCandidateInit }) {
    const peerInfo = this.peerConnections.get(userId);
    if (peerInfo) {
      try {
        peerInfo.connection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  }

  /**
   * Send signaling data to a specific peer
   */
  private sendSignal(remoteUserId: number, signal: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.sessionId && this.userId) {
      this.ws.send(JSON.stringify({
        type: 'signal',
        userId: this.userId,
        receiverId: remoteUserId,
        sessionId: this.sessionId,
        signal: signal
      }));
    }
  }

  /**
   * Close a connection to a specific peer
   */
  private closePeerConnection(userId: number) {
    const peerInfo = this.peerConnections.get(userId);
    if (peerInfo) {
      // Close the connection
      peerInfo.connection.close();
      
      // Remove from our map
      this.peerConnections.delete(userId);
      
      // Notify callbacks
      this.onUserDisconnectCallbacks.forEach(callback => {
        callback(userId);
      });
    }
  }

  /**
   * Start the local media stream (camera/microphone)
   */
  public async startLocalStream(videoEnabled: boolean = true, audioEnabled: boolean = true): Promise<MediaStream> {
    try {
      // Close existing stream if any
      if (this.localStream) {
        this.stopLocalStream();
      }
      
      // Request media devices
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled ? { width: 640, height: 480 } : false,
        audio: audioEnabled
      });
      
      this.localStream = stream;
      
      // Update existing connections with the new stream
      this.updateConnectionsWithLocalStream();
      
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw new Error('فشل في الوصول إلى الكاميرا أو الميكروفون. يرجى التأكد من أذونات الوصول.');
    }
  }

  /**
   * Stop the local media stream
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
   * Toggle video track state
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
   * Toggle audio track state
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
   * Update all connections with the local stream
   */
  private updateConnectionsWithLocalStream() {
    if (!this.localStream) return;
    
    for (const [userId, peerInfo] of this.peerConnections.entries()) {
      const peerConnection = peerInfo.connection;
      
      // Get all senders (outgoing tracks)
      const senders = peerConnection.getSenders();
      
      // Replace each track with the corresponding one from the new stream
      this.localStream.getTracks().forEach(track => {
        const sender = senders.find(s => s.track?.kind === track.kind);
        if (sender) {
          sender.replaceTrack(track);
        } else {
          peerConnection.addTrack(track, this.localStream!);
        }
      });
    }
  }

  /**
   * Register a callback for new tracks
   */
  public onTrack(callback: (userId: number, stream: MediaStream) => void) {
    this.onTrackCallbacks.push(callback);
  }

  /**
   * Register a callback for user disconnection
   */
  public onUserDisconnect(callback: (userId: number) => void) {
    this.onUserDisconnectCallbacks.push(callback);
  }

  /**
   * Get a specific user's stream
   */
  public getUserStream(userId: number): MediaStream | undefined {
    return this.peerConnections.get(userId)?.stream;
  }

  /**
   * Close all connections and cleanup resources
   */
  public closeAll() {
    // Stop local stream
    this.stopLocalStream();
    
    // Close all peer connections
    for (const [userId, peerInfo] of this.peerConnections.entries()) {
      peerInfo.connection.close();
    }
    
    // Clear connections map
    this.peerConnections.clear();
    
    // Close WebSocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    // Reset state
    this.sessionId = null;
    this.userId = null;
    
    // Clear reconnect timer
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

// Export a singleton instance
export const simplifiedWebRTC = new SimplifiedWebRTC();
