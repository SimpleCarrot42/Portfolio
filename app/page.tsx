"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage"; // Using your dedicated file
import Footer from "./components/Footer";

// Data
import { projects as jsonProjects } from "./data/projects.js";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDark, setIsDark] = useState(true); 
  const [lang, setLang] = useState("CZ");
  const [mounted, setMounted] = useState(false);

  // Handle Initial Load and URL Hashes
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    
    if (savedLang) setLang(savedLang);
    
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      // Included "about" in the allowed routes
      if (hash && ["home", "projects", "about", "contact"].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    setMounted(true);

    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Sync Theme with HTML class
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  // Prevent Hydration Mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-[#0a0a0a]" />;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-black"
    }`}>
      
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage as any}
        isDark={isDark}
        setIsDark={setIsDark as any}
        lang={lang}
        setLang={setLang as any}
      />

      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Conditional Rendering Logic */}
            {currentPage === "home" && (
              <HomePage 
                setCurrentPage={setCurrentPage as any} 
                lang={lang} 
                isDark={isDark} 
                allProjects={jsonProjects as any} 
              />
            )}

            {currentPage === "projects" && (
              <ProjectsPage 
                allProjects={jsonProjects as any} 
                lang={lang} 
                isDark={isDark} 
              />
            )}

            {/* Renders your AboutPage.jsx */}
            {currentPage === "about" && (
              <AboutPage 
                lang={lang} 
                isDark={isDark} 
              />
            )}

            {currentPage === "contact" && (
              <ContactPage 
                lang={lang} 
                isDark={isDark} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}