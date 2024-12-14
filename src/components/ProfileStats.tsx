import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { GoogleSignIn } from "./auth/GoogleSignIn";
import { ProfileButton } from "./profile/ProfileButton";
import { ProfileContent } from "./profile/ProfileContent";

export const ProfileStats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      if (session?.user?.id) {
        getProfile(session.user.id);
        if (session.user.user_metadata?.avatar_url) {
          updateProfileAvatar(session.user.id, session.user.user_metadata.avatar_url);
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
          await updateProfileAvatar(session.user.id, session.user.user_metadata.avatar_url);
        }
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfileAvatar = async (userId: string, avatarUrl: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', userId);

      if (error) {
        console.error("Error updating profile avatar:", error);
        return;
      }

      setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
    } catch (error) {
      console.error("Error in updateProfileAvatar:", error);
    }
  };

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

  const handleAvatarUpdate = (url: string) => {
    setProfile(prev => ({ ...prev, avatar_url: url }));
  };

  const handleSignOut = () => {
    setSession(null);
    setProfile(null);
    setIsOpen(false);
  };

  const handleOutsideClick = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <HoverCard 
      open={isMobile ? isOpen : undefined}
      onOpenChange={handleOutsideClick}
    >
      <HoverCardTrigger asChild>
        <ProfileButton 
          avatarUrl={profile?.avatar_url}
          onClick={(e) => {
            if (isMobile) {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }
          }}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Your Profile</h4>
          {session ? (
            <ProfileContent 
              session={session}
              profile={profile}
              onAvatarUpdate={handleAvatarUpdate}
              onSignOut={handleSignOut}
            />
          ) : (
            <GoogleSignIn />
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};