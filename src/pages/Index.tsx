import { Header } from "@/components/Header";
import { DateDisplay } from "@/components/DateDisplay";
import { GameContainer } from "@/components/GameContainer";
import { ShareButton } from "@/components/ShareButton";

const movieLibrary = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    starring: "Tim Robbins, Morgan Freeman",
    reviews: [
      "A tale of hope and friendship unfolds within the confines of a maximum-security prison. The protagonist's unwavering spirit becomes a beacon of inspiration for his fellow inmates.",
      "Through years of patient dedication, our main character cultivates relationships and skills that prove invaluable. His methodical approach to daily life masks deeper intentions.",
      "The power of time and perseverance takes center stage as a wrongfully convicted man refuses to let the system break him. His quiet intelligence serves a greater purpose.",
      "A story where appearances deceive, and the bonds formed behind prison walls transcend ordinary friendship. The narrator's perspective adds depth to this tale of justice and redemption.",
      "The truth behind decades of careful planning finally comes to light, revealing an extraordinary tale of patience and determination."
    ],
    reviewByGod: "A masterpiece that explores the indomitable human spirit and the power of hope. Through its deliberate pacing and rich character development, this prison drama transcends its setting to deliver a universal message about freedom, friendship, and the resilience of the human soul.",
    rating: "4.9/5 - Reviewdle God"
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