"use client";

import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() =>
  import("@/components/booking").then((module) => ({ default: module.BookingModal }))
);

interface BookingModalContextType {
  openBookingModal: () => void;
  closeBookingModal: () => void;
  isOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const openBookingModal = () => {
    setHasBeenOpened(true);
    setIsOpen(true);
  };
  const closeBookingModal = () => setIsOpen(false);

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal, isOpen }}>
      {children}
      {hasBeenOpened && <BookingModal isOpen={isOpen} onClose={closeBookingModal} />}
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
