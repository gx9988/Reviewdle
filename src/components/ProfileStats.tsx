import { User } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const ProfileStats = () => {
  const streak = parseInt(localStorage.getItem('streak') || '0');

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
          <User className="w-4 h-4" />
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