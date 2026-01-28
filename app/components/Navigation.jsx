

import { motion } from "framer-motion";
import { Command } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function Navigation({ currentPage, setCurrentPage }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 backdrop-blur-2xl bg-[var(--card)]/80 border-b border-[var(--border)]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease }}
        className="flex items-center gap-2 font-black tracking-tighter text-lg cursor-pointer motion"
        onClick={() => setCurrentPage("home")}
      >
        <Command size={20} className="text-[var(--accent)]" />
        <span className="text-[var(--fg)]">MAREK JANÁSEK</span>
      </motion.div>

      <div className="flex gap-6 md:gap-8 text-[10px] uppercase tracking-[0.2em] font-black">
        {["home", "projects", "contact"].map((page) => (
          <motion.button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`relative motion ${
              currentPage === page ? "text-[var(--fg)]" : "text-[var(--fg)]/40"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
          >
            {page}
            {currentPage === page && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}