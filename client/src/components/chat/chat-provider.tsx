import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import ChatInterface from "./chat-interface";

interface ChatProviderProps {
  children: ReactNode;
}

interface ChatContextType {
  openChat: (contactId?: number) => void;
  closeChat: () => void;
  toggleChat: () => void;
  isOpen: boolean;
  isMinimized: boolean;
  unreadCount: number;
}

const ChatContext = createContext<ChatContextType>({
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
  isOpen: false,
  isMinimized: true,
  unreadCount: 0,
});

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [selectedContactId, setSelectedContactId] = useState<number | undefined>(undefined);
  const [unreadCount, setUnreadCount] = useState(3); // Initial demo value
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    console.log("ChatProvider: Initializing WebSocket connection");
    
    // We'll let ChatInterface handle the actual WebSocket connection
    // to avoid duplicating connections
  }, []);

  const openChat = (contactId?: number) => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0); // Reset unread count when opening chat
    
    if (contactId) {
      setSelectedContactId(contactId);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const toggleChat = () => {
    if (isMinimized) {
      setUnreadCount(0); // Reset unread count when maximizing
    }
    setIsMinimized(!isMinimized);
  };

  return (
    <ChatContext.Provider
      value={{
        openChat,
        closeChat,
        toggleChat,
        isOpen,
        isMinimized,
        unreadCount,
      }}
    >
      {children}
      {isOpen && (
        <ChatInterface
          minimized={isMinimized}
          onMinimize={toggleChat}
          onClose={closeChat}
          initialContactId={selectedContactId}
        />
      )}
    </ChatContext.Provider>
  );
}