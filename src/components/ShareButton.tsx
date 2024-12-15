export const ShareButton = () => {
  const handleShare = () => {
    const url = "https://reviewdle.com";
    const message = `Can you guess the movie of the day?! 🎬 Check it out on Reviewdle.com! ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Reviewdle',
        text: message,
        url: url
      }).catch(console.error);
    } else {
      window.open(`sms:?&body=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="flex justify-center mt-4 sm:mt-6">
      <button
        onClick={handleShare}
        className="text-blue-400 hover:text-blue-500 transition-colors text-sm font-medium"
      >
        Share Reviewdle
      </button>
    </div>
  );
};