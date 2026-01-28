import { EventType } from "@/types";

/**
 * Event types offered at Happyland Gardens
 * Update this file to add, remove, or modify event types
 */
export const eventTypes: EventType[] = [
  {
    id: "weddings",
    name: "Weddings",
    slug: "weddings",
    description:
      "Create your dream wedding at our beautiful outdoor venue. Our lush gardens and elegant spaces provide the perfect backdrop for your special day. From intimate ceremonies to grand celebrations, we make your wedding unforgettable.",
    images: [
      "/images/events/wedding-card.png",
      "/images/events/weddings-2.jpg",
      "/images/events/weddings-3.jpg",
    ],
    features: [
      "Beautiful outdoor ceremony space",
      "Elegant reception area",
      "Professional event coordination",
      "Customizable decor options",
      "Ample parking space",
      "Catering kitchen facilities",
      "Bridal suite",
      "Audio visual equipment",
    ],
    capacity: 500,
    icon: "FaHeart",
  },
  {
    id: "corporate-events",
    name: "Corporate Events",
    slug: "corporate-events",
    description:
      "Host your next corporate event in our professional and inspiring environment. Perfect for conferences, team building activities, product launches, and company celebrations. Modern facilities meet natural beauty.",
    images: [
      "/images/events/coorporate-event-card.png",
      "/images/events/corporate-2.jpg",
      "/images/events/corporate-3.jpg",
    ],
    features: [
      "Conference facilities",
      "High-speed WiFi",
      "Projector and screen",
      "Whiteboard and flip charts",
      "Breakout areas",
      "Catering services",
      "Team building spaces",
      "Secure parking",
    ],
    capacity: 300,
    icon: "FaBriefcase",
  },
  {
    id: "birthday-parties",
    name: "Birthday Parties",
    slug: "birthday-parties",
    description:
      "Celebrate your special day in style! Whether it's a milestone birthday or an intimate gathering, our venue offers the perfect setting for memorable birthday celebrations with family and friends.",
    images: [
      "/images/events/birthday-card.png",
      "/images/events/birthday-2.jpg",
      "/images/events/birthday-3.jpg",
    ],
    features: [
      "Flexible party spaces",
      "Kids play area",
      "Entertainment options",
      "Customizable themes",
      "Catering available",
      "Sound system",
      "Outdoor and indoor options",
      "Party planning assistance",
    ],
    capacity: 200,
    icon: "FaBirthdayCake",
  },
  {
    id: "baby-showers",
    name: "Baby Showers",
    slug: "baby-showers",
    description:
      "Welcome the new arrival in our charming garden setting. Our intimate spaces are perfect for baby showers, offering a warm and welcoming atmosphere for this special celebration with loved ones.",
    images: [
      "/images/events/baby-shower-card.png",
      "/images/events/baby-shower-2.jpg",
      "/images/events/baby-shower-3.jpg",
    ],
    features: [
      "Intimate garden settings",
      "Elegant decor options",
      "Comfortable seating areas",
      "Catering facilities",
      "Photo-friendly backdrops",
      "Indoor backup space",
      "Gift display areas",
      "Parking available",
    ],
    capacity: 100,
    icon: "FaBaby",
  },
  {
    id: "graduation-parties",
    name: "Graduation Parties",
    slug: "graduation-parties",
    description:
      "Celebrate academic achievements in our elegant venue. Perfect for graduation parties, our space offers a sophisticated yet fun atmosphere to honor your graduate's success with family and friends.",
    images: [
      "/images/events/graduation-card.png",
      "/images/events/graduation-2.jpg",
      "/images/events/graduation-3.jpg",
    ],
    features: [
      "Spacious event areas",
      "Photo booth opportunities",
      "Dance floor",
      "Sound and lighting",
      "Customizable setup",
      "Catering options",
      "Award presentation area",
      "Guest parking",
    ],
    capacity: 250,
    icon: "FaGraduationCap",
  },
  {
    id: "family-reunions",
    name: "Family Reunions",
    slug: "family-reunions",
    description:
      "Bring the whole family together in our spacious and welcoming venue. Our gardens provide the perfect setting for family reunions, offering plenty of space for activities, dining, and making memories.",
    images: [
      "/images/events/family-reunions-card.png",
      "/images/events/reunion-2.jpg",
      "/images/events/reunion-3.jpg",
    ],
    features: [
      "Large open spaces",
      "Multiple activity areas",
      "BBQ facilities",
      "Kids playground",
      "Shaded seating areas",
      "Games and recreation space",
      "Picnic areas",
      "Ample parking",
    ],
    capacity: 400,
    icon: "FaUsers",
  },
  {
    id: "garden-parties",
    name: "Garden Parties",
    slug: "garden-parties",
    description:
      "Experience the beauty of outdoor entertaining in our stunning gardens. Perfect for any celebration, from intimate gatherings to grand garden parties surrounded by nature's beauty.",
    images: [
      "/images/events/garden-parties-card.png",
      "/images/events/garden-party-2.jpg",
      "/images/events/garden-party-3.jpg",
    ],
    features: [
      "Beautiful landscaped gardens",
      "Outdoor seating arrangements",
      "String lighting",
      "Gazebo areas",
      "Natural photo backdrops",
      "Weather contingency plans",
      "Catering facilities",
      "Sound system",
    ],
    capacity: 350,
    icon: "FaLeaf",
  },
  {
    id: "engagement-parties",
    name: "Engagement Parties",
    slug: "engagement-parties",
    description:
      "Start your journey to forever in our romantic garden setting. Our venue provides the perfect intimate atmosphere for engagement parties and celebrations of love.",
    images: [
      "/images/events/engagment-parties-card.png",
      "/images/events/engagement-2.jpg",
      "/images/events/engagement-3.jpg",
    ],
    features: [
      "Romantic garden settings",
      "Elegant lighting options",
      "Intimate dining spaces",
      "Photo opportunities",
      "Champagne service area",
      "Customizable decor",
      "Entertainment space",
      "Valet parking",
    ],
    capacity: 150,
    icon: "FaRing",
  },
];
