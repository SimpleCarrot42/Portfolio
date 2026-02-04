"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

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
    btnSending: "Sending...",
    availability: "Available for Freelance Projects",
    success: "Success! Your message has been sent.",
    error: "Something went wrong. Please try again."
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
    btnSending: "Odesílám...",
    availability: "Dostupný pro spolupráci",
    success: "Úspěch! Vaše zpráva byla odeslána.",
    error: "Něco se nepovedlo. Zkuste to prosím znovu."
  }
};

export default function ContactPage({ lang }) {
  const t = translations[lang] || translations.EN;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("access_key", "5c196dab-86f5-4d55-82b6-b7828af2ae9e");
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if(data.success) {
        setFormState({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 lg:px-20 pb-20 bg-white text-black transition-colors duration-500">
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
          <p className="text-xl text-black/60">
            {t.subTitle}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.a
            href="mailto:marek@example.com"
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-8 rounded-3xl flex items-center gap-4 bg-black text-white shadow-xl shadow-black/10 transition-all"
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
              href="https://github.com/SimpleCarrot42"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex-1 p-8 rounded-3xl border-2 bg-white border-black/5 text-black hover:border-black/20 shadow-sm transition-all"
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/marek-jan%C3%A1sek-299a1b399/"
              target="_blank"
              rel="noopener noreferrer"
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
          className="rounded-[2.5rem] border border-black/5 bg-white p-10 md:p-12 shadow-2xl shadow-black/5"
        >
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight text-black">{t.formTitle}</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] text-black/40">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                name="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-black/5 text-black transition-all focus:border-orange-500 focus:bg-white outline-none"
                placeholder={t.namePlaceholder}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] text-black/40">
                {t.emailLabel}
              </label>
              <input
                type="email"
                required
                name="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-black/5 text-black transition-all focus:border-orange-500 focus:bg-white outline-none"
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold mb-2 uppercase tracking-[0.2em] text-black/40">
                {t.msgLabel}
              </label>
              <textarea
                required
                name="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={6}
                className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-black/5 text-black transition-all focus:border-orange-500 focus:bg-white outline-none resize-none"
                placeholder={t.msgPlaceholder}
              />
            </div>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-orange-500/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? t.btnSending : t.btnSend}
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
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border bg-green-50 border-green-200 text-green-700">
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