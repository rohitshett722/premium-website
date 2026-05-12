import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#f6f7fb] dark:bg-[#050505] flex justify-center items-center px-6 transition-colors duration-500">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[70%] max-w-3xl bg-purple-500/20 blur-[120px] rounded-full pointer-events-none dark:mix-blend-screen" />

      {/* Floating Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-5xl rounded-[2.5rem] md:rounded-[3.5rem] 
          bg-white/60 dark:bg-white/5 backdrop-blur-3xl 
          border border-white/40 dark:border-white/10 
          p-10 md:p-20 text-center 
          shadow-[0_20px_60px_-15px_rgba(168,85,247,0.15)]
        "
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Ready to build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">future?</span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Whether it's a scalable SaaS platform, a fluid mobile app, or a high-end web experience. Let's engineer something extraordinary together.
        </p>
        
        <motion.button
          whileHover={{ y: -6, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-10 py-5 rounded-full text-white font-bold text-lg tracking-wide
            bg-gradient-to-r from-purple-600 to-cyan-500 
            shadow-[0_15px_30px_-10px_rgba(168,85,247,0.5)]
            transition-all border border-white/20
          "
        >
          Start a Project
        </motion.button>
      </motion.div>
    </section>
  );
}