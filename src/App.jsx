import { BrowserRouter } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";
import AnimatedRoutes from "./AnimatedRoutes";
import AdvancedPreloader from "./components/AdvancedPreloader";

export default function App() {
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  /* ================= 🌙 DARK / LIGHT ================= */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* ================= 🎬 PRELOADER ================= */
  

  /* ================= 🚀 LENIS SMOOTH SCROLL ================= */
  useEffect(() => {
    if (loading) return; // ❌ preloader ke time scroll mat chalao

    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  return (
    <BrowserRouter>
      {/* 🔥 ADVANCED PRELOADER */}
<AdvancedPreloader
  show={loading}
  onComplete={() => setLoading(false)}
/>

      {/* 🚀 MAIN WEBSITE */}
      {!loading && (
        <div
          id="smooth-wrapper"
          className="
            min-h-screen overflow-x-hidden
            transition-colors duration-700
            bg-gradient-to-br
            from-[#f6f7ff] to-[#eef1ff]
            dark:from-[#09090f] dark:to-[#0f1020]
          "
        >
          {/* 🌌 GLOBAL EFFECTS */}
          <CursorGlow />

          {/* 🧭 NAVBAR */}
          <Navbar dark={dark} setDark={setDark} />

          {/* 🎥 ROUTES (CINEMATIC READY) */}
          <AnimatedRoutes />
        </div>
      )}
    </BrowserRouter>
  );
}
