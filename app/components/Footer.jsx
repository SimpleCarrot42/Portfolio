"use client";
import { motion } from "framer-motion";

export default function Footer({ isDark, forceBlack = false }) {
  const activeColor = forceBlack ? "#0a0a0a66" : (isDark ? "#ffffff" : "#1d1c1cff");
  const subtleColor = forceBlack ? "#0a0a0a66" : (isDark ? "rgba(255,255,255,0.4)" : "rgba(10,10,10,0.4)");
  
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="w-full px-6 md:px-12 pb-10 mt-20"
    >
      {/* The "Simple Line" */}
      <div 
        className="w-full h-[1px] mb-8" 
        style={{ 
          backgroundColor: subtleColor, 
          opacity: 0.2,
          transition: "background-color 0.5s ease" 
        }} 
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Year & Name */}
        <div className="flex items-center gap-4">
          <span 
            className="text-[9px] font-bold tracking-[0.3em] uppercase"
            style={{ color: activeColor }}
          >
            © {currentYear} Marek Janásek
          </span>
        </div>

        {/* Right Side: Credit */}
        <div className="flex items-center">
          <span 
            className="text-[9px] font-medium tracking-[0.2em] uppercase italic"
            style={{ color: subtleColor }}
          >
            Developed by hand
          </span>
        </div>
      </div>
    </motion.footer>
  );
}