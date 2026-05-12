import { motion, AnimatePresence } from "framer-motion";

const name = "ROHIT SHETTY";

export default function PageLoader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black overflow-hidden
          "
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)]" />

          {/* NAME ANIMATION */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex gap-1 text-5xl md:text-7xl font-extrabold tracking-widest"
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 80,
                    scale: 0.8,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: i * 0.08,
                      duration: 0.8,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -60,
                    scale: 1.1,
                    transition: {
                      duration: 0.6,
                    },
                  },
                }}
                className="
                  bg-gradient-to-r from-purple-400 to-pink-500
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]
                "
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-24 text-sm tracking-widest text-white/60"
          >
            CRAFTING PREMIUM DIGITAL EXPERIENCES
          </motion.p>

          {/* Progress line (Netflix feel) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="
              absolute bottom-16
              h-[2px] w-48
              bg-gradient-to-r from-purple-500 to-pink-500
              origin-left
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
