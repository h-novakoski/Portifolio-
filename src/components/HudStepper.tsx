import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  total: number;
  active: number; // 0..total-1
  onChange: (index: number) => void;
  className?: string;
  label?: (index: number) => string; // ex: 01, 02...
};

export function HudStepper({
  total,
  active,
  onChange,
  className = "",
  label = (i) => String(i + 1).padStart(2, "0"),
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [visualOffset, setVisualOffset] = useState(0);
  const [isDragAnimating, setIsDragAnimating] = useState(false);

  // ===== drag (mouse) =====
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const moved = useRef(false);
  const lastDragAt = useRef(0);
  const lastPointerX = useRef(0);
  const dragCarry = useRef(0);
  const activeRef = useRef(active);
  const dragVelocity = useRef(0);
  const inertiaRaf = useRef<number | null>(null);
  const lastInertiaAt = useRef(0);
  const centerAnimRaf = useRef<number | null>(null);

  const DRAG_THRESHOLD = 6;
  const DRAG_MULTIPLIER_MOUSE = 0.72;
  const DRAG_MULTIPLIER_TOUCH = 0.68;
  const INERTIA_FRICTION = 0.94;
  const INERTIA_STOP = 0.005;
  const STEP_PX = 74;

  const wrapIndex = useCallback(
    (index: number) => ((index % total) + total) % total,
    [total],
  );
  const visibleSteps =
    total <= 5
      ? Array.from({ length: total }, (_, i) => i)
      : Array.from({ length: 5 }, (_, offset) =>
          wrapIndex(active + offset - 2),
        );

  const stopInertia = useCallback(() => {
    if (inertiaRaf.current === null) return;
    window.cancelAnimationFrame(inertiaRaf.current);
    inertiaRaf.current = null;
  }, []);

  const syncVisualOffset = () => {
    setVisualOffset(dragCarry.current);
  };

  const stopCenterAnimation = () => {
    if (centerAnimRaf.current === null) return;
    window.cancelAnimationFrame(centerAnimRaf.current);
    centerAnimRaf.current = null;
  };

  const startInertia = useCallback(() => {
    stopInertia();
    lastInertiaAt.current = performance.now();

    const run = () => {
      const now = performance.now();
      const dt = Math.min(Math.max(now - lastInertiaAt.current, 1), 34);
      lastInertiaAt.current = now;

      dragVelocity.current *= Math.pow(INERTIA_FRICTION, dt / 16);
      if (Math.abs(dragVelocity.current) < INERTIA_STOP) {
        dragVelocity.current = 0;
        inertiaRaf.current = null;
        dragCarry.current = 0;
        setVisualOffset(0);
        setIsDragAnimating(false);
        return;
      }

      dragCarry.current += dragVelocity.current * dt;

      while (dragCarry.current <= -STEP_PX) {
        dragCarry.current += STEP_PX;
        const next = wrapIndex(activeRef.current + 1);
        activeRef.current = next;
        onChange(next);
      }

      while (dragCarry.current >= STEP_PX) {
        dragCarry.current -= STEP_PX;
        const prev = wrapIndex(activeRef.current - 1);
        activeRef.current = prev;
        onChange(prev);
      }

      syncVisualOffset();

      inertiaRaf.current = window.requestAnimationFrame(run);
    };

    inertiaRaf.current = window.requestAnimationFrame(run);
  }, [onChange, stopInertia, wrapIndex]);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;

    stopInertia();
    stopCenterAnimation();
    setIsDragAnimating(true);

    isDown.current = true;
    moved.current = false;
    dragVelocity.current = 0;
    dragCarry.current = 0;
    activeRef.current = active;
    lastDragAt.current = performance.now();
    lastPointerX.current = e.pageX;

    document.body.style.userSelect = "none";

    el.classList.add("cursor-grabbing");
    el.classList.add("ring-1", "ring-white/10");
    startX.current = e.pageX;
    startScrollLeft.current = el.scrollLeft;
  };

  const stopMouse = useCallback(() => {
    isDown.current = false;

    const el = scrollerRef.current;
    if (!el) return;
    el.classList.remove("cursor-grabbing");
    el.classList.remove("ring-1", "ring-white/10");
    document.body.style.userSelect = "";

    startInertia();
  }, [startInertia]);

  const dragTo = useCallback(
    (pageX: number) => {
      const el = scrollerRef.current;
      if (!el || !isDown.current) return;

      const dx = pageX - startX.current;
      if (Math.abs(dx) > DRAG_THRESHOLD) moved.current = true;

      const now = performance.now();
      const dt = Math.max(now - lastDragAt.current, 1);
      const pointerDelta = pageX - lastPointerX.current;
      const instantVelocity = pointerDelta / dt;
      dragCarry.current += pointerDelta * DRAG_MULTIPLIER_MOUSE;

      while (dragCarry.current <= -STEP_PX) {
        dragCarry.current += STEP_PX;
        const next = wrapIndex(activeRef.current + 1);
        activeRef.current = next;
        onChange(next);
      }

      while (dragCarry.current >= STEP_PX) {
        dragCarry.current -= STEP_PX;
        const prev = wrapIndex(activeRef.current - 1);
        activeRef.current = prev;
        onChange(prev);
      }

      syncVisualOffset();

      dragVelocity.current = dragVelocity.current * 0.7 + instantVelocity * 0.3;
      lastPointerX.current = pageX;
      lastDragAt.current = now;
    },
    [onChange, wrapIndex],
  );

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;

      e.preventDefault();
      dragTo(e.pageX);
    };

    const onWindowMouseUp = () => {
      if (!isDown.current) return;
      stopMouse();
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      document.body.style.userSelect = "";
      stopInertia();
      stopCenterAnimation();
    };
  }, [dragTo, stopMouse, stopInertia]);

  // ===== drag (touch) =====
  const touchStartX = useRef(0);
  const touchStartScrollLeft = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    const el = scrollerRef.current;
    if (!el) return;

    stopInertia();
    stopCenterAnimation();
    setIsDragAnimating(true);

    moved.current = false;
    dragVelocity.current = 0;
    dragCarry.current = 0;
    activeRef.current = active;
    lastDragAt.current = performance.now();
    lastPointerX.current = e.touches[0].pageX;
    touchStartX.current = e.touches[0].pageX;
    touchStartScrollLeft.current = el.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const el = scrollerRef.current;
    if (!el) return;

    const dx = e.touches[0].pageX - touchStartX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) moved.current = true;

    const now = performance.now();
    const dt = Math.max(now - lastDragAt.current, 1);
    const pointerDelta = e.touches[0].pageX - lastPointerX.current;
    const instantVelocity = pointerDelta / dt;
    dragCarry.current += pointerDelta * DRAG_MULTIPLIER_TOUCH;

    while (dragCarry.current <= -STEP_PX) {
      dragCarry.current += STEP_PX;
      const next = wrapIndex(activeRef.current + 1);
      activeRef.current = next;
      onChange(next);
    }

    while (dragCarry.current >= STEP_PX) {
      dragCarry.current -= STEP_PX;
      const prev = wrapIndex(activeRef.current - 1);
      activeRef.current = prev;
      onChange(prev);
    }

    syncVisualOffset();

    dragVelocity.current = dragVelocity.current * 0.7 + instantVelocity * 0.3;
    lastPointerX.current = e.touches[0].pageX;
    lastDragAt.current = now;
  };

  const onTouchEnd = () => {
    startInertia();
  };

  // ===== wheel vertical -> horizontal =====
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const wrap = (index: number) => ((index % total) + total) % total;

    const wheel = (e: WheelEvent) => {
      // converte scroll vertical em horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        dragCarry.current += -e.deltaY * 0.5;

        while (dragCarry.current <= -STEP_PX) {
          dragCarry.current += STEP_PX;
          const next = wrap(activeRef.current + 1);
          activeRef.current = next;
          onChange(next);
        }

        while (dragCarry.current >= STEP_PX) {
          dragCarry.current -= STEP_PX;
          const prev = wrap(activeRef.current - 1);
          activeRef.current = prev;
          onChange(prev);
        }

        syncVisualOffset();
      }
    };

    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [onChange, total]);

  // ===== em modo carrossel (5 itens), o ativo já fica no centro via render =====

  const safeChange = (i: number) => {
    // se o usuário arrastou, não dispara click/troca
    if (moved.current) return;
    onChange(i);
  };

  return (
    <div
      className={[
        // mantém o seu design
        "relative flex items-center justify-center",
        "rounded-full border border-white/10 bg-black/30",
        "px-2 py-2 md:px-3 md:py-1",
        "shadow-[0_20px_70px_rgba(0,0,0,.55)]",
        // ✅ evita cortar glow por fora
        "overflow-visible",
        className,
      ].join(" ")}
    >
      {/* top line glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-glowV/40 to-transparent" />

      {/* SCROLLER horizontal */}
      <div
        ref={scrollerRef}
        className={[
          "w-full max-w-[340px] md:max-w-[420px]",
          "mx-auto",
          "rounded-full border border-white/10",
          "overflow-x-auto overflow-y-visible",
          "cursor-grab select-none",
          "transition-shadow duration-200",
          "[scrollbar-width:none] [-ms-overflow-style:none]",
          "[&::-webkit-scrollbar]:hidden",
        ].join(" ")}
        // ✅ melhora touch horizontal
        style={{ overscrollBehavior: "contain", touchAction: "pan-x" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex w-max min-w-full items-center justify-center px-2 py-2 transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${visualOffset}px, 0, 0)`,
            transitionDuration: isDragAnimating ? "0ms" : "200ms",
          }}
        >
          {visibleSteps.map((step, idx) => {
            const isActive = step === active;

            return (
              <div key={step} className="flex items-center">
                {/* connector line */}
                {idx > 0 ? (
                  <div className="relative h-px w-6 md:w-10">
                    <div className="absolute inset-0 bg-white/12" />
                    <div
                      className={[
                        "absolute inset-0",
                        step <= active ? "bg-glowV/35" : "bg-transparent",
                      ].join(" ")}
                    />
                  </div>
                ) : null}

                {/* diamond button */}
                <button
                  type="button"
                  onClick={() => safeChange(step)}
                  data-step={step}
                  className="group relative h-12 w-12 md:h-14 md:w-14 shrink-0"
                  aria-label={`Selecionar ${label(step)}`}
                >
                  {/* base diamond */}
                  <div
                    className={[
                      "absolute inset-0 rotate-45 rounded-xl border",
                      "bg-white/[0.02] transition",
                      isActive
                        ? "border-glowV/55 bg-white/[0.06]"
                        : "border-white/14 group-hover:border-white/22 group-hover:bg-white/[0.04]",
                    ].join(" ")}
                  />

                  {/* active glow ring (mesmo do seu) */}
                  {isActive ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl opacity-100"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(140,90,255,.25), 0 0 70px rgba(70,160,255,.12)",
                      }}
                    />
                  ) : null}

                  {/* inner HUD lines */}
                  <div className="pointer-events-none absolute inset-0">
                    <span className="absolute left-2 top-2 h-1 w-6 bg-white/10" />
                    <span className="absolute bottom-2 right-2 h-px w-6 bg-white/10" />
                  </div>

                  {/* label */}
                  <div className="absolute inset-0 grid place-items-center">
                    <span
                      className={[
                        "text-[11px] font-semibold tracking-[0.18em]",
                        isActive ? "text-white/85" : "text-white/55",
                      ].join(" ")}
                    >
                      {label(step)}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
