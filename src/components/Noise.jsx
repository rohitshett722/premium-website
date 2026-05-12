export default function Noise() {
  return (
    <div
      className="
        pointer-events-none fixed inset-0 z-[1]
        opacity-[0.04]
        bg-[url('/noise.png')]
        mix-blend-overlay
      "
    />
  );
}
