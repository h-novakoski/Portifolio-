export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] opacity-[0.12] mix-blend-overlay"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.10) 0, transparent 35%)," +
          "radial-gradient(circle at 80% 40%, rgba(255,255,255,0.07) 0, transparent 40%)," +
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)," +
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 4px)",
      }}
    />
  );
}
