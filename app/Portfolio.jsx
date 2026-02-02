"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import { projects as jsonProjects } from "./data/projects.js";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDark, setIsDark] = useState(true); 
  const [lang, setLang] = useState("EN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Sync Theme/Lang
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) setIsDark(savedTheme === "dark");
    else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (savedLang) setLang(savedLang);
    
    // 2. Handle URL Hash on load
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["home", "projects", "contact"].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    setMounted(true);

    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  // VOILA: No flicker, no lag.
  if (!mounted) return <div className="min-h-screen bg-white dark:bg-[#0a0a0a]" />;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-black"
    }`}>
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
      />

      <div className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === "home" && (
              <HomePage setCurrentPage={setCurrentPage} lang={lang} isDark={isDark} allProjects={jsonProjects} />
            )}
            {currentPage === "projects" && (
              <ProjectsPage allProjects={jsonProjects} lang={lang} isDark={isDark} />
            )}
            {currentPage === "contact" && (
              <ContactPage lang={lang} isDark={isDark} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer isDark={isDark} />
    </div>
  );
}