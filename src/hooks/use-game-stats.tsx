import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useGameStats = () => {
  const updateGameStats = async (
    userId: string, 
    won: boolean, 
    attempts: number,
    getESTDate: () => string
  ) => {
    if (!userId) {
      console.log('No user session found, skipping stats update');
      return;
    }

    try {
      console.log('Updating game stats for user:', userId);
      
      const { data: currentStats, error: fetchError } = await supabase
        .from('profiles')
        .select('total_games, games_won, total_guesses, fastest_win, average_guesses')
        .eq('id', userId)
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
        .eq('id', userId);

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

  return { updateGameStats };
};