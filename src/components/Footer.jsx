import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f6f7fb] dark:bg-[#050505] border-t border-black/5 dark:border-white/5 pt-16 pb-8 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            RohitCodex
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-widest uppercase mt-1">
            Full-Stack & Motion Engineer
          </span>
        </div>

        {/* Social Links */}
        <div className="flex gap-8 text-sm font-semibold text-gray-600 dark:text-gray-400">
          <a href="#" className="hover:text-purple-500 dark:hover:text-cyan-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-purple-500 dark:hover:text-cyan-400 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-purple-500 dark:hover:text-cyan-400 transition-colors">Twitter</a>
        </div>
      </div>
      
      {/* System Status / Copyright */}
      <div className="mt-16 text-center text-[10px] text-gray-400 dark:text-gray-600 font-mono tracking-[0.2em] uppercase flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            All systems operational
        </div>
        &copy; {currentYear} Rohit. Built with precision.
      </div>
    </footer>
  );
}