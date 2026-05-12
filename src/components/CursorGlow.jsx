import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");

    const move = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      id="cursor-glow"
      className="
        pointer-events-none fixed z-[9999]
        w-40 h-40 -translate-x-1/2 -translate-y-1/2
        rounded-full blur-3xl opacity-30
        bg-gradient-to-r from-purple-500 to-pink-500
      "
    />
  );
}
