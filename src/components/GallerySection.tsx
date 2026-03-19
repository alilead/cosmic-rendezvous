import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Photos from /photo folder (copied to public/photo)
const GALLERY_PHOTOS = [
  "section.jpeg",
  "WhatsApp Image 2026-03-05 at 18.49.44.jpeg",
  "WhatsApp Image 2026-03-05 at 18.49.45.jpeg",
  "WhatsApp Image 2026-03-05 at 18.49.46.jpeg",
  "WhatsApp Image 2026-03-05 at 18.49.47.jpeg",
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const galleryAlts = [t("galleryAlt5"), t("galleryAlt2"), t("galleryAlt6"), t("galleryAlt3"), t("galleryAlt4")];
  const images = GALLERY_PHOTOS.map((file, i) => ({
    src: `/photo/${encodeURIComponent(file)}`,
    alt: galleryAlts[i] ?? t("galleryTitle"),
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
