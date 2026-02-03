import type { Metadata } from "next";
import { Hero, Gallery, About } from "@/components/home";
import { heroData, galleryImages, aboutInfo, contactInfo } from "@/data";
import { siteMetadata } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Happyland Gardens - Premier Event Venue in Nairobi",
  description:
    "Host your dream event at Happyland Gardens. Beautiful outdoor venue perfect for weddings, corporate events, birthdays, and more. Located in Nairobi, Kenya.",
  keywords: ["event venue Nairobi", "garden venue Kenya", "wedding venue", "corporate event space"],
  openGraph: {
    title: "Happyland Gardens - Premier Event Venue in Nairobi",
    description:
      "Host your dream event at Happyland Gardens. Beautiful outdoor venue perfect for weddings, corporate events, birthdays, and more. Located in Nairobi, Kenya.",
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 634,
        alt: "Happyland Gardens Event Venue",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happyland Gardens - Premier Event Venue in Nairobi",
    description:
      "Host your dream event at Happyland Gardens. Beautiful outdoor venue perfect for weddings, corporate events, birthdays, and more. Located in Nairobi, Kenya.",
    images: [siteMetadata.ogImage],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["EventVenue", "LocalBusiness"],
    name: "Happyland Gardens",
    description: siteMetadata.siteDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kagundo Road",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contactInfo.location.latitude,
      longitude: contactInfo.location.longitude,
    },
    url: siteMetadata.siteUrl,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    priceRange: "$",
    openingHours: ["Mo-Fr 09:00-18:00", "Sa-Su 08:00-20:00"],
    areaServed: "Nairobi, Kenya",
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero data={heroData} />
      <Gallery images={galleryImages} />
      <About data={aboutInfo} />
      {/* Additional homepage sections will be added here */}
    </>
  );
}
