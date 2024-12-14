import React from "react";

interface GuessInputProps {
  guess: string;
  setGuess: (guess: string) => void;
  makeGuess: () => void;
  wrongGuessMessage?: string;
}

export const GuessInput = ({ guess, setGuess, makeGuess, wrongGuessMessage }: GuessInputProps) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
        placeholder="Enter your guess here"
        className="w-full max-w-md px-3 sm:px-4 py-2 rounded bg-input text-foreground border border-border"
      />
      <button
        onClick={makeGuess}
        className="px-6 sm:px-8 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
      >
        Guess
      </button>
      {wrongGuessMessage && (
        <p className="text-destructive text-sm animate-fade-in italic">
          {wrongGuessMessage}
        </p>
      )}
    </div>
  );
};