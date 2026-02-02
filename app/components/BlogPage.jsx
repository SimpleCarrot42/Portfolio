"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Sparkles, Search, ArrowUpRight, Clock, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

// 1. Bilingual Data Structure
const BLOG_DATA = [

];

export default function BlogPage({ lang = "EN", isDark = true }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(BLOG_DATA.map(post => post.category))];

  // Logic: Bilingual Filtering & Searching
  const filteredPosts = useMemo(() => {
    return BLOG_DATA.filter(post => {
      const currentTitle = post.title[lang] || post.title.EN;
      const currentDesc = post.description[lang] || post.description.EN;
      
      const matchesSearch = 
        currentTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
        currentDesc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, lang]);

  const t = {
    EN: { title: "INSIGHT", span: "Journal", sub: "Thoughts // Process", search: "Search articles...", noResults: "No matches found." },
    CZ: { title: "POSTŘEHY", span: "Deník", sub: "Myšlenky // Proces", search: "Hledat články...", noResults: "Nenalezeny žádné výsledky." }
  };

  const labels = t[lang] || t.EN;

  return (
    <div className={`min-h-screen pt-44 px-6 md:px-12 lg:px-24 pb-40 transition-colors duration-700 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}`}>
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 opacity-40 mb-6">
            <Sparkles size={12} className="text-orange-600" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-black">{labels.sub}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease }} className="text-[14vw] md:text-[10vw] font-bold leading-[0.75] tracking-[-0.08em] uppercase">
            {labels.title} <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent italic font-light">{labels.span}</span>
          </motion.h1>

          {/* CONTROLS: Rounded Search & Border Tabs */}
          <div className="mt-20 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
            
            {/* SEARCH BAR - Fully Rounded */}
            <div className="relative w-full max-w-xl group">
              <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-orange-600' : 'opacity-30'}`} size={20} />
              <input 
                type="text"
                placeholder={labels.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-5 pl-14 pr-12 bg-transparent rounded-full border-2 transition-all outline-none text-lg ${
                  isDark 
                  ? "border-white/10 focus:border-white/30 bg-white/[0.02]" 
                  : "border-black/10 focus:border-black/30 bg-black/[0.01]"
                }`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* FILTER TABS - The style you liked */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                    : (isDark ? "bg-white/5 hover:bg-white/10 border border-white/10" : "bg-black/5 hover:bg-black/10 border border-black/10")
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* POSTS LIST */}
        <div className="flex flex-col border-t border-neutral-800/20">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease, delay: index * 0.05 }}
                  onClick={() => window.location.href = `/blog/${post.slug}`}
                  className={`group relative py-20 flex flex-col md:flex-row justify-between items-start gap-12 cursor-pointer border-b ${
                    isDark ? "border-white/5" : "border-black/5"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-bold opacity-20 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                      <div className="w-12 h-px bg-orange-600/30 group-hover:w-20 transition-all duration-700" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] group-hover:text-orange-500 transition-colors duration-500">
                      {post.title[lang] || post.title.EN}
                    </h2>
                    
                    <p className="text-xl opacity-40 max-w-2xl leading-relaxed font-light line-clamp-2">
                      {post.description[lang]}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end justify-between min-h-[180px]">
                    <div className="flex items-center gap-4 text-[10px] font-black opacity-30 tracking-widest uppercase">
                      <Clock size={14} className="text-orange-600" /> {post.readTime}
                    </div>
                    
                    <div className={`w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-700 group-hover:scale-110 ${
                      isDark ? 'border-white/10 group-hover:bg-white group-hover:text-black' : 'border-black/10 group-hover:bg-black group-hover:text-white'
                    }`}>
                      <ArrowUpRight size={32} className="group-hover:rotate-45 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center opacity-20 uppercase tracking-[0.5em] text-sm">
                {labels.noResults}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}