"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMyChatSessions, removeChatSession } from "@/app/actions/chat"
import type { ChatSession } from "@/lib/db"
import { useRouter } from "next/navigation"

export function ChatHistoryList() {
  const router = useRouter()
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      const data = await getMyChatSessions()
      setSessions(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除此对话？")) return
    try {
      await removeChatSession(id)
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted" />
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border bg-secondary/20 p-12 text-center">
        <MessageSquare className="h-8 w-8 mx-auto text-muted mb-3" />
        <p className="text-muted">暂无对话记录</p>
        <p className="mt-1 text-sm text-muted">在首页与 AI 顾问对话后，记录会保存在这里</p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 cursor-pointer"
          onClick={() => router.push(`/dashboard/chat/${session.id}`)}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 shrink-0 text-muted" />
              <h3 className="font-semibold truncate">
                {session.title || "新对话"}
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted">
              {new Date(session.updated_at).toLocaleString()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(session.id)
            }}
            className="text-destructive hover:text-destructive shrink-0 ml-4"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}