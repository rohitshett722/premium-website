import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ children, className }) {
  const ref = useRef(null);

  // motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smooth spring
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  // sound (created once)
  const hoverSound = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/magnetic.mp3")
      : null
  );

  function handleMouseMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.35);
    y.set(offsetY * 0.35);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  function handleEnter() {
    // 🔊 magnetic sound
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.volume = 0.25;
      hoverSound.current.play().catch(() => {});
    }

    // 📱 mobile haptic (only real phones)
    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onMouseEnter={handleEnter}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
