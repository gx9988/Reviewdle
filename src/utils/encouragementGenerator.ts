const encouragements = [
  "Ahh you didn't get it, no worries happens to the best of us!",
  "Don't sweat it, even movie critics get stumped sometimes!",
  "Close but no cigar! Even the Reviewdle God misses occasionally.",
  "Not quite there, but hey, that's what makes it fun!",
  "Better luck next time! Even the greatest movie buffs get stuck.",
  "No worries, tomorrow's another chance to shine!",
  "Almost had it! The movie world is full of surprises.",
  "Keep your head up! Even Spielberg would find this challenging."
];

export const generateEncouragement = (timestamp: number): string => {
  const seed = timestamp % 1000;
  return encouragements[seed % encouragements.length];
};