import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const signInWithGoogle = async () => {
  try {
    // Get the current URL without any path or query parameters
    const baseUrl = window.location.origin;
    console.log("Redirect URL:", baseUrl); // This will help us debug

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: baseUrl,
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out",
    });
    return { error: null };
  } catch (error) {
    console.error("Error in signOut:", error);
    return { error };
  }
};