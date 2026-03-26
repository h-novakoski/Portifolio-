import { ChapterSection } from "../components/ChapterSection";
import { useLanguage } from "../i18n/useLanguage";

export function About() {
  const { t } = useLanguage();

  return (
    <ChapterSection id="about" title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.05]"
                style={{
                  clipPath:
                    "polygon(0% 0%, 92% 0%, 100% 20%, 100% 100%, 0% 100%)",
                }}
              >
                {/* Hover HUD (sem pintar o fundo) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  {/* ring interno roxo */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-[rgba(140,90,255,.28)]" />

                  {/* edge glow: topo */}
                  <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(70,160,255,.35)] to-transparent" />

                  {/* edge glow: direita */}
                  <div className="absolute top-6 bottom-6 right-0 w-px bg-gradient-to-b from-transparent via-[rgba(140,90,255,.30)] to-transparent" />
                </div>

                {/* Conteúdo */}
                <div className="relative">
                  <div className="mt-2 text-sm font-semibold text-white/85">
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
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6"
          style={{
            clipPath:
              "polygon(0% 0%, 92% 0%, 100% 10%, 100% 100%, 8% 100%, 0% 90%)",
          }}
        >
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-glowV/60 to-transparent" />

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
            {t.about.skills.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/60"
              >
                {tech}
              </span>
            ))}
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
