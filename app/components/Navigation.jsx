"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function Navigation({
  currentPage,
  setCurrentPage,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // --- 1. THE AUTO-SCROLL LOGIC (Preserved) ---
  useEffect(() => {
    const handleInitialScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setCurrentPage(hash);
          }
        }, 100);
      }
    };

    handleInitialScroll();
    window.addEventListener("hashchange", handleInitialScroll);
    return () => window.removeEventListener("hashchange", handleInitialScroll);
  }, [setCurrentPage]);

  // --- 2. PERMANENT LABELS (Czech) ---
  const labels = { home: "domů", projects: "projekty", blog: "blog", about: "o mně", contact: "kontakt" };
  const navKeys = ["home", "projects", "blog", "about", "contact"];

  // --- 3. CLICK HANDLER ---
  const handleNavClick = (key) => {
    setIsOpen(false); 
    const routes = {
      projects: "/projectspage",
      blog: "/blog",
      about: "/about"
    };

    if (key === "home") {
      window.location.href = "/";
      return;
    }

    if (routes[key]) {
      window.location.href = routes[key];
      return;
    }

    if (window.location.pathname !== "/") {
      window.location.href = `/#${key}`;
    } else {
      setCurrentPage(key);
      document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${key}`);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        /* HARDCODED: Light background and black text */
        className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-[110] bg-white/80 backdrop-blur-md border-b border-black/5"
      >
        {/* Logo - Permanent Black */}
        <button
          onClick={() => handleNavClick("home")}
          className="text-[15px] font-bold tracking-[0.3em] uppercase text-black hover:text-orange-600 transition-colors"
        >
          Marek Janásek
        </button>

        {/* Desktop Links - Permanent Black */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
          {navKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300
                ${currentPage === key ? "text-black" : "text-black/30"}
                hover:text-black hover:tracking-[0.35em]`}
            >
              {labels[key]}
            </button>
          ))}
        </div>

        {/* Burger Button - Permanent Black */}
        <button 
          className="md:hidden text-black p-2 hover:bg-black/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click-to-close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[105]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease }}
              className="fixed top-0 right-0 h-full w-[80%] bg-white z-[120] flex flex-col pt-32 px-12 gap-8 shadow-2xl"
            >
              {navKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className={`text-[24px] text-left uppercase tracking-[0.1em] font-bold transition-all
                    ${currentPage === key ? "text-orange-600" : "text-black/40 hover:text-black"}`}
                >
                  {labels[key]}
                </button>
              ))}
              
              <div className="mt-auto mb-12">
                 <p className="text-[10px] uppercase tracking-widest font-bold opacity-20">© 2026 Marek Janásek</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}