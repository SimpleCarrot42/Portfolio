"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navigation from "../Navigation";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  CZ: {
    systemDoc: "Specifikace projektu",
    desciptionTitle: "Popis",
    defaultDescription:
      "Terminal Clock je minimalistická aplikace, která zobrazuje čas přímo v terminálu. Projekt byl vytvořen jako experiment s jednoduchým CLI rozhraním a realtime aktualizací času.",
    techdescTitle: "Technický přehled",
    techDescription:
      "Program běží přímo v terminálu a využívá jednoduchý loop pro aktualizaci času každou sekundu. Využívá knihovny Textual a psutil, které je nutné před spuštěním nainstalovat.",
    perfBench: "Přehled příkazů",
    process: "Popis",
    latency: "Příkaz",
    continueConvo: "Navštívit projekt",
    inquireNow: "GitHub",
    goBack: "Zpět",
  },
  EN: {
    systemDoc: "Project Specification",
    desciptionTitle: "Description",
    defaultDescription:
      "Terminal Clock is a minimal command line application that displays a live updating clock directly inside the terminal. The project focuses on simplicity, performance, and clean CLI output.",
    techdescTitle: "Technical Overview",
    techDescription:
      "The application runs entirely in the terminal and refreshes the displayed time every second. It uses standard system time functions together with ANSI escape sequences to redraw the interface efficiently.",
    perfBench: "Command Overview",
    process: "Description",
    latency: "Command",
    continueConvo: "Visit Project",
    inquireNow: "GitHub",
    goBack: "Back",
  },
};

const images = [
  {
    id: "h1",
    title: "Ukázka terminálu",
    img: "/images/ProjectPageImages/terminalclock/home.png",
  }
];

export default function ProjectDetailPage({ project, isDark, setIsDark, lang, setLang }) {
  const t = translations[lang] || translations.CZ;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const displayTitle = "Terminal";
  const displaySubtitle = "Clock";

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        isDark ? "bg-[#0a0a0a] text-white" : "bg-[#ffffff] text-black"
      }`}
    >
      <Navigation
        currentPage="projects"
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

      <div className="fixed top-28 left-6 md:left-12 z-[100]">
        <button
          onClick={handleBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-sm ${
            isDark
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
              : "bg-black/5 border-black/10 text-black hover:bg-black/10"
          }`}
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">
            {t.goBack}
          </span>
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
          {/* DESCRIPTION */}
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-5">
              {t.desciptionTitle}
            </h2>
            <p className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}>
              {t.defaultDescription}
            </p>
          </section>

          {/* IMAGE SECTION - Adjusted to match text width */}
          <section className="w-full">
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative rounded-[2rem] overflow-hidden border ${
                  isDark ? "border-white/10" : "border-black/10"
                } w-full aspect-video md:aspect-[21/9] hover:shadow-lg transition-shadow`}
              >
                <img
                  src={image.img}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-8 left-8">
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
                    {image.title}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* TECH OVERVIEW */}
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.techdescTitle}
            </h2>
            <p className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}>
              {t.techDescription}
            </p>
          </section>
        </article>

        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">{t.continueConvo}</h2>
          <a
            href="https://github.com/SimpleCarrot42/terminal-clock"
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