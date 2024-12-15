import React from "react";

interface GuessInputProps {
  guess: string;
  setGuess: (guess: string) => void;
  makeGuess: () => void;
  wrongGuessMessage?: string;
  attempt: number;
  maxAttempts: number;
}

export const GuessInput = ({ 
  guess, 
  setGuess, 
  makeGuess, 
  wrongGuessMessage,
  attempt,
  maxAttempts 
}: GuessInputProps) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 bg-secondary/20 p-6 rounded-lg shadow-md">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
        placeholder="Enter your guess here"
        className="w-full max-w-md px-3 sm:px-4 py-2 rounded bg-input text-foreground border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
      />
      <div className="flex items-center gap-4 w-full max-w-md justify-center">
        <span className="text-sm text-muted-foreground">
          Attempt {attempt} of {maxAttempts}
        </span>
        <button
          onClick={makeGuess}
          className="px-6 sm:px-8 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
        >
          Guess
        </button>
      </div>
      {wrongGuessMessage && (
        <p className="text-[#ff0000] text-sm animate-fade-in italic mt-2">
          {wrongGuessMessage}
        </p>
      )}
    </div>
  );
};