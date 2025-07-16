import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "./chat-provider";
import { Badge } from "@/components/ui/badge";

export default function ChatButton() {
  const { openChat, isOpen, unreadCount } = useChat();

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <Button
        onClick={() => openChat()}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <Badge
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full p-0"
            variant="destructive"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}