import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Send,
  UserCircle,
  X,
  Loader2,
  MessageCircle,
  Clock,
  ArrowUpDown,
  Eye,
  File as FileIcon,
  Download as DownloadIcon
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatMessage {
  id: string | number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
  read: boolean;
  isTyping?: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'file';
  sender?: {
    id: number;
    name: string;
    imageUrl?: string;
    role: string;
  };
  receiver?: {
    id: number;
    name: string;
    imageUrl?: string;
    role: string;
  };
}

interface Contact {
  id: number;
  name: string;
  imageUrl?: string;
  role: string;
  lastMessage?: string;
  lastMessageDate?: Date;
  unreadCount?: number;
  online?: boolean;
}

interface ChatInterfaceProps {
  minimized?: boolean;
  onMinimize?: () => void;
  onClose?: () => void;
  initialContactId?: number;
}

export default function ChatInterface({ 
  minimized = false, 
  onMinimize, 
  onClose,
  initialContactId
}: ChatInterfaceProps) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [contactTyping, setContactTyping] = useState<number | null>(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  
  // Initialize WebSocket connection
  useEffect(() => {
    // Don't initialize WebSocket if user is not logged in
    if (!user) {
      return;
    }

    // Don't initialize WebSocket on setup profile page
    if (window.location.pathname === "/setup-profile") {
      return;
    }

    console.log("Initializing WebSocket connection");
    
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host || "localhost:3001";
    const wsUrl = `${protocol}//${host}/ws`;
    
    console.log("WebSocket URL:", wsUrl);
    
    // Validate URL before creating WebSocket
    if (!wsUrl || wsUrl.includes("undefined")) {
      console.error("Invalid WebSocket URL:", wsUrl);
      return;
    }
    
    let newSocket: WebSocket | null = null;
    
    try {
      newSocket = new WebSocket(wsUrl);
      
      newSocket.onopen = () => {
        console.log("WebSocket connection established");
        // Authenticate WebSocket connection
        if (newSocket && newSocket.readyState === WebSocket.OPEN) {
          try {
            // Send auth message even for visitors/anonymous users
            newSocket.send(JSON.stringify({
              type: "auth",
              userId: user?.id || 0,
              role: user?.role || "visitor"
            }));
            console.log("Auth message sent successfully");
          } catch (error) {
            console.error("Error sending auth message:", error);
          }
        } else {
          console.log("Socket ready state:", newSocket?.readyState);
          console.log("User authenticated:", !!user);
        }
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      return;
    }
    
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === "message") {
        // Handle new message
        const newMessage: ChatMessage = {
          id: data.id || Date.now(),
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          timestamp: new Date(data.timestamp || Date.now()),
          read: false,
          sender: data.sender
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Update contact's last message if it's from the current contact
        if (selectedContact && data.senderId === selectedContact.id) {
          setContacts(prev => 
            prev.map(contact => 
              contact.id === data.senderId 
                ? { 
                    ...contact, 
                    lastMessage: data.content,
                    lastMessageDate: new Date(data.timestamp || Date.now()),
                    unreadCount: 0 // Mark as read since chat is open
                  } 
                : contact
            )
          );
        } else {
          // Increment unread count for other contacts
          setContacts(prev => 
            prev.map(contact => 
              contact.id === data.senderId 
                ? { 
                    ...contact, 
                    lastMessage: data.content,
                    lastMessageDate: new Date(data.timestamp || Date.now()),
                    unreadCount: (contact.unreadCount || 0) + 1
                  } 
                : contact
            )
          );
        }
      } else if (data.type === "status") {
        // Handle user status updates (online/offline)
        setContacts(prev => 
          prev.map(contact => 
            contact.id === data.userId 
              ? { ...contact, online: data.status === "online" } 
              : contact
          )
        );
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };
    
    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    
    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    
    setSocket(newSocket);
    
    return () => {
      if (newSocket && newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [user]);

  // Close WebSocket when user logs out
  useEffect(() => {
    if (!user && socket) {
      console.log("User logged out, closing WebSocket connection");
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
      setSocket(null);
    }
  }, [user, socket]);
  
  // Load contacts and initial messages
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        // Dummy contacts data for now
        // In a real app, fetch from API
        const dummyContacts: Contact[] = [
          {
            id: 1,
            name: "محمد عبدالله",
            role: "talent",
            imageUrl: "",
            lastMessage: "متى موعد المباراة القادمة؟",
            lastMessageDate: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            unreadCount: 2,
            online: true
          },
          {
            id: 2,
            name: "نادي الهلال",
            role: "club",
            imageUrl: "",
            lastMessage: "نرغب في التعاقد معك للموسم القادم",
            lastMessageDate: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            unreadCount: 0,
            online: true
          },
          {
            id: 3,
            name: "د. أحمد خالد",
            role: "doctor",
            imageUrl: "",
            lastMessage: "تقرير الفحص الطبي جاهز",
            lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            unreadCount: 1,
            online: false
          }
        ];
        
        setContacts(dummyContacts);
        
        // If initialContactId is provided, select that contact
        if (initialContactId) {
          const contact = dummyContacts.find(c => c.id === initialContactId);
          if (contact) {
            setSelectedContact(contact);
            loadMessages(contact);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading contacts:", error);
        setLoading(false);
      }
    };
    
    // Load contacts for both logged in users and visitors
    loadContacts();
  }, [user, initialContactId]);
  
  // Load messages for a contact
  const loadMessages = async (contact: Contact) => {
    setLoading(true);
    try {
      // Dummy messages for now
      // In a real app, fetch from API based on contactId
      const dummyMessages: ChatMessage[] = [
        {
          id: 1,
          senderId: user?.id || 0,
          receiverId: contact.id,
          content: "السلام عليكم",
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          read: true
        },
        {
          id: 2,
          senderId: contact.id,
          receiverId: user?.id || 0,
          content: "وعليكم السلام، كيف حالك؟",
          timestamp: new Date(Date.now() - 1000 * 60 * 9),
          read: true,
          sender: {
            id: contact.id,
            name: contact.name,
            imageUrl: contact.imageUrl,
            role: contact.role
          }
        },
        {
          id: 3,
          senderId: user?.id || 0,
          receiverId: contact.id,
          content: "بخير الحمد لله، هل لديك أي أخبار جديدة؟",
          timestamp: new Date(Date.now() - 1000 * 60 * 8),
          read: true
        },
        {
          id: 4,
          senderId: contact.id,
          receiverId: user?.id || 0,
          content: contact.lastMessage || "نعم، هناك تطورات جديدة...",
          timestamp: contact.lastMessageDate || new Date(Date.now() - 1000 * 60 * 5),
          read: contact.unreadCount === 0,
          sender: {
            id: contact.id,
            name: contact.name,
            imageUrl: contact.imageUrl,
            role: contact.role
          }
        }
      ];
      
      setMessages(dummyMessages);
      
      // Mark messages as read
      if (contact.unreadCount && contact.unreadCount > 0) {
        setContacts(prev => 
          prev.map(c => 
            c.id === contact.id 
              ? { ...c, unreadCount: 0 } 
              : c
          )
        );
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading messages:", error);
      setLoading(false);
    }
  };
  
  // Handle contact selection
  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    loadMessages(contact);
  };
  
  // Handle typing status
  const handleTyping = (isUserTyping: boolean) => {
    if (!selectedContact || !socket) return;
    
    if (isUserTyping !== isTyping) {
      setIsTyping(isUserTyping);
      
      // Send typing status via WebSocket (even for anonymous users)
      if (socket.readyState === WebSocket.OPEN) {
        try {
          socket.send(JSON.stringify({
            type: "typing",
            senderId: user?.id || 0,
            receiverId: selectedContact.id,
            isTyping: isUserTyping,
            role: user?.role || "visitor"
          }));
        } catch (error) {
          console.error("Error sending typing status:", error);
        }
      }
    }
  };
  
  // Handle input change with typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set typing status to true
    handleTyping(true);
    
    // Set a timeout to set typing status to false after 2 seconds of inactivity
    const timeout = setTimeout(() => {
      handleTyping(false);
    }, 2000);
    
    setTypingTimeout(timeout);
  };
  
  // Update WebSocket message handler to include typing status
  useEffect(() => {
    if (!socket) return;
    
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === "typing") {
          // Handle typing status update
          if (data.senderId) {
            setContactTyping(data.isTyping ? data.senderId : null);
          }
        } else if (data.type === "message") {
          // Handle new message
          const newMessage: ChatMessage = {
            id: data.id || Date.now(),
            senderId: data.senderId,
            receiverId: data.receiverId,
            content: data.content,
            timestamp: new Date(data.timestamp || Date.now()),
            read: false,
            sender: data.sender,
            mediaUrl: data.mediaUrl,
            mediaType: data.mediaType
          };
          
          setMessages(prev => [...prev, newMessage]);
          
          // When receiving a message, clear typing indicator
          if (data.senderId) {
            setContactTyping(null);
          }
          
          // Update contact's last message
          updateContactLastMessage(data.senderId, data.content, new Date(data.timestamp || Date.now()));
        }
      } catch (error) {
        console.error("Error handling message:", error);
      }
    };
    
    socket.addEventListener("message", handleMessage);
    
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, selectedContact]);
  
  // Helper function to update contact's last message
  const updateContactLastMessage = (senderId: number, content: string, timestamp: Date) => {
    if (selectedContact && senderId === selectedContact.id) {
      setContacts(prev => 
        prev.map(contact => 
          contact.id === senderId 
            ? { 
                ...contact, 
                lastMessage: content,
                lastMessageDate: timestamp,
                unreadCount: 0 // Mark as read since chat is open
              } 
            : contact
        )
      );
    } else {
      // Increment unread count for other contacts
      setContacts(prev => 
        prev.map(contact => 
          contact.id === senderId 
            ? { 
                ...contact, 
                lastMessage: content,
                lastMessageDate: timestamp,
                unreadCount: (contact.unreadCount || 0) + 1
              } 
            : contact
        )
      );
    }
  };
  
  // Handle sending a message
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !selectedContact || !socket) return;
    
    const file = e.target.files[0];
    setMediaUploading(true);
    
    // In a real application, upload to a server and get URL
    // For now, we'll simulate by creating a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      const imageUrl = event.target.result.toString();
      
      // Send image message
      sendMediaMessage(imageUrl, "image", file.name);
      setMediaUploading(false);
    };
    
    reader.onerror = () => {
      console.error("Error reading file");
      setMediaUploading(false);
    };
    
    reader.readAsDataURL(file);
    
    // Reset input to allow selecting the same file again
    e.target.value = "";
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !selectedContact || !socket) return;
    
    const file = e.target.files[0];
    setMediaUploading(true);
    
    // In a real application, upload to a server and get URL
    // For now, we'll just use the filename
    sendMediaMessage(`ملف: ${file.name}`, "file", file.name);
    setMediaUploading(false);
    
    // Reset input
    e.target.value = "";
  };
  
  // Send media message (image or file)
  const sendMediaMessage = (content: string, mediaType: 'image' | 'file', mediaName: string) => {
    if (!selectedContact || !socket) return;
    
    // Create new message object with media - support anonymous users (userId = 0)
    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: user?.id || 0,
      receiverId: selectedContact.id,
      content: mediaType === "image" ? "أرسل صورة" : `أرسل ملف: ${mediaName}`,
      timestamp: new Date(),
      read: false,
      mediaUrl: content,
      mediaType: mediaType
    };
    
    // Add to local messages
    setMessages(prev => [...prev, newMessage]);
    
    // Update contact last message
    setContacts(prev => 
      prev.map(contact => 
        contact.id === selectedContact.id 
          ? { 
              ...contact, 
              lastMessage: mediaType === "image" ? "صورة" : "ملف",
              lastMessageDate: new Date()
            } 
          : contact
      )
    );
    
    // Send via WebSocket
    if (socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify({
          type: "message",
          senderId: user?.id || 0,
          receiverId: selectedContact.id,
          content: newMessage.content,
          mediaUrl: content,
          mediaType: mediaType,
          timestamp: new Date(),
          role: user?.role || "visitor"
        }));
        console.log("Media message sent successfully");
      } catch (error) {
        console.error("Error sending media message:", error);
      }
    }
  };
  
  // Handle sending text message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact || !socket) return;
    
    // Create new message object - allow even for guests with userId = 0
    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: user?.id || 0,
      receiverId: selectedContact.id,
      content: message,
      timestamp: new Date(),
      read: false
    };
    
    // Add to local messages
    setMessages(prev => [...prev, newMessage]);
    
    // Update contact last message
    setContacts(prev => 
      prev.map(contact => 
        contact.id === selectedContact.id 
          ? { 
              ...contact, 
              lastMessage: message,
              lastMessageDate: new Date()
            } 
          : contact
      )
    );
    
    // Send via WebSocket
    if (socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify({
          type: "message",
          senderId: user?.id || 0,
          receiverId: selectedContact.id,
          content: message,
          timestamp: new Date(),
          role: user?.role || "visitor"
        }));
        console.log("Message sent successfully");
        
        // Reset typing status if user is logged in
        if (user) {
          handleTyping(false);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("WebSocket not open. Current state:", socket.readyState);
    }
    
    // Clear input
    setMessage("");
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // If minimized, show only the header
  if (minimized) {
    return (
      <div className="fixed bottom-0 left-4 z-50 w-72 rounded-t-lg border bg-background shadow-lg">
        <div 
          className="flex h-12 cursor-pointer items-center justify-between rounded-t-lg bg-primary px-4 text-primary-foreground"
          onClick={onMinimize}
        >
          <div className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            <span className="font-medium">المحادثات</span>
            {contacts.reduce((total, contact) => total + (contact.unreadCount || 0), 0) > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contacts.reduce((total, contact) => total + (contact.unreadCount || 0), 0)}
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-primary-foreground" onClick={onMinimize}>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-primary-foreground" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-0 left-4 z-50 flex w-80 flex-col rounded-t-lg border bg-background shadow-xl">
      {/* Chat header */}
      <div 
        className="flex h-14 cursor-pointer items-center justify-between rounded-t-lg bg-gradient-to-l from-primary to-blue-700 px-4 text-primary-foreground"
        onClick={onMinimize}
      >
        <div className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          <span className="font-medium text-base">المحادثات</span>
          {contacts.reduce((total, contact) => total + (contact.unreadCount || 0), 0) > 0 && (
            <Badge variant="secondary" className="ml-2 bg-white text-primary">
              {contacts.reduce((total, contact) => total + (contact.unreadCount || 0), 0)}
            </Badge>
          )}
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary-foreground opacity-80 hover:opacity-100 hover:bg-primary-foreground/10" onClick={onMinimize}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary-foreground opacity-80 hover:opacity-100 hover:bg-primary-foreground/10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex h-[400px] flex-col">
        {selectedContact ? (
          <>
            {/* Selected contact header */}
            <div className="flex h-14 items-center justify-between border-b bg-muted px-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={selectedContact.imageUrl} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedContact.name}</span>
                    {selectedContact.online && (
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selectedContact.role === "talent" && "لاعب"}
                    {selectedContact.role === "coach" && "مدرب"}
                    {selectedContact.role === "club" && "نادي"}
                    {selectedContact.role === "agent" && "وكيل"}
                    {selectedContact.role === "doctor" && "طبيب"}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setSelectedContact(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <MessageCircle className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">لا توجد رسائل</p>
                  <p className="text-xs text-muted-foreground">ابدأ محادثة جديدة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                    >
                      {msg.senderId !== user?.id && (
                        <Avatar className="ml-2 h-8 w-8 self-end">
                          <AvatarImage src={selectedContact.imageUrl} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 ${
                          msg.senderId === user?.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.mediaType === 'image' ? (
                          <div className="message-with-media">
                            <p className="text-sm mb-2">{msg.content}</p>
                            <div className="relative rounded-md overflow-hidden mb-2">
                              <img 
                                src={msg.mediaUrl} 
                                alt="صورة" 
                                className="max-w-full rounded-md max-h-[200px] object-contain bg-black/10" 
                                onClick={() => window.open(msg.mediaUrl, '_blank')}
                              />
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                                <Eye className="h-8 w-8 text-white drop-shadow-md" />
                              </div>
                            </div>
                          </div>
                        ) : msg.mediaType === 'file' ? (
                          <div className="message-with-media">
                            <p className="text-sm mb-2">{msg.content}</p>
                            <div 
                              className="flex items-center bg-black/10 rounded-md p-2 gap-2 cursor-pointer hover:bg-black/20 transition-all"
                              onClick={() => window.open(msg.mediaUrl, '_blank')}
                            >
                              <FileIcon className="h-5 w-5" />
                              <span className="text-xs truncate">{msg.mediaUrl?.split(': ')[1] || msg.mediaUrl}</span>
                              <DownloadIcon className="h-4 w-4 ml-auto" />
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                        <div className="mt-1 flex items-center justify-end">
                          <span className="text-[10px] opacity-70">
                            {msg.timestamp.toLocaleTimeString("ar-SA", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                          {msg.senderId === user?.id && (
                            <span className="ml-1">
                              {msg.read ? (
                                <svg 
                                  viewBox="0 0 16 16" 
                                  className="h-3 w-3 fill-current opacity-70"
                                >
                                  <path d="M11.3 4.3L8 7.6 4.7 4.3 3.3 5.7 8 10.4l4.7-4.7z" />
                                </svg>
                              ) : (
                                <Clock className="h-3 w-3 opacity-70" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Message input */}
            <div className="border-t p-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                    disabled={mediaUploading}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10"
                    title="إرسال صورة"
                    disabled={mediaUploading}
                  >
                    <label htmlFor="image-upload" className={`cursor-pointer ${mediaUploading ? 'opacity-50' : ''}`}>
                      <input 
                        type="file" 
                        id="image-upload" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={mediaUploading}
                      />
                      {mediaUploading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg==" className="h-5 w-5" alt="إرسال صورة" />
                      )}
                    </label>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10"
                    title="إرسال ملف"
                    disabled={mediaUploading}
                  >
                    <label htmlFor="file-upload" className={`cursor-pointer ${mediaUploading ? 'opacity-50' : ''}`}>
                      <input 
                        type="file" 
                        id="file-upload" 
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={mediaUploading}
                      />
                      {mediaUploading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhcGVyY2xpcCI+PHBhdGggZD0ibTIxLjQ0IDE4LjU1LTkuMiA5LjE5QTguMDggOC4wOCAwIDAgMSAxLjEyIDI1LjlhOCA4IDAgMCAxIDEuNjMtOSNhMTEuNzEgMTEuNzEgMCAwIDAgNS4xMy0yLjYybS00LjgzIDQuOTZhOS4wNiA5LjA2IDAgMCAxLjk0LTEwLjUiLz48cGF0aCBkPSJNMTAuNTkgMTMuNWwzLjk1IDMuOTUiLz48cGF0aCBkPSJNMTcuNDUgNy44bC4yLjItNC44OC0yLjQ2YTkuMDggOS4wOCAwIDAgMC05LjQ1IDEuNjNMMyA3LjE5QTIuMjUgMi4yNSAwIDAgMCAzLjY0IDExbDYuMzMgNi4zMyIvPjxwYXRoIGQ9Im01LjMyIDcuMTkuMTguMThMMTIuMTQgMTRBMi4yNCAyLjI0IDAgMSAwIDE2IDEwLjIzIi8+PC9zdmc+" className="h-5 w-5" alt="إرسال ملف" />
                      )}
                    </label>
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!message.trim() || mediaUploading}
                    className="h-10 w-10 bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div id="typing-indicator" className="text-xs text-muted-foreground italic h-4 px-2">
                  {contactTyping === selectedContact?.id && (
                    <div className="flex items-center">
                      <span className="ml-1">جاري الكتابة</span>
                      <span className="typing-animation">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Contacts list
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <UserCircle className="h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">لا توجد جهات اتصال</p>
              </div>
            ) : (
              <div>
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="cursor-pointer border-b hover:bg-muted"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={contact.imageUrl} alt={contact.name} />
                            <AvatarFallback>{contact.name[0]}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="line-clamp-1 text-xs text-muted-foreground">
                            {contact.lastMessage || "بدء محادثة جديدة"}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {contact.lastMessageDate && (
                          <span className="text-xs text-muted-foreground">
                            {formatMessageTime(contact.lastMessageDate)}
                          </span>
                        )}
                        {contact.unreadCount && contact.unreadCount > 0 ? (
                          <Badge className="mt-1">
                            {contact.unreadCount}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to format time
function formatMessageTime(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit"
    });
  } else if (diffInHours < 48) {
    return "الأمس";
  } else {
    return date.toLocaleDateString("ar-SA", {
      day: "2-digit",
      month: "2-digit"
    });
  }
}