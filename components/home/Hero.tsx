"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { Button } from "@/components/ui/Button";
import { HeroData } from "@/types";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/context";

interface HeroProps {
  data: HeroData;
  // TODO: Implement parallax effect based on data.enableParallax flag
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { openBookingModal } = useBookingModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentImage = data.images[currentSlide];
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (data.images.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % data.images.length);
  }, [data.images.length]);

  useEffect(() => {
    if (!isPaused && data.images.length > 1) {
      const timer = setTimeout(nextSlide, data.slideshowInterval);
      return () => clearTimeout(timer);
    }
  }, [isPaused, nextSlide, data.slideshowInterval, data.images.length, currentSlide]);

  const scrollToContent = () => {
    const mainContent = document.getElementById("main-content");
    mainContent?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setIsPaused(true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    if (data.images.length === 0) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % data.images.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev - 1 + data.images.length) % data.images.length);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero section"
    >
      {/* Skip to content link for screen readers - must be first for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary-600 focus:rounded-lg focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        {currentImage && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ImageWrapper
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority={currentSlide === 0}
                objectFit="cover"
                sizes="100vw"
                className="brightness-75"
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Slideshow Indicators */}
      {data.images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2 [@media(max-height:670px)]:hidden">
          {data.images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 font-heading leading-tight">
            {data.headline}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6 font-heading">
            {data.subheadline}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            href={data.primaryCta.href}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            {data.primaryCta.text}
          </Button>
          <Button
            onClick={() => openBookingModal("hero")}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            {data.secondaryCta.text}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HiChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
        </motion.div>
      </motion.button>
    </section>
  );
};
