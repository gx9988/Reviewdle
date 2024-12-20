export const ShareButton = () => {
  const handleShare = async () => {
    const shareData = {
      title: 'Reviewdle - Daily Movie Review Game',
      text: 'Check out the movie of the day on reviewdle.com! 🎬',
      url: 'https://reviewdle.com'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support sharing
        const shareUrl = `sms:?&body=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
        window.open(shareUrl);
      }
    } catch (error) {
      console.error('Error sharing:', error);
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