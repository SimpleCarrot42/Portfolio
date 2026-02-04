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
  const [lang, setLang] = useState("CZ");
  const [mounted, setMounted] = useState(false);

  // --- THE URL SYNC LOGIC ---
  useEffect(() => {
    const handleUrlSync = () => {
      // 1. Check pathname (e.g., /projects)
      const path = window.location.pathname.replace(/\//g, "");
      // 2. Check hash (e.g., #contact)
      const hash = window.location.hash.replace("#", "");

      const validPages = ["home", "projects", "contact"];

      if (path && validPages.includes(path)) {
        setCurrentPage(path);
      } else if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    };

    // Initialize lang
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);

    handleUrlSync();
    
    // Listen for back/forward browser buttons
    window.addEventListener("popstate", handleUrlSync);
    window.addEventListener("hashchange", handleUrlSync);
    setMounted(true);

    return () => {
      window.removeEventListener("popstate", handleUrlSync);
      window.removeEventListener("hashchange", handleUrlSync);
    };
  }, []);

  // Force Light Theme
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-orange-100">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={(key) => {
          setCurrentPage(key);
          // Manually update URL when state changes
          const newPath = key === "home" ? "/" : `/${key}`;
          window.history.pushState({ key }, "", newPath);
        }}
        lang={lang}
        setLang={setLang}
      />

      <main className="flex-grow pt-24 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white"
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
      </main>

      <Footer />
    </div>
  );
}