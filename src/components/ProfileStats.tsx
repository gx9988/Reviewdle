import { UserRound, Upload } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const ProfileStats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
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
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error in getProfile:", error);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}/${Math.random()}.${fileExt}`;

      setUploading(true);

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) {
        throw updateError;
      }

      await getProfile(session.user.id);
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      const currentUrl = window.location.origin;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: currentUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleSignIn:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign in",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        toast({
          title: "Sign Out Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      setProfile(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Error in handleSignOut:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profile?.avatar_url} alt="Profile" />
                  <AvatarFallback><UserRound className="w-8 h-8" /></AvatarFallback>
                </Avatar>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="relative"
                    disabled={uploading}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                    />
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Avatar'}
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Member since: {profile?.joined_at ? formatDate(profile.joined_at) : 'Loading...'}</p>
                <p className="text-muted-foreground">Current Streak: {profile?.streak || 0} days</p>
                <p className="text-muted-foreground">Last Played: {profile?.last_played ? formatDate(profile.last_played) : 'Never'}</p>
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
              <p className="text-sm text-muted-foreground">Sign in to track your stats</p>
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