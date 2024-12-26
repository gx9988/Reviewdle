import React, { useState, useEffect } from 'react';
import { MovieReview } from "./MovieReview";
import { GuessInput } from "./GuessInput";
import { MovieResult } from "./MovieResult";
import { LostGameState } from "./LostGameState";
import { CountdownTimer } from "./CountdownTimer";
import { generateUniqueMessage } from "@/utils/messageGenerator";
import { toast } from "@/hooks/use-toast";

interface Movie {
  title: string;
  year: number;
  starring: string;
  reviews: string[];
  reviewByGod: string;
  rating: string;
}

interface GameLogicProps {
  movie: Movie;
  gameState: {
    attempts: number;
    gameWon: boolean;
    gameLost: boolean;
    guess: string;
    showMovie: boolean;
    wrongGuessMessage: string;
  };
  handlers: {
    setGuess: (guess: string) => void;
    makeGuess: () => void;
    onReveal: () => void;
  };
  maxAttempts: number;
}

export const GameLogic = ({ 
  movie, 
  gameState, 
  handlers,
  maxAttempts 
}: GameLogicProps) => {
  const { attempts, gameWon, gameLost, guess, showMovie, wrongGuessMessage } = gameState;
  const { setGuess, makeGuess, onReveal } = handlers;
  const [hasRated, setHasRated] = useState(() => {
    const savedRating = localStorage.getItem('hasRated');
    return savedRating === 'true';
  });

  const handleRating = (isPositive: boolean) => {
    toast({
      title: "Thanks for rating!",
      description: isPositive ? "Glad you enjoyed it!" : "We'll try to do better next time!",
    });
    setHasRated(true);
    localStorage.setItem('hasRated', 'true');
  };

  // Reset rating when a new day starts
  useEffect(() => {
    const currentDate = localStorage.getItem('lastPlayedDate');
    const today = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York' });
    
    if (currentDate !== today) {
      localStorage.removeItem('hasRated');
      setHasRated(false);
    }
  }, []);

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
        <LostGameState onReveal={onReveal} />
      )}

      {(gameWon || (gameLost && showMovie)) && (
        <MovieResult
          movie={movie}
          isWin={gameWon}
          onRate={handleRating}
          hasRated={hasRated}
        />
      )}

      <CountdownTimer isOpen={(gameWon || (gameLost && showMovie)) && hasRated} />
    </>
  );
};