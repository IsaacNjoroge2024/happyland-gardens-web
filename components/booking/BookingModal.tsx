"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { contactInfo } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { H2, H4, BodyText, Caption } from "@/components/ui/Typography";
import { cn, formatPhoneNumber, getPhoneLink } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Detect if user is on mobile device
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Get the appropriate maps link based on device
  const getMapsLink = () => {
    return isMobile()
      ? contactInfo.mapsLinkMobile || contactInfo.mapsLink
      : contactInfo.mapsLinkDesktop || contactInfo.mapsLink;
  };

  // Get WhatsApp link with pre-filled message
  const getWhatsAppLink = () => {
    if (contactInfo.whatsappLink) {
      return contactInfo.whatsappLink;
    }
    const message = "Hi! I'm interested in booking Happyland Gardens for an event.";
    const cleanedPhone = contactInfo.whatsapp.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          aria-describedby="booking-modal-description"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 z-10 p-2 rounded-full",
                "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              )}
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <H2 className="text-primary-700 mb-3">
                  <span id="booking-modal-title">Book Your Event at Happyland Gardens</span>
                </H2>
                <Caption className="text-lg text-gray-600">
                  <span id="booking-modal-description">Choose your preferred contact method</span>
                </Caption>
              </div>

              {/* Booking Option Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Card 1 - Call Us */}
                <Card hover className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary-100">
                    <FaPhone size={32} className="text-primary-600" />
                  </div>
                  <H4 className="mb-2">Call Us</H4>
                  <BodyText className="text-primary-600 font-semibold mb-2">
                    {formatPhoneNumber(contactInfo.phone)}
                  </BodyText>
                  <Caption className="mb-4 flex-grow">Speak directly with our team</Caption>
                  <Button
                    variant="primary"
                    size="md"
                    href={getPhoneLink(contactInfo.phone)}
                    className="w-full"
                    aria-label={`Call us at ${formatPhoneNumber(contactInfo.phone)}`}
                  >
                    Call Now
                  </Button>
                </Card>

                {/* Card 2 - WhatsApp */}
                <Card hover className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
                    <FaWhatsapp size={32} className="text-green-600" />
                  </div>
                  <H4 className="mb-2">WhatsApp Us</H4>
                  <BodyText className="text-green-600 font-semibold mb-2">
                    {formatPhoneNumber(contactInfo.whatsapp)}
                  </BodyText>
                  <Caption className="mb-4 flex-grow">Chat with us instantly</Caption>
                  <Button
                    variant="primary"
                    size="md"
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    aria-label="Open WhatsApp chat"
                  >
                    Open WhatsApp
                  </Button>
                </Card>

                {/* Card 3 - Visit Us */}
                <Card hover className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-accent-100">
                    <FaMapMarkerAlt size={32} className="text-accent-600" />
                  </div>
                  <H4 className="mb-2">Visit Our Location</H4>
                  <BodyText className="text-accent-600 font-semibold mb-2">
                    {contactInfo.address}
                  </BodyText>
                  <Caption className="mb-4 flex-grow">Come see the venue in person</Caption>
                  <Button
                    variant="primary"
                    size="md"
                    href={getMapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent-600 hover:bg-accent-700 focus:ring-accent-500"
                    aria-label="Get directions to our location"
                  >
                    Get Directions
                  </Button>
                </Card>
              </div>

              {/* Footer - Contact Hours */}
              <div className="text-center pt-6 border-t border-gray-200">
                <Caption className="text-gray-600">
                  <strong>Contact Hours:</strong> {contactInfo.businessHours.weekdays} (Weekdays) |{" "}
                  {contactInfo.businessHours.weekends} (Weekends)
                </Caption>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
