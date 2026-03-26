import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef(0);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      velocity.current = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.4, 20);

      lastPos.current = { x: e.clientX, y: e.clientY };

      el.style.transform = `translate(${e.clientX - 160}px, ${
        e.clientY - 160
      }px)`;

      el.style.opacity = `${0.15 + velocity.current / 100}`;
    };

    const fade = () => {
      velocity.current *= 0.92;

      if (el) {
        el.style.opacity = `${0.12 + velocity.current / 100}`;
      }

      raf.current = requestAnimationFrame(fade);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf.current = requestAnimationFrame(fade);

    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[320px] w-[320px] rounded-full blur-3xl mix-blend-lighten transition-opacity duration-200"
      style={{
        background:
          "radial-gradient(circle, rgba(140,90,255,.22) 0%, rgba(70,160,255,.12) 40%, transparent 70%)",
        opacity: 0.15,
      }}
    />
  );
}