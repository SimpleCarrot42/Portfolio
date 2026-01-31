"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  EN: {
    archive: "Archive // Full Collection",
    selected: "Selected",
    works: "Works",
    viewDetail: "View",
    detailDesc: "Project Detail",
  },
  CZ: {
    archive: "Archiv // Kompletní sbírka",
    selected: "Vybrané",
    works: "Práce",
    viewDetail: "Zobrazit",
    detailDesc: "Detailní popis",
  },
};

export default function ProjectsPage({
  allProjects = [],
  lang = "EN",
  isDark = true,
}) {
  const t = translations[lang] || translations.EN;

  // 1. Function to handle URL change based on project slug
  const handleNavigation = (slug) => {
    if (slug) {
      window.location.href = `/projects/${slug}`;
    }
  };

  const getTranslation = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.EN || "";
  };

  return (
    <div
      className={`min-h-screen pt-40 px-6 md:px-12 lg:px-24 pb-20 ${
        isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <header className="mb-48">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2 opacity-40"
          >
            <Sparkles size={12} className="text-orange-600" />
            {t.archive}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }}
            className="text-[15vw] md:text-[10vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase"
          >
            {t.selected}
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent italic font-light">
              {t.works}
            </span>
          </motion.h1>
        </header>

        {/* PROJECTS */}
        <div className="flex flex-col gap-64">
          {allProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id ?? index}
                initial={index === 0 ? false : { opacity: 0, y: 60 }}
                animate={index === 0 ? { opacity: 1, y: 0 } : undefined}
                whileInView={index !== 0 ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-16 md:gap-32`}
              >
                {/* IMAGE */}
                <div className="w-full lg:w-3/5">
                  <button
                    onClick={() => handleNavigation(project.slug)}
                    className={`w-full aspect-[16/10] rounded-3xl flex items-center justify-center
                      px-6 md:px-10 lg:px-14 transition-all duration-500 hover:opacity-80
                      ${isDark ? "bg-neutral-900" : "bg-neutral-100"}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain"
                      draggable={false}
                    />
                  </button>
                </div>

                {/* TEXT */}
                <div className="w-full lg:w-2/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-8 bg-orange-600/30" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                      {getTranslation(project.category)}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    {project.title}
                  </h2>

                  <p className="text-lg mb-8 max-w-md opacity-60">
                    {getTranslation(project.description)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white/60"
                            : "bg-black/5 border-black/10 text-black/60"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleNavigation(project.slug)}
                    className="group flex items-center gap-4"
                  >
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-full border transition-colors duration-500 ${
                        isDark
                          ? "border-white/10 group-hover:bg-white"
                          : "border-black/10 group-hover:bg-black"
                      }`}
                    >
                      <ArrowRight
                        size={20}
                        className={
                          isDark
                            ? "text-white group-hover:text-black"
                            : "text-black group-hover:text-white"
                        }
                      />
                    </div>

                    <div className="text-left">
                      <span className="block text-[10px] font-bold uppercase tracking-widest opacity-40">
                        {t.viewDetail}
                      </span>
                      <span className="text-base font-bold uppercase">
                        {t.detailDesc}
                      </span>
                    </div>
                  </button>

                  <div className="mt-8 text-8xl font-black text-orange-600/10 select-none">
                    {project.year}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. THE SLICK LINE (BOTTOM SEPARATOR) */}
        <div 
          className="w-full h-[1px] mt-64 opacity-10" 
          style={{ backgroundColor: isDark ? "#ffffff" : "#000000" }} 
        />
      </div>
    </div>
  );
}