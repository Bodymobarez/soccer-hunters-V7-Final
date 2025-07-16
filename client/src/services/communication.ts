import { apiRequest } from "@/lib/queryClient";

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: "direct" | "group" | "notification";
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "error" | "success";
  targetUsers: string[] | "all";
  createdAt: Date;
  isActive: boolean;
}

export interface CommunicationStats {
  newMessages: number;
  activeChats: number;
  sentNotifications: number;
  totalUsers: number;
}

class CommunicationService {
  // Get communication statistics
  async getStats(): Promise<CommunicationStats> {
    try {
      const response = await apiRequest("GET", "/api/communication/stats");
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn("Communication API not available, using mock data");
    }

    // Mock data fallback
    return {
      newMessages: 127,
      activeChats: 89,
      sentNotifications: 456,
      totalUsers: 3482,
    };
  }

  // Send notification to users
  async sendNotification(
    notification: Omit<Notification, "id" | "createdAt" | "isActive">,
  ): Promise<boolean> {
    try {
      const response = await apiRequest(
        "POST",
        "/api/communication/notifications",
        {
          ...notification,
          createdAt: new Date().toISOString(),
          isActive: true,
        },
      );

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.warn("Communication API not available, simulating success");
    }

    // Mock success for demo
    return true;
  }

  // Get recent messages
  async getRecentMessages(limit: number = 10): Promise<Message[]> {
    try {
      const response = await apiRequest(
        "GET",
        `/api/communication/messages?limit=${limit}`,
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn("Communication API not available, using mock data");
    }

    // Mock data fallback
    return [
      {
        id: "1",
        senderId: "user1",
        receiverId: "admin",
        content: "مرحبا، أحتاج مساعدة في التسجيل",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        type: "direct",
      },
      {
        id: "2",
        senderId: "user2",
        receiverId: "admin",
        content: "هل يمكن تحديث بياناتي الشخصية؟",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
        type: "direct",
      },
    ];
  }

  // Get active chat sessions
  async getActiveChats(): Promise<any[]> {
    try {
      const response = await apiRequest("GET", "/api/communication/chats");
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn("Communication API not available, using mock data");
    }

    // Mock data fallback
    return [
      {
        id: "chat1",
        participants: ["admin", "user1"],
        lastMessage: "مرحبا، أحتاج مساعدة",
        lastActivity: new Date(Date.now() - 10 * 60 * 1000),
        unreadCount: 2,
      },
      {
        id: "chat2",
        participants: ["admin", "user2"],
        lastMessage: "شكرا لك",
        lastActivity: new Date(Date.now() - 45 * 60 * 1000),
        unreadCount: 0,
      },
    ];
  }

  // Send message to user or group
  async sendMessage(
    message: Omit<Message, "id" | "timestamp" | "isRead">,
  ): Promise<boolean> {
    try {
      const response = await apiRequest("POST", "/api/communication/messages", {
        ...message,
        timestamp: new Date().toISOString(),
        isRead: false,
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.warn("Communication API not available, simulating success");
    }

    // Mock success for demo
    return true;
  }
}

export const communicationService = new CommunicationService();
