import { Container } from "../components/Container";
import { useLanguage } from "../i18n/useLanguage";

export function Hero() {
  const { t } = useLanguage();
  const heroRows = [
    { label: "AGE", value: "23_ANOS" },
    { label: "LOCATION", value: "CURITIBA_PR" },
    { label: "SPECIALTY", value: "FRONT_END" },
    { label: "STATUS", value: "DISPONIVEL", accent: true },
  ];

  return (
    <section
      id="top"
      className="relative scroll-mt-[108px] bg-ink text-white xl:scroll-mt-[112px]"
    >
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
        <div className="relative flex min-h-[72vh] items-center pb-10 pt-20 md:min-h-[76vh] md:pb-12 md:pt-20">
          <div data-hero-stage className="hero-preview-grid w-full">
            <div className="max-w-[520px]">
              <div data-hero-reveal="1" className="reveal-phase-1 hero-preview-eyebrow">
                <span className="hero-preview-eyebrow-line" />
                <span className="hero-preview-eyebrow-text">
                  {"\u25C8"} MISSAO // DOSSIE OPERACIONAL
                </span>
              </div>

              <h1 data-hero-reveal="2" className="reveal-phase-2 hero-preview-name">
                HIGOR
                <br />
                HENRIQUE
              </h1>

              <div data-hero-reveal="3" className="reveal-phase-3 hero-preview-role">
                // Front-End Developer
              </div>

              <p data-hero-reveal="4" className="reveal-phase-4 hero-preview-desc">
                I build interfaces focused on visual storytelling, performance,
                and product clarity. Cinematic design with formal execution.
              </p>

              <div data-hero-reveal="5" className="reveal-phase-5 btns-a mt-[22px]">
                <a href="#about" className="btn-a">
                  {"\u25C8"} {t.hero.aboutCta}
                </a>
                <a href="#projects" className="btn-a p">
                  {"\u25C8"} {t.hero.projectsCta}
                </a>
              </div>

              <div data-hero-reveal="6" className="reveal-phase-6 tags-a mt-[18px]">
                {[
                  "UI ENGINEERING",
                  "REACT + TS",
                  "DESIGN DIGITAL",
                  "TAILWIND",
                ].map((tag, index) => (
                  <span key={tag} className={index % 2 === 0 ? "tag-a" : "tag-a c"}>
                    {"\u25C7"} {tag}
                  </span>
                ))}
              </div>
            </div>

            <div data-hero-reveal="7" className="reveal-phase-7 hero-preview-panel">
              <div className="hc-lbl">// STATUS OPERACIONAL</div>
              <div className="hc-val mb-1">{t.hero.statusValue}</div>

              <div className="dot-a mb-1">
                <span className="d" />
                ONLINE // ABERTO A PROPOSTAS
              </div>

              <div className="hc-sep" />

              <div className="rows-a">
                {heroRows.map(({ label, value, accent }) => (
                  <div key={label} className="row-a">
                    <span className="rl-a">{label}</span>
                    <span className={accent ? "rv-a hero-preview-accent" : "rv-a"}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hc-foot">
                <div className="fl" />
                <div className="fd" />
                <div className="fs" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
