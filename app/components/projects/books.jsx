"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import Navigation from "../Navigation";

const ease = [0.16, 1, 0.3, 1];

const images = [
  {
    id: "h1",
    title: "Home",
    img: "/images/ProjectPageImages/books/home.png",
  },
  {
    id: "h2",
    title: "Detail knihy",
    img: "/images/ProjectPageImages/books/detail.png",
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
    defaultDescription:
      "Jedna z mých prvních webových stránek která ověřila znalosti získané na letní škole, zobrazuje knihy ktéré jsem prečetl v roce 2024. Poté už jsem knihy další knihy nepřidával. Motivací bylo digitalizovat můj školní čtenářský deník, a otestovat své znalosti.",
    techdescTitle: "Technický přehled",
    techDescription:
      "Celý web je velmi jednoduchý a je postavený na HTML,CSS,JS. Projekt néma databázi s kterými jsem v době vývoje neuměl pracovat, a proto jsou likes/dislikes ukládány pouze lokálně. Habruger menu je též pouze experimentálni a chtěl jsem si sním pohrát, podstránky vněm uváděné neexistují. Uznávám že jsem je mohl dodělat ale byl jsem pln nadšení pro další projekty",
    perfBench: "Přehled příkazů",
    process: "Popis",
    latency: "Příkaz",
    follow: "Nasledovaní hráče",
    drop: "Dropování itemů",
    miney: "Těžení rud",
    map: "Obrana oblasti",
    raid: "Destrukce",
    continueConvo: "Navštívit projekt",
    inquireNow: "Github Repo",
    inquireNow2: "Books",
    goBack: "Zpět",
  },
};

export default function ProjectDetailPage({
  project,
  isDark,
  setIsDark,
  lang,
  setLang,
}) {
  const t = translations[lang] || translations.CZ;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const displayTitle = "Books";
  const displaySubtitle = null;

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
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-5">
              {t.desciptionTitle}
            </h2>
            <p
              className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}
            >
              {t.defaultDescription}
            </p>
          </section>

          {/* OBRAZKY SEM*/}
          <div className="grid grid-cols-2 gap-6">
            {images.map((image, idx) => (
              <div
                key={image.id}
                onClick={() => {
                  setSelectedImg(image);
                  setCurrentIndex(idx);
                  setViewType("hobby");
                }}
                className="relative rounded-[2rem] overflow-hidden cursor-pointer border border-neutral-100 bg-neutral-50 h-[350px] hover:shadow-lg transition-shadow"
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
          </div>

          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.techdescTitle}
            </h2>
            <p
              className={`text-lg leading-relaxed max-w-7xl ${isDark ? "text-white/60" : "text-black/70"}`}
            >
              {t.techDescription}
            </p>
          </section>
        </article>

        {/* BOTTOM CTA */}
        <div className="flex flex-col items-center justify-denter mt-32 text-center">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-10">
            {t.continueConvo}
          </h2>
          <div className="flex gap-6">
            <a
              href="https://github.com/SimpleCarrot42/Books"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold flex items-center gap-3 hover:bg-orange-700 transition-all hover:sclae-105 active:scale-95 shadow-xl shadow-orange-600/20"
            >
              {t.inquireNow} <ExternalLink size={18}></ExternalLink>
            </a>
            <a
              href="https://simplecarrot42.github.io/Books/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold flex items-center gap-3 hover:bg-orange-700 transition-all hover:sclae-105 active:scale-95 shadow-xl shadow-orange-600/20"
            >
              {t.inquireNow2} <ExternalLink size={18}></ExternalLink>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
