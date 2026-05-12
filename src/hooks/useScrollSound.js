import { useEffect } from "react";

export default function useScrollSound() {
  useEffect(() => {
    const audio = new Audio("/sounds/scroll.mp3");
    audio.volume = 0.15;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        ticking = true;
        setTimeout(() => (ticking = false), 120);
      }
    };

    window.addEventListener("wheel", onScroll);
    return () => window.removeEventListener("wheel", onScroll);
  }, []);
}
