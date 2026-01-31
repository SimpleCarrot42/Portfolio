"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Settings, 
  Cpu, 
  Copy, 
  Check,
  Layout,
  Lock
} from "lucide-react";
import { useState } from "react";
import Navigation from "../Navigation"; 

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    systemDoc: "WalkAway-Lock Documentation",
    status: "Installation & Setup",
    optimized: "Simple",
    logic: "Core Engine",
    auth: "Integration",
    speed: "Detection Interval",
    engineeringTitle: "Technical Overview",
    defaultDescription: "WalkAway-Lock automatically locks your laptop when a preset Bluetooth device moves out of range. Using the Bleak library, it detects device presence with ~3s latency. Lightweight, easy to configure, and perfect for Hackathons or public spaces.",
    quote: "Security is only as strong as its weakest link.",
    envSetup: "Installation & Execution",
    perfBench: "Performance Overview",
    process: "Subsystem",
    latency: "Latency",
    edgeFetch: "Bluetooth Detection",
    hydration: "Lock Mechanism",
    continueConvo: "Explore Codebase",
    inquireNow: "GitHub Repository"
  },
  CZ: {
    systemDoc: "Dokumentace WalkAway-Lock",
    status: "Instalace a nastavení",
    optimized: "Jednoduché",
    logic: "Jádro aplikace",
    auth: "Integrace",
    speed: "Interval detekce",
    engineeringTitle: "Technický přehled",
    defaultDescription: "WalkAway-Lock automaticky zamkne váš laptop, pokud se přednastavené Bluetooth zařízení dostane mimo dosah. Pomocí knihovny Bleak detekuje přítomnost zařízení s latencí ~3 s. Lehký, snadno konfigurovatelný, ideální pro Hackathony nebo veřejná místa.",
    quote: "Bezpečnost je tak silná, jako její nejslabší článek.",
    envSetup: "Instalace a spuštění",
    perfBench: "Přehled výkonu",
    process: "Subsystém",
    latency: "Latence",
    edgeFetch: "Detekce přes Bluetooth",
    hydration: "Mechanismus zámku",
    continueConvo: "Prozkoumat kód",
    inquireNow: "GitHub Repozitář"
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

export default function ProjectPage({ setCurrentPage }) {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("EN");

  const t = translations[lang] || translations.EN;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const project = {
    title: "WalkAway-Lock",
    year: "2026",
    description: {
      EN: t.defaultDescription,
      CZ: t.defaultDescription
    },
    tags: ["Python", "Bleak", "Bluetooth", "Security", "Automation"]
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      isDark ? 'bg-[#0a0a0a] text-white selection:bg-orange-900/30' : 'bg-white text-black selection:bg-orange-100'
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
            {project.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { label: t.status, val: t.optimized, icon: <Settings size={14}/> },
            { label: t.logic, val: "Python 3.10+", icon: <Cpu size={14}/> },
            { label: t.auth, val: "Bleak + asyncio", icon: <Layout size={14}/> },
            { label: t.speed, val: "~3s", icon: <Lock size={14}/> }
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
              filename="walkaway.py"
              code={`# Install dependencies\npip install bleak asyncio subprocess time\n\n# Configure your device\nRSSI_THRESHOLD = -85\nMAC = "XX:XX:XX:XX:XX:XX"\n\n# Run the script\npython walkaway.py`}
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
                    <td className="p-5 font-mono text-orange-600">~3s detection</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.hydration}</td>
                    <td className="p-5 font-mono text-orange-600">Locks main device</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </article>

        <div className="flex flex-col items-center justify-center mt-32 text-center">
            <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">{t.continueConvo}</h2>
            <a 
              href="https://github.com/SimpleCarrot42/WalkAway-Lock" 
              target="_blank" 
              className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors"
            >
              {t.inquireNow} <ArrowRight size={18} />
            </a>
        </div>

      </main>
    </div>
  );
}
