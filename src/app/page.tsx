"use client";

import { useState } from "react";
import { Hero, Gallery, About } from "@/components/home";
import { heroData, galleryImages, aboutInfo } from "@/data";
import { BookingModal } from "@/components/booking";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <Hero data={heroData} onSecondaryCTAClick={() => setIsBookingModalOpen(true)} />
      <div id="main-content">
        <Gallery images={galleryImages} />
        <About data={aboutInfo} />
      </div>
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      {/* Additional homepage sections will be added here */}
    </>
  );
}
