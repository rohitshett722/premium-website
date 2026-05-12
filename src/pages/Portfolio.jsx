import { motion } from "framer-motion";

const projects = [
  { title: "AI Dashboard", tag: "React / AI" },
  { title: "SaaS Website", tag: "Next.js" },
  { title: "E-Commerce", tag: "Stripe" },
  { title: "Portfolio", tag: "Framer Motion" },
  { title: "Landing Page", tag: "UI/UX" },
  { title: "Mobile App", tag: "React Native" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Portfolio() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center mb-14"
      >
        Portfolio
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="
              rounded-3xl p-6
              bg-white/70 dark:bg-white/10
              backdrop-blur-xl
              border border-white/30
              shadow-xl
              cursor-pointer
            "
          >
            <h3 className="text-xl font-semibold mb-2">
              {project.title}
            </h3>
            <p className="text-sm opacity-70">{project.tag}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
