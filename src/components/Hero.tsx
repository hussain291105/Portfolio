'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary font-semibold tracking-wide uppercase mb-4">Graphic Designing • Motion Graphics • Full Stack Development</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            I&apos;m <span className="text-primary">Hussain Fakhruddin Rangwala</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            I create <span className="text-foreground font-medium">brand-focused</span> graphic designs, dynamic motion visuals, and build modern <span className="text-foreground font-medium">full-stack</span> web experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 group shadow-lg shadow-primary/20"
          >
            View My Work
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
          <div className="flex items-center gap-4 ml-0 sm:ml-4 mt-4 sm:mt-0">
            <a 
              href="https://github.com/hussain291105?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 glass-card hover:bg-primary/10 transition-colors"
              title="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/hussain-rangwala-788a32299/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 glass-card hover:bg-primary/10 transition-colors"
              title="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a 
              href="https://www.behance.net/hussainrangwala3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 glass-card hover:bg-primary/10 transition-colors flex items-center justify-center"
              title="Behance"
            >
              <Image 
                src="/icons/behance.png" 
                alt="Behance" 
                width={20}
                height={20}
                className="object-contain dark:invert" 
              />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hussain.f.rang29@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card hover:bg-primary/10 transition-colors"
              title="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
