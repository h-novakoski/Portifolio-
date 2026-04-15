import { useRef } from "react";

type Props = {
  total: number;
  active: number;
  onChange: (index: number) => void;
  className?: string;
  label?: (index: number) => string;
};

export function HudStepper({
  total,
  active,
  onChange,
  className = "",
  label = (i) => String(i + 1).padStart(2, "0"),
}: Props) {
  const pointerStartX = useRef<number | null>(null);
  const dragMoved = useRef(false);

  const wrapIndex = (index: number) => ((index % total) + total) % total;

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

  return (
    <div
      className={[
        "relative flex flex-col items-center justify-center overflow-visible",
        className,
      ].join(" ")}
      onMouseDown={(e) => beginGesture(e.clientX)}
      onMouseUp={(e) => finishGesture(e.clientX)}
      onMouseLeave={(e) => finishGesture(e.clientX)}
      onTouchStart={(e) => beginGesture(e.touches[0].clientX)}
      onTouchEnd={(e) => finishGesture(e.changedTouches[0].clientX)}
    >
      <div className="flex flex-wrap items-center justify-center gap-y-2">
        {Array.from({ length: total }, (_, step) => {
          const isActive = step === active;

          return (
            <div key={step} className="flex items-center">
              {step > 0 ? (
                <span
                  aria-hidden="true"
                  className="mx-1.5 h-px w-4 md:mx-2 md:w-5"
                  style={{
                    background: isActive
                      ? "rgba(168,85,247,.3)"
                      : "rgba(168,85,247,.15)",
                  }}
                />
              ) : null}

              <button
                type="button"
                onClick={() => safeChange(step)}
                className="group relative grid h-5 w-5 place-items-center md:h-6 md:w-6"
                aria-label={`Selecionar ${label(step)}`}
              >
                <span
                  className="block transition-all duration-200"
                  style={{
                    width: isActive ? "18px" : "14px",
                    height: isActive ? "18px" : "14px",
                    clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                    background: isActive
                      ? "rgba(168,85,247,.55)"
                      : "rgba(168,85,247,.10)",
                    border: `1px solid ${
                      isActive
                        ? "rgba(168,85,247,.95)"
                        : "rgba(168,85,247,.22)"
                    }`,
                    boxShadow: isActive
                      ? "0 0 10px rgba(168,85,247,.42)"
                      : "none",
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="mt-3 font-mono text-[9px] tracking-[0.22em]"
        style={{ color: "rgba(168,85,247,.45)" }}
      >
        {label(active)} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
