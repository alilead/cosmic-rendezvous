import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 md:py-32 cosmic-gradient noise-bg">
      <div className="container mx-auto px-4 relative z-10 max-w-3xl" ref={ref}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-pink">
            CONTACT
          </h2>
          <p className="font-body text-muted-foreground mb-12">Rejoignez notre orbite</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: MapPin, label: "Genève, Suisse", href: "https://www.google.com/maps/search/genève+cosmic+bar" },
              { icon: Phone, label: "+41 XX XXX XX XX", href: "tel:+41000000000" },
              { icon: Instagram, label: "@cosmiccafe.geneva", href: "https://instagram.com" },
              { icon: Mail, label: "info@cosmiccafe.ch", href: "mailto:info@cosmiccafe.ch" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 border border-border rounded-lg glass-dark hover:neon-border-pink transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              >
                <item.icon className="w-5 h-5 text-primary group-hover:text-neon-cyan transition-colors" />
                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="mailto:info@cosmiccafe.ch"
            className="inline-block px-12 py-4 font-display text-sm tracking-[0.2em] uppercase border border-primary text-primary-foreground bg-primary/20 hover:bg-primary/40 transition-all duration-300 rounded-sm neon-border-pink animate-pulse-glow"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Entrer dans la nuit cosmique
          </motion.a>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">
            © 2025 COSMIC RENDEZVOUS — GENÈVE
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
