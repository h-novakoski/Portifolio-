import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  total: number;
  active: number;
  onChange: (index: number) => void;
  className?: string;
  label?: (index: number) => string;
};

const WINDOW_SIZE = 5;
const TRACK_SHIFT_PX = 56;

export function HudStepper({
  total,
  active,
  onChange,
  className = "",
  label = (i) => String(i + 1).padStart(2, "0"),
}: Props) {
  const pointerStartX = useRef<number | null>(null);
  const dragMoved = useRef(false);
  const previousActiveRef = useRef(active);
  const motionResetRef = useRef<number | null>(null);
  const [motionState, setMotionState] = useState<{
    fromActive: number;
    toActive: number;
    direction: "left" | "right";
    started: boolean;
  } | null>(null);

  const wrapIndex = (index: number) => ((index % total) + total) % total;

  const buildVisibleSteps = (centerActive: number) => {
    if (total <= WINDOW_SIZE) {
      return Array.from({ length: total }, (_, index) => ({
        step: index,
        distance: index - centerActive,
      }));
    }

    const halfWindow = Math.floor(WINDOW_SIZE / 2);

    return Array.from({ length: WINDOW_SIZE }, (_, offset) => {
      const distance = offset - halfWindow;
      return {
        step: wrapIndex(centerActive + distance),
        distance,
      };
    });
  };

  const visibleSteps = useMemo(() => buildVisibleSteps(active), [active, total]);

  const beginGesture = (pageX: number) => {
    pointerStartX.current = pageX;
    dragMoved.current = false;
  };

  const finishGesture = (pageX: number) => {
    if (pointerStartX.current === null) return;

    const delta = pageX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(delta) < 36) return;

    dragMoved.current = true;
    onChange(wrapIndex(active + (delta < 0 ? 1 : -1)));

    window.setTimeout(() => {
      dragMoved.current = false;
    }, 120);
  };

  const safeChange = (index: number) => {
    if (dragMoved.current) return;
    onChange(index);
  };

  useEffect(() => {
    const previousActive = previousActiveRef.current;
    if (previousActive === active || total <= 1) return;

    const forwardSteps = (active - previousActive + total) % total;
    const backwardSteps = (previousActive - active + total) % total;
    const direction = forwardSteps <= backwardSteps ? "left" : "right";

    setMotionState({
      fromActive: previousActive,
      toActive: active,
      direction,
      started: false,
    });

    if (motionResetRef.current !== null) {
      window.clearTimeout(motionResetRef.current);
    }

    const raf = window.requestAnimationFrame(() => {
      const raf2 = window.requestAnimationFrame(() => {
        setMotionState((current) =>
          current ? { ...current, started: true } : current,
        );
      });

      motionResetRef.current = window.setTimeout(() => {
        window.cancelAnimationFrame(raf);
        window.cancelAnimationFrame(raf2);
        previousActiveRef.current = active;
        setMotionState(null);
        motionResetRef.current = null;
      }, 280);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [active, total]);

  useEffect(() => {
    return () => {
      if (motionResetRef.current !== null) {
        window.clearTimeout(motionResetRef.current);
      }
    };
  }, []);

  const renderTrack = (
    steps: { step: number; distance: number }[],
    trackKey: string,
  ) => (
    <div key={trackKey} className="flex items-center justify-center">
      {steps.map(({ step, distance }, index) => {
        const absDistance = Math.abs(distance);
        const isActive = distance === 0;
        const fadeOutgoingActive =
          trackKey === "from" && isActive && motionState?.started;
        const scale = isActive ? 1.1 : Math.max(0.7, 1 - absDistance * 0.14);
        const opacity = isActive ? 1 : Math.max(0.8, 0.98 - absDistance * 0.08);
        const diamondSize = isActive ? 18 : absDistance === 1 ? 15 : 13;
        const edgeTone =
          distance < 0
            ? "rgba(168,85,247,.9)"
            : distance > 0
              ? "rgba(70,160,255,.9)"
              : "rgba(0,255,224,1)";
        const connectorColor =
          absDistance === 0
            ? "linear-gradient(90deg,rgba(168,85,247,.24),rgba(0,255,224,.48),rgba(70,160,255,.26))"
            : absDistance === 1
              ? "linear-gradient(90deg,rgba(168,85,247,.24),rgba(0,255,224,.42),rgba(70,160,255,.28))"
              : "linear-gradient(90deg,rgba(168,85,247,.22),rgba(0,255,224,.34),rgba(70,160,255,.24))";
        const diamondBackground = isActive
          ? "linear-gradient(135deg,rgba(168,85,247,.78),rgba(0,255,224,.95) 55%,rgba(70,160,255,.78))"
          : absDistance === 1
            ? distance < 0
              ? "linear-gradient(135deg,rgba(168,85,247,.48),rgba(0,255,224,.34))"
              : "linear-gradient(135deg,rgba(0,255,224,.34),rgba(70,160,255,.42))"
            : distance < 0
              ? "linear-gradient(135deg,rgba(168,85,247,.38),rgba(0,255,224,.24))"
              : "linear-gradient(135deg,rgba(0,255,224,.24),rgba(70,160,255,.36))";
        const diamondBorder = isActive
          ? "rgba(0,255,224,1)"
          : absDistance === 1
            ? edgeTone
            : edgeTone.replace(".9)", ".72)");
        const diamondGlow = isActive
          ? "0 0 16px rgba(0,255,224,.46), 0 0 26px rgba(70,160,255,.16), 0 0 20px rgba(168,85,247,.16)"
          : absDistance === 1
            ? distance < 0
              ? "0 0 12px rgba(168,85,247,.22), 0 0 10px rgba(0,255,224,.12)"
              : "0 0 12px rgba(70,160,255,.22), 0 0 10px rgba(0,255,224,.14)"
            : distance < 0
              ? "0 0 10px rgba(168,85,247,.16), 0 0 8px rgba(0,255,224,.08)"
              : "0 0 10px rgba(70,160,255,.16), 0 0 8px rgba(0,255,224,.1)";

        return (
          <div
            key={`${trackKey}-${step}-${distance}`}
            className="flex items-center"
            style={{
              opacity: fadeOutgoingActive ? 0.18 : opacity,
              transition: "opacity 180ms ease",
            }}
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="mx-1 h-px w-5 md:mx-1.5 md:w-6"
                style={{ background: connectorColor }}
              />
            ) : null}

            <button
              type="button"
              onClick={() => safeChange(step)}
              className="group relative grid h-7 w-7 place-items-center md:h-8 md:w-8"
              aria-label={`Selecionar ${label(step)}`}
              style={{
                transform: `scale(${scale})`,
                transition: "transform 200ms ease, opacity 200ms ease",
              }}
            >
              <span
                className="block transition-all duration-200"
                style={{
                  width: `${diamondSize}px`,
                  height: `${diamondSize}px`,
                  clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                  background: diamondBackground,
                  border: `1px solid ${diamondBorder}`,
                  boxShadow: diamondGlow,
                  transition:
                    "box-shadow 200ms ease, background 200ms ease, border-color 200ms ease",
                }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={[
        "relative flex items-center justify-center overflow-hidden",
        className,
      ].join(" ")}
      onMouseDown={(e) => beginGesture(e.clientX)}
      onMouseUp={(e) => finishGesture(e.clientX)}
      onMouseLeave={(e) => finishGesture(e.clientX)}
      onTouchStart={(e) => beginGesture(e.touches[0].clientX)}
      onTouchEnd={(e) => finishGesture(e.changedTouches[0].clientX)}
    >
      <div className="relative min-h-8 w-full overflow-hidden md:min-h-9">
        {motionState ? (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                willChange: "transform, opacity",
                transform: `translateX(${
                  motionState.started
                    ? motionState.direction === "left"
                      ? `-${TRACK_SHIFT_PX}px`
                      : `${TRACK_SHIFT_PX}px`
                    : "0px"
                })`,
                opacity: motionState.started ? 0.28 : 1,
                transition:
                  "transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 280ms ease",
              }}
            >
              {renderTrack(buildVisibleSteps(motionState.fromActive), "from")}
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                willChange: "transform, opacity",
                transform: `translateX(${
                  motionState.started
                    ? "0px"
                    : motionState.direction === "left"
                      ? `${TRACK_SHIFT_PX}px`
                      : `-${TRACK_SHIFT_PX}px`
                })`,
                opacity: motionState.started ? 1 : 0.35,
                transition:
                  "transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 280ms ease",
              }}
            >
              {renderTrack(buildVisibleSteps(motionState.toActive), "to")}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {renderTrack(visibleSteps, "idle")}
          </div>
        )}
      </div>
    </div>
  );
}
