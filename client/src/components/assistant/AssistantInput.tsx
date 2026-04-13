import { useRef } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { ArrowUp } from "lucide-react";
import { useAssistant } from "../../hooks/useAssistant";
import { AssistantActions } from "./AssistantActions";

export function AssistantInput() {
  const { input, setInput, sendMessage, isLoading, attachment } = useAssistant();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if ((!input.trim() && !attachment) || isLoading) return;
    await sendMessage(input.trim(), attachment ?? undefined);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Mobilde Enter yeni satır eklesin, masaüstünde göndersin
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth >= 768) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const canSend = (input.trim().length > 0 || !!attachment) && !isLoading;

  return (
    <div className="px-4 pb-4 pt-2 border-t border-border/10">
      <div className="flex items-end gap-2 bg-neutral-50 border border-border/30 rounded-2xl px-3 py-2 focus-within:border-[#0B3B5C]/30 transition-colors">
        <AssistantActions />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your vessel..."
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent resize-none outline-none text-[16px] leading-snug text-[#0B3B5C] placeholder:text-muted-foreground/50 py-1 max-h-[120px] disabled:opacity-50"
          // font-size 16px — iOS'ta otomatik zoom'u engeller
          style={{ fontSize: "16px" }}
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className={`
            w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-0.5
            transition-all duration-200
            ${canSend
              ? "bg-[#0B3B5C] text-white hover:bg-[#1A4B7A] hover:scale-105"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }
          `}
        >
          <ArrowUp size={15} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground/40 mt-2">
        Adriatica Technical Assistant · Marine Engineering Support
      </p>
    </div>
  );
}