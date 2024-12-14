import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const getProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      console.log("Profile data:", data);
      setProfile(data);
    } catch (error) {
      console.error("Error in getProfile:", error);
    }
  };

  const updateProfileAvatar = async (url: string) => {
    if (!session?.user?.id) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', session.user.id);

      if (error) {
        console.error("Error updating profile avatar:", error);
        toast({
          title: "Error",
          description: "Failed to update avatar",
          variant: "destructive",
        });
        return;
      }
      
      setProfile(prev => ({ ...prev, avatar_url: url }));
      console.log("Avatar updated successfully:", url);
    } catch (error) {
      console.error("Error in updateProfileAvatar:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSession = async (session: any) => {
    console.log("Handling session:", session);
    setSession(session);
    
    if (session?.user) {
      await getProfile(session.user.id);
      
      // Get avatar URL from Google auth metadata
      const avatarUrl = session.user.user_metadata?.picture || 
                       session.user.user_metadata?.avatar_url;
                       
      console.log("Avatar URL from metadata:", avatarUrl);
      if (avatarUrl) {
        await updateProfileAvatar(avatarUrl);
      }
    } else {
      setProfile(null);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      handleSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session);
      await handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    profile,
    setProfile,
    updateProfileAvatar
  };
};