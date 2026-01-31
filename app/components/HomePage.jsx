"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Globe, Cpu, Smartphone, Sparkles, Zap } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    heroSub: "Overview of all my projects and experiments. Documentation and more.",
    heroBtn1: "Explore Work",
    heroBtn2: "Contact Me",
    recentTitle: "Recent Projects",
    scrollHint: "Scroll horizontally to explore",
    aboutTitle: "I'm Marek Janasek — a developer focused on building modern web experiences.",
    aboutSub: "I specialize in frontend architecture, animation-driven interfaces, and systems built with clarity.",
    card1: "Engineering",
    card2: "Design Systems",
    card3: "Platforms"
  },
  CZ: {
    heroSub: "Přehled všech mých projektů a experimentů. Dokumentace projektů a mnohem víc.",
    heroBtn1: "Prozkoumat práci",
    heroBtn2: "Kontaktujte mě",
    recentTitle: "Nedávné projekty",
    scrollHint: "Prozkoumejte posunutím do strany",
    aboutTitle: "Jsem Marek Janásek — vývojář zaměřený na tvorbu moderních webových zážitků.",
    aboutSub: "Specializuji se na frontend architekturu, rozhraní poháněná animacemi a systémy stavěné s jasným úmyslem.",
    card1: "Inženýrství",
    card2: "Designové systémy",
    card3: "Platformy"
  }
};

export default function HomePage({ setCurrentPage, lang, isDark, allProjects }) {
  const t = translations[lang] || translations.EN;
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredProjects = allProjects?.slice(0, 5) || [];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
      {/* HERO */}
      <motion.header
        ref={heroRef}
        style={{ y, opacity }}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-6 flex items-center gap-2"
        >
          <Sparkles size={12} className="text-orange-600" />
          Portfolio // Marek Janasek
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="text-[16vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85]"
        >
          Portfolio <br />
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent italic font-light tracking-[-0.06em]">
            2026
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease }}
          className="opacity-60 text-lg md:text-xl max-w-2xl mt-8"
        >
          {t.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease }}
          className="flex gap-4 mt-12"
        >
          <button
            onClick={() => setCurrentPage("projects")}
            className={`px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 ${
              isDark ? 'bg-white text-black shadow-white/5' : 'bg-black text-white shadow-black/10'
            }`}
          >
            {t.heroBtn1}
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => setCurrentPage("contact")}
            className={`px-8 py-4 border-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
              isDark ? 'border-white text-white' : 'border-black text-black'
            }`}
          >
            {t.heroBtn2}
          </button>
        </motion.div>
      </motion.header>

      {/* PINNED PROJECTS */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-12"
        >
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4 flex items-center gap-2">
            <Zap size={12} className="text-orange-600" />
            Projects
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">{t.recentTitle}</h3>
        </motion.div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {featuredProjects.map((project, index) => {
              // 🛠️ FIX: Safely extract translated description and year key
              const descriptionText = typeof project.description === 'object' 
                ? (project.description[lang] || project.description.EN) 
                : project.description;
              
              const projectYear = project.year; // Changed from project_year

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease }}
                  className="min-w-[85vw] md:min-w-[500px] snap-center"
                >
                  <div
                    onClick={() => setCurrentPage("projects")}
                    className={`group relative rounded-[2.5rem] border p-10 md:p-12 h-[450px] flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-[#f9f9f9] border-black/5'
                    }`}
                  >
                    <div className="absolute -bottom-4 -right-4 text-[10rem] font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                      {projectYear}
                    </div>

                    <div className="flex justify-between items-start z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                        0{index + 1}
                      </span>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:rotate-45 ${
                        isDark ? 'bg-white text-black' : 'bg-black text-white'
                      }`}>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>

                    <div className="z-10">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                        {project.title}
                      </h2>
                      <p className="opacity-60 text-sm mb-6 line-clamp-2">
                        {descriptionText}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(project.tags) ? project.tags : [])?.slice(0, 3).map((tag) => (
                          <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="text-center mt-6 text-[10px] uppercase tracking-widest opacity-30 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
            {t.scrollHint}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-6">About</h2>
          <p className="text-3xl md:text-5xl font-medium leading-tight mb-8">
            {t.aboutTitle}
          </p>
          <p className="opacity-60 text-lg max-w-3xl mb-12">
            {t.aboutSub}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className={`rounded-3xl p-8 transition-all hover:-translate-y-2 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <Cpu className="mb-6 opacity-70" size={32} />
              <h3 className="font-bold text-lg mb-2">{t.card1}</h3>
              <p className="font-mono text-[10px] tracking-widest opacity-60">NEXT.JS / TURSO / DRIZZLE</p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 transition-all hover:-translate-y-2 shadow-xl shadow-orange-500/20">
              <Smartphone className="mb-6 opacity-90" size={32} />
              <h3 className="font-bold text-lg mb-2">{t.card2}</h3>
              <p className="font-mono text-[10px] tracking-widest opacity-80">FRAMER MOTION / TAILWIND</p>
            </div>

            <div className={`rounded-3xl border-2 p-8 transition-all hover:-translate-y-2 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              <Globe className="mb-6 opacity-60" size={32} />
              <h3 className="font-bold text-lg mb-2">{t.card3}</h3>
              <p className="font-mono text-[10px] tracking-widest opacity-60">WEB PLATFORMS / TOOLS</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}