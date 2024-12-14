import { MovieReview } from "./MovieReview";
import { GuessInput } from "./GuessInput";
import { MovieResult } from "./MovieResult";
import { generateUniqueMessage } from "@/utils/messageGenerator";
import { useGameState } from "@/hooks/use-game-state";
import { toast } from "@/hooks/use-toast";

interface Movie {
  title: string;
  year: number;
  starring: string;
  reviews: string[];
  reviewByGod: string;
  rating: string;
}

interface GameContainerProps {
  movie: Movie;
}

export const GameContainer = ({ movie }: GameContainerProps) => {
  const maxAttempts = 5;
  const {
    attempts,
    setAttempts,
    gameWon,
    setGameWon,
    gameLost,
    setGameLost,
    guess,
    setGuess,
    showMovie,
    setShowMovie,
    wrongGuessMessage,
    setWrongGuessMessage,
    updateStreak,
    resetStreakOnLoss,
    saveGameState,
    getESTDate
  } = useGameState(maxAttempts);

  const makeGuess = async () => {
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
    const normalizedTitle = movie.title.trim().toLowerCase();

    if (normalizedGuess === normalizedTitle) {
      setGameWon(true);
      setShowMovie(true);
      setWrongGuessMessage("");
      await updateStreak();
      toast({
        title: "Correct!",
        description: "The Reviewdle God is impressed! Come back tomorrow for another movie!",
        variant: "default",
      });
      saveGameState();
    } else {
      if (attempts + 1 > maxAttempts) {
        setGameLost(true);
        await resetStreakOnLoss();
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
  };

  return (
    <>
      <MovieReview 
        attempt={attempts}
        maxAttempts={maxAttempts}
        review={movie.reviews[attempts - 1]}
      />

      {!gameWon && !gameLost && (
        <GuessInput
          guess={guess}
          setGuess={setGuess}
          makeGuess={makeGuess}
          wrongGuessMessage={wrongGuessMessage}
          attempt={attempts}
          maxAttempts={maxAttempts}
        />
      )}

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
          movie={movie}
          isWin={gameWon}
        />
      )}
    </>
  );
};