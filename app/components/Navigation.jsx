"use client";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function Navigation({ 
  currentPage, 
  setCurrentPage, 
  isDark, 
  setIsDark, 
  lang, 
  setLang,
  forceBlack = false 
}) {
  const activeColor = forceBlack ? "#0a0a0a" : (isDark ? "#ffffff" : "#0a0a0a");
  const mutedColor = forceBlack ? "rgba(10,10,10,0.4)" : (isDark ? "rgba(255,255,255,0.4)" : "rgba(10,10,10,0.4)");
  const subtleColor = forceBlack ? "rgba(10,10,10,0.5)" : (isDark ? "rgba(255,255,255,0.5)" : "rgba(10,10,10,0.5)");

  // Helper to handle the home redirect
  const handleHomeClick = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    } else {
      setCurrentPage("home");
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-[100] backdrop-blur-sm"
    >
      {/* Logo/Name - Now redirects to root URL */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={handleHomeClick}
      >
        <span 
          className="text-[11px] font-bold tracking-[0.3em] uppercase hidden md:block"
          style={{ color: activeColor, transition: "color 0.5s ease" }}
        >
          Marek Janásek
        </span>
      </div>

      {/* Center Navigation */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-10">
        {["home", "projects", "contact"].map((page) => (
          <button
            key={page}
            onClick={() => {
              if (window.location.pathname !== "/") {
                window.location.href = "/"; // Redirect home first if on a subpage
              } else {
                setCurrentPage(page);
              }
            }}
            className="text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-500"
            style={{
              color: currentPage === page ? activeColor : mutedColor,
            }}
            onMouseEnter={(e) => (e.target.style.color = activeColor)}
            onMouseLeave={(e) => (e.target.style.color = currentPage === page ? activeColor : mutedColor)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setLang(lang === "EN" ? "CZ" : "EN")}
          className="text-[10px] font-bold tracking-tighter w-6 transition-colors duration-500"
          style={{ color: subtleColor }}
          onMouseEnter={(e) => (e.target.style.color = activeColor)}
          onMouseLeave={(e) => (e.target.style.color = subtleColor)}
        >
          {lang}
        </button>

        <button 
          onClick={() => setIsDark(!isDark)}
          className="transition-colors duration-500"
          style={{ color: subtleColor }}
          onMouseEnter={(e) => (e.target.style.color = activeColor)}
          onMouseLeave={(e) => (e.target.style.color = subtleColor)}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
        </button>
      </div>
    </motion.nav>
  );
}