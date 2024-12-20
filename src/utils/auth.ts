import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
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

    return { data, error };
  } catch (error) {
    console.error("Error in signInWithGoogle:", error);
    toast({
      title: "Error",
      description: "An unexpected error occurred during sign in",
      variant: "destructive",
    });
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    console.log("Starting sign out process...");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    console.log("Sign out successful");
    toast({
      title: "Signed out successfully",
    });
  } catch (error) {
    console.error("Error in signOut:", error);
    toast({
      title: "Error",
      description: "An unexpected error occurred during sign out",
      variant: "destructive",
    });
    throw error;
  }
};