"use client";
import { motion } from "framer-motion";

export default function Footer() {
  // Hardcoded light theme colors
  const activeColor = "#0a0a0a"; // Solid Black
  const subtleColor = "rgba(10, 10, 10, 0.4)"; // Faded Black
  
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="w-full px-6 md:px-12 pb-12 mt-32 bg-white"
    >
      {/* The "Simple Line" */}
      <div 
        className="w-full h-[1px] mb-8" 
        style={{ 
          backgroundColor: "#000", 
          opacity: 0.05,
        }} 
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side: Year & Name */}
        <div className="flex items-center gap-4">
          <span 
            className="text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ color: activeColor }}
          >
            © {currentYear} Marek Janásek
          </span>
        </div>


        {/* Right Side: Credit */}
        <div className="flex items-center">
          <span 
            className="text-[10px] font-medium tracking-[0.2em] uppercase italic"
            style={{ color: subtleColor }}
          >
            Developed by hand
          </span>
        </div>
      </div>
    </motion.footer>
  );
}