import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ================= DATA ================= */
const FEATURES = [
  {
    label: "Sizes",
    image:
      "https://user-images.githubusercontent.com/97989643/220242520-78dd8232-4416-461a-a8f1-6c0b3f5f357f.gif",
    desc:
      "The 14-inch model is available with multiple chip options. The 16-inch model offers expanded performance and more screen space.",
  },
  {
    label: "Colors",
    image: "/images/colors.jpg",
    desc:
      "Available in Space Black and Silver finishes, designed to look professional in every environment.",
  },
  {
    label: "Display",
    image: "/images/display.jpg",
    desc:
      "Liquid Retina XDR delivers extreme brightness, deep blacks and incredible color accuracy.",
  },
  {
    label: "Connectivity",
    image: "/images/connectivity.jpg",
    desc:
      "Thunderbolt, HDMI, SDXC, MagSafe and headphone jack included.",
  },
  {
    label: "Camera",
    image: "/images/camera.jpg",
    desc:
      "12MP Center Stage camera keeps you perfectly framed during video calls.",
  },
  {
    label: "Audio",
    image: "/images/audio.jpg",
    desc:
      "Studio-quality three-mic array with immersive six-speaker sound system.",
  },
];

/* ================= ANIMATION VARIANTS ================= */
const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function BentoWorkflow() {
  const [active, setActive] = useState(0);

  /* 🔊 Micro click (non-blocking) */
  const clickSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-1120.mp3"
    );
    audio.volume = 0.18;
    audio.play();
  };

  return (
    <section className="relative min-h-screen bg-[#f6f7fb] dark:bg-[#06060c] overflow-hidden">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 rounded-t-[90px] rounded-b-[70px] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={active}
            src={FEATURES[active].image}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Clean overlay */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-end px-5 lg:pr-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="
            w-full max-w-[440px]
            rounded-[56px]
            bg-white/70 dark:bg-white/10
            backdrop-blur-2xl
            border border-purple-500/20
            p-4 space-y-4
            shadow-[0_40px_120px_rgba(168,85,247,0.35)]
          "
        >
          {FEATURES.map((item, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                layout="position"
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                  },
                }}
                className="relative rounded-[44px] overflow-hidden"
              >
                {/* Neon pulse */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-[44px] pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(168,85,247,0)",
                        "0 0 28px rgba(168,85,247,0.65)",
                        "0 0 0px rgba(168,85,247,0)",
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}

                {/* TAB */}
                <button
                  onClick={() => {
                    if (i !== active) {
                      setActive(i);
                      clickSound();
                    }
                  }}
                  className={`
                    w-full text-left px-7 py-6
                    rounded-[44px]
                    transition-colors duration-300
                    ${
                      isActive
                        ? `
                          bg-gradient-to-r
                          from-purple-500 via-pink-500 to-cyan-400
                          text-white
                        `
                        : `
                          bg-white/60 dark:bg-black/30
                          text-gray-800 dark:text-white/70
                          hover:bg-white/80 dark:hover:bg-black/40
                        `
                    }
                  `}
                >
                  <div className="flex items-center gap-4 font-medium text-[17px]">
                    <span className="h-9 w-9 flex items-center justify-center rounded-full bg-white/20 border border-white/30">
                      +
                    </span>
                    {item.label}
                  </div>

                  {/* DESCRIPTION */}
                  <AnimatePresence mode="sync">
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-4 text-sm leading-relaxed text-white/95"
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ================= MOBILE FLOATING TABS ================= */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white/70 dark:bg-black/50 backdrop-blur-xl px-4 py-3 rounded-full border border-black/10 dark:border-white/10">
        {FEATURES.map((f, i) => (
          <button
            key={f.label}
            onClick={() => {
              setActive(i);
              clickSound();
            }}
            className={`h-10 px-4 rounded-full text-sm transition ${
              active === i
                ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
                : "text-gray-700 dark:text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </section>
  );
}
