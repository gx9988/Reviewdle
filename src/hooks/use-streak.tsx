import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEstDate } from "./use-est-date";
import { useQueryClient } from "@tanstack/react-query";

export const useStreak = () => {
  const { getESTDate, isYesterday } = useEstDate();
  const queryClient = useQueryClient();

  const updateStreak = async (userId: string) => {
    if (!userId) {
      console.log('No user ID provided for streak update');
      return;
    }

    try {
      const currentDate = getESTDate();
      console.log('Updating streak for user:', userId, 'on date:', currentDate);
      
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('streak, last_played')
        .eq('id', userId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        throw fetchError;
      }

      console.log('Current profile data:', profile);

      let newStreak = 1; // Default for first win

      if (profile?.last_played) {
        if (profile.last_played === currentDate) {
          console.log('Already played today, keeping current streak of', profile.streak);
          return;
        } else if (isYesterday(profile.last_played)) {
          newStreak = (profile.streak || 0) + 1;
          console.log('Played yesterday, incrementing streak to:', newStreak);
        } else {
          console.log('Streak reset - last played was not yesterday');
        }
      }

      console.log('Updating streak to:', newStreak);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          streak: newStreak,
          last_played: currentDate
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating streak:', updateError);
        throw updateError;
      }

      // Invalidate the profile query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      console.log('Streak updated successfully');
      toast({
        title: "Streak Updated!",
        description: `Your current streak is ${newStreak} ${newStreak === 1 ? 'day' : 'days'}!`,
      });

    } catch (error) {
      console.error('Error in updateStreak:', error);
      toast({
        title: "Error",
        description: "Failed to update streak. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetStreakOnLoss = async (userId: string) => {
    if (!userId) {
      console.log('No user ID provided for streak reset');
      return;
    }

    try {
      console.log('Resetting streak for user:', userId);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          streak: 0,
          last_played: getESTDate()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error resetting streak:', error);
        throw error;
      }

      // Invalidate the profile query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      console.log('Streak reset successfully');

    } catch (error) {
      console.error('Error in resetStreakOnLoss:', error);
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