'use client';

import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Get In Touch
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email</h3>
                <p className="text-muted-foreground">hussain.f.rang29@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                <MapPin size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-1">Location</h3>
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">India</p>
                  <p className="text-muted-foreground">B1-605, Urban Nest by VTP, Katraj-Hadapsar Bypass Rd, Undri, Pune, Maharashtra 411060</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">Kuwait</p>
                  <p className="text-muted-foreground">Yousef Al Bader Street 3 Ln, Salmiya</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                <Phone size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-1">Phone</h3>
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">India</p>
                  <p className="text-muted-foreground">+91 9256811253</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">Kuwait</p>
                  <p className="text-muted-foreground">+965 99524214</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 glass-card bg-transparent border-border focus:border-primary outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 glass-card bg-transparent border-border focus:border-primary outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 glass-card bg-transparent border-border focus:border-primary outline-none transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full p-4 glass-card bg-transparent border-border focus:border-primary outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Send Message <Send size={20} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
