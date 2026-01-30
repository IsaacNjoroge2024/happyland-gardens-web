"use client";

import { Hero, Gallery, About } from "@/components/home";
import { heroData, galleryImages, aboutInfo } from "@/data";
import { useBookingModal } from "@/context";

export default function Home() {
  const { openBookingModal } = useBookingModal();

  return (
    <>
      <Hero data={heroData} onSecondaryCTAClick={openBookingModal} />
      <div id="main-content">
        <Gallery images={galleryImages} />
        <About data={aboutInfo} />
      </div>
      {/* Additional homepage sections will be added here */}
    </>
  );
}
