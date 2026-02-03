"use client";

import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

const BookingModal = dynamic(() =>
  import("@/components/booking").then((module) => ({ default: module.BookingModal }))
);

interface BookingModalContextType {
  openBookingModal: (source?: string) => void;
  closeBookingModal: () => void;
  isOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const openBookingModal = (source?: string) => {
    setHasBeenOpened(true);
    setIsOpen(true);
    if (source) {
      trackEvent({
        action: "booking_modal_opened",
        category: "booking",
        label: source,
      });
    }
  };
  const closeBookingModal = () => setIsOpen(false);

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal, isOpen }}>
      <MotionConfig reducedMotion="user">
        {children}
        {hasBeenOpened && <BookingModal isOpen={isOpen} onClose={closeBookingModal} />}
      </MotionConfig>
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
