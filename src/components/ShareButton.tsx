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
        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg"
      >
        <span>Share Reviewdle</span>
      </button>
    </div>
  );
};