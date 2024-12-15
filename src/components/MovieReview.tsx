import React, { useState, useEffect } from "react";

interface MovieReviewProps {
  attempt: number;
  maxAttempts: number;
  review: string;
}

export const MovieReview = ({ attempt, maxAttempts, review }: MovieReviewProps) => {
  const [starRating, setStarRating] = useState<string>('');

  useEffect(() => {
    // Generate rating once when the component mounts
    setStarRating((Math.random() * 1.5 + 3.5).toFixed(1));
  }, []);

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
        <span className="text-yellow-500 mt-2 block">★ {starRating} / 5.0</span>
      </div>
    </div>
  );
};