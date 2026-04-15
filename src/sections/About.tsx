import { ChapterSection } from "../components/ChapterSection";
import { useLanguage } from "../i18n/useLanguage";

export function About() {
  const { t } = useLanguage();

  return (
    <ChapterSection id="about" title={t.about.title}>
      <div className="scanlines-bg grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        {/* LEFT SIDE */}
        <div>
          {/* HUD Header */}
          <div
            data-about-reveal="1"
            className="mb-8 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-gradient-to-l from-white/15 to-transparent" />
            <span className="h-1 w-1 rounded-full bg-glowV/55" />
            <span className="text-[10px] tracking-[0.45em] text-white/45">
              {t.about.profileHeader}
            </span>
            <span className="h-1 w-1 rounded-full bg-glowV/55" />
            <span className="h-px w-16 bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          {/* Descrição baseada no currículo */}
          <p
            data-about-reveal="2"
            className="max-w-2xl leading-relaxed text-white/70"
          >
            {t.about.paragraph1}
          </p>

          <p
            data-about-reveal="3"
            className="mt-5 leading-relaxed text-white/60"
          >
            {t.about.paragraph2}
          </p>

          {/* Áreas de atuação */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.about.areas.map((item, index) => (
              <div
                key={item.t}
                data-about-reveal={`${4 + index}`}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:bg-white/[0.05]"
                style={{
                  clipPath:
                    "polygon(0% 0%, 92% 0%, 100% 18%, 100% 100%, 0% 100%)",
                  borderColor: "rgba(168,85,247,.18)",
                }}
              >
                {/* Top glow line on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan-bright)] via-50% to-transparent opacity-40" />
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-purple-primary)] via-50% to-transparent opacity-25" />
                </div>

                {/* Corner brackets */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 w-3 h-3"
                  style={{
                    borderTop: "1px solid rgba(0,255,224,.4)",
                    borderLeft: "1px solid rgba(0,255,224,.4)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 w-3 h-3"
                  style={{
                    borderBottom: "1px solid rgba(168,85,247,.35)",
                    borderRight: "1px solid rgba(168,85,247,.35)",
                  }}
                />

                {/* Conteúdo */}
                <div className="relative">
                  <div
                    className="mb-1.5 font-mono text-[8px] tracking-[0.3em]"
                    style={{ color: "rgba(0,255,224,.55)" }}
                  >
                    ◈ ÁREA_0{index + 1}
                  </div>
                  <div className="text-sm font-semibold text-white/85">
                    {item.t}
                  </div>
                  <div className="mt-1 text-sm text-white/55">{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - STATUS */}
        <div
          data-about-reveal="8"
          className="relative overflow-hidden rounded-3xl p-6"
          style={{
            clipPath:
              "polygon(0% 0%, 92% 0%, 100% 10%, 100% 100%, 8% 100%, 0% 90%)",
            borderColor: "var(--border-purple-light)",
            backgroundColor: "var(--bg-purple-ultra-light)",
            border: "1px solid",
          }}
        >
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-purple-primary)] via-60% to-transparent opacity-50" />

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.45em] text-white/45">
                {t.about.statusTitle}
              </div>
              <div className="mt-1 text-lg font-semibold text-white/85">
                {t.about.statusValue}
              </div>
            </div>

            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/[0.02]" />
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-6">
              <span className="text-white/50">{t.about.educationLabel}</span>
              <span className="text-white/75">{t.about.educationValue}</span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-white/50">{t.about.courseLabel}</span>
              <span className="text-white/75">{t.about.courseValue}</span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-white/50">{t.about.englishLabel}</span>
              <span className="text-white/75">{t.about.englishValue}</span>
            </div>
          </div>

          <div className="my-5 h-px bg-white/10" />

          {/* Skills tags */}
          <div className="flex flex-wrap gap-2">
            {t.about.skills.map((tech, i) => (
              <span
                key={tech}
                className={i % 2 === 0 ? "hud-tag" : "hud-tag hud-tag-c"}
                style={{ fontSize: "9px", padding: "3px 8px" }}
              >
                ◇ {tech}
              </span>
            ))}
          </div>

          {/* ── GITHUB SKILLS ───────────────────────────── */}
          <div className="mt-5">
            {/* section label */}
            <div className="mb-2 flex items-center gap-2">
              <span
                className="font-mono text-[8px] tracking-[0.3em]"
                style={{ color: "rgba(0,255,224,.55)" }}
              >
                ◈ GITHUB_LIVE_DATA
              </span>
              <div
                className="h-px flex-1"
                style={{ background: "rgba(168,85,247,.15)" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--color-cyan-bright)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Skill rows — compact, no bytes column */}
            <div className="flex flex-col gap-1.5">
              {(
                [
                  { name: "TYPESCRIPT", pct: 38 },
                  { name: "JAVASCRIPT", pct: 24 },
                  { name: "CSS", pct: 19 },
                  { name: "GO", pct: 13 },
                  { name: "HTML", pct: 6 },
                ] as { name: string; pct: number }[]
              ).map(({ name, pct }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 px-2 py-1.5 border"
                  style={{
                    background: "rgba(0,0,0,.3)",
                    borderColor: "rgba(0,255,224,.1)",
                  }}
                >
                  <span
                    className="font-mono text-[7px]"
                    style={{ color: "rgba(0,255,224,.55)" }}
                  >
                    ◈
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] w-20 shrink-0"
                    style={{ color: "var(--color-purple-light)" }}
                  >
                    {name}
                  </span>
                  <div
                    className="relative flex-1 h-[4px]"
                    style={{ background: "rgba(0,0,0,.5)" }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(90deg,var(--color-purple-deep) 0%,var(--color-purple-primary) 50%,var(--color-cyan-bright) 100%)",
                        boxShadow: "0 0 6px rgba(0,255,224,.4)",
                      }}
                    />
                  </div>
                  <span
                    className="font-mono text-[9px] w-7 text-right shrink-0"
                    style={{ color: "var(--color-cyan-bright)" }}
                  >
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center gap-3 opacity-60">
            <span className="h-px flex-1 bg-white/10" />
            <span className="h-1 w-1 rounded-full bg-glowB/70" />
            <span className="h-px w-10 bg-glowV/40" />
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
