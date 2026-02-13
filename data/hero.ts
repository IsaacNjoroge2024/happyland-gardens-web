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
      src: "/images/hero/wedding-card.png",
      alt: "Beautiful wedding celebration at Happyland Gardens",
    },
    {
      src: "/images/hero/coorporate-event-card.png",
      alt: "Corporate event setup in scenic garden setting",
    },
    {
      src: "/images/hero/birthday-card.png",
      alt: "Vibrant birthday party celebration at our venue",
    },
    {
      src: "/images/hero/garden-parties-card.png",
      alt: "Elegant garden party with stunning outdoor setup",
    },
    {
      src: "/images/hero/engagment-parties-card.png",
      alt: "Romantic engagement party in our beautiful gardens",
    },
  ],
  slideshowInterval: 5000,
  enableParallax: false,
};
