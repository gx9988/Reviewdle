export const ShareButton = () => {
  const handleShare = () => {
    const url = window.location.href;
    const message = `Check out today's movie guessing game! Play it here: ${url}`;
    
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