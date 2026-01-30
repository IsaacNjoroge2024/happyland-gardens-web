"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiUsers,
  HiCalendarDays,
  HiSquare3Stack3D,
  HiUserGroup,
  HiAdjustmentsHorizontal,
} from "react-icons/hi2";
import ImageWrapper from "@/components/ui/ImageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AboutInfo } from "@/types";
import { useBookingModal } from "@/context";

interface AboutProps {
  data: AboutInfo;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <HiSparkles className="w-8 h-8" />,
    title: "Beautiful Gardens",
    description: "Beautifully landscaped gardens with mature trees and vibrant flowers",
  },
  {
    icon: <HiUsers className="w-8 h-8" />,
    title: "Flexible Spaces",
    description:
      "Accommodate events from intimate gatherings of 50 to grand celebrations of 500 guests",
  },
  {
    icon: <HiCalendarDays className="w-8 h-8" />,
    title: "Event Planning",
    description: "Professional event planning and coordination for seamless execution",
  },
  {
    icon: <HiSquare3Stack3D className="w-8 h-8" />,
    title: "Ample Parking",
    description: "Secure parking facilities for all your guests",
  },
  {
    icon: <HiUserGroup className="w-8 h-8" />,
    title: "Dedicated Staff",
    description: "Experienced and professional staff committed to your event's success",
  },
  {
    icon: <HiAdjustmentsHorizontal className="w-8 h-8" />,
    title: "Custom Packages",
    description: "Customizable event packages tailored to your specific needs",
  },
];

export const About: React.FC<AboutProps> = ({ data }) => {
  const { openBookingModal } = useBookingModal();

  return (
    <Section id="about" background="white">
      <Container size="lg">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading"
          >
            About Happyland Gardens
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            {data.mission}
          </motion.p>
        </div>

        {/* Two Column Layout: Text & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-20">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
                Our Story
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {data.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {data.established && (
              <div className="pt-6 border-t border-gray-200">
                <p className="text-lg font-semibold text-primary-600">
                  Established in {data.established}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <ImageWrapper
                src="/images/events/garden-parties-card.png"
                alt="Beautiful garden venue with lush greenery"
                fill
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-xl -z-10 hidden lg:block" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-400 rounded-xl -z-10 hidden lg:block" />
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center font-heading"
          >
            Why Choose Happyland Gardens
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary-100 text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Ready to create unforgettable memories at Happyland Gardens?
          </p>
          <Button onClick={openBookingModal} variant="primary" size="lg">
            Contact Us
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
