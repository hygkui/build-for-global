"use client"

import { useState, useCallback } from "react"
import { Check, ChevronDown, ChevronUp, AlertTriangle, Info, Package, ArrowRight } from "lucide-react"
import { TECH_STACKS, DEPLOYMENT_COMPAT, type TechCategory, type TechOption } from "@/lib/tech-stacks"
import { cn } from "@/lib/utils"
import Link from "next/link"

export type SelectedStack = Record<string, string>

// ─── 兼容性警告计算 ──────────────────────────────────────────────────────────

interface CompatWarning {
  type: "error" | "info"
  message: string
  tip?: string
}

function getCompatWarnings(selected: SelectedStack): CompatWarning[] {
  const warnings: CompatWarning[] = []
  const deployId = selected["deployment"]
  const cronId = selected["cron"]
  const wsId = selected["websocket"]
  const dbId = selected["database"]

  if (!deployId) return warnings

  const compat = DEPLOYMENT_COMPAT[deployId]
  if (!compat) return warnings

  // Cron 兼容性
  if (cronId) {
    if (cronId === "cf-durable-objects" && deployId !== "cloudflare") {
      warnings.push({
        type: "error",
        message: "Cloudflare Durable Objects 仅支持 Cloudflare Workers 部署",
        tip: "请切换部署平台至 Cloudflare Workers，或改用 Ably / Pusher / SSE。",
      })
    }
    if (cronId === "db-cloud-function" && dbId !== "supabase") {
      warnings.push({
        type: "error",
        message: "数据库 Cloud Function (pg_cron) 仅支持 Supabase",
        tip: "请选择 Supabase 作为数据库，或改用 QStash / GitHub Actions。",
      })
    }
  }

  // WebSocket 兼容性
  if (wsId) {
    if (wsId === "cf-durable-objects" && deployId !== "cloudflare") {
      warnings.push({
        type: "error",
        message: "Cloudflare Durable Objects 仅支持 Cloudflare Workers 部署",
        tip: "请切换部署平台至 Cloudflare Workers，或改用 Ably / Pusher / SSE。",
      })
    }
    if (wsId === "supabase-realtime" && dbId !== "supabase") {
      warnings.push({
        type: "error",
        message: "Supabase Realtime 需要使用 Supabase 作为数据库",
        tip: "请选择 Supabase 作为数据库，或改用 Ably / Pusher。",
      })
    }
    if (!compat.supportsWs && wsId !== "sse") {
      warnings.push({
        type: "info",
        message: `${deployId === "vercel" ? "Vercel" : "Deno Deploy"} 不支持原生 WebSocket 持久连接`,
        tip: compat.wsNote,
      })
    }
  }

  return warnings
}

// ─── 子组件 ─────────────────────────────────────────────────────────────────

function CompatBadge({ option, deployId }: { option: TechOption; deployId?: string }) {
  if (!deployId) return null

  // Durable Objects 仅限 CF
  if (option.id === "cf-durable-objects" && deployId !== "cloudflare") {
    return (
      <span className="ml-auto mt-0.5 shrink-0 rounded bg-destructive/20 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
        仅限 CF
      </span>
    )
  }
  // Supabase Realtime 需要 Supabase DB
  if (option.id === "supabase-realtime") {
    return (
      <span className="ml-auto mt-0.5 shrink-0 rounded bg-yellow-500/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400">
        需 Supabase DB
      </span>
    )
  }
  if (option.id === "db-cloud-function") {
    return (
      <span className="ml-auto mt-0.5 shrink-0 rounded bg-yellow-500/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400">
        需 Supabase DB
      </span>
    )
  }
  return null
}

// Docker 选项被选中后展示的人工服务引导横幅
function DockerServiceBanner({ optionName }: { optionName: string }) {
  return (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4">
      <div className="flex items-start gap-3">
        <Package className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            你选择了「{optionName}」— 这属于自托管定制服务
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Docker 自托管方案需要配置本地数据库、缓存、文件存储等基础设施，
            涉及服务编排、网络配置和安全加固，复杂度较高。
            此类需求属于 <span className="font-semibold text-foreground">$200 MVP 外包服务</span> 范围，
            由我们的团队根据你的具体环境量身定制并交付。
          </p>
        </div>
      </div>
      <Link href="/pricing?product=mvp-service">
        <div className="group flex items-center gap-2 rounded-lg border border-primary/30 bg-background/60 px-3 py-2.5 transition-all hover:border-primary/60 hover:bg-primary/5">
          <span className="text-xs font-semibold text-foreground">联系我们，获取 Docker 定制方案</span>
          <ArrowRight className="ml-auto h-3.5 w-3.5 text-primary opacity-60 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
    </div>
  )
}

function OptionButton({
  option,
  isSelected,
  onSelect,
  deployId,
}: {
  option: TechOption
  isSelected: boolean
  onSelect: () => void
  deployId?: string
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-start rounded-lg border p-3 text-left transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/10 text-foreground shadow-md shadow-primary/10"
          : "border-border bg-secondary/30 text-muted-foreground hover:border-border/80 hover:bg-secondary/60 hover:text-foreground"
      )}
    >
      {isSelected && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
          <Check className="h-2.5 w-2.5 text-primary-foreground" />
        </span>
      )}
      <p className="text-xs font-semibold pr-5">{option.name}</p>
      <p className="mt-0.5 text-xs leading-relaxed opacity-70">{option.description}</p>
      <CompatBadge option={option} deployId={deployId} />
    </button>
  )
}

function CategoryCard({
  category,
  selected,
  selectedStack,
  onSelect,
}: {
  category: TechCategory
  selected: string | undefined
  selectedStack: SelectedStack
  onSelect: (categoryId: string, optionId: string) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const deployId = selectedStack["deployment"]

  // 前置提示：cron/ws 类别未选部署平台时提示
  const needsDeployWarning =
    category.requiresDeploymentCheck && !deployId

  // 当前部署平台的兼容信息
  const compat = deployId ? DEPLOYMENT_COMPAT[deployId] : undefined

  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        className="flex w-full items-center justify-between px-4 py-3"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              selected ? "bg-primary" : "bg-muted-foreground/40"
            )}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{category.name}</p>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selected && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {category.options.find((o) => o.id === selected)?.name}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          {/* 前置提醒：建议先选部署平台 */}
          {needsDeployWarning && (
            <div className="mb-3 flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                建议先在上方选择<strong>部署平台</strong>，再选择此项，以确认兼容性。
              </p>
            </div>
          )}

          {/* 部署平台 cron/ws 支持说明 */}
          {compat && category.id === "cron" && (
            <div className="mb-3 flex items-start gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{compat.cronNote}</p>
            </div>
          )}
          {compat && category.id === "websocket" && (
            <div
              className={cn(
                "mb-3 flex items-start gap-2 rounded-lg border px-3 py-2.5",
                compat.supportsWs
                  ? "border-border bg-secondary/30"
                  : "border-yellow-500/30 bg-yellow-500/10"
              )}
            >
              <Info
                className={cn(
                  "mt-0.5 h-3.5 w-3.5 shrink-0",
                  compat.supportsWs ? "text-muted-foreground" : "text-yellow-500"
                )}
              />
              <p
                className={cn(
                  "text-xs",
                  compat.supportsWs
                    ? "text-muted-foreground"
                    : "text-yellow-600 dark:text-yellow-400"
                )}
              >
                {compat.wsNote}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {category.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                isSelected={selected === option.id}
                onSelect={() => onSelect(category.id, option.id)}
                deployId={deployId}
              />
            ))}
          </div>

          {/* Docker 人工服务引导：选中任意 Docker 选项后展示 */}
          {category.id === "docker" && selected && (() => {
            const selectedOption = category.options.find((o) => o.id === selected)
            return selectedOption?.requiresManualService ? (
              <DockerServiceBanner optionName={selectedOption.name} />
            ) : null
          })()}
        </div>
      )}
    </div>
  )
}

// ─── 全局冲突警告横幅 ────────────────────────────────────────────────────────

function CompatWarningBanner({ selected }: { selected: SelectedStack }) {
  const warnings = getCompatWarnings(selected)
  if (warnings.length === 0) return null

  return (
    <div className="space-y-2">
      {warnings.map((w, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-2.5 rounded-xl border px-4 py-3",
            w.type === "error"
              ? "border-destructive/40 bg-destructive/10"
              : "border-yellow-500/30 bg-yellow-500/10"
          )}
        >
          <AlertTriangle
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              w.type === "error" ? "text-destructive" : "text-yellow-500"
            )}
          />
          <div>
            <p
              className={cn(
                "text-xs font-semibold",
                w.type === "error"
                  ? "text-destructive"
                  : "text-yellow-600 dark:text-yellow-400"
              )}
            >
              {w.message}
            </p>
            {w.tip && (
              <p className="mt-0.5 text-xs text-muted-foreground">{w.tip}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

export function TechStackSelector({ onChange }: { onChange: (selected: SelectedStack) => void }) {
  const [selected, setSelected] = useState<SelectedStack>({})

  const handleSelect = useCallback(
    (categoryId: string, optionId: string) => {
      setSelected((prev) => {
        const next = { ...prev }
        if (next[categoryId] === optionId) {
          delete next[categoryId]
        } else {
          next[categoryId] = optionId
        }
        onChange(next)
        return next
      })
    },
    [onChange]
  )

  const selectedCount = Object.keys(selected).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          已选择{" "}
          <span className="font-semibold text-foreground">{selectedCount}</span>{" "}
          项技术
        </p>
        {selectedCount > 0 && (
          <button
            onClick={() => {
              setSelected({})
              onChange({})
            }}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            清空选择
          </button>
        )}
      </div>

      {/* 冲突警告横幅 */}
      <CompatWarningBanner selected={selected} />

      <div className="space-y-2">
        {TECH_STACKS.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selected[category.id]}
            selectedStack={selected}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
