import { useCallback, useEffect, useMemo, useRef } from "react";

type Props = {
  total: number;
  active: number;
  onChange: (index: number) => void;
  className?: string;
  label?: (index: number) => string;
};

const WINDOW_SIZE = 5;
const TRACK_SHIFT_PX = 48;

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  const wrapIndex = useCallback(
    (index: number) => ((index % total) + total) % total,
    [total],
  );

  const visibleSteps = useMemo(() => {
    if (total <= WINDOW_SIZE) {
      return Array.from({ length: total }, (_, index) => ({
        step: index,
        distance: index - active,
      }));
    }

    const halfWindow = Math.floor(WINDOW_SIZE / 2);

    return Array.from({ length: WINDOW_SIZE }, (_, offset) => {
      const distance = offset - halfWindow;
      return {
        step: wrapIndex(active + distance),
        distance,
      };
    });
  }, [active, total, wrapIndex]);

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

    previousActiveRef.current = active;
    const track = trackRef.current;
    if (!track) return;

    animationRef.current?.cancel();
    animationRef.current = track.animate(
      [
        {
          transform: `translateX(${direction === "left" ? TRACK_SHIFT_PX : -TRACK_SHIFT_PX}px)`,
          opacity: 0.55,
          filter: "brightness(0.92)",
        },
        {
          transform: "translateX(0px)",
          opacity: 1,
          filter: "brightness(1)",
        },
      ],
      {
        duration: 280,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    );
  }, [active, total]);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

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
        <div
          ref={trackRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <div className="flex items-center justify-center">
            {visibleSteps.map(({ step, distance }, index) => {
              const absDistance = Math.abs(distance);
              const isActive = distance === 0;
              const scale = isActive ? 1.1 : Math.max(0.7, 1 - absDistance * 0.14);
              const opacity = isActive
                ? 1
                : Math.max(0.8, 0.98 - absDistance * 0.08);
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
                  key={`${step}-${distance}`}
                  className="flex items-center"
                  style={{ opacity }}
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
        </div>
      </div>
    </div>
  );
}
