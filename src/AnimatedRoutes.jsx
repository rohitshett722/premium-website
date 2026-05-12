import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", el: <Home /> },
          { path: "/about", el: <About /> },
          { path: "/services", el: <Services /> },
          { path: "/portfolio", el: <Portfolio /> },
          { path: "/team", el: <Team /> },
          { path: "/contact", el: <Contact /> },
        ].map(({ path, el }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {el}
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}
