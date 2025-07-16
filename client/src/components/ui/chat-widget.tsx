import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { MessageSquare, X, Send } from "lucide-react";

// Define the chat message type
interface ChatMessage {
  id: number;
  userId: number;
  message: string;
  isFromUser: boolean;
  timestamp: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Get or set user ID from local storage
  useEffect(() => {
    const storedUserId = localStorage.getItem("chatUserId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  // Query for chat messages
  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat', userId],
    enabled: isOpen && userId !== undefined,
  });

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        userId,
        message: newMessage,
        isFromUser: true
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat', userId] });
      setMessage("");
    }
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send initial welcome message when chat is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0 && userId !== undefined) {
      sendMessageMutation.mutate("مرحبًا، أرغب في معرفة المزيد عن منصة Soccer Hunter.");
    }
  }, [isOpen, messages.length, userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 shadow-xl animate-in slide-in-from-bottom-10 duration-300">
          <CardHeader className="bg-primary-600 text-white p-4 flex flex-row justify-between items-center">
            <div>
              <h3 className="font-medium">الدعم المباشر</h3>
              <p className="text-sm text-primary-100 mt-1">تواصل معنا لأي استفسار عن Soccer Hunter</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat} 
              className="text-white hover:bg-primary-700 h-8 w-8"
            >
              <X size={18} />
            </Button>
          </CardHeader>
          <ScrollArea className="h-80 p-4 bg-gray-50">
            <div className="flex flex-col space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.isFromUser ? 'justify-end' : ''}`}>
                  {!msg.isFromUser && (
                    <Avatar className="h-8 w-8 mr-2 bg-primary-100">
                      <AvatarFallback className="bg-primary-100 text-primary-600">AC</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`py-2 px-3 rounded-lg shadow-sm max-w-[80%] ${
                    msg.isFromUser 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-700'
                  }`}>
                    <p className="text-sm">
                      {msg.message}
                    </p>
                    <span className={`text-xs block mt-1 ${
                      msg.isFromUser ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.isFromUser && (
                    <Avatar className="h-8 w-8 ml-2 bg-primary-600">
                      <AvatarFallback className="bg-primary-600 text-white">U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <CardFooter className="p-4 border-t bg-white">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!message.trim() || sendMessageMutation.isPending}
              >
                <Send size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      
      <Button
        onClick={toggleChat}
        className="rounded-full h-14 w-14 shadow-lg"
        size="icon"
      >
        <MessageSquare size={24} />
      </Button>
    </div>
  );
}

export default ChatWidget;
