import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- EXPANDED LUXURY AI DATA WITH 8 SERVICES ---
const aiServices = [
  {
    title: "Autonomous Voice Agents",
    desc: "Human-like AI receptionists that handle inbound calls, book appointments, and answer complex queries 24/7 without a script.",
    metric: "+400% Lead Capture",
    icon: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></>,
    span: "col-span-1 md:col-span-2 lg:col-span-2", // Wide Card
    color: "#ec4899", // Neon Pink
    glowColor: "rgba(236, 72, 153, 0.4)",
    tags: ["OpenAI Whisper", "Twilio", "NLP"]
  },
  {
    title: "WhatsApp Cloud CRM",
    desc: "Turn WhatsApp into a sales engine with auto-replies, catalog checkouts, and AI-driven cart recovery.",
    metric: "98% Open Rate",
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    span: "col-span-1 md:col-span-1 lg:col-span-1", // Square Card
    color: "#22c55e", // Neon Green
    glowColor: "rgba(34, 197, 94, 0.4)",
    tags: ["Meta API", "Webhooks"]
  },
  {
    title: "GMB Dominance AI",
    desc: "Automated local SEO engine. Auto-replies to reviews, auto-posts updates, and pushes your Google ranking.",
    metric: "3x Footfall",
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    span: "col-span-1 md:col-span-1 lg:col-span-1", // Square Card
    color: "#f59e0b", // Neon Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    tags: ["Google APIs", "Auto-Sync"]
  },
  {
    title: "AI Support Desk",
    desc: "Instantly resolve 80% of customer tickets. Intelligent bots that read your docs and answer like a human agent.",
    metric: "0s Wait Time",
    icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9 10h.01M15 10h.01M12 10h.01" /></>,
    span: "col-span-1 md:col-span-1 lg:col-span-1", // Square Card
    color: "#8b5cf6", // Purple
    glowColor: "rgba(139, 92, 246, 0.4)",
    tags: ["Zendesk Sync", "Vector DB"]
  },
  {
    title: "Hyper-Personal Outreach",
    desc: "Cold email AI that researches prospects and writes highly personalized pitches, scaling your B2B sales pipeline.",
    metric: "5x Reply Rate",
    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    span: "col-span-1 md:col-span-1 lg:col-span-1", // Square Card
    color: "#ef4444", // Red
    glowColor: "rgba(239, 68, 68, 0.4)",
    tags: ["GPT-4", "SMTP APIs"]
  },
  {
    title: "Predictive Lead Scoring",
    desc: "Machine learning algorithms that analyze user behavior on your site and instantly route high-ticket leads to your best closers.",
    metric: "+65% Closing Rate",
    icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    span: "col-span-1 md:col-span-2 lg:col-span-2", // Wide Card
    color: "#3b82f6", // Neon Blue
    glowColor: "rgba(59, 130, 246, 0.4)",
    tags: ["Data Science", "Python"]
  },
  {
    title: "Generative SEO Content",
    desc: "An automated engine that researches trending keywords and generates SEO-optimized, human-sounding blogs daily.",
    metric: "+10k Traffic",
    icon: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8M16 17H8M10 9H8" /></>,
    span: "col-span-1 md:col-span-2 lg:col-span-2", // Wide Card
    color: "#14b8a6", // Teal
    glowColor: "rgba(20, 184, 166, 0.4)",
    tags: ["Claude 3", "CMS Sync"]
  },
  {
    title: "Business Intelligence AI",
    desc: "Stop staring at spreadsheets. Our AI digests millions of data points to generate plain-English summaries and forecasts.",
    metric: "100% Clarity",
    icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M3 9h18M9 21V9" /></>,
    span: "col-span-1 md:col-span-2 lg:col-span-2", // Wide Card
    color: "#a855f7", // Light Purple
    glowColor: "rgba(168, 85, 247, 0.4)",
    tags: ["Pandas", "D3.js", "LLMs"]
  }
];

// --- LUXURY BENTO CARD (FIXED FOR FLUID HEIGHT) ---
const LuxuryAiProCard = ({ service, isMobile }) => {
  const cardRef = useRef(null);
  
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  const mouseXSpring = useSpring(xPct, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(yPct, { stiffness: 200, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-6deg", "6deg"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    xPct.set(x / rect.width - 0.5);
    yPct.set(y / rect.height - 0.5);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    xPct.set(0);
    yPct.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`
        ${service.span}
        group relative flex flex-col overflow-hidden rounded-[2.5rem]
        transition-colors duration-500 cursor-pointer transform-gpu
        h-full
        shadow-[0_12px_45px_rgb(0,0,0,0.06)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.3)]
        bg-white/[0.6] dark:bg-[#0a0a0f]/[0.8] backdrop-blur-2xl luxury-noise
        border border-black/5 dark:border-white/10 hover:border-white/50 dark:hover:border-white/20
      `}
    >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-30 mix-blend-normal dark:mix-blend-screen z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                ${service.glowColor},
                transparent 70%
              )
            `,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 dark:via-white/10 to-transparent opacity-0 group-hover:animate-sweep pointer-events-none z-10 rounded-[2.5rem]" />

        {/* FIXED: Reduced padding to p-7 from p-10 to give text more breathing room */}
        <div style={{ transform: isMobile ? "none" : "translateZ(60px)" }} className="relative z-20 p-7 md:p-8 flex flex-col h-full justify-between">
          
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <div 
                className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              <motion.div 
                style={{ transform: isMobile ? "none" : "translateZ(30px)" }}
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-white dark:bg-[#12121A] shadow-xl border border-black/5 dark:border-white/5 group-hover:scale-105 transition-transform duration-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: service.color }}>
                  {service.icon}
                </svg>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 backdrop-blur-md">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: service.color }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">
                {service.metric}
              </span>
            </div>
          </div>

          <div style={{ transform: isMobile ? "none" : "translateZ(25px)" }} className="flex flex-col flex-grow">
            <h3 className="mb-2 text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                style={{ "--hover-color": service.color }}
            >
              {service.title}
            </h3>
            {/* FIXED: Removed max-width that might force wrapping, tightened leading */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 flex-grow">
              {service.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {service.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-[10px] md:text-xs font-mono font-bold rounded-md border border-black/5 dark:border-white/10 bg-white dark:bg-[#0a0a0f] text-gray-800 dark:text-gray-200 shadow-sm backdrop-blur-md hover:border-white/50 transition-colors"
                  style={{ "--hover-border": service.color }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = e.currentTarget.style.getPropertyValue('--hover-border'); }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
    </motion.div>
  );
};


// --- MAIN MAIN SECTION ---
export default function AIAutomationLuxuryProMax() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative py-32 md:py-48 bg-[#f8f9fc] dark:bg-[#000000] overflow-hidden transition-colors duration-700 perspective-[2500px]">
      
      {/* --- Ultra Luxury Deep Contrast Background --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] left-[10%] w-[30rem] md:w-[70rem] h-[30rem] md:h-[70rem] bg-pink-500/10 dark:bg-pink-600/15 blur-[150px] md:blur-[250px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] md:w-[60rem] md:h-[60rem] bg-blue-600/10 dark:bg-blue-600/15 blur-[120px] md:blur-[220px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
        />
        <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* PREMIUM HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-24">
            <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl shadow-lg shadow-black/5"
                >
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </div>
                  <span className="text-sm font-mono tracking-widest text-gray-900 dark:text-white uppercase font-bold">Neural Core Solutions</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, type: "spring", damping: 25 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.05]"
                >
                  Beyond Coding. <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Pure Autopilot.</span>
                </motion.h2>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-md text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed border-l-2 border-pink-500/30 pl-6"
            >
                Stop losing money to manual workflows. We integrate state-of-the-art AI models and intelligent automations that scale your business operations silently in the background.
            </motion.div>
        </div>

        {/* AI MODELS BADGE ROW */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-16 md:mb-24"
        >
           <span className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center mr-2">Powered By:</span>
           {["OpenAI GPT-4", "Google Gemini", "Meta Llama 3", "Anthropic Claude", "Twilio API"].map((model, idx) => (
             <span key={idx} className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:scale-105 transition-transform cursor-default">
               {model}
             </span>
           ))}
        </motion.div>

        {/* --- MASSIVE 8-CARD BENTO GRID (FIXED FOR FLUID HEIGHTS) --- */}
        {/* Changed auto-rows from fixed pixels to minmax to allow text to expand without cutting off */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[minmax(340px,auto)] md:auto-rows-[minmax(360px,auto)]"
        >
          {aiServices.map((service, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 40 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              className={service.span}
            >
              <LuxuryAiProCard service={service} isMobile={isMobile} />
            </motion.div>
          ))}
        </motion.div>

        {/* PREMIUM CALL TO ACTION BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 w-full rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[1px] group cursor-pointer"
        >
            <div className="w-full h-full rounded-[2.5rem] bg-white dark:bg-[#0a0a0f]/95 backdrop-blur-3xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row justify-between items-center gap-8 transition-colors group-hover:bg-white/90 dark:group-hover:bg-[#12121a]/95">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <h4 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Ready to integrate intelligence?</h4>
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium max-w-xl">Let’s build a custom AI workflow tailored to your specific bottlenecks and scale your revenue. </p>
                </div>
                <button className="whitespace-nowrap px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm md:text-base tracking-wide shadow-xl group-hover:scale-105 transition-transform flex items-center gap-2">
                  Initiate Audit <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        </motion.div>

      </div>
      
      <style jsx global>{`
        section { perspective: 2500px; }

        .luxury-noise {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
            background-size: cover;
        }
        .dark .luxury-noise {
             background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }

        @keyframes sweep {
            0% { transform: translateX(-100%) rotate(45deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(300px) rotate(45deg); opacity: 0; }
        }
        
        .group-hover\:animate-sweep {
            animation: sweep 1.5s ease-in-out infinite;
            width: 150%;
            height: 20px;
        }
      `}</style>
    </section>
  );
}