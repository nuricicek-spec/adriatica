import { useAssistant } from "../../hooks/useAssistant";
import { useScrollCompact } from "../../hooks/useScrollCompact";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ArrowUpRight } from "lucide-react";

export function AssistantBar() {
  const { isOpen, open } = useAssistant();
  const isCompact        = useScrollCompact();
  const isMobile         = useMediaQuery("(max-width: 768px)");

  if (isOpen) return null;

  const showIconOnly = isCompact || (isMobile && isCompact);

  return (
    <button
      onClick={open}
      aria-label="Open technical assistant"
      className={`
        fixed bottom-6 right-6 z-[100]
        bg-[#0B3B5C] text-white
        shadow-xl hover:shadow-2xl
        flex items-center justify-center
        cursor-pointer select-none
        transition-all duration-300 ease-out
        hover:scale-[1.03] hover:bg-[#1A4B7A]
        focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60
        ${showIconOnly
          ? "w-12 h-12 rounded-full"
          : "px-5 py-3 rounded-full gap-2.5"
        }
      `}
    >
      {showIconOnly ? (
        <img
          src="/logo.svg"
          alt="Adriatica assistant"
          className="w-6 h-6 brightness-0 invert"
        />
      ) : (
        <>
          <span className="text-sm font-medium tracking-wide whitespace-nowrap">
            Assess your vessel
          </span>
          <ArrowUpRight size={15} strokeWidth={2.2} />
        </>
      )}
    </button>
  );
}