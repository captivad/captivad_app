/** Ambient radial glow */
function GlowOrb({
  x = "50%",
  y = "50%",
  size = "60%",
  opacity = 0.04,
  color = "255,255,255",
}: {
  x?: string;
  y?: string;
  size?: string;
  opacity?: number;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none inset-0"
      style={{
        background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(${color},${opacity}) 0%, transparent 70%)`,
      }}
    />
  );
}

export default GlowOrb;
