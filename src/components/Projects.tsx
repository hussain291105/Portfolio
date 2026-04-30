'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    title: 'Brand Identity - Creative Studio',
    desc: 'Complete branding package including logo design, business cards, and brand guidelines.',
    details: 'This project involved creating a cohesive brand identity for a startup studio. The design process focused on balancing modern minimalism with high visual impact. I developed a comprehensive brand system that remains consistent across all touchpoints.',
    features: ['Custom Vector Logo', 'Brand Psychology & Color Theory', 'Typography Selection', 'Print-ready Assets'],
    tech: ['Illustrator', 'Photoshop', 'Branding'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    link: 'https://www.behance.net/hussainrangwala3',
  },
  {
    title: 'Motion Graphics Showreel',
    desc: 'Dynamic visual storytelling through advanced motion design and animation.',
    details: 'A professional showreel demonstrating advanced techniques in kinetic typography, character animation, and visual effects. Each segment was crafted to showcase timing, easing, and the ability to convey complex ideas through movement.',
    features: ['Kinetic Typography', '2D Character Animation', '3D Scene Composition', 'Dynamic Transitions'],
    tech: ['After Effects', 'Premiere Pro', 'Motion'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    link: 'https://www.behance.net/hussainrangwala3',
  },
  {
    title: 'Social Media Marketing',
    desc: 'High-converting ad designs and web banners for digital marketing reach.',
    details: 'Designed and implemented multi-channel marketing campaigns. The focus was on conversion-led design, using visual hierarchy and color psychology to drive user action and improve engagement rates by 30%.',
    features: ['A/B Tested Ad Layouts', 'Instagram Story Sets', 'Animated Web Banners', 'Performance Analytics'],
    tech: ['Photoshop', 'CorelDraw', 'Marketing'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    link: 'https://www.behance.net/hussainrangwala3',
  },
  {
    title: 'Modern E-Commerce',
    desc: 'A full-featured shopping platform with real-time inventory and Stripe integration.',
    details: 'A high-performance full-stack application built for scale. It features a custom-built shopping cart, real-time inventory management, and a secure checkout flow. The backend is optimized for lightning-fast database queries.',
    features: ['Dynamic Product Filtering', 'Real-time Stock Updates', 'Secure Stripe Checkout', 'Admin Inventory Portal'],
    tech: ['Next.js', 'Tailwind', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    link: 'https://github.com/hussain291105?tab=repositories',
  },
  {
    title: 'SaaS Dashboard',
    desc: 'Analytics dashboard with custom charts and data visualization.',
    details: 'A complex data-visualization project that transforms raw business metrics into actionable insights. Built with a focus on component reusability and performance, handling large datasets without compromising on speed.',
    features: ['Interactive Chart.js Graphics', 'Real-time Data Sync', 'Custom Filter Engine', 'Responsive Data Tables'],
    tech: ['React', 'Node.js', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    link: 'https://github.com/hussain291105?tab=repositories',
  },
  {
    title: 'UI/UX Portfolio',
    desc: 'Modern portfolio design with smooth animations and responsive layouts.',
    details: 'This project is a deep dive into advanced UI/UX principles. I focused on the "Design Thinking" process: empathizing with users, defining pain points, and creating high-fidelity prototypes that offer an intuitive user experience. Every interaction is designed to feel natural and responsive.',
    features: ['User Persona Mapping', 'High-Fidelity Wireframes', 'Framer Motion Animations', 'Accessibility (WCAG) Compliant'],
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    link: 'https://github.com/hussain291105?tab=repositories',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Selected Projects
        </motion.h2>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass-card"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                {project.desc}
              </p>
              <button
                onClick={() => setSelectedProject(project)}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Learn More <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-background border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-primary/20 text-primary-foreground text-xs font-bold rounded-full border border-primary/30">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{selectedProject.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {selectedProject.details}
                </p>

                <div className="space-y-4 mb-8">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Key Highlights</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {selectedProject.features?.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={selectedProject.link}
                  target={selectedProject.link.startsWith('http') ? "_blank" : undefined}
                  rel={selectedProject.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  View Project <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
