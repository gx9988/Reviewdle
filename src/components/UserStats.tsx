interface UserStatsProps {
  joinedAt?: string | null;
  streak?: number;
  lastPlayed?: string | null;
  totalGames?: number;
  gamesWon?: number;
}

export const UserStats = ({ 
  joinedAt, 
  streak = 0, 
  lastPlayed,
  totalGames = 0,
  gamesWon = 0,
}: UserStatsProps) => {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      // If no date is provided, return today's date
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const winRate = totalGames > 0 ? ((gamesWon / totalGames) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p className="text-muted-foreground">Member since:</p>
        <p className="text-right">{formatDate(joinedAt)}</p>
        
        <p className="text-muted-foreground">Current Streak:</p>
        <p className="text-right">{streak} days</p>
        
        <p className="text-muted-foreground">Win Rate:</p>
        <p className="text-right">{winRate}%</p>
        
        <p className="text-muted-foreground">Last Played:</p>
        <p className="text-right">{lastPlayed ? formatDate(lastPlayed) : 'Never'}</p>
      </div>
    </div>
  );
};