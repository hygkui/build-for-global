"use server"

import { auth } from "@/lib/auth/server"
import {
  createChatSession,
  getChatSessionsByUserId,
  getChatSessionById,
  deleteChatSession,
  getChatMessages,
  createChatMessage,
  type ChatSession,
  type ChatMessage,
} from "@/lib/db"
import { revalidatePath } from "next/cache"

async function requireAuth() {
  const { data: session } = await auth.getSession()
  if (!session?.user) throw new Error("请先登录")
  return session.user
}

export async function newChatSession(data?: {
  templateId?: string
  title?: string
}): Promise<ChatSession> {
  const user = await requireAuth()
  return createChatSession({
    userId: user.id,
    templateId: data?.templateId,
    title: data?.title,
  })
}

export async function getMyChatSessions(): Promise<ChatSession[]> {
  const user = await requireAuth()
  return getChatSessionsByUserId(user.id)
}

export async function getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
  const user = await requireAuth()

  const session = await getChatSessionById(sessionId)
  if (!session || session.user_id !== user.id) {
    throw new Error("会话不存在或无权限")
  }

  return getChatMessages(sessionId)
}

export async function removeChatSession(id: string): Promise<void> {
  const user = await requireAuth()

  const session = await getChatSessionById(id)
  if (!session || session.user_id !== user.id) {
    throw new Error("会话不存在或无权限")
  }

  await deleteChatSession(id)
  revalidatePath("/dashboard/chat")
}

export async function saveMessage(data: {
  sessionId: string
  role: "user" | "assistant"
  content: string
  techStackContext?: Record<string, string>
}): Promise<ChatMessage> {
  return createChatMessage(data)
}