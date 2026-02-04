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
  /* 1. FORCE STATE TO LIGHT & CZECH */
  const [lang, setLang] = useState("CZ");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync Lang only - Theme is now permanently light
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
    
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

  // Force light class on document for Tailwind
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, [mounted]);

  // Prevent Flicker - Always start white
  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    /* 2. REMOVED THE DYNAMIC BG LOGIC - HARDCODED bg-white */
    <div className="min-h-screen flex flex-col bg-white text-black transition-none">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
      />

      <div className="flex-grow pt-24 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white" /* 3. Force child wrapper white */
          >
            {currentPage === "home" && (
              <HomePage setCurrentPage={setCurrentPage} lang={lang} allProjects={jsonProjects} />
            )}
            {currentPage === "projects" && (
              <ProjectsPage allProjects={jsonProjects} lang={lang} />
            )}
            {currentPage === "contact" && (
              <ContactPage lang={lang} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}