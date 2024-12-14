import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { MovieReview } from "./MovieReview";
import { GuessInput } from "./GuessInput";
import { MovieResult } from "./MovieResult";
import { generateUniqueMessage } from "@/utils/messageGenerator";
import { supabase } from "@/integrations/supabase/client";

interface Movie {
  title: string;
  year: number;
  starring: string;
  reviews: string[];
  reviewByGod: string;
  rating: string;
}

interface GameContainerProps {
  movie: Movie;
}

export const GameContainer = ({ movie }: GameContainerProps) => {
  const [attempts, setAttempts] = useState(1);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [guess, setGuess] = useState("");
  const [showMovie, setShowMovie] = useState(false);
  const [wrongGuessMessage, setWrongGuessMessage] = useState<string>("");
  const [session, setSession] = useState<any>(null);
  const maxAttempts = 5;

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
      
      // If last played was yesterday, increment streak
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

  const makeGuess = async () => {
    if (!guess.trim()) return;

    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    
    if (lastPlayedDate === currentDate && (gameWon || gameLost)) {
      toast({
        title: "Already Played",
        description: "Come back tomorrow for a new movie!",
        variant: "destructive",
      });
      return;
    }

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = movie.title.trim().toLowerCase();

    if (normalizedGuess === normalizedTitle) {
      setGameWon(true);
      setShowMovie(true);
      setWrongGuessMessage("");
      await updateStreak();
      toast({
        title: "Correct!",
        description: "The Reviewdle God is impressed! Come back tomorrow for another movie!",
        variant: "default",
      });
      saveGameState();
    } else {
      if (attempts + 1 > maxAttempts) {
        setGameLost(true);
        await resetStreakOnLoss();
        saveGameState();
      } else {
        setAttempts(prev => prev + 1);
        const uniqueMessage = generateUniqueMessage(Date.now(), attempts);
        setWrongGuessMessage(uniqueMessage);
      }
    }
    setGuess("");
  };

  const handleReveal = () => {
    setShowMovie(true);
  };

  return (
    <>
      <MovieReview 
        attempt={attempts}
        maxAttempts={maxAttempts}
        review={movie.reviews[attempts - 1]}
      />

      {!gameWon && !gameLost && (
        <GuessInput
          guess={guess}
          setGuess={setGuess}
          makeGuess={makeGuess}
          wrongGuessMessage={wrongGuessMessage}
          attempt={attempts}
          maxAttempts={maxAttempts}
        />
      )}

      {gameLost && !showMovie && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleReveal}
            className="px-6 sm:px-8 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity"
          >
            Reveal Movie
          </button>
        </div>
      )}

      {(gameWon || (gameLost && showMovie)) && (
        <MovieResult
          movie={movie}
          isWin={gameWon}
        />
      )}
    </>
  );
};