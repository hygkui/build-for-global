"use client"

import { useState } from "react"
import { Save, Loader2, Check, Copy, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveTemplate } from "@/app/actions/templates"
import type { SelectedStack } from "@/components/tech-stack-selector"

interface SaveTemplateDialogProps {
  selected: SelectedStack
  disabled?: boolean
}

export function SaveTemplateDialog({ selected, disabled }: SaveTemplateDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(false)
  const [savedSlug, setSavedSlug] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const selectedCount = Object.keys(selected).length

  const handleSave = async () => {
    if (!name.trim()) return

    setLoading(true)
    try {
      const template = await saveTemplate({
        name: name.trim(),
        description: description.trim() || undefined,
        techStack: selected,
        isPublic,
      })

      if (isPublic && template.share_slug) {
        setSavedSlug(template.share_slug)
      } else {
        setOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setIsPublic(false)
    setSavedSlug(null)
    setCopied(false)
  }

  const shareUrl = savedSlug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/t/${savedSlug}`
    : ""

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled || selectedCount === 0}>
          <Save className="mr-1.5 h-3.5 w-3.5" />
          保存模板
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {savedSlug ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                模板已保存
              </DialogTitle>
              <DialogDescription>
                分享链接已生成，复制后发送给他人即可查看
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                完成
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>保存技术栈模板</DialogTitle>
              <DialogDescription>
                保存当前选择，方便下次使用或分享给他人
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">模板名称</Label>
                <Input
                  id="name"
                  placeholder="例如：我的 SaaS 项目"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">描述（可选）</Label>
                <Input
                  id="description"
                  placeholder="简短描述这个模板"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  {isPublic ? (
                    <Globe className="h-4 w-4 text-primary" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {isPublic ? "公开分享" : "仅自己可见"}
                    </p>
                    <p className="text-xs text-muted">
                      {isPublic ? "任何人可通过链接查看" : "仅你可以在后台查看"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    isPublic ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      isPublic ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSave} disabled={!name.trim() || loading}>
                {loading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                保存
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}