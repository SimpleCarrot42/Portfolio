"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function NotFound() {
  // Hardcoded to false/light for consistency
  const [isDark] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const t = {
    EN: { title: "Lost in space", back: "Return to safety" },
    CZ: { title: "Ztracen v prostoru", back: "Návrat do bezpečí" }
  };

  const currentT = lang === "CZ" ? t.CZ : t.EN;

  return (
    // HARDCODED: bg-white text-black
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-orange-100">
      <Navigation 
        currentPage="" 
        setCurrentPage={() => (window.location.href = "/")} 
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
            <div className="relative p-8 rounded-[2.5rem] border bg-neutral-50 border-black/5 shadow-xl shadow-black/[0.02]">
              <img 
                src="https://http.cat/404" 
                alt="404 Cat" 
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 max-w-[300px] md:max-w-[400px] shadow-lg"
              />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter uppercase mb-4"
          >
            404
          </motion.h1>

          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-orange-600 mb-12">
            {currentT.title}
          </p>

          <button 
            onClick={() => (window.location.href = "/")}
            className="px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black bg-black text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 shadow-lg shadow-black/10 active:scale-95"
          >
            {currentT.back}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}