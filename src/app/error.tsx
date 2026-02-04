"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data";
import { formatPhoneNumber } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 md:pt-20"
      aria-label="Error page"
    >
      <div className="max-w-lg w-full text-center">
        <div className="text-8xl font-bold text-red-600 mb-6 font-heading">500</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-heading">
          Something Went Wrong
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button onClick={reset} variant="primary" size="lg" className="min-w-[160px]">
            Try Again
          </Button>
          <Button href="/" variant="outline" size="lg" className="min-w-[160px]">
            Back to Home
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-3">If the problem persists, contact us:</p>
          <p className="text-primary-600 font-semibold">{formatPhoneNumber(contactInfo.phone)}</p>
          <p className="text-gray-500 text-sm mt-1">{contactInfo.email}</p>
        </div>
      </div>
    </section>
  );
}
