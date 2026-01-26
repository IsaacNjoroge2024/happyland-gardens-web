import { HeroData } from "@/types";

/**
 * Hero section content for the homepage
 * Update this file to modify hero section text and images
 */
export const heroData: HeroData = {
  headline: "Welcome to Happyland Gardens",
  subheadline: "Your Perfect Event Destination in Nairobi",
  description:
    "Experience the beauty of nature combined with world-class facilities. From intimate gatherings to grand celebrations, create unforgettable memories in our stunning gardens.",
  primaryCta: {
    text: "Explore Events",
    href: "/events",
  },
  secondaryCta: {
    text: "Contact Us",
    href: "/contact",
  },
  images: [
    {
      src: "/images/hero/hero-1.jpg",
      alt: "Beautiful garden venue with lush greenery and event setup",
    },
    {
      src: "/images/hero/hero-2.jpg",
      alt: "Outdoor wedding ceremony in the gardens",
    },
    {
      src: "/images/hero/hero-3.jpg",
      alt: "Corporate event setup in scenic garden setting",
    },
    {
      src: "/images/hero/hero-4.jpg",
      alt: "Evening celebration with ambient lighting in the gardens",
    },
    {
      src: "/images/hero/hero-5.jpg",
      alt: "Garden pathways and elegant event spaces",
    },
  ],
  slideshowInterval: 5000,
  enableParallax: false,
};
