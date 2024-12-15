import React from "react";

interface MovieReviewProps {
  attempt: number;
  maxAttempts: number;
  review: string;
}

export const MovieReview = ({ attempt, maxAttempts, review }: MovieReviewProps) => {
  return (
    <div className="bg-card p-3 sm:p-4 rounded-lg shadow-lg mb-4 sm:mb-6 border-2 border-accent">
      <p className="text-base sm:text-lg mb-2 sm:mb-3 text-center font-serif">
        <strong className="text-blue-500">
          {attempt === maxAttempts 
            ? "Final Hint:" 
            : `Movie Review Hint ${attempt}:`}
        </strong>
      </p>
      <div className="text-base sm:text-lg text-card-foreground text-center font-serif italic">
        <p className="mt-2">"{review}"</p>
      </div>
    </div>
  );
};