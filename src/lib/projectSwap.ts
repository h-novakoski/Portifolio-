import gsap from "gsap";

export type ProjectSwapPreset = "soft" | "cinematic" | "snappy";

type SwapConfig = {
  bg: {
    fromAlpha: number;
    fromScale: number;
    toAlpha: number;
    duration: number;
    ease: string;
  };
  blocks: {
    x: number;
    scale: number;
    duration: number;
    ease: string;
    stagger: number;
  };
  panel: {
    x: number;
    y: number;
    scale: number;
    duration: number;
    ease: string;
    offset: string;
  };
  panelItems: {
    y: number;
    duration: number;
    ease: string;
    stagger: number;
    offset: string;
  };
};

const SWAP_PRESETS: Record<ProjectSwapPreset, SwapConfig> = {
  soft: {
    bg: {
      fromAlpha: 0.28,
      fromScale: 1.02,
      toAlpha: 0.55,
      duration: 0.68,
      ease: "power2.out",
    },
    blocks: {
      x: 16,
      scale: 1.01,
      duration: 0.62,
      ease: "power2.out",
      stagger: 0.06,
    },
    panel: {
      x: 16,
      y: 4,
      scale: 1.01,
      duration: 0.84,
      ease: "power2.out",
      offset: "-=0.32",
    },
    panelItems: {
      y: 8,
      duration: 0.58,
      ease: "power2.out",
      stagger: 0.06,
      offset: "-=0.52",
    },
  },
  cinematic: {
    bg: {
      fromAlpha: 0.18,
      fromScale: 1.03,
      toAlpha: 0.55,
      duration: 0.78,
      ease: "power3.out",
    },
    blocks: {
      x: 22,
      scale: 1.016,
      duration: 0.74,
      ease: "power3.out",
      stagger: 0.08,
    },
    panel: {
      x: 22,
      y: 6,
      scale: 1.016,
      duration: 1.02,
      ease: "power3.out",
      offset: "-=0.36",
    },
    panelItems: {
      y: 10,
      duration: 0.72,
      ease: "power2.out",
      stagger: 0.08,
      offset: "-=0.62",
    },
  },
  snappy: {
    bg: {
      fromAlpha: 0.32,
      fromScale: 1.016,
      toAlpha: 0.55,
      duration: 0.52,
      ease: "power2.out",
    },
    blocks: {
      x: 14,
      scale: 1.008,
      duration: 0.48,
      ease: "power2.out",
      stagger: 0.045,
    },
    panel: {
      x: 14,
      y: 3,
      scale: 1.008,
      duration: 0.64,
      ease: "power2.out",
      offset: "-=0.24",
    },
    panelItems: {
      y: 6,
      duration: 0.44,
      ease: "power1.out",
      stagger: 0.045,
      offset: "-=0.36",
    },
  },
};

function isProjectSwapPreset(value: string): value is ProjectSwapPreset {
  return value === "soft" || value === "cinematic" || value === "snappy";
}

function resolveSwapPreset(
  scope: HTMLElement,
  fallback: ProjectSwapPreset,
): ProjectSwapPreset {
  const fromAttribute = scope.getAttribute("data-project-swap-preset");
  if (fromAttribute && isProjectSwapPreset(fromAttribute)) {
    return fromAttribute;
  }

  return fallback;
}

export function animateProjectSwap(
  scope: HTMLElement,
  preset: ProjectSwapPreset = "cinematic",
) {
  const resolvedPreset = resolveSwapPreset(scope, preset);
  const motionPreset = SWAP_PRESETS[resolvedPreset];

  const bg = scope.querySelector<HTMLElement>("[data-project-swap-bg]");
  const panel = scope.querySelector<HTMLElement>("[data-project-swap-panel]");
  const panelItems = scope.querySelectorAll<HTMLElement>(
    "[data-project-swap-panel-item]",
  );
  const blocks = Array.from(
    scope.querySelectorAll<HTMLElement>("[data-project-swap]"),
  ).filter((el) => !el.hasAttribute("data-project-swap-panel"));

  if (bg) {
    gsap.fromTo(
      bg,
      {
        autoAlpha: motionPreset.bg.fromAlpha,
        scale: motionPreset.bg.fromScale,
      },
      {
        autoAlpha: motionPreset.bg.toAlpha,
        scale: 1,
        duration: motionPreset.bg.duration,
        ease: motionPreset.bg.ease,
        overwrite: "auto",
      },
    );
  }

  const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });

  if (blocks.length) {
    timeline.fromTo(
      blocks,
      {
        autoAlpha: 0,
        x: motionPreset.blocks.x,
        scale: motionPreset.blocks.scale,
      },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: motionPreset.blocks.duration,
        ease: motionPreset.blocks.ease,
        stagger: motionPreset.blocks.stagger,
      },
    );
  }

  if (panel) {
    timeline.fromTo(
      panel,
      {
        autoAlpha: 0,
        x: motionPreset.panel.x,
        y: motionPreset.panel.y,
        scale: motionPreset.panel.scale,
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: motionPreset.panel.duration,
        ease: motionPreset.panel.ease,
      },
      motionPreset.panel.offset,
    );

    if (panelItems.length) {
      timeline.fromTo(
        panelItems,
        { autoAlpha: 0, y: motionPreset.panelItems.y },
        {
          autoAlpha: 1,
          y: 0,
          duration: motionPreset.panelItems.duration,
          ease: motionPreset.panelItems.ease,
          stagger: motionPreset.panelItems.stagger,
        },
        motionPreset.panelItems.offset,
      );
    }
  }

  return timeline;
}
