import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// --- EXPANDED DATA WITH TECH TAGS ---
const eliteFeatures = [
  {
    title: "Cinematic UI/UX & Liquid Design",
    desc: "We don't just build interfaces; we craft digital experiences. Using physics-based motion and deep glassmorphism, your brand will feel premium, intuitive, and unforgettable.",
    icon: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
    span: "md:col-span-2 lg:col-span-2 md:row-span-2", // Big hero card
    color: "rgba(168, 85, 247, 0.7)", // Purple
    tags: ["Framer Motion", "Tailwind CSS", "React.js", "Glassmorphism"]
  },
  {
    title: "SaaS & Billing Architectures",
    desc: "End-to-end POS systems, multi-tenant dashboards, and automated invoicing with seamless payment gateway integrations.",
    icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>,
    span: "md:col-span-2 lg:col-span-2", // Wide card
    color: "rgba(59, 130, 246, 0.7)", // Blue
    tags: ["Node.js", "PostgreSQL", "Stripe/Razorpay"]
  },
  {
    title: "High-Performance Mobile",
    desc: "Native-feeling, cross-platform applications optimized for 60fps scrolling and offline-first capabilities.",
    icon: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></>,
    span: "col-span-1",
    color: "rgba(6, 182, 212, 0.7)", // Cyan
    tags: ["Flutter", "React Native", "Dart"]
  },
  {
    title: "Secure Data Vaults",
    desc: "Bank-grade encryption, secure file storage, and bulletproof authentication systems to protect user data.",
    icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>,
    span: "col-span-1",
    color: "rgba(16, 185, 129, 0.7)", // Emerald
    tags: ["Firebase Auth", "JWT", "AES-256"]
  },
  {
    title: "AI & Automation",
    desc: "Intelligent workflows, WhatsApp API bots, and automated marketing funnels that run your business on autopilot.",
    icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
    span: "md:col-span-2 lg:col-span-2", // Wide card
    color: "rgba(236, 72, 153, 0.7)", // Pink
    tags: ["Meta Cloud API", "OpenAI", "Python"]
  },
  {
    title: "SEO & Global Growth",
    desc: "Technical perfection ensuring maximum organic search visibility, Core Web Vitals optimization, and fast indexing.",
    icon: <><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></>,
    span: "col-span-1",
    color: "rgba(245, 158, 11, 0.7)", // Amber
    tags: ["Next.js", "SSR", "Schema Markup"]
  },
  {
    title: "Zero-Latency Hosting",
    desc: "Deployments on edge networks ensuring your application loads instantly for users anywhere in the world.",
    icon: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    span: "col-span-1",
    color: "rgba(244, 63, 94, 0.7)", // Rose
    tags: ["Vercel Edge", "AWS", "Docker"]
  }
];

const statsData = [
  { value: "120+", label: "Systems Deployed" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "Sub-100", label: "Ms Latency" },
  { value: "Zero", label: "Security Breaches" },
];

// --- 1. MAGNETIC ICON (Pro Physics) ---
const MagneticIcon = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 }); 
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-20 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-white dark:bg-[#12121a] shadow-lg backdrop-blur-md border border-black/5 dark:border-white/10"
    >
      {children}
    </motion.div>
  );
};

// --- 2. DEEP LIQUID BENTO CARD ---
const LiquidCard = ({ feature }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const isBigCard = feature.span.includes("row-span-2");

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      className={`
        ${feature.span}
        group relative flex flex-col overflow-hidden rounded-[2rem] md:rounded-[2.5rem]
        bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10
        transition-colors duration-500 cursor-pointer 
        min-h-[280px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      `}
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Dynamic Background Spotlight */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: `radial-gradient(circle, ${feature.color}, transparent 70%)`,
          filter: "blur(50px)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
        
        {/* Top: Icon & Action */}
        <div className="flex justify-between items-start mb-8">
          <MagneticIcon>
            <motion.svg 
              variants={{
                initial: { scale: 1, rotate: 0 },
                hover: { scale: 1.1, rotate: -8, transition: { type: "spring", stiffness: 200 } }
              }}
              width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
              className="text-gray-900 dark:text-white"
            >
              {feature.icon}
            </motion.svg>
          </MagneticIcon>
          
          <motion.div 
            variants={{
              initial: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white"
          >
             <span>Explore</span>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M5 12h14M12 5l7 7-7 7" />
             </svg>
          </motion.div>
        </div>

        {/* Bottom: Content & Tags */}
        <div className="overflow-hidden flex flex-col gap-4">
          <div>
              <motion.h3 
                variants={{
                  initial: { color: "inherit" },
                  hover: { color: feature.color, transition: { duration: 0.3 } }
                }}
                className={`mb-3 font-extrabold tracking-tight text-gray-900 dark:text-white ${isBigCard ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
              >
                {feature.title}
              </motion.h3>
              
              <p className="text-sm md:text-base font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
          </div>

          {/* Micro Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
              {feature.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 text-[10px] md:text-xs font-mono tracking-wide font-semibold rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-300">
                      {tag}
                  </span>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- MAIN SECTION EXPORT ---
export default function WhyChooseMeProMax() {
  return (
    <section className="relative py-32 md:py-48 bg-[#f4f6fa] dark:bg-[#020202] overflow-hidden transition-colors duration-700">
      
      {/* Massive Cinematic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60rem] h-[60rem] bg-purple-500/10 dark:bg-purple-600/15 blur-[250px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-cyan-400/10 dark:bg-cyan-500/15 blur-[200px] rounded-full" 
        />
        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24 md:mb-32">
            <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl shadow-sm"
                >
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                  </div>
                  <span className="text-xs font-mono tracking-widest text-gray-900 dark:text-white uppercase font-bold">The Elite Standard</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, type: "spring", damping: 25 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.05]"
                >
                  Engineering <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500">Digital Dominance.</span>
                </motion.h2>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-md text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed border-l-2 border-purple-500/30 pl-6"
            >
                From scalable cloud architecture and SaaS billing systems to high-converting cinematic web experiences. We build the infrastructure that powers modern enterprises.
            </motion.div>
        </div>

        {/* Liquid Bento Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[300px] mb-24"
        >
          {eliteFeatures.map((feature, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              className={feature.span}
            >
              <LiquidCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Live Stats Row (Scale & Authority) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-[2.5rem] bg-gradient-to-r from-purple-900 to-cyan-900 p-[1px]"
        >
            <div className="w-full rounded-[2.5rem] bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-2xl px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10">
                {statsData.map((stat, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-0 w-full text-center group">
                        <h4 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2 group-hover:scale-110 transition-transform duration-500">
                            {stat.value}
                        </h4>
                        <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-purple-600 dark:text-cyan-400 font-bold">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
}