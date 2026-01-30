"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { useBookingModal } from "@/context";

interface LayoutClientProps {
  children: React.ReactNode;
}

/**
 * Client-side layout wrapper that connects Navigation to the booking modal context
 */
export function LayoutClient({ children }: LayoutClientProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <>
      <Navigation onBookNowClick={openBookingModal} />
      {children}
    </>
  );
}
