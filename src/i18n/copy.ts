export type Locale = "pt" | "en";

type CopyShape = {
  topbar: {
    mission: string;
    dossier: string;
    statusLabel: string;
    statusValue: string;
    modeLabel: string;
    modeValue: string;
    themeLabel: string;
    themeValue: string;
    langLabel: string;
  };
  boot: {
    mission: string;
    loading: string;
    line1: string;
    line2: string;
    line3: string;
  };
  hero: {
    eyebrow: string;
    role: string;
    desc: string;
    aboutCta: string;
    projectsCta: string;
    tags: string[];
    statusTitle: string;
    statusValue: string;
    age: string;
    location: string;
    specialty: string;
  };
  about: {
    title: string;
    profileHeader: string;
    paragraph1: string;
    paragraph2: string;
    areas: Array<{ t: string; d: string }>;
    statusTitle: string;
    statusValue: string;
    educationLabel: string;
    educationValue: string;
    courseLabel: string;
    courseValue: string;
    englishLabel: string;
    englishValue: string;
    skills: string[];
  };
  projects: {
    title: string;
    activeFile: string;
    impact: string;
    viewCase: string;
    github: string;
    panelStatus: string;
    panelStatusValue: string;
    category: string;
    categoryValue: string;
    focus: string;
    focusValue: string;
    stack: string;
    helper: string;
  };
};

export const copy: Record<Locale, CopyShape> = {
  pt: {
    topbar: {
      mission: "Comando Central",
      dossier: "Dossie do Candidato",
      statusLabel: "Status",
      statusValue: "Disponivel",
      modeLabel: "Modo",
      modeValue: "Portfolio",
      themeLabel: "Tema",
      themeValue: "HUD Cinematico",
      langLabel: "Idioma",
    },
    boot: {
      mission: "Comando Central",
      loading: "Carregando",
      line1: "Inicializando modulos da interface",
      line2: "Verificando secoes do portfolio",
      line3: "Preparando renderizacao cinematica",
    },
    hero: {
      eyebrow: "DOSSIE DE MISSAO • FRONT-END",
      role: "Desenvolvedor Front-End",
      desc: "Construo interfaces com foco em narrativa visual, performance e clareza de produto. Design cinematografico com execucao formal para contexto profissional.",
      aboutCta: "Sobre",
      projectsCta: "Ver Projetos",
      tags: [
        "Engenharia de UI",
        "React + TypeScript",
        "Interfaces Cinematograficas",
      ],
      statusTitle: "STATUS",
      statusValue: "Disponivel para novas oportunidades",
      age: "Idade",
      location: "Local",
      specialty: "Especialidade",
    },
    about: {
      title: "Sobre",
      profileHeader: "PERFIL PROFISSIONAL",
      paragraph1:
        "Profissional em desenvolvimento nas areas de Tecnologia da Informacao e Administracao, com experiencia em rotinas administrativas, controle de documentacao tecnica e suporte a equipes operacionais.",
      paragraph2:
        "Atuacao em ambientes corporativos e industriais, com perfil proativo, organizado e voltado a resultados. Possuo base solida em informatica, sistemas administrativos e design digital, com foco em evolucao constante e aprendizado continuo.",
      areas: [
        {
          t: "Administrativo",
          d: "Rotinas administrativas, controle documental e processos internos",
        },
        {
          t: "Suporte Operacional",
          d: "Apoio tecnico em campo, registro de testes e relatorios",
        },
        {
          t: "Tecnologia",
          d: "HTML, CSS, JavaScript, React, Tailwind CSS",
        },
        {
          t: "Design Digital",
          d: "Photoshop, Illustrator, VS Code",
        },
      ],
      statusTitle: "STATUS",
      statusValue: "Em Formacao",
      educationLabel: "Formacao",
      educationValue: "ADS - Conclusao 2026",
      courseLabel: "Curso",
      courseValue: "Servicos Administrativos (Senac)",
      englishLabel: "Ingles",
      englishValue: "Basico",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Tailwind",
        "Photoshop",
        "Illustrator",
        "Pacote Office",
      ],
    },
    projects: {
      title: "Projetos",
      activeFile: "ARQUIVO ATIVO",
      impact: "Impacto",
      viewCase: "Ver Projeto",
      github: "GitHub",
      panelStatus: "STATUS",
      panelStatusValue: "Pronto para demonstracao",
      category: "Categoria",
      categoryValue: "Projeto Real",
      focus: "Foco",
      focusValue: "Arquitetura + UI",
      stack: "Stack",
      helper: "Selecione abaixo para alternar projetos.",
    },
  },
  en: {
    topbar: {
      mission: "Mission Control",
      dossier: "Candidate Dossier",
      statusLabel: "Status",
      statusValue: "Available",
      modeLabel: "Mode",
      modeValue: "Portfolio",
      themeLabel: "Theme",
      themeValue: "Cinematic HUD",
      langLabel: "Language",
    },
    boot: {
      mission: "Mission Control",
      loading: "Loading",
      line1: "Initializing interface modules",
      line2: "Verifying portfolio sections",
      line3: "Preparing cinematic render",
    },
    hero: {
      eyebrow: "MISSION DOSSIER • FRONT-END",
      role: "Front-End Developer",
      desc: "I build interfaces focused on visual storytelling, performance, and product clarity. Cinematic design with formal execution for professional contexts.",
      aboutCta: "About",
      projectsCta: "View Projects",
      tags: ["UI Engineering", "React + TypeScript", "Cinematic Interfaces"],
      statusTitle: "STATUS",
      statusValue: "Available for new opportunities",
      age: "Age",
      location: "Location",
      specialty: "Specialty",
    },
    about: {
      title: "About",
      profileHeader: "PROFESSIONAL PROFILE",
      paragraph1:
        "Professional developing in Information Technology and Administration, with experience in administrative routines, technical documentation control, and operational team support.",
      paragraph2:
        "Work in corporate and industrial environments, with a proactive, organized, and results-driven profile. I have a solid base in computing, administrative systems, and digital design, focused on constant growth and continuous learning.",
      areas: [
        {
          t: "Administrative",
          d: "Administrative routines, document control, and internal processes",
        },
        {
          t: "Operational Support",
          d: "Field technical support, test logging, and reports",
        },
        {
          t: "Technology",
          d: "HTML, CSS, JavaScript, React, Tailwind CSS",
        },
        {
          t: "Digital Design",
          d: "Photoshop, Illustrator, VS Code",
        },
      ],
      statusTitle: "STATUS",
      statusValue: "In Training",
      educationLabel: "Education",
      educationValue: "ADS - Graduation 2026",
      courseLabel: "Course",
      courseValue: "Administrative Services (Senac)",
      englishLabel: "English",
      englishValue: "Basic",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Tailwind",
        "Photoshop",
        "Illustrator",
        "Office Suite",
      ],
    },
    projects: {
      title: "Projects",
      activeFile: "ACTIVE FILE",
      impact: "Impact",
      viewCase: "View Project",
      github: "GitHub",
      panelStatus: "STATUS",
      panelStatusValue: "Ready for demo",
      category: "Category",
      categoryValue: "Real Project",
      focus: "Focus",
      focusValue: "Architecture + UI",
      stack: "Stack",
      helper: "Select below to switch projects.",
    },
  },
};
