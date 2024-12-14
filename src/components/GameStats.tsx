import React from "react";

interface GameStatsProps {
  attempts: number;
  maxAttempts: number;
}

export const GameStats = ({ attempts, maxAttempts }: GameStatsProps) => {
  return (
    <div className="text-center mt-6 sm:mt-8">
      <p className="text-lg sm:text-xl font-semibold">
        Attempt: {attempts} / {maxAttempts}
      </p>
    </div>
  );
};