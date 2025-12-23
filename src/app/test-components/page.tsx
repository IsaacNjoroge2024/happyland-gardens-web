import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Spinner from "@/components/ui/Spinner";
import { H1, H2, H3, H4, BodyText, Caption, Quote } from "@/components/ui/Typography";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

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
    </div>
  );
}
