"use client";

import { useState } from "react";
import AiUsage from "../components/AiUsage";
import Navigation from "../components/Navigation";
import { projects } from "../data/projects";

export default function AiUsageRoute() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("CZ");

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
      <Navigation
        currentPage="aiusage"
        setCurrentPage={(key) => { if (key !== "aiusage") window.location.href = "/"; }}
        isDark={false}
        setIsDark={() => {}}
        lang={lang}
        setLang={setLang}
      />
      <AiUsage allProjects={projects} isDark={false} lang={lang} />
    </main>
  );
}