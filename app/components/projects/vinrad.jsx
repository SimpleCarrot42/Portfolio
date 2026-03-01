"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Globe, 
  Database, 
  Layers,
  MapPin,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import Navigation from "../Navigation"; 

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    systemDoc: "Project Specification",
    status: "Environment",
    optimized: "Production / Live",
    logic: "Data Source",
    auth: "Core Stack",
    speed: "Hosting",
    engineeringTitle: "Technical Implementation",
    defaultDescription: "A specialized web platform managing a database of Czech vineyards. The focus is on clean data presentation and efficient filtering of thousands of records.",
    perfBench: "Stack Overview",
    process: "Layer",
    latency: "Technology",
    edgeFetch: "Database & Backend",
    hydration: "Frontend Framework",
    styling: "Styling Approach",
    continueConvo: "Visit the Project",
    inquireNow: "vinarskyradar.cz"
  },
  CZ: {
    systemDoc: "Specifikace projektu",
    status: "Prostředí",
    optimized: "Produkce / Live",
    logic: "Zdroj dat",
    auth: "Hlavní stack",
    speed: "Hosting",
    engineeringTitle: "Technická implementace",
    defaultDescription: "Webová aplikace určená k propojení vinařů s jejich klientelou. Po ukončení vývoje bude aplikace zavedena do testovacího provozu mezi vinaře s potenciálem následné monetizace.",
    perfBench: "Přehled technologií",
    process: "Vrstva",
    latency: "Technologie",
    edgeFetch: "Databáze a Backend",
    hydration: "Frontend Framework",
    styling: "Styling",
    continueConvo: "Navštívit projekt",
    inquireNow: "vinarskyradar.cz"
  }
};

export default function ProjectPage({ setCurrentPage }) {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("CZ");

  const t = translations[lang] || translations.EN;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const project = {
    title: "Vinařský",
    subtitle: "Radar",
    year: "2026"
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#ffffff] text-black'
    }`}>
      
      <Navigation 
        currentPage="projects"
        setCurrentPage={setCurrentPage}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        forceBlack={!isDark}
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[110] origin-left" 
        style={{ scaleX }} 
      />

      <header className="pt-64 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
              {t.systemDoc} // {project.year}
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase">
            {project.title}<br />
            <span className="text-orange-600">{project.subtitle}</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { label: t.status, val: t.optimized, icon: <Globe size={14}/> },
            { label: t.logic, val: "PostgreSQL", icon: <Database size={14}/> },
            { label: t.auth, val: "React", icon: <Layers size={14}/> },
            { label: t.speed, val: "Supabase", icon: <MapPin size={14}/> }
          ].map((w, i) => (
            <div key={i} className={`p-8 rounded-3xl border flex flex-col justify-between h-40 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="text-orange-600">{w.icon}</div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 mb-1">{w.label}</p>
                <p className="text-sm font-bold uppercase tracking-tight">{w.val}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 pb-64">
        <article className="space-y-24">
          
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">{t.engineeringTitle}</h2>
            <p className={`text-lg leading-relaxed max-w-7xl ${isDark ? 'text-white/60' : 'text-black/70'}`}>
              {t.defaultDescription}
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold tracking-tight mb-8">{t.perfBench}</h3>
            <div className={`rounded-3xl border overflow-hidden ${
              isDark ? 'border-white/10' : 'border-black/5'
            }`}>
              <table className="w-full text-left text-sm">
                <thead className={`border-b ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-black/[0.02] border-black/5'
                }`}>
                  <tr>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">{t.process}</th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">{t.latency}</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-black/5'}`}>
                  <tr>
                    <td className="p-5 font-medium">{t.hydration}</td>
                    <td className="p-5 font-mono">React (Pure)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.styling}</td>
                    <td className="p-5 font-mono text-orange-600">Vanilla CSS</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.edgeFetch}</td>
                    <td className="p-5 font-mono text-orange-600">PostgreSQL @ Supabase</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </article>

        <div className="flex flex-col items-center justify-center mt-32 text-center">
            <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">{t.continueConvo}</h2>
            <a 
              href="https://vinarskyradar.cz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold flex items-center gap-3 hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-600/20"
            >
              {t.inquireNow} <ExternalLink size={18} />
            </a>
        </div>

      </main>
    </div>
  );
}