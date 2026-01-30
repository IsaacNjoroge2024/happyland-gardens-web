"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { Button } from "@/components/ui/Button";
import { EventType } from "@/types";

interface SlideshowModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventType;
  onBookClick: () => void;
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({
  isOpen,
  onClose,
  event,
  onBookClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = event.images;
  const hasMultipleImages = images.length > 1;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Clamp currentIndex to valid range if event changes
  const safeIndex = Math.min(currentIndex, images.length - 1);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }

    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isOpen || !isAutoPlaying || !hasMultipleImages) {
      return;
    }

    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isOpen, isAutoPlaying, images.length, hasMultipleImages]);

  // Pause auto-play on manual interaction
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
  }, []);

  // Navigate to previous image
  const handlePrevious = useCallback(() => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, pauseAutoPlay]);

  // Navigate to next image
  const handleNext = useCallback(() => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, pauseAutoPlay]);

  // Jump to specific image
  const handleDotClick = useCallback(
    (index: number) => {
      pauseAutoPlay();
      setCurrentIndex(index);
    },
    [pauseAutoPlay]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrevious, handleNext]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      window.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload next image
    const nextIndex = (safeIndex + 1) % images.length;
    preloadImage(images[nextIndex]);

    // Preload previous image
    const prevIndex = (safeIndex - 1 + images.length) % images.length;
    preloadImage(images[prevIndex]);
  }, [safeIndex, images, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Modal Container */}
          <motion.div
            key={event.id}
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={pauseAutoPlay}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
              <h2
                id="modal-title"
                className="text-2xl md:text-3xl font-bold text-gray-900 font-heading"
              >
                {event.name}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-3 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Close modal"
              >
                <HiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Slideshow Area */}
            <div className="relative flex-1 bg-gray-900 overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <ImageWrapper
                    src={images[safeIndex]}
                    alt={`${event.name} - Image ${safeIndex + 1}`}
                    fill
                    objectFit="contain"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority={safeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-manipulation"
                    aria-label="Previous image"
                  >
                    <HiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-manipulation"
                    aria-label="Next image"
                  >
                    <HiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 px-4 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm">
                <p className="text-white text-sm md:text-base font-medium">
                  {safeIndex + 1} / {images.length}
                </p>
              </div>
            </div>

            {/* Image Indicators (Dots) */}
            {hasMultipleImages && (
              <div className="py-4 px-6 bg-white border-t border-gray-200 flex justify-center items-center gap-2 overflow-x-auto">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDotClick(index)}
                    className={`flex-shrink-0 rounded-full transition-all duration-300 touch-manipulation ${
                      index === safeIndex
                        ? "w-3 h-3 bg-primary-600"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                    aria-current={index === safeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            )}

            {/* Book With Us Button */}
            <div className="px-6 py-6 bg-gray-50 border-t border-gray-200 flex justify-center">
              <Button
                onClick={onBookClick}
                variant="primary"
                size="lg"
                className="w-full md:w-auto min-w-[200px]"
              >
                Book With Us
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
