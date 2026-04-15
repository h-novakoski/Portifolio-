import type { ReactNode } from "react";
import { Container } from "./Container";

const SECTION_META: Record<
  string,
  { num: string; sub: string; label: string }
> = {
  about: { num: "// 02", sub: "PROFILE // STATUS", label: "SECTION_02" },
  projects: {
    num: "// 03",
    sub: "ACTIVE_FILES // ARCHIVE",
    label: "SECTION_03",
  },
};

type Props = {
  id?: string;
  title: string;
  children: ReactNode;
  variant?: "left" | "center";
  /** Skip the inner card wrapper — use when the section already has its own full-bleed card */
  bare?: boolean;
};

export function ChapterSection({
  id,
  title,
  children,
  variant = "left",
  bare = false,
}: Props) {
  const isAboutSection = id === "about";
  const isProjectsSection = id === "projects";
  const meta = id ? SECTION_META[id] : undefined;

  return (
    <section id={id} className="relative bg-ink text-white">
      {/* background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px 520px at 15% 35%, rgba(140,90,255,.16), transparent 62%)," +
            "radial-gradient(900px 520px at 85% 55%, rgba(70,160,255,.12), transparent 64%)",
        }}
      />

      <Container>
        <div
          className={[
            "relative",
            isAboutSection
              ? "py-10 md:py-12"
              : isProjectsSection
                ? "py-9 md:py-12"
                : "py-16 md:py-20",
          ].join(" ")}
        >
          {/* Title */}
          <div
            className={[
              isAboutSection
                ? "relative mb-6"
                : isProjectsSection
                  ? "relative mb-5"
                  : "relative mb-10",
              variant === "center" ? "text-center" : "text-left",
            ].join(" ")}
          >
            {/* Number + title row */}
            <div
              {...(isAboutSection
                ? { "data-about-reveal": "1" }
                : isProjectsSection
                  ? { "data-projects-reveal": "1" }
                  : { "data-reveal": true })}
              className={[
                "flex items-start gap-3.5",
                variant === "center" ? "justify-center" : "justify-start",
              ].join(" ")}
            >
              {meta && (
                <span className="sec-num mt-1.5">{meta.num}</span>
              )}
              <div>
                <h2
                  className={[
                    "hud-title text-3xl font-bold md:text-5xl drop-shadow-[0_0_24px_rgba(140,90,255,.28)]",
                    meta
                      ? "uppercase tracking-[.06em] text-white/94"
                      : "tracking-tight text-white/88",
                  ].join(" ")}
                >
                  {title}
                </h2>
                {meta && (
                  <span className="sec-sub">{meta.sub}</span>
                )}
              </div>
            </div>

            {/* Diamond notch divider */}
            <div
              {...(isAboutSection
                ? { "data-about-reveal": "1" }
                : isProjectsSection
                  ? { "data-projects-reveal": "1" }
                  : { "data-reveal": true })}
              className="sec-rule mt-3"
            >
              <div className="sec-rule-line w-10" />
              <div className="sec-rule-diamond" />
              <div className="sec-rule-line flex-1" />
              {meta && (
                <span className="sec-rule-label">{meta.label}</span>
              )}
              <div className="sec-rule-line w-6" />
              <div className="sec-rule-dot" />
            </div>
          </div>

          {/* Content — bare mode skips the inner card wrapper */}
          {bare ? (
            <div className="relative">{children}</div>
          ) : (
            <div className="relative">
              <div
                {...(isAboutSection
                  ? { "data-about-reveal": "1" }
                  : isProjectsSection
                    ? { "data-projects-reveal": "1" }
                    : {})}
                className="pointer-events-none absolute -inset-2 rounded-[28px] border border-white/10"
              />

              <div
                {...(isAboutSection
                  ? { "data-about-reveal": "1" }
                  : isProjectsSection
                    ? { "data-projects-reveal": "1" }
                    : {})}
                className="pointer-events-none absolute -inset-2 rounded-[28px] [mask-image:linear-gradient(#000,transparent)]"
              >
                <div className="absolute left-4 top-4 h-10 w-10 rounded-xl border border-glowV/40" />
                <div className="absolute right-4 top-4 h-10 w-10 rounded-xl border border-glowB/35" />
                <div className="absolute left-4 bottom-4 h-10 w-10 rounded-xl border border-glowB/25" />
                <div className="absolute right-4 bottom-4 h-10 w-10 rounded-xl border border-glowV/25" />
              </div>

              <div
                {...(isAboutSection
                  ? { "data-about-reveal": "1" }
                  : isProjectsSection
                    ? { "data-projects-reveal": "2" }
                    : {})}
                className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,.55)] md:p-10"
              >
                {/* scanline */}
                <div
                  aria-hidden="true"
                  {...(isAboutSection
                    ? { "data-about-reveal": "1" }
                    : isProjectsSection
                      ? { "data-projects-reveal": "2" }
                      : {})}
                  data-reveal-decor="true"
                  className="pointer-events-none absolute inset-0 z-[0]"
                >
                  <div
                    className="absolute -left-1/3 top-0 h-full w-2/3 opacity-30"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(140,90,255,.18) 45%, rgba(70,160,255,.10) 55%, transparent 100%)",
                      transform: "skewX(-18deg)",
                      animation: "scan 6s linear infinite",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.10]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), " +
                        "linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                      backgroundSize: "42px 42px",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0,rgba(0,0,0,.35)_75%,rgba(0,0,0,.55)_100%)]" />
                </div>

                <div className="relative z-[1]">{children}</div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
