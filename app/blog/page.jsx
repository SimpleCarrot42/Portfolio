"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation.tsx";
import AboutPage from "../components/BlogPage.jsx";

export default function AboutRoute() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("CZ");
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme !== null) setIsDark(savedTheme === "true");
    if (savedLang !== null) setLang(savedLang);
    setIsLoaded(true);
  }, []);

  const toggleTheme = (val) => {
    setIsDark(val);
    localStorage.setItem("theme", val);
  };

  const toggleLang = (val) => {
    setLang(val);
    localStorage.setItem("lang", val);
  };

  if (!isLoaded) return <div className={isDark ? "bg-[#0a0a0a]" : "bg-white"} style={{ minHeight: '100vh' }} />;

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
      <Navigation 
        currentPage="about"
        setCurrentPage={(key) => {
          if (key !== "about") window.location.href = "/";
        }} 
        isDark={isDark}
        setIsDark={toggleTheme}
        lang={lang}
        setLang={toggleLang}
      />

      <div className="pt-24">
        <AboutPage isDark={isDark} lang={lang} />
      </div>
    </main>
  );
}