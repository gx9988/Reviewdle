const encouragements = [
  "Try again!", 
  "Keep guessing!", 
  "Not quite!", 
  "Give it another shot!", 
  "Keep trying!", 
  "One more try!", 
  "Next guess!", 
  "Still guessing!"
];

export const generateUniqueMessage = (timestamp: number, attempt: number): string => {
  // Use timestamp and attempt number to create a unique but deterministic seed
  const seed = timestamp % (attempt * 1000);
  
  // Select a random encouragement based on the seed
  const message = encouragements[seed % encouragements.length];
  
  return message;
};