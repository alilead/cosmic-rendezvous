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
import FreeDrinkPopup from "@/components/FreeDrinkPopup";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && <AlienIntro onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <div className="bg-background w-full min-w-0 overflow-x-hidden max-w-[100vw] pt-16 sm:pt-[4.25rem] md:pt-[4.5rem] lg:pt-20 xl:pt-[5.5rem]">
          <Navbar />
          <FreeDrinkPopup />
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
