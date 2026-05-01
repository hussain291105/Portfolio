"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Banknote } from "lucide-react";

const experiences = [
  {
    company: "Al - Mawa International",
    position: "Digital Growth Strategist",
    period: "3 Months",
    salary: "₹ 20,000",
    description: "Successfully completed a 3-month professional engagement, contributing to both design and development projects. Focused on creating visual assets and implementing digital solutions.",
    skills: ["Graphic Design", "Social Media Marketing", "Development"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Briefcase size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Work Experience</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 glass-card bg-primary/5 border-primary/20 hover:border-primary/40 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1 group-hover:translate-x-1 transition-transform">{exp.company}</h3>
                  <p className="text-lg font-semibold">{exp.position}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium bg-background/50 px-3 py-1.5 rounded-lg border border-primary/10">
                    <Calendar size={16} className="text-primary" />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground font-medium bg-background/50 px-3 py-1.5 rounded-lg border border-primary/10">
                    <Banknote size={16} className="text-primary" />
                    {exp.salary}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg italic">
                &quot;{exp.description}&quot;
              </p>

              <div className="flex flex-wrap gap-3">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
