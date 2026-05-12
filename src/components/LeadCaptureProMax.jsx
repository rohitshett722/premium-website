import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// --- GLOBAL VARIABLES (TUMHARA ACTIVE NUMBER) ---
const MY_PHONE_NUMBER = "917055777240"; // Tumhara number with India code
const WA_MESSAGE = encodeURIComponent("Hi Rohit, I just visited your premium portfolio and I'm interested in discussing a high-end project. Can we schedule a quick chat?");
const WHATSAPP_LINK = `https://wa.me/${MY_PHONE_NUMBER}?text=${WA_MESSAGE}`;
const CALL_LINK = `tel:+${MY_PHONE_NUMBER}`;
const CALENDLY_LINK = "https://calendly.com/"; // Baad mein apna link daal lena

// --- OFFICIAL WHATSAPP SVG ICON ---
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.655-1.757-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// --- FLOATING STICKY WHATSAPP ---
const FloatingWhatsApp = () => (
  <motion.a 
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center w-14 h-14 md:w-[72px] md:h-[72px] bg-[#25D366] rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.5)] border border-white/30 backdrop-blur-xl group overflow-hidden cursor-pointer"
  >
    <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white" style={{ animationDuration: '2s' }} />
    <div className="w-7 h-7 md:w-9 md:h-9 text-white relative z-10">
       <WhatsAppIcon />
    </div>
  </motion.a>
);

// --- LUXURY 3D ACTION CARD (FOR RIGHT PANEL) ---
const LuxuryActionCard = ({ title, desc, icon, color, buttonText, link, isBlank, isMobile }) => {
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
    xPct.set(0); yPct.set(0);
  }

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group p-6 md:p-8 rounded-[2rem] bg-white/[0.7] dark:bg-[#0a0a0f]/80 border border-black/5 dark:border-white/10 backdrop-blur-2xl luxury-noise shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden transform-gpu"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-30 mix-blend-normal dark:mix-blend-screen z-0"
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)` }}
      />
      
      <div style={{ transform: isMobile ? "none" : "translateZ(30px)" }} className="relative z-10 flex justify-between items-start mb-6">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-white dark:bg-[#12121A] shadow-2xl border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-500" style={{ color: color }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl rounded-full" style={{ backgroundColor: color }} />
          <div className="w-7 h-7 relative z-10">{icon}</div>
        </div>
        
        <a 
          href={link} 
          target={isBlank ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-white dark:bg-white/10 text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all cursor-pointer z-10 shadow-sm hover:scale-105"
        >
          {buttonText}
        </a>
      </div>
      
      <div style={{ transform: isMobile ? "none" : "translateZ(20px)" }} className="relative z-10">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-[var(--hover-color)] transition-colors duration-300" style={{ "--hover-color": color }}>{title}</h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// --- MAIN SECTION ---
export default function LeadCaptureProMax() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projectOptions = [
    { id: "web", label: "Web/SaaS Platform", icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /> },
    { id: "mobile", label: "Mobile App", icon: <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /> },
    { id: "ai", label: "AI & Automation", icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> },
    { id: "marketing", label: "Digital Marketing", icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-[#f8f9fc] dark:bg-[#000000] overflow-hidden transition-colors duration-700 perspective-[2500px]">
      
      <FloatingWhatsApp />

      {/* Massive Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[40rem] md:w-[70rem] h-[40rem] md:h-[70rem] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[150px] md:blur-[250px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] md:w-[60rem] md:h-[60rem] bg-fuchsia-600/10 dark:bg-fuchsia-600/15 blur-[120px] md:blur-[220px] rounded-full mix-blend-multiply dark:mix-blend-screen" 
        />
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* PREMIUM HEADER */}
        <div className="text-center mb-20 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-lg"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </div>
              <span className="text-sm font-mono tracking-widest text-gray-900 dark:text-white uppercase font-bold">Initiate Protocol</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", damping: 25 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.05] mb-8"
            >
              Let's Build Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500">Digital Empire.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Skip the endless email threads. Use our smart quote generator below or book a direct consultation with our lead architect.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: LUXURY MULTI-STEP COMMAND CENTER */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", damping: 25 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="w-full bg-white/70 dark:bg-[#0a0a0f]/90 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[3rem] p-8 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] luxury-noise h-full flex flex-col relative overflow-hidden">
                
                {/* Glowing Top Edge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                {/* Form Progress Bar */}
                <div className="flex items-center justify-between mb-12 relative">
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 dark:bg-white/5 -translate-y-1/2 rounded-full z-0" />
                  <motion.div 
                    className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 -translate-y-1/2 rounded-full z-0 shadow-[0_0_15px_rgba(99,102,241,0.6)]" 
                    initial={{ width: "0%" }}
                    animate={{ width: step === 1 ? "15%" : step === 2 ? "50%" : "100%" }}
                    transition={{ duration: 0.6, type: "spring" }}
                  />
                  
                  {[1, 2, 3].map((num) => (
                    <div key={num} className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-sm md:text-base transition-all duration-500 ${step >= num ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110" : "bg-white dark:bg-[#12121A] text-gray-400 border-2 border-gray-200 dark:border-white/10"}`}>
                      {num}
                    </div>
                  ))}
                </div>

                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: PROJECT TYPE */}
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">What are we building?</h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 mb-10 font-medium">Select the core focus of your project to calibrate the system.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                          {projectOptions.map((opt) => (
                            <button 
                              key={opt.id}
                              onClick={() => setProjectType(opt.id)}
                              className={`group flex items-center gap-5 p-5 md:p-6 rounded-[1.5rem] border-2 transition-all duration-300 text-left relative overflow-hidden ${projectType === opt.id ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 shadow-[0_10px_30px_rgba(99,102,241,0.2)] scale-[1.02]" : "bg-white dark:bg-white/5 border-transparent hover:border-gray-300 dark:hover:border-white/20 shadow-sm hover:shadow-md"}`}
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${projectType === opt.id ? "bg-indigo-500 text-white" : "bg-gray-100 dark:bg-[#12121A] text-gray-500 dark:text-gray-400 group-hover:text-indigo-500"}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{opt.icon}</svg>
                              </div>
                              <span className={`font-black text-base md:text-lg ${projectType === opt.id ? "text-indigo-700 dark:text-indigo-300" : "text-gray-800 dark:text-gray-200"}`}>{opt.label}</span>
                            </button>
                          ))}
                        </div>
                        
                        <button 
                          onClick={() => setStep(2)}
                          disabled={!projectType}
                          className="mt-auto w-full py-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-black text-lg tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform shadow-xl"
                        >
                          Continue Sequence
                        </button>
                      </motion.div>
                    )}

                    {/* STEP 2: DETAILS & UPLOAD */}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Project Details</h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 mb-8 font-medium">Define your vision, required features, and timeline.</p>
                        
                        <div className="space-y-6 flex-grow">
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-[1.5rem] blur opacity-0 group-focus-within:opacity-30 transition duration-500" />
                            <textarea 
                              rows="4" 
                              placeholder="Describe your vision..."
                              className="relative w-full bg-white dark:bg-[#12121A] border-2 border-gray-100 dark:border-white/5 rounded-[1.5rem] p-6 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all resize-none text-lg font-medium shadow-inner"
                            />
                          </div>
                          
                          {/* Luxury Dropzone */}
                          <div className="w-full relative group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-[1.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                            <div className="relative w-full border-2 border-dashed border-gray-300 dark:border-white/20 group-hover:border-indigo-500 dark:group-hover:border-indigo-400 rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center transition-colors bg-gray-50 dark:bg-white/5 backdrop-blur-sm">
                              <div className="w-14 h-14 rounded-full bg-white dark:bg-[#12121A] shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                              </div>
                              <span className="text-base font-bold text-gray-700 dark:text-gray-300">Drag & drop files or <span className="text-indigo-600 dark:text-indigo-400">browse</span></span>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-500 mt-2">PDF, DOCX, PNG up to 20MB</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mt-10">
                          <button onClick={() => setStep(1)} className="px-8 py-5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors uppercase tracking-widest text-sm">Back</button>
                          <button onClick={() => setStep(3)} className="flex-1 py-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-black tracking-widest uppercase text-sm md:text-lg hover:scale-[1.02] transition-transform shadow-xl">Proceed</button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: CONTACT INFO */}
                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Final Authorization</h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 mb-8 font-medium">Where should we send the architectural proposal?</p>
                        
                        <div className="space-y-5 flex-grow">
                          <div className="grid grid-cols-2 gap-5">
                            <div className="relative group">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-focus-within:opacity-40 transition duration-500" />
                              <input type="text" placeholder="First Name" className="relative w-full bg-white dark:bg-[#12121A] border-2 border-transparent rounded-2xl p-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all font-bold shadow-sm" />
                            </div>
                            <div className="relative group">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-focus-within:opacity-40 transition duration-500" />
                              <input type="text" placeholder="Last Name" className="relative w-full bg-white dark:bg-[#12121A] border-2 border-transparent rounded-2xl p-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all font-bold shadow-sm" />
                            </div>
                          </div>
                          <div className="relative group">
                             <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-focus-within:opacity-40 transition duration-500" />
                             <input type="email" placeholder="Work Email" className="relative w-full bg-white dark:bg-[#12121A] border-2 border-transparent rounded-2xl p-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all font-bold shadow-sm" />
                          </div>
                          <div className="relative group">
                             <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-focus-within:opacity-40 transition duration-500" />
                             <input type="tel" placeholder="WhatsApp Number" className="relative w-full bg-white dark:bg-[#12121A] border-2 border-transparent rounded-2xl p-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all font-bold shadow-sm" />
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mt-10">
                          <button onClick={() => setStep(2)} className="px-8 py-5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors uppercase tracking-widest text-sm">Back</button>
                          <button onClick={() => alert("System Initiated!")} className="flex-1 py-5 rounded-full bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-pink-500 text-white font-black tracking-widest uppercase hover:scale-[1.02] shadow-[0_15px_40px_rgba(217,70,239,0.4)] transition-all flex justify-center items-center gap-3 text-sm md:text-lg">
                            Request Quote <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
            </div>
          </motion.div>

          {/* RIGHT: LUXURY 3D ACTION CARDS */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="lg:col-span-5 flex flex-col gap-6 md:gap-8 h-full justify-between"
          >
             <LuxuryActionCard 
               title="WhatsApp VIP Line"
               desc="Skip the queue. Chat directly with the team for rapid prototyping and queries."
               color="#25D366" // WhatsApp Official Green
               buttonText="Chat Now"
               link={WHATSAPP_LINK}
               isBlank={true}
               isMobile={isMobile}
               icon={<WhatsAppIcon />}
             />

             <LuxuryActionCard 
               title="Instant Callback"
               desc="Need immediate answers? Drop your number and we'll call you within 5 minutes."
               color="#3b82f6" // Blue
               buttonText="Request Call"
               link={CALL_LINK}
               isBlank={false}
               isMobile={isMobile}
               icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
             />

             <LuxuryActionCard 
               title="Book Video Consultation"
               desc="Schedule a 30-min strategy call via Calendly. Direct access to our lead architect."
               color="#a855f7" // Purple
               buttonText="Book Now"
               link={CALENDLY_LINK}
               isBlank={true}
               isMobile={isMobile}
               icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
             />
          </motion.div>

        </div>
      </div>
      
      <style jsx global>{`
        .luxury-noise {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
            background-size: cover;
        }
        .dark .luxury-noise {
             background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
}