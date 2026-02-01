import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const SCROLL_DEPTHS = [25, 50, 75, 100];

/**
 * Custom hook to track page scroll depth milestones via Google Analytics
 */
export function useScrollDepth() {
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / docHeight) * 100);

      SCROLL_DEPTHS.forEach((depth) => {
        if (scrollPercent >= depth && !tracked.current.has(depth)) {
          tracked.current.add(depth);
          trackEvent({
            action: "page_scroll_depth",
            category: "engagement",
            label: `${depth}%`,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
