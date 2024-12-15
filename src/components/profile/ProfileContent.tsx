import { AvatarUpload } from "@/components/AvatarUpload";
import { UserStats } from "@/components/UserStats";
import { SignOutButton } from "@/components/auth/SignOutButton";

interface ProfileContentProps {
  session: any;
  profile: any;
  onAvatarUpdate: (url: string) => void;
  onSignOut: () => void;
}

export const ProfileContent = ({ 
  session, 
  profile, 
  onAvatarUpdate, 
  onSignOut 
}: ProfileContentProps) => {
  return (
    <div className="space-y-4">
      <AvatarUpload 
        userId={session.user.id}
        avatarUrl={profile?.avatar_url}
        onAvatarUpdate={onAvatarUpdate}
      />
      <UserStats 
        joinedAt={profile?.joined_at}
        streak={profile?.streak}
        lastPlayed={profile?.last_played}
        totalGames={profile?.total_games}
        gamesWon={profile?.games_won}
        totalGuesses={profile?.total_guesses}
        fastestWin={profile?.fastest_win}
        averageGuesses={profile?.average_guesses}
      />
      <SignOutButton onSignOut={onSignOut} />
    </div>
  );
};