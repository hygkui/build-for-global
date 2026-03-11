import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth/server"
import { getChatSessionById, getChatMessages } from "@/lib/db"
import { ChatDetail } from "./chat-detail"

interface Props {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "对话详情",
}

export default async function ChatDetailPage({ params }: Props) {
  const { data: session } = await auth.getSession()
  if (!session?.user) {
    redirect("/auth/sign-in")
  }

  const { id } = await params
  const chatSession = await getChatSessionById(id)

  if (!chatSession || chatSession.user_id !== session.user.id) {
    notFound()
  }

  const messages = await getChatMessages(id)

  return (
    <ChatDetail
      session={chatSession}
      initialMessages={messages.map((m) => ({
        role: m.role,
        content: m.content,
      }))}
    />
  )
}