"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  Settings, 
  ShieldCheck, 
  Copy, 
  Check,
  Plus
} from "lucide-react";
import { useState } from "react";
import Navigation from "../Navigation"; 

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    systemDoc: "System Documentation",
    architectureCase: "Architecture Case",
    status: "Status",
    optimized: "Optimized",
    logic: "Logic",
    auth: "Auth",
    speed: "Speed",
    engineeringTitle: "Engineering Deep-Dive",
    defaultDescription: "Full project breakdown and technical implementation details.",
    quote: "The architecture prioritizes sub-second latency and atomic state management across distributed nodes.",
    envSetup: "Environment Setup",
    perfBench: "Performance Benchmarks",
    process: "Process",
    latency: "Latency",
    edgeFetch: "Edge Fetch",
    hydration: "Hydration",
    continueConvo: "Continue the conversation",
    inquireNow: "Inquire Now"
  },
  CZ: {
    systemDoc: "Systémová dokumentace",
    architectureCase: "Architektonický případ",
    status: "Stav",
    optimized: "Optimalizováno",
    logic: "Logika",
    auth: "Autentizace",
    speed: "Rychlost",
    engineeringTitle: "Technický rozbor",
    defaultDescription: "Úplný rozpis projektu a technické implementační detaily.",
    quote: "Architektura upřednostňuje subsekondovou latenci a atomické řízení stavu napříč distribuovanými uzly.",
    envSetup: "Nastavení prostředí",
    perfBench: "Výkonnostní testy",
    process: "Proces",
    latency: "Latence",
    edgeFetch: "Edge načtení",
    hydration: "Hydratace",
    continueConvo: "Pokračujte v konverzaci",
    inquireNow: "Zeptat se nyní"
  }
};

const CodeBlock = ({ code, filename, isDark }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`my-10 rounded-2xl overflow-hidden border ${
      isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-[#f9f9f9]'
    }`}>
      <div className={`flex justify-between items-center px-5 py-3 border-b ${
        isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-white'
      }`}>
        <span className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">{filename}</span>
        <button onClick={copy} className="opacity-40 hover:opacity-100 transition-opacity">
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className={`p-6 overflow-x-auto text-sm font-mono leading-relaxed ${
        isDark ? 'text-white/70' : 'text-black/70'
      }`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function GoDrivePage({ setCurrentPage }) {
  // State management for theme and language
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("EN");

  const t = translations[lang] || translations.EN;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Project data
  const project = {
    title: "GoDrive",
    year: "2026",
    description: {
      EN: "A modern cloud storage platform built with Next.js, featuring real-time file synchronization, advanced sharing capabilities, and enterprise-grade security.",
      CZ: "Moderní cloudová úložná platforma postavená na Next.js s funkcemi synchronizace souborů v reálném čase, pokročilými možnostmi sdílení a zabezpečením na podnikové úrovni."
    },
    tags: ["Next.js", "TypeScript", "Clerk", "Turso", "Drizzle"]
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      isDark ? 'bg-[#0a0a0a] text-white selection:bg-orange-900/30' : 'bg-white text-black selection:bg-orange-100'
    }`}>
      
      {/* 1. THE NAVIGATION */}
      <Navigation 
        currentPage="projects"
        setCurrentPage={setCurrentPage}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        forceBlack={!isDark}
      />

      {/* 2. READING PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[110] origin-left" 
        style={{ scaleX }} 
      />

      {/* 3. HERO AREA */}
      <header className="pt-64 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
              {t.systemDoc} // {project.year}
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase">
            {project.title}<br />
            <span className={`italic font-light lowercase tracking-tight ${
              isDark ? 'text-white/10' : 'text-black/10'
            }`}>
              {t.architectureCase}
            </span>
          </h1>
        </motion.div>

        {/* COMPACT BENTO WIDGETS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { label: t.status, val: t.optimized, icon: <Settings size={14}/> },
            { label: t.logic, val: "TypeScript", icon: <Terminal size={14}/> },
            { label: t.auth, val: "Clerk / JWT", icon: <ShieldCheck size={14}/> },
            { label: t.speed, val: "98 Score", icon: <Plus size={14}/> }
          ].map((w, i) => (
            <div key={i} className={`p-8 rounded-3xl border flex flex-col justify-between h-40 transition-transform hover:scale-[1.02] ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-[#f9f9f9] border-black/5'
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

      {/* 4. CONTENT BODY */}
      <main className="max-w-6xl mx-auto px-6 py-24 pb-64">
        <article className="space-y-24">
          
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">{t.engineeringTitle}</h2>
            <p className={`text-lg leading-relaxed mb-8 ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              {project.description[lang]}
            </p>
            <p className={`leading-relaxed italic ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}>
              "{t.quote}"
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-30 mb-6">{t.envSetup}</h3>
            <CodeBlock 
              isDark={isDark}
              filename="env.local"
              code={`NEXT_PUBLIC_API_URL=https://api.v1.prod\nDATABASE_URL=postgres://user:pass@host:5432/db\nNODE_ENV=production`}
            />
          </section>

          <section>
            <h3 className="text-2xl font-bold tracking-tight mb-8">{t.perfBench}</h3>
            <div className={`rounded-3xl border overflow-hidden shadow-sm ${
              isDark ? 'border-white/10' : 'border-black/5'
            }`}>
              <table className="w-full text-left text-sm">
                <thead className={`border-b ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-[#f9f9f9] border-black/5'
                }`}>
                  <tr>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">{t.process}</th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">{t.latency}</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  isDark ? 'divide-white/10' : 'divide-black/5'
                }`}>
                  <tr>
                    <td className="p-5 font-medium">{t.edgeFetch}</td>
                    <td className="p-5 font-mono text-orange-600">42ms</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.hydration}</td>
                    <td className="p-5 font-mono text-orange-600">120ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </article>

        {/* 5. FOOTER */}

      </main>
    </div>
  );
}