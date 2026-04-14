import {
  FolderKanban,
  Linkedin,
  Mail,
  Menu,
  Rocket,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import menuBg from "../assets/Gravando 2026-03-27 185048.mp4";
import { useLanguage } from "../i18n/useLanguage";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

type PhaseItem = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number }>;
};

type ContactItem = {
  key: string;
  href: string;
  label: string;
  subtitle: string;
  icon: ComponentType<{ size?: number }>;
};

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.04a9.93 9.93 0 0 0-8.57 15l-1.4 4.92 5.04-1.32A9.96 9.96 0 1 0 12 2.04Zm0 18.08c-1.54 0-3.05-.42-4.36-1.2l-.31-.18-2.98.78.83-2.92-.2-.31a8.06 8.06 0 1 1 7.02 3.83Zm4.42-5.89c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19a7.15 7.15 0 0 1-1.33-1.65c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.57 4.09 3.6.57.25 1.01.4 1.36.51.57.18 1.09.15 1.5.09.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function SitePhaseNav() {
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const [clock, setClock] = useState(() => new Date());

  const phases = useMemo<PhaseItem[]>(
    () => [
      {
        id: "top",
        href: "#top",
        title: locale === "pt" ? "Inicio" : "Home",
        subtitle: locale === "pt" ? "entrada principal" : "main entry",
        icon: Rocket,
      },
      {
        id: "about",
        href: "#about",
        title: t.about.title,
        subtitle: locale === "pt" ? "perfil e status" : "profile and status",
        icon: UserRound,
      },
      {
        id: "projects",
        href: "#projects",
        title: t.projects.title,
        subtitle: locale === "pt" ? "arquivos ativos" : "active files",
        icon: FolderKanban,
      },
    ],
    [locale, t.about.title, t.projects.title],
  );

  const contacts = useMemo<ContactItem[]>(
    () => [
      {
        key: "linkedin",
        href: "https://www.linkedin.com/in/higor-novakoski/",
        label: "LinkedIn",
        subtitle:
          locale === "pt" ? "perfil profissional" : "professional profile",
        icon: Linkedin,
      },
      {
        key: "whatsapp",
        href: "https://wa.me/5541920002316",
        label: "WhatsApp",
        subtitle: locale === "pt" ? "contato rapido" : "quick contact",
        icon: WhatsAppIcon,
      },
      {
        key: "email",
        href: "mailto:higor.novakoski@gmail.com",
        label: "Email",
        subtitle: locale === "pt" ? "canal formal" : "formal channel",
        icon: Mail,
      },
    ],
    [locale],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const ids = phases.map((phase) => phase.id);
    const markerOffset = 120;

    const updateActiveByTopMarker = () => {
      const marker = window.scrollY + markerOffset;

      let nextActive = ids[0] ?? "top";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.offsetTop <= marker) {
          nextActive = id;
        }
      }

      setActiveId(nextActive);
    };

    updateActiveByTopMarker();
    window.addEventListener("scroll", updateActiveByTopMarker, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveByTopMarker);

    return () => {
      window.removeEventListener("scroll", updateActiveByTopMarker);
      window.removeEventListener("resize", updateActiveByTopMarker);
    };
  }, [phases]);

  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[95] hidden lg:block">
        <aside className="pointer-events-auto sticky top-24 ml-4">
          <div
            className="relative isolate w-[230px] overflow-hidden rounded-2xl border border-[#da5f66]/45 bg-[linear-gradient(180deg,rgba(10,12,20,.9),rgba(7,9,14,.75))] p-3 shadow-[0_0_30px_rgba(218,95,102,.18)] backdrop-blur-md"
            style={{
              clipPath:
                "polygon(0% 0%, 86% 0%, 91% 4%, 100% 4%, 100% 100%, 4% 100%, 0% 96%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                src={menuBg}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,.82),rgba(6,8,12,.86))]" />
            </div>

            <div className="relative z-10 mb-3 rounded-md border border-[#da5f66]/35 bg-[#d55f66]/14 px-2 py-1">
              <div className="flex items-center justify-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
                    aria-label={
                      locale === "pt"
                        ? "Alterar idioma para English"
                        : "Alterar idioma para Portugues"
                    }
                    className="relative inline-flex h-6 w-[62px] items-center rounded-full border border-[#ff949c]/25 bg-black/22 p-[2px]"
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute left-[2px] top-[2px] h-[20px] w-7 rounded-full transition-transform duration-200",
                        locale === "pt"
                          ? "translate-x-0 bg-[#7f5cff]/50"
                          : "translate-x-7 bg-[#47a2ff]/50",
                      ].join(" ")}
                    />
                    <span className="relative z-10 grid w-full grid-cols-2 text-[8px] font-medium tracking-[0.14em]">
                      <span
                        className={
                          locale === "pt" ? "text-white" : "text-[#ffb4b8]/70"
                        }
                      >
                        PT
                      </span>
                      <span
                        className={
                          locale === "en" ? "text-white" : "text-[#ffb4b8]/70"
                        }
                      >
                        EN
                      </span>
                    </span>
                  </button>
                  <span className="text-[8px] font-medium tracking-[0.16em] text-[#ffd2d6]/78">
                    {formatTime(clock)}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              {phases.map((phase) => {
                const isActive = activeId === phase.id;
                const Icon = phase.icon;

                return (
                  <a
                    key={phase.id}
                    href={phase.href}
                    className={[
                      "group relative block overflow-hidden border p-2 transition",
                      isActive
                        ? "border-[#4ca8ff]/65 bg-[linear-gradient(90deg,rgba(26,52,78,.65),rgba(12,20,30,.82))]"
                        : "border-[#274056]/65 bg-[linear-gradient(90deg,rgba(16,28,43,.55),rgba(10,16,24,.75))] hover:border-[#4ca8ff]/45",
                    ].join(" ")}
                    style={{
                      clipPath:
                        "polygon(0% 0%, 92% 0%, 100% 22%, 100% 100%, 8% 100%, 0% 78%)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "grid h-5 w-5 place-items-center rounded-sm border",
                            isActive
                              ? "border-[#4ca8ff]/75 text-[#83c8ff]"
                              : "border-[#2a4a63]/65 text-white/65",
                          ].join(" ")}
                        >
                          <Icon size={12} />
                        </span>
                        <span
                          className={[
                            "text-[10px] uppercase tracking-[0.22em]",
                            isActive ? "text-[#e7f3ff]" : "text-white/78",
                          ].join(" ")}
                        >
                          {phase.title}
                        </span>
                      </div>

                      <span
                        className={
                          isActive ? "text-[#7fcbff]" : "text-white/40"
                        }
                      >
                        {phase.code}
                      </span>
                    </div>

                    <div className="mt-1 pl-7 text-[8px] uppercase tracking-[0.2em] text-white/45">
                      {phase.subtitle}
                    </div>

                    <span className="pointer-events-none absolute right-1 top-1 text-[9px] text-[#ff6d78]/80">
                      ▾
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="relative z-10 my-3 h-px bg-gradient-to-r from-transparent via-[#da5f66]/45 to-transparent" />

            <div className="relative z-10 space-y-2">
              {contacts.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block overflow-hidden border border-[#2a4a63]/65 bg-[linear-gradient(90deg,rgba(16,28,43,.55),rgba(10,16,24,.75))] p-2 transition hover:border-[#4ca8ff]/45"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 92% 0%, 100% 22%, 100% 100%, 8% 100%, 0% 78%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-sm border border-[#2a4a63]/65 text-white/70 group-hover:border-[#4ca8ff]/60 group-hover:text-[#a8daff]">
                        <Icon size={12} />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 group-hover:text-white/90">
                        {item.label}
                      </span>
                    </div>

                    <div className="mt-1 pl-7 text-[8px] uppercase tracking-[0.2em] text-white/45">
                      {item.subtitle}
                    </div>

                    <span className="pointer-events-none absolute right-1 top-1 text-[9px] text-[#ff6d78]/80">
                      ▾
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <div className="pointer-events-auto fixed bottom-6 left-4 z-[95] lg:hidden">
        <button
          type="button"
          aria-label={locale === "pt" ? "Abrir atalhos" : "Open shortcuts"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((state) => !state)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60 text-white/85 backdrop-blur-md"
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>

        {menuOpen ? (
          <div className="absolute bottom-14 left-0 isolate w-[230px] overflow-hidden rounded-2xl border border-white/10 bg-black/65 p-3 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-35"
                src={menuBg}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,.84),rgba(6,8,12,.88))]" />
            </div>

            <div className="relative z-10 mb-2 text-[9px] uppercase tracking-[0.3em] text-white/55">
              {locale === "pt" ? "fases do site" : "site phases"}
            </div>

            <div className="relative z-10 space-y-2">
              {phases.map((phase) => {
                const isActive = activeId === phase.id;
                const Icon = phase.icon;

                return (
                  <a
                    key={phase.id}
                    href={phase.href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-xl border px-3 py-2 text-[10px] uppercase tracking-[0.2em]",
                      isActive
                        ? "border-glowV/50 bg-glowV/20 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/70",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={12} />
                      <span>{phase.title}</span>
                    </span>
                    <span
                      className={isActive ? "text-glowB/90" : "text-white/45"}
                    >
                      {phase.code}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="relative z-10 my-2 h-px bg-white/10" />

            <div className="relative z-10 space-y-2">
              {contacts.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70"
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={12} />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-white/45">↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
