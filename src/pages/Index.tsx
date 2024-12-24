import { Header } from "@/components/Header";
import { DateDisplay } from "@/components/DateDisplay";
import { GameContainer } from "@/components/GameContainer";
import { ShareButton } from "@/components/ShareButton";

const movieLibrary = [
  {
    title: "Scream",
    year: 1996,
    starring: "Neve Campbell",
    reviews: [
      "A masterful blend of horror and satire that keeps you guessing until the very end. The clever script turns typical slasher tropes on their head while delivering genuine scares.",
      "This meta-horror masterpiece dissects the genre with surgical precision. The killer's knowledge of horror movie rules creates a uniquely terrifying game of cat and mouse.",
      "A brilliant deconstruction of the slasher genre that manages to be both scary and darkly humorous. The performances are pitch-perfect, especially from our final girl.",
      "The film's self-awareness elevates it above standard horror fare, while never sacrificing the tension and thrills that make the genre great.",
      "This iconic movie started a franchise that left us hanging on every call."
    ],
    reviewByGod: "The perfect mix of horror and humor, 'Scream' redefines the genre while keeping you on the edge. Ghostface remains one of the most memorable villains in horror history. A 90s masterpiece that's as witty as it is scary.",
    rating: "4.5/5 - Reviewdle God"
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