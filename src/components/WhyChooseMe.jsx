import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// --- 1. DECRYPTION TEXT EFFECT ---
const DecryptText = ({ text, active }) => {
  const [display, setDisplay] = useState(text);
  const chars = "XY01_@#";

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 40);

    return () => clearInterval(interval);
  }, [active, text]);

  return <span className="font-mono tracking-wider">{display}</span>;
};

// --- 2. BORDER BEAM (Desktop & Mobile optimized) ---
const BorderBeam = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] z-0">
    <div className="absolute -inset-[50%] animate-[spin_4s_linear_infinite] opacity-50">
       <div className="w-full h-full bg-[conic-gradient(transparent_0deg,transparent_340deg,#fff_360deg)] dark:bg-[conic-gradient(transparent_0deg,transparent_340deg,#a855f7_360deg)]" />
    </div>
  </div>
);

// --- DATA ---
const specs = [
  {
    id: "01",
    title: "Engineering",
    subtitle: "Architecture First",
    desc: "Scalable systems using Next.js 14 Server Actions & Edge DBs. Built to handle millions.",
    tags: ["System Design", "Scalability", "Clean Arch"],
    bg: "from-blue-600/20 to-cyan-600/20",
    glow: "bg-blue-500",
  },
  {
    id: "02",
    title: "Performance",
    subtitle: "Sub-100ms Latency",
    desc: "Obsessed with Core Web Vitals. Edge caching, GPU-acceleration, and lazy loading strategies.",
    tags: ["99+ Lighthouse", "Web Vitals", "Edge CDN"],
    bg: "from-purple-600/20 to-pink-600/20",
    glow: "bg-purple-500",
  },
  {
    id: "03",
    title: "Experience",
    subtitle: "Cinematic UI/UX",
    desc: "Bridging the gap between art and code. Using physics-based motion (Framer) to create interfaces that feel alive.",
    tags: ["Micro-interactions", "WebGL", "Motion"],
    bg: "from-amber-600/20 to-orange-600/20",
    glow: "bg-amber-500",
  },
  {
    id: "04",
    title: "Security",
    subtitle: "Fortress Grade",
    desc: "Bank-grade protection. OWASP Top 10 compliance, rate limiting, and encrypted vaults.",
    tags: ["Auth v5", "Encryption", "OWASP"],
    bg: "from-emerald-600/20 to-green-600/20",
    glow: "bg-emerald-500",
  },
];

export default function WhyChooseMe() {
  const [activeId, setActiveId] = useState("01");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // --- 3D PARALLAX LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  const contentX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const contentY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-[#e8e8e8] dark:bg-[#030014] overflow-hidden transition-colors duration-500 perspective-[1000px]"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 opacity-40 dark:opacity-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/20 blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/20 blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* ================= THE HYBRID RESPONSIVE LAYOUT ================= */}
        {/* MOBILE: flex-col (Vertical Stack) 
            DESKTOP: lg:flex-row (Horizontal Accordion)
        */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[650px]">
          
          {specs.map((item) => {
            const isActive = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveId(item.id)}
                onMouseMove={isActive ? handleMouseMove : undefined}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`
                  relative cursor-pointer overflow-hidden rounded-[2rem]
                  transition-all duration-500 ease-in-out group
                  border border-white/20 dark:border-white/5
                  
                  /* --- RESPONSIVE WIDTH & HEIGHT LOGIC --- */
                  /* Desktop: Flex Grow/Shrink */
                  ${isActive ? "lg:flex-[3.5]" : "lg:flex-[0.5] hover:lg:flex-[0.7]"}
                  
                  /* Mobile: Fixed Height Transition */
                  ${isActive ? "h-[550px]" : "h-[80px]"}
                  /* Desktop: Always Full Height */
                  lg:h-auto

                  /* --- COLORS --- */
                  bg-gray-100 dark:bg-[#0a0a0a] shadow-xl
                `}
              >
                {/* 1. ACTIVE BORDER BEAM */}
                {isActive && <BorderBeam />}

                {/* 2. DYNAMIC BACKGROUND */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />
                <div className="absolute inset-0 bg-white/40 dark:bg-[#0a0a0a]/90 backdrop-blur-3xl" />
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* 3. INACTIVE LABEL (Smart Switching) */}
                <div className={`
                  absolute inset-0 flex items-center justify-center z-10
                  transition-all duration-500
                  ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}>
                    {/* DESKTOP VERSION (Vertical Text) - Hidden on Mobile */}
                    <div className="hidden lg:flex flex-col items-center gap-4">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-4xl font-bold text-gray-400 dark:text-white/30 -rotate-90 tracking-widest uppercase whitespace-nowrap group-hover:text-gray-600 dark:group-hover:text-white transition-colors">
                            {item.title}
                        </h3>
                        <span className="font-mono text-xs text-gray-400 dark:text-white/30 group-hover:text-black dark:group-hover:text-white transition-colors">0{item.id}</span>
                    </div>

                    {/* MOBILE VERSION (Horizontal Text) - Hidden on Desktop */}
                    <div className="flex lg:hidden w-full px-8 justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-600 dark:text-white/60 tracking-widest uppercase">
                            {item.title}
                        </h3>
                        <span className="font-mono text-xs text-gray-400 dark:text-white/40">0{item.id}</span>
                    </div>
                </div>

                {/* 4. ACTIVE CONTENT */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="relative h-full w-full p-6 md:p-12 flex flex-col justify-between z-20"
                    >
                      {/* --- PARALLAX CONTAINER --- */}
                      <motion.div style={{ x: contentX, y: contentY }} className="relative z-20">
                          
                          {/* Top: ID */}
                          <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4 mb-8">
                              <span className="text-6xl md:text-9xl font-black text-black/5 dark:text-white/5 font-sans leading-none tracking-tighter">
                                  {item.id}
                              </span>
                              <div className="flex flex-col items-end gap-2">
                                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/50 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10 text-black dark:text-white`}>
                                      System Active
                                  </div>
                                  <div className="flex gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.glow} animate-pulse`} />
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.glow} opacity-50`} />
                                  </div>
                              </div>
                          </div>

                          {/* Middle: Content */}
                          <div className="max-w-2xl relative">
                              <div className="absolute -left-6 top-0 w-1 h-20 bg-gradient-to-b from-black/20 to-transparent dark:from-white/20 hidden md:block" />
                              
                              <motion.h2 
                                layout
                                className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight"
                              >
                                <DecryptText text={item.title} active={isActive} />
                              </motion.h2>
                              
                              <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-sm md:text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 dark:from-white/80 dark:to-white/40 mb-6"
                              >
                                // {item.subtitle}
                              </motion.h3>

                              <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-sm md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light"
                              >
                                {item.desc}
                              </motion.p>
                          </div>

                          {/* Bottom: Tags */}
                          <div className="flex flex-wrap gap-2 md:gap-3 mt-8">
                              {item.tags.map((tag, i) => (
                                  <motion.span 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + (i * 0.05) }}
                                    className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl border border-black/5 dark:border-white/10 text-xs md:text-sm font-semibold bg-white/40 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-white shadow-sm"
                                  >
                                     {tag}
                                  </motion.span>
                              ))}
                          </div>
                      </motion.div>

                      {/* --- Background Glow Blob --- */}
                      <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${item.bg} blur-[80px] opacity-60 pointer-events-none`} />
                      
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}