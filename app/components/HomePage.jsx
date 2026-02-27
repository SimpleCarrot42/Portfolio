"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    heroSub: "Overview of all my projects and experiments. Documentation and more.",
    heroBtn1: "Explore Work",
    heroBtn2: "Contact Me",
    recentTitle: "Recent Projects",
    scrollHint: "Scroll horizontally to explore",
  },
  CZ: {
    heroSub: "Přehled všech mých projektů a experimentů. Dokumentace projektů a mnohem víc.",
    heroBtn1: "Prozkoumat práci",
    heroBtn2: "Kontaktujte mě",
    recentTitle: "Nedávné projekty",
    scrollHint: "Prozkoumejte posunutím do strany",
  }
};

export default function HomePage({ setCurrentPage, lang, allProjects }) {
  const t = translations[lang] || translations.EN;
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredProjects = allProjects?.filter(p => p.pinned === true) || [];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-orange-100">

      {/* HERO */}
      <motion.header
        ref={heroRef}
        style={{ y, opacity }}
        className="min-h-[90vh] flex flex-col justify-center px-5 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-0 relative overflow-hidden bg-white"
      >
        <motion.p className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-6 flex items-center gap-2">
          <Sparkles size={12} className="text-orange-600" />
          Portfolio // Marek Janasek
        </motion.p>

        <motion.h1 className="relative z-10 text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] sm:leading-[0.85] tracking - [0.3]">
          Portfolio <br />
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent italic font-light tracking-[-0.06em]">
            2026
          </span>
        </motion.h1>

        <motion.p className="relative z-10 opacity-60 text-base sm:text-lg md:text-xl max-w-xl mt-6 sm:mt-8 font-medium">
          {t.heroSub}
        </motion.p>

        <motion.div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10 sm:mt-12 w-full sm:w-auto">
          <button
            onClick={() => setCurrentPage("projects")}
            className="w-full sm:w-auto px-6 py-4 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-black text-white shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
          >
            {t.heroBtn1}
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => setCurrentPage("contact")}
            className="w-full sm:w-auto px-6 py-4 border-2 border-black text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white hover:scale-105 transition-all"
          >
            {t.heroBtn2}
          </button>
        </motion.div>
      </motion.header>

      {/* PROJECTS */}
      <section className="py-20 md:py-32 px-5 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        <motion.div className="mb-10 sm:mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-600 mb-4 flex items-center gap-2">
            <Zap size={12} fill="currentColor" />
            Projects
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t.recentTitle}
          </h3>
        </motion.div>

        <div className="relative">
          <div
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {featuredProjects.map((project, index) => {
              const descriptionText =
                typeof project.description === "object"
                  ? project.description[lang] || project.description.EN
                  : project.description;

              return (
                <motion.div
                  key={project.id}
                  className="min-w-[90%] sm:min-w-[80%] md:min-w-[500px] snap-center"
                >
                  <div
                    onClick={() =>
                      (window.location.href = `/projects/${project.slug}`)
                    }
                    className="group relative rounded-[2rem] sm:rounded-[2.5rem] border border-black/5 bg-[#f9f9f9] p-6 sm:p-8 md:p-12 h-auto sm:h-[420px] md:h-[450px] flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="absolute -bottom-4 -right-4 text-[8rem] sm:text-[10rem] font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                      {project.year}
                    </div>

                    <div className="flex justify-between items-start z-10">
                      <span className="text-[10px] font-bold uppercase opacity-30">
                        0{index + 1}
                      </span>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    <div className="z-10">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                        {project.title}
                      </h2>

                      <p className="opacity-60 text-sm mb-6 leading-relaxed">
                        {descriptionText}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(project.tags) ? project.tags : [])
                          .slice(0, 3)
                          .map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-[10px] font-bold border border-black/10 bg-white/50"
                            >
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
        </div>
      </section>
    </div>
  );
}