"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function ContactPage() {
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
    <div className="min-h-screen pt-32 px-6 md:px-12 lg:px-20 pb-20">
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
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            Let's Create
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Something Great
            </span>
          </motion.h1>
          <p className="text-xl text-[var(--fg)]/60">
            Have a project in mind? Let's talk about it.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.a
            href="mailto:marek@example.com"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.4, ease }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[var(--fg)] to-[var(--fg)]/90 text-[var(--card)] flex items-center gap-4 motion shadow-lg shadow-black/10"
          >
            <Mail size={32} />
            <div>
              <p className="text-xs opacity-60 uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="font-bold">marek@example.com</p>
            </div>
          </motion.a>

          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.4, ease }}
              className="flex-1 p-8 rounded-3xl bg-[var(--card)] border-2 border-[var(--border)] flex items-center justify-center motion shadow-lg shadow-black/5"
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.4, ease }}
              className="flex-1 p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center motion shadow-lg shadow-blue-500/20"
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
          className="bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] p-10 md:p-12 shadow-xl shadow-black/5"
        >
          <h2 className="text-2xl font-bold mb-8">Send a Message</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[var(--fg)]/60">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none motion bg-[var(--bg)]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[var(--fg)]/60">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none motion bg-[var(--bg)]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[var(--fg)]/60">
                Message
              </label>
              <textarea
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                rows={6}
                className="w-full px-6 py-4 rounded-2xl border-2 border-[var(--border)] focus:border-[var(--accent)] focus:outline-none motion resize-none bg-[var(--bg)]"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold uppercase tracking-wider shadow-lg shadow-orange-500/30 motion"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-green-700">
              Available for Freelance Projects
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}