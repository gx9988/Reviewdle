import React from "react";
import { generateEncouragement } from "@/utils/encouragementGenerator";

interface LostGameStateProps {
  onReveal: () => void;
}

export const LostGameState = ({ onReveal }: LostGameStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <p className="text-center text-[#ff0000]">
        {generateEncouragement(Date.now())}
      </p>
      <button
        onClick={onReveal}
        className="px-6 sm:px-8 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity"
      >
        Reveal Movie
      </button>
    </div>
  );
};