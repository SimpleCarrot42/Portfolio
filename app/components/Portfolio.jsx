"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ImageOff } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function ProjectsPage({ allProjects = [], lang = "EN", isDark = true }) {
  
  // 1. Sort projects: Pinned ones go to the top, others follow
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const t = {
    EN: { 
      archive: "Archive // Full Collection", 
      works: "Works", 
      detail: "View Detail",
      pending: "No visual",
      featured: "Pinned"
    },
    CZ: { 
      archive: "Archiv // Kompletní sbírka", 
      works: "Práce", 
      detail: "Zobrazit Detail",
      pending: "Bez náhledu",
      featured: "Připnuté"
    }
  };

  const labels = t[lang] || t.EN;

  return (
    <div className={`min-h-screen pt-40 px-6 md:px-12 lg:px-24 pb-40 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}`}>
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <header className="mb-48">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] uppercase tracking-[0.6em] font-bold mb-6 flex items-center gap-3 opacity-40">
            <Sparkles size={12} className="text-orange-600" /> {labels.archive}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease }} className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase">
            SELECTED <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent italic font-light">{labels.works}</span>
          </motion.h1>
        </header>

        {/* PROJECTS LIST */}
        <div className="flex flex-col gap-64">
          {sortedProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 60 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.2 }} 
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 md:gap-32`}
              >
                {/* IMAGE BOX WITH FALLBACK SYSTEM */}
                <div className="w-full lg:w-3/5 group cursor-pointer" onClick={() => window.location.href = `/projects/${project.slug}`}>
                  <div className={`relative w-full aspect-[16/10] rounded-3xl flex items-center justify-center p-12 transition-all duration-700 group-hover:scale-[1.02] ${isDark ? "bg-neutral-900" : "bg-neutral-100"}`}>
                    
                    {/* Badge for Pinned Projects */}
                    {project.pinned && (
                      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600 text-[8px] font-bold uppercase tracking-widest text-white">
                        <Sparkles size={10} /> {labels.featured}
                      </div>
                    )}

                    {project.image && project.image.trim() !== "" ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="max-w-full max-h-full object-contain" 
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-orange-600/10 flex items-center justify-center">
                          <ImageOff size={32} className="text-orange-600 opacity-40" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">{labels.pending}</p>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                             style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* TEXT BOX */}
                <div className="w-full lg:w-2/5">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-bold opacity-40">{project.id}</span>
                    <div className="h-px w-8 bg-orange-600/30" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                      {project.category[lang]}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{project.title}</h2>
                  <p className="text-lg opacity-60 mb-10 leading-relaxed max-w-md">{project.description[lang]}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${isDark ? "border-white/10 text-white/50" : "border-black/10 text-black/50"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button onClick={() => window.location.href = `/projects/${project.slug}`} className="group flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 ${isDark ? "border-white/10 group-hover:bg-white" : "border-black/10 group-hover:bg-black"}`}>
                      <ArrowRight size={20} className={isDark ? "text-white group-hover:text-black" : "text-black group-hover:text-white"} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">{labels.detail}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}