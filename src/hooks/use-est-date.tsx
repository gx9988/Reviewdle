export const useEstDate = () => {
  const getESTDate = () => {
    const now = new Date();
    const estOffset = -5; // EST is UTC-5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const est = new Date(utc + (3600000 * estOffset));
    return est.toISOString().split('T')[0];
  };

  const isYesterday = (dateStr: string) => {
    const today = new Date(getESTDate());
    const date = new Date(dateStr);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return date.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
  };

  return {
    getESTDate,
    isYesterday
  };
};