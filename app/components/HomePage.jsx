"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Globe,
  Cpu,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { projects } from "../data/projects";

const ease = [0.16, 1, 0.3, 1];

export default function HomePage({ setCurrentPage }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <motion.header
        ref={heroRef}
        style={{ y, opacity }}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-full blur-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--fg)]/40 mb-6 flex items-center gap-2"
        >
          <Sparkles size={12} className="text-[var(--accent)]" />
          Portfolio // Marek Janasek
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="text-[16vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-[-0.06em]"
        >
          Portfolio <br />
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent italic font-light">
            2026
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease }}
          className="text-[var(--fg)]/60 text-lg md:text-xl max-w-2xl mt-8"
        >
          Crafting exceptional digital experiences through code, design, and
          innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease }}
          className="flex gap-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => setCurrentPage("projects")}
            className="px-8 py-4 bg-[var(--fg)] text-[var(--card)] rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-black/10 motion"
          >
            View Work
            <ArrowUpRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => setCurrentPage("contact")}
            className="px-8 py-4 border-2 border-[var(--fg)] text-[var(--fg)] rounded-full font-bold text-sm uppercase tracking-wider motion"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.header>

      {/* PINNED PROJECTS - HORIZONTAL SCROLL */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--bg)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-12"
        >
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--fg)]/40 mb-4 flex items-center gap-2">
            <Zap size={12} className="text-[var(--accent)]" />
            Featured Projects
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">Recent Work</h3>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease }}
                className="min-w-[85vw] md:min-w-[600px] snap-center"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  className="group relative rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] p-10 md:p-12 h-[500px] flex flex-col justify-between cursor-pointer overflow-hidden shadow-xl shadow-black/5 motion"
                  onClick={() => setCurrentPage("projects")}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700`}
                  />

                  {/* Header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg)]/40">
                        {project.id}
                      </span>
                      <p className="text-xs text-[var(--fg)]/50 mt-1">
                        {project.category}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      transition={{ duration: 0.4, ease }}
                      className="w-12 h-12 rounded-full bg-[var(--fg)] flex items-center justify-center text-[var(--card)] group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 motion"
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-[var(--accent)] motion">
                      {project.title}
                    </h2>
                    <p className="text-[var(--fg)]/60 text-base mb-6 max-w-md">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[var(--bg)] rounded-full text-xs font-medium text-[var(--fg)]/70 border border-[var(--border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Year Badge */}
                    <div className="absolute bottom-0 right-0 text-8xl font-black text-[var(--fg)]/[0.03] group-hover:text-[var(--accent)]/10 motion">
                      {project.year}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-xs text-[var(--fg)]/40 flex items-center justify-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Scroll horizontally to explore
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--fg)]/40 mb-6">
            About
          </h2>
          <p className="text-3xl md:text-4xl font-medium leading-tight mb-8">
            I'm Marek Janasek — a developer focused on building modern,
            performant web experiences where design, motion, and engineering
            intersect.
          </p>

          <p className="text-[var(--fg)]/60 text-lg max-w-3xl mb-12">
            I specialize in frontend architecture, animation-driven interfaces,
            and full-stack systems built with clarity and intent. I value
            precision, simplicity, and long-term maintainability.
          </p>

          {/* Tech Stack Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.4, ease }}
              className="rounded-3xl bg-gradient-to-br from-[var(--fg)] to-[var(--fg)]/90 text-[var(--card)] p-8 cursor-pointer motion shadow-lg shadow-black/10"
            >
              <Cpu className="mb-6 opacity-70" size={32} />
              <h3 className="font-bold text-lg mb-2">Engineering</h3>
              <p className="font-mono text-[10px] tracking-widest opacity-60">
                NEXT.JS / REACT / GO
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.4, ease }}
              className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 cursor-pointer motion shadow-lg shadow-orange-500/20"
            >
              <Smartphone className="mb-6 opacity-90" size={32} />
              <h3 className="font-bold text-lg mb-2">Design Systems</h3>
              <p className="font-mono text-[10px] tracking-widest opacity-80">
                RESPONSIVE / MOTION UI
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.4, ease }}
              className="rounded-3xl bg-[var(--card)] border-2 border-[var(--border)] p-8 cursor-pointer motion shadow-lg shadow-black/5"
            >
              <Globe className="mb-6 opacity-60" size={32} />
              <h3 className="font-bold text-lg mb-2">Platforms</h3>
              <p className="font-mono text-[10px] tracking-widest opacity-60">
                WEB PLATFORMS / TOOLS
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}