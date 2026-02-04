"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { HiXMark, HiCheckCircle, HiExclamationCircle, HiInformationCircle } from "react-icons/hi2";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_DURATION = 5000;

const toastConfig = {
  success: {
    styles: "bg-green-50 border-green-200 text-green-800",
    icon: <HiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />,
  },
  error: {
    styles: "bg-red-50 border-red-200 text-red-800",
    icon: <HiExclamationCircle className="w-5 h-5 text-red-600 flex-shrink-0" aria-hidden="true" />,
  },
  info: {
    styles: "bg-blue-50 border-blue-200 text-blue-800",
    icon: (
      <HiInformationCircle className="w-5 h-5 text-blue-600 flex-shrink-0" aria-hidden="true" />
    ),
  },
  warning: {
    styles: "bg-amber-50 border-amber-200 text-amber-800",
    icon: (
      <HiExclamationCircle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
    ),
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idCounter = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = String(idCounter.current++);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <MotionConfig reducedMotion="user">
        <div
          className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0"
          aria-live="polite"
          aria-atomic="false"
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 64 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 64 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border shadow-md",
                  toastConfig[toast.type].styles
                )}
                role="alert"
              >
                {toastConfig[toast.type].icon}
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1 rounded"
                  aria-label="Dismiss notification"
                >
                  <HiXMark className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
