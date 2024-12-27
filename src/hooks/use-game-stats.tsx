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
      
      // First, get the current stats
      const { data: currentStats, error: fetchError } = await supabase
        .from('profiles')
        .select('total_games, games_won, total_guesses, fastest_win')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching current stats:', fetchError);
        throw fetchError;
      }

      console.log('Current stats:', currentStats);

      // Calculate new stats
      const newStats = {
        total_games: (currentStats?.total_games || 0) + 1,
        games_won: won ? (currentStats?.games_won || 0) + 1 : (currentStats?.games_won || 0),
        total_guesses: (currentStats?.total_guesses || 0) + attempts,
        fastest_win: won ? 
          (currentStats?.fastest_win ? 
            Math.min(currentStats.fastest_win, attempts) : 
            attempts
          ) : 
          currentStats?.fastest_win,
        last_played: getESTDate()
      };

      // Calculate average guesses
      newStats.average_guesses = Number((newStats.total_guesses / newStats.total_games).toFixed(2));

      console.log('Updating stats with:', newStats);

      // Update the stats in a single transaction
      const { error: updateError } = await supabase
        .from('profiles')
        .update(newStats)
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating stats:', updateError);
        throw updateError;
      }

      console.log('Stats updated successfully');

    } catch (error) {
      console.error('Error in updateGameStats:', error);
      toast({
        title: "Stats Update Error",
        description: "Unable to update stats. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return { updateGameStats };
};