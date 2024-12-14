import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useGameState = (maxAttempts: number) => {
  const [attempts, setAttempts] = useState(1);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [guess, setGuess] = useState("");
  const [showMovie, setShowMovie] = useState(false);
  const [wrongGuessMessage, setWrongGuessMessage] = useState<string>("");
  const [session, setSession] = useState<any>(null);

  const getESTDate = () => {
    const now = new Date();
    const estOffset = -5;
    const estDate = new Date(now.getTime() + estOffset * 60 * 60 * 1000);
    return estDate.toISOString().split('T')[0];
  };

  const initializeGame = () => {
    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    
    if (lastPlayedDate === currentDate && (gameState.gameWon || gameState.gameLost)) {
      displaySavedGameState(gameState);
    } else if (lastPlayedDate !== currentDate) {
      resetGame();
    }
  };

  const resetGame = () => {
    setAttempts(1);
    setGameWon(false);
    setGameLost(false);
    setGuess("");
  };

  const displaySavedGameState = (gameState: any) => {
    setGameWon(gameState.gameWon);
    setGameLost(gameState.gameLost);
    setAttempts(gameState.attempts);
  };

  const updateStreak = async () => {
    if (!session?.user?.id) return;

    const currentDate = getESTDate();
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      const lastPlayed = profile.last_played;
      const streak = profile.streak || 0;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const newStreak = lastPlayed === yesterdayStr ? streak + 1 : 1;

      await supabase
        .from('profiles')
        .update({
          streak: newStreak,
          last_played: currentDate
        })
        .eq('id', session.user.id);
    }
  };

  const resetStreakOnLoss = async () => {
    if (!session?.user?.id) return;

    await supabase
      .from('profiles')
      .update({
        streak: 0,
        last_played: getESTDate()
      })
      .eq('id', session.user.id);
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
    initializeGame();
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
    updateStreak,
    resetStreakOnLoss,
    saveGameState,
    getESTDate
  };
};