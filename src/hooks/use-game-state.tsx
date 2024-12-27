import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEstDate } from "./use-est-date";
import { useStreak } from "./use-streak";

export const useGameState = (maxAttempts: number) => {
  const [attempts, setAttempts] = useState(1);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [guess, setGuess] = useState("");
  const [showMovie, setShowMovie] = useState(false);
  const [wrongGuessMessage, setWrongGuessMessage] = useState<string>("");
  const [session, setSession] = useState<any>(null);
  const [currentMovieTitle, setCurrentMovieTitle] = useState<string>("");

  const { getESTDate } = useEstDate();
  const { updateStreak, resetStreakOnLoss } = useStreak();

  const initializeGame = () => {
    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    const lastMovieTitle = localStorage.getItem('currentMovieTitle');
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    
    // Reset if it's a new day or if the movie has changed
    if (lastPlayedDate !== currentDate || lastMovieTitle !== currentMovieTitle) {
      resetGame();
      localStorage.setItem('currentMovieTitle', currentMovieTitle);
    } else if (gameState.gameWon || gameState.gameLost) {
      displaySavedGameState(gameState);
    }
  };

  const resetGame = () => {
    setAttempts(1);
    setGameWon(false);
    setGameLost(false);
    setGuess("");
    setShowMovie(false);
    setWrongGuessMessage("");
    localStorage.removeItem('gameState');
    localStorage.removeItem('lastPlayedDate');
  };

  const displaySavedGameState = (gameState: any) => {
    setGameWon(gameState.gameWon);
    setGameLost(gameState.gameLost);
    setAttempts(gameState.attempts);
  };

  const saveGameState = () => {
    const currentDate = getESTDate();
    localStorage.setItem('lastPlayedDate', currentDate);
    localStorage.setItem('gameState', JSON.stringify({
      gameWon,
      gameLost,
      attempts
    }));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Effect to update currentMovieTitle when it changes
  useEffect(() => {
    if (currentMovieTitle) {
      initializeGame();
    }
  }, [currentMovieTitle]);

  return {
    attempts,
    setAttempts,
    gameWon,
    setGameWon,
    gameLost,
    setGameLost,
    guess,
    setGuess,
    showMovie,
    setShowMovie,
    wrongGuessMessage,
    setWrongGuessMessage,
    session,
    updateStreak: () => session?.user?.id ? updateStreak(session.user.id) : Promise.resolve(),
    resetStreakOnLoss: () => session?.user?.id ? resetStreakOnLoss(session.user.id) : Promise.resolve(),
    saveGameState,
    getESTDate,
    setCurrentMovieTitle
  };
};