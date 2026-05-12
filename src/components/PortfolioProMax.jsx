import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// --- EXPANDED PORTFOLIO DATA ---
const projects = [
  {
    id: 1,
    category: "CRM",
    industry: "Enterprise SaaS",
    title: "Nexus Lead Gen CRM",
    desc: "A bespoke customer relationship management system. Features real-time pipeline tracking, role-based access control, and automated email sequences.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    color: "rgba(147, 51, 234, 0.5)", // Purple
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", 
  },
  {
    id: 2,
    category: "Healthcare",
    industry: "Medical Clinic",
    title: "OrthoGastro Care Portal",
    desc: "Comprehensive clinic management system featuring patient booking, telemedicine video consultations, and digital prescription generation.",
    tech: ["Next.js", "WebRTC", "Firebase", "Stripe"],
    color: "rgba(16, 185, 129, 0.5)", // Emerald
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Real Estate",
    industry: "Property Tech",
    title: "Aura Residences",
    desc: "High-end cinematic property showcase platform with 3D virtual tours, dynamic pricing calculators, and lead capture funnels.",
    tech: ["Three.js", "Framer Motion", "React", "GSAP"],
    color: "rgba(245, 158, 11, 0.5)", // Amber
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Coaching",
    industry: "EdTech",
    title: "EduMaster LMS",
    desc: "A fully custom Learning Management System for coaching institutes. Video DRM protection, live quizzes, and student analytics dashboard.",
    tech: ["MERN Stack", "AWS S3", "Socket.io"],
    color: "rgba(59, 130, 246, 0.5)", // Blue
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Shopify",
    industry: "Premium Retail",
    title: "Urban Kicks Store",
    desc: "Headless Shopify architecture for a premium sneaker brand. Featuring sub-second page loads, custom cart drawer, and 3D product viewer.",
    tech: ["Shopify Plus", "Hydrogen", "Tailwind"],
    color: "rgba(236, 72, 153, 0.5)", // Pink
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "E-commerce",
    industry: "Marketplace",
    title: "Luxe Fashion Hub",
    desc: "A scalable multi-vendor e-commerce platform with automated commission splits, vendor dashboards, and dynamic inventory sync.",
    tech: ["Next.js", "Prisma", "Razorpay"],
    color: "rgba(6, 182, 212, 0.5)", // Cyan
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "Builders",
    industry: "Construction",
    title: "Apex Constructions",
    desc: "Corporate identity and portfolio website for a massive builder firm, highlighting ongoing projects with ultra-smooth scroll animations.",
    tech: ["React", "Lenis", "Tailwind"],
    color: "rgba(244, 63, 94, 0.5)", // Rose
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Spiritual",
    industry: "Lifestyle App",
    title: "Divine Soul Space",
    desc: "A holistic mobile-first web app featuring daily horoscopes, meditation audio streaming, and live consultation bookings.",
    tech: ["Flutter", "Firebase", "Agora"],
    color: "rgba(168, 85, 247, 0.5)", // Purple
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 9,
    category: "Analytics",
    industry: "B2B Analytics",
    title: "FuelStat Analytics",
    desc: "A heavy-data visualization dashboard for petrol pump owners to track daily fuel sales, evaporation loss, and automated compliance.",
    tech: ["React", "Django", "D3.js"],
    color: "rgba(234, 179, 8, 0.5)", // Yellow
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop",
  }
];

// --- RESPONSIVE SLIDE ANIMATIONS ---
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function PortfolioProMax() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-wrap the index so it loops endlessly
  const imageIndex = ((page % projects.length) + projects.length) % projects.length;
  const activeProject = projects[imageIndex];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setPage(page + newDirection);
  };

  const jumpToProject = (index) => {
    setDirection(index > imageIndex ? 1 : -1);
    setPage(page + (index - imageIndex));
  };

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#f4f6fa] dark:bg-[#020202] overflow-hidden transition-colors duration-700">
      
      {/* --- RESPONSIVE AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center transition-all duration-1000">
        <motion.div 
          animate={{ backgroundColor: activeProject.color }}
          transition={{ duration: 1 }}
          className="absolute w-[150%] h-[150%] md:w-[60rem] md:h-[60rem] blur-[150px] md:blur-[250px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20" 
        />
        <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,white_40%,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* --- HEADER CONTROLS --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-gray-900 dark:text-white uppercase font-bold">Showcase</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-tight">
                Selected <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Deployments.</span>
              </h2>
            </div>
            
            {/* Nav Controls & Counter */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
               {/* Mobile/Desktop Counter */}
               <div className="font-mono text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                  <span className="text-gray-900 dark:text-white font-bold">{String(imageIndex + 1).padStart(2, '0')}</span> 
                  <span className="mx-1">/</span> 
                  {String(projects.length).padStart(2, '0')}
               </div>

               {/* Buttons */}
               <div className="flex gap-2 md:gap-4">
                 <button onClick={() => paginate(-1)} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors backdrop-blur-md active:scale-95">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                 </button>
                 <button onClick={() => paginate(1)} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg active:scale-95">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </button>
               </div>
            </div>
        </div>

        {/* --- SCROLLABLE PILL BAR --- */}
        <div className="w-full overflow-x-auto pb-4 mb-6 md:mb-10 hide-scrollbar mask-edge-fade snap-x snap-mandatory touch-pan-x">
          <div className="flex gap-2 md:gap-3 w-max px-1">
            {projects.map((project, idx) => {
              const isActive = idx === imageIndex;
              return (
                <button
                  key={idx}
                  onClick={() => jumpToProject(idx)}
                  className={`
                    snap-center relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap
                    ${isActive ? "text-white dark:text-black" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{project.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- RESPONSIVE CAROUSEL STAGE --- */}
        {/* We use a fixed-ish container height for Desktop, and dynamic fluid height for Mobile */}
        <div className="relative w-full h-[650px] sm:h-[700px] md:h-[600px] lg:h-[650px] rounded-[2rem] md:rounded-[3rem] bg-white/50 dark:bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-2xl overflow-hidden">
          
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 250, damping: 35 }, opacity: { duration: 0.3 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
              // Grid structure changes entirely between mobile (stacked) and desktop (side-by-side)
              className="absolute inset-0 w-full h-full flex flex-col md:grid md:grid-cols-12 cursor-grab active:cursor-grabbing"
            >
              
              {/* === MOBILE: IMAGE TOP / DESKTOP: IMAGE RIGHT === */}
              {/* Image Section */}
              <div className="w-full h-[40%] sm:h-[45%] md:h-full md:col-span-7 relative order-1 md:order-2 rounded-t-[2rem] md:rounded-l-none md:rounded-r-[3rem] overflow-hidden group">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse z-0" />
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-[#0a0a0f]/80 md:hidden z-20 pointer-events-none" />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/50 dark:from-[#0a0a0f]/80 via-transparent to-transparent z-20 pointer-events-none" />
              </div>

              {/* Content Section */}
              <div className="w-full h-[60%] sm:h-[55%] md:h-full md:col-span-5 flex flex-col justify-start md:justify-center px-6 py-6 md:p-12 order-2 md:order-1 z-30">
                
                {/* Industry Tag */}
                <div className="mb-4 md:mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5 w-fit">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {activeProject.industry}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] mb-3 md:mb-5">
                  {activeProject.title}
                </h3>
                
                {/* Description (Truncated on tiny mobile if needed, but flex handles it well) */}
                <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 font-medium mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                  {activeProject.desc}
                </p>
                
                {/* Tech Stack */}
                <div className="mb-8 md:mb-10">
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold bg-white/80 dark:bg-[#1a1a24]/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-3 mt-auto md:mt-0">
                   <button className="flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs md:text-sm font-bold tracking-wide shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live Demo
                   </button>
                   <button className="flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white text-xs md:text-sm font-bold tracking-wide hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                     Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                   </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      
      {/* Global CSS enhancements for Responsiveness */}
      <style jsx global>{`
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