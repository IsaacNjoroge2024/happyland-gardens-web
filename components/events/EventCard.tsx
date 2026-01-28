"use client";

import React from "react";
import { motion } from "framer-motion";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { Button } from "@/components/ui/Button";
import { EventType } from "@/types";

interface EventCardProps {
  event: EventType;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const featuredImage = event.images[0] || "/images/events/garden-parties-card.png";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`View details for ${event.name}`}
    >
      {/* Featured Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
        <ImageWrapper
          src={featuredImage}
          alt={`${event.name} at Happyland Gardens`}
          fill
          objectFit="cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Event Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading group-hover:text-primary-600 transition-colors duration-300">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
          {event.description}
        </p>

        {/* Capacity Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
            Capacity: {event.capacity} guests
          </span>
        </div>

        {/* CTA Button */}
        <Button
          variant="outline"
          size="md"
          className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          View Gallery
        </Button>
      </div>
    </motion.article>
  );
};
