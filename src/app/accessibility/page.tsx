import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { contactInfo } from "@/data";
import { siteMetadata } from "@/data/metadata";
import { formatPhoneNumber, getPhoneLink, getEmailLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Accessibility - Happyland Gardens",
  description:
    "Accessibility statement for Happyland Gardens. Learn about our commitment to WCAG 2.1 AA compliance and how to report accessibility issues.",
  openGraph: {
    title: "Accessibility - Happyland Gardens",
    description:
      "Accessibility statement for Happyland Gardens. Learn about our commitment to WCAG 2.1 AA compliance and how to report accessibility issues.",
    url: `${siteMetadata.siteUrl}/accessibility`,
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
    title: "Accessibility - Happyland Gardens",
    description:
      "Accessibility statement for Happyland Gardens. Learn about our commitment to WCAG 2.1 AA compliance and how to report accessibility issues.",
    images: [siteMetadata.ogImage],
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/accessibility`,
  },
};

export default function AccessibilityPage() {
  return (
    <Section background="white" className="pt-24 md:pt-28">
      <Container size="md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
          Accessibility Statement
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Happyland Gardens is committed to ensuring digital accessibility for all users, including
          those with disabilities. We continually improve the user experience for everyone and apply
          relevant accessibility standards.
        </p>

        {/* Conformance Status */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-10 font-heading">
          Conformance Status
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We are committed to conforming to <strong>WCAG 2.1 Level AA</strong> (Web Content
          Accessibility Guidelines). These guidelines explain how to make web content more
          accessible to people with disabilities.
        </p>

        {/* What We Have Done */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-10 font-heading">
          What We Have Done
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-4">
          <li>Semantic HTML structure with proper heading hierarchy throughout the site</li>
          <li>All meaningful images have descriptive alt text; decorative images use empty alt</li>
          <li>Full keyboard navigation support across all pages and interactive elements</li>
          <li>Focus indicators are visible and meet the 3:1 contrast ratio requirement</li>
          <li>Screen reader support via ARIA labels, roles, and live regions</li>
          <li>All modals trap focus correctly and can be closed with the Escape key</li>
          <li>Slideshows include pause and play controls for user-initiated playback</li>
          <li>
            Animations and transitions respect the{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              prefers-reduced-motion
            </code>{" "}
            media query
          </li>
          <li>Color contrast meets WCAG AA standards for all text and UI components</li>
          <li>A skip-to-content link is provided for keyboard users</li>
          <li>Gallery and slideshow carousels support arrow key navigation</li>
          <li>Dynamic content changes are announced to screen readers via ARIA live regions</li>
        </ul>

        {/* Known Issues */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-10 font-heading">
          Known Issues
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We are not aware of any current accessibility issues. We continuously monitor and improve
          the accessibility of our website. If you encounter an issue, please contact us using the
          details below.
        </p>

        {/* Contact Us */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-10 font-heading">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          If you experience any accessibility barriers on our website, please contact us. We aim to
          respond to all accessibility-related enquiries within 2 business days.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-4">
          <li>
            Phone:{" "}
            <a
              href={getPhoneLink(contactInfo.phone)}
              className="text-primary-600 hover:text-primary-700 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            >
              {formatPhoneNumber(contactInfo.phone)}
            </a>
          </li>
          <li>
            Email:{" "}
            <a
              href={getEmailLink(contactInfo.email, "Accessibility Concern")}
              className="text-primary-600 hover:text-primary-700 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            >
              {contactInfo.email}
            </a>
          </li>
        </ul>

        {/* Assessment Approach */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mt-10 font-heading">
          Assessment Approach
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We assessed the accessibility of our website through the following methods:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
          <li>Self-evaluation using Lighthouse accessibility audits</li>
          <li>Testing with axe DevTools and WAVE browser extensions</li>
          <li>Manual keyboard-only navigation testing across all pages</li>
          <li>Screen reader testing with VoiceOver and NVDA</li>
          <li>Color contrast verification using dedicated contrast checker tools</li>
        </ul>
      </Container>
    </Section>
  );
}
