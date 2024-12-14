import { UserRound } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { signInWithGoogle, signOut } from "@/utils/auth";
import { AvatarUpload } from "./AvatarUpload";
import { UserStats } from "./UserStats";
import { toast } from "@/hooks/use-toast";

export const ProfileStats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      if (session?.user?.id) {
        getProfile(session.user.id);
        // If user has a Google avatar, update their profile with it
        if (session.user.user_metadata?.avatar_url) {
          updateProfileAvatar(session.user.id, session.user.user_metadata.avatar_url);
        }
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      if (session?.user?.id) {
        await getProfile(session.user.id);
        // If user has a Google avatar, update their profile with it
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

      // Update local state
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

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Clear local state
      setSession(null);
      setProfile(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error in handleSignOut:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while signing out",
        variant: "destructive",
      });
    }
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
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          onClick={(e) => {
            if (isMobile) {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }
          }}
        >
          {profile?.avatar_url ? (
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile.avatar_url} alt="Profile" />
              <AvatarFallback><UserRound className="w-4 h-4" /></AvatarFallback>
            </Avatar>
          ) : (
            <UserRound className="w-4 h-4" />
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Your Profile</h4>
          {session ? (
            <div className="space-y-4">
              <AvatarUpload 
                userId={session.user.id}
                avatarUrl={profile?.avatar_url}
                onAvatarUpdate={handleAvatarUpdate}
              />
              <UserStats 
                joinedAt={profile?.joined_at}
                streak={profile?.streak}
                lastPlayed={profile?.last_played}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Sign in to track your stats</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};