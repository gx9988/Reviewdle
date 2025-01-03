import { ProfileStats } from "./ProfileStats";
import { HowToPlay } from "./HowToPlay";

export const Header = () => {
  return (
    <div className="relative flex items-center justify-center mb-2">
      <h1 className="text-3xl sm:text-4xl font-bold font-muller animate-header-bounce">Reviewdle</h1>
      <div className="absolute right-0 flex items-center gap-2">
        <ProfileStats />
        <HowToPlay />
      </div>
    </div>
  );
};