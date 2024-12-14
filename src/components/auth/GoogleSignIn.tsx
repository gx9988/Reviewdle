import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/auth";

export const GoogleSignIn = () => {
  return (
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
  );
};