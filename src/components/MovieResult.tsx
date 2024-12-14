import React from "react";

interface MovieResultProps {
  movie: {
    title: string;
    year: number;
    starring: string;
    reviewByGod: string;
    rating: string;
  };
  handleShare: () => void;
}

export const MovieResult = ({ movie, handleShare }: MovieResultProps) => {
  return (
    <div className="mt-6 sm:mt-8 bg-card p-4 sm:p-6 rounded-lg shadow-lg animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          🎬 {movie.title} ({movie.year})
        </h2>
        <p className="text-muted-foreground mb-4">
          Starring: {movie.starring}
        </p>
      </div>
      <div className="bg-background/50 p-3 sm:p-4 rounded">
        <p className="mb-2 text-center">{movie.reviewByGod}</p>
        <p className="text-right text-yellow-500 font-bold">
          {movie.rating}
        </p>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handleShare}
          className="px-5 sm:px-6 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity"
        >
          Share
        </button>
      </div>
    </div>
  );
};