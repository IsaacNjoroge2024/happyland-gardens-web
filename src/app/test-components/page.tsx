import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Spinner from "@/components/ui/Spinner";
import { H1, H2, H3, H4, BodyText, Caption, Quote } from "@/components/ui/Typography";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { contactInfo, eventTypes, aboutInfo, siteMetadata } from "@/data";

export default function TestComponents() {
  return (
    <div className="min-h-screen">
      {/* Typography Test */}
      <Section background="white">
        <Container>
          <H1>Heading 1 - Page Title</H1>
          <H2 className="mt-8">Heading 2 - Section Title</H2>
          <H3 className="mt-6">Heading 3 - Subsection Title</H3>
          <H4 className="mt-4">Heading 4 - Card Title</H4>
          <BodyText>
            This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </BodyText>
          <Caption className="mt-2">This is a caption - smaller text for secondary info</Caption>
          <Quote className="mt-4">
            This is a quote. Perfect for testimonials or highlighting important text.
          </Quote>
        </Container>
      </Section>

      {/* Button Test */}
      <Section background="gray">
        <Container>
          <H2 className="mb-8">Buttons</H2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Primary Large
            </Button>
            <Button variant="primary" size="md">
              Primary Medium
            </Button>
            <Button variant="primary" size="sm">
              Primary Small
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button leftIcon={<FaPhone />}>Call Us</Button>
            <Button rightIcon={<FaWhatsapp />}>WhatsApp</Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Container>
      </Section>

      {/* Card Test */}
      <Section background="white">
        <Container>
          <H2 className="mb-8">Cards</H2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <H4>Card Title</H4>
              <BodyText>This is a basic card with content inside.</BodyText>
            </Card>
            <Card hover className="p-6">
              <H4>Hoverable Card</H4>
              <BodyText>This card has a hover effect.</BodyText>
            </Card>
            <Card className="p-6">
              <H4>Another Card</H4>
              <BodyText>Cards are great for organizing content.</BodyText>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Spinner Test */}
      <Section background="gray">
        <Container>
          <H2 className="mb-8">Loading Spinners</H2>
          <div className="flex items-center gap-8">
            <div>
              <Caption className="mb-2">Small</Caption>
              <Spinner size="sm" />
            </div>
            <div>
              <Caption className="mb-2">Medium</Caption>
              <Spinner size="md" />
            </div>
            <div>
              <Caption className="mb-2">Large</Caption>
              <Spinner size="lg" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Container Sizes Test */}
      <Section background="white">
        <Container size="sm">
          <H2 className="mb-4">Small Container</H2>
          <BodyText>Max width: 896px</BodyText>
        </Container>
      </Section>

      <Section background="gray">
        <Container size="md">
          <H2 className="mb-4">Medium Container</H2>
          <BodyText>Max width: 1024px</BodyText>
        </Container>
      </Section>

      <Section background="primary">
        <Container size="lg">
          <H2 className="mb-4">Large Container (Default)</H2>
          <BodyText>Max width: 1280px</BodyText>
        </Container>
      </Section>

      {/* Static Data Test */}
      <Section background="white">
        <Container>
          <H2 className="mb-8">Static Data Configuration Test</H2>

          {/* Contact Info Test */}
          <Card className="p-6 mb-6">
            <H3 className="mb-4">Contact Information</H3>
            <div className="space-y-2">
              <BodyText>
                <strong>Business:</strong> {contactInfo.businessName}
              </BodyText>
              <BodyText>
                <strong>Phone:</strong> {contactInfo.phone}
              </BodyText>
              <BodyText>
                <strong>Email:</strong> {contactInfo.email}
              </BodyText>
              <BodyText>
                <strong>Address:</strong> {contactInfo.address}
              </BodyText>
              <BodyText>
                <strong>Hours (Weekdays):</strong> {contactInfo.businessHours.weekdays}
              </BodyText>
            </div>
          </Card>

          {/* Event Types Test */}
          <Card className="p-6 mb-6">
            <H3 className="mb-4">Event Types ({eventTypes.length} total)</H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventTypes.slice(0, 4).map((event) => (
                <div key={event.id} className="border-l-4 border-primary-500 pl-4">
                  <H4>{event.name}</H4>
                  <Caption>Capacity: {event.capacity} guests</Caption>
                  <Caption className="mt-1">{event.features.length} features</Caption>
                </div>
              ))}
            </div>
          </Card>

          {/* About Info Test */}
          <Card className="p-6 mb-6">
            <H3 className="mb-4">About Information</H3>
            <BodyText>
              <strong>Established:</strong> {aboutInfo.established ?? "N/A"}
            </BodyText>
            <BodyText className="mt-2">
              <strong>Mission:</strong> {aboutInfo.mission.slice(0, 100)}...
            </BodyText>
            <BodyText className="mt-2">
              <strong>Highlights:</strong> {aboutInfo.highlights.length} key features
            </BodyText>
          </Card>

          {/* Site Metadata Test */}
          <Card className="p-6">
            <H3 className="mb-4">Site Metadata</H3>
            <BodyText>
              <strong>Site Name:</strong> {siteMetadata.siteName}
            </BodyText>
            <BodyText className="mt-2">
              <strong>Keywords:</strong> {siteMetadata.keywords.length} SEO keywords configured
            </BodyText>
            <BodyText className="mt-2">
              <strong>Description:</strong> {siteMetadata.siteDescription.slice(0, 100)}...
            </BodyText>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
