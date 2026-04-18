import { useEffect } from "react";
import { Link } from "wouter";
import type { Message } from "../../lib/assistantTypes";

interface Props {
  message: Message;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Matches [ROUTE:/some/path] tokens emitted by the AI */
const ROUTE_TOKEN_RE = /\[ROUTE:([^\]]+)\]/;

/** Matches internal site paths that should become clickable links */
const INTERNAL_LINK_RE =
  /\/(insights|services|case-studies|deliverables|about|philosophy|request-consultation)(\/[^\s.,;:!?)]*)?/g;

/** Delay before auto-redirect fires (ms) — gives user time to read the message */
const REDIRECT_DELAY_MS = 300;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strips the [ROUTE:...] token from content and returns both the
 * cleaned text and the extracted route (or null if none found).
 */
function extractRoute(content: string): {
  clean: string;
  route: string | null;
} {
  const match = content.match(ROUTE_TOKEN_RE);
  if (!match) return { clean: content, route: null };
  return {
    clean: content.replace(ROUTE_TOKEN_RE, "").trim(),
    route: match[1],
  };
}

/**
 * Converts a plain-text message into an array of strings and <Link> elements
 * by replacing internal paths with wouter <Link> components.
 */
function renderWithLinks(content: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state before each call
  INTERNAL_LINK_RE.lastIndex = 0;

  while ((match = INTERNAL_LINK_RE.exec(content)) !== null) {
    const [fullMatch] = match;
    const start = match.index;

    // Push the text before this match
    if (start > lastIndex) {
      parts.push(content.slice(lastIndex, start));
    }

    // Push the link element
    parts.push(
      <Link
        key={`link-${start}`}
        href={fullMatch}
        className="text-primary underline font-medium hover:text-primary/80 transition-colors"
      >
        {fullMatch}
      </Link>,
    );

    lastIndex = start + fullMatch.length;
  }

  // Push any remaining text after the last match
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [content];
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AssistantMessageItem({ message }: Props) {
  const isUser = message.role === "user";

  // Extract route token and clean content — only for assistant messages
  const { clean, route } = isUser
    ? { clean: message.content, route: null }
    : extractRoute(message.content);

  // Auto-redirect when the AI emits a [ROUTE:...] token
  useEffect(() => {
    if (!route) return;
    const timer = setTimeout(() => {
      window.location.href = route;
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [route]);

  // Convert internal paths to clickable links (assistant only)
  const renderedContent = isUser ? clean : renderWithLinks(clean);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? "bg-[#0B3B5C] text-white rounded-br-sm"
              : "bg-neutral-100 text-[#0B3B5C] rounded-bl-sm"
          }
        `}
      >
        {/* Attachment preview */}
        {message.attachment?.preview && (
          <img
            src={message.attachment.preview}
            alt={message.attachment.name}
            className="max-w-full rounded-lg mb-2 max-h-40 object-cover"
          />
        )}
        {message.attachment && !message.attachment.preview && (
          <div className="flex items-center gap-2 mb-2 text-xs opacity-70">
            <span>📎</span>
            <span className="truncate max-w-[160px]">
              {message.attachment.name}
            </span>
          </div>
        )}

        {/* Message content — plain string for user, parsed JSX for assistant */}
        <span>{renderedContent}</span>

        <p
          className={`text-[10px] mt-1 opacity-40 ${isUser ? "text-right" : "text-left"}`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
