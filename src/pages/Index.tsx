import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AlienIntro from "@/components/AlienIntro";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RentalSection from "@/components/RentalSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import FreeDrinkBanner from "@/components/FreeDrinkBanner";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && <AlienIntro onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <div className="bg-background w-full min-w-0 overflow-x-hidden max-w-[100vw] pt-14 md:pt-16">
          <Navbar />
          <FreeDrinkBanner />
          <HeroSection />
          <AboutSection />
          <RentalSection />
          <MenuSection />
          <GallerySection />
          <ContactSection />
        </div>
      )}
    </>
  );
};

export default Index;
