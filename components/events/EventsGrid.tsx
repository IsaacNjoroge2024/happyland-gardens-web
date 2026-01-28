"use client";

import React from "react";
import { EventCard } from "./EventCard";
import { EventType } from "@/types";

interface EventsGridProps {
  events: EventType[];
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
  const handleEventClick = () => {
    // TODO: Open modal with event details and gallery
    // This will be implemented in the next ticket
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onClick={handleEventClick} />
      ))}
    </div>
  );
};
