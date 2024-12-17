import { Header } from "@/components/Header";
import { DateDisplay } from "@/components/DateDisplay";
import { GameContainer } from "@/components/GameContainer";
import { ShareButton } from "@/components/ShareButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const fetchDailyMovie = async () => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('used_on', today)
    .single();

  if (error) throw error;
  return data;
};

const LoadingState = () => (
  <div className="space-y-4 animate-pulse">
    <Skeleton className="h-8 w-3/4 mx-auto" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-12 w-1/2 mx-auto" />
  </div>
);

const Index = () => {
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['dailyMovie'],
    queryFn: fetchDailyMovie,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes (previously cacheTime)
  });

  if (error) {
    console.error('Error fetching movie:', error);
    return (
      <div className="text-center text-red-500 mt-8">
        Unable to load today's movie. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="h-[35vh] sm:h-[40vh] relative overflow-hidden">
        <div className="absolute top-2 left-4 text-xs text-white/70 z-10 font-serif">est.2023</div>
        <img 
          src="/lovable-uploads/b951058c-38ab-4b10-8d47-13e9ce6642a9.png"
          alt="Reviewdle Banner"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background" 
          aria-hidden="true"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 -mt-12 sm:-mt-16 relative z-10">
        <Header />
        <DateDisplay />
        {isLoading ? (
          <LoadingState />
        ) : movie ? (
          <GameContainer movie={movie} />
        ) : null}
        <ShareButton />
      </div>
    </div>
  );
};

export default Index;