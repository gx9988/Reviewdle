import { Header } from "@/components/Header";
import { DateDisplay } from "@/components/DateDisplay";
import { GameContainer } from "@/components/GameContainer";
import { ShareButton } from "@/components/ShareButton";

const movieLibrary = [
  {
    title: "The Number 23",
    year: 2007,
    starring: "Jim Carrey",
    reviews: [
      "A psychological thriller that delves into one man's obsession with a mysterious number. The protagonist's descent into paranoia creates an unsettling atmosphere throughout.",
      "What starts as a simple birthday gift turns into a dark journey of obsession and conspiracy. The main character's transformation from skeptic to believer is particularly compelling.",
      "The film weaves together reality and delusion as our lead character discovers eerie connections between his life and a disturbing novel. The number appears everywhere, driving him to the edge of sanity.",
      "A departure from the actor's usual comedic roles, showing his range in a darker performance. The parallel storylines keep you guessing until the end.",
      "The truth behind the number reveals a shocking connection to the protagonist's past."
    ],
    reviewByGod: "A mind-bending thriller that explores the fine line between coincidence and fate. Jim Carrey delivers a haunting performance as a man consumed by numerical obsession. The film's dark atmosphere and psychological elements create an engaging puzzle that keeps viewers counting along.",
    rating: "3.5/5 - Reviewdle God"
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