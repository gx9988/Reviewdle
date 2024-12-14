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

export const ProfileStats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        getProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        getProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <HoverCard open={isMobile ? isOpen : undefined}>
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          onClick={() => isMobile && setIsOpen(!isOpen)}
        >
          <UserRound className="w-4 h-4" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Your Stats</h4>
          {session ? (
            <div className="space-y-4">
              <div className="text-sm">
                <p className="text-muted-foreground">Current Streak: {profile?.streak || 0} days</p>
              </div>
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
              <p className="text-sm text-muted-foreground">Sign in to track your streak</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSignIn}
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