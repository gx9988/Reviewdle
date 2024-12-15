import { MovieReview } from "./MovieReview";
import { GuessInput } from "./GuessInput";
import { MovieResult } from "./MovieResult";
import { LostGameState } from "./LostGameState";
import { GameStateManager } from "./GameStateManager";
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
    getESTDate,
    session
  } = useGameState(maxAttempts);

  const makeGuess = async () => {
    if (!guess.trim()) return;

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = movie.title.trim().toLowerCase();

    if (normalizedGuess === normalizedTitle) {
      await handleCorrectGuess();
    } else {
      await handleIncorrectGuess();
    }
    setGuess("");
  };

  const handleCorrectGuess = async () => {
    setGameWon(true);
    setShowMovie(true);
    setWrongGuessMessage("");
    
    if (session?.user?.id) {
      await updateStreak();
    }
    
    toast({
      title: "Correct!",
      description: "The Reviewdle God is impressed! Come back tomorrow for another movie!",
      variant: "default",
    });
    saveGameState();
  };

  const handleIncorrectGuess = async () => {
    if (attempts + 1 > maxAttempts) {
      setGameLost(true);
      if (session?.user?.id) {
        await resetStreakOnLoss();
      }
      saveGameState();
    } else {
      setAttempts(prev => prev + 1);
      const uniqueMessage = generateUniqueMessage(Date.now(), attempts);
      setWrongGuessMessage(uniqueMessage);
    }
  };

  return (
    <GameStateManager
      gameWon={gameWon}
      gameLost={gameLost}
      getESTDate={getESTDate}
    >
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
        <LostGameState onReveal={() => setShowMovie(true)} />
      )}

      {(gameWon || (gameLost && showMovie)) && (
        <MovieResult
          movie={movie}
          isWin={gameWon}
        />
      )}
    </GameStateManager>
  );
};