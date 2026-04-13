import { useState, useRef } from "react";
import { MoreHorizontal, Paperclip, FileText, Image, X } from "lucide-react";
import { useAssistant } from "../../hooks/useAssistant";

export function AssistantActions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef            = useRef<HTMLInputElement>(null);
  const { attachment, setAttachment, clearAttachment } = useAssistant();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachment(file);
    setMenuOpen(false);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Attachment preview chip */}
      {attachment && (
        <div className="absolute -top-9 left-0 flex items-center gap-1.5 bg-[#0B3B5C]/10 border border-[#0B3B5C]/20 rounded-full px-3 py-1 text-xs text-[#0B3B5C] max-w-[180px]">
          <Paperclip size={11} />
          <span className="truncate">{attachment.name}</span>
          <button
            onClick={clearAttachment}
            className="ml-0.5 opacity-60 hover:opacity-100"
            aria-label="Remove attachment"
          >
            <X size={11} />
          </button>
        </div>
      )}

      {/* "…" button */}
      <button
        onClick={() => setMenuOpen(p => !p)}
        aria-label="More options"
        className="p-2 rounded-full text-[#0B3B5C]/50 hover:text-[#0B3B5C] hover:bg-neutral-100 transition-colors"
      >
        <MoreHorizontal size={18} />
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute bottom-10 left-0 z-20 bg-white border border-border/40 rounded-xl shadow-xl py-1 w-52 text-sm">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 text-[#0B3B5C] transition-colors"
            >
              <Image size={15} className="text-[#3A74A0]" />
              Attach image or file
            </button>
            <button
              onClick={() => {
                window.location.href = "/request-consultation";
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 text-[#0B3B5C] transition-colors"
            >
              <FileText size={15} className="text-[#3A74A0]" />
              Submit consultation request
            </button>
          </div>
        </>
      )}
    </div>
  );
}