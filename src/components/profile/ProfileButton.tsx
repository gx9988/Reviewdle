import { UserRound } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileButtonProps {
  avatarUrl?: string | null;
  onClick: () => void;
}

export const ProfileButton = ({ avatarUrl, onClick }: ProfileButtonProps) => {
  return (
    <button 
      className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      onClick={onClick}
    >
      {avatarUrl ? (
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatarUrl} alt="Profile" />
          <AvatarFallback><UserRound className="w-4 h-4" /></AvatarFallback>
        </Avatar>
      ) : (
        <UserRound className="w-4 h-4" />
      )}
    </button>
  );
};