"use client";

import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { SlideshowModal } from "./SlideshowModal";
import { EventType } from "@/types";
import { useBookingModal } from "@/context";

interface EventsGridProps {
  events: EventType[];
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookClick = () => {
    setIsModalOpen(false);
    openBookingModal();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
        ))}
      </div>

      {/* Slideshow Modal */}
      {selectedEvent && (
        <SlideshowModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
          onBookClick={handleBookClick}
        />
      )}
    </>
  );
};
