import { ASSISTANT_CONFIG } from "./assistantConfig";
import { getMockResponse } from "../mocks/assistantMock";
import type { Message, Attachment } from "./assistantTypes";

interface SendPayload {
  messages: Pick<Message, "role" | "content">[];
  attachment?: Attachment;
}

/**
 * Sends a message to the assistant backend.
 * Falls back to mock when USE_MOCK is true or when the request fails.
 */
export async function sendToAssistant(payload: SendPayload): Promise<string> {
  if (ASSISTANT_CONFIG.USE_MOCK) {
    return getMockResponse(payload.messages.at(-1)?.content ?? "");
  }

  try {
    const response = await fetch(ASSISTANT_CONFIG.ENDPOINT, {
      method: ASSISTANT_CONFIG.METHOD,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    // Adjust this path to match your backend's response shape
    return data.message ?? data.content ?? data.response ?? "";
  } catch (err) {
    console.error("[AssistantClient] Request failed:", err);
    return getMockResponse(payload.messages.at(-1)?.content ?? "");
  }
}