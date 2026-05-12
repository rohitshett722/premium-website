import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// --- MASSIVE EXPANDED PROCESS DATA ---
const processSteps = [
  {
    id: "01",
    phase: "Week 1",
    title: "Discovery & Architecture",
    desc: "We don't just jump into code. We start by deep-diving into your business logic, understanding your users, and drafting a bulletproof system architecture that scales.",
    deliverables: ["Project Scope Blueprint", "Tech Stack Selection", "Database Schema Draft", "ROI Strategy"],
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    color: "from-blue-600 to-cyan-400",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  {
    id: "02",
    phase: "Week 2-3",
    title: "Cinematic UI/UX Design",
    desc: "Crafting the visual identity. We design liquid glassmorphism interfaces and interactive prototypes that make your competitors look outdated.",
    deliverables: ["High-Fidelity Figma", "Interactive Prototypes", "Design System", "Motion Guidelines"],
    icon: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
    color: "from-cyan-400 to-emerald-400",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  {
    id: "03",
    phase: "Week 4-6",
    title: "Core Engineering Sprints",
    desc: "The heavy lifting begins. Writing modular, highly optimized code for both frontend interfaces and secure backend APIs.",
    deliverables: ["React/Next.js Frontend", "Node.js/Python Backend", "Auth Implementation", "API Endpoints"],
    icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    color: "from-emerald-400 to-yellow-400",
    glow: "rgba(234, 179, 8, 0.4)"
  },
  {
    id: "04",
    phase: "Week 7",
    title: "AI & 3rd-Party Integration",
    desc: "Injecting steroids into your system. We integrate intelligent AI models, automated payment gateways, and WhatsApp cloud APIs.",
    deliverables: ["OpenAI Sync", "Stripe/Razorpay", "WhatsApp Automations", "Cloud Storage"],
    icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  {
    id: "05",
    phase: "Week 8",
    title: "Rigorous QA & Security",
    desc: "We try to break the system before hackers do. Automated stress testing, vulnerability audits, and Core Web Vitals optimization.",
    deliverables: ["OWASP Security Audit", "Load Testing", "99+ Lighthouse Score", "Bug Squashing"],
    icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    color: "from-orange-500 to-pink-500",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    id: "06",
    phase: "Week 9",
    title: "Deployment & Scale",
    desc: "Pushing the codebase to global edge networks. We configure CI/CD pipelines ensuring zero-downtime deployments.",
    deliverables: ["Vercel/AWS Setup", "CI/CD Pipeline", "Domain Config", "Go-Live Protocol"],
    icon: <><path d="M13.5 22V10l3 3M10.5 2V14l-3-3" /><path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2" /></>,
    color: "from-pink-500 to-purple-600",
    glow: "rgba(168, 85, 247, 0.4)"
  }
];

// --- 3D INTERACTIVE TIMELINE CARD ---
const TimelineCard = ({ step, index, isMobile }) => {
  const isEven = index % 2 === 0;
  
  // Track if card is in center of viewport to trigger active states
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-6deg", "6deg"]);

  function handleMouseMove(e) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} className={`relative flex items-center justify-between md:justify-normal w-full mb-16 md:mb-32 ${isEven ? "md:flex-row-reverse" : ""}`}>
      
      {/* --- SCROLL-LINKED GLOWING DOT --- */}
      <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          animate={{ 
            scale: isInView ? 1.3 : 1, 
            borderColor: isInView ? step.glow.replace("0.4", "1") : "rgba(255,255,255,0.1)",
            boxShadow: isInView ? `0 0 25px ${step.glow}` : "0 0 0px transparent"
          }}
          transition={{ duration: 0.4 }}
          className="w-6 h-6 md:w-10 md:h-10 rounded-full border-4 md:border-[6px] bg-[#f4f6fa] dark:bg-[#020202] flex items-center justify-center transition-colors"
        >
          <motion.div 
            animate={{ backgroundColor: isInView ? step.glow.replace("0.4", "1") : "gray" }}
            className="w-2 h-2 md:w-3 md:h-3 rounded-full"
          />
        </motion.div>
      </div>

      <div className="hidden md:block w-1/2" />

      {/* --- MASSIVE 3D CARD --- */}
      <motion.div 
        initial={{ opacity: 0, x: isMobile ? 20 : (isEven ? 40 : -40), y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 20 }}
        className={`w-[85%] sm:w-[90%] md:w-[45%] ${isEven ? "md:mr-auto md:pr-12 lg:pr-20" : "md:ml-auto md:pl-12 lg:pl-20"} ml-auto md:ml-0`}
      >
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`
            group relative flex flex-col p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] 
            bg-white/60 dark:bg-white/[0.02] border transition-all duration-500 transform-gpu
            backdrop-blur-3xl min-h-[350px] shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]
            ${isInView ? 'border-white/80 dark:border-white/20' : 'border-white/30 dark:border-white/5'}
          `}
        >
          {/* Dynamic Inner Glow when Active or Hovered */}
          <motion.div 
            animate={{ opacity: isInView ? 1 : 0 }}
            className="absolute inset-0 z-0 pointer-events-none rounded-[3rem] mix-blend-screen"
            style={{ background: `radial-gradient(circle at ${isEven ? '0%' : '100%'} 50%, ${step.glow}, transparent 70%)` }}
          />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay rounded-[3rem]" />

          <div style={{ transform: isMobile ? "none" : "translateZ(50px)" }} className="relative z-10 h-full flex flex-col">
            
            {/* Top Header Row */}
            <div className="flex justify-between items-start mb-8">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl bg-gradient-to-br ${step.color} group-hover:scale-110 transition-transform duration-500`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {step.icon}
                </svg>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className="text-5xl md:text-7xl font-black text-gray-200 dark:text-white/5 font-mono leading-none tracking-tighter">
                  {step.id}
                </span>
                <span className="px-3 py-1 rounded-md bg-white dark:bg-white/10 border border-black/5 dark:border-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-gray-300 shadow-sm">
                  {step.phase}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
              {step.title}
            </h3>
            <p className="text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400 mb-10 flex-grow">
              {step.desc}
            </p>

            {/* Deliverables Grid (The "Pro Max" Data) */}
            <div style={{ transform: isMobile ? "none" : "translateZ(30px)" }}>
              <p className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
                Key Deliverables
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {step.deliverables.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold rounded-lg bg-white/80 dark:bg-[#12121a]/80 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- MAIN WRAPPER SECTION ---
export default function ProcessTimelineProMax() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-32 md:py-48 bg-[#f4f6fa] dark:bg-[#020202] overflow-hidden transition-colors duration-700 perspective-[2000px]">
      
      {/* Massive Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[-10%] w-[50rem] h-[50rem] bg-blue-500/10 dark:bg-blue-600/15 blur-[250px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-10%] w-[50rem] h-[50rem] bg-pink-500/10 dark:bg-purple-600/15 blur-[250px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-24 md:mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </div>
              <span className="text-xs font-mono tracking-widest text-gray-900 dark:text-gray-300 uppercase font-bold">Execution Workflow</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", damping: 25 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.05] mb-8"
            >
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">Deliver.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
            >
              A transparent, battle-tested engineering pipeline designed to take your raw concept and transform it into a scalable enterprise application.
            </motion.p>
        </div>

        {/* --- THE TIMELINE WRAPPER --- */}
        <div ref={containerRef} className="relative w-full pb-20">
          
          {/* Static Background Line */}
          <div className="absolute left-0 md:left-1/2 top-4 bottom-0 w-1 md:-translate-x-1/2 bg-gray-200 dark:bg-white/5 rounded-full" />

          {/* Animated Scroll Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-0 md:left-1/2 top-4 w-1 md:-translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10"
          />

          {/* Render all steps */}
          <div className="relative z-20 flex flex-col">
            {processSteps.map((step, i) => (
              <TimelineCard 
                key={i} 
                step={step} 
                index={i} 
                isMobile={isMobile}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}