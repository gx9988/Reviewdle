import { GameLogic } from "./GameLogic";
import { GameStateManager } from "./GameStateManager";
import { useGameState } from "@/hooks/use-game-state";
import { useGameStats } from "@/hooks/use-game-stats";
import { GuessHandler } from "./game/GuessHandler";

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

  const { updateGameStats } = useGameStats();

  const { makeGuess } = GuessHandler({
    movieTitle: movie.title,
    attempts,
    maxAttempts,
    session,
    updateStreak,
    resetStreakOnLoss,
    updateGameStats,
    setGameWon,
    setGameLost,
    setShowMovie,
    setAttempts,
    setWrongGuessMessage,
    saveGameState,
    getESTDate,
  });

  const handleGuess = async () => {
    await makeGuess(guess);
    setGuess("");
  };

  return (
    <GameStateManager
      gameWon={gameWon}
      gameLost={gameLost}
      getESTDate={getESTDate}
    >
      <GameLogic
        movie={movie}
        gameState={{
          attempts,
          gameWon,
          gameLost,
          guess,
          showMovie,
          wrongGuessMessage
        }}
        handlers={{
          setGuess,
          makeGuess: handleGuess,
          onReveal: () => setShowMovie(true)
        }}
        maxAttempts={maxAttempts}
      />
    </GameStateManager>
  );
};