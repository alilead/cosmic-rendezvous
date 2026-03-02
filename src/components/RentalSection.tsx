import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Music, Lightbulb, MapPin } from "lucide-react";
import rentalImg from "@/assets/space-rental.jpg";

const features = [
  { icon: Users, label: "Fêtes privées & Corporates" },
  { icon: Music, label: "Système son professionnel" },
  { icon: Lightbulb, label: "Éclairage néon immersif" },
  { icon: MapPin, label: "Centre de Genève" },
];

const RentalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rental" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={rentalImg} alt="Espace événementiel" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-pink">
            LOUEZ L'ESPACE
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Transformez votre événement en expérience cosmique. Notre espace s'adapte à vos ambitions les plus intergalactiques.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              className="border border-border rounded-lg p-6 text-center glass-dark hover:neon-border-pink transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <f.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <p className="font-body text-sm text-muted-foreground">{f.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Ideal for */}
        <motion.div
          className="max-w-2xl mx-auto border border-primary/30 rounded-lg p-8 md:p-12 text-center glass-dark neon-border-pink"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="font-display text-lg tracking-[0.15em] mb-6 text-secondary">IDÉAL POUR</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Fêtes privées", "Événements corporate", "Showcases artistiques", "DJ nights", "Anniversaires", "Lancements"].map((item) => (
              <span key={item} className="px-4 py-2 text-sm font-body border border-border rounded-full text-foreground hover:border-primary hover:text-primary transition-colors duration-300">
                {item}
              </span>
            ))}
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 font-display text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-300 rounded-sm animate-pulse-glow"
          >
            Vérifier la disponibilité
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RentalSection;
