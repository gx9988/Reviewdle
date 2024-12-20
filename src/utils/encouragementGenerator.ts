const encouragements = [
  "Better luck next time! 🎬",
  "Don't give up, movie buff! 🍿",
  "Almost had it! Try again tomorrow! 🎥",
  "That was a tricky one! Come back tomorrow! 🎬",
  "Keep watching movies, you'll get the next one! 🍿",
  "Nice try! Tomorrow brings a new movie! 🎥"
];

let lastIndex = -1;

export const generateEncouragement = (timestamp: number): string => {
  // Use timestamp to generate a seemingly random but deterministic index
  let index = Math.floor((timestamp % 1000) / (1000 / encouragements.length));
  
  // Avoid repeating the same message twice in a row
  if (index === lastIndex) {
    index = (index + 1) % encouragements.length;
  }
  
  lastIndex = index;
  return encouragements[index];
};