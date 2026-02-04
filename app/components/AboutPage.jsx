"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Award, Camera, ChevronLeft, ChevronRight, 
  Code2, Terminal, Zap, Globe, Cpu, Binary
} from "lucide-react";

export default function AboutPage({ lang }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewType, setViewType] = useState("hobby");

  const t = {
    EN: {
      greeting: "Marek Janasek",
      heading: "Computers / Logic / Exploration",
      bio: "I’m just a kid from Czechia with a long-standing obsession with how things work under the hood. Most of my days are spent in Python or experimenting with web tech. I love the chaos of hackathons—taking an idea from zero to a working prototype in a single weekend is where I feel most at home. When the screen goes dark, I’m out in the mountains or traveling.",
      hobbyHeading: "Beyond the code",
      certHeading: "Proof of work",
    },
    CZ: {
      greeting: "Marek Janásek",
      heading: "Počítače / Logika / Objevování",
      bio: "Jsem prostě kluk z Česka, kterýho odjakživa fascinuje, jak věci fungují pod kapotou. Většinu dní trávím v Pythonu nebo experimentováním s webem. Miluju chaos hackathonů—ten proces, kdy se nápad promění v prototyp za jediný víkend, je přesně moje věc. Když zhasne monitor, najdete mě v horách nebo na cestách.",
      hobbyHeading: "Mimo obrazovku",
      certHeading: "Výsledky práce",
    }
  }[lang];

  const hobbies = [
    { id: 'h1', title: "Mountain Hiking", img: "/images/hobbies/hiking.jpg", span: "md:col-span-2 md:row-span-2" },
    { id: 'h2', title: "Travel", img: "/images/hobbies/travel.jpg", span: "md:col-span-1 md:row-span-1" },
    { id: 'h3', title: "Skiing", img: "/images/hobbies/ski.jpg", span: "md:col-span-1 md:row-span-1" },
  ];

  const certificates = [
    { id: 'c1', title: "Hackdays Winner", type: "AWARD", img: "/images/certificats/hackdays1.jpg", date: "2024" },
    { id: 'c4', title: "Cambridge B1", type: "LANG", img: "/images/certificats/cambridgeb1.png", date: "2023" }, 
    { id: 'c2', title: "Python Specialist", type: "CERT", img: "/images/certificats/vzb.jpg", date: "2024" },
    { id: 'c3', title: "Hackdays Finalist", type: "AWARD", img: "/images/certificats/hackdays2.jpg", date: "2023" },
  ];

  const navigate = (direction) => {
    const list = viewType === 'hobby' ? hobbies : certificates;
    const newIndex = (currentIndex + direction + list.length) % list.length;
    setCurrentIndex(newIndex);
    setSelectedImg(list[newIndex]);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#121212] pt-32 pb-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto selection:bg-orange-600 selection:text-white">
      
      {/* 1. HERO SECTION - REFINED */}
      <section className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            <img src="/images/me/me.jpeg" alt="Marek" className="w-full h-full object-cover" />
          </div>
          {/* Subtle Float Element */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Ready to build</span>
          </div>
        </motion.div>

        <div className="lg:col-span-7 pt-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-orange-600" />
            <p className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]">
              {t.heading}
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-10 leading-[0.9]">
            {t.greeting}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed font-medium max-w-2xl mb-12">
            {t.bio}
          </p>
          
          {/* Tech Heartbeat */}
          <div className="flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
             <Terminal size={20} />
             <Code2 size={20} />
             <Cpu size={20} />
             <Binary size={20} />
             <Globe size={20} />
          </div>
        </div>
      </section>

      {/* 2. GALLERY - CLEANER MASKING */}
      <section className="mb-48">
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-300 mb-12 flex items-center gap-4">
           {t.hobbyHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[650px]">
          {hobbies.map((hobby, idx) => (
            <motion.div 
              key={hobby.id}
              whileHover={{ y: -8 }}
              onClick={() => {setSelectedImg(hobby); setCurrentIndex(idx); setViewType('hobby');}}
              className={`${hobby.span} relative rounded-[2.5rem] overflow-hidden cursor-zoom-in group border border-neutral-100 bg-neutral-50 transition-all duration-500`}
            >
              <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all">
                 <span className="text-white text-xs font-black uppercase tracking-widest">{hobby.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CERTIFICATES - ELEGANT GRID */}
      <section>
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-300 mb-12 flex items-center gap-4">
           {t.certHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {certificates.map((cert, idx) => (
            <div 
              key={cert.id}
              onClick={() => {setSelectedImg(cert); setCurrentIndex(idx); setViewType('cert');}}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-white border border-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-100 group-hover:-translate-y-2">
                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-orange-600 tracking-tighter">[{cert.type} // {cert.date}]</span>
                <h3 className="text-base font-bold tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors">{cert.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LIGHTBOX - MINIMAL WHITE OUT */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white/98 backdrop-blur-xl flex flex-col p-8"
            onClick={() => setSelectedImg(null)}
          >
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
                <span className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase">{selectedImg.title}</span>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><X size={28} /></button>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
               <button onClick={(e) => {e.stopPropagation(); navigate(-1)}} className="absolute left-0 p-8 text-neutral-300 hover:text-black transition-all hidden md:block hover:translate-x-[-4px]">
                 <ChevronLeft size={64} strokeWidth={1} />
               </button>
               
               <motion.div 
                 initial={{ scale: 0.98 }} animate={{ scale: 1 }}
                 className="relative h-full flex items-center"
                 onClick={e => e.stopPropagation()}
                >
                 <img src={selectedImg.img} className="max-h-[70vh] w-auto shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] rounded-sm" alt="view" />
               </motion.div>

               <button onClick={(e) => {e.stopPropagation(); navigate(1)}} className="absolute right-0 p-8 text-neutral-300 hover:text-black transition-all hidden md:block hover:translate-x-[4px]">
                 <ChevronRight size={64} strokeWidth={1} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}