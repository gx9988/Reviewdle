import { toast } from "@/hooks/use-toast";
import { generateUniqueMessage } from "@/utils/messageGenerator";

interface GuessHandlerProps {
  movieTitle: string;
  attempts: number;
  maxAttempts: number;
  session: any;
  updateStreak: () => Promise<void>;
  resetStreakOnLoss: () => Promise<void>;
  updateGameStats: (userId: string, won: boolean, attempts: number, getESTDate: () => string) => Promise<void>;
  setGameWon: (won: boolean) => void;
  setGameLost: (lost: boolean) => void;
  setShowMovie: (show: boolean) => void;
  setAttempts: (attempts: number) => void;
  setWrongGuessMessage: (message: string) => void;
  saveGameState: () => void;
  getESTDate: () => string;
}

export const GuessHandler = ({
  movieTitle,
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
}: GuessHandlerProps) => {
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

  const makeGuess = async (guess: string) => {
    if (!guess.trim()) return;

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = movieTitle.trim().toLowerCase();

    if (normalizedGuess === normalizedTitle) {
      await handleCorrectGuess();
    } else {
      await handleIncorrectGuess();
    }
  };

  return { makeGuess };
};