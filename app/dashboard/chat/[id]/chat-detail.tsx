"use client"

import { ChatPanel } from "@/components/chat-panel"
import type { ChatSession } from "@/lib/db"

interface ChatDetailProps {
  session: ChatSession
  initialMessages: Array<{ role: "user" | "assistant"; content: string }>
}

export function ChatDetail({ session, initialMessages }: ChatDetailProps) {
  const techStack = session.template_id ? {} : {}

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="h-[calc(100vh-200px)] rounded-xl border border-border bg-card overflow-hidden">
        <ChatPanel
          techStack={techStack}
          sessionId={session.id}
          initialMessages={initialMessages.map((m, i) => ({
            id: `msg-${i}`,
            role: m.role,
            content: m.content,
          }))}
        />
      </div>
    </div>
  )
}