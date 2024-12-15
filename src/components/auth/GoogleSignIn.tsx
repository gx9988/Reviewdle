import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/auth";
import { Mail } from "lucide-react";

export const GoogleSignIn = () => {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Sign in to track your stats</p>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleSignIn}
      >
        <Mail className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </div>
  );
};