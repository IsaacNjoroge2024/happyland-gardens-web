// TypeScript type definitions for Happyland Gardens

/**
 * Contact information interface
 */
export interface ContactInfo {
  businessName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  mapsLink: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  businessHours: {
    weekdays: string;
    weekends: string;
    holidays?: string;
  };
}

/**
 * Event type interface
 */
export interface EventType {
  id: string;
  name: string;
  description: string;
  slug: string;
  images: string[];
  features: string[];
  capacity: number;
  icon: string;
}

/**
 * About us information interface
 */
export interface AboutInfo {
  mission: string;
  story: string[];
  highlights: string[];
  established?: number;
}

/**
 * Gallery image interface
 */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  eventType?: string;
}

/**
 * Testimonial interface (for future use)
 */
export interface TestimonialInfo {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  date?: string;
  image?: string;
  eventType?: string;
}

/**
 * Site metadata interface
 */
export interface SiteMetadata {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  ogImage: string;
  keywords: string[];
}

/**
 * Hero image interface
 */
export interface HeroImage {
  src: string;
  alt: string;
}

/**
 * Hero CTA (Call-to-Action) interface
 */
export interface HeroCTA {
  text: string;
  href: string;
}

/**
 * Hero section data interface
 */
export interface HeroData {
  headline: string;
  subheadline: string;
  description: string;
  primaryCta: HeroCTA;
  secondaryCta: HeroCTA;
  images: HeroImage[];
  slideshowInterval: number;
  enableParallax: boolean;
}
