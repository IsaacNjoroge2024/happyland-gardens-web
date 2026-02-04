"use client";

import React from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { HiExclamationCircle } from "react-icons/hi2";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white px-4 py-3 flex items-center justify-center gap-2"
            role="alert"
            aria-live="assertive"
          >
            <HiExclamationCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium text-center">
              You are currently offline. Some features may be unavailable.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
