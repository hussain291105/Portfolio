"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Banknote, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Ezzy Auto Parts",
    companyUrl: "http://ezzyautoparts.com/",
    position: "Cheif Executive Officer",
    period: "1 Month",
    salary: "300 د.ك",
    location: "25 St, Shuwaikh Industrial, Kuwait",
    description: "Leading the strategic vision and operations of the automotive parts business. Overseeing business development, team management, and driving growth initiatives to expand market presence and enhance customer satisfaction.",
    skills: ["Leadership", "Strategic Planning", "Business Development", "Team Management"],
    current: true
  },
  {
    company: "Al - Mawa International",
    companyUrl: "https://www.al-mawa.international/",
    position: "Digital Growth Strategist",
    period: "3 Months",
    salary: "₹ 20,000",
    location: "Office Number 102-103, Nexus Work Spaces, Pride Icon, Kharadi, Pune, Maharashtra 411014",
    description: "Successfully completed a 3-month professional engagement, contributing to both design and development projects. Focused on creating visual assets and implementing digital solutions.",
    skills: ["Graphic Design", "Social Media Marketing", "Development"],
    current: false
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
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block group-hover:translate-x-1 transition-transform"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span className="inline-block group-hover:translate-x-1 transition-transform">{exp.company}</span>
                      )}
                    </h3>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      {exp.position}
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full animate-pulse">
                          CURRENT
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                      <MapPin size={14} className="text-primary" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium bg-background/50 px-3 py-1.5 rounded-lg border border-primary/10">
                    <Calendar size={16} className="text-primary" />
                    {exp.period}
                  </div>
                  {exp.salary && (
                    <div className="flex items-center gap-2 text-muted-foreground font-medium bg-background/50 px-3 py-1.5 rounded-lg border border-primary/10">
                      <Banknote size={16} className="text-primary" />
                      {exp.salary}
                    </div>
                  )}
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
