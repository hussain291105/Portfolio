"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";

const education = [
  {
    period: "2023-2026",
    title: "GRADUATION",
    institution: "BBA(CA) SPPU (Vishwakarma College Of Arts, Commerce & Science)",
    status: "PURSUING",
    type: "edu"
  },
  {
    period: "2023-2024",
    title: "DIPLOMA IN GRAPHIC DESIGNING",
    institution: "Excellent Multimedia Classes, Pune.",
    type: "diploma"
  },
  {
    period: "2022-2023",
    title: "HSC",
    institution: "Indian Public School, Hawalli, Kuwait.",
    type: "edu"
  },
  {
    period: "2020-2021",
    title: "SSC",
    institution: "Indian Public School, Hawalli, Kuwait.",
    type: "edu"
  }
];

export default function Education() {
  return (
    <section id="education" className="section-padding bg-black/5 dark:bg-white/5">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <GraduationCap size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
        </motion.div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-primary/30 before:to-transparent">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background group-hover:border-primary group-hover:scale-110 transition-all duration-300 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>

              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 glass-card group-hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                    <Calendar size={14} />
                    {item.period}
                  </div>
                  {item.status && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full animate-pulse">
                      {item.status}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
