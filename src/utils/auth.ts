import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
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
    
    // First, sign out from Supabase
    const { error } = await supabase.auth.signOut({
      scope: 'global'  // This ensures all sessions are terminated
    });
    
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
    
    // Clear any auth-related data from localStorage
    localStorage.removeItem('reviewdle-auth');
    localStorage.removeItem('supabase.auth.token');
    
    // Show success message
    toast({
      title: "Signed out successfully",
    });
    
    // Force a hard refresh to clear all state
    window.location.href = '/';
    
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