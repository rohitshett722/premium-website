import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// --- Data Arrays ---
const techStack = [
  { name: "React.js", category: "Frontend Core" },
  { name: "Next.js", category: "Fullstack Framework" },
  { name: "Tailwind CSS", category: "Style Engine" },
  { name: "Framer Motion", category: "Animation Library" },
  { name: "Node.js", category: "Backend Runtime" },
  { name: "Shopify", category: "E-commerceOS" },
];

const values = [
  { name: "High Performance", category: "99+ Web Vitals" },
  { name: "Elite Security", category: "Enterprise Grade" },
  { name: "Global Scale", category: "Pan-India & Beyond" },
  { name: "SEO Optimized", category: "Organic Growth" },
  { name: "Business Logic", category: "Strategy First" },
  { name: "24/7 Reliability", category: "Uptime Guarantee" },
];

// --- Tech Card Component ---
const TechCard = ({ title, subtitle, icon }) => {
  return (
    <div className="group relative overflow-hidden bg-white/5 dark:bg-[#0A0A0F] border border-white/10 dark:border-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]">
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/50 -translate-x-full group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-blue-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-blue-500 transition-colors" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl ring-1 ring-white/10 group-hover:ring-blue-500/40 transition-all">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{subtitle}</p>
      </div>
    </div>
  );
};

// --- Holographic Tech Badge ---
function TechBadge({ item, variant = "blue" }) {
    const gradient = variant === "blue" ? "from-blue-500 to-cyan-500" : "from-purple-500 to-pink-500";
    const border = variant === "blue" ? "group-hover:border-blue-500/50" : "group-hover:border-purple-500/50";
  
    return (
      <div className={`
        relative px-6 py-3 flex items-center gap-4
        bg-white/5 dark:bg-[#0c0c14] border border-white/10 dark:border-white/5
        backdrop-blur-md transition-all duration-300 group
        hover:bg-white/10 dark:hover:bg-white/[0.07] ${border}
        overflow-hidden
      `}>
        {/* Tech Indicator */}
        <span className={`w-2 h-2 bg-gradient-to-r ${gradient}`} />
        <div className="flex flex-col">
          <span className="text-base font-bold text-gray-800 dark:text-gray-100 tracking-tight">{item.name}</span>
          <span className="text-[10px] uppercase tracking-widest opacity-60 font-mono text-gray-500 dark:text-gray-400">[{item.category}]</span>
        </div>
        
        {/* Scanline Hover Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 mix-blend-overlay transition-opacity`} />
      </div>
    );
  }

export default function TrustEcosystem() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax speed
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // --- ⚡ FAST ANIMATION CONFIGURATION ---
  const headingText = "Holographic Ecosystem".split(""); 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // <--- FAST SPEED (0.03s per letter)
        delayChildren: 0.1,    // Start quickly
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, // <--- Snappy movement
        damping: 10 
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="
        relative w-full py-32 overflow-hidden
        bg-[#f6f7fb] dark:bg-[#050505]
        border-y border-black/10 dark:border-white/10
      "
    >
        
      {/* ================= ULTRA SCI-FI BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ y: gridY }}
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2] bg-[linear-gradient(to_right,rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)] origin-top" 
          />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full mix-blend-overlay" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full mix-blend-overlay" />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6">
          
        {/* ================= HEADER WITH FAST TYPING ================= */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-blue-500/30 rounded-sm bg-blue-500/5"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">System Architecture</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-6 leading-[1.1]">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="block"
            >
              Built on a
            </motion.span>
            
            {/* TYPING EFFECT CONTAINER */}
            <motion.span 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }} // Trigger slightly before full view
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x inline-block"
            >
              {headingText.map((letter, index) => (
                <motion.span 
                  key={index} 
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light"
          >
            Leveraging next-gen protocols and elite-grade technologies to engineer digital experiences that define the future.
          </motion.p>
        </div>

        {/* ================= DUAL TECH MARQUEE ================= */}
        <div className="relative flex flex-col gap-6 my-20 mask-linear-fade">
            
            {/* Row 1: Blue/Cyan Theme */}
            <div className="flex overflow-hidden fade-mask-x py-2">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                className="flex gap-4 whitespace-nowrap"
              >
                {[...techStack, ...techStack, ...techStack].map((item, i) => (
                   <TechBadge key={i} item={item} variant="blue" />
                ))}
              </motion.div>
            </div>

            {/* Row 2: Purple/Pink Theme */}
            <div className="flex overflow-hidden fade-mask-x py-2">
              <motion.div
                initial={{ x: "-50%" }}
                animate={{ x: 0 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                className="flex gap-4 whitespace-nowrap"
              >
                {[...values, ...values, ...values].map((item, i) => (
                   <TechBadge key={i} item={item} variant="purple" />
                ))}
              </motion.div>
            </div>
        </div>

        {/* ================= ULTRA TECH CARDS ================= */}
        <motion.div 
          style={{ y }}
          className="grid md:grid-cols-3 gap-8 mt-32"
        >
            <TechCard 
              icon="⚡" 
              title="Hyper Velocity" 
              subtitle="Core Web Vitals optimized for instant load times." 
            />
            <TechCard 
              icon="💠" 
              title="Neural Polish" 
              subtitle="Fluid, cinematic interfaces with deep interactivity." 
            />
            <TechCard 
              icon="🏗️" 
              title="Future Proof" 
              subtitle="Scalable, secure architecture built for exponential growth." 
            />
        </motion.div>

      </div>
      
      {/* CSS Styles for masks */}
      <style jsx>{`
        .fade-mask-x {
           mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
           -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
    </section>
  );
}