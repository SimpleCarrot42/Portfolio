"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Navigation from "./Navigation";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  CZ: {
    systemDoc: "Specifikace projektu",
    desciptionTitle: "Čestné uznání",
    proluge: "Uznání pro účely pohovorové komise Smíchovské střední průmyslové školy gymnázia a hotelové školy Radlická. ",
    defaultDescription:
      "Já Marek Janásek, majitel a vývojář této webové stánky, zde uvádím nasledující informace pro účely pohovorové komise Smíchovské střední průmyslové školy gymnázia a hotelové školy Radlická. K vývoji této webové aplikace byli užity nástroje generativní umělé inteligence (dále jen AI), specificky Antropic Claude a Gemini. AI nebyla užita k tvorbě žádneho textu na této stránce pouze k jejich gramatické korektuře. AI byla primarně užita jako nástroj pro mé učení a seznámení s novým programovacím jazykem a tvorbě vzorů k úpravě. S interním fungovaním webowé stránky jsem plně seznámen.",
    goBack: "Zpět",
  },

};

export default function ProjectDetailPage({ project, isDark, setIsDark, lang, setLang }) {
  const t = translations[lang] || translations.CZ;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const displayTitle = "Užití";
  const displaySubtitle = "AI";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        isDark ? "bg-[#0a0a0a] text-white" : "bg-[#ffffff] text-black"
      }`}
    >
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

      {/* HEADER */}
      <header className="pt-64 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
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

          {/* TECHNICAL OVERVIEW */}
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.techdescTitle}
            </h2>
            <p className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}>
              {t.techDescription}
            </p>
          </section>

         </article>
      </main>
    </div>
  );
}