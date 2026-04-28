/** Dot grid dekoratif ala neural network */
function NodeGrid({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    />
  );
}

export default NodeGrid;
