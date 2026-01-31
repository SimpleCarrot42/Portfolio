"use client";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Camera, Heart, MapPin, Zap } from "lucide-react";

export default function AboutPage({ isDark, lang }) {
  const [selectedImg, setSelectedImg] = useState(null);

  const t = {
    EN: {
      greeting: "Hello, I'm Marek",
      heading: "Building systems, living life.",
      bio: "I'm a software developer based in Czechia. I build clean, high-performance web applications, but my work is fueled by what I do when the laptop is closed.",
      hobbyHeading: "Moments & Hobbies",
      certHeading: "Accreditation Archive"
    },
    CZ: {
      greeting: "Ahoj, já jsem Marek",
      heading: "Stavím systémy, žiju život.",
      bio: "Jsem softwarový vývojář z Česka. Tvořím čisté a výkonné webové aplikace, ale moje práce je poháněna tím, co dělám, když je notebook zavřený.",
      hobbyHeading: "Momenty a záliby",
      certHeading: "Archiv akreditací"
    }
  }[lang];

  const hobbies = [
    { id: 'h1', title: "Hiking", img: "/images/hobbies/hiking.jpg", span: "md:col-span-2 md:row-span-2" },
    { id: 'h2', title: "Travel", img: "/images/hobbies/travel.jpg", span: "md:col-span-1 md:row-span-1" },
    { id: 'h3', title: "Ski", img: "/images/hobbies/ski.jpg", span: "md:col-span-1 md:row-span-1" },
  ];

  const certificates = [
    // If the image is at: public/images/certificats/hackdays1.jpg
    { id: 'c1', title: "Hackdays", img: "/images/certificats/hackdays1.jpg" }, 
    
    // If the image is at: public/certs/meta.jpg
    { id: 'c2', title: "Python", img: "/images/certificats/vzb.jpg" },
    
    { id: 'c3', title: "Hackdays", img: "/images/certificats/hackdays2.jpg" },
  ];

  return (
    <div className={`pt-32 pb-40 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto ${isDark ? 'text-white' : 'text-black'}`}>
      
      {/* 1. HERO SECTION: CIRCULAR HEADSHOT & INTRO */}
      <section className="grid lg:grid-cols-12 gap-12 items-center mb-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 flex justify-center lg:justify-start"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-orange-600/20 bg-neutral-200">
              <img src="/images/me/me.jpeg" alt="Marek Janasek" className="w-full h-full" />
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            {t.heading}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6">
            {t.greeting}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl opacity-60 leading-relaxed max-w-2xl">
            {t.bio}
          </motion.p>
        </div>
      </section>

      {/* 2. HOBBY MOSAIC (Asymmetric Grid) */}
      <section className="mb-40">
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-10 flex items-center gap-4">
          <Camera size={14} /> {t.hobbyHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[600px]">
          {hobbies.map((hobby) => (
            <motion.div 
              key={hobby.id}
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedImg(hobby)}
              className={`${hobby.span} relative rounded-[2rem] overflow-hidden cursor-zoom-in bg-neutral-800 shadow-2xl`}
            >
              <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6">
                 <span className="px-4 py-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {hobby.title}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CERTIFICATE GRID (Clean & Professional) */}
      <section>
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-10 flex items-center gap-4">
          <Award size={14} /> {t.certHeading}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <motion.div 
              key={cert.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedImg(cert)}
              className={`group cursor-pointer rounded-2xl border p-3 transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-orange-600/50' : 'bg-neutral-50 border-black/5 hover:border-orange-600/50'}`}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">{cert.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. THE LIGHTBOX VIEWER */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-20"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative max-w-5xl w-full">
              <img src={selectedImg.img} alt={selectedImg.title} className="w-full h-auto max-h-[85vh] object-contain rounded-lg" />
              <div className="mt-8 text-center">
                <h3 className="text-white text-xs font-bold uppercase tracking-[0.5em]">{selectedImg.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}