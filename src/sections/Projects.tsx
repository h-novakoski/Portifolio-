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
    <ChapterSection id="projects" title={t.projects.title} bare>
      <div
        ref={swapScopeRef}
        data-projects-reveal="2"
        data-project-swap-preset="cinematic"
        className="scanlines-bg relative overflow-hidden rounded-[26px] border shadow-[0_30px_90px_rgba(0,0,0,.65)]"
        style={{ borderColor: "rgba(168,85,247,.28)" }}
      >
        {/* Top-line glow */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(168,85,247,.6) 40%,rgba(0,255,224,.5) 60%,transparent)",
          }}
        />

        {/* ================== BACKGROUND PREVIEW ================== */}
        <div className="pointer-events-none absolute inset-0">
          {project.preview ? (
            <div
              data-project-swap-bg
              className="absolute inset-0 bg-cover bg-center opacity-45 transition-all duration-500"
              style={{ backgroundImage: `url(${project.preview})` }}
            />
          ) : null}

          {/* Dark cinematic overlay — stronger */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,.2)_0,rgba(0,0,0,.65)_55%,rgba(0,0,0,.92)_100%)]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(168,85,247,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.07)_1px,transparent_1px)] [background-size:40px_40px]" />

          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:100%_4px]" />
        </div>

        {/* ================== CONTENT ================== */}
        <div className="relative grid gap-12 p-8 md:p-12 lg:grid-cols-[1.15fr_.85fr]">
          {/* LEFT SIDE */}
          <div className="max-w-2xl">
            <div
              data-projects-reveal="2"
              data-project-swap
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-glowB/80" />
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] tracking-[0.45em] text-white/45">
                {t.projects.activeFile}
              </span>
            </div>

            <h3
              data-projects-reveal="3"
              data-project-swap
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              {project.title}
            </h3>

            <div
              data-projects-reveal="4"
              data-project-swap
              className="mt-3 inline-flex items-center font-mono text-[10px] tracking-[0.25em] border bg-black/30 px-3 py-1"
              style={{
                borderColor: "rgba(0,255,224,.22)",
                color: "rgba(0,255,224,.68)",
                clipPath:
                  "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              }}
            >
              ◈ {project.subtitle}
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
                className="border-l-2 p-4 text-sm text-white/72"
                style={{
                  borderColor: "rgba(168,85,247,.3)",
                  background: "rgba(168,85,247,.04)",
                }}
              >
                <span
                  className="mr-2 font-mono text-[9px]"
                  style={{ color: "rgba(168,85,247,.6)" }}
                >
                  ▸
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
                    ◇ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-projects-reveal="8"
              data-project-swap
              className="mt-7 flex flex-wrap gap-3"
            >
              <button className="hud-btn">◈ {t.projects.viewCase}</button>
              <button className="hud-btn hud-btn-p">◈ {t.projects.github}</button>
            </div>
          </div>

          {/* RIGHT HUD PANEL */}
          <div
            data-projects-reveal="6"
            data-project-swap
            data-project-swap-panel
            className="relative border bg-black/40 p-6"
            style={{
              clipPath:
                "polygon(0% 0%,92% 0%,100% 8%,100% 100%,8% 100%,0% 92%)",
              borderColor: "rgba(168,85,247,.28)",
              boxShadow: "inset 0 0 40px rgba(168,85,247,.04)",
            }}
          >
            <div
              className="pointer-events-none absolute left-0 top-0 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(168,85,247,.7) 60%,transparent)",
                opacity: 0.55,
              }}
            />

            <div data-project-swap-panel-item>
              <div className="text-[10px] tracking-[0.45em] text-white/45">
                {t.projects.panelStatus}
              </div>
              <div className="mt-1 text-lg font-semibold text-white/85">
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
                    ◂
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] uppercase pl-2"
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
              className="my-6 h-px bg-white/10"
            />

            <div data-project-swap-panel-item className="text-xs text-white/60">
              {t.projects.helper}
            </div>

            <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center gap-3 opacity-60">
              <span className="h-px flex-1 bg-white/10" />
              <span className="h-1 w-1 rounded-full bg-glowB/70" />
              <span className="h-px w-10 bg-glowV/40" />
            </div>
          </div>
        </div>

        {/* ================== STEPPER ================== */}
        <div
          data-projects-reveal="9"
          className="relative border-t border-white/10 bg-black/40 px-6 py-6"
        >
          <HudStepper
            total={projects.length}
            active={safeActive}
            onChange={setActive}
            className="mx-auto max-w-[980px]"
          />
        </div>
      </div>
    </ChapterSection>
  );
}
