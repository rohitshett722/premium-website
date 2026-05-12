import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

// --- CLIENT-FOCUSED PROJECT DATA ---
const projects = [
  {
    id: "01",
    title: "Vyapar OS",
    category: "Billing & Inventory",
    description: "A complete POS & Billing software with GST calculations, inventory tracking, and thermal printing support.",
    tags: ["React Electron", "Node.js", "SQLite"],
    color: "#3b82f6", // Enterprise Blue
    bgLight: "bg-blue-50/50",
    bgDark: "bg-blue-900/10",
    borderLight: "border-blue-200",
    borderDark: "border-blue-500/30",
    visualType: "dashboard"
  },
  {
    id: "02",
    title: "Urban Fix App",
    category: "On-Demand Service",
    description: "Full-stack mobile app for booking home services. Includes live tracking, payment gateway, and admin panel.",
    tags: ["React Native", "Firebase", "Redux"],
    color: "#f59e0b", // Amber/Orange
    bgLight: "bg-amber-50/50",
    bgDark: "bg-amber-900/10",
    borderLight: "border-amber-200",
    borderDark: "border-amber-500/30",
    visualType: "mobile"
  },
  {
    id: "03",
    title: "Nexus CRM",
    category: "Business Dashboard",
    description: "SaaS platform for managing leads and analytics. Features real-time data visualization and role-based access.",
    tags: ["Next.js", "PostgreSQL", "Tailwind"],
    color: "#8b5cf6", // Purple
    bgLight: "bg-purple-50/50",
    bgDark: "bg-purple-900/10",
    borderLight: "border-purple-200",
    borderDark: "border-purple-500/30",
    visualType: "graph"
  },
  {
    id: "04",
    title: "Magnum Corp",
    category: "Corporate Identity",
    description: "High-performance brand website with advanced animations and SEO optimization for a digital agency.",
    tags: ["React", "Framer Motion", "GSAP"],
    color: "#10b981", // Emerald
    bgLight: "bg-emerald-50/50",
    bgDark: "bg-emerald-900/10",
    borderLight: "border-emerald-200",
    borderDark: "border-emerald-500/30",
    visualType: "web"
  },
];

// --- ABSTRACT SOFTWARE VISUALS ---
const SoftwareVisual = ({ type, color }) => {
    // 1. DASHBOARD VISUAL (Billing/CRM)
    if (type === "dashboard") {
        return (
            <div className="relative w-[80%] h-[60%] bg-white dark:bg-[#1a1a24] rounded-lg shadow-2xl border border-gray-200 dark:border-white/10 p-4 flex flex-col gap-3 overflow-hidden">
                {/* Header */}
                <div className="flex gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"/>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"/>
                    <div className="w-2 h-2 rounded-full bg-green-400"/>
                </div>
                {/* Grid Content */}
                <div className="flex gap-4 h-full">
                    <div className="w-1/4 h-full bg-gray-100 dark:bg-white/5 rounded animate-pulse"/>
                    <div className="w-3/4 flex flex-col gap-3">
                        <div className="w-full h-1/3 bg-opacity-20 rounded" style={{ backgroundColor: color }}/>
                        <div className="w-full h-2/3 bg-gray-50 dark:bg-white/5 rounded border border-dashed border-gray-300 dark:border-white/10 relative overflow-hidden">
                            {/* Animated Bar Chart */}
                            <div className="absolute bottom-0 left-2 w-4 h-[40%]" style={{ backgroundColor: color, opacity: 0.6 }}/>
                            <div className="absolute bottom-0 left-8 w-4 h-[70%]" style={{ backgroundColor: color, opacity: 0.8 }}/>
                            <div className="absolute bottom-0 left-14 w-4 h-[50%]" style={{ backgroundColor: color, opacity: 0.5 }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 2. MOBILE APP VISUAL
    if (type === "mobile") {
        return (
            <div className="relative w-[180px] h-[360px] bg-gray-900 rounded-[30px] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 w-full h-full bg-white dark:bg-[#0f0f13] flex flex-col">
                     {/* App Header */}
                     <div className="h-14 w-full" style={{ backgroundColor: color }}></div>
                     {/* App Items */}
                     <div className="p-4 flex flex-col gap-3">
                        <div className="w-full h-20 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse"/>
                        <div className="w-full h-20 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse delay-75"/>
                        <div className="w-full h-20 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse delay-100"/>
                     </div>
                     {/* Floating Action Button */}
                     <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white text-xl" style={{ backgroundColor: color }}>
                        +
                     </div>
                </div>
            </div>
        );
    }
    // Default / Abstract
    return (
        <div className="relative w-[300px] h-[300px]">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-full h-full rounded-full border border-dashed border-gray-400 dark:border-white/20"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-32 h-32 rounded-full blur-[60px] opacity-60" style={{ backgroundColor: color }} />
             </div>
             <div className="absolute inset-[15%] border border-gray-200 dark:border-white/10 rounded-full" />
        </div>
    );
};

// --- COMPONENT DEFINITION ---
const ProjectCard = ({ i, project, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 40}px)` }}
        className={`
          relative flex flex-col md:flex-row 
          w-full max-w-6xl h-[65vh] md:h-[70vh] rounded-[32px] overflow-hidden 
          origin-top shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none
          transition-colors duration-500
          bg-white/90 dark:bg-[#0c0c12]/90 backdrop-blur-3xl
          border border-gray-200 dark:border-white/10
          ${project.borderLight} dark:${project.borderDark}
        `}
      >
        {/* === LEFT: INFO === */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between relative z-10">
          
          <div>
             <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                  {project.category}
                </span>
             </div>

             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
               {project.title}
             </h2>

             <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
               {project.description}
             </p>
          </div>

          <div className="flex flex-col gap-6 mt-8">
             {/* Tech Stack Pills */}
             <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                   <span key={idx} className="px-3 py-1 text-xs font-mono font-medium rounded-md border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">
                      {tag}
                   </span>
                ))}
             </div>
             
             {/* Action Button */}
             <button 
                className="group w-fit flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold transition-all text-white shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: project.color }}
             >
                View Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
             </button>
          </div>
        </div>

        {/* === RIGHT: VISUALS === */}
        <div className={`
          relative w-full md:w-[55%] h-full overflow-hidden flex items-center justify-center
          transition-colors duration-500
          ${project.bgLight} dark:${project.bgDark}
        `}>
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* The Software Mockup */}
            <SoftwareVisual type={project.visualType} color={project.color} />
        </div>

      </motion.div>
    </div>
  );
};

export default function SelectedWork() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative w-full pt-24 pb-32 transition-colors duration-500 bg-[#f9f7ff] dark:bg-[#050505]">
      
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-24 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
             <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Deployments</span>
             </h2>
             <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                From enterprise-grade billing systems to high-performance mobile applications.
             </p>
          </motion.div>
      </div>

      {/* STACKING CARDS */}
      <div className="flex flex-col">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            // FIX: Using ProjectCard instead of Card
            <ProjectCard
              key={i}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

    </section>
  );
}