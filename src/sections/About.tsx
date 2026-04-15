import { ChapterSection } from "../components/ChapterSection";
import { useLanguage } from "../i18n/useLanguage";

const GITHUB_STACK_PREVIEW = [
  { name: "TYPESCRIPT", pct: 38 },
  { name: "JAVASCRIPT", pct: 24 },
  { name: "CSS", pct: 19 },
  { name: "GO", pct: 13 },
  { name: "HTML", pct: 6 },
] as const;

export function About() {
  const { t } = useLanguage();

  return (
    <ChapterSection id="about" title={t.about.title}>
      <div className="scanlines-bg grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
        <div>
          <div
            data-about-reveal="1"
            className="mb-8 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-gradient-to-l from-white/15 to-transparent" />
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "rgba(168,85,247,.55)" }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.45em]"
              style={{ color: "rgba(255,255,255,.45)" }}
            >
              {t.about.profileHeader}
            </span>
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "rgba(168,85,247,.55)" }}
            />
            <span className="h-px w-16 bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          <p
            data-about-reveal="2"
            className="max-w-2xl text-base leading-[1.75] text-white/72"
          >
            {t.about.paragraph1}
          </p>

          <p
            data-about-reveal="3"
            className="mt-5 max-w-2xl text-sm leading-[1.75] text-white/55"
          >
            {t.about.paragraph2}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.about.areas.map((item, index) => (
              <div
                key={item.t}
                data-about-reveal={`${4 + index}`}
                className="group relative overflow-hidden border bg-black/20 p-4 transition-colors duration-300"
                style={{
                  clipPath:
                    "polygon(0% 0%, 92% 0%, 100% 18%, 100% 100%, 0% 100%)",
                  borderColor: "rgba(168,85,247,.2)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(168,85,247,.05),transparent_45%,rgba(0,255,224,.03))]" />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-3 w-3"
                  style={{
                    borderTop: "1px solid rgba(0,255,224,.4)",
                    borderLeft: "1px solid rgba(0,255,224,.4)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-3 w-3"
                  style={{
                    borderBottom: "1px solid rgba(168,85,247,.35)",
                    borderRight: "1px solid rgba(168,85,247,.35)",
                  }}
                />

                <div className="relative">
                  <div
                    className="mb-2 font-mono text-[8px] tracking-[0.3em]"
                    style={{ color: "rgba(0,255,224,.55)" }}
                  >
                    {"\u25C8"} AREA_0{index + 1}
                  </div>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-white/88">
                    {item.t}
                  </div>
                  <div className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {item.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-about-reveal="8"
          className="relative self-start overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-7"
          style={{
            clipPath:
              "polygon(0% 0%,92% 0%,100% 10%,100% 100%,8% 100%,0% 90%)",
          }}
        >
          <div
            className="pointer-events-none absolute left-0 top-0 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(168,85,247,.65) 55%,transparent)",
            }}
          />

          <div className="flex items-center justify-between">
            <div>
              <div
                className="font-mono text-[8px] tracking-[0.38em]"
                style={{ color: "rgba(255,255,255,.3)" }}
              >
                // STATUS ACADEMICO
              </div>
              <div
                className="mt-1 text-lg font-semibold"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "rgba(238,244,255,.85)",
                }}
              >
                {t.about.statusValue}
              </div>
            </div>

            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/[0.02]" />
          </div>

          <div data-about-reveal="9" className="mt-6 flex flex-col">
            {(
              [
                {
                  label: t.about.educationLabel,
                  value: t.about.educationValue,
                },
                { label: t.about.courseLabel, value: t.about.courseValue },
                { label: t.about.englishLabel, value: t.about.englishValue },
              ] as { label: string; value: string }[]
            ).map(({ label, value }) => (
              <div
                key={label}
                className="relative flex items-center justify-between px-3 py-2 text-sm"
                style={{ borderBottom: "1px solid rgba(168,85,247,.08)" }}
              >
                <span
                  className="absolute left-0 font-mono text-[8px]"
                  style={{ color: "rgba(0,255,224,.3)" }}
                >
                  {"\u25C2"}
                </span>
                <span
                  className="pl-2 font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,.38)" }}
                >
                  {label}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.1em] text-right"
                  style={{ color: "rgba(238,244,255,.75)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="my-5 h-px"
            style={{ background: "rgba(168,85,247,.14)" }}
          />

          <div className="flex flex-wrap gap-2">
            {t.about.skills.map((tech, index) => (
              <span
                key={tech}
                className={index % 2 === 0 ? "hud-tag" : "hud-tag hud-tag-c"}
                style={{ fontSize: "9px", padding: "3px 8px" }}
              >
                {"\u25C7"} {tech}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="font-mono text-[8px] tracking-[0.3em]"
                style={{ color: "rgba(0,255,224,.55)" }}
              >
                {"\u25C8"} GITHUB_TECH_FOOTPRINT
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

            <div className="flex flex-col gap-1.5">
              {GITHUB_STACK_PREVIEW.map(({ name, pct }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 border px-2 py-1.5"
                  style={{
                    background: "rgba(0,0,0,.3)",
                    borderColor: "rgba(0,255,224,.1)",
                  }}
                >
                  <span
                    className="font-mono text-[7px]"
                    style={{ color: "rgba(0,255,224,.55)" }}
                  >
                    {"\u25C8"}
                  </span>
                  <span
                    className="w-20 shrink-0 font-mono text-[9px] tracking-[0.15em]"
                    style={{ color: "var(--color-purple-light)" }}
                  >
                    {name}
                  </span>
                  <div
                    className="relative h-[4px] flex-1"
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
                    className="w-7 shrink-0 text-right font-mono text-[9px]"
                    style={{ color: "var(--color-cyan-bright)" }}
                  >
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center gap-3 opacity-55">
            <span className="h-px flex-1 bg-white/10" />
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "rgba(70,160,255,.7)" }}
            />
            <span
              className="h-px w-10"
              style={{ background: "rgba(168,85,247,.4)" }}
            />
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
