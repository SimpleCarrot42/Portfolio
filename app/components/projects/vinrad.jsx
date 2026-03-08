"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Navigation from "../Navigation";

const ease = [0.16, 1, 0.3, 1];

const images = [
  {
    id: "h1",
    title: "Home",
    img: "/images/ProjectPageImages/vinrad/home.png",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "h2",
    title: "Login",
    img: "/images/ProjectPageImages/vinrad/login.png",
    span: "md:col-span-2 md:row-span-2",
  },
];

const project = {
  year: "2025",
  title: "Vinařský",
  subtitle: "Radar",
};

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
      "Webová aplikace propojující moravské vinaře s jejich návštěvníky. Mnoho malých vinařů na Moravě má ve svých vinných sklepech nepravidelnou otevírací dobu, takže turisté často bloudí a nevědí, který vinný sklep má zrovna otevřeno. Aplikace proto přehledně zobrazuje mapu s barevně odlišenými špendlíky: zelené označují sklepy, které mají právě otevřeno, červené ty, které jsou právě zavřené. Vinař nastavuje stav svého sklepa na svém mobilním telefonu v reálném čase. Projekt je zatím ve vývoj, rád bych ji letos na jaře spustil do reálného provozu a v budoucnu bych ji rád monetizoval.",
    techdescTitle: "Technický přehled",
    techDescription:
      "Tento projekt kombinuje moderní framework a Postgres databází. Databáze je zabezpečena pravidly RLS a nahlašévaní do ní je chráněno službou CloudFlare Turnstile. Databáze je s frontendem sychronizovana v realném čase. Mapa je poskytována službou OpenStreet Maps a mám jí v plánu upgradovat. Celá aplikace má též integrovaný sýstém pro management vinařů - grafické emaily například pro obnovu hesel atd.",
    perfBench: "Přehled technologií",
    process: "Vrstva",
    latency: "Technologie",
    backend: "Databáze a Backend",
    hydration: "Frontend Framework",
    styling: "Styling",
    security: "Zabezpečení",
    map: "Mapa",
    continueConvo: "Navštívit projekt",
    inquireNow: "vinarskyradar.cz",
    goBack: "Zpět",
  },
  EN: {
    systemDoc: "Project Specification",
    desciptionTitle: "Description",
    defaultDescription:
      "A web application connecting Moravian winemakers with their visitors. Many small wineries in Moravia have irregular opening hours, so tourists often wander without knowing which cellar is open. The app displays a map with color-coded pins: green for open cellars, red for closed ones. Winemakers update their status in real time from their mobile phones. The project is still in development — I plan to launch it this spring and monetize it in the future.",
    techdescTitle: "Technical Overview",
    techDescription:
      "This project combines a modern framework with a Postgres database. The database is secured with RLS rules and submissions are protected by CloudFlare Turnstile. The database is synchronized with the frontend in real time. The map is provided by OpenStreet Maps with an upgrade planned. The app also includes an integrated winery management system — including branded emails for password resets, etc.",
    perfBench: "Tech Overview",
    process: "Layer",
    latency: "Technology",
    backend: "Database & Backend",
    hydration: "Frontend Framework",
    styling: "Styling",
    security: "Security",
    map: "Map",
    continueConvo: "Visit Project",
    inquireNow: "vinarskyradar.cz",
    goBack: "Back",
  },
};

export default function ProjectPage({ isDark, setIsDark, lang, setLang }) {
  const t = translations[lang] || translations.CZ;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
              {t.systemDoc} // {project.year}
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-[-0.07em] uppercase">
            {project.title}
            <br />
            <span className="text-orange-600">{project.subtitle}</span>
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
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.defaultDescription}
            </p>
          </section>

          <div className="flex flex-col items-center justify-center text-center">
            <a
              href="https://vinarskyradar.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-orange-600 text-white rounded-full font-bold flex items-center gap-3 hover:bg-orange-700 transition-all shadow-lg"
            >
              <span className="w-5 h-5 flex items-center justify-center bg-white text-orange-600 rounded-full">
                <ExternalLink size={12} />
              </span>
              {t.inquireNow}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
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
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.techDescription}
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold tracking-tight mb-8">
              {t.perfBench}
            </h3>
            <div
              className={`rounded-3xl border overflow-hidden ${
                isDark ? "border-white/10" : "border-black/5"
              }`}
            >
              <table className="w-full text-left text-sm">
                <thead
                  className={`border-b ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-black/[0.02] border-black/5"
                  }`}
                >
                  <tr>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">
                      {t.process}
                    </th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-widest opacity-40">
                      {t.latency}
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? "divide-white/10" : "divide-black/5"
                  }`}
                >
                  <tr>
                    <td className="p-5 font-medium">{t.hydration}</td>
                    <td className="p-5 font-mono text-orange-600">React (Pure)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.styling}</td>
                    <td className="p-5 font-mono text-orange-600">Vanilla CSS</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.backend}</td>
                    <td className="p-5 font-mono text-orange-600">PostgreSQL @ Supabase</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.security}</td>
                    <td className="p-5 font-mono text-orange-600">CloudFlare Turnstile</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">{t.map}</td>
                    <td className="p-5 font-mono text-orange-600">OpenStreet Maps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">
            {t.continueConvo}
          </h2>
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