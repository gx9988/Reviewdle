const encouragements = [
  "Not quite! The Reviewdle God raises an eyebrow...", 
  "Keep guessing! The Reviewdle God believes in you!", 
  "Hmm... The Reviewdle God expected better!", 
  "The Reviewdle God shakes their head. Try again!", 
  "The Reviewdle God strokes their chin thoughtfully...", 
  "The Reviewdle God suggests thinking outside the box!", 
  "The Reviewdle God knows you can do better!", 
  "The Reviewdle God waits patiently for the right answer..."
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