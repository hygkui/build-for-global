import { Metadata } from "next"
import { ChatHistoryList } from "./chat-history-list"

export const metadata: Metadata = {
  title: "对话历史",
}

export default function ChatHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">对话历史</h1>
      <p className="mt-2 text-sm text-muted">
        与 AI 技术顾问的对话记录
      </p>
      <ChatHistoryList />
    </div>
  )
}