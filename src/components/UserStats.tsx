interface UserStatsProps {
  joinedAt?: string | null;
  streak?: number;
  lastPlayed?: string | null;
  totalGames?: number;
  gamesWon?: number;
  totalGuesses?: number;
  fastestWin?: number;
  averageGuesses?: number;
}

export const UserStats = ({ 
  joinedAt, 
  streak = 0, 
  lastPlayed,
  totalGames = 0,
  gamesWon = 0,
  totalGuesses = 0,
  fastestWin,
  averageGuesses
}: UserStatsProps) => {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
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
        
        <p className="text-muted-foreground">Games Played:</p>
        <p className="text-right">{totalGames}</p>
        
        <p className="text-muted-foreground">Games Won:</p>
        <p className="text-right">{gamesWon}</p>
        
        <p className="text-muted-foreground">Win Rate:</p>
        <p className="text-right">{winRate}%</p>
        
        <p className="text-muted-foreground">Total Guesses:</p>
        <p className="text-right">{totalGuesses}</p>
        
        {fastestWin && (
          <>
            <p className="text-muted-foreground">Fastest Win:</p>
            <p className="text-right">{fastestWin} {fastestWin === 1 ? 'guess' : 'guesses'}</p>
          </>
        )}
        
        {averageGuesses && (
          <>
            <p className="text-muted-foreground">Average Guesses:</p>
            <p className="text-right">{Number(averageGuesses).toFixed(1)}</p>
          </>
        )}
        
        <p className="text-muted-foreground">Last Played:</p>
        <p className="text-right">{lastPlayed ? formatDate(lastPlayed) : 'Never'}</p>
      </div>
    </div>
  );
};