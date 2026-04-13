import { createContext, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import type { Message, Attachment, AssistantContextType } from "../../lib/assistantTypes";
import { sendToAssistant } from "../../lib/assistantClient";
import { ASSISTANT_CONFIG } from "../../lib/assistantConfig";

export const AssistantContext = createContext<AssistantContextType | null>(null);

function generateId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen]           = useState(false);
  const [messages, setMessages]       = useState<Message[]>([
    {
      id: generateId(),
      role: "assistant",
      content: ASSISTANT_CONFIG.GREETING,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput]             = useState("");
  const [isLoading, setIsLoading]     = useState(false);
  const [attachment, setAttachmentState] = useState<Attachment | null>(null);

  // isCompact is managed by AssistantBar via useScrollCompact — not stored here
  const [isCompact] = useState(false); // placeholder, overridden in bar

  const open   = useCallback(() => setIsOpen(true),  []);
  const close  = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(p => !p), []);

  const setAttachment = useCallback((file: File | null) => {
    if (!file) {
      setAttachmentState(null);
      return;
    }
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;

    setAttachmentState({
      name: file.name,
      type: file.type,
      size: file.size,
      preview,
    });
  }, []);

  const clearAttachment = useCallback(() => setAttachmentState(null), []);

  const sendMessage = useCallback(
    async (content: string, att?: Attachment) => {
      if (!content.trim() && !att) return;

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
        attachment: att ?? attachment ?? undefined,
      };

      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setAttachmentState(null);
      setIsLoading(true);

      try {
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        const reply = await sendToAssistant({
          messages: [...history, { role: "user", content }],
          attachment: att ?? attachment ?? undefined,
        });

        const assistantMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMsg]);
      } catch {
        setMessages(prev => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content: "Something went wrong. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, attachment]
  );

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        isCompact,
        messages,
        input,
        isLoading,
        attachment,
        open,
        close,
        toggle,
        sendMessage,
        setInput,
        setAttachment,
        clearAttachment,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}