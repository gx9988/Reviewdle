import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
        return;
      }
      
      setProfile(prev => ({ ...prev, avatar_url: url }));
    } catch (error) {
      console.error("Error in updateProfileAvatar:", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      if (session?.user?.id) {
        getProfile(session.user.id);
        if (session.user.user_metadata?.avatar_url) {
          updateProfileAvatar(session.user.user_metadata.avatar_url);
        }
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      if (session?.user?.id) {
        await getProfile(session.user.id);
        if (session.user.user_metadata?.avatar_url) {
          await updateProfileAvatar(session.user.user_metadata.avatar_url);
        }
      } else {
        setProfile(null);
      }
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