"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { BookingModal } from "@/components/booking";

interface LayoutClientProps {
  children: React.ReactNode;
}

/**
 * Client-side layout wrapper that manages the booking modal state
 * This component wraps the Navigation and provides modal control to child components
 */
export function LayoutClient({ children }: LayoutClientProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <>
      <Navigation onBookNowClick={openBookingModal} />
      {children}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </>
  );
}
