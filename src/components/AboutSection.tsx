import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32 cosmic-gradient noise-bg scroll-mt-20">
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="space-y-12 md:space-y-16">
          {/* Header above image — better UX */}
          <motion.h2
            className="font-display text-3xl md:text-4xl tracking-[0.1em] text-center md:text-left neon-glow-cyan"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            BIENVENUE DANS UNE AUTRE DIMENSION
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image */}
            <motion.div
              className="relative rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <img src={gallery1} alt="Intérieur Cosmic Rendezvous" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute inset-0 border border-primary/20 rounded-lg neon-border-pink" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
              <p>
                Le <span className="text-primary font-medium">Cosmic Rendezvous</span> n'est pas un bar ordinaire. C'est un portail vers un univers parallèle où l'énergie électro rencontre l'esthétique alien.
              </p>
              <p>
                Immergez-vous dans une atmosphère <span className="text-secondary">vibrante</span> où les couleurs néon dansent avec la musique, où chaque cocktail raconte une histoire interstellaire.
              </p>
              <p>
                Situé au cœur de Genève, notre espace underground offre une expérience unique pour vos soirées privées, anniversaires, showcases artistiques et DJ sets.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {["Électro", "Néon", "Underground", "Cosmique"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-display tracking-[0.2em] uppercase border border-border text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
