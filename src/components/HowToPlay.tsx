import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const HowToPlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <HoverCard open={isMobile ? isOpen : undefined}>
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          onClick={() => isMobile && setIsOpen(!isOpen)}
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">How to Play 🎮</h4>
          <div className="text-sm space-y-1.5">
            <p>1. 🎬 Read the movie review hint carefully</p>
            <p>2. ✨ You get 5 chances to guess the right movie</p>
            <p>3. 🔍 Each try reveals a new review clue</p>
            <p>4. ⌨️ Type your movie guess and hit enter</p>
            <p>5. 🌟 Come back tomorrow for a new challenge!</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};