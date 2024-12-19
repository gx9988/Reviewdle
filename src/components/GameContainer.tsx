import { MovieReview } from "./MovieReview";
import { GuessInput } from "./GuessInput";
import { MovieResult } from "./MovieResult";
import { LostGameState } from "./LostGameState";
import { GameStateManager } from "./GameStateManager";
import { generateUniqueMessage } from "@/utils/messageGenerator";
import { useGameState } from "@/hooks/use-game-state";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const updateGameStats = async (won: boolean, attempts: number) => {
    if (!session?.user?.id) {
      console.log('No user session found, skipping stats update');
      return;
    }

    try {
      console.log('Updating game stats for user:', session.user.id);
      
      const { data: currentStats, error: fetchError } = await supabase
        .from('profiles')
        .select('total_games, games_won, total_guesses, fastest_win, average_guesses')
        .eq('id', session.user.id)
        .single();

      if (fetchError) {
        console.error('Error fetching current stats:', fetchError);
        throw fetchError;
      }

      console.log('Current stats:', currentStats);

      // Calculate new stats
      const newTotalGames = (currentStats?.total_games || 0) + 1;
      const newGamesWon = won ? (currentStats?.games_won || 0) + 1 : (currentStats?.games_won || 0);
      const newTotalGuesses = (currentStats?.total_guesses || 0) + attempts;
      const newFastestWin = won ? 
        (currentStats?.fastest_win ? Math.min(currentStats.fastest_win, attempts) : attempts) : 
        currentStats?.fastest_win;
      const newAverageGuesses = (newTotalGuesses / newTotalGames).toFixed(2);

      const updates = {
        total_games: newTotalGames,
        games_won: newGamesWon,
        total_guesses: newTotalGuesses,
        fastest_win: newFastestWin,
        average_guesses: newAverageGuesses,
        last_played: getESTDate()
      };

      console.log('Updating stats with:', updates);

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error updating stats:', updateError);
        throw updateError;
      }

      console.log('Stats updated successfully');

    } catch (error) {
      console.error('Error in updateGameStats:', error);
      toast({
        title: "Error",
        description: "Failed to update game statistics",
        variant: "destructive",
      });
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

  const handleCorrectGuess = async () => {
    setGameWon(true);
    setShowMovie(true);
    setWrongGuessMessage("");
    
    if (session?.user?.id) {
      console.log('Handling correct guess for user:', session.user.id);
      await updateStreak();
      await updateGameStats(true, attempts);
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
        await updateGameStats(false, maxAttempts);
      }
      saveGameState();
    } else {
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