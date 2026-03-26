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
    id: "audit",
    title: "GX Audit API",
    subtitle: "Rules + Execution + Logs",
    desc: "Audit engine with YAML rules, traceable execution, and document-level logs. Clean structure, strong validation, and observability.",
    tags: ["Go", "Postgres", "YAML", "API"],
    impact: "Standardized and traceable audit pipeline.",
    preview: "/projects/audit.png",
  },
  {
    id: "workflow",
    title: "Temporal Workflow",
    subtitle: "Reliable orchestration",
    desc: "Resilient workflows with Temporal, automatic retries, complete execution history, and architecture ready for critical processes.",
    tags: ["Go", "Temporal", "Worker"],
    impact:
      "Higher reliability for critical processes with retries and full history.",
    preview: "/projects/temporal.png",
  },
  {
    id: "datasource",
    title: "Datasource API",
    subtitle: "Dynamic schema",
    desc: "API with dynamic validation using JSON Schema, tracking control, and DTO standardization to ensure service consistency.",
    tags: ["Go", "Schema", "Metadata"],
    impact:
      "Contract consistency between services and fewer validation errors.",
    preview: "/projects/datasource.png",
  },
  {
    id: "portfolio",
    title: "Cinematic Portfolio",
    subtitle: "HUD + Motion",
    desc: "Interactive interface inspired by game HUDs with glow, scanlines, and visual storytelling using React, TypeScript, and Tailwind.",
    tags: ["React", "TypeScript", "Tailwind", "UI"],
    impact: "Stronger brand perception and a more memorable visual narrative.",
    preview: "/projects/portfolio.png",
  },
  {
    id: "criteria",
    title: "Criteria Engine",
    subtitle: "Dynamic JSON filtering",
    desc: "Dynamic API filtering system based on JSON Criteria, supporting operators like $eq, $like, $between, and automatic pagination.",
    tags: ["Go", "API", "Filters"],
    impact: "Flexible querying with reduced maintenance cost.",
    preview: "/projects/criteria.png",
  },
  {
    id: "metadata",
    title: "Metadata Validation",
    subtitle: "Schema config",
    desc: "Metadata validation system based on YAML and JSON Schema, enabling dynamic fields controlled by configuration.",
    tags: ["Go", "YAML", "JSON Schema"],
    impact: "Metadata governance with configurable flexibility.",
    preview: "/projects/metadata.png",
  },
  {
    id: "auth",
    title: "Role Authorization",
    subtitle: "JWT + Roles",
    desc: "JWT-based authorization system with role checks directly at API routes, ensuring granular access control.",
    tags: ["Go", "JWT", "Security"],
    impact: "More secure and auditable access control.",
    preview: "/projects/auth.png",
  },
  {
    id: "tracking",
    title: "Tracking System",
    subtitle: "Audit Trail",
    desc: "Reusable API tracking structure with created_by, updated_by, and entity change history control.",
    tags: ["Go", "Audit", "Tracking"],
    impact: "Change traceability for support and compliance.",
    preview: "/projects/tracking.png",
  },
  {
    id: "batch",
    title: "Datasource Batch",
    subtitle: "Batch processing",
    desc: "System for data batch insertion and validation with status control, automatic replacement, and version history.",
    tags: ["Go", "Batch", "Data"],
    impact: "Batch operation with status visibility and version control.",
    preview: "/projects/batch.png",
  },
  {
    id: "golang-utils",
    title: "Go Utils Library",
    subtitle: "Shared Toolkit",
    desc: "Reusable library with common utilities such as schema validation, error handling, and API development tools in Go.",
    tags: ["Go", "Library", "Tools"],
    impact: "Faster development and technical standardization across teams.",
    preview: "/projects/utils.png",
  },
];

const PROJECTS_PT: Project[] = [
  {
    id: "audit",
    title: "GX Audit API",
    subtitle: "Regras + Execucao + Logs",
    desc: "Engine de auditoria com regras via YAML, execucao rastreavel e logs por documento. Estrutura limpa, validacao forte e observabilidade.",
    tags: ["Go", "Postgres", "YAML", "API"],
    impact: "Pipeline de auditoria padronizado e rastreavel.",
    preview: "/projects/audit.png",
  },
  {
    id: "workflow",
    title: "Workflow Temporal",
    subtitle: "Orquestracao confiavel",
    desc: "Workflows resilientes com Temporal, retries automaticos, historico completo de execucao e arquitetura preparada para processos criticos.",
    tags: ["Go", "Temporal", "Worker"],
    impact:
      "Maior confiabilidade em processos criticos com retries e historico.",
    preview: "/projects/temporal.png",
  },
  {
    id: "datasource",
    title: "Datasource API",
    subtitle: "Schema Dinamico",
    desc: "API com validacao dinamica usando JSON Schema, controle de tracking e padronizacao de DTOs para garantir consistencia entre servicos.",
    tags: ["Go", "Schema", "Metadata"],
    impact: "Consistencia contratual entre servicos e reducao de erros.",
    preview: "/projects/datasource.png",
  },
  {
    id: "portfolio",
    title: "Portfolio Cinematico",
    subtitle: "HUD + Motion",
    desc: "Interface interativa inspirada em HUDs de jogos com glow, scanlines e storytelling visual utilizando React, TypeScript e Tailwind.",
    tags: ["React", "TypeScript", "Tailwind", "UI"],
    impact: "Melhor percepcao de marca e narrativa visual mais memoravel.",
    preview: "/projects/portfolio.png",
  },
  {
    id: "criteria",
    title: "Criteria Engine",
    subtitle: "Filtro dinamico JSON",
    desc: "Sistema de filtros dinamicos para APIs baseado em JSON Criteria, suportando operadores como $eq, $like, $between e paginacao automatica.",
    tags: ["Go", "API", "Filters"],
    impact: "Consultas flexiveis com menor custo de manutencao.",
    preview: "/projects/criteria.png",
  },
  {
    id: "metadata",
    title: "Metadata Validation",
    subtitle: "Schema Config",
    desc: "Sistema de validacao de metadados baseado em YAML e JSON Schema permitindo campos dinamicos controlados por configuracao.",
    tags: ["Go", "YAML", "JSON Schema"],
    impact: "Governanca de metadados com flexibilidade configuravel.",
    preview: "/projects/metadata.png",
  },
  {
    id: "auth",
    title: "Role Authorization",
    subtitle: "JWT + Roles",
    desc: "Sistema de autorizacao baseado em JWT com verificacao de roles diretamente nas rotas da API, garantindo controle granular de acesso.",
    tags: ["Go", "JWT", "Security"],
    impact: "Controle de acesso mais seguro e auditavel.",
    preview: "/projects/auth.png",
  },
  {
    id: "tracking",
    title: "Tracking System",
    subtitle: "Audit Trail",
    desc: "Estrutura de tracking reutilizavel para APIs com controle de created_by, updated_by e historico de alteracoes em entidades.",
    tags: ["Go", "Audit", "Tracking"],
    impact: "Rastreabilidade de mudancas para suporte e compliance.",
    preview: "/projects/tracking.png",
  },
  {
    id: "batch",
    title: "Datasource Batch",
    subtitle: "Processamento em lote",
    desc: "Sistema para insercao e validacao de lotes de dados com controle de status, substituicao automatica e historico de versoes.",
    tags: ["Go", "Batch", "Data"],
    impact: "Operacao em lote com visibilidade de status e versoes.",
    preview: "/projects/batch.png",
  },
  {
    id: "golang-utils",
    title: "Go Utils Library",
    subtitle: "Shared Toolkit",
    desc: "Biblioteca reutilizavel com utilidades comuns como validacao de schema, tratamento de erros e ferramentas para APIs em Go.",
    tags: ["Go", "Library", "Tools"],
    impact: "Aceleracao de desenvolvimento e padrao tecnico entre times.",
    preview: "/projects/utils.png",
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
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
      >
        {/* ================== BACKGROUND PREVIEW ================== */}
        <div className="pointer-events-none absolute inset-0">
          {project.preview ? (
            <div
              data-project-swap-bg
              className="absolute inset-0 bg-cover bg-center opacity-55 transition-all duration-500"
              style={{ backgroundImage: `url(${project.preview})` }}
            />
          ) : null}

          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,transparent_0,rgba(0,0,0,.45)_55%,rgba(0,0,0,.85)_100%)]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:40px_40px]" />

          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:100%_4px]" />
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
              className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs tracking-[0.25em] text-white/60"
            >
              {project.subtitle}
            </div>

            <p
              data-projects-reveal="5"
              data-project-swap
              className="mt-6 text-sm leading-relaxed text-white/70 md:text-base"
            >
              {project.desc}
            </p>

            <div
              data-projects-reveal="6"
              data-project-swap
              className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-white/72"
            >
              <span className="mr-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
                {t.projects.impact}
              </span>
              {project.impact}
            </div>

            <div
              data-projects-reveal="7"
              data-project-swap
              className="mt-6 flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              data-projects-reveal="8"
              data-project-swap
              className="mt-7 flex flex-wrap gap-3"
            >
              <button className="rounded-full border border-glowB/45 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:bg-white/[0.08]">
                {t.projects.viewCase}
              </button>
              <button className="rounded-full border border-glowV/45 bg-[linear-gradient(180deg,rgba(140,90,255,0.2),rgba(140,90,255,0.08))] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/95 transition hover:shadow-[0_0_20px_rgba(140,90,255,0.28)]">
                {t.projects.github}
              </button>
            </div>
          </div>

          {/* RIGHT HUD PANEL */}
          <div
            data-projects-reveal="6"
            data-project-swap
            data-project-swap-panel
            className="relative rounded-3xl border border-white/10 bg-black/30 p-6"
          >
            <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-glowV/60 to-transparent" />

            <div data-project-swap-panel-item>
              <div className="text-[10px] tracking-[0.45em] text-white/45">
                {t.projects.panelStatus}
              </div>
              <div className="mt-1 text-lg font-semibold text-white/85">
                {t.projects.panelStatusValue}
              </div>
            </div>

            <div
              data-project-swap-panel-item
              className="mt-6 space-y-3 text-sm"
            >
              <div className="flex justify-between">
                <span className="text-white/50">{t.projects.category}</span>
                <span className="text-white/75">
                  {t.projects.categoryValue}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">{t.projects.focus}</span>
                <span className="text-white/75">{t.projects.focusValue}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">{t.projects.stack}</span>
                <span className="text-white/75">
                  {project.tags.slice(0, 2).join(" / ")}
                </span>
              </div>
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
