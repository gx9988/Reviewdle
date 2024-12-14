interface UserStatsProps {
  joinedAt?: string | null;
  streak?: number;
  lastPlayed?: string | null;
}

export const UserStats = ({ joinedAt, streak = 0, lastPlayed }: UserStatsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-2 text-sm">
      <p className="text-muted-foreground">
        Member since: {joinedAt ? formatDate(joinedAt) : 'Loading...'}
      </p>
      <p className="text-muted-foreground">Current Streak: {streak} days</p>
      <p className="text-muted-foreground">
        Last Played: {lastPlayed ? formatDate(lastPlayed) : 'Never'}
      </p>
    </div>
  );
};