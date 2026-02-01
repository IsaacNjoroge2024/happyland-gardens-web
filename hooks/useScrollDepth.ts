import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const SCROLL_DEPTHS = [25, 50, 75, 100];

/**
 * Custom hook to track page scroll depth milestones via Google Analytics.
 * Resets tracked milestones on route changes so each page is tracked independently.
 */
export function useScrollDepth() {
  const pathname = usePathname();
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    tracked.current.clear();

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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
}
