import { useCallback, useEffect, useState } from "react";
import { setupScrollFX } from "./lib/gsap";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { CursorGlow } from "./components/CursorGlow";
import { SystemBoot } from "./components/SystemBoot";
import { SitePhaseNav } from "./components/SitePhaseNav";

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
        <SitePhaseNav />
        <Hero />
        <About />
        <Projects />
        <CursorGlow />
      </div>
    </div>
  );
}
