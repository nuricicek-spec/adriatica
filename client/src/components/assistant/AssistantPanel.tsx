import { useEffect, useRef } from "react";
import { useAssistant } from "../../hooks/useAssistant";
import { AssistantHeader } from "./AssistantHeader";
import { AssistantMessages } from "./AssistantMessages";
import { AssistantInput } from "./AssistantInput";

export function AssistantPanel() {
  const { isOpen, close } = useAssistant();
  const panelRef          = useRef<HTMLDivElement>(null);

  // Escape ile kapat
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Mobil: panel açıkken body scroll'u kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // iOS safari için position fixed trick
      document.body.style.position = "fixed";
      document.body.style.width    = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width    = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width    = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop — mobile */}
      <div
        className={`
          fixed inset-0 z-[99] bg-black/30 backdrop-blur-[2px]
          md:hidden transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Adriatica Technical Assistant"
        className={`
          fixed z-[100]
          /* Mobil: tam genişlik, ekranın altından yukarı çıkar */
          bottom-0 left-0 right-0
          /* Desktop: sağ köşe sabit boyutlu kutu */
          md:left-auto md:right-6 md:bottom-6 md:w-[400px]
          /* Yükseklik: dvh — sanal klavyeyi hesaba katar */
          h-[85dvh] md:h-[560px]
          bg-white
          rounded-t-2xl md:rounded-2xl
          shadow-2xl
          flex flex-col overflow-hidden
          transition-all duration-300 ease-out
          ${isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
          }
        `}
      >
        <AssistantHeader />
        <AssistantMessages />
        <AssistantInput />
      </div>
    </>
  );
}