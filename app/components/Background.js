export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 1) 80%)`,
        }}
      ></div>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
        }}
      ></div>
    </div>
  );
}
