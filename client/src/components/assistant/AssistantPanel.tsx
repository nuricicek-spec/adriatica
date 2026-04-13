import { useEffect, useRef } from "react";
import { useAssistant } from "../../hooks/useAssistant";
import { AssistantHeader } from "./AssistantHeader";
import { AssistantMessages } from "./AssistantMessages";
import { AssistantInput } from "./AssistantInput";

export function AssistantPanel() {
  const { isOpen, close } = useAssistant();
  const panelRef          = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <>
      {/* Backdrop — mobile only */}
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
          bottom-0 right-0
          w-full md:w-[400px] md:bottom-6 md:right-6
          h-[72vh] md:h-[560px]
          bg-white
          rounded-t-2xl md:rounded-2xl
          shadow-2xl
          flex flex-col overflow-hidden
          transition-all duration-300 ease-out
          ${isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
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