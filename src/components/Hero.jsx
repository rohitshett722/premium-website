import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  const { scrollY } = useScroll();

  /* ================= SCROLL PARALLAX ================= */
  const ySlow = useTransform(scrollY, [0, 300], [0, 120]);
const yFast = useTransform(scrollY, [0, 300], [0, -100]);

  const fadeOut = useTransform(scrollY, [0, 400], [1, 0.75]);

  /* ================= MOUSE REACTIVE GLOW ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

useEffect(() => {
  // ❌ Mobile pe mousemove nahi hota – isliye skip
if (!window.matchMedia("(hover: hover)").matches) return;

  let ticking = false;

const move = (e) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
      ticking = false;
    });
    ticking = true;
  }
};


  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);


  return (
    <section className="
  relative min-h-screen pt-24 md:pt-36 overflow-hidden

      bg-[#f6f7fb] dark:bg-[#06060c]
      transition-colors duration-500
    ">

      {/* ================= SCI-FI GRID ================= */}
      <div className="
        absolute inset-0 opacity-40
        bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),
                 linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
        bg-[size:70px_70px]
      " />

      {/* ================= PARALLAX ENERGY BLOBS ================= */}
      <motion.div
style={{ y: yFast, x: smoothX, opacity: fadeOut, willChange: "transform" }}
        className="
          absolute -top-52 -left-52 w-[700px] h-[700px]
          bg-gradient-to-br from-purple-500/35 to-pink-500/25
          rounded-full blur-[140px]

        "
      />
      <motion.div
        style={{ y: ySlow, x: smoothY }}
        className="
          absolute top-1/2 -right-52 w-[700px] h-[700px]
          bg-gradient-to-br from-cyan-400/25 to-purple-500/25
          rounded-full blur-[140px]

        "
      />

      {/* ================= NEURAL SCANLINES ================= */}
     {/* ================= SOFT BLUR GRID ================= */}
<div className="
  absolute inset-0
  opacity-20
  blur-[2px]
  bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),
      linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
  bg-[size:140px_140px]
" />


      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Tag */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="
              inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full
              bg-white/70 dark:bg-white/10 backdrop-blur
              border border-purple-500/30 text-sm
              shadow-[0_0_30px_rgba(168,85,247,0.3)]
            "
          >
            ⚡ FUTURISTIC WEB ENGINEER
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="
              text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.05]
              bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
              bg-clip-text text-transparent
              drop-shadow-[0_0_50px_rgba(168,85,247,0.45)]
            "
          >
            Designing <br />
            Sci-Fi Grade <br />
            Experiences
          </motion.h1>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="
              mt-8 max-w-xl text-lg
              text-gray-700 dark:text-gray-400
            "
          >
            Cinematic motion, holographic depth and elite-level engineering —
            crafted for brands that want to feel futuristic.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex gap-5"
          >
            <motion.button
              whileHover={{ y: -6, scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative overflow-hidden px-9 py-4 rounded-full text-white
                bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
                shadow-[0_30px_90px_rgba(168,85,247,0.6)]
              "
            >
              <span className="relative z-10">Explore Work</span>
              <span className="
                absolute inset-0 opacity-0 hover:opacity-100 transition
                bg-gradient-to-r from-white/30 to-transparent
              " />
            </motion.button>

            <motion.button
              whileHover={{ y: -4 }}
              className="
                px-9 py-4 rounded-full
                border border-purple-500/30
                backdrop-blur
                shadow-[0_0_30px_rgba(168,85,247,0.25)]
              "
            >
              Contact
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT ================= */}
<div className="relative mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.04 }}
            transition={{ delay: 0.25, duration: 1 }}
            className="
              relative p-8 rounded-[36px]
              bg-white/70 dark:bg-white/10
backdrop-blur-lg
              border border-purple-500/30
              shadow-[0_60px_160px_rgba(168,85,247,0.45)]
            "
          >
            <div className="flex gap-2 mb-5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <pre className="text-sm leading-relaxed text-purple-600 dark:text-purple-400">
{`export const buildFuture = () => ({
  ui: "sci-fi",
  motion: "cinematic",
  depth: "holographic",
  polish: "elite",
});`}
            </pre>
          </motion.div>

          <motion.div
            animate={{ y: [0, -20, 0] }}
transition={{ duration: 10, repeat: Infinity }}
            className="
              absolute -bottom-14 -left-14 px-5 py-3 rounded-2xl
              bg-white/80 dark:bg-white/10 backdrop-blur
              border border-purple-500/30
              shadow-[0_0_40px_rgba(168,85,247,0.35)]
              text-sm
            "
          >
            ⚛ React • Motion • Future UI
          </motion.div>

          <motion.div
            animate={{ y: [0, 22, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="
              absolute -top-14 right-0 px-6 py-4 rounded-2xl
              bg-white/80 dark:bg-white/10 backdrop-blur
              border border-purple-500/30
              shadow-[0_0_40px_rgba(168,85,247,0.35)]
            "
          >
            <p className="text-xs opacity-60">Systems Built</p>
            <p className="text-2xl font-bold">120+</p>
          </motion.div>

        </div>
      </div> <br /><br /><br />
    </section>
  );
}