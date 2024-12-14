import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const movieLibrary = [
  {
    title: "Scream",
    year: 1996,
    starring: "Neve Campbell",
    reviews: [
      "A masterful blend of horror and satire that keeps you guessing until the very end. The clever script turns typical slasher tropes on their head while delivering genuine scares.",
      "This meta-horror masterpiece dissects the genre with surgical precision. The killer's knowledge of horror movie rules creates a uniquely terrifying game of cat and mouse.",
      "A brilliant deconstruction of the slasher genre that manages to be both scary and darkly humorous. The performances are pitch-perfect, especially from our final girl.",
      "The film's self-awareness elevates it above standard horror fare, while never sacrificing the tension and thrills that make the genre great.",
      "This iconic movie started a franchise that left us hanging on every call."
    ],
    reviewByGod: "The perfect mix of horror and humor, 'Scream' redefines the genre while keeping you on the edge. Ghostface remains one of the most memorable villains in horror history. A 90s masterpiece that's as witty as it is scary.",
    rating: "4.5/5 - Reviewdle God"
  }
];

const Index = () => {
  const [attempts, setAttempts] = useState(1);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [guess, setGuess] = useState("");
  const maxAttempts = 5;

  useEffect(() => {
    initializeGame();
  }, []);

  const getESTDate = () => {
    const now = new Date();
    const estOffset = -5;
    const estDate = new Date(now.getTime() + estOffset * 60 * 60 * 1000);
    return estDate.toISOString().split('T')[0];
  };

  const initializeGame = () => {
    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    
    if (lastPlayedDate === currentDate && (gameState.gameWon || gameState.gameLost)) {
      displaySavedGameState(gameState);
    } else if (lastPlayedDate !== currentDate) {
      resetGame();
    }
  };

  const resetGame = () => {
    setAttempts(1);
    setGameWon(false);
    setGameLost(false);
    setGuess("");
  };

  const displaySavedGameState = (gameState: any) => {
    setGameWon(gameState.gameWon);
    setGameLost(gameState.gameLost);
    setAttempts(gameState.attempts);
  };

  const saveGameState = () => {
    const currentDate = getESTDate();
    localStorage.setItem('lastPlayedDate', currentDate);
    localStorage.setItem('gameState', JSON.stringify({
      gameWon,
      gameLost,
      attempts
    }));
  };

  const makeGuess = () => {
    if (!guess.trim()) return;

    const currentDate = getESTDate();
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    
    if (lastPlayedDate === currentDate && (gameWon || gameLost)) {
      toast({
        title: "Already Played",
        description: "Come back tomorrow for a new movie!",
        variant: "destructive",
      });
      return;
    }

    if (guess.toLowerCase() === movieLibrary[0].title.toLowerCase()) {
      setGameWon(true);
      const streak = parseInt(localStorage.getItem('streak') || '0') + 1;
      localStorage.setItem('streak', streak.toString());
      toast({
        title: "Correct!",
        description: "The Reviewdle God is impressed!",
        variant: "default",
      });
      saveGameState();
    } else {
      if (attempts + 1 > maxAttempts) {
        setGameLost(true);
        localStorage.setItem('streak', '0');
        toast({
          title: "Game Over",
          description: "Better luck next time!",
          variant: "destructive",
        });
        saveGameState();
      } else {
        setAttempts(prev => prev + 1);
        toast({
          title: "Wrong Guess",
          description: "Try again!",
          variant: "destructive",
        });
      }
    }
    setGuess("");
  };

  const handleShare = () => {
    const url = window.location.href;
    const message = `Check out today's movie guessing game! Play it here: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Reviewdle',
        text: message,
        url: url
      }).catch(console.error);
    } else {
      window.open(`sms:?&body=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="h-[40vh] sm:h-[50vh] relative overflow-hidden">
        <img 
          src="/lovable-uploads/b951058c-38ab-4b10-8d47-13e9ce6642a9.png"
          alt="Reviewdle Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 -mt-16 sm:-mt-20 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Reviewdle</h1>
        <p className="text-muted-foreground text-center mb-6 sm:mb-8">
          {new Date().toLocaleDateString()}
        </p>

        <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl mb-3 sm:mb-4">
            <strong>{attempts === maxAttempts ? "Final Hint:" : "Review:"}</strong>
          </p>
          <p className="text-base sm:text-lg text-card-foreground">
            {movieLibrary[0].reviews[attempts - 1]}
          </p>
        </div>

        {!gameWon && !gameLost && (
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
          </div>
        )}

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-lg sm:text-xl font-semibold">
            Attempt: {attempts} / {maxAttempts}
          </p>
          <p className="text-base sm:text-lg mt-2">
            Streak: {parseInt(localStorage.getItem('streak') || '0')} Days
          </p>
        </div>

        {(gameWon || gameLost) && (
          <div className="mt-6 sm:mt-8 bg-card p-4 sm:p-6 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              🎬 {movieLibrary[0].title} ({movieLibrary[0].year})
            </h2>
            <p className="text-muted-foreground mb-4">
              Starring: {movieLibrary[0].starring}
            </p>
            <div className="bg-background/50 p-3 sm:p-4 rounded">
              <p className="mb-2">{movieLibrary[0].reviewByGod}</p>
              <p className="text-right text-yellow-500 font-bold">
                {movieLibrary[0].rating}
              </p>
            </div>
            <button
              onClick={handleShare}
              className="mt-4 px-5 sm:px-6 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity"
            >
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;