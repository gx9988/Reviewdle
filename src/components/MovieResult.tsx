import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "./ui/button";

interface MovieResultProps {
  movie: {
    title: string;
    year: number;
    starring: string;
    reviewByGod: string;
    rating: string;
  };
  isWin?: boolean;
  onRate: (isPositive: boolean) => void;
  hasRated: boolean;
}

export const MovieResult = ({ movie, isWin, onRate, hasRated }: MovieResultProps) => {
  return (
    <div className="mt-6 sm:mt-8 bg-card p-4 sm:p-6 rounded-lg shadow-lg animate-fade-in">
      {isWin && (
        <div className="mb-4 text-center animate-fade-in">
          <p className="text-lg text-green-400 font-semibold">
            Congratulations! You've guessed it correctly!
          </p>
        </div>
      )}
      <div className="text-center">
        <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${isWin ? 'text-green-400' : ''}`}>
          🎬 {movie.title} ({movie.year})
        </h2>
        <p className="text-muted-foreground mb-4">
          Starring: {movie.starring}
        </p>
      </div>
      <div className="bg-background/50 p-3 sm:p-4 rounded">
        <p className="mb-2 text-center">{movie.reviewByGod}</p>
        <p className="text-center text-yellow-500 font-bold mb-4">
          {movie.rating}
        </p>
        {!hasRated && (
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onRate(true)}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="w-5 h-5" />
              Love it
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onRate(false)}
              className="flex items-center gap-2"
            >
              <ThumbsDown className="w-5 h-5" />
              Not for me
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};