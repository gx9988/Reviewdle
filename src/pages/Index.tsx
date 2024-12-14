import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { MovieReview } from "@/components/MovieReview";
import { GuessInput } from "@/components/GuessInput";
import { GameStats } from "@/components/GameStats";
import { MovieResult } from "@/components/MovieResult";
import { ProfileStats } from "@/components/ProfileStats";
import { HowToPlay } from "@/components/HowToPlay";
import { generateUniqueMessage } from "@/utils/messageGenerator";

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
  const [showMovie, setShowMovie] = useState(false);
  const [wrongGuessMessage, setWrongGuessMessage] = useState<string>("");
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

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = movieLibrary[0].title.trim().toLowerCase();

    if (normalizedGuess === normalizedTitle) {
      setGameWon(true);
      setShowMovie(true);
      setWrongGuessMessage("");
      const streak = parseInt(localStorage.getItem('streak') || '0') + 1;
      localStorage.setItem('streak', streak.toString());
      toast({
        title: "Correct!",
        description: "The Reviewdle God is impressed! Come back tomorrow for another movie!",
        variant: "default",
      });
      saveGameState();
    } else {
      if (attempts + 1 > maxAttempts) {
        setGameLost(true);
        localStorage.setItem('streak', '0');
        toast({
          title: "Game Over",
          description: "Even my grandma who doesn't watch movies could have guessed this one!",
          variant: "destructive",
        });
        saveGameState();
      } else {
        setAttempts(prev => prev + 1);
        const uniqueMessage = generateUniqueMessage(Date.now(), attempts);
        setWrongGuessMessage(uniqueMessage);
      }
    }
    setGuess("");
  };

  const handleReveal = () => {
    setShowMovie(true);
    toast({
      title: "Movie Revealed",
      description: "Better luck next time!",
      variant: "default",
    });
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
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Reviewdle</h1>
          <span className="text-muted-foreground text-lg sm:text-xl">#00001</span>
          <ProfileStats />
          <HowToPlay />
        </div>
        <p className="text-muted-foreground text-center mb-6 sm:mb-8">
          {new Date().toLocaleDateString()}
        </p>

        <MovieReview 
          attempt={attempts}
          maxAttempts={maxAttempts}
          review={movieLibrary[0].reviews[attempts - 1]}
        />

        {!gameWon && !gameLost && (
          <GuessInput
            guess={guess}
            setGuess={setGuess}
            makeGuess={makeGuess}
            wrongGuessMessage={wrongGuessMessage}
          />
        )}

        <GameStats
          attempts={attempts}
          maxAttempts={maxAttempts}
        />

        {gameLost && !showMovie && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleReveal}
              className="px-6 sm:px-8 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity"
            >
              Reveal Movie
            </button>
          </div>
        )}

        {(gameWon || (gameLost && showMovie)) && (
          <MovieResult
            movie={movieLibrary[0]}
            handleShare={handleShare}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
