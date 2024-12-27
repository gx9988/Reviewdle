import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/auth";
import GoogleLogo from "../icons/GoogleLogo";
import { Link } from "react-router-dom";

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
        <GoogleLogo />
        Sign in with Google
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        By signing in, you agree to our{" "}
        <Link to="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};