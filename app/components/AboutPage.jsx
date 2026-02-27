"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Code2, Terminal, Cpu, Binary, Globe, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function AboutPage({ lang = "CZ" }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewType, setViewType] = useState("hobby");

  const translations = {
    EN: {
      greeting: "Marek Janasek",
      heading: "Computers / Logic / Exploration",
      bio: `I’m the creator of this website, built with a modern Next.js and Tailwind CSS stack to showcase my portfolio.
      
      As a 9th-grade student at ZŠ Kunratice, I aim to continue my studies at SSPŠ. My primary focus is Cyber Security, with Gymnasium as my second choice.
      
      My passion for technology started early; I began experimenting with Arduino in 5th grade and 3D printing in 7th. Over the past two years, I've completed five summer schools and three Hackdays at SSPŠ.
      
      Outside of IT, I enjoy mountain hiking, playing basketball for five years, and studying languages. I hold a Cambridge B1 certificate in English. I believe SSPŠ is the perfect environment to turn my experiments into professional skills.`,
      hobbyHeading: "Beyond the code",
      certHeading: "Proof of work",
    },
    CZ: {
      greeting: "Marek Janásek",
      heading: "Počítače / Logika / Objevování",
      bio: `Jsem autorem tohoto webu postaveného v moderním stacku Next.js a Tailwind CSS, na kterém představuji portfolio svých projektů.
      
      Jako žák 9. třídy ZŠ Kunratice bych rád pokračoval ve studiu na SSPŠ, a proto se hlásím k přijímacím zkouškám na obor Kybernetické bezpečnosti (1. volba) a Gymnázium (2. volba).
      
      Zájem o techniku mám již od mala; v páté třídě jsem začal experimentovat s Arduinem a v sedmé třídě s 3D tiskárnou. V posledních dvou letech jsem na SSPŠ absolvoval celkem pět letních škol a tři Hackdays. 
      
      Mimo IT se věnuji horské turistice a sportům, basketbal hraji již pět let. Také studuji němčinu a angličtinu, ve které mám úroveň B1 (Cambridge certifikát). Myslím si, že SSPŠ pro mě představuje ideální prostředí, kde bych své experimenty posunul v profesionální dovednosti.`,
      hobbyHeading: "Volný čas",
      certHeading: "Výsledky práce",
    }
  };

  const t = translations[lang] || translations["CZ"];
  
  // Performance fix: split bio only when lang changes
  const bioParagraphs = useMemo(() => t.bio.split('\n').filter(p => p.trim()), [t.bio]);

  const hobbies = [
    { id: 'h1', title: "Mountain Hiking", img: "/images/hobbies/hiking.jpg", span: "md:col-span-2 md:row-span-2" },
    { id: 'h2', title: "Travel", img: "/images/hobbies/travel.jpg", span: "md:col-span-1 md:row-span-1" },
    { id: 'h3', title: "Skiing", img: "/images/hobbies/ski.jpg", span: "md:col-span-1 md:row-span-1" },
  ];

  const certificates = [
    { id: 'c1', title: "Hackdays Winner", type: "AWARD", img: "/images/certificats/hackdays1.jpg", date: "2024" },
    { id: 'c4', title: "Cambridge B1", type: "LANG", img: "/images/certificats/cambridgeb1.png", date: "2023" }, 
    { id: 'c2', title: "Python Specialist", type: "CERT", img: "/images/certificats/vzb.png", date: "2024" },
    { id: 'c3', title: "Hackdays Finalist", type: "AWARD", img: "/images/certificats/hackdays2.jpg", date: "2023" },
  ];

  const navigate = (direction) => {
    const list = viewType === 'hobby' ? hobbies : certificates;
    const newIndex = (currentIndex + direction + list.length) % list.length;
    setCurrentIndex(newIndex);
    setSelectedImg(list[newIndex]);
  };

  return (
    <section id="about" className="relative min-h-screen bg-[#FDFDFD] text-[#121212] pt-24 pb-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      
      {/* 1. HERO SECTION */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-48">
        
        {/* Profile Image - STATIC (No sticky, no lag) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 bg-white"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-100 shadow-xl">
            <img src="/images/me/me.jpeg" alt="Marek" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
          </div>
          
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-widest opacity-50">Active • 2026 Status</span>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-orange-600" />
              <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-[11px]">
                {t.heading}
              </p>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85]">
              {t.greeting}
            </h1>

            <div className="space-y-8">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="text-xl md:text-2xl text-neutral-600 leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
          
          <div className="flex items-center gap-6 pt-6 opacity-20">
             <Terminal size={24} />
             <Code2 size={24} />
             <Cpu size={24} />
             <Binary size={24} />
             <Globe size={24} />
          </div>
        </div>
      </div>

      {/* 2. GALLERY */}
      <div className="mb-48">
        <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-neutral-400 mb-10">
           {t.hobbyHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hobbies.map((hobby, idx) => (
            <div 
              key={hobby.id}
              onClick={() => {setSelectedImg(hobby); setCurrentIndex(idx); setViewType('hobby');}}
              className={`${hobby.span} relative rounded-[2rem] overflow-hidden cursor-pointer border border-neutral-100 bg-neutral-50 min-h-[300px] hover:shadow-lg transition-shadow`}
            >
              <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-8 left-8">
                 <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
                    {hobby.title}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CERTIFICATES */}
      <div>
        <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-neutral-400 mb-10">
           {t.certHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, idx) => (
            <div 
              key={cert.id}
              onClick={() => {setSelectedImg(cert); setCurrentIndex(idx); setViewType('cert');}}
              className="cursor-pointer group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-white border border-neutral-200 shadow-sm group-hover:shadow-md transition-all">
                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{cert.date}</span>
              <h3 className="text-lg font-bold text-neutral-900 leading-tight">{cert.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-xl flex flex-col p-6"
            onClick={() => setSelectedImg(null)}
          >
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto mb-4">
                <span className="text-[11px] font-black tracking-[0.3em] text-orange-600 uppercase">{selectedImg.title}</span>
                <button className="p-3 bg-neutral-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
               <motion.img 
                 initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                 src={selectedImg.img} 
                 className="max-h-[80vh] w-auto shadow-2xl rounded-lg" 
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}