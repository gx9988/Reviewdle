import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface GameStateManagerProps {
  gameWon: boolean;
  gameLost: boolean;
  getESTDate: () => string;
  children: React.ReactNode;
}

export const GameStateManager = ({ 
  gameWon, 
  gameLost, 
  getESTDate, 
  children 
}: GameStateManagerProps) => {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    
    if (lastPlayedDate === currentDate && gameState.gameWon) {
      setHasPlayed(true);
      toast({
        title: "Already Played",
        description: "Come back tomorrow for a new movie!",
        variant: "destructive",
      });
    }
  }, [gameWon, gameLost, getESTDate]);

  if (hasPlayed) {
    return (
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-md z-10 flex items-center justify-center">
          <div className="bg-background/90 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">You've already played today!</h2>
            <p className="text-blue-500">Come back tomorrow for a new movie!</p>
          </div>
        </div>
        <div className="opacity-20">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};