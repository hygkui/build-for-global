"use client"

import { useState, useEffect } from "react"
import { Copy, Check, ArrowRight, Sparkles, Download, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TECH_STACKS } from "@/lib/tech-stacks"
import { type SelectedStack } from "@/components/tech-stack-selector"
import { cn } from "@/lib/utils"
import Link from "next/link"

function generatePrompt(selected: SelectedStack): string {
  if (Object.keys(selected).length === 0) {
    return ""
  }

  const lines: string[] = []

  lines.push("# 项目初始化提示词（出海 SaaS 技术栈）\n")
  lines.push("请帮我创建一个面向海外市场的 SaaS 项目，使用以下技术栈：\n")

  lines.push("## 技术栈要求\n")

  for (const category of TECH_STACKS) {
    const optionId = selected[category.id]
    if (!optionId) continue
    const option = category.options.find((o) => o.id === optionId)
    if (!option) continue
    lines.push(`- **${category.name}**: ${option.name} - ${option.description}`)
  }

  lines.push("\n## 项目要求\n")
  lines.push("1. 使用 TypeScript + Next.js App Router")
  lines.push("2. 使用 Tailwind CSS + shadcn/ui 组件库")
  lines.push("3. 实现完整的用户认证流程（注册/登录/退出）")
  lines.push("4. 包含完整的项目目录结构和配置文件")
  lines.push("5. 包含环境变量示例文件 (.env.example)")

  if (selected.deployment) {
    const dep = TECH_STACKS.find((c) => c.id === "deployment")?.options.find(
      (o) => o.id === selected.deployment
    )
    if (dep) {
      lines.push(`6. 包含 ${dep.name} 的部署配置文件`)
    }
  }

  lines.push("\n## 项目结构\n")
  lines.push("请生成以下内容：")
  lines.push("- `package.json` 包含所有必要依赖")
  lines.push("- `app/` 目录下的基础页面（首页、登录、注册、仪表盘）")
  lines.push("- `lib/` 目录下的数据库连接和工具函数")
  lines.push("- `components/` 目录下的共享组件")
  lines.push("- `.env.example` 环境变量示例")
  lines.push("- `README.md` 包含快速启动说明")

  lines.push("\n## 最佳实践\n")
  lines.push("- 使用服务器组件（RSC）减少客户端 JavaScript")
  lines.push("- 使用 Server Actions 处理表单和数据突变")
  lines.push("- 实现正确的错误处理和 Loading 状态")
  lines.push("- 支持深色模式")
  lines.push("- SEO 优化（metadata、og:image）")
  lines.push("- 国际化友好（i18n ready）")

  return lines.join("\n")
}

interface PromptGeneratorProps {
  selected: SelectedStack
}

export function PromptGenerator({ selected }: PromptGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [copied, setCopied] = useState(false)
  const selectedCount = Object.keys(selected).length

  useEffect(() => {
    setPrompt(generatePrompt(selected))
  }, [selected])

  const handleCopy = async () => {
    if (!prompt) return
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (selectedCount === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
        <Sparkles className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">
          在左侧选择你的技术栈
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          选择后自动生成项目初始化提示词
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 提示词预览 */}
      <div className="relative rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">prompt.md</span>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-all",
              copied
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                复制
              </>
            )}
          </button>
        </div>
        <pre className="max-h-[400px] overflow-y-auto p-4 font-mono text-xs leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {prompt}
        </pre>
      </div>

      {/* 使用说明 */}
      <p className="text-xs text-muted-foreground text-center">
        复制提示词后，粘贴到{" "}
        <span className="text-foreground">v0.dev</span>、
        <span className="text-foreground">Cursor</span> 或{" "}
        <span className="text-foreground">Claude</span> 中即可生成项目
      </p>

      {/* 升级引导 */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">
          想要直接获得可运行的代码？
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/pricing" className="flex-1">
            <div className="group flex cursor-pointer items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-3 transition-all hover:border-primary/60 hover:bg-primary/20">
              <Download className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  $20 · 下载完整代码包
                </p>
                <p className="text-xs text-muted-foreground">
                  完整可运行项目，一键部署
                </p>
              </div>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
          <Link href="/pricing" className="flex-1">
            <div className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition-all hover:border-border/80 hover:bg-secondary/60">
              <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  $200 · MVP 外包开发
                </p>
                <p className="text-xs text-muted-foreground">
                  专业团队 1 对 1 交付
                </p>
              </div>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
