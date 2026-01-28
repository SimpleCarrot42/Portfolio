"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "../data/projects";

const ease = [0.16, 1, 0.3, 1];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-40 px-6 md:px-12 lg:px-24 pb-40 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header matching your Home Component style */}
        <header className="mb-48">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6 flex items-center gap-2"
          >
            <Sparkles size={12} className="text-orange-600" />
            Archive // Full Collection
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }}
            className="text-[15vw] md:text-[10vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Selected <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent italic font-light">
              Works
            </span>
          </motion.h1>
        </header>

        {/* Alternating Side-by-Side Z-Pattern */}
        <div className="flex flex-col gap-64">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
              >
                {/* Image Section - Large & Immersive */}
                <div className="w-full md:w-3/5">
                  <motion.div 
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.6, ease }}
                    className="relative aspect-[16/10] overflow-hidden bg-[#F9F9F9] group cursor-pointer rounded-sm border border-black/[0.03]"
                  >
                    {/* The same gradient effect from your project cards */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.03] group-hover:opacity-100 transition-opacity duration-1000`} />
                    
                    {/* Centered Arrow Link */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                       <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center shadow-2xl">
                          <ArrowUpRight size={32} />
                       </div>
                    </div>
                  </motion.div>
                </div>

                {/* Text Section - Tight Typography */}
                <div className="w-full md:w-2/5 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg)]/40 mb-2 block">
                    {project.id}
                  </span>
                  <p className="text-xs text-[var(--fg)]/50 mb-8">
                    {project.category}
                  </p>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {project.title}
                  </h2>
                  
                  <p className="text-[var(--fg)]/60 text-base mb-6 max-w-md">
                    {project.description}
                  </p>
                  
                  {/* Styled Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-[var(--bg)] rounded-full text-xs font-medium text-[var(--fg)]/70 border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Year Badge */}
                  <div className="mt-12 text-9xl font-black text-[var(--fg)]/[0.08] tracking-tighter" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {project.year || "2026"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}