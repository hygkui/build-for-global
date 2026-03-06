import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { auth } from "@/lib/auth/server"
import { TECH_STACKS } from "@/lib/tech-stacks"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // 验证登录
  const { data: session } = await auth.getSession()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
  }

  // 查询订单，必须属于当前用户且已完成
  const [order] = await sql`
    SELECT id, product_id, status, tech_stack
    FROM orders
    WHERE id = ${id}
      AND user_id = ${session.user.id}
      AND product_id = 'template-code'
      AND status = 'completed'
  `

  if (!order) {
    return NextResponse.json({ error: "Order not found or not ready" }, { status: 404 })
  }

  // 解析技术栈选择
  let techStackLabel = "全栈出海项目"
  try {
    if (order.tech_stack) {
      const selected: Record<string, string> = JSON.parse(order.tech_stack)
      const parts = Object.entries(selected)
        .map(([catId, optId]) => {
          const cat = TECH_STACKS.find((c) => c.id === catId)
          const opt = cat?.options.find((o) => o.id === optId)
          return opt?.name ?? optId
        })
        .filter(Boolean)
      if (parts.length > 0) techStackLabel = parts.join(" + ")
    }
  } catch {
    // 忽略解析错误，使用默认值
  }

  // 生成 README 内容
  const readme = `# ${techStackLabel} - 出海项目模板

由 **出海黄金组合** 生成 — https://build-for-global.vercel.app

## 技术栈

${techStackLabel}

## 快速开始

\`\`\`bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填写你的密钥

# 3. 启动开发服务器
pnpm dev
\`\`\`

## 项目结构

\`\`\`
├── app/                  # Next.js App Router 页面
│   ├── (auth)/           # 认证相关页面
│   ├── dashboard/        # 用户仪表盘
│   └── api/              # API 路由
├── components/           # 可复用组件
├── lib/                  # 工具函数和配置
├── public/               # 静态资源
└── AGENTS.md             # AI 开发规范
\`\`\`

## 部署

参考 AGENTS.md 中的部署说明，根据你选择的平台（Vercel / Railway / Cloudflare 等）进行配置。

## 支持

遇到问题？发邮件至 support@build-for-global.com
`

  // 生成 AGENTS.md（从 lib/agents-md.ts 模板）
  const agentsMd = `# AGENTS.md - AI 开发规范

## 技术栈

${techStackLabel}

## i18n 规范

- 使用 next-intl，文件按模块拆分（不超过 200 行/文件）
- key 命名：\`module.component.element\`，例如 \`auth.loginForm.emailLabel\`
- 通用文案放 \`common.json\`，业务文案放各自模块
- 动态 key 必须用枚举兜底，禁止字符串拼接
- 类型从 \`typeof messages\` 自动推导，零手写

## 代码规范

- 优先使用 Server Components，减少 \`use client\`
- Server Actions 处理表单和数据变更
- 数据库查询使用参数化 SQL，禁止字符串拼接
- 环境变量使用 \`!` 断言前必须在 .env.example 中声明

## 禁止事项

- 禁止在 useEffect 中 fetch 数据，改用 SWR 或 RSC
- 禁止硬编码密钥或 URL
- 禁止跳过错误处理
`

  // 构建 ZIP（简化版：直接返回 README 文本，实际生产可使用 JSZip）
  // 为演示目的，返回一个包含关键文件的 tar-like 文本包
  const zipContent = [
    `===== README.md =====\n${readme}`,
    `\n\n===== AGENTS.md =====\n${agentsMd}`,
    `\n\n===== .env.example =====\n# 数据库\nDATABASE_URL=\n\n# 认证\nNEON_AUTH_BASE_URL=\nNEON_AUTH_COOKIE_SECRET=\n\n# 支付\nSTRIPE_SECRET_KEY=\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\nSTRIPE_WEBHOOK_SECRET=\n`,
  ].join("")

  return new NextResponse(zipContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="template-${id.slice(0, 8)}.txt"`,
    },
  })
}
