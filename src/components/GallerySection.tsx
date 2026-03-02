import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import heroImg from "@/assets/hero-bar.jpg";
import rentalImg from "@/assets/space-rental.jpg";

const images = [
  { src: g1, alt: "Ambiance néon rouge" },
  { src: g2, alt: "Danse cosmique" },
  { src: g3, alt: "Cocktails lumineux" },
  { src: g4, alt: "Alien neon art" },
  { src: heroImg, alt: "Atmosphère du bar" },
  { src: rentalImg, alt: "Espace événementiel" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-green">
            GALERIE
          </h2>
          <p className="font-body text-muted-foreground">Fragments d'un univers parallèle</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-lg group cursor-pointer aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-all duration-300 group-hover:shadow-[inset_0_0_20px_hsl(var(--neon-pink)/0.3)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
