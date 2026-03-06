"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Navigation from "../Navigation";

const ease = [0.16, 1, 0.3, 1];

const images = [
  {
    id: "h1",
    title: "Home",
    img: "/images/ProjectPageImages/vinrad/home.png",
  },
  {
    id: "h2",
    title: "Login",
    img: "/images/ProjectPageImages/vinrad/login.png",
  },
];

const translations = {
  CZ: {
    systemDoc: "Specifikace projektu",
    status: "Prostředí",
    optimized: "Produkce / Live",
    logic: "Zdroj dat",
    auth: "Hlavní stack",
    speed: "Hosting",
    desciptionTitle: "Popis",
    defaultDescription: 'Tento script do vašeho minecraftového světu připojí bota kterého mužete ovládat, jedná se celkem o "cheat". Bot má totiž schopnost detekovat horniny, pro administrorátory toto muže vypadat jako podvádění. Užití je tedy s riziky',
    techdescTitle: "Technický přehled",
    techDescription: 'Bot je závislý na knihovnách a proto jeho kompatibilita s verzemi hry může měnit. Pro připojení robota je nutné spustit server a umožnit "cracked" mód který povoluje připojení hráču bez účtu Mojang. V jádru se totiž bot jeví jako hráč. ',
    perfBench: "Přehled příkazů",
    process: "Popis",
    latency: "Příkaz",
    follow: "Nasledovaní hráče",
    drop: "Dropování itemů",
    miney: "Těžení rud",
    map: "Obrana oblasti",
    raid: "Destrukce",
    continueConvo: "Navštívit projekt",
    inquireNow: "Github",
    goBack: "Zpět"
  },
  EN: {
    systemDoc: "Project Specification",
    status: "Environment",
    optimized: "Production / Live",
    logic: "Data Source",
    auth: "Main Stack",
    speed: "Hosting",
    desciptionTitle: "Description",
    defaultDescription: "This script adds a controllable bot to your Minecraft world. It's essentially a 'cheat' as the bot can detect ores, which might look like cheating to administrators. Use with caution.",
    techdescTitle: "Technical Overview",
    techDescription: "The bot depends on specific libraries; compatibility varies across game versions. Requires a 'cracked' mode server to allow connections without Mojang accounts.",
    perfBench: "Command Overview",
    process: "Description",
    latency: "Command",
    follow: "Follow player",
    drop: "Drop items",
    miney: "Mine ores",
    map: "Guard area",
    raid: "Destruction",
    continueConvo: "Visit Project",
    inquireNow: "Github",
    goBack: "Back"
  }
};

export default function ProjectDetailPage({ project, isDark, setIsDark, lang, setLang }) {
  const t = translations[lang] || translations.CZ;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const displayTitle =  "Mineflayer";
  const displaySubtitle = "utility bot";

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      isDark ? "bg-[#0a0a0a] text-white" : "bg-[#ffffff] text-black"
    }`}>
      
      {/* NAVBAR COMPONENT */}
      <Navigation 
        currentPage="projects"
        isDark={isDark}
        setIsDark={setIsDark} 
        lang={lang}
        setLang={setLang}
        forceBlack={!isDark}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* RETURN BUTTON */}
      <div className="fixed top-28 left-6 md:left-12 z-[100]">
        <button 
          onClick={() => window.history.back()}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${
            isDark 
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
              : "bg-black/5 border-black/10 text-black hover:bg-black/10"
          }`}
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">{t.goBack}</span>
        </button>
      </div>

      <header className="pt-64 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
              {t.systemDoc} // {project?.year || "2026"}
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase">
            {displayTitle}
            <br />
            <span className="text-orange-600">{displaySubtitle}</span>
          </h1>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-5 pb-64">
        <article className="space-y-24">
          
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-5">
              {t.desciptionTitle}
            </h2>
            <p className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}>
              {t.defaultDescription}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.techdescTitle}
            </h2>
            <p className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}>
              {t.techDescription}
            </p>
          </section>

          {/* COMMANDS TABLE */}
          <section>
            <h3 className="text-2xl font-bold tracking-tight mb-8">
              {t.perfBench}
            </h3>
            <div className={`rounded-3xl border overflow-hidden ${
              isDark ? "border-white/10" : "border-black/5"
            }`}>
              <table className="w-full text-left text-sm">
                <thead className={`border-b ${
                    isDark ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/5"
                }`}>
                  <tr>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">{t.process}</th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">{t.latency}</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-white/10" : "divide-black/5"}`}>
                  {[
                    { label: t.follow, val: "follow <player> / me" },
                    { label: t.drop, val: "drop <itemName>" },
                    { label: t.miney, val: "find <oreName>" },
                    { label: t.map, val: "guard <x> <y> <z>" },
                    { label: t.raid, val: "raid all / destroy all" }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-5 font-medium">{row.label}</td>
                      <td className="p-5 font-mono text-orange-600">{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* BOTTOM CTA */}
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">
            {t.continueConvo}
          </h2>
          <a
            href="https://github.com/SimpleCarrot42/MC-Bot"
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