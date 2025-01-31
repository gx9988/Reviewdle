import { Header } from "@/components/Header";
import { DateDisplay } from "@/components/DateDisplay";
import { GameContainer } from "@/components/GameContainer";
import { ShareButton } from "@/components/ShareButton";

const movieLibrary = [
  {
    title: "Saving Private Ryan",
    year: 1998,
    starring: "Tom Hanks, Matt Damon",
    reviews: [
      "In the midst of chaos, a group of men embark on an extraordinary mission that challenges their understanding of duty and sacrifice. Their journey tests the limits of human courage.",
      "As they traverse through hostile territory, each step brings them closer to their objective. The weight of their mission grows heavier with every passing moment.",
      "Leadership and loyalty are put to the ultimate test as a captain leads his men on a seemingly impossible quest to find one soldier. The cost of war becomes increasingly apparent.",
      "Through the fog of war, a small unit searches for a needle in a haystack. Their mission raises questions about the value of one life against many.",
      "The brutal reality of their search unfolds against the backdrop of history's greatest conflict, where the line between duty and humanity becomes increasingly blurred."
    ],
    reviewByGod: "A masterpiece that captures the raw intensity and human cost of war while exploring themes of brotherhood, sacrifice, and the moral complexities of conflict. Through its unflinching lens, this film redefines the way we understand and remember one of history's most pivotal moments.",
    rating: "4.8/5 - Reviewdle God"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="h-[35vh] sm:h-[40vh] relative overflow-hidden bg-gray-200">
        <div className="absolute top-2 left-4 text-xs text-white/70 z-10 font-serif">est.2023</div>
        <img 
          src="/lovable-uploads/b951058c-38ab-4b10-8d47-13e9ce6642a9.png"
          alt="Reviewdle Banner"
          className="w-full h-full object-cover object-center transition-opacity duration-300"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          style={{
            backgroundImage: 'linear-gradient(to bottom, #1a1a1a, #2a2a2a)',
            opacity: 1
          }}
          onLoad={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background" 
          aria-hidden="true"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 -mt-12 sm:-mt-16 relative z-10">
        <Header />
        <DateDisplay />
        <GameContainer movie={movieLibrary[0]} />
        <ShareButton />
      </div>
    </div>
  );
};

export default Index;