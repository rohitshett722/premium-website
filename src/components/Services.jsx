import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

// --- Data Arrays (Kept identical for structure) ---
const servicesData = [
    {
      category: "Engineering",
      title: "Website Development",
      desc: "Custom, high-performance web apps built with modern frameworks.",
      icon: <path d="M4 7V4h16v3M4 11h16M4 15h16M4 19h16" />
    },
    {
      category: "Commerce",
      title: "E-Commerce",
      desc: "Scalable online stores engineered for high conversion rates.",
      icon: <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    },
    {
      category: "Commerce",
      title: "Shopify Development",
      desc: "Custom themes and robust app integrations for your brand.",
      icon: <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    },
    {
      category: "Engineering",
      title: "CRM Software",
      desc: "Bespoke customer relationship management & SaaS systems.",
      icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    },
    {
      category: "Engineering",
      title: "Mobile Apps",
      desc: "Native-feeling cross-platform apps for iOS and Android.",
      icon: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></>
    },
    {
      category: "Innovation",
      title: "AI Automation",
      desc: "Intelligent workflows powered by cutting-edge AI models.",
      icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    },
    {
      category: "Growth",
      title: "SEO",
      desc: "Technical and on-page optimization for organic global growth.",
      icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    },
    {
      category: "Marketing",
      title: "Google Ads",
      desc: "Data-driven search engine marketing and PPC campaigns.",
      icon: <path d="M12 20V10M18 20V4M6 20v-4" />
    },
    {
      category: "Marketing",
      title: "Meta Ads",
      desc: "Targeted social advertising across Facebook and Instagram.",
      icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    },
    {
      category: "Growth",
      title: "Social Media Marketing",
      desc: "Strategic brand building and active community engagement.",
      icon: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    },
    {
      category: "Growth",
      title: "GMB Ranking",
      desc: "Local SEO dominance through Google My Business optimization.",
      icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>
    },
    {
      category: "Integration",
      title: "WhatsApp API",
      desc: "Automated messaging and bulk marketing cloud integrations.",
      icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    },
    {
      category: "Security",
      title: "OTP Integration",
      desc: "Secure authentication and identity verification systems.",
      icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
    },
    {
      category: "Infrastructure",
      title: "Hosting & Maintenance",
      desc: "99.9% uptime, regular backups, and elite technical support.",
      icon: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><path d="M6 6h.01M6 18h.01" /></>
    }
  ];

// --- 3D Tilt Card Component (New Logic) ---
const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);

  // Mouse Position Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Springs for Physics-based Tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees (-10 to 10)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    // Reset tilt on leave
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Enables 3D context
      }}
      className="
        group relative flex h-full w-full flex-col overflow-hidden rounded-[32px]
        bg-white dark:bg-[#08080C] border border-black/5 dark:border-white/5
        transition-colors duration-300 cursor-pointer
        transform-gpu
        ultra-glass
      "
    >
      {/* 1. CSS Animated Border Beam (Appears on Hover) */}
      <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-[-2px] rounded-[32px] borderBeam" />
      </div>

      {/* 2. Inner Rotating Gradient Glow (Appears on Hover) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[32px]">
          <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent,rgba(168,85,247,0.15),transparent,rgba(6,182,212,0.15),transparent)] mix-blend-overlay blur-3xl"
          />
      </div>


      {/* Main Content (Wrapped for preserve-3d) */}
      <div 
        style={{ transform: "translateZ(50px)" }} // Pushes content forward in 3D
        className="relative z-10 p-9 flex flex-col h-full backdrop-blur-sm"
      >
        {/* Category Tag */}
        <span className="mb-5 inline-block w-max rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-300">
          {service.category}
        </span>

        {/* Icon (Magnetic Effect on Hover) */}
        <motion.div 
          style={{ transform: "translateZ(30px)" }} // Extra 3D pop for icon
          className="mb-7 w-14 h-14 rounded-2xl flex items-center justify-center text-gray-800 dark:text-gray-200 transition-colors duration-500 group-hover:text-purple-500 dark:group-hover:text-cyan-400 group-hover:scale-110"
        >
          <svg 
            width="32" height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {service.icon}
          </svg>
        </motion.div>

        {/* Content */}
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-cyan-300">
          {service.title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400/80 flex-grow">
          {service.desc}
        </p>

        {/* Cinematic Arrow Reveal */}
        <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-cyan-400">View Details</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 dark:text-cyan-400">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>

      </div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section className="relative py-32 md:py-40 bg-[#f8f9fc] dark:bg-[#030305] overflow-hidden transition-colors duration-500 perspective-[1500px]"> {/*perspective is crucial */}
      
      {/* --- Sci-Fi Background Elements --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-500/15 dark:bg-purple-700/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[70%] bg-cyan-400/15 dark:bg-cyan-500/15 blur-[130px] rounded-full" />
        {/* Cinematic Radial Mask Grid */}
        <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.04] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- Unified Header (Sleek Agencia Look) --- */}
        <div className="text-center mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-purple-500/20 bg-purple-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-purple-700 dark:text-purple-300 uppercase">Our Capabilities</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-tight"
            >
              Designing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">Future-Proof</span> Ecosystems
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
            >
                From scalable cloud architecture to high-converting marketing frameworks. We leverage next-gen protocols to engineer digital experiences that define tomorrow.
            </motion.p>
        </div>

        {/* --- The Grid --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {servicesData.map((service, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

      </div>
      
      {/* ================= INJECTED CSS STYLES (Ultra Performance) ================= */}
      <style jsx global>{`
        /* 1. Perspective Wrapper for 3D */
        section {
            perspective: 1500px;
        }

        /* 2. Premium Noise/Grain Texture */
        .ultra-glass {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='noise' opacity='0.03'/%3E%3C/svg%3E");
            background-size: cover;
            mix-blend-mode: normal;
        }
        .dark .ultra-glass {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='noise' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* 3. CSS Border Beam Animation (Buttery Smooth) */
        @keyframes border-spin {
            100% { transform: rotate(360deg); }
        }

        .borderBeam {
            position: absolute;
            background: conic-gradient(from 0deg, transparent, rgba(168,85,247,0.6), transparent, rgba(6,182,212,0.6), transparent);
            animation: border-spin 4s linear infinite;
        }
        
        .borderBeam::after {
            content: '';
            position: absolute;
            inset: 2px; /* creates the border thickness */
            background: #f8f9fc; /* Light BG color */
            border-radius: 31px; /* must be original rounded - parent padding */
        }
        .dark .borderBeam::after {
            background: #08080C; /* Dark BG color */
        }

      `}</style>
    </section>
  );
}