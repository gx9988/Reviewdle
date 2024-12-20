import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEstDate } from "./use-est-date";
import { useQueryClient } from "@tanstack/react-query";

export const useStreak = () => {
  const { getESTDate, isYesterday } = useEstDate();
  const queryClient = useQueryClient();

  const updateStreak = async (userId: string) => {
    if (!userId) return;

    try {
      const currentDate = getESTDate();
      
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      let newStreak = 1; // Default for first win or when starting a new streak

      // If user has already played today, don't update the streak
      if (profile?.last_played === currentDate) {
        console.log('Already played today, keeping current streak of', profile.streak);
        return;
      }

      // Update streak to 1 for a win, regardless of previous streak
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          streak: newStreak,
          last_played: currentDate
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Invalidate the profile query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      toast({
        title: "Streak Updated!",
        description: `Your current streak is ${newStreak} day!`,
      });

    } catch (error) {
      console.error('Error updating streak:', error);
      toast({
        title: "Error",
        description: "Failed to update streak. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetStreakOnLoss = async (userId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          streak: 0,
          last_played: getESTDate()
        })
        .eq('id', userId);

      if (error) throw error;

      // Invalidate the profile query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });

    } catch (error) {
      console.error('Error resetting streak:', error);
      toast({
        title: "Error",
        description: "Failed to reset streak. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    updateStreak,
    resetStreakOnLoss
  };
};