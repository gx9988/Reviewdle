const encouragements = [
  "Not quite! Try again!", 
  "Keep guessing!", 
  "Hmm... getting closer!", 
  "Almost there!", 
  "Think outside the box!", 
  "You can do better!", 
  "Keep trying!", 
  "Not the one we're looking for..."
];

let usedMessages: Set<string> = new Set();

export const generateUniqueMessage = (timestamp: number, attempt: number): string => {
  // Reset used messages if all messages have been used
  if (usedMessages.size >= encouragements.length) {
    usedMessages.clear();
  }

  // Filter out already used messages
  const availableMessages = encouragements.filter(msg => !usedMessages.has(msg));
  
  // Use timestamp and attempt number to create a deterministic but seemingly random index
  const seed = timestamp % (attempt * 1000);
  const selectedMessage = availableMessages[seed % availableMessages.length];
  
  // Add the selected message to used messages
  usedMessages.add(selectedMessage);
  
  return selectedMessage;
};