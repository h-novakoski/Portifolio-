import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function TopHudBar() {
  const [clock, setClock] = useState(() => new Date());
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const status = useMemo(
    () => [
      { label: t.topbar.statusLabel, value: t.topbar.statusValue },
      { label: t.topbar.modeLabel, value: t.topbar.modeValue },
      { label: t.topbar.themeLabel, value: t.topbar.themeValue },
    ],
    [t],
  );

  return (
    <header className="pointer-events-none fixed left-0 top-0 z-[90] w-full px-4 pt-4 md:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/55 md:gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-glowB/80" />
          <span>{t.topbar.mission}</span>
          <span className="hidden text-white/35 md:inline">
            {t.topbar.dossier}
          </span>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60">
          {status.map((item) => (
            <span
              key={item.label}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
            >
              {item.label}: {item.value}
            </span>
          ))}

          <div className="ml-1 inline-flex items-center rounded-full border border-white/15 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => setLocale("pt")}
              className={[
                "rounded-full px-2 py-1 text-[10px] font-semibold transition",
                locale === "pt"
                  ? "bg-glowV/35 text-white"
                  : "text-white/65 hover:text-white",
              ].join(" ")}
              aria-label={`${t.topbar.langLabel}: Portugues`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={[
                "rounded-full px-2 py-1 text-[10px] font-semibold transition",
                locale === "en"
                  ? "bg-glowB/35 text-white"
                  : "text-white/65 hover:text-white",
              ].join(" ")}
              aria-label={`${t.topbar.langLabel}: English`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="text-xs font-medium tracking-[0.2em] text-white/70">
          {formatTime(clock)}
        </div>
      </div>
    </header>
  );
}
