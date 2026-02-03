"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data";

/**
 * Navigation link interface
 */
interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
  isBookingTrigger?: boolean;
}

/**
 * Navigation links configuration
 */
const navLinks: NavLink[] = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "#", isBookingTrigger: true },
];

/**
 * Navigation component props
 */
interface NavigationProps {
  className?: string;
  onBookNowClick?: (source?: string) => void;
}

/**
 * Navigation Component
 *
 * A responsive, accessible navigation bar with:
 * - Fixed/sticky header
 * - Desktop navigation with centered/right-aligned links
 * - Mobile hamburger menu with slide-in drawer
 * - Smooth scroll to sections
 * - Active section highlighting
 * - Scroll-based appearance changes
 * - Keyboard navigation and accessibility features
 */
export function Navigation({ className, onBookNowClick }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Refs for focus management
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasMobileMenuOpen = useRef(false);

  /**
   * Handle scroll events to update header appearance and active section
   */
  const handleScroll = useCallback(() => {
    // Update scroll state for header appearance
    setIsScrolled(window.scrollY > 10);

    // Find active section based on scroll position
    const sections = navLinks
      .filter((link) => link.sectionId)
      .map((link) => link.sectionId as string);

    for (const sectionId of [...sections].reverse()) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Section is considered active when its top is within the top half of the viewport
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection(sectionId);
          return;
        }
      }
    }

    // Default to home if no section is found
    setActiveSection("home");
  }, []);

  /**
   * Set up scroll listener and check initial scroll position
   */
  useEffect(() => {
    // Defer initial scroll check to handle deep links (e.g., /#about)
    const timeoutId = setTimeout(handleScroll, 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  /**
   * Focus management for mobile menu accessibility
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeButtonRef.current?.focus();
    } else if (wasMobileMenuOpen.current) {
      menuButtonRef.current?.focus();
    }
    wasMobileMenuOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  /**
   * Prevent body scroll when mobile menu is open
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }

    return () => {
      document.body.style.overflowY = "";
    };
  }, [isMobileMenuOpen]);

  /**
   * Handle keyboard navigation for mobile menu
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * Close mobile menu
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Handle navigation link click with smooth scroll or booking trigger
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    // Close mobile menu
    closeMobileMenu();

    trackEvent({
      action: "nav_link_clicked",
      category: "navigation",
      label: link.label.toLowerCase(),
    });

    // If this is a booking trigger, open the booking modal
    if (link.isBookingTrigger) {
      e.preventDefault();
      onBookNowClick?.("nav");
      return;
    }

    // If the link has a section ID and we're on the same page, smooth scroll
    if (link.sectionId) {
      const element = document.getElementById(link.sectionId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /**
   * Handle Book Now button click
   */
  const handleBookNowClickInternal = () => {
    closeMobileMenu();
    onBookNowClick?.("nav");
  };

  /**
   * Check if a nav link is currently active
   */
  const isLinkActive = (link: NavLink): boolean => {
    // Contact button is a modal trigger, never active
    if (link.isBookingTrigger) {
      return false;
    }

    // Check if we're on the Events page
    if (link.href === "/events") {
      return pathname === "/events";
    }

    // For home page sections, check both pathname and scroll position
    if (link.href === "/") {
      return pathname === "/" && activeSection === "home";
    }

    // For section links (like About), check active section from scroll
    return link.sectionId === activeSection && pathname === "/";
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/95 shadow-md backdrop-blur-md" : "bg-white/80 backdrop-blur-sm",
          className
        )}
        role="banner"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          <nav
            className="flex h-16 items-center justify-between md:h-20"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-green-700 transition-colors hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg font-heading"
              aria-label={`${contactInfo.businessName} - Home`}
            >
              <FaLeaf className="text-green-600" size={24} aria-hidden="true" />
              {contactInfo.businessName}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {/* Navigation Links */}
              <ul className="flex items-center gap-6" role="menubar">
                {navLinks.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={cn(
                        "relative px-1 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded",
                        isLinkActive(link)
                          ? "text-primary-600"
                          : "text-gray-700 hover:text-primary-600"
                      )}
                      role="menuitem"
                      aria-current={isLinkActive(link) ? "page" : undefined}
                    >
                      {link.label}
                      {/* Active indicator */}
                      {isLinkActive(link) && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Book Now Button */}
              <Button
                variant="primary"
                size="md"
                onClick={handleBookNowClickInternal}
                className="animate-pulse-slow motion-reduce:animate-none"
                aria-label="Book your event now"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMobileMenu}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Mobile Menu Header */}
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="text-xl font-bold text-primary-600 font-heading"
                  aria-label={`${contactInfo.businessName} - Home`}
                >
                  {contactInfo.businessName}
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Close menu"
                >
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <nav className="flex flex-col p-4" aria-label="Mobile navigation">
                {/* Navigation Links */}
                <ul className="flex flex-col gap-2" role="menu">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      role="none"
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={cn(
                          "flex w-full items-center rounded-lg px-4 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                          isLinkActive(link)
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                        )}
                        role="menuitem"
                        aria-current={isLinkActive(link) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mt-6"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleBookNowClickInternal}
                    className="w-full animate-pulse-slow motion-reduce:animate-none"
                    aria-label="Book your event now"
                  >
                    Book Now
                  </Button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                  className="mt-8 border-t border-gray-100 pt-6"
                >
                  <p className="text-sm text-muted-foreground">Need help?</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="mt-1 block text-base font-medium text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    aria-label={`Call us at ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Screen reader announcement for menu state */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isMobileMenuOpen ? "Mobile menu opened" : "Mobile menu closed"}
      </div>
    </>
  );
}
