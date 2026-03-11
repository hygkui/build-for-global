"use client"

import { useEffect, useState } from "react"
import { Copy, Trash2, Globe, Lock, Eye, GitFork, MoreVertical, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMyTemplates, removeTemplate } from "@/app/actions/templates"
import type { Template } from "@/lib/db"
import { TECH_STACKS } from "@/lib/tech-stacks"
import { cn } from "@/lib/utils"

export function TemplatesList() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const data = await getMyTemplates()
      setTemplates(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除此模板？")) return
    try {
      await removeTemplate(id)
      setTemplates((prev) => prev.filter((t) => t.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleCopyShareUrl = (slug: string) => {
    const url = `${window.location.origin}/t/${slug}`
    navigator.clipboard.writeText(url)
  }

  const getTechStackLabel = (techStack: Record<string, string>) => {
    const labels: string[] = []
    for (const [categoryId, optionId] of Object.entries(techStack)) {
      const category = TECH_STACKS.find((c) => c.id === categoryId)
      const option = category?.options.find((o) => o.id === optionId)
      if (option) labels.push(option.name)
    }
    return labels.slice(0, 4).join(" + ") + (labels.length > 4 ? " ..." : "")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted" />
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border bg-secondary/20 p-12 text-center">
        <p className="text-muted">暂无保存的模板</p>
        <p className="mt-1 text-sm text-muted">在首页选择技术栈后点击「保存模板」</p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {template.is_public ? (
                <Globe className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <Lock className="h-4 w-4 shrink-0 text-muted" />
              )}
              <h3 className="font-semibold truncate">{template.name}</h3>
            </div>
            <p className="mt-1 text-sm text-muted truncate">
              {getTechStackLabel(template.tech_stack)}
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted">
              <span>{new Date(template.created_at).toLocaleDateString()}</span>
              {template.is_public && (
                <>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {template.view_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {template.fork_count}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            {template.is_public && template.share_slug && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyShareUrl(template.share_slug!)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(template.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}