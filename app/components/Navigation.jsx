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
  forceBlack = false,
}) {
  const text = forceBlack ? "text-black" : isDark ? "text-white" : "text-black";
  const muted = forceBlack ? "text-black/40" : isDark ? "text-white/40" : "text-black/40";
  const subtle = forceBlack ? "text-black/50" : isDark ? "text-white/50" : "text-black/50";

  const labels = {
    EN: { home: "home", portfolio: "portfolio", projects: "projects", about: "about", contact: "contact" },
    CZ: { home: "domů", portfolio: "portfolio", projects: "projekty", about: "o mně", contact: "kontakt" },
  };

  const navKeys = ["home", "portfolio", "projects", "about", "contact"];

  const handleNavClick = (key) => {
    // 1. HARD REDIRECTS (Separate URLs)
    if (key === "portfolio") {
      window.location.href = "/portfolio";
      return;
    }
    if (key === "about") {
      window.location.href = "/about";
      return;
    }
    if (key === "home") {
      window.location.href = "/";
      return;
    }

    // 2. STATE-BASED SCROLLING (Elements on the Home Page)
    if (window.location.pathname !== "/") {
      // If user is on /portfolio or /about, they must go home first to see these sections
      window.location.href = `/#${key}`;
    } else {
      // If already on home, just update state to trigger scroll
      setCurrentPage(key);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-[100] backdrop-blur-sm transition-colors duration-500"
    >
      <button
        onClick={() => window.location.href = "/"}
        className={`hidden md:block text-[15px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${text}`}
      >
        Marek Janásek
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 flex gap-3 md:gap-8">
        {navKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleNavClick(key)}
            className={`text-[9px] md:text-[13px] uppercase tracking-[0.15em] md:tracking-[0.25em] font-bold transition-colors duration-500
              ${currentPage === key ? text : muted}
              hover:${text}`}
          >
            {labels[lang][key]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setLang(lang === "EN" ? "CZ" : "EN")}
          className={`text-[14px] font-bold tracking-tighter w-6 transition-colors duration-500 ${subtle} hover:${text}`}
        >
          {lang}
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className={`transition-colors duration-500 ${subtle} hover:${text}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
        </button>
      </div>
    </motion.nav>
  );
}