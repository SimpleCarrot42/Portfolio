"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navigation from "../Navigation";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    systemDoc: "System Documentation",
    tag: "Work in progress",
    goBack: "Back",
  },
  CZ: {
    systemDoc: "Systémová dokumentace",
    tag: "Omlouváme se",
    goBack: "Zpět",
  }
};

export default function GoDrivePage({ isDark, setIsDark, lang, setLang }) {
  const t = translations[lang] || translations.CZ;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      isDark ? 'bg-[#0a0a0a] text-white selection:bg-orange-900/30' : 'bg-white text-black selection:bg-orange-100'
    }`}>

      <Navigation
        currentPage="projects"
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        forceBlack={!isDark}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* RETURN BUTTON */}
      <div className="fixed top-28 left-6 md:left-12 z-[100]">
        <button
          onClick={() => window.history.back()}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${
            isDark
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
              : "bg-black/5 border-black/10 text-black hover:bg-black/10"
          }`}
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">{t.goBack}</span>
        </button>
      </div>

      <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="mb-12 flex justify-center"
        >
          <div className={`relative p-8 rounded-[2.5rem] border shadow-xl shadow-black/[0.02] ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-black/5'
          }`}>
            <img
              src="https://http.cat/418"
              alt="503 Cat"
              className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 max-w-[300px] md:max-w-[400px] shadow-lg"
            />
          </div>
        </motion.div>

          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-orange-600">
          {t.tag}
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-4"
        >
          Projekt <br/> Připravujeme
        </motion.h1>

      </main>
    </div>
  );
}