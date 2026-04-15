import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ChapterSection } from "../components/ChapterSection";
import { HudStepper } from "../components/HudStepper";
import { useLanguage } from "../i18n/useLanguage";
import { animateProjectSwap } from "../lib/projectSwap";
import type { Locale } from "../i18n/copy";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  impact: string;
  preview?: string;
};

const PROJECTS: Project[] = [
  {
    id: "edge-gateway",
    title: "Edge Gateway Service",
    subtitle: "Unified request routing",
    desc: "Gateway layer that centralizes request routing, throttling, and request normalization for multiple backend domains.",
    tags: ["Go", "Gateway", "Routing", "API"],
    impact: "More consistent traffic handling and simpler client integration.",
    preview: "/projects/edge-gateway.png",
  },
  {
    id: "queue-orchestrator",
    title: "Queue Orchestrator",
    subtitle: "Background job coordination",
    desc: "Asynchronous job coordinator with retries, priority queues, and deterministic processing for long-running backend tasks.",
    tags: ["Go", "Queue", "Workers", "Retries"],
    impact: "Higher job completion rate with predictable execution behavior.",
    preview: "/projects/queue-orchestrator.png",
  },
  {
    id: "catalog-service",
    title: "Catalog Service",
    subtitle: "Structured domain registry",
    desc: "Domain catalog API for managing entities, lifecycle states, and validation policies across distributed product modules.",
    tags: ["Go", "Catalog", "Domain", "Validation"],
    impact: "Improved domain consistency and lower integration friction.",
    preview: "/projects/catalog-service.png",
  },
  {
    id: "insights-portal",
    title: "Insights Portal",
    subtitle: "Analytical operations UI",
    desc: "Interactive frontend focused on operational insights, blending high-density information views with guided user flows.",
    tags: ["React", "TypeScript", "Tailwind", "UX"],
    impact: "Better decision speed through clearer operational visibility.",
    preview: "/projects/insights-portal.png",
  },
  {
    id: "query-fabric",
    title: "Query Fabric",
    subtitle: "Composable filter layer",
    desc: "Composable query abstraction that supports multi-field filtering, sorting, and cursor pagination with strict input safeguards.",
    tags: ["Go", "Query", "Filters", "Pagination"],
    impact: "Flexible querying model with reduced API duplication.",
    preview: "/projects/query-fabric.png",
  },
  {
    id: "contract-hub",
    title: "Contract Hub",
    subtitle: "Validation contracts",
    desc: "Central hub for maintaining validation contracts and versioned schema bundles consumed by multiple backend services.",
    tags: ["Go", "Schema", "Contracts", "Versioning"],
    impact: "Safer contract evolution with fewer breaking changes.",
    preview: "/projects/contract-hub.png",
  },
  {
    id: "policy-shield",
    title: "Policy Shield",
    subtitle: "Access policy engine",
    desc: "Policy enforcement module for role and scope verification, designed to secure endpoints with centralized authorization rules.",
    tags: ["Go", "Security", "Policies", "Auth"],
    impact: "More reliable access control and easier policy audits.",
    preview: "/projects/policy-shield.png",
  },
  {
    id: "timeline-log",
    title: "Timeline Log",
    subtitle: "Entity change journal",
    desc: "Reusable journaling component that records entity transitions, actor metadata, and before-after snapshots for traceability.",
    tags: ["Go", "Audit", "History", "Logs"],
    impact: "Clearer accountability across operational workflows.",
    preview: "/projects/timeline-log.png",
  },
  {
    id: "bulk-runner",
    title: "Bulk Runner",
    subtitle: "Controlled mass operations",
    desc: "Bulk execution module for staged imports and updates with checkpoints, rollback hooks, and detailed progress tracking.",
    tags: ["Go", "Batch", "Processing", "Control"],
    impact: "Safer large-scale operations with transparent execution states.",
    preview: "/projects/bulk-runner.png",
  },
  {
    id: "core-toolkit",
    title: "Core Toolkit",
    subtitle: "Shared engineering utilities",
    desc: "Shared package containing logging helpers, validation adapters, error mappers, and reusable middleware patterns.",
    tags: ["Go", "Library", "Toolkit", "DX"],
    impact: "Faster onboarding and stronger technical consistency.",
    preview: "/projects/core-toolkit.png",
  },
];

const PROJECTS_PT: Project[] = [
  {
    id: "edge-gateway",
    title: "Edge Gateway Service",
    subtitle: "Roteamento unificado de requisicoes",
    desc: "Camada de gateway que centraliza roteamento, limitacao de taxa e normalizacao de chamadas para multiplos dominios backend.",
    tags: ["Go", "Gateway", "Routing", "API"],
    impact:
      "Tratamento de trafego mais consistente e integracao mais simples para clientes.",
    preview: "/projects/edge-gateway.png",
  },
  {
    id: "queue-orchestrator",
    title: "Queue Orchestrator",
    subtitle: "Coordenacao de jobs em segundo plano",
    desc: "Coordenador assincrono de jobs com retries, filas por prioridade e processamento deterministico para tarefas de longa duracao.",
    tags: ["Go", "Queue", "Workers", "Retries"],
    impact: "Maior taxa de conclusao de jobs com execucao previsivel.",
    preview: "/projects/queue-orchestrator.png",
  },
  {
    id: "catalog-service",
    title: "Catalog Service",
    subtitle: "Registro estruturado de dominio",
    desc: "API de catalogo de dominio para gerenciar entidades, estados de ciclo de vida e politicas de validacao entre modulos distribuidos.",
    tags: ["Go", "Catalog", "Domain", "Validation"],
    impact: "Mais consistencia de dominio e menor friccao de integracao.",
    preview: "/projects/catalog-service.png",
  },
  {
    id: "insights-portal",
    title: "Insights Portal",
    subtitle: "UI analitica de operacoes",
    desc: "Frontend interativo orientado a insights operacionais, combinando visoes densas de informacao com fluxos guiados para o usuario.",
    tags: ["React", "TypeScript", "Tailwind", "UX"],
    impact:
      "Decisoes mais rapidas por meio de visibilidade operacional mais clara.",
    preview: "/projects/insights-portal.png",
  },
  {
    id: "query-fabric",
    title: "Query Fabric",
    subtitle: "Camada composivel de filtros",
    desc: "Abstracao composivel de consultas com suporte a filtros multifield, ordenacao e paginacao por cursor com validacoes rigorosas.",
    tags: ["Go", "Query", "Filters", "Pagination"],
    impact: "Modelo de consulta flexivel com menos duplicacao de endpoints.",
    preview: "/projects/query-fabric.png",
  },
  {
    id: "contract-hub",
    title: "Contract Hub",
    subtitle: "Contratos de validacao",
    desc: "Hub central para manter contratos de validacao e pacotes versionados de schema consumidos por diversos servicos backend.",
    tags: ["Go", "Schema", "Contracts", "Versioning"],
    impact: "Evolucao de contratos mais segura com menos quebras em producao.",
    preview: "/projects/contract-hub.png",
  },
  {
    id: "policy-shield",
    title: "Policy Shield",
    subtitle: "Motor de politicas de acesso",
    desc: "Modulo de aplicacao de politicas para verificacao de papeis e escopos, protegendo endpoints com regras centralizadas de autorizacao.",
    tags: ["Go", "Security", "Policies", "Auth"],
    impact: "Controle de acesso mais confiavel e auditoria simplificada.",
    preview: "/projects/policy-shield.png",
  },
  {
    id: "timeline-log",
    title: "Timeline Log",
    subtitle: "Jornal de mudancas de entidade",
    desc: "Componente reutilizavel de historico que registra transicoes de entidade, metadados do ator e snapshots antes-depois.",
    tags: ["Go", "Audit", "History", "Logs"],
    impact: "Maior responsabilizacao em fluxos operacionais.",
    preview: "/projects/timeline-log.png",
  },
  {
    id: "bulk-runner",
    title: "Bulk Runner",
    subtitle: "Operacoes massivas controladas",
    desc: "Modulo de execucao em lote para importacoes e atualizacoes com checkpoints, gatilhos de rollback e trilha detalhada de progresso.",
    tags: ["Go", "Batch", "Processing", "Control"],
    impact: "Operacoes de grande escala mais seguras e transparentes.",
    preview: "/projects/bulk-runner.png",
  },
  {
    id: "core-toolkit",
    title: "Core Toolkit",
    subtitle: "Utilitarios compartilhados de engenharia",
    desc: "Pacote compartilhado com helpers de logging, adaptadores de validacao, mapeadores de erro e middlewares reutilizaveis.",
    tags: ["Go", "Library", "Toolkit", "DX"],
    impact: "Onboarding mais rapido e maior consistencia tecnica.",
    preview: "/projects/core-toolkit.png",
  },
];

const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  pt: PROJECTS_PT,
  en: PROJECTS,
};

export function Projects() {
  const { locale, t } = useLanguage();
  const [active, setActive] = useState(0);
  const swapScopeRef = useRef<HTMLDivElement | null>(null);
  const firstPaintRef = useRef(true);

  const projects = PROJECTS_BY_LOCALE[locale];
  const safeActive = Math.min(active, projects.length - 1);
  const project = useMemo(() => projects[safeActive], [projects, safeActive]);

  useEffect(() => {
    const scope = swapScopeRef.current;
    if (!scope) return;

    if (firstPaintRef.current) {
      firstPaintRef.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      animateProjectSwap(scope);
    }, scope);

    return () => ctx.revert();
  }, [project.id]);

  return (
    <ChapterSection id="projects" title={t.projects.title}>
      <div
        ref={swapScopeRef}
        data-projects-reveal="2"
        data-project-swap-preset="cinematic"
        className="scanlines-bg relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,.5)]"
      >
        <div
          className="pointer-events-none absolute left-0 top-0 z-[2] h-px w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(168,85,247,.6) 40%,rgba(0,255,224,.4) 60%,transparent)",
            opacity: 0.5,
          }}
        />

        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(168,85,247,.10) 0%,rgba(0,255,224,.05) 50%,transparent 100%)",
            }}
          />

          {project.preview ? (
            <div
              data-project-swap-bg
              className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-500"
              style={{ backgroundImage: `url(${project.preview})` }}
            />
          ) : null}

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%,transparent 0,rgba(0,0,0,.45) 55%,rgba(0,0,0,.82) 100%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              opacity: 0.07,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              opacity: 0.08,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px)",
              backgroundSize: "100% 4px",
            }}
          />
        </div>

        <div className="relative grid gap-10 p-8 md:p-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
          <div className="max-w-[560px]">
            <div
              data-projects-reveal="2"
              data-project-swap
              className="mb-5 flex items-center gap-2.5"
            >
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: "rgba(70,160,255,.8)" }}
              />
              <span className="h-px flex-1 bg-white/10" />
              <span
                className="font-mono text-[10px] tracking-[0.42em]"
                style={{ color: "rgba(255,255,255,.42)" }}
              >
                {t.projects.activeFile}
              </span>
            </div>

            <h3
              data-projects-reveal="3"
              data-project-swap
              className="hud-title text-3xl font-bold leading-tight text-white/95 md:text-4xl"
              style={{ textShadow: "0 0 20px rgba(168,85,247,.3)" }}
            >
              {project.title}
            </h3>

            <div
              data-projects-reveal="4"
              data-project-swap
              className="mt-3 inline-flex items-center border bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{
                borderColor: "rgba(0,255,224,.22)",
                color: "rgba(0,255,224,.68)",
                clipPath:
                  "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              }}
            >
              {"\u25C8"} {project.subtitle}
            </div>

            <div className="mt-5">
              <div
                className="mb-1.5 font-mono text-[8px] tracking-[0.3em]"
                style={{ color: "rgba(168,85,247,.5)" }}
              >
                // DESC
              </div>
              <p
                data-projects-reveal="5"
                data-project-swap
                className="text-sm leading-relaxed text-white/70 md:text-base"
              >
                {project.desc}
              </p>
            </div>

            <div className="mt-4">
              <div
                className="mb-1.5 font-mono text-[8px] tracking-[0.3em]"
                style={{ color: "rgba(168,85,247,.5)" }}
              >
                // IMPACT
              </div>
              <div
                data-projects-reveal="6"
                data-project-swap
                className="rounded-[10px] border border-white/10 bg-black/25 p-4 text-sm text-white/72"
              >
                <span
                  className="mr-2 font-mono text-[9px]"
                  style={{ color: "rgba(255,255,255,.42)" }}
                >
                  {"\u25B8"}
                </span>
                {project.impact}
              </div>
            </div>

            <div className="mt-5">
              <div
                className="mb-2 font-mono text-[8px] tracking-[0.3em]"
                style={{ color: "rgba(168,85,247,.5)" }}
              >
                // STACK
              </div>
              <div
                data-projects-reveal="7"
                data-project-swap
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={i % 2 === 0 ? "hud-tag" : "hud-tag hud-tag-c"}
                  >
                    {"\u25C7"} {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-projects-reveal="8"
              data-project-swap
              className="mt-7 flex flex-wrap gap-3"
            >
              <button className="hud-btn">
                {"\u25C8"} {t.projects.viewCase}
              </button>
              <button className="hud-btn hud-btn-p">
                {"\u25C8"} {t.projects.github}
              </button>
            </div>
          </div>

          <div
            data-projects-reveal="6"
            data-project-swap
            data-project-swap-panel
            className="relative self-start rounded-[20px] border border-white/10 bg-black/30 p-6 md:p-7"
            style={{
              clipPath:
                "polygon(0% 0%,92% 0%,100% 8%,100% 100%,8% 100%,0% 92%)",
            }}
          >
            <div
              className="pointer-events-none absolute left-0 top-0 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(168,85,247,.65) 55%,transparent)",
              }}
            />

            <div data-project-swap-panel-item>
              <div
                className="font-mono text-[8px] tracking-[0.38em]"
                style={{ color: "rgba(255,255,255,.3)" }}
              >
                // {t.projects.panelStatus}
              </div>
              <div
                className="mt-1 text-lg font-semibold"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "rgba(238,244,255,.85)",
                }}
              >
                {t.projects.panelStatusValue}
              </div>
            </div>

            <div data-project-swap-panel-item className="mt-6 flex flex-col">
              {(
                [
                  {
                    label: t.projects.category,
                    value: t.projects.categoryValue,
                  },
                  { label: t.projects.focus, value: t.projects.focusValue },
                  {
                    label: t.projects.stack,
                    value: project.tags.slice(0, 2).join(" / "),
                  },
                ] as { label: string; value: string }[]
              ).map(({ label, value }) => (
                <div
                  key={label}
                  className="relative flex items-center justify-between px-3 py-2 text-sm"
                  style={{
                    borderBottom: "1px solid rgba(168,85,247,.08)",
                  }}
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
                    className="font-mono text-[10px] tracking-[0.1em]"
                    style={{ color: "rgba(238,244,255,.75)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              data-project-swap-panel-item
              className="my-5 h-px"
              style={{ background: "rgba(168,85,247,.14)" }}
            />

            <div
              data-project-swap-panel-item
              className="text-xs leading-relaxed"
              style={{ color: "rgba(214,225,248,.45)" }}
            >
              {t.projects.helper}
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

        <div
          data-projects-reveal="9"
          className="relative border-t border-white/10 bg-black/40 px-6 py-6"
        >
          <HudStepper
            total={projects.length}
            active={safeActive}
            onChange={setActive}
            className="mx-auto w-full max-w-[980px]"
          />
        </div>
      </div>
    </ChapterSection>
  );
}
