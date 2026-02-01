"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">(() => {
    if (typeof window === "undefined") return "pending";
    const consent = localStorage.getItem("analytics_consent");
    if (consent === "true") return "accepted";
    if (consent === "false") return "declined";
    return "pending";
  });

  const handleAccept = () => {
    localStorage.setItem("analytics_consent", "true");
    setStatus("accepted");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("analytics_consent", "false");
    setStatus("declined");
  };

  return (
    <AnimatePresence>
      {status === "pending" && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 shadow-lg"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-gray-300 flex-1">
                We use cookies to enhance your experience and track analytics to help us improve our
                website. By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
                <span className="text-gray-500">You can opt out at any time.</span>
              </p>
              <div className="flex gap-3 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Decline
                </Button>
                <Button variant="primary" size="sm" onClick={handleAccept}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
