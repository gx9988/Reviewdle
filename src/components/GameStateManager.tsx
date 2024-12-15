import React from "react";
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
  const checkGameState = () => {
    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    
    if (lastPlayedDate === currentDate && (gameWon || gameLost)) {
      toast({
        title: "Already Played",
        description: "Come back tomorrow for a new movie!",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return <>{children}</>;
};