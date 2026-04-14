import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SELECTORS = {
  heroSection: "#top",
  heroStage: "[data-hero-stage]",
  heroReveal: "[data-hero-reveal]",
  aboutSection: "#about",
  projectsSection: "#projects",
  aboutReveal: "[data-about-reveal]:not([data-reveal-decor])",
  projectsReveal: "[data-projects-reveal]:not([data-reveal-decor])",
  reveal: "[data-reveal]",
  parallax: "[data-parallax]",
};

const ABOUT_TOGGLE_ACTIONS = "play reverse play reverse";
const PROJECTS_TOGGLE_ACTIONS = "play none none reverse";
const STAGED_REVEAL = {
  hero: {
    start: "top 18%",
    end: "bottom 26%",
    duration: 0.74,
    phaseStep: 0.1,
    initialX: 16,
    initialScale: 1,
    toggleActions: ABOUT_TOGGLE_ACTIONS,
  },
  about: {
    start: "top 66%",
    end: "bottom 24%",
    duration: 0.76,
    phaseStep: 0.1,
    initialX: 16,
    initialScale: 1,
    toggleActions: ABOUT_TOGGLE_ACTIONS,
  },
  projects: {
    start: "top 48%",
    end: "bottom 34%",
    duration: 0.78,
    phaseStep: 0.1,
    baseDelay: 0.3,
    initialX: 14,
    initialScale: 1,
    toggleActions: PROJECTS_TOGGLE_ACTIONS,
  },
};

type StagedRevealConfig = {
  section: HTMLElement;
  selector: string;
  datasetKey: "heroReveal" | "aboutReveal" | "projectsReveal";
  start: string;
  end: string;
  duration: number;
  phaseStep: number;
  initialX: number;
  initialScale: number;
  toggleActions: string;
  baseDelay?: number;
  playOnInitAtTop?: boolean;
};

function getSection(path: string) {
  return document.querySelector<HTMLElement>(path);
}

function sortByPhase(
  elements: HTMLElement[],
  datasetKey: string,
): HTMLElement[] {
  return elements.sort(
    (a, b) =>
      Number(a.dataset[datasetKey] ?? "0") -
      Number(b.dataset[datasetKey] ?? "0"),
  );
}

function setRevealInitialState(
  elements: HTMLElement[],
  x: number,
  scale: number,
) {
  if (!elements.length) return;

  gsap.set(elements, {
    autoAlpha: 0,
    x,
    scale,
    transformOrigin: "50% 50%",
    force3D: true,
  });
}

function revealAllForReducedMotion() {
  const staticRevealTargets = [
    ...gsap.utils.toArray<HTMLElement>(SELECTORS.heroReveal),
    ...gsap.utils.toArray<HTMLElement>(SELECTORS.aboutReveal),
    ...gsap.utils.toArray<HTMLElement>(SELECTORS.projectsReveal),
    ...gsap.utils.toArray<HTMLElement>(SELECTORS.reveal),
  ];

  if (staticRevealTargets.length) {
    gsap.set(staticRevealTargets, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
  }

  const heroStage = document.querySelector<HTMLElement>(SELECTORS.heroStage);
  if (heroStage) {
    gsap.set(heroStage, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
  }
}

function createStagedRevealTimeline(config: StagedRevealConfig) {
  const {
    section,
    selector,
    datasetKey,
    start,
    end,
    duration,
    phaseStep,
    initialX,
    initialScale,
    toggleActions,
    baseDelay = 0,
    playOnInitAtTop = false,
  } = config;

  const items = sortByPhase(
    gsap.utils.toArray<HTMLElement>(selector, section),
    datasetKey,
  );

  if (!items.length) return;

  setRevealInitialState(items, initialX, initialScale);

  const timeline = gsap
    .timeline({
      defaults: { overwrite: "auto" },
      scrollTrigger: {
        trigger: section,
        start,
        end,
        toggleActions,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    })
    .to(items, {
      autoAlpha: 1,
      x: 0,
      duration,
      ease: "power3.out",
      stagger: {
        each: 0,
        from: 0,
        amount: 0,
        grid: "auto",
      },
      delay: (_index, target) =>
        baseDelay +
        Number((target as HTMLElement).dataset[datasetKey] ?? "0") * phaseStep,
    });

  const sectionBounds = section.getBoundingClientRect();
  const isInitiallyVisible =
    sectionBounds.top < window.innerHeight * 0.92 && sectionBounds.bottom > 0;

  if (playOnInitAtTop && isInitiallyVisible) {
    timeline.play(0);
  }
}

export function setupScrollFX() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf(
    `${SELECTORS.heroReveal}, ${SELECTORS.reveal}, ${SELECTORS.aboutReveal}, ${SELECTORS.projectsReveal}`,
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealAllForReducedMotion();
    ScrollTrigger.refresh();
    return;
  }

  const heroSection = getSection(SELECTORS.heroSection);
  const heroStage = document.querySelector<HTMLElement>(SELECTORS.heroStage);
  const aboutSection = getSection(SELECTORS.aboutSection);
  const projectsSection = getSection(SELECTORS.projectsSection);

  if (heroSection) {
    createStagedRevealTimeline({
      section: heroSection,
      selector: SELECTORS.heroReveal,
      datasetKey: "heroReveal",
      start: STAGED_REVEAL.hero.start,
      end: STAGED_REVEAL.hero.end,
      duration: STAGED_REVEAL.hero.duration,
      phaseStep: STAGED_REVEAL.hero.phaseStep,
      initialX: STAGED_REVEAL.hero.initialX,
      initialScale: STAGED_REVEAL.hero.initialScale,
      toggleActions: STAGED_REVEAL.hero.toggleActions,
      playOnInitAtTop: true,
    });
  }

  if (heroStage) {
    gsap.set(heroStage, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      force3D: true,
    });
  }

  if (aboutSection) {
    createStagedRevealTimeline({
      section: aboutSection,
      selector: SELECTORS.aboutReveal,
      datasetKey: "aboutReveal",
      start: STAGED_REVEAL.about.start,
      end: STAGED_REVEAL.about.end,
      duration: STAGED_REVEAL.about.duration,
      phaseStep: STAGED_REVEAL.about.phaseStep,
      initialX: STAGED_REVEAL.about.initialX,
      initialScale: STAGED_REVEAL.about.initialScale,
      toggleActions: STAGED_REVEAL.about.toggleActions,
    });
  }

  if (projectsSection) {
    createStagedRevealTimeline({
      section: projectsSection,
      selector: SELECTORS.projectsReveal,
      datasetKey: "projectsReveal",
      start: STAGED_REVEAL.projects.start,
      end: STAGED_REVEAL.projects.end,
      duration: STAGED_REVEAL.projects.duration,
      phaseStep: STAGED_REVEAL.projects.phaseStep,
      initialX: STAGED_REVEAL.projects.initialX,
      initialScale: STAGED_REVEAL.projects.initialScale,
      toggleActions: STAGED_REVEAL.projects.toggleActions,
      baseDelay: STAGED_REVEAL.projects.baseDelay,
    });
  }

  // Reveal cinematografico (fade + slide + zoom-in suave)
  gsap.utils.toArray<HTMLElement>(SELECTORS.reveal).forEach((el) => {
    const triggerSelector = el.getAttribute("data-reveal-trigger");
    const triggerEl = triggerSelector
      ? document.querySelector<HTMLElement>(triggerSelector)
      : null;
    const trigger = triggerEl ?? el;
    const distance = Number(el.getAttribute("data-reveal-distance") || "22");
    const startScale = Number(el.getAttribute("data-reveal-scale") || "1.018");
    const start = el.getAttribute("data-reveal-start") || "top 90%";
    const end = el.getAttribute("data-reveal-end") || "top 62%";
    const scrubAttr = el.getAttribute("data-reveal-scrub");
    const useScrub = scrubAttr === "true";
    const visibilityEnd =
      el.getAttribute("data-reveal-visibility-end") || "bottom 20%";

    gsap.set(el, {
      autoAlpha: 0,
      x: distance,
      scale: startScale,
      transformOrigin: "50% 50%",
      force3D: true,
    });

    if (useScrub) {
      const exitX = -Math.max(10, Math.round(distance * 0.55));

      gsap
        .timeline({
          defaults: { ease: "none", overwrite: "auto" },
          scrollTrigger: {
            trigger,
            start,
            end: visibilityEnd,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })
        .to(el, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.42,
        })
        .to(el, {
          autoAlpha: 0,
          x: exitX,
          scale: 0.992,
          duration: 0.58,
        });
      return;
    }

    const delay = Number(el.getAttribute("data-reveal-delay") || "0");
    const duration = Number(el.getAttribute("data-reveal-duration") || "0.95");
    const ease = el.getAttribute("data-reveal-ease") || "power3.out";
    const toggleActions =
      el.getAttribute("data-reveal-toggle") || "play reverse play reverse";

    gsap.to(el, {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease,
      overwrite: "auto",
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
      },
    });
  });

  // Parallax leve (data-speed = 0.1..0.6)
  gsap.utils.toArray<HTMLElement>(SELECTORS.parallax).forEach((el) => {
    const speed = Number(el.getAttribute("data-speed") || 0.25);

    gsap.to(el, {
      y: () => -window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  ScrollTrigger.refresh();
}
