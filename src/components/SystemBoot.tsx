import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

type Props = {
  onComplete?: () => void;
};

export function SystemBoot({ onComplete }: Props) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const { t } = useLanguage();
  const completedRef = useRef(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase("fading"), 1200);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, 1540);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none fixed inset-0 z-[120] flex items-center justify-center",
        "bg-[#05060b]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(76,171,255,0.18)_0,rgba(6,9,15,0.94)_42%,rgba(5,6,11,1)_74%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:100%_4px]" />

      <div
        className={[
          "relative w-[min(92vw,700px)] rounded-2xl border border-white/15 bg-black/55 p-6 backdrop-blur-md",
          "transition-all duration-500",
          phase === "fading"
            ? "translate-y-2 scale-[0.985] opacity-0"
            : "opacity-100",
        ].join(" ")}
      >
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/55">
          <span>{t.boot.mission}</span>
          <span className="boot-blink">{t.boot.loading}</span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div className="boot-progress h-full w-full bg-[linear-gradient(90deg,rgba(76,171,255,0.7),rgba(140,90,255,0.85),rgba(245,166,35,0.75))]" />
        </div>

        <div className="mt-5 grid gap-1 text-[11px] text-white/60 md:grid-cols-3">
          <span>{t.boot.line1}</span>
          <span>{t.boot.line2}</span>
          <span>{t.boot.line3}</span>
        </div>
      </div>
    </div>
  );
}
