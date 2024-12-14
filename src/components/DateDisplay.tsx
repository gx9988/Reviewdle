import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DateDisplay = () => {
  const [gameNumber, setGameNumber] = useState<number>(0);

  useEffect(() => {
    const fetchGameNumber = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('id')
        .eq('used_on', new Date().toISOString().split('T')[0])
        .single();

      if (error) {
        console.error('Error fetching game number:', error);
        return;
      }

      if (data) {
        setGameNumber(data.id);
      }
    };

    fetchGameNumber();
  }, []);

  return (
    <p className="text-muted-foreground text-center mb-4 sm:mb-6">
      {new Date().toLocaleDateString()} - <span className="text-muted-foreground">#{String(gameNumber).padStart(5, '0')}</span>
    </p>
  );
};