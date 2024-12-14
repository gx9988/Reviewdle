import { UserRound } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ProfileStats = () => {
  const streak = parseInt(localStorage.getItem('streak') || '0');
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <HoverCard open={isMobile ? isOpen : undefined}>
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          onClick={() => isMobile && setIsOpen(!isOpen)}
        >
          <UserRound className="w-4 h-4" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-48">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Your Stats</h4>
          <div className="text-sm">
            <p className="text-muted-foreground">Current Streak: {streak} days</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};