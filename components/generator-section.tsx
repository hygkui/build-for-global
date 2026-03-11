"use client"

import { useState, useCallback } from "react"
import { MessageSquare, FileCode } from "lucide-react"
import { TechStackSelector, type SelectedStack } from "@/components/tech-stack-selector"
import { PromptGenerator } from "@/components/prompt-generator"
import { SaveTemplateDialog } from "@/components/save-template-dialog"
import { ChatPanel } from "@/components/chat-panel"
import { cn } from "@/lib/utils"

type Tab = "prompt" | "chat"

export function GeneratorSection() {
  const [selected, setSelected] = useState<SelectedStack>({})
  const [activeTab, setActiveTab] = useState<Tab>("prompt")

  const handleChange = useCallback((newSelected: SelectedStack) => {
    setSelected(newSelected)
  }, [])

  return (
    <section id="generator" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          技术栈选择器
        </h2>
        <p className="mt-3 text-base text-muted">
          选择你的技术组合，生成提示词或咨询 AI 顾问
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex justify-end">
            <SaveTemplateDialog selected={selected} />
          </div>
          <TechStackSelector onChange={handleChange} />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex border-b border-border mb-4">
            <button
              onClick={() => setActiveTab("prompt")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === "prompt"
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted hover:text-foreground"
              )}
            >
              <FileCode className="h-4 w-4" />
              生成提示词
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === "chat"
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted hover:text-foreground"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              AI 顾问
            </button>
          </div>

          {activeTab === "prompt" ? (
            <PromptGenerator selected={selected} />
          ) : (
            <div className="h-[500px] rounded-xl border border-border bg-card overflow-hidden">
              <ChatPanel techStack={selected} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
