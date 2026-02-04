"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiSparkles } from "react-icons/hi2";
import ImageWrapper from "@/components/ui/ImageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GalleryImage } from "@/types";
import { trackEvent } from "@/lib/analytics";

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasImages = images.length > 0;
  const safeIndex = hasImages ? Math.min(currentSlide, images.length - 1) : 0;
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (images.length > 0) {
      trackEvent({
        action: "gallery_image_viewed",
        category: "engagement",
        label: images[safeIndex].category,
      });
    }
  }, [safeIndex, images]);

  const handlePrevSlide = useCallback(() => {
    if (!hasImages) return;
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  const handleNextSlide = useCallback(() => {
    if (!hasImages) return;
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [hasImages, images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextSlide();
      }
    },
    [handlePrevSlide, handleNextSlide]
  );

  return (
    <Section id="gallery" background="gray">
      <Container size="lg">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading"
          >
            Our Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore the beauty and versatility of Happyland Gardens through memorable moments from
            past events
          </motion.p>
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
          role="region"
          aria-label="Photo gallery carousel"
          onKeyDown={handleKeyDown}
        >
          {/* Main Image Display */}
          <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-xl shadow-2xl bg-gray-200">
            <AnimatePresence mode="wait">
              {hasImages && (
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <ImageWrapper
                    src={images[safeIndex].src}
                    alt={images[safeIndex].alt}
                    fill
                    priority={safeIndex === 0}
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {!hasImages && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8">
                <p className="text-gray-500 text-lg font-medium">No gallery images available</p>
                <p className="text-gray-400 text-sm">Check back soon for photos from our events</p>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrevSlide}
              disabled={!hasImages}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Previous image"
            >
              <HiChevronLeft className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              disabled={!hasImages}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Next image"
            >
              <HiChevronRight className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            </button>

            {/* Image Counter */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 px-4 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-white text-sm md:text-base font-medium">
                {hasImages ? `Image ${safeIndex + 1} of ${images.length}` : "0 / 0"}
              </p>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-6 flex gap-3 md:gap-4 justify-center items-center flex-wrap px-4">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === safeIndex
                    ? "ring-4 ring-primary-500 scale-110 shadow-lg"
                    : "opacity-60 hover:opacity-100 hover:scale-105 shadow-md"
                }`}
                aria-label={`Go to image: ${image.alt}`}
                aria-current={index === safeIndex ? "true" : undefined}
              >
                <ImageWrapper src={image.src} alt="" fill objectFit="cover" sizes="80px" />
              </button>
            ))}

            {/* Coming Soon Thumbnail */}
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center"
              aria-hidden="true"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HiSparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
              </motion.div>
            </div>
          </div>

          {/* More Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 mb-4">More beautiful moments coming soon</p>
            <Button href="/contact" variant="primary" size="md">
              Book Your Event
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};
