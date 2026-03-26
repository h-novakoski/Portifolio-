import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SELECTORS = {
  heroSection: "#top",
  heroStage: "[data-hero-stage]",
  aboutSection: "#about",
  projectsSection: "#projects",
  aboutReveal: "[data-about-reveal]",
  projectsReveal: "[data-projects-reveal]",
  reveal: "[data-reveal]",
  parallax: "[data-parallax]",
};

const HERO_EXIT = {
  start: "top top",
  end: "bottom 34%",
  scrub: 0.9,
  y: -14,
  scale: 0.992,
};

const STAGED_REVEAL = {
  about: {
    start: "top 66%",
    fallbackEnd: "bottom 30%",
    projectsEnd: "top 86%",
    duration: 0.72,
    phaseStep: 0.09,
    initialX: 22,
    initialScale: 1.004,
  },
  projects: {
    start: "top 48%",
    end: "bottom 34%",
    duration: 0.82,
    phaseStep: 0.14,
    baseDelay: 0.85,
    initialX: 20,
    initialScale: 1.003,
  },
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

export function setupScrollFX() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf(
    `${SELECTORS.reveal}, ${SELECTORS.aboutReveal}, ${SELECTORS.projectsReveal}`,
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

  if (heroSection && heroStage) {
    gsap.set(heroStage, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      force3D: true,
    });

    gsap.to(heroStage, {
      autoAlpha: 0,
      y: -14,
      scale: 0.992,
      ease: "none",
      overwrite: "auto",
      scrollTrigger: {
        trigger: heroSection,
        start: HERO_EXIT.start,
        end: HERO_EXIT.end,
        scrub: HERO_EXIT.scrub,
        invalidateOnRefresh: true,
      },
    });
  }

  if (aboutSection) {
    const aboutItems = sortByPhase(
      gsap.utils.toArray<HTMLElement>(SELECTORS.aboutReveal, aboutSection),
      "aboutReveal",
    );

    if (aboutItems.length) {
      setRevealInitialState(
        aboutItems,
        STAGED_REVEAL.about.initialX,
        STAGED_REVEAL.about.initialScale,
      );

      gsap
        .timeline({
          defaults: { overwrite: "auto" },
          scrollTrigger: {
            trigger: aboutSection,
            start: STAGED_REVEAL.about.start,
            endTrigger: projectsSection ?? aboutSection,
            end: projectsSection
              ? STAGED_REVEAL.about.projectsEnd
              : STAGED_REVEAL.about.fallbackEnd,
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        })
        .to(aboutItems, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: STAGED_REVEAL.about.duration,
          ease: "power3.out",
          stagger: {
            each: 0,
            from: 0,
            amount: 0,
            grid: "auto",
          },
          delay: (_index, target) =>
            Number((target as HTMLElement).dataset.aboutReveal ?? "0") *
            STAGED_REVEAL.about.phaseStep,
        });
    }
  }

  if (projectsSection) {
    const projectsItems = sortByPhase(
      gsap.utils.toArray<HTMLElement>(
        SELECTORS.projectsReveal,
        projectsSection,
      ),
      "projectsReveal",
    );

    if (projectsItems.length) {
      setRevealInitialState(
        projectsItems,
        STAGED_REVEAL.projects.initialX,
        STAGED_REVEAL.projects.initialScale,
      );

      gsap
        .timeline({
          defaults: { overwrite: "auto" },
          scrollTrigger: {
            trigger: projectsSection,
            start: STAGED_REVEAL.projects.start,
            end: STAGED_REVEAL.projects.end,
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        })
        .to(projectsItems, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: STAGED_REVEAL.projects.duration,
          ease: "power3.out",
          stagger: {
            each: 0,
            from: 0,
            amount: 0,
            grid: "auto",
          },
          delay: (_index, target) =>
            STAGED_REVEAL.projects.baseDelay +
            Number((target as HTMLElement).dataset.projectsReveal ?? "0") *
              STAGED_REVEAL.projects.phaseStep,
        });
    }
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
