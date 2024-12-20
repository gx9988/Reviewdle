import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/auth";
import GoogleLogo from "../icons/GoogleLogo";

export const GoogleSignIn = () => {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Sign in securely with Google to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Track your daily streak</li>
          <li>Save your game progress</li>
          <li>Compare stats with friends</li>
        </ul>
      </div>
      <Button 
        variant="outline" 
        className="w-full font-medium"
        onClick={handleSignIn}
      >
        <GoogleLogo />
        Continue with Google
      </Button>
      <p className="text-[11px] text-center text-muted-foreground">
        Your data is securely handled and we only access your basic profile info.
      </p>
    </div>
  );
};