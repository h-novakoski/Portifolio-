import { useEffect } from "react";

export function useTilt(selector = "[data-tilt]") {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));

    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;  // 0..1
      const y = (e.clientY - r.top) / r.height;  // 0..1
      const rx = (0.5 - y) * 10; // rotateX
      const ry = (x - 0.5) * 12; // rotateY
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    };

    const onLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    cards.forEach((el) => {
      el.style.transition = "transform 220ms ease";
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cards.forEach((el) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [selector]);
}