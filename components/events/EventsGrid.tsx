"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EventCard } from "./EventCard";
import { EventType } from "@/types";
import { useBookingModal } from "@/context";
import { trackEvent } from "@/lib/analytics";

const SlideshowModal = dynamic(() =>
  import("./SlideshowModal").then((module) => ({ default: module.SlideshowModal }))
);

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
    trackEvent({
      action: "event_category_clicked",
      category: "events",
      label: event.name,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookClick = () => {
    setIsModalOpen(false);
    openBookingModal("events");
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600 mb-2">No events available at this time.</p>
        <p className="text-gray-500">Please check back soon or contact us for assistance.</p>
      </div>
    );
  }

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
