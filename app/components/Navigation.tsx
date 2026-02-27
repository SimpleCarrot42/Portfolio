"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const labels: Record<string, string> = { 
    home: "domů", 
    projects: "projekty", 
    about: "o mně", 
    contact: "kontakt" 
  };
  
  const navKeys = Object.keys(labels);

  // Handle Hash Scrolling on Initial Load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && navKeys.includes(hash)) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        setCurrentPage(hash);
      }, 100);
    }
  }, []);

  const handleNavClick = (key: string) => {
    setIsOpen(false);

    if (key === "home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      setCurrentPage("home");
      return;
    }

    if (pathname !== "/") {
      router.push(`/#${key}`);
    } else {
      setCurrentPage(key);
      document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${key}`);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-[110] bg-white/80 backdrop-blur-md border-b border-black/5"
      >
        <button
          onClick={() => handleNavClick("home")}
          className="text-[15px] font-bold tracking-[0.3em] uppercase text-black hover:text-orange-600 transition-colors"
        >
          Marek Janásek
        </button>

        {/* Desktop Links */}
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

        {/* Hamburger */}
        <button 
          className="md:hidden text-black p-2 hover:bg-black/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[105]"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease }}
              className="fixed top-0 right-0 h-full w-[80%] bg-white z-[120] flex flex-col px-8 pt-32 gap-8 shadow-2xl bg-white"
            >
              {/* Close button inside menu */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-50"
              >
                <X size={24} />
              </button>

              {/* Navigation links */}
              <div className="flex flex-col gap-6 mt-12">
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
              </div>

              <div className="mt-auto mb-12">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-20">
                  © 2026 Marek Janásek
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}