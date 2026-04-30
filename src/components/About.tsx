'use client';

import { motion } from 'framer-motion';
import { Palette, Globe, Languages, PenTool, Code2 } from 'lucide-react';

const skills = [
  { name: 'Full Stack Development', icon: <Code2 size={24} />, desc: 'Building robust web applications using React, Next.js, and Node.js.' },
  { name: 'UI/UX Design', icon: <Palette size={24} />, desc: 'Creating intuitive and beautiful user interfaces with Tailwind CSS and Framer Motion.' },
  { name: 'Scalable Solutions', icon: <Globe size={24} />, desc: 'Architecting performance-driven websites and APIs for global reach.' },
  { name: 'Graphic Design', icon: <Palette size={24} />, desc: 'Logo Design, Branding, Packaging, Brochure & Flyer Design.' },
  { name: 'Motion Graphics', icon: <PenTool size={24} />, desc: 'Creating dynamic visual content and engaging motion designs.' },
  { name: 'Web & Digital', icon: <Globe size={24} />, desc: 'Social Media Ads, Web Banners, and modern digital assets.' },
];

const languages = [
  { name: 'ENGLISH', level: 85 },
  { name: 'HINDI', level: 95 },
  { name: 'ARABIC', level: 70 },
  { name: 'GUJRATI', level: 100 },
];

const designSoftware = ['Ai', 'Ps', 'Id', 'CorelDraw'];
const devStack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'MongoDB'];

export default function About() {
  return (
    <section id="about" className="section-padding bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              As a Graphic Designer and Full-Stack Developer, my objective is to blend creativity with technical 
              excellence to develop visually engaging and highly functional digital experiences. I aim to 
              produce high-quality work that effectively communicates messages while providing seamless user 
              functionality.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              My focus is on understanding the target audience, collaborating with technically pleasing 
              solutions that leave a lasting impression across both print and digital platforms.
            </p>

            <div className="space-y-8 mb-12">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Languages className="text-primary" size={24} />
                Languages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{lang.name}</span>
                      <span>{lang.level}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Design Tools</h3>
                <div className="flex flex-wrap gap-4">
                  {designSoftware.map((sw) => (
                    <div key={sw} className="px-4 py-2 rounded-full border-2 border-primary/20 font-bold text-sm text-primary hover:bg-primary hover:text-white transition-all cursor-default">
                      {sw}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold">Developer Stack</h3>
                <div className="flex flex-wrap gap-4">
                  {devStack.map((tech) => (
                    <div key={tech} className="px-4 py-2 rounded-full border-2 border-primary/20 font-bold text-sm text-primary hover:bg-primary hover:text-white transition-all cursor-default">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <h3 className="text-2xl font-bold mb-2">My Expertise</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 glass-card flex items-start gap-4 group hover:border-primary/50 transition-all"
              >
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-muted-foreground">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-3xl mx-auto p-6 glass-card bg-primary/5 border-primary/20"
        >
          <h3 className="text-xl font-bold mb-6 text-center underline underline-offset-8 decoration-primary/50">Core Skills</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 text-center md:text-right">Design</h4>
              <ul className="space-y-1 text-sm text-muted-foreground text-center md:text-right">
                <li>Logo Design</li>
                <li>Social Media Ads</li>
                <li>Business Card</li>
                <li>Web Banners</li>
                <li>Branding</li>
                <li>Brochure Design</li>
                <li>Packaging</li>
                <li>Invoice Design</li>
                <li>Flyer Design</li>
                <li>Menu Card</li>
              </ul>
            </div>
            <div className="border-l border-primary/20 pl-8">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 text-center md:text-left">Development</h4>
              <ul className="space-y-1 text-sm text-muted-foreground text-center md:text-left">
                <li>Frontend Development</li>
                <li>Backend Architecture</li>
                <li>Database Management</li>
                <li>RESTful API Design</li>
                <li>UI/UX Implementation</li>
                <li>Performance Optimization</li>
                <li>Cloud Deployment</li>
                <li>Responsive Web Design</li>
                <li>State Management</li>
                <li>Version Control (Git)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
