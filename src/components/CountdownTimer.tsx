import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEstDate } from "@/hooks/use-est-date";

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
          <h2 className="text-xl font-semibold">Next Reviewdle In</h2>
          <div className="text-4xl font-mono font-bold text-primary">
            {timeLeft}
          </div>
          <p className="text-sm text-muted-foreground">
            Come back at midnight Eastern Time for a new movie!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};