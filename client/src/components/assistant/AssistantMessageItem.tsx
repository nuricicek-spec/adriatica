import type { Message } from "../../lib/assistantTypes";

interface Props {
  message: Message;
}

export function AssistantMessageItem({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${isUser
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
            <span className="truncate max-w-[160px]">{message.attachment.name}</span>
          </div>
        )}

        {message.content}

        <p className={`text-[10px] mt-1 opacity-40 ${isUser ? "text-right" : "text-left"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}