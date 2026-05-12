import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

import {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt,
  FaNodeJs, FaPython, FaJava, FaPhp, FaDocker,
  FaDatabase, FaCode, FaTerminal, FaCloud, FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss, SiFramer, SiNextdotjs, SiTypescript,
  SiRedux, SiMongodb, SiFirebase, SiVite,
  SiWebpack, SiGraphql, SiLinux,
} from "react-icons/si";

/* ===== ICON POOL ===== */
const ICONS = [
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt,
  FaNodeJs, FaPython, FaJava, FaPhp, FaDocker,
  FaDatabase, FaCode, FaTerminal, FaCloud, FaGithub,
  SiTailwindcss, SiFramer, SiNextdotjs, SiTypescript,
  SiRedux, SiMongodb, SiFirebase, SiVite,
  SiWebpack, SiGraphql, SiLinux,
];

const TAGLINE = "FULL-STACK · FRONTEND · MOTION ENGINEER";

export default function AdvancedPreloader({ show, onComplete }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640;

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(show);
  const [finishing, setFinishing] = useState(false);

  /* ================= SAFE PROGRESS ENGINE (FIXED) ================= */
  useEffect(() => {
    if (!show) return;

    let rafId;
    let start = performance.now();
    const DURATION = 2600;

    // reset states
    setVisible(true);
    setFinishing(false);
    setProgress(0);

    const tick = (now) => {
      const elapsed = now - start;
      const percent = Math.min((elapsed / DURATION) * 100, 100);

      setProgress(Math.floor(percent));

      if (percent < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setFinishing(true);

        // clean exit (single source of truth)
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 800);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [show, onComplete]);

  /* ================= ICON CONFIG ================= */
  const ICON_COUNT = finishing
    ? isMobile ? 10 : 18
    : isMobile ? 24 : 48;

  const COLUMNS = isMobile ? 8 : 14;

  const iconData = useMemo(() => {
    return Array.from({ length: ICON_COUNT }).map((_, i) => {
      const column = i % COLUMNS;
      const startX = column * (100 / COLUMNS) + Math.random() * 4;
      const centerDistance = startX - 50;

      return {
        id: i,
        Icon: ICONS[i % ICONS.length],
        startX,
        centerDistance,
        size: isMobile ? Math.random() * 8 + 18 : Math.random() * 10 + 22,
        delay: Math.random() * 0.4,
        duration: Math.random() * 1.2 + 2,
        gravity: -centerDistance * 0.35,
        top: `-${Math.random() * 220 + 100}px`,
      };
    });
  }, [ICON_COUNT, COLUMNS, isMobile]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.5),transparent_70%)]" />

          {/* FINISH GLOW */}
          {finishing && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: [0.95, 1.05, 0.98] }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              style={{
                background: `
                  radial-gradient(
                    circle at center,
                    rgba(168,85,247,1) 0%,
                    rgba(236,72,153,0.85) 35%,
                    rgba(168,85,247,0.55) 55%,
                    transparent 75%
                  )
                `,
                filter: "blur(10px)",
              }}
            />
          )}

          {/* ICON RAIN */}
          {iconData.map(
            ({
              id,
              Icon,
              startX,
              size,
              delay,
              duration,
              gravity,
              top,
              centerDistance,
            }) => (
              <motion.div
                key={id}
                className="absolute text-purple-400"
                style={{
                  left: `${startX}%`,
                  top,
                  fontSize: size,
                  textShadow:
                    Math.abs(centerDistance) < 18
                      ? "0 0 16px rgba(168,85,247,0.9)"
                      : "0 0 6px rgba(168,85,247,0.4)",
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={
                  finishing
                    ? {
                        opacity: 0,
                        x: gravity * 3,
                        y: -200,
                        scale: 0.6,
                      }
                    : {
                        opacity: [0, 1, 1, 0],
                        y: "130vh",
                        x: [0, gravity * 0.4, gravity],
                        rotate: 300,
                      }
                }
                transition={{
                  duration: finishing ? 0.7 : duration,
                  delay,
                  ease: "easeOut",
                }}
              >
                <Icon />
              </motion.div>
            )
          )}

          {/* CENTER CONTENT */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="text-center px-6"
              animate={finishing ? { scale: 0.96, opacity: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.h1
                initial={{ scale: 0.8, opacity: 0, filter: "blur(16px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 1.2 }}
                className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent"
              >
                Rohit Shetty
              </motion.h1>

              <p className="mt-4 text-[10px] sm:text-xs tracking-[0.32em] text-white/70">
                {TAGLINE}
              </p>

              <div className="mt-8 w-64 sm:w-80 mx-auto">
                <div className="h-[3px] bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.08 }}
                  />
                </div>

                <div className="mt-3 text-xs tracking-[0.25em] text-white">
                  {progress < 100 ? `LOADING ${progress}%` : "READY"}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
