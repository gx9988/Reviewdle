import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useEstDate } from "@/hooks/use-est-date";

export const DateDisplay = () => {
  const [gameNumber, setGameNumber] = useState<number>(1);
  const { getESTDate } = useEstDate();

  useEffect(() => {
    const fetchGameNumber = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('id')
        .eq('used_on', getESTDate())
        .maybeSingle();

      if (error) {
        console.error('Error fetching game number:', error);
        return;
      }

      if (data) {
        setGameNumber(data.id);
      } else {
        setGameNumber(1);
      }
    };

    fetchGameNumber();
  }, []);

  return (
    <p className="text-muted-foreground text-center mb-4 sm:mb-6">
      {new Date().toLocaleDateString()} - <span className="text-muted-foreground">Game #{String(gameNumber).padStart(5, '0')}</span>
    </p>
  );
};