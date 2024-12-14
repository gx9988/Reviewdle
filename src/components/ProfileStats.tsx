import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { GoogleSignIn } from "./auth/GoogleSignIn";
import { ProfileButton } from "./profile/ProfileButton";
import { ProfileContent } from "./profile/ProfileContent";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/utils/auth";
import { toast } from "@/hooks/use-toast";

export const ProfileStats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { session, profile, updateProfileAvatar } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
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

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <HoverCard 
      open={isMobile ? isOpen : undefined}
      onOpenChange={setIsOpen}
    >
      <HoverCardTrigger asChild>
        <div>
          <ProfileButton 
            avatarUrl={profile?.avatar_url}
            onClick={handleProfileClick}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Your Profile</h4>
          {session ? (
            <ProfileContent 
              session={session}
              profile={profile}
              onAvatarUpdate={updateProfileAvatar}
              onSignOut={handleSignOut}
            />
          ) : (
            <GoogleSignIn />
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};