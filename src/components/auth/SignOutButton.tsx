import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/auth";
import { toast } from "@/hooks/use-toast";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton = ({ onSignOut }: SignOutButtonProps) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      onSignOut();
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
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