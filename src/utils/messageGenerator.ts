const adjectives = [
  "almost", "nearly", "getting closer", "not quite", 
  "just about", "very close", "approaching", "moving towards",
  "steadily", "gradually", "surely", "carefully"
];

const actions = [
  "missed it", "didn't quite get it", "weren't quite there", "were close",
  "had a good try", "made a solid attempt", "gave it a shot", "took a guess",
  "made an attempt", "tried your best", "gave it your all", "made progress"
];

const comparisons = [
  "like a detective on the right track",
  "like finding the right puzzle piece",
  "like getting warmer in hot and cold",
  "like solving a mystery step by step",
  "like connecting the dots",
  "like following the breadcrumbs",
  "like piecing together the clues",
  "like reading between the lines",
  "like uncovering the story",
  "like solving a riddle",
  "like finding your way through a maze",
  "like putting the pieces together"
];

const encouragements = [
  "you're getting closer!", "keep going!", "you can do this!",
  "you're on the right track!", "that's the spirit!", "great effort!",
  "you're making progress!", "almost there!", "don't give up!",
  "getting warmer!", "keep thinking!", "trust your instincts!"
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