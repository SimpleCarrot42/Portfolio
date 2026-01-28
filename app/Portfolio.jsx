"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage";
import ContactPage from "./components/ContactPage";

const ease = [0.16, 1, 0.3, 1];

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease }}
      >
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "contact" && <ContactPage />}
      </motion.div>

      <footer className="border-t border-[var(--border)] py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--fg)]/40">
            © 2026 Marek Janasek
          </p>
        </div>
      </footer>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}