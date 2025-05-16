
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
      "This cinematic achievement throws viewers directly into the intensity of war, offering a visceral experience unlike any before it. The director's unflinching approach brings authenticity to a story of extraordinary courage under unimaginable circumstances.",
      "The film's ensemble cast delivers powerhouse performances in what can only be described as a harrowing journey through war-torn Europe. Each character brings depth to a morally complex mission that questions the value of sacrifice.",
      "Few war films have captured the camaraderie and tension of a small unit with such precision. The camera work puts viewers alongside soldiers as they navigate both physical terrain and ethical dilemmas with equal difficulty.",
      "This landmark production revolutionized the war genre with its realistic portrayal of combat and its aftermath. Beyond the technical achievements, the film finds its heart in the bonds formed between men united by duty yet divided by their understanding of it.",
      "A tour de force that begins with one of cinema's most unforgettable sequences and never loses its grip. The haunting score and documentary-like cinematography create an immersive experience that honors the true cost of freedom."
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
