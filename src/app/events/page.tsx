import React from "react";
import type { Metadata } from "next";
import { EventsGrid } from "@/components/events";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { eventTypes } from "@/data";
import { siteMetadata } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Our Events - Happyland Gardens | Weddings, Corporate Events & More",
  description:
    "Discover the variety of events we host at Happyland Gardens. From weddings and corporate events to birthday parties, baby showers, and family reunions. Explore our event types and find the perfect setting for your celebration.",
  keywords: [
    "events venue Nairobi",
    "wedding venue Kenya",
    "corporate events Nairobi",
    "birthday parties venue",
    "baby shower venue",
    "graduation parties Nairobi",
    "family reunion venue",
    "garden parties Kenya",
    "engagement parties venue",
    "event types Happyland Gardens",
  ],
  openGraph: {
    title: "Our Events - Happyland Gardens",
    description:
      "Explore the variety of events we host at Happyland Gardens. Perfect venue for weddings, corporate events, celebrations, and more.",
    url: `${siteMetadata.siteUrl}/events`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Happyland Gardens Event Venue",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Events - Happyland Gardens",
    description:
      "Explore the variety of events we host at Happyland Gardens. Perfect for weddings, corporate events, and celebrations.",
    images: [siteMetadata.ogImage],
  },
};

export default function EventsPage() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Event Types at Happyland Gardens",
    description: "Types of events hosted at Happyland Gardens event venue",
    itemListElement: eventTypes.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.name,
        description: event.description,
        location: {
          "@type": "Place",
          name: "Happyland Gardens",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KE",
            addressLocality: "Nairobi",
          },
        },
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        organizer: {
          "@type": "Organization",
          name: "Happyland Gardens",
          url: siteMetadata.siteUrl,
        },
      },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - Smaller than homepage */}
      <section
        className="relative h-[50vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden"
        aria-label="Events page hero"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWrapper
            src="/images/events/wedding-card.png"
            alt="Beautiful events at Happyland Gardens"
            fill
            priority
            objectFit="cover"
            sizes="100vw"
            className="brightness-75"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-heading">
            Our Events
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Discover the perfect setting for your special occasion
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <Section background="white" className="py-12 md:py-16">
        <Container size="md">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-heading">
              We Cater to Various Events
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Happyland Gardens, we pride ourselves on our flexibility and ability to accommodate
              a wide range of events. Our beautiful venue and experienced team ensure that every
              celebration is tailored to your unique vision and needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From intimate gatherings to grand celebrations, our versatile spaces and stunning
              natural surroundings provide the perfect backdrop for creating unforgettable memories.
              Explore our event types below to find the ideal setting for your special occasion.
            </p>
          </div>
        </Container>
      </Section>

      {/* Events Grid Section */}
      <Section background="gray" className="py-12 md:py-20">
        <Container size="lg">
          <EventsGrid events={eventTypes} />

          {/* Note about more events */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-lg">
              Don&apos;t see your event type listed? We&apos;re flexible and can accommodate many
              other types of events. Contact us to discuss your specific needs.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
