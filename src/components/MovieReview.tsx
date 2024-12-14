import React from "react";

interface MovieReviewProps {
  attempt: number;
  maxAttempts: number;
  review: string;
}

export const MovieReview = ({ attempt, maxAttempts, review }: MovieReviewProps) => {
  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg mb-8 sm:mb-10 border-2 border-accent">
      <p className="text-lg sm:text-xl mb-3 sm:mb-4 text-center font-semibold">
        <strong>{attempt === maxAttempts ? "Final Hint:" : "Review:"}</strong>
      </p>
      <p className="text-base sm:text-lg text-card-foreground text-center font-serif italic">{review}</p>
    </div>
  );
};