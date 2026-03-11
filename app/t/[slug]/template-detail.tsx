"use client"

import { useState } from "react"
import { Copy, Check, GitFork, Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TECH_STACKS } from "@/lib/tech-stacks"
import { forkTemplate, toggleFavorite, checkFavoriteStatus } from "@/app/actions/templates"
import { useRouter } from "next/navigation"
import type { Template } from "@/lib/db"
import { cn } from "@/lib/utils"

interface TemplateDetailProps {
  template: Template
}

export function TemplateDetail({ template }: TemplateDetailProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [forking, setForking] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)

  useState(() => {
    checkFavoriteStatus(template.id).then(setFavorited)
  })

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFork = async () => {
    setForking(true)
    try {
      await forkTemplate(template.share_slug!)
      router.push("/dashboard/templates")
    } catch (error) {
      console.error(error)
    } finally {
      setForking(false)
    }
  }

  const handleFavorite = async () => {
    setFavoriteLoading(true)
    try {
      const result = await toggleFavorite(template.id)
      setFavorited(result)
    } catch (error) {
      console.error(error)
    } finally {
      setFavoriteLoading(false)
    }
  }

  const getOptionInfo = (categoryId: string, optionId: string) => {
    const category = TECH_STACKS.find((c) => c.id === categoryId)
    const option = category?.options.find((o) => o.id === optionId)
    return { category, option }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{template.name}</h1>
            {template.description && (
              <p className="mt-2 text-muted">{template.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={handleCopyUrl}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavorite}
              disabled={favoriteLoading}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  favorited && "fill-destructive text-destructive"
                )}
              />
            </Button>
            <Button size="sm" onClick={handleFork} disabled={forking}>
              {forking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GitFork className="h-4 w-4" />
              )}
              <span className="ml-1.5">复制到我的</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 text-sm text-muted">
          <span>浏览 {template.view_count}</span>
          <span>复制 {template.fork_count}</span>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">技术栈配置</h2>
          <div className="space-y-3">
            {Object.entries(template.tech_stack).map(([categoryId, optionId]) => {
              const { category, option } = getOptionInfo(categoryId, optionId)
              if (!category || !option) return null

              return (
                <div
                  key={categoryId}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-muted">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{option.name}</p>
                    {option.docs && (
                      <a
                        href={option.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted hover:text-foreground underline"
                      >
                        文档
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}