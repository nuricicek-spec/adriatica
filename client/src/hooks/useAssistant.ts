import { useContext } from "react";
import { AssistantContext } from "../components/assistant/AssistantProvider";
import type { AssistantContextType } from "../lib/assistantTypes";

export function useAssistant(): AssistantContextType {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error("useAssistant must be used within <AssistantProvider>");
  }
  return ctx;
}
