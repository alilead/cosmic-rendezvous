import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Six gallery images — synced from Downloads\cosmic photos
const GALLERY_PHOTOS = [
  "WhatsApp Image 2026-03-25 at 16.42.39 (1).jpeg",
  "WhatsApp Image 2026-03-25 at 16.42.40.jpeg",
  "WhatsApp Image 2026-03-25 at 16.42.41 (1).jpeg",
  "WhatsApp Image 2026-03-25 at 16.42.41 (2).jpeg",
  "gallery-cosmic-5.png",
  "gallery-cosmic-6.png",
];

const ALT_KEYS = [
  "galleryAlt1",
  "galleryAlt2",
  "galleryAlt3",
  "galleryAlt4",
  "galleryAlt5",
  "galleryAlt6",
] as const;

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const images = GALLERY_PHOTOS.map((file, i) => ({
    src: `/photo/${encodeURIComponent(file)}`,
    alt: t(ALT_KEYS[i % ALT_KEYS.length]),
  }));

  return (
    <section id="gallery" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4 relative z-10 min-w-0 max-w-[100vw]" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-green">
            {t("galleryTitle")}
          </h2>
          <p className="font-body text-muted-foreground">{t("gallerySubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
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
