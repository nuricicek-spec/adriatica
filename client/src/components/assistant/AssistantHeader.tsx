import { ChevronDown } from "lucide-react";
import { useAssistant } from "../../hooks/useAssistant";
import { ASSISTANT_CONFIG } from "../../lib/assistantConfig";

export function AssistantHeader() {
  const { close } = useAssistant();

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-border/10 bg-[#0B3B5C] rounded-t-2xl md:rounded-t-xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <img
            src="/logo.svg"
            alt="Adriatica"
            className="w-5 h-5 brightness-0 invert"
          />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">
            {ASSISTANT_CONFIG.ASSISTANT_NAME}
          </p>
          <p className="text-white/50 text-xs leading-tight mt-0.5">
            {ASSISTANT_CONFIG.ASSISTANT_TAGLINE}
          </p>
        </div>
      </div>

      <button
        onClick={close}
        aria-label="Close assistant"
        className="text-white/50 hover:text-white transition-colors p-1 rounded"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}
