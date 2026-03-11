import { streamText } from "ai"
import { NextRequest } from "next/server"
import { auth } from "@/lib/auth/server"
import { aiModel } from "@/lib/ai/client"
import { buildSystemPrompt } from "@/lib/ai/prompts/tech-advisor"
import { createChatSession, getChatSessionById, createChatMessage } from "@/lib/db"
import type { SelectedStack } from "@/components/tech-stack-selector"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { data: session } = await auth.getSession()
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "请先登录" }), { status: 401 })
    }

    const body = await req.json()
    const { messages, techStack, sessionId } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>
      techStack: SelectedStack
      sessionId?: string
    }

    let currentSessionId = sessionId

    if (!currentSessionId) {
      const newSession = await createChatSession({
        userId: session.user.id,
      })
      currentSessionId = newSession.id
    }

    const lastUserMessage = messages.filter((m) => m.role === "user").pop()

    if (lastUserMessage) {
      await createChatMessage({
        sessionId: currentSessionId,
        role: "user",
        content: lastUserMessage.content,
        techStackContext: techStack,
      })
    }

    const result = streamText({
      model: aiModel,
      system: buildSystemPrompt(techStack),
      messages,
      onFinish: async ({ text }) => {
        await createChatMessage({
          sessionId: currentSessionId!,
          role: "assistant",
          content: text,
        })
      },
    })

    return result.toTextStreamResponse({
      headers: {
        "X-Session-Id": currentSessionId,
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "服务器错误" }), { status: 500 })
  }
}