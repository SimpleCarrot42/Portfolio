"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import Navigation from "../Navigation";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1];

const translations = {
  CZ: {
    systemDoc: "Specifikace projektu",
    desciptionTitle: "Předmluva",
    defaultDescription:
      "Tento projekt, který se primárně skládá z čištění, nastavení a zprovoznění mého homeserveru, mě v mnohém obohatil. Kromě toho, že jsem prakticky uplatnil své zkušenosti nabyté na letní škole hardwaru a znalosti Linuxu, jsem si uvědomil, jak nelehké to občas může být – a o co horší je, když to člověk chce dokumentovat pro videa přiložená níže.",
    ep1title: "Ep. 1 – Čištění starého laptopu",
    ep1desc:
      "Homeserver běží na starém ThinkPadu T410 z roku 2010. Předtím než jsem jej mohl začít používat, vyměnil jsem termální pastu, starý HDD disk a mechaniku CD/DVD. Mechaniku CD/DVD jsem zaměnil za disk caddy – tedy další port pro připojení 2,5 palcového disku. Tam jsem umístil originální HDD disk, který jsem v hlavním slotu nahradil za SSD. Moje sestava se tedy skládá z počítače s procesorem Intel Core i7 a 4 GB DDR3 RAM. Disky jsou uspořádány následovně: 128GB SSD slouží jako boot drive a 250GB HDD jako úložiště méně důležitých souborů. Ve videu můžete vidět, jak počítač opravuji a připravuji pro serverové využití.",
    ep2title: "Ep. 2 – Instalace Alpine Linuxu",
    ep2desc:
      "Jelikož specifikace mého nového serveru jsou velmi omezující, rozhodl jsem se pro distribuci Alpine Linux. Tato distribuce je pro servery velmi netradiční, ale vybral jsem si ji z několika důvodů. Jednak je velmi tzv. lightweight – nevyužívá příliš mnoho RAM atd. Též se jedná o distribuci orientovanou na bezpečnost. Tato neobvyklá volba má však i svá negativa. Oproti mému předchozímu serveru s distribucí Ubuntu je Alpine svým minimalismem trochu limitující. Používá totiž jiné systémové utility, které nemusí být podporovány aplikacemi, jež na něm chceme spouštět. Řešením tohoto problému se zabývá 3. epizoda. Ve videu se dozvíte, jak nainstalovat systém Alpine, kvůli chybě ve střihu však chybí ukázka samotného bootování.",
    ep3title: "Ep. 3 – Nastavení aplikací a služeb",
    ep3desc:
      "Bohužel kvůli přílišným potížím a práci spojené s natáčením dokumentačního videa je pro poslední kroky nastavení k dispozici pouze popis. Jako první jsem pomocí příkazů níže nainstaloval základní aplikace a ujistil se, že fungují. Poté jsem nainstaloval Docker pro virtualizaci služeb. Jak jsem již zmínil, Alpine je svým minimalismem v tomto ohledu lehce nepraktický. Museli jsme tedy každou aplikaci umístit do tzv. Docker containeru – můžeme si to představit jako malou přihrádku plně izolovanou od hlavního systému. Tuto přihrádku nijak neovlivňuje hlavní systém, a oproti klasické virtualizaci je Docker mnohem méně náročný na využití RAM. Připravil jsem tedy soubor, který obsahoval instrukce pro Docker a služby, které jsem chtěl spustit. Pak už jsem jen spustil finální příkaz a aplikace donastavil v jejich webových průvodcích. Přehled aplikací můžete vidět v tabulce níže.",
    endRemTitle: "Závěr",
    endRemarks:
      "Tento projekt mě v mnohém obohatil, a když nyní píši tento závěr, musím říct, že jsem na něj docela pyšný. Odvedl jsem dobrou práci na jeho dokumentaci. Jediná škoda je, že jsem v ní nepokračoval; stává se mi často, že mnoho projektů takto nedokončím.",
    perfBench: "Přehled služeb",
    process: "Název",
    latency: "Popis",
    continueConvo: "Navštívit projekt",
    inquireNow: "YouTube",
    goBack: "Zpět",
    envSetup: "Instalační příkazy",
  },
  EN: {
    systemDoc: "Project Specification",
    desciptionTitle: "Preface",
    defaultDescription:
      "This project focused on refurbishing, configuring, and deploying my home server. It was a great way to apply my hardware and Linux knowledge, while learning the challenges of documenting the process for video.",
    ep1title: "Ep. 1 - Cleaning the Old Laptop",
    ep1desc:
      "The home server runs on a 2010 ThinkPad T410. I replaced the thermal paste, swapped the old HDD for an SSD, and replaced the DVD drive with a caddy for secondary storage. It features an Intel Core i7 and 4GB DDR3 RAM.",
    ep2title: "Ep. 2 - Alpine Linux Installation",
    ep2desc:
      "I chose Alpine Linux for its lightweight footprint and security-focused design. While its minimalism can be limiting compared to Ubuntu, it's perfect for maximizing older hardware.",
    ep3title: "Ep. 3 - Apps & Services",
    ep3desc:
      "I used Docker to containerize all services, ensuring isolation and efficiency. Key services include NextCloud and Jellyfin, managed via Docker Compose.",
    endRemTitle: "Conclusion",
    endRemarks:
      "I'm proud of the documentation I created for this project, even though I have a tendency to move on to new projects before every single detail is finished.",
    perfBench: "Services Overview",
    process: "Name",
    latency: "Description",
    continueConvo: "Visit Project",
    inquireNow: "YouTube",
    goBack: "Back",
    envSetup: "Installation Commands",
  },
};


const CodeBlock = ({ code, filename, isDark }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`my-10 rounded-2xl overflow-hidden border ${
      isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-[#f9f9f9]'
    }`}>
      <div className={`flex justify-between items-center px-5 py-3 border-b ${
        isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-white'
      }`}>
        <span className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">{filename}</span>
        <button onClick={copy} className="opacity-40 hover:opacity-100 transition-opacity">
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className={`p-6 overflow-x-auto text-sm font-mono leading-relaxed ${
        isDark ? 'text-white/70' : 'text-black/70'
      }`}>
        <code>{code}</code>
      </pre>
    </div>
  );
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

  const displayTitle = "Homeserver";
  const displaySubtitle = "";

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

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* Back Button */}
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

      {/* Header */}
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
            <p
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.defaultDescription}
            </p>
          </section>

          {/* TECH OVERVIEW */}
          <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.ep1title}
            </h2>
            <p
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.ep1desc}
            </p>
          </section>

          {/* VIDEOS */}
            <div
              className={`rounded-3xl overflow-hidden border ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
            >
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/toCYZlObQCQ"
                  title="Homeserver Ep.1"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.ep2title}
            </h2>
            <p
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.ep2desc}
            </p>
          </section>
            <div
              className={`rounded-3xl overflow-hidden border ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
            >
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/n5z5mdBiQUA"
                  title="Homeserver Ep.2"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            <section>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.ep3title}
            </h2>
            <p
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.ep3desc}
            </p>
          </section>
          <section>
          <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">
              {t.endRemTitle}
            </h2>
            <p
              className={`text-lg leading-relaxed max-w-7xl ${
                isDark ? "text-white/60" : "text-black/70"
              }`}
            >
              {t.endRemarks}
            </p>
          </section>
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-30 mb-6">{t.envSetup}</h3>
            <CodeBlock 
              isDark={isDark}
              filename="Shell"
              code={`# Instalace zakladních aplikací. \napk add sudo wget nano btop sl\n# Instalace Docker\napk add docker docker-cli docker-compose\n\n# Stažení souboru docker-comose.yml\nwget https://raw.githubusercontent.com/SimpleCarrot42/ServerScript/refs/heads/main/docker-compose.yml\n# Spuštění Dockeru\ndocker compose up -d`}
            />
          </section>

          {/* COMMAND TABLE */}
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
                  {[
                    { label: "NextCloud", val: "Vlastní cloud servis" },
                    { label: "Jellfin", val: "Server na streamováni medií" },
                    { label: "PiHole", val: "AdBlock" },
                    { label: "Watchtower", val: "Monitoring docker containerů" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-5 font-medium">{row.label}</td>
                      <td className="p-5 font-mono text-orange-600">{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </article>


        {/* CTA */}
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">
            {t.continueConvo}
          </h2>

          <a
            href="https://www.youtube.com/@JohnAccorso"
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