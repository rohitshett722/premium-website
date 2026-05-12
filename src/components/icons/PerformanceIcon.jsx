import { motion } from "framer-motion";

export default function PerformanceIcon() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cyan-400"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 2l4 8-4 12-4-12 4-8z" />
    </motion.svg>
  );
}
