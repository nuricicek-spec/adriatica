// ─── Core types ──────────────────────────────────────────────────────────────

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  attachment?: Attachment;
}

export interface Attachment {
  name: string;
  type: string;
  size: number;
  /** base64 or object URL — resolved at send time */
  preview?: string;
}

export interface AssistantState {
  isOpen: boolean;
  isCompact: boolean;
  messages: Message[];
  input: string;
  isLoading: boolean;
  attachment: Attachment | null;
}

export interface AssistantActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  sendMessage: (content: string, attachment?: Attachment) => Promise<void>;
  setInput: (value: string) => void;
  setAttachment: (file: File | null) => void;
  clearAttachment: () => void;
}

export type AssistantContextType = AssistantState & AssistantActions;