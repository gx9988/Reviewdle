import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/auth";
import { toast } from "@/hooks/use-toast";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton = ({ onSignOut }: SignOutButtonProps) => {
  const handleSignOut = async () => {
    try {
      console.log("Sign out button clicked");
      await signOut();
      console.log("Sign out successful");
      onSignOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
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