"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Box, 
  Layers, 
  Cpu, 
  ExternalLink,
  Info
} from "lucide-react";
import Navigation from "../Navigation"; 

const ease = [0.16, 1, 0.3, 1];

export default function LinktreePage({ setCurrentPage }) {
  const t = {
    title: "Modely",
    subtitle: "3D",
    description: "Knihovna 3D modelů primárně pro FDM tiskárny.",
    details: "System Index"
  };

  const platforms = [
    { 
      name: "Printables", 
      url: "https://www.printables.com/@Crazy_engineer", 
      tagline: "Prusa Research",
      accent: "hover:border-[#fa5d00]", // Printables Orange
      color: "#fa5d00",
      id: "PR-01"
    },
    { 
      name: "MakerWorld", 
      url: "https://makerworld.com/en/@user_3707809783/upload", 
      tagline: "Bambu Lab",
      accent: "hover:border-[#00aeef]", // MakerWorld Teal
      color: "#00aeef",
      id: "MW-02"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-orange-100">
      
      {/* 1. THE NAVIGATION */}
      <Navigation 
        currentPage="links"
        setCurrentPage={setCurrentPage}
      />

      <main className="pt-48 pb-24 px-6 md:px-12 max-w-[900px] mx-auto">
        
        {/* 2. HEADER - Engineering Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
              {t.subtitle} // v.2026
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[80px] font-bold leading-[0.8] tracking-[-0.07em] uppercase mb-8">
            {t.title}
          </h1>
          <p className="text-lg opacity-50 max-w-lg font-medium leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* 3. PLATFORM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className={`group relative p-8 rounded-3xl border border-black/5 bg-[#f9f9f9] transition-all duration-500 overflow-hidden ${platform.accent}`}
            >
              {/* ID Tag */}
              <span className="absolute top-6 right-8 text-[10px] font-mono opacity-20 font-bold">
                {platform.id}
              </span>

              <div className="flex flex-col h-full justify-between gap-12">
                <div>
                  <div 
                    className="w-10 h-10 rounded-xl mb-6 flex items-center justify-center text-white"
                    style={{ backgroundColor: platform.color }}
                  >
                    <Box size={20} />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">
                    {platform.name}
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">
                    {platform.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                  Otevřít profil <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 4. TECHNICAL SPECS FOOTER */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Hardware", value: "Ender 3 V2 Neo", icon: <Cpu size={14}/> },
            { label: "Slicing", value: "Orca Slicer", icon: <Layers size={14}/> },
            { label: "CAD", value: "OnShape / Fusion360", icon: <Info size={14}/> }
          ].map((spec, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-black/5">
              <div className="opacity-20">{spec.icon}</div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-30">{spec.label}</p>
                <p className="text-[11px] font-bold uppercase">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}