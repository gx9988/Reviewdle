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

      // If user has already played today, don't update the streak
      if (profile?.last_played === currentDate) {
        console.log('Already played today, keeping current streak of', profile.streak);
        return;
      }

      let newStreak = 1; // Default for first win
      
      if (profile?.last_played && isYesterday(profile.last_played)) {
        // If last played was yesterday, increment streak
        newStreak = (profile.streak || 0) + 1;
        console.log('Incrementing streak from', profile.streak, 'to', newStreak);
      } else if (profile?.last_played && profile.last_played !== currentDate) {
        // If last played was not yesterday (and not today), reset streak to 1
        newStreak = 1;
        console.log('Resetting streak to 1 (last played:', profile.last_played, ')');
      }

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
        description: `Your current streak is ${newStreak} day${newStreak === 1 ? '' : 's'}!`,
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