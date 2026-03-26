import { useCallback, useEffect, useState } from "react";
import { setupScrollFX } from "./lib/gsap";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { CursorGlow } from "./components/CursorGlow";
import { SocialHud } from "./components/SocialHud";
import { TopHudBar } from "./components/TopHudBar";
import { SystemBoot } from "./components/SystemBoot";

export default function App() {
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (!bootDone) return;

    setupScrollFX();
  }, [bootDone]);

  const handleBootComplete = useCallback(() => {
    setBootDone(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink">
      <SystemBoot onComplete={handleBootComplete} />

      <div className={`app-shell ${bootDone ? "app-shell--ready" : ""}`}>
        <TopHudBar />
        <Hero />
        <About />
        <Projects />
        <CursorGlow />
        <SocialHud />
      </div>
    </div>
  );
}
