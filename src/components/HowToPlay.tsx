import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HelpCircle } from "lucide-react";

export const HowToPlay = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
          <HelpCircle className="w-4 h-4" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">How to Play</h4>
          <div className="text-sm space-y-1.5">
            <p>1. Read the movie review hint carefully</p>
            <p>2. You have 5 attempts to guess the correct movie</p>
            <p>3. Each attempt reveals a new review hint</p>
            <p>4. Type your guess and press enter or click submit</p>
            <p>5. Come back daily for a new movie!</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};