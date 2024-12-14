const adjectives = [
  "spectacularly", "monumentally", "historically", "impressively", 
  "remarkably", "extraordinarily", "phenomenally", "uniquely",
  "particularly", "notably", "distinctly", "exceptionally"
];

const actions = [
  "missed the mark", "got it wrong", "failed to guess", "messed up",
  "dropped the ball", "missed by a mile", "went off track", "lost the plot",
  "went astray", "missed completely", "fumbled", "goofed up"
];

const comparisons = [
  "like a fish trying to climb a tree",
  "like using a fork to eat soup",
  "like bringing a knife to a gunfight",
  "like trying to teach a cat to bark",
  "like expecting pineapple on pizza to taste good",
  "like waiting for a response from your ex",
  "like trying to find a needle in a haystack... blindfolded",
  "like attempting to herd cats",
  "like trying to catch fog with a net",
  "like expecting silence at a rock concert",
  "like trying to nail jelly to a wall",
  "like counting stars during daytime"
];

const encouragements = [
  "but keep trying!", "but don't give up!", "but you've got this!",
  "but there's always next time!", "but stay positive!", "but keep at it!",
  "but we believe in you!", "but you're getting warmer!", "but you can do this!",
  "but that's the spirit!", "but A for effort!", "but nice attempt!"
];

export const generateUniqueMessage = (timestamp: number, attempt: number): string => {
  // Use timestamp and attempt number to create a unique but deterministic seed
  const seed = timestamp % (attempt * 1000);
  
  // Use the seed to select components of the message
  const adj = adjectives[seed % adjectives.length];
  const action = actions[(seed + attempt) % actions.length];
  const comparison = comparisons[(seed * attempt) % comparisons.length];
  const encouragement = encouragements[(seed + attempt * 2) % encouragements.length];

  return `You ${adj} ${action} ${comparison}, ${encouragement}`;
};