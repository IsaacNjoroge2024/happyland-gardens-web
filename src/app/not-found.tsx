import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data";
import { formatPhoneNumber } from "@/lib/utils";

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 md:pt-20"
      aria-label="Page not found"
    >
      <div className="max-w-lg w-full text-center">
        <div className="text-8xl font-bold text-primary-600 mb-6 font-heading">404</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-heading">
          Page Not Found
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you
          find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button href="/" variant="primary" size="lg" className="min-w-[160px]">
            Back to Home
          </Button>
          <Button href="/events" variant="outline" size="lg" className="min-w-[160px]">
            View Events
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-3">Need help finding something?</p>
          <p className="text-primary-600 font-semibold">{formatPhoneNumber(contactInfo.phone)}</p>
          <p className="text-gray-500 text-sm mt-1">{contactInfo.email}</p>
        </div>
      </div>
    </section>
  );
}
