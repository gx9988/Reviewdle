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
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      if (session?.user?.id) {
        getProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  return (
    <HoverCard open={isMobile ? isOpen : undefined}>
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          onClick={() => isMobile && setIsOpen(!isOpen)}
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
                onClick={signOut}
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