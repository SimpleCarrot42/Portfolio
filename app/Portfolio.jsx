"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage.";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer"; // 1. Import your new Footer

// 🔌 Importing the data from the neighbor folder
import { projects as jsonProjects } from "./data/projects.js";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) setIsDark(savedTheme === "dark");
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    /* 2. Added flex and min-h-screen to the wrapper */
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      isDark ? "bg-neutral-950 text-white" : "bg-white text-black"
    }`}>
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
      />

      {/* 3. Wrap AnimatePresence in a div with flex-grow to push the footer down */}
      <div className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === "home" && (
              <HomePage 
                setCurrentPage={setCurrentPage} 
                lang={lang} 
                isDark={isDark} 
                allProjects={jsonProjects} 
              />
            )}
            {currentPage === "projects" && (
              <ProjectsPage 
                setCurrentPage={setCurrentPage} 
                lang={lang} 
                isDark={isDark} 
                allProjects={jsonProjects} 
              />
            )}
            {currentPage === "contact" && (
              <ContactPage lang={lang} isDark={isDark} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. The Footer is now placed here, outside the main content but inside the flex wrapper */}
      <Footer isDark={isDark} />
    </div>
  );
}