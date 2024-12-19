import { GameLogic } from "./GameLogic";
import { GameStateManager } from "./GameStateManager";
import { generateUniqueMessage } from "@/utils/messageGenerator";
import { useGameState } from "@/hooks/use-game-state";
import { useGameStats } from "@/hooks/use-game-stats";
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

  const { updateGameStats } = useGameStats();

  const handleCorrectGuess = async () => {
    setGameWon(true);
    setShowMovie(true);
    setWrongGuessMessage("");
    
    if (session?.user?.id) {
      console.log('Handling correct guess for user:', session.user.id);
      await updateStreak();
      await updateGameStats(session.user.id, true, attempts, getESTDate);
    }
    
    toast({
      title: "Correct!",
      description: "The Reviewdle God is impressed! Come back tomorrow for another movie!",
      variant: "default",
    });
    saveGameState();
  };

  const handleIncorrectGuess = async () => {
    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);
    
    if (nextAttempt > maxAttempts) {
      setGameLost(true);
      if (session?.user?.id) {
        console.log('Handling game loss for user:', session.user.id);
        await resetStreakOnLoss();
        await updateGameStats(session.user.id, false, maxAttempts, getESTDate);
      }
      saveGameState();
    } else {
      const uniqueMessage = generateUniqueMessage(Date.now(), attempts);
      setWrongGuessMessage(uniqueMessage);
    }
  };

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
          makeGuess,
          onReveal: () => setShowMovie(true)
        }}
        maxAttempts={maxAttempts}
      />
    </GameStateManager>
  );
};