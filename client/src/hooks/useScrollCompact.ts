import { useState, useEffect } from "react";
import { ASSISTANT_CONFIG } from "../lib/assistantConfig";

export function useScrollCompact(): boolean {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsCompact(window.scrollY > ASSISTANT_CONFIG.SCROLL_THRESHOLD);
      }, ASSISTANT_CONFIG.SCROLL_DEBOUNCE);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return isCompact;
}
