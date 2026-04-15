import { Container } from "../components/Container";
import { useLanguage } from "../i18n/useLanguage";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative bg-ink text-white">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1100px 650px at 18% 35%, rgba(140,90,255,.18), transparent 60%)," +
            "radial-gradient(900px 600px at 82% 40%, rgba(70,160,255,.12), transparent 62%)," +
            "radial-gradient(900px 600px at 50% 110%, rgba(0,0,0,.65), transparent 55%)",
        }}
      />

      <Container>
        <div className="relative flex min-h-[74vh] items-start pb-12 pt-24 md:min-h-[78vh] md:pb-14 md:pt-24">
          <div
            data-hero-stage
            className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]"
          >
            {/* LEFT SIDE */}
            <div>
              <div
                data-hero-reveal="1"
                className="reveal-phase-1 mb-6 flex items-center gap-3"
              >
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] tracking-[0.45em] text-white/45">
                  {t.hero.eyebrow}
                </span>
              </div>

              <h1
                data-hero-reveal="2"
                className="reveal-phase-2 hud-title text-5xl font-bold tracking-tight md:text-7xl"
              >
                Higor Henrique
              </h1>

              <div
                data-hero-reveal="3"
                className="reveal-phase-3 hud-title mt-2 text-4xl font-bold tracking-tight text-white/65 md:text-5xl"
              >
                {t.hero.role}
              </div>

              <p
                data-hero-reveal="4"
                className="reveal-phase-4 mt-6 max-w-xl text-sm leading-relaxed text-white/72 md:text-base"
              >
                {t.hero.desc}
              </p>

              <div
                data-hero-reveal="5"
                className="reveal-phase-5 mt-8 flex flex-wrap gap-3"
              >
                <a href="#about" className="hud-btn">
                  ◈ {t.hero.aboutCta}
                </a>
                <a href="#projects" className="hud-btn hud-btn-p">
                  ◈ {t.hero.projectsCta}
                </a>
              </div>

              <div
                data-hero-reveal="6"
                className="reveal-phase-6 mt-8 flex flex-wrap gap-2"
              >
                {t.hero.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={i % 2 === 0 ? "hud-tag" : "hud-tag hud-tag-c"}
                  >
                    ◇ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - HUD CARD */}
            <div
              data-hero-reveal="7"
              className="reveal-phase-7 relative overflow-hidden rounded-[30px] border p-6 shadow-[0_30px_90px_rgba(0,0,0,.55)] grid-pattern"
              style={{
                clipPath:
                  "polygon(0% 0%, 94% 0%, 100% 12%, 100% 100%, 8% 100%, 0% 90%)",
                borderColor: "var(--border-purple-light)",
                backgroundColor: "var(--bg-purple-ultra-light)",
              }}
            >
              {/* Top glow line */}
              <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-purple-primary)] via-60% to-transparent opacity-50" />

              {/* Header */}
              <div>
                <div className="text-[10px] tracking-[0.45em] text-white/45">
                  {t.hero.statusTitle}
                </div>
                <div className="mt-1 text-lg font-semibold text-white/85">
                  {t.hero.statusValue}
                </div>
              </div>

              {/* Info Rows */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/45">{t.hero.age}</span>
                  <span className="text-white/75">{t.hero.ageValue}</span>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/45">{t.hero.location}</span>
                  <span className="text-white/75">{t.hero.locationValue}</span>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/45">{t.hero.specialty}</span>
                  <span className="text-white/75">{t.hero.specialtyValue}</span>
                </div>
              </div>

              {/* Status online dot */}
              <div className="mt-5 flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan-bright)]"
                  style={{
                    animation: "pulse-dot 2s ease-in-out infinite",
                    boxShadow: "0 0 0 0 rgba(0,255,224,.4)",
                  }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.22em]"
                  style={{ color: "rgba(0,255,224,.75)" }}
                >
                  ONLINE // ABERTO A PROPOSTAS
                </span>
              </div>

              {/* Bottom HUD line */}
              <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center gap-3 opacity-60">
                <span className="h-px flex-1 bg-white/10" />
                <span className="h-px w-10 bg-glowV/40" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
