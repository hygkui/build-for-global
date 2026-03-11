import { TECH_STACKS, DEPLOYMENT_COMPAT } from "@/lib/tech-stacks"
import type { SelectedStack } from "@/components/tech-stack-selector"

export function buildSystemPrompt(techStack: SelectedStack): string {
  const selectedItems: string[] = []
  const warnings: string[] = []

  for (const [categoryId, optionId] of Object.entries(techStack)) {
    const category = TECH_STACKS.find((c) => c.id === categoryId)
    const option = category?.options.find((o) => o.id === optionId)
    if (category && option) {
      selectedItems.push(`- ${category.name}: ${option.name}`)
    }
  }

  const deployId = techStack["deployment"]
  if (deployId) {
    const compat = DEPLOYMENT_COMPAT[deployId]
    if (compat) {
      warnings.push(`部署平台兼容性：
- Cron 支持: ${compat.supportsCron ? "是" : "否"} - ${compat.cronNote}
- WebSocket 支持: ${compat.supportsWs ? "是" : "否"} - ${compat.wsNote}
- Docker 支持: ${compat.supportsDocker ? "是" : "否"} - ${compat.dockerNote}`)
    }
  }

  return `你是「出海黄金组合」的技术栈顾问，帮助开发者选择和理解技术栈组合。

用户当前选择的技术栈：
${selectedItems.length > 0 ? selectedItems.join("\n") : "（尚未选择）"}

${warnings.length > 0 ? warnings.join("\n\n") : ""}

你的职责：
1. 解释每个技术选型的优劣势
2. 指出潜在的兼容性问题或冲突
3. 根据用户的项目需求给出优化建议
4. 回答关于技术栈的技术问题

回答风格：
- 简洁实用，避免泛泛而谈
- 先给结论，再解释原因
- 有具体数据或对比时用表格展示
- 中文回复`
}

export function buildQuickAnswerPrompt(question: string, techStack: SelectedStack): string {
  const techStackStr = Object.entries(techStack)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ")

  return `用户问题：${question}

当前技术栈：${techStackStr || "未选择"}

请简短回答，控制在 200 字以内。如果问题与技术栈无关，礼貌说明你的专长是技术选型咨询。`
}