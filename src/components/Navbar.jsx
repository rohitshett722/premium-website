import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useScrollDirection from "../hooks/useScrollDirection";
import MagneticButton from "./MagneticButton";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const show = useScrollDirection();
  const location = useLocation();

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(12);
  };

  return (
    <>
      {/* ================= NAVBAR HEADER ================= */}
      <AnimatePresence>
        {show && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-5 inset-x-0 z-50 flex justify-center px-4"
          >
            {/* Navbar Container */}
            <div className="w-full max-w-7xl flex items-center justify-between px-5 py-3 md:px-6 md:py-4 rounded-full bg-white/70 dark:bg-[#06060c]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-lg ring-1 ring-black/5 transition-colors duration-500">
              
              {/* LOGO */}
              <div className="font-bold text-lg tracking-tight flex gap-2 text-gray-900 dark:text-white">
                ✨ RohitCodex
              </div>

              {/* DESKTOP NAV ITEMS */}
              <div className="hidden md:flex gap-1 relative">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={vibrate}
                      className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-purple-500"
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-purple-500/10 dark:bg-purple-500/20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${active ? "text-purple-600 dark:text-purple-400" : "text-gray-700 dark:text-gray-300"}`}>
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                
                {/* THEME TOGGLE */}
                <button
                  onClick={() => setDark(!dark)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  {dark ? (
                    // SUN ICON (Yellow)
                    <svg className="w-5 h-5 text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" viewBox="0 0 24 24">
                       <circle cx="12" cy="12" r="5" />
                       <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    // MOON ICON (Purple)
                    <svg className="w-5 h-5 text-purple-600 fill-current drop-shadow-[0_0_5px_rgba(147,51,234,0.3)]" viewBox="0 0 24 24">
                       <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>

                {/* DESKTOP START PROJECT (Hidden on Mobile) */}
                <MagneticButton className="hidden sm:flex px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/25">
                  Start Project
                </MagneticButton>

                {/* HAMBURGER TOGGLE */}
                <button 
                  onClick={() => { vibrate(); setOpen(!open); }} 
                  className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 active:scale-90 transition-colors text-gray-900 dark:text-white"
                >
                   {open ? "✕" : "☰"}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && show && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-[2px] transition-colors duration-500"
            />

            {/* DROPDOWN MENU CONTAINER */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="
                fixed top-24 left-4 right-4 z-50 
                flex flex-col gap-2 p-3
                rounded-3xl 
                bg-white/90 dark:bg-[#050505]/85
                backdrop-blur-xl 
                border border-gray-200 dark:border-white/10
                shadow-2xl shadow-purple-500/10 dark:shadow-purple-900/20
                origin-top overflow-hidden
                transition-all duration-500
              "
            >
              {/* LINKS */}
              {navItems.map((item, i) => {
                const active = location.pathname === item.path;
                const number = `0${i + 1}`;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => { vibrate(); setOpen(false); }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`
                        w-full p-4 rounded-2xl flex items-center justify-between
                        transition-all duration-300 group border
                        ${active 
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-600/30 dark:to-purple-800/30 shadow-lg shadow-purple-500/20 dark:shadow-purple-900/40 border-purple-500/20 dark:border-transparent" 
                          : "hover:bg-gray-100 dark:hover:bg-white/5 bg-transparent border-transparent"
                        }
                      `}
                    >
                      <div className="flex items-center gap-5">
                         <span className={`text-xs font-mono font-medium transition-colors ${active ? 'text-purple-600 dark:text-purple-300' : 'text-gray-400 dark:text-gray-500'}`}>
                            {number}
                         </span>
                         
                         <span className={`text-xl font-bold tracking-tight transition-colors ${
                             active 
                             ? 'bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400' 
                             : 'text-gray-700 dark:text-gray-200'
                         }`}>
                            {item.name}
                         </span>
                      </div>

                      <div className={`
                         w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm
                         ${active 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rotate-45 border-transparent shadow-md' 
                            : 'border border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-500 group-hover:border-purple-400 dark:group-hover:border-white/30 group-hover:text-purple-500 dark:group-hover:text-white'}
                      `}>
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                      </div>
                    </motion.div>
                  </NavLink>
                );
              })}

              {/* === NEW: MOBILE START PROJECT BUTTON === */}
              <motion.button
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="
                    w-full mt-2 py-4 rounded-2xl 
                    bg-gradient-to-r from-purple-600 to-pink-600 
                    text-white font-bold text-lg tracking-wide
                    shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)]
                    active:scale-[0.98] transition-all
                    flex items-center justify-center gap-2
                 "
              >
                 Start Project
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.75 6.75L19.25 12L13.75 17.25M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </motion.button>

              {/* FOOTER */}
              <div className="mt-2 px-4 pb-2 flex justify-between items-center transition-colors">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 dark:text-gray-500">
                      SYSTEM // READY
                  </span>
                  <div className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors"/>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors"/>
                      <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"/>
                  </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}