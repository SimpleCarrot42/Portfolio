"use client";

import { useState, useEffect } from "react";
import Portfolio from "../components/Portfolio"; 
import Navigation from "../components/Navigation";
import { projects } from "../data/projects";

export default function PortfolioRoute() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("CZ");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme !== null) setIsDark(savedTheme === "true");
    if (savedLang !== null) setLang(savedLang);
    setIsLoaded(true);
  }, []);

  const handleSetIsDark = (val) => {
    setIsDark(val);
    localStorage.setItem("theme", val);
  };

  const handleSetLang = (val) => {
    setLang(val);
    localStorage.setItem("lang", val);
  };

  if (!isLoaded) return <div className={isDark ? "bg-[#0a0a0a]" : "bg-white"} style={{ minHeight: '100vh' }} />;

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
      <Navigation 
        currentPage="portfolio"
        setCurrentPage={(key) => { if (key !== "portfolio") window.location.href = "/"; }} 
        isDark={isDark}
        setIsDark={handleSetIsDark}
        lang={lang}
        setLang={handleSetLang}
      />
      <Portfolio allProjects={projects} isDark={isDark} lang={lang} />
    </main>
  );
}