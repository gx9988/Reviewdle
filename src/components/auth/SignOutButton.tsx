import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/auth";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton = ({ onSignOut }: SignOutButtonProps) => {
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log("Sign out button clicked");
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
      type="button"
    >
      Sign Out
    </Button>
  );
};