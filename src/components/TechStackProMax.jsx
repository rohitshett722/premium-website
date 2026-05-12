import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- MASSIVE TECH ECOSYSTEM DATA ---
const techEcosystem = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: <path d="M4 7V4h16v3M4 11h16M4 15h16M4 19h16" />,
    color: "rgba(59, 130, 246, 0.8)", // Blue
    subcategories: [
      {
        name: "Core Frontend",
        desc: "High-performance, reactive user interfaces.",
        techs: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"]
      },
      {
        name: "Mobile Development",
        desc: "Cross-platform mobile dominance.",
        techs: ["Flutter", "React Native", "Firebase Mobile"]
      },
      {
        name: "UI/UX & Design",
        desc: "Cinematic, pixel-perfect visual engineering.",
        techs: ["Figma", "Glassmorphism", "Liquid UI", "Dark Themes"]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />,
    color: "rgba(16, 185, 129, 0.8)", // Emerald
    subcategories: [
      {
        name: "Server Architecture",
        desc: "Scalable runtime environments & REST APIs.",
        techs: ["Node.js", "Express.js", "JWT Auth", "Socket.IO", "REST"]
      },
      {
        name: "Database Systems",
        desc: "High-speed data storage and retrieval.",
        techs: ["MongoDB", "Firebase", "PostgreSQL", "Supabase", "MySQL"]
      },
      {
        name: "Cloud & Hosting",
        desc: "Edge networks and global CDN deployments.",
        techs: ["Vercel Edge", "AWS", "Firebase Hosting", "VPS", "Cloudflare"]
      }
    ]
  },
  {
    id: "ai",
    title: "AI & Automation",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
    color: "rgba(236, 72, 153, 0.8)", // Pink
    subcategories: [
      {
        name: "Intelligent Systems",
        desc: "Replacing manual labor with AI.",
        techs: ["AI Chatbots", "Voice Agents", "CRM Automation", "GMB Automation"]
      },
      {
        name: "API Integrations",
        desc: "Connecting the world's most powerful APIs.",
        techs: ["OpenAI API", "Gemini", "WhatsApp API", "Razorpay", "OTP Systems"]
      }
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    color: "rgba(245, 158, 11, 0.8)", // Amber
    subcategories: [
      {
        name: "Performance Marketing",
        desc: "Data-driven ROAS scaling & lead gen.",
        techs: ["Google Ads", "Meta Ads", "YouTube Ads", "Lead Gen"]
      },
      {
        name: "SEO Dominance",
        desc: "Organic growth engineering and web vitals.",
        techs: ["Technical SEO", "Local SEO", "On-Page SEO", "Speed Opt"]
      },
      {
        name: "Analytics & Tracking",
        desc: "Precision tracking for every interaction.",
        techs: ["Google Analytics", "Search Console", "Meta Pixel", "GTM"]
      }
    ]
  },
  {
    id: "solutions",
    title: "Business Solutions",
    icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
    color: "rgba(147, 51, 234, 0.8)", // Purple
    subcategories: [
      {
        name: "Custom Enterprise SaaS",
        desc: "End-to-end bespoke management systems.",
        techs: ["CRM Development", "ERP Systems", "Billing Software", "Inventory", "Real Estate CRM"]
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Security",
    icon: <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />,
    color: "rgba(244, 63, 94, 0.8)", // Rose
    subcategories: [
      {
        name: "Infrastructure Security",
        desc: "Fortress-grade protection for digital assets.",
        techs: ["SSL Security", "Firebase Auth", "Server Protection", "RBAC"]
      },
      {
        name: "CI/CD & Deployment",
        desc: "Automated pipelines and version control.",
        techs: ["GitHub", "CI/CD", "Git", "Docker", "Automation"]
      }
    ]
  }
];

const marqueeItems = [
  "React.js", "Flutter", "Next.js", "OpenAI", "Node.js", "Tailwind CSS", "Firebase", "Meta Ads", "Google Ads", "Vercel", "MongoDB"
];

// --- RESPONSIVE 3D TILT BENTO CARD ---
const TechCard = ({ sub, mainColor, isMobile }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-7deg", "7deg"]);

  function handleMouseMove(e) {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white/50 dark:bg-[#0a0a0f]/60 border border-black/5 dark:border-white/10 transition-colors duration-300 cursor-default transform-gpu shadow-xl dark:shadow-none backdrop-blur-2xl h-full"
    >
      {/* Dynamic Hover Background Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${mainColor.replace("0.8", "0.15")}, transparent 80%)`
        }}
      />

      <div style={{ transform: isMobile ? "none" : "translateZ(40px)" }} className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2 sm:mb-3">
          {sub.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed flex-grow">
          {sub.desc}
        </p>

        {/* Floating Neon Tags (BUG FIXED: Removed group-hover:text-white) */}
        <div style={{ transform: isMobile ? "none" : "translateZ(25px)" }} className="flex flex-wrap gap-2">
          {sub.techs.map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold font-mono rounded-lg border border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#12121A]/80 text-gray-800 dark:text-gray-200 shadow-sm transition-all duration-300 hover:border-transparent"
              style={{ '--hover-bg': mainColor.replace("0.8", "1") }}
              onMouseEnter={(e) => {
                  if(!isMobile) {
                      e.currentTarget.style.backgroundColor = e.currentTarget.style.getPropertyValue('--hover-bg');
                      e.currentTarget.style.color = "#ffffff"; // Make text white ONLY on actual tag hover
                      e.currentTarget.style.boxShadow = `0 0 12px ${e.currentTarget.style.getPropertyValue('--hover-bg')}`;
                  }
              }}
              onMouseLeave={(e) => {
                  if(!isMobile) {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = ""; // Reset text color back to original
                      e.currentTarget.style.boxShadow = "";
                  }
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


export default function TechStackProMax() {
  const [activeTab, setActiveTab] = useState(techEcosystem[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeData = techEcosystem.find(t => t.id === activeTab);

  return (
    <section className="relative w-full py-20 sm:py-24 md:py-32 bg-[#f4f6fa] dark:bg-[#020202] overflow-hidden transition-colors duration-700 perspective-[2000px]">
      
      {/* --- Optimized Background Ambience --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          key={activeData.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] md:w-[50rem] h-[30rem] md:h-[50rem] blur-[150px] md:blur-[200px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-[0.15]"
          style={{ backgroundColor: activeData.color }}
        />
        <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* --- RESPONSIVE INFINITE MARQUEE --- */}
      <div className="relative z-10 w-full mb-12 sm:mb-16 md:mb-24 overflow-hidden border-y border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/[0.02] py-3 sm:py-4 backdrop-blur-sm">
        <div className="flex w-[300%] sm:w-[200%] gap-6 sm:gap-8 animate-marquee items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-500 dark:to-gray-700 opacity-70">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* --- Header (Fluid Typography) --- */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 sm:mb-6 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-900 dark:text-gray-300 uppercase font-bold">Tech Infrastructure</span>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight mb-4 sm:mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Ecosystem.</span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium px-2">
              A comprehensive suite of enterprise-grade technologies, intelligent AI models, and performance marketing engines.
            </p>
        </div>

        {/* --- MOBILE-OPTIMIZED LIQUID TABS --- */}
        <div className="w-full overflow-x-auto pb-4 mb-8 sm:mb-12 md:mb-16 hide-scrollbar mask-edge-fade snap-x snap-mandatory touch-pan-x">
          <div className="flex justify-start md:justify-center gap-2 sm:gap-3 w-max px-2 md:px-0 mx-auto">
            {techEcosystem.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`
                    snap-center relative px-4 py-2 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-colors flex items-center gap-2 whitespace-nowrap
                    ${isActive ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabTech"
                      className="absolute inset-0 rounded-xl z-0 shadow-lg"
                      style={{ backgroundColor: cat.color.replace("0.8", "1") }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <svg width="14" height="14" className="sm:w-4 sm:h-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {cat.icon}
                  </svg>
                  <span className="relative z-10">{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- RESPONSIVE ACTIVE STACK BENTO GRID --- */}
        <div className="min-h-[300px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto"
            >
              {activeData.subcategories.map((sub, i) => (
                <TechCard key={i} sub={sub} mainColor={activeData.color} isMobile={isMobile} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Responsive Utilities & Marquee Animation */}
      <style jsx global>{`
        section { perspective: 2000px; }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-edge-fade {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </section>
  );
}