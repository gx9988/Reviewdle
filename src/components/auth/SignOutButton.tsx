import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/auth";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton = ({ onSignOut }: SignOutButtonProps) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      onSignOut();
    } catch (error) {
      console.error("Error in handleSignOut:", error);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};