import React from 'react';
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
        />
      )}

      <CountdownTimer isOpen={gameWon || (gameLost && showMovie)} />
    </>
  );
};