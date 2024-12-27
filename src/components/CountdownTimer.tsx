import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEstDate } from "@/hooks/use-est-date";
import { ShareButton } from "@/components/ShareButton";

interface CountdownTimerProps {
  isOpen: boolean;
}

export const CountdownTimer = ({ isOpen }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { getESTDate } = useEstDate();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const est = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      const tomorrow = new Date(est);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - est.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-4">
          <div className="w-full flex justify-center mb-6">
            <img 
              src="/lovable-uploads/c808dc70-d1d6-4b2c-bc30-9fbc260e0f56.png"
              alt="Reviewdle God"
              className="w-48 h-48 object-cover"
              style={{
                animation: 'bounce 2s ease-in-out infinite',
                transform: 'translateY(0)',
              }}
            />
          </div>
          <h2 className="text-xl font-semibold">Next Reviewdle In</h2>
          <div className="text-4xl font-mono font-bold text-primary">
            {timeLeft}
          </div>
          <p className="text-sm text-muted-foreground">
            Check back at 12am EST for the next movie!
          </p>
          <ShareButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};