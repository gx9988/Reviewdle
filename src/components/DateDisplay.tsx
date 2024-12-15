import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useEstDate } from "@/hooks/use-est-date";

export const DateDisplay = () => {
  return (
    <p className="text-muted-foreground text-center mb-4 sm:mb-6">
      {new Date().toLocaleDateString()}
    </p>
  );
};