"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) setIsDark(savedTheme === "dark");
    if (savedLang) setLang(savedLang);
  }, []);

  const t = {
    EN: { title: "Lost in space", back: "Return to safety" },
    CZ: { title: "Ztracen v prostoru", back: "Návrat do bezpečí" }
  };

  const currentT = lang === "CZ" ? t.CZ : t.EN;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      isDark ? "bg-neutral-950 text-white" : "bg-white text-black"
    }`}>
      <Navigation 
        currentPage="" 
        setCurrentPage={() => (window.location.href = "/")} 
        isDark={isDark} 
        setIsDark={setIsDark} 
        lang={lang} 
        setLang={setLang} 
      />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 px-6">
        <div className="max-w-2xl w-full text-center">
          {/* THE 404 CAT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12 flex justify-center"
          >
            <div className={`relative p-8 rounded-3xl border ${isDark ? "bg-neutral-900 border-white/5" : "bg-neutral-100 border-black/5"}`}>
              {/* Using the standard HTTP Cat for 404 */}
              <img 
                src="https://http.cat/404" 
                alt="404 Cat" 
                className="rounded-xl grayscale hover:grayscale-0 transition-all duration-700 max-w-[300px] md:max-w-[400px]"
              />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter uppercase mb-8"
          >
            404
          </motion.h1>

          <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-12">
            {currentT.title}
          </p>

          <button 
            onClick={() => (window.location.href = "/")}
            className={`px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 ${
              isDark ? "border-white/10 hover:bg-white hover:text-black" : "border-black/10 hover:bg-black hover:text-white"
            }`}
          >
            {currentT.back}
          </button>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}