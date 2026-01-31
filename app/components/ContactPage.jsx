"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

// 1. Translation Dictionary
const translations = {
  EN: {
    titleTop: "Let's Create",
    titleBottom: "Something Great",
    subTitle: "Have a project in mind? Let's talk about it.",
    emailLabel: "Email",
    formTitle: "Send a Message",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    msgLabel: "Message",
    msgPlaceholder: "Tell me about your project...",
    btnSend: "Send Message",
    availability: "Available for Freelance Projects",
  },
  CZ: {
    titleTop: "Pojďme tvořit",
    titleBottom: "Něco skvělého",
    subTitle: "Máte nápad na projekt? Pojďme si o tom promluvit.",
    emailLabel: "Email",
    formTitle: "Napište mi zprávu",
    nameLabel: "Jméno",
    namePlaceholder: "Vaše jméno",
    emailPlaceholder: "vas@email.cz",
    msgLabel: "Zpráva",
    msgPlaceholder: "Řekněte mi o svém projektu...",
    btnSend: "Odeslat zprávu",
    availability: "Dostupný pro spolupráci",
  }
};

export default function ContactPage({ lang, isDark }) {
  const t = translations[lang] || translations.EN;
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
  };

  return (
    <div className={`min-h-screen pt-32 px-6 md:px-12 lg:px-20 pb-20 transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="text-6xl md:text-8xl font-bold mb-6 uppercase tracking-tighter leading-none"
          >
            {t.titleTop}
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent italic font-light">
              {t.titleBottom}
            </span>
          </motion.h1>
          <p className={`text-xl transition-opacity ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {t.subTitle}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.a
            href="mailto:marek@example.com"
            whileHover={{ scale: 1.05, y: -4 }}
            className={`p-8 rounded-3xl flex items-center gap-4 shadow-lg transition-colors ${
              isDark ? 'bg-white text-black shadow-white/5' : 'bg-black text-white shadow-black/10'
            }`}
          >
            <Mail size={32} />
            <div>
              <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1 font-bold">
                {t.emailLabel}
              </p>
              <p className="font-bold">marek@example.com</p>
            </div>
          </motion.a>

          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex-1 p-8 rounded-3xl border-2 flex items-center justify-center transition-colors ${
                isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-black/5 text-black'
              }`}
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="flex-1 p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/20"
            >
              <Linkedin size={32} />
            </motion.a>
          </div>
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          onSubmit={handleSubmit}
          className={`rounded-[2.5rem] border p-10 md:p-12 shadow-xl transition-colors ${
            isDark ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-black/5 shadow-black/5'
          }`}
        >
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight">{t.formTitle}</h2>

          <div className="space-y-6">
            <div>
              <label className={`block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className={`w-full px-6 py-4 rounded-2xl border transition-all focus:border-orange-500 outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/5 text-black'
                }`}
                placeholder={t.namePlaceholder}
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className={`w-full px-6 py-4 rounded-2xl border transition-all focus:border-orange-500 outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/5 text-black'
                }`}
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                {t.msgLabel}
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={6}
                className={`w-full px-6 py-4 rounded-2xl border transition-all focus:border-orange-500 outline-none resize-none ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/5 text-black'
                }`}
                placeholder={t.msgPlaceholder}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-orange-500/30"
            >
              {t.btnSend}
            </motion.button>
          </div>
        </motion.form>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          className="mt-12 text-center"
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${
            isDark ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t.availability}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}