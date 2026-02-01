"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPhoneNumber, getPhoneLink, getEmailLink, getWhatsAppLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { contactInfo } from "@/data";
import Container from "@/components/ui/Container";
import { H4, BodyText, Caption } from "@/components/ui/Typography";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaClock,
} from "react-icons/fa";

interface FooterProps {
  className?: string;
}

interface QuickLink {
  label: string;
  href: string;
  external?: boolean;
}

const quickLinks: QuickLink[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/#events" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string) => {
    e.preventDefault();
    alert(`${platform} coming soon! Follow us for updates.`);
  };

  return (
    <footer className={cn("bg-primary-900 text-white", className)} role="contentinfo">
      {/* Main Footer Content */}
      <div className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 - Branding */}
            <div className="space-y-4">
              <H4 className="text-white">{contactInfo.businessName}</H4>
              <BodyText className="text-primary-100">Creating Memorable Moments in Nature</BodyText>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  onClick={(e) => handleSocialClick(e, "Facebook")}
                  className="text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-md p-1"
                  aria-label="Facebook - Coming Soon"
                >
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  onClick={(e) => handleSocialClick(e, "Instagram")}
                  className="text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-md p-1"
                  aria-label="Instagram - Coming Soon"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  onClick={(e) => handleSocialClick(e, "Twitter")}
                  className="text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-md p-1"
                  aria-label="Twitter - Coming Soon"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-4">
              <H4 className="text-white">Quick Links</H4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent({
                              action: "footer_link_clicked",
                              category: "navigation",
                              label: link.label,
                            })
                          }
                          className="text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() =>
                            trackEvent({
                              action: "footer_link_clicked",
                              category: "navigation",
                              label: link.label,
                            })
                          }
                          className="text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3 - Contact Information */}
            <div className="space-y-4">
              <H4 className="text-white">Contact Us</H4>
              <ul className="space-y-3">
                {/* Phone */}
                <li>
                  <a
                    href={getPhoneLink(contactInfo.phone)}
                    onClick={() =>
                      trackEvent({
                        action: "footer_link_clicked",
                        category: "navigation",
                        label: "phone",
                      })
                    }
                    className="flex items-center gap-3 text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-sm"
                    aria-label={`Call us at ${formatPhoneNumber(contactInfo.phone)}`}
                  >
                    <FaPhone className="h-4 w-4 flex-shrink-0" />
                    <span>{formatPhoneNumber(contactInfo.phone)}</span>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href={getWhatsAppLink(
                      contactInfo.whatsapp,
                      "Hello! I would like to inquire about Happyland Gardens."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent({
                        action: "footer_link_clicked",
                        category: "navigation",
                        label: "whatsapp",
                      })
                    }
                    className="flex items-center gap-3 text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-sm"
                    aria-label="Contact us on WhatsApp"
                  >
                    <FaWhatsapp className="h-4 w-4 flex-shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a
                    href={getEmailLink(contactInfo.email)}
                    onClick={() =>
                      trackEvent({
                        action: "footer_link_clicked",
                        category: "navigation",
                        label: "email",
                      })
                    }
                    className="flex items-center gap-3 text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-sm"
                    aria-label={`Email us at ${contactInfo.email}`}
                  >
                    <FaEnvelope className="h-4 w-4 flex-shrink-0" />
                    <span>{contactInfo.email}</span>
                  </a>
                </li>

                {/* Address */}
                <li>
                  <a
                    href={contactInfo.mapsLinkDesktop || contactInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent({
                        action: "footer_link_clicked",
                        category: "navigation",
                        label: "address",
                      })
                    }
                    className="flex items-start gap-3 text-primary-200 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-sm"
                    aria-label={`Find us at ${contactInfo.address}`}
                  >
                    <FaMapMarkerAlt className="h-4 w-4 flex-shrink-0 mt-1" />
                    <span>{contactInfo.address}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Business Hours */}
            <div className="space-y-4">
              <H4 className="text-white">Business Hours</H4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-primary-200">
                  <FaClock className="h-4 w-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-white">Weekdays</p>
                    <p>{contactInfo.businessHours.weekdays}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-primary-200">
                  <FaClock className="h-4 w-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-white">Weekends</p>
                    <p>{contactInfo.businessHours.weekends}</p>
                  </div>
                </li>
                {contactInfo.businessHours.holidays && (
                  <li className="flex items-start gap-3 text-primary-200">
                    <FaClock className="h-4 w-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-white">Holidays</p>
                      <p>{contactInfo.businessHours.holidays}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800 py-6">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <Caption className="text-primary-300">
              &copy; {currentYear} {contactInfo.businessName}. All rights reserved.
            </Caption>
            <Caption className="text-primary-300">Designed and Developed with care</Caption>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
