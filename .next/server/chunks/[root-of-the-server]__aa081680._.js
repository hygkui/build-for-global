module.exports=[45796,e=>{"use strict";function t(e){let t=e.deployment??"vercel",s=e.database??"neon",n=e.auth??"neon-auth",r=e.payment??"stripe",o=e.i18n,i=e.cron,a=e.websocket,p=e.docker,u={},c={next:"15.2.4",react:"^19.0.0","react-dom":"^19.0.0","tailwind-merge":"^2.6.0","class-variance-authority":"^0.7.1",clsx:"^2.1.1","lucide-react":"^0.469.0","tailwindcss-animate":"^1.0.7"},h={"@types/node":"^22","@types/react":"^19","@types/react-dom":"^19",typescript:"^5",tailwindcss:"^3.4.17",autoprefixer:"^10.4.20",postcss:"^8",eslint:"^9","eslint-config-next":"15.2.4"};"neon"===s||"neon-serverless"===s?c["@neondatabase/serverless"]="^0.10.4":"supabase"===s?c["@supabase/supabase-js"]="^2.47.10":"planetscale"===s&&(c["@planetscale/database"]="^1.19.0"),"neon-auth"===n?(c["@neondatabase/auth"]="0.2.0-beta.1",c["server-only"]="^0.0.1"):"supabase-auth"===n?c["@supabase/ssr"]="^0.6.1":"clerk"===n?c["@clerk/nextjs"]="^6.10.0":"better-auth"===n&&(c["better-auth"]="^1.2.7"),"stripe"===r?(c.stripe="^17.5.0",c["@stripe/stripe-js"]="^5.5.0",c["@stripe/react-stripe-js"]="^3.1.0"):"lemonsqueezy"===r&&(c["@lemonsqueezy/lemonsqueezy.js"]="^3.3.1"),"next-intl"===o?c["next-intl"]="^4.1.0":"i18next"===o&&(c.i18next="^25.0.0",c["react-i18next"]="^15.0.0"),"qstash"===i?c["@upstash/qstash"]="^2.7.19":"node-cron"===i&&(c["node-cron"]="^3.0.3",h["@types/node-cron"]="^3.0.11"),"ably"===a?c.ably="^2.9.0":"pusher"===a&&(c.pusher="^5.2.0",c["pusher-js"]="^8.4.0",h["@types/pusher"]="^2.2.2"),u["package.json"]=JSON.stringify({name:"my-saas-app",version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint"},dependencies:c,devDependencies:h},null,2);let l=["# ── 数据库 ──────────────────────────────────────────────────────────","DATABASE_URL=",""];"neon-auth"===n?(l.push("# ── Neon Auth ──────────────────────────────────────────────────────"),l.push("NEON_AUTH_BASE_URL="),l.push("NEON_AUTH_COOKIE_SECRET=  # openssl rand -base64 32"),l.push("")):"supabase-auth"===n?(l.push("# ── Supabase ──────────────────────────────────────────────────────"),l.push("NEXT_PUBLIC_SUPABASE_URL="),l.push("NEXT_PUBLIC_SUPABASE_ANON_KEY="),l.push("SUPABASE_SERVICE_ROLE_KEY="),l.push("")):"clerk"===n&&(l.push("# ── Clerk Auth ────────────────────────────────────────────────────"),l.push("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="),l.push("CLERK_SECRET_KEY="),l.push("")),"stripe"===r?(l.push("# ── Stripe ────────────────────────────────────────────────────────"),l.push("STRIPE_SECRET_KEY="),l.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="),l.push("STRIPE_WEBHOOK_SECRET="),l.push("")):"lemonsqueezy"===r&&(l.push("# ── Lemon Squeezy ────────────────────────────────────────────────"),l.push("LEMONSQUEEZY_API_KEY="),l.push("LEMONSQUEEZY_WEBHOOK_SECRET="),l.push("")),"qstash"===i&&(l.push("# ── Upstash QStash ────────────────────────────────────────────────"),l.push("QSTASH_TOKEN="),l.push("QSTASH_CURRENT_SIGNING_KEY="),l.push("QSTASH_NEXT_SIGNING_KEY="),l.push("")),"ably"===a?(l.push("# ── Ably ──────────────────────────────────────────────────────────"),l.push("ABLY_API_KEY="),l.push("")):"pusher"===a&&(l.push("# ── Pusher ────────────────────────────────────────────────────────"),l.push("PUSHER_APP_ID="),l.push("PUSHER_KEY="),l.push("PUSHER_SECRET="),l.push("PUSHER_CLUSTER=ap1"),l.push("NEXT_PUBLIC_PUSHER_KEY="),l.push("NEXT_PUBLIC_PUSHER_CLUSTER=ap1"),l.push("")),l.push("# ── App ───────────────────────────────────────────────────────────"),l.push("NEXT_PUBLIC_APP_URL=http://localhost:3000"),u[".env.example"]=l.join("\n"),u["tsconfig.json"]=JSON.stringify({compilerOptions:{target:"ES2017",lib:["dom","dom.iterable","esnext"],allowJs:!0,skipLibCheck:!0,strict:!0,noEmit:!0,esModuleInterop:!0,module:"esnext",moduleResolution:"bundler",resolveJsonModule:!0,isolatedModules:!0,jsx:"preserve",incremental:!0,plugins:[{name:"next"}],paths:{"@/*":["./*"]}},include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],exclude:["node_modules"]},null,2);let d=["/** @type {import('next').NextConfig} */","const nextConfig = {"];("dockerfile-only"===p||"docker-compose"===p)&&d.push("  output: 'standalone',"),d.push("}","","export default nextConfig"),u["next.config.mjs"]=d.join("\n"),u["tailwind.config.ts"]=`import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
`;let f=[];"neon-auth"===n&&f.push('@import "@neondatabase/auth/ui/tailwind";'),u["app/globals.css"]=`${f.join("\n")}${f.length?"\n\n":""}@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`,"neon-auth"===n?u["middleware.ts"]=`import { auth } from "@/lib/auth/server"

export default auth.middleware({
  loginUrl: "/auth/sign-in",
})

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
}
`:"clerk"===n&&(u["middleware.ts"]=`import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/account(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
}
`),"neon"===s||"neon-serverless"===s?u["lib/db.ts"]=`import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export { sql }
`:"supabase"===s&&(u["lib/db.ts"]=`import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
`),"neon-auth"===n?(u["lib/auth/server.ts"]=`import { createNeonAuth } from "@neondatabase/auth/next/server"

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
})
`,u["lib/auth/client.ts"]=`"use client"

import { createAuthClient } from "@neondatabase/auth/next"

export const authClient = createAuthClient()
`):"clerk"===n&&(u["lib/auth/server.ts"]=`import { auth } from "@clerk/nextjs/server"
export { auth }
`),"stripe"===r&&(u["lib/stripe.ts"]=`import "server-only"
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})
`);let m=['import type { Metadata } from "next"','import { Inter } from "next/font/google"','import "./globals.css"'],v="",g="";"neon-auth"===n?(m.push('import { NeonAuthUIProvider } from "@neondatabase/auth/react"'),m.push('import { authClient } from "@/lib/auth/client"'),v='        <NeonAuthUIProvider authClient={authClient} redirectTo="/dashboard" emailOTP credentials={{ forgotPassword: true }}>',g="        </NeonAuthUIProvider>"):"clerk"===n&&(m.push('import { ClerkProvider } from "@clerk/nextjs"'),v="        <ClerkProvider>",g="        </ClerkProvider>"),u["app/layout.tsx"]=`${m.join("\n")}

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My SaaS App",
  description: "Built with the Golden Combo for Global SaaS",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
${v?v+"\n          {children}\n"+g:"        {children}"}
      </body>
    </html>
  )
}
`,u["app/page.tsx"]=`export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My SaaS App</h1>
        <p className="text-muted-foreground mb-8">
          Built with Next.js${"neon"===s||"neon-serverless"===s?" + Neon":"supabase"===s?" + Supabase":""}${"stripe"===r?" + Stripe":""}
        </p>
        <a href="/dashboard" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Get Started
        </a>
      </div>
    </main>
  )
}
`,"neon-auth"===n?u["app/dashboard/page.tsx"]=`import { auth } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const { data: session } = await auth.getSession()
  if (!session?.user) redirect("/auth/sign-in")

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {session.user.email}</p>
    </main>
  )
}
`:u["app/dashboard/page.tsx"]=`export default function DashboardPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground">You are logged in.</p>
    </main>
  )
}
`,"neon-auth"===n&&(u["app/auth/[path]/page.tsx"]=`import { AuthView } from "@neondatabase/auth/react"

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { path: "sign-in" },
    { path: "sign-up" },
    { path: "sign-out" },
    { path: "forgot-password" },
  ]
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <AuthView path={path} />
    </main>
  )
}
`,u["app/account/[path]/page.tsx"]=`import { AccountView } from "@neondatabase/auth/react"
import { accountViewPaths } from "@neondatabase/auth/react/ui/server"

export const dynamicParams = false

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }))
}

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params
  return (
    <main className="container mx-auto p-4 md:p-8">
      <AccountView path={path} />
    </main>
  )
}
`,u["app/api/auth/[...path]/route.ts"]=`import { auth } from "@/lib/auth/server"

export const { GET, POST } = auth.handler()
`),"stripe"===r&&(u["app/api/webhooks/stripe/route.ts"]=`import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    console.log("Payment completed:", session.id)
    // TODO: Update your database order status here
  }

  return NextResponse.json({ ok: true })
}
`),("native-cron"===i||"qstash"===i)&&(u["app/api/cron/daily/route.ts"]=`import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Verify the request comes from the cron scheduler
  const authHeader = req.headers.get("authorization")
  if (authHeader !== \`Bearer \${process.env.CRON_SECRET}\`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // TODO: Add your cron job logic here
  console.log("Daily cron job executed at", new Date().toISOString())

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
}
`),"sse"===a&&(u["app/api/events/route.ts"]=`export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode("data: connected\\n\\n"))

      // TODO: Add your real-time event logic here
      const interval = setInterval(() => {
        const data = JSON.stringify({ timestamp: new Date().toISOString() })
        controller.enqueue(encoder.encode(\`data: \${data}\\n\\n\`))
      }, 5000)

      // Cleanup on close
      return () => clearInterval(interval)
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
`),("dockerfile-only"===p||"docker-compose"===p)&&(u.Dockerfile=`FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
`,u[".dockerignore"]=`Dockerfile
.dockerignore
node_modules
npm-debug.log
.next
.git
.env*
!.env.example
`),"docker-compose"===p&&(u["docker-compose.yml"]=`services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
      - NODE_ENV=production
    restart: unless-stopped

  # Uncomment if you need a local database
  # db:
  #   image: postgres:16-alpine
  #   environment:
  #     POSTGRES_DB: myapp
  #     POSTGRES_USER: postgres
  #     POSTGRES_PASSWORD: postgres
  #   ports:
  #     - "5432:5432"
  #   volumes:
  #     - postgres_data:/var/lib/postgresql/data

# volumes:
#   postgres_data:
`);let b=["# My SaaS App","","> Generated by [出海黄金组合](https://build-for-global.vercel.app)","","## Tech Stack",""];for(let[t,s]of Object.entries({deployment:"Deployment",database:"Database",auth:"Auth",payment:"Payment",i18n:"i18n",cron:"Cron",websocket:"WebSocket",docker:"Docker"}))e[t]&&b.push(`- **${s}**: ${e[t]}`);return b.push("","## Getting Started","","1. Copy `.env.example` to `.env.local` and fill in your values","2. Install dependencies:","   ```bash","   pnpm install","   ```","3. Run the development server:","   ```bash","   pnpm dev","   ```","4. Open [http://localhost:3000](http://localhost:3000)","","## Deploy",""),"vercel"===t?b.push("Deploy to Vercel:","","[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)"):"railway"===t?b.push("Deploy to Railway:","","[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)"):("dockerfile-only"===p||"docker-compose"===p)&&b.push("Build and run with Docker:","","```bash","docker compose up -d","```"),u["README.md"]=b.join("\n"),u}e.s(["generateTemplateFiles",()=>t])},69751,e=>{"use strict";let t={vercel:{supportsCron:!0,supportsWs:!1,supportsDocker:!1,cronNote:"原生支持 Vercel Cron Jobs（vercel.json 配置，最小间隔 1 分钟）",wsNote:"不支持原生 WebSocket，推荐 Supabase Realtime / Ably / Pusher 托管方案，或用 SSE 替代",dockerNote:"Vercel 不支持 Docker，使用专有构建系统。需要 Docker 请改选 Railway / 自托管 VPS。"},cloudflare:{supportsCron:!0,supportsWs:!0,supportsDocker:!1,cronNote:"原生支持 Cron Triggers（scheduled() handler），配合 Workflows 处理多步任务",wsNote:"通过 Cloudflare Durable Objects 支持有状态 WebSocket 持久连接",dockerNote:"Cloudflare Workers 不支持 Docker，运行于 V8 隔离沙箱（非容器）。需要 Docker 请改选 Railway / 自托管 VPS。"},railway:{supportsCron:!0,supportsWs:!0,supportsDocker:!0,cronNote:"支持长时运行进程，可用 node-cron / BullMQ / crontab 等任意方案",wsNote:"支持长时运行服务，可直接运行原生 WebSocket 服务器",dockerNote:"原生支持 Dockerfile 和 docker-compose，推荐部署方式，环境完全受控。"},deno:{supportsCron:!0,supportsWs:!1,supportsDocker:!1,cronNote:"Deno Deploy 支持 Deno.cron()，亦可搭配 Upstash QStash",wsNote:"Deno Deploy 对持久 WebSocket 支持有限，推荐使用 Supabase Realtime 或 Ably 等托管方案",dockerNote:"Deno Deploy 不支持 Docker。可用 Deno 官方 Docker 镜像自建，部署到 Railway / VPS。"},docker:{supportsCron:!0,supportsWs:!0,supportsDocker:!0,cronNote:"完全支持，可使用 node-cron / BullMQ / crontab 等任意方案",wsNote:"完全支持，可直接运行原生 WebSocket 服务器（ws / Socket.io）",dockerNote:"自托管 Docker，完全掌控运行环境，推荐配合 Nginx 反向代理和 CI/CD 流水线。"}},s=[{id:"deployment",name:"部署平台",description:"选择你的应用部署目标，会影响 Cron / WebSocket / Docker 的可用方案",multiSelect:!1,options:[{id:"vercel",name:"Vercel",description:"零配置部署，全球 CDN，Serverless 架构",docs:"https://vercel.com/docs",supportsCron:!0,supportsWs:!1,supportsDocker:!1,cronThirdParty:"Vercel Cron Jobs（原生）/ Upstash QStash",wsThirdParty:"Supabase Realtime / Ably / Pusher / SSE",dockerNote:"不支持 Docker"},{id:"cloudflare",name:"Cloudflare Workers",description:"边缘计算，超低延迟，原生 Cron 和 Durable Objects WS",docs:"https://developers.cloudflare.com/workers/",supportsCron:!0,supportsWs:!0,supportsDocker:!1,dockerNote:"不支持 Docker，运行于 V8 隔离沙箱"},{id:"railway",name:"Railway",description:"支持长时进程 / Docker / Cron / WS，部署灵活",docs:"https://docs.railway.app/",supportsCron:!0,supportsWs:!0,supportsDocker:!0},{id:"deno",name:"Deno Deploy",description:"Deno 原生 Cron，WS 需借助托管方案",docs:"https://deno.com/deploy/docs",supportsCron:!0,supportsWs:!1,supportsDocker:!1,wsThirdParty:"Supabase Realtime / Ably",dockerNote:"不支持 Docker"},{id:"docker",name:"自托管 / VPS",description:"Dockerfile + docker-compose，完整掌控环境，支持一切特性",docs:"https://docs.docker.com/",supportsCron:!0,supportsWs:!0,supportsDocker:!0}]},{id:"cron",name:"Cron 定时任务",description:"需要定期执行任务？兼容性因部署平台而异，建议先选部署平台",multiSelect:!1,requiresDeploymentCheck:!0,options:[{id:"native-cron",name:"平台原生 Cron",description:"Vercel Cron / CF Cron Triggers / Deno.cron — 零额外依赖",docs:"https://vercel.com/docs/cron-jobs",supportsCron:!0},{id:"qstash",name:"Upstash QStash",description:"HTTP 消息队列 + Cron，Serverless 友好，自动重试，死信队列",docs:"https://upstash.com/docs/qstash",supportsCron:!0},{id:"github-actions-cron",name:"GitHub Actions",description:"schedule 触发 workflow 调用 API，零成本，免费额度充足",docs:"https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule",supportsCron:!0},{id:"db-cloud-function",name:"Supabase pg_cron",description:"数据库层 pg_cron + Edge Functions，仅限 Supabase 数据库",docs:"https://supabase.com/docs/guides/database/extensions/pg_cron",supportsCron:!0},{id:"node-cron",name:"node-cron / BullMQ",description:"进程内定时任务，仅适用于长时运行服务（Railway / Docker / VPS）",docs:"https://github.com/node-schedule/node-schedule",supportsCron:!0}]},{id:"websocket",name:"WebSocket / 实时",description:"需要实时推送或双向通信？Serverless 平台不支持原生 WS，建议先选部署平台",multiSelect:!1,requiresDeploymentCheck:!0,options:[{id:"supabase-realtime",name:"Supabase Realtime",description:"Postgres 表订阅，基于 WebSocket，适合已用 Supabase 的项目",docs:"https://supabase.com/docs/guides/realtime",supportsWs:!0},{id:"ably",name:"Ably",description:"托管 WebSocket，全球分布，Serverless 友好，6M 消息/月免费",docs:"https://ably.com/docs",supportsWs:!0},{id:"pusher",name:"Pusher Channels",description:"成熟稳定的托管 WebSocket，200 并发连接/天免费",docs:"https://pusher.com/docs/channels",supportsWs:!0},{id:"sse",name:"Server-Sent Events (SSE)",description:"单向服务端推送，无需额外依赖，Vercel Streaming Functions 支持",docs:"https://developer.mozilla.org/docs/Web/API/Server-sent_events",supportsWs:!0},{id:"cf-durable-objects",name:"Cloudflare Durable Objects",description:"原生有状态 WS，内嵌 SQLite，仅限 Cloudflare Workers 部署",docs:"https://developers.cloudflare.com/durable-objects/",supportsWs:!0},{id:"native-ws",name:"原生 WebSocket 服务器",description:"ws / Socket.io，仅适用于长时运行服务（Railway / Docker / VPS）",docs:"https://github.com/websockets/ws",supportsWs:!0}]},{id:"docker",name:"Docker 打包",description:"是否需要容器化部署？Serverless 平台（Vercel / CF Workers）不支持",multiSelect:!1,requiresDeploymentCheck:!0,options:[{id:"dockerfile-only",name:"仅 Dockerfile",description:"生成 multi-stage Dockerfile，适合 CI/CD 流水线和云容器平台",docs:"https://docs.docker.com/reference/dockerfile/",supportsDocker:!0},{id:"docker-compose",name:"Dockerfile + docker-compose",description:"含 docker-compose.yml，一键启动完整服务栈（应用 + 数据库 + 缓存）",docs:"https://docs.docker.com/compose/",supportsDocker:!0},{id:"no-docker",name:"不需要",description:"跳过 Docker 配置，使用平台托管方式部署",supportsDocker:!1}]},{id:"database",name:"数据库",description:"选择数据库方案",multiSelect:!1,options:[{id:"neon",name:"Neon",description:"Serverless PostgreSQL，自动扩缩容",docs:"https://neon.tech/docs",supportsCron:!1,supportsWs:!1,cronThirdParty:"需配合 Vercel Cron / QStash 调用 API 触发",wsThirdParty:"不支持实时订阅，需使用 Ably / Pusher 等外部方案"},{id:"supabase",name:"Supabase",description:"PostgreSQL + 实时订阅 + 存储，内置 pg_cron 和 Realtime WS",docs:"https://supabase.com/docs",supportsCron:!0,supportsWs:!0,cronThirdParty:"pg_cron 插件（数据库层定时任务）+ Edge Functions",wsThirdParty:"Supabase Realtime（表订阅，WebSocket）原生支持"},{id:"planetscale",name:"PlanetScale",description:"Serverless MySQL，分支工作流",docs:"https://planetscale.com/docs",supportsCron:!1,supportsWs:!1,cronThirdParty:"需配合外部 Cron 服务调用 API 触发",wsThirdParty:"不支持实时订阅，需使用 Ably / Pusher 等外部方案"},{id:"turso",name:"Turso (libSQL)",description:"边缘 SQLite，极低延迟，适合 CF Workers",docs:"https://docs.turso.tech/",supportsCron:!1,supportsWs:!1}]},{id:"storage",name:"文件存储",description:"上传图片、文件等静态资源",multiSelect:!1,options:[{id:"vercel-blob",name:"Vercel Blob",description:"简单易用，与 Vercel 无缝集成",docs:"https://vercel.com/docs/storage/vercel-blob"},{id:"cloudflare-r2",name:"Cloudflare R2",description:"S3 兼容，无出站费用",docs:"https://developers.cloudflare.com/r2/"},{id:"aws-s3",name:"AWS S3",description:"行业标准，功能强大",docs:"https://aws.amazon.com/s3/"},{id:"aliyun-oss",name:"阿里云 OSS",description:"国内访问快速",docs:"https://www.aliyun.com/product/oss"}]},{id:"auth",name:"用户认证",description:"登录注册、权限管理",multiSelect:!1,options:[{id:"better-auth",name:"Better Auth",description:"现代化认证方案，类型安全",docs:"https://www.better-auth.com/docs"},{id:"supabase-auth",name:"Supabase Auth",description:"集成在 Supabase 中，多种登录方式",docs:"https://supabase.com/docs/guides/auth"},{id:"clerk",name:"Clerk",description:"功能丰富，UI 美观",docs:"https://clerk.com/docs"},{id:"auth-js",name:"Auth.js",description:"灵活配置，支持多种 OAuth",docs:"https://authjs.dev/"}]},{id:"payment",name:"支付",description:"接受信用卡、订阅付款",multiSelect:!1,options:[{id:"stripe",name:"Stripe",description:"全球支付标准，功能完善",docs:"https://stripe.com/docs"},{id:"polar",name:"Polar.sh",description:"面向开发者和创作者的支付平台",docs:"https://docs.polar.sh/"},{id:"lemonsqueezy",name:"Lemon Squeezy",description:"一体化商户服务，含税务处理",docs:"https://docs.lemonsqueezy.com/"}]},{id:"email",name:"邮件服务",description:"发送交易邮件、通知",multiSelect:!1,options:[{id:"resend",name:"Resend",description:"现代邮件 API，React Email 支持",docs:"https://resend.com/docs"},{id:"sendgrid",name:"SendGrid",description:"成熟稳定，功能丰富",docs:"https://docs.sendgrid.com/"},{id:"postmark",name:"Postmark",description:"专注交易邮件，送达率高",docs:"https://postmarkapp.com/developer"}]},{id:"cache",name:"缓存",description:"提升性能，减少数据库查询",multiSelect:!1,options:[{id:"upstash-redis",name:"Upstash Redis",description:"Serverless Redis，按请求付费",docs:"https://upstash.com/docs/redis"},{id:"vercel-kv",name:"Vercel KV",description:"基于 Upstash，Vercel 原生集成",docs:"https://vercel.com/docs/storage/vercel-kv"},{id:"cloudflare-kv",name:"Cloudflare KV",description:"全球分布式键值存储",docs:"https://developers.cloudflare.com/kv/"}]},{id:"monitoring",name:"监控",description:"错误追踪、性能分析",multiSelect:!1,options:[{id:"sentry",name:"Sentry.io",description:"错误监控与性能分析",docs:"https://docs.sentry.io/"},{id:"posthog",name:"PostHog",description:"产品分析、功能标志",docs:"https://posthog.com/docs"},{id:"axiom",name:"Axiom",description:"日志聚合与查询",docs:"https://axiom.co/docs"}]},{id:"i18n",name:"国际化 (i18n)",description:"多语言支持，出海必备",multiSelect:!1,options:[{id:"next-intl",name:"next-intl",description:"Next.js 首选，类型安全，支持 RSC",docs:"https://next-intl-docs.vercel.app/"},{id:"i18next",name:"i18next / react-i18next",description:"生态成熟，插件丰富，适合复杂场景",docs:"https://www.i18next.com/"},{id:"lingui",name:"Lingui",description:"编译时提取，bundle 体积最小",docs:"https://lingui.dev/"}]}];function n(e,t){return s.find(t=>t.id===e)?.options.find(e=>e.id===t)?.name??t}function r(e){let r=[],o=e.deployment,i=o?t[o]:null;for(let t of(r.push("# AGENTS.md — AI 协作开发规范"),r.push(""),r.push("> 本文件由「出海黄金组合」自动生成，供 AI 编程助手（Cursor、Claude、v0 等）遵循。"),r.push("> 所有 AI 生成的代码必须符合以下规范，不得偏离。"),r.push(""),r.push("## 项目技术栈"),r.push(""),s)){let s=e[t.id];if(!s)continue;let n=t.options.find(e=>e.id===s);n&&r.push(`- **${t.name}**: ${n.name}`)}if(r.push(""),r.push("## 通用编码规范"),r.push(""),r.push("- 语言：TypeScript，严格模式（`strict: true`），不允许 `any`"),r.push("- 框架：Next.js App Router，优先使用 Server Components（RSC）"),r.push("- 样式：Tailwind CSS + shadcn/ui，禁止内联 style"),r.push("- 数据获取：Server Components 直接 fetch / SWR 用于客户端状态同步，禁止 `useEffect` 内 fetch"),r.push("- 表单 / 数据变更：使用 Server Actions，配合 `useActionState`"),r.push("- 错误处理：所有 Server Action 和 API Route 必须有 try/catch，返回结构化错误"),r.push("- 环境变量：敏感变量只在服务端使用，客户端变量使用 `NEXT_PUBLIC_` 前缀"),r.push(""),e.i18n){let t=n("i18n",e.i18n);r.push(`## 国际化（i18n）规范 — ${t}`),r.push(""),r.push("### 文件结构（强制）"),r.push(""),r.push("```"),r.push("messages/"),r.push("  en/"),r.push("    common.json      # 通用 UI 文案：按钮、状态、表单标签、错误提示"),r.push("    auth.json        # 认证页面：登录、注册、重置密码"),r.push("    dashboard.json   # 仪表盘业务文案"),r.push("    [page].json      # 每个主要页面一个文件"),r.push("  zh/"),r.push("    ...              # 完全镜像 en/ 结构，key 必须一一对应"),r.push("```"),r.push(""),r.push("### key 命名规范（强制）"),r.push(""),r.push("使用 `模块.功能.状态` 三层结构："),r.push(""),r.push("```json"),r.push("// 正确"),r.push("{"),r.push('  "auth": {'),r.push('    "login": {'),r.push('      "button": "Log in",'),r.push('      "title": "Welcome back",'),r.push('      "error": {'),r.push('        "invalid_credentials": "Invalid email or password"'),r.push("      }"),r.push("    }"),r.push("  }"),r.push("}"),r.push(""),r.push("// 错误（禁止）"),r.push("{"),r.push('  "loginButton": "Log in",          // 禁止平铺'),r.push('  "login_title": "Welcome back",    // 禁止下划线'),r.push('  "a.b.c.d.e": "too deep"           // 禁止超过三层'),r.push("}"),r.push("```"),r.push(""),r.push("### 动态 key（强制使用枚举）"),r.push(""),r.push("```typescript"),r.push("// 错误 — 动态拼接无法静态分析"),r.push("t(`errors.${statusCode}`)"),r.push(""),r.push("// 正确 — 枚举兜底"),r.push("const ERROR_KEYS = {"),r.push("  400: 'errors.bad_request',"),r.push("  401: 'errors.unauthorized',"),r.push("  404: 'errors.not_found',"),r.push("  500: 'errors.server_error',"),r.push("} as const"),r.push("t(ERROR_KEYS[statusCode] ?? 'errors.unknown')"),r.push("```"),r.push(""),r.push("### 类型安全配置"),r.push(""),"next-intl"===e.i18n?(r.push("```typescript"),r.push("// global.d.ts"),r.push("import en from './messages/en/common.json'"),r.push("type Messages = typeof en"),r.push("declare global {"),r.push("  interface IntlMessages extends Messages {}"),r.push("}"),r.push("```"),r.push(""),r.push("- 在 `tsconfig.json` 中配置 `next-intl` TypeScript 插件"),r.push("- `useTranslations` 的 key 参数有编译期类型检查，写错立即报错")):"i18next"===e.i18n?(r.push("```typescript"),r.push("// @types/i18next.d.ts"),r.push("import en from '../messages/en/common.json'"),r.push("declare module 'i18next' {"),r.push("  interface CustomTypeOptions {"),r.push("    defaultNS: 'common'"),r.push("    resources: { common: typeof en }"),r.push("  }"),r.push("}"),r.push("```")):"lingui"===e.i18n&&(r.push("- Lingui 在编译时（`lingui compile`）验证所有 `t()` 调用"),r.push("- 配置 `lingui.config.ts` 启用 TypeScript 类型生成")),r.push(""),r.push("### 僵尸 key 治理"),r.push(""),r.push("- 安装 VSCode 插件 `i18n Ally`，实时高亮未使用的 key"),r.push("- PR checklist：新增 key 必须在所有语言文件中同步添加（CI 可加自动校验）"),r.push("- 每季度运行 `i18n-ally` 全量扫描，清理僵尸 key"),r.push("")}if(e.cron){let t=n("cron",e.cron);r.push(`## Cron 定时任务规范 — ${t}`),r.push(""),i&&(r.push(`当前部署平台（${n("deployment",o)}）：${i.cronNote}`),r.push("")),r.push("### 安全要求（强制）"),r.push(""),r.push("所有 Cron API 端点必须验证调用来源，防止未经授权触发："),r.push(""),r.push("```typescript"),r.push("// app/api/cron/[task]/route.ts"),r.push("export async function GET(req: Request) {"),r.push("  // Vercel / GitHub Actions 等通过 Header 传入密钥"),r.push("  const authHeader = req.headers.get('authorization')"),r.push("  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {"),r.push("    return Response.json({ error: 'Unauthorized' }, { status: 401 })"),r.push("  }"),r.push("  // 执行任务..."),r.push("}"),r.push("```"),r.push(""),r.push("### 幂等性要求（强制）"),r.push(""),r.push("- 所有 Cron 任务必须是幂等的（重复执行结果相同）"),r.push("- 使用数据库记录任务执行状态，防止重复处理"),r.push("- 任务执行时长超过 10 秒需拆分或使用队列异步处理"),r.push(""),r.push("### 日志要求"),r.push(""),r.push("- 任务开始 / 完成 / 失败必须记录日志（含时间戳和任务标识）"),r.push("- 失败时发送告警通知（邮件 / Slack）"),r.push("")}if(e.websocket){let t=n("websocket",e.websocket);r.push(`## WebSocket / 实时通信规范 — ${t}`),r.push(""),i&&(r.push(`当前部署平台（${n("deployment",o)}）：${i.supportsWs?i.wsNote:"⚠ "+i.wsNote}`),r.push("")),r.push("### 连接管理"),r.push(""),r.push("- 客户端必须实现断线重连（指数退避，最大 5 次）"),r.push("- 连接关闭时必须取消所有订阅，防止内存泄漏"),r.push("- 使用 React `useEffect` cleanup 函数管理订阅生命周期"),r.push(""),r.push("```typescript"),r.push("useEffect(() => {"),r.push("  const channel = subscribe(handler)"),r.push("  return () => channel.unsubscribe() // 清理订阅"),r.push("}, [])"),r.push("```"),r.push(""),r.push("### 权限控制（强制）"),r.push(""),r.push("- 订阅前必须验证用户身份（token / session）"),r.push("- 频道 / 房间命名使用用户 ID 隔离：`user:{userId}:notifications`"),r.push("- 禁止在客户端广播敏感数据（如其他用户的私信）"),r.push(""),r.push("### 消息格式（统一）"),r.push(""),r.push("```typescript"),r.push("interface RealtimeMessage<T = unknown> {"),r.push("  type: string        // 事件类型，如 'message.created'"),r.push("  payload: T          // 事件数据"),r.push("  timestamp: string   // ISO 8601"),r.push("}"),r.push("```"),r.push("")}return r.push("## Git 提交规范"),r.push(""),r.push("使用 Conventional Commits 格式："),r.push(""),r.push("```"),r.push("feat(auth): add magic link login"),r.push("fix(i18n): remove zombie keys in dashboard.json"),r.push("chore(cron): add CRON_SECRET validation"),r.push("```"),r.push(""),r.push("类型：`feat` | `fix` | `docs` | `chore` | `refactor` | `test` | `perf`"),r.push(""),r.push("## 环境变量规范"),r.push(""),r.push("- 所有变量必须在 `.env.example` 中有对应条目和注释"),r.push("- 客户端可访问：使用 `NEXT_PUBLIC_` 前缀"),r.push("- 敏感变量（API Key、密钥）：仅服务端，禁止 `NEXT_PUBLIC_`"),r.push("- 变量缺失时应用启动时立即 throw，不允许静默降级"),r.push(""),r.push("```typescript"),r.push("// lib/env.ts — 环境变量校验"),r.push("function requireEnv(key: string): string {"),r.push("  const val = process.env[key]"),r.push("  if (!val) throw new Error(`Missing required env var: ${key}`)"),r.push("  return val"),r.push("}"),r.push("```"),r.push(""),r.push("---"),r.push(""),r.push(`> 本文件由 [出海黄金组合](https://github.com/hygkui/build-for-global) 生成 \xb7 ${new Date().toISOString().slice(0,10)}`),r.join("\n")}e.s(["generateAgentsMd",()=>r],69751)},62562,(e,t,s)=>{t.exports=e.x("module",()=>require("module"))},18040,e=>{"use strict";var t,s=(0,e.i(62562).createRequire)("/");try{t=s("worker_threads").Worker}catch(e){}var n=t?function(e,s,n,r,o){var i=!1,a=new t(e+";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global",{eval:!0}).on("error",function(e){return o(e,null)}).on("message",function(e){return o(null,e)}).on("exit",function(e){e&&!i&&o(Error("exited with code "+e),null)});return a.postMessage(n,r),a.terminate=function(){return i=!0,t.prototype.terminate.call(a)},a}:function(e,t,s,n,r){setImmediate(function(){return r(Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},r=Uint8Array,o=Uint16Array,i=Int32Array,a=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),p=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),u=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),c=function(e,t){for(var s=new o(31),n=0;n<31;++n)s[n]=t+=1<<e[n-1];for(var r=new i(s[30]),n=1;n<30;++n)for(var a=s[n];a<s[n+1];++a)r[a]=a-s[n]<<5|n;return{b:s,r:r}},h=c(a,2),l=h.b,d=h.r;l[28]=258,d[258]=28;for(var f=c(p,0),m=f.b,v=f.r,g=new o(32768),b=0;b<32768;++b){var y=(43690&b)>>1|(21845&b)<<1;y=(61680&(y=(52428&y)>>2|(13107&y)<<2))>>4|(3855&y)<<4,g[b]=((65280&y)>>8|(255&y)<<8)>>1}for(var S=function(e,t,s){for(var n,r=e.length,i=0,a=new o(t);i<r;++i)e[i]&&++a[e[i]-1];var p=new o(t);for(i=1;i<t;++i)p[i]=p[i-1]+a[i-1]<<1;if(s){n=new o(1<<t);var u=15-t;for(i=0;i<r;++i)if(e[i])for(var c=i<<4|e[i],h=t-e[i],l=p[e[i]-1]++<<h,d=l|(1<<h)-1;l<=d;++l)n[g[l]>>u]=c}else for(i=0,n=new o(r);i<r;++i)e[i]&&(n[i]=g[p[e[i]-1]++]>>15-e[i]);return n},w=new r(288),b=0;b<144;++b)w[b]=8;for(var b=144;b<256;++b)w[b]=9;for(var b=256;b<280;++b)w[b]=7;for(var b=280;b<288;++b)w[b]=8;for(var x=new r(32),b=0;b<32;++b)x[b]=5;var k=S(w,9,0),E=S(w,9,1),C=S(x,5,0),R=S(x,5,1),A=function(e){for(var t=e[0],s=1;s<e.length;++s)e[s]>t&&(t=e[s]);return t},_=function(e,t,s){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(7&t)&s},N=function(e,t){var s=t/8|0;return(e[s]|e[s+1]<<8|e[s+2]<<16)>>(7&t)},P=function(e){return(e+7)/8|0},T=function(e,t,s){return(null==t||t<0)&&(t=0),(null==s||s>e.length)&&(s=e.length),new r(e.subarray(t,s))},D=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],O=function(e,t,s){var n=Error(t||D[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,O),!s)throw n;return n},I=function(e,t,s,n){var o=e.length,i=n?n.length:0;if(!o||t.f&&!t.l)return s||new r(0);var c=!s,h=c||2!=t.i,d=t.i;c&&(s=new r(3*o));var f=function(e){var t=s.length;if(e>t){var n=new r(Math.max(2*t,e));n.set(s),s=n}},v=t.f||0,g=t.p||0,b=t.b||0,y=t.l,w=t.d,x=t.m,k=t.n,C=8*o;do{if(!y){v=_(e,g,1);var D=_(e,g+1,3);if(g+=3,D)if(1==D)y=E,w=R,x=9,k=5;else if(2==D){var I=_(e,g,31)+257,U=_(e,g+10,15)+4,M=I+_(e,g+5,31)+1;g+=14;for(var j=new r(M),q=new r(19),W=0;W<U;++W)q[u[W]]=_(e,g+3*W,7);g+=3*U;for(var L=A(q),z=(1<<L)-1,B=S(q,L,1),W=0;W<M;){var H=B[_(e,g,z)];g+=15&H;var V=H>>4;if(V<16)j[W++]=V;else{var K=0,$=0;for(16==V?($=3+_(e,g,3),g+=2,K=j[W-1]):17==V?($=3+_(e,g,7),g+=3):18==V&&($=11+_(e,g,127),g+=7);$--;)j[W++]=K}}var G=j.subarray(0,I),Y=j.subarray(I);x=A(G),k=A(Y),y=S(G,x,1),w=S(Y,k,1)}else O(1);else{var V=P(g)+4,F=e[V-4]|e[V-3]<<8,Q=V+F;if(Q>o){d&&O(0);break}h&&f(b+F),s.set(e.subarray(V,Q),b),t.b=b+=F,t.p=g=8*Q,t.f=v;continue}if(g>C){d&&O(0);break}}h&&f(b+131072);for(var X=(1<<x)-1,J=(1<<k)-1,Z=g;;Z=g){var K=y[N(e,g)&X],ee=K>>4;if((g+=15&K)>C){d&&O(0);break}if(K||O(2),ee<256)s[b++]=ee;else if(256==ee){Z=g,y=null;break}else{var et=ee-254;if(ee>264){var W=ee-257,es=a[W];et=_(e,g,(1<<es)-1)+l[W],g+=es}var en=w[N(e,g)&J],er=en>>4;en||O(3),g+=15&en;var Y=m[er];if(er>3){var es=p[er];Y+=N(e,g)&(1<<es)-1,g+=es}if(g>C){d&&O(0);break}h&&f(b+131072);var eo=b+et;if(b<Y){var ei=i-Y,ea=Math.min(Y,eo);for(ei+b<0&&O(3);b<ea;++b)s[b]=n[ei+b]}for(;b<eo;++b)s[b]=s[b-Y]}}t.l=y,t.p=Z,t.b=b,t.f=v,y&&(v=1,t.m=x,t.d=w,t.n=k)}while(!v)return b!=s.length&&c?T(s,0,b):s.subarray(0,b)},U=function(e,t,s){s<<=7&t;var n=t/8|0;e[n]|=s,e[n+1]|=s>>8},M=function(e,t,s){s<<=7&t;var n=t/8|0;e[n]|=s,e[n+1]|=s>>8,e[n+2]|=s>>16},j=function(e,t){for(var s=[],n=0;n<e.length;++n)e[n]&&s.push({s:n,f:e[n]});var i=s.length,a=s.slice();if(!i)return{t:V,l:0};if(1==i){var p=new r(s[0].s+1);return p[s[0].s]=1,{t:p,l:1}}s.sort(function(e,t){return e.f-t.f}),s.push({s:-1,f:25001});var u=s[0],c=s[1],h=0,l=1,d=2;for(s[0]={s:-1,f:u.f+c.f,l:u,r:c};l!=i-1;)u=s[s[h].f<s[d].f?h++:d++],c=s[h!=l&&s[h].f<s[d].f?h++:d++],s[l++]={s:-1,f:u.f+c.f,l:u,r:c};for(var f=a[0].s,n=1;n<i;++n)a[n].s>f&&(f=a[n].s);var m=new o(f+1),v=q(s[l-1],m,0);if(v>t){var n=0,g=0,b=v-t,y=1<<b;for(a.sort(function(e,t){return m[t.s]-m[e.s]||e.f-t.f});n<i;++n){var S=a[n].s;if(m[S]>t)g+=y-(1<<v-m[S]),m[S]=t;else break}for(g>>=b;g>0;){var w=a[n].s;m[w]<t?g-=1<<t-m[w]++-1:++n}for(;n>=0&&g;--n){var x=a[n].s;m[x]==t&&(--m[x],++g)}v=t}return{t:new r(m),l:v}},q=function(e,t,s){return -1==e.s?Math.max(q(e.l,t,s+1),q(e.r,t,s+1)):t[e.s]=s},W=function(e){for(var t=e.length;t&&!e[--t];);for(var s=new o(++t),n=0,r=e[0],i=1,a=function(e){s[n++]=e},p=1;p<=t;++p)if(e[p]==r&&p!=t)++i;else{if(!r&&i>2){for(;i>138;i-=138)a(32754);i>2&&(a(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(a(r),--i;i>6;i-=6)a(8304);i>2&&(a(i-3<<5|8208),i=0)}for(;i--;)a(r);i=1,r=e[p]}return{c:s.subarray(0,n),n:t}},L=function(e,t){for(var s=0,n=0;n<t.length;++n)s+=e[n]*t[n];return s},z=function(e,t,s){var n=s.length,r=P(t+2);e[r]=255&n,e[r+1]=n>>8,e[r+2]=255^e[r],e[r+3]=255^e[r+1];for(var o=0;o<n;++o)e[r+o+4]=s[o];return(r+4+n)*8},B=function(e,t,s,n,r,i,c,h,l,d,f){U(t,f++,s),++r[256];for(var m,v,g,b,y=j(r,15),E=y.t,R=y.l,A=j(i,15),_=A.t,N=A.l,P=W(E),T=P.c,D=P.n,O=W(_),I=O.c,q=O.n,B=new o(19),H=0;H<T.length;++H)++B[31&T[H]];for(var H=0;H<I.length;++H)++B[31&I[H]];for(var V=j(B,7),K=V.t,$=V.l,G=19;G>4&&!K[u[G-1]];--G);var Y=d+5<<3,F=L(r,w)+L(i,x)+c,Q=L(r,E)+L(i,_)+c+14+3*G+L(B,K)+2*B[16]+3*B[17]+7*B[18];if(l>=0&&Y<=F&&Y<=Q)return z(t,f,e.subarray(l,l+d));if(U(t,f,1+(Q<F)),f+=2,Q<F){m=S(E,R,0),v=E,g=S(_,N,0),b=_;var X=S(K,$,0);U(t,f,D-257),U(t,f+5,q-1),U(t,f+10,G-4),f+=14;for(var H=0;H<G;++H)U(t,f+3*H,K[u[H]]);f+=3*G;for(var J=[T,I],Z=0;Z<2;++Z)for(var ee=J[Z],H=0;H<ee.length;++H){var et=31&ee[H];U(t,f,X[et]),f+=K[et],et>15&&(U(t,f,ee[H]>>5&127),f+=ee[H]>>12)}}else m=k,v=w,g=C,b=x;for(var H=0;H<h;++H){var es=n[H];if(es>255){var et=es>>18&31;M(t,f,m[et+257]),f+=v[et+257],et>7&&(U(t,f,es>>23&31),f+=a[et]);var en=31&es;M(t,f,g[en]),f+=b[en],en>3&&(M(t,f,es>>5&8191),f+=p[en])}else M(t,f,m[es]),f+=v[es]}return M(t,f,m[256]),f+v[256]},H=new i([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),V=new r(0),K=function(e,t,s,n,u,c){var h=c.z||e.length,l=new r(n+h+5*(1+Math.ceil(h/7e3))+u),f=l.subarray(n,l.length-u),m=c.l,g=7&(c.r||0);if(t){g&&(f[0]=c.r>>3);for(var b=H[t-1],y=b>>13,S=8191&b,w=(1<<s)-1,x=c.p||new o(32768),k=c.h||new o(w+1),E=Math.ceil(s/3),C=2*E,R=function(t){return(e[t]^e[t+1]<<E^e[t+2]<<C)&w},A=new i(25e3),_=new o(288),N=new o(32),D=0,O=0,I=c.i||0,U=0,M=c.w||0,j=0;I+2<h;++I){var q=R(I),W=32767&I,L=k[q];if(x[W]=L,k[q]=W,M<=I){var V=h-I;if((D>7e3||U>24576)&&(V>423||!m)){g=B(e,f,0,A,_,N,O,U,j,I-j,g),U=D=O=0,j=I;for(var K=0;K<286;++K)_[K]=0;for(var K=0;K<30;++K)N[K]=0}var $=2,G=0,Y=S,F=W-L&32767;if(V>2&&q==R(I-F))for(var Q=Math.min(y,V)-1,X=Math.min(32767,I),J=Math.min(258,V);F<=X&&--Y&&W!=L;){if(e[I+$]==e[I+$-F]){for(var Z=0;Z<J&&e[I+Z]==e[I+Z-F];++Z);if(Z>$){if($=Z,G=F,Z>Q)break;for(var ee=Math.min(F,Z-2),et=0,K=0;K<ee;++K){var es=I-F+K&32767,en=x[es],er=es-en&32767;er>et&&(et=er,L=es)}}}L=x[W=L],F+=W-L&32767}if(G){A[U++]=0x10000000|d[$]<<18|v[G];var eo=31&d[$],ei=31&v[G];O+=a[eo]+p[ei],++_[257+eo],++N[ei],M=I+$,++D}else A[U++]=e[I],++_[e[I]]}}for(I=Math.max(I,M);I<h;++I)A[U++]=e[I],++_[e[I]];g=B(e,f,m,A,_,N,O,U,j,I-j,g),m||(c.r=7&g|f[g/8|0]<<3,g-=7,c.h=k,c.p=x,c.i=I,c.w=M)}else{for(var I=c.w||0;I<h+m;I+=65535){var ea=I+65535;ea>=h&&(f[g/8|0]=m,ea=h),g=z(f,g+1,e.subarray(I,ea))}c.i=h}return T(l,0,n+P(g)+u)},$=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var s=t,n=9;--n;)s=(1&s&&-0x12477ce0)^s>>>1;e[t]=s}return e}(),G=function(){var e=-1;return{p:function(t){for(var s=e,n=0;n<t.length;++n)s=$[255&s^t[n]]^s>>>8;e=s},d:function(){return~e}}},Y=function(){var e=1,t=0;return{p:function(s){for(var n=e,r=t,o=0|s.length,i=0;i!=o;){for(var a=Math.min(i+2655,o);i<a;++i)r+=n+=s[i];n=(65535&n)+15*(n>>16),r=(65535&r)+15*(r>>16)}e=n,t=r},d:function(){return e%=65521,t%=65521,(255&e)<<24|(65280&e)<<8|(255&t)<<8|t>>8}}},F=function(e,t,s,n,o){if(!o&&(o={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),a=new r(i.length+e.length);a.set(i),a.set(e,i.length),e=a,o.w=i.length}return K(e,null==t.level?6:t.level,null==t.mem?o.l?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(e.length)))):20:12+t.mem,s,n,o)},Q=function(e,t){var s={};for(var n in e)s[n]=e[n];for(var n in t)s[n]=t[n];return s},X=function(e,t,s){for(var n=e(),r=e.toString(),o=r.slice(r.indexOf("[")+1,r.lastIndexOf("]")).replace(/\s+/g,"").split(","),i=0;i<n.length;++i){var a=n[i],p=o[i];if("function"==typeof a){t+=";"+p+"=";var u=a.toString();if(a.prototype)if(-1!=u.indexOf("[native code]")){var c=u.indexOf(" ",8)+1;t+=u.slice(c,u.indexOf("(",c))}else for(var h in t+=u,a.prototype)t+=";"+p+".prototype."+h+"="+a.prototype[h].toString();else t+=u}else s[p]=a}return t},J=[],Z=function(e){var t=[];for(var s in e)e[s].buffer&&t.push((e[s]=new e[s].constructor(e[s])).buffer);return t},ee=function(e,t,s,r){if(!J[s]){for(var o="",i={},a=e.length-1,p=0;p<a;++p)o=X(e[p],o,i);J[s]={c:X(e[a],o,i),e:i}}var u=Q({},J[s].e);return n(J[s].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",s,u,Z(u),r)},et=function(){return[r,o,i,a,p,u,l,m,E,R,g,D,S,A,_,N,P,T,O,I,eC,eo,ei]},es=function(){return[r,o,i,a,p,u,d,v,k,w,C,x,g,H,V,S,U,M,j,q,W,L,z,B,P,T,K,F,ex,eo]},en=function(){return[ef,em]},er=function(){return[eb]},eo=function(e){return postMessage(e,[e.buffer])},ei=function(e){return e&&{out:e.size&&new r(e.size),dictionary:e.dictionary}},ea=function(e){return e.ondata=function(e,t){return postMessage([e,t],[e.buffer])},function(t){t.data.length?(e.push(t.data[0],t.data[1]),postMessage([t.data[0].length])):e.flush()}},ep=function(e,t,s,n,r,o,i){var a,p=ee(e,n,r,function(e,s){e?(p.terminate(),t.ondata.call(t,e)):Array.isArray(s)?1==s.length?(t.queuedSize-=s[0],t.ondrain&&t.ondrain(s[0])):(s[1]&&p.terminate(),t.ondata.call(t,e,s[0],s[1])):i(s)});p.postMessage(s),t.queuedSize=0,t.push=function(e,s){t.ondata||O(5),a&&t.ondata(O(4,0,1),null,!!s),t.queuedSize+=e.length,p.postMessage([e,a=s],[e.buffer])},t.terminate=function(){p.terminate()},o&&(t.flush=function(){p.postMessage([])})},eu=function(e,t){return e[t]|e[t+1]<<8},ec=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},eh=function(e,t){return ec(e,t)+0x100000000*ec(e,t+4)},el=function(e,t,s){for(;s;++t)e[t]=s,s>>>=8},ed=function(e,t){var s=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:2*(9==t.level),e[9]=3,0!=t.mtime&&el(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),s){e[3]=8;for(var n=0;n<=s.length;++n)e[n+10]=s.charCodeAt(n)}},ef=function(e){(31!=e[0]||139!=e[1]||8!=e[2])&&O(6,"invalid gzip data");var t=e[3],s=10;4&t&&(s+=(e[10]|e[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!e[s++]);return s+(2&t)},em=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},ev=function(e){return 10+(e.filename?e.filename.length+1:0)},eg=function(e,t){var s=t.level;if(e[0]=120,e[1]=(0==s?0:s<6?1:9==s?3:2)<<6|(t.dictionary&&32),e[1]|=31-(e[0]<<8|e[1])%31,t.dictionary){var n=Y();n.p(t.dictionary),el(e,2,n.d())}},eb=function(e,t){return((15&e[0])!=8||e[0]>>4>7||(e[0]<<8|e[1])%31)&&O(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&O(6,"invalid zlib data: "+(32&e[1]?"need":"unexpected")+" dictionary"),(e[1]>>3&4)+2};function ey(e,t){return"function"==typeof e&&(t=e,e={}),this.ondata=t,e}var eS=function(){function e(e,t){if("function"==typeof e&&(t=e,e={}),this.ondata=t,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new r(98304),this.o.dictionary){var s=this.o.dictionary.subarray(-32768);this.b.set(s,32768-s.length),this.s.i=32768-s.length}}return e.prototype.p=function(e,t){this.ondata(F(e,this.o,0,0,this.s),t)},e.prototype.push=function(e,t){this.ondata||O(5),this.s.l&&O(4);var s=e.length+this.s.z;if(s>this.b.length){if(s>2*this.b.length-32768){var n=new r(-32768&s);n.set(this.b.subarray(0,this.s.z)),this.b=n}var o=this.b.length-this.s.z;this.b.set(e.subarray(0,o),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(o),32768),this.s.z=e.length-o+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=1&t,(this.s.z>this.s.w+8191||t)&&(this.p(this.b,t||!1),this.s.w=this.s.i,this.s.i-=2)},e.prototype.flush=function(){this.ondata||O(5),this.s.l&&O(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},e}(),ew=function(e,t){ep([es,function(){return[ea,eS]}],this,ey.call(this,e,t),function(e){onmessage=ea(new eS(e.data))},6,1)};function ex(e,t){return F(e,t||{},0,0)}var ek=function(){function e(e,t){"function"==typeof e&&(t=e,e={}),this.ondata=t;var s=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:s?s.length:0},this.o=new r(32768),this.p=new r(0),s&&this.o.set(s)}return e.prototype.e=function(e){if(this.ondata||O(5),this.d&&O(4),this.p.length){if(e.length){var t=new r(this.p.length+e.length);t.set(this.p),t.set(e,this.p.length),this.p=t}}else this.p=e},e.prototype.c=function(e){this.s.i=+(this.d=e||!1);var t=this.s.b,s=I(this.p,this.s,this.o);this.ondata(T(s,t,this.s.b),this.d),this.o=T(s,this.s.b-32768),this.s.b=this.o.length,this.p=T(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}(),eE=function(e,t){ep([et,function(){return[ea,ek]}],this,ey.call(this,e,t),function(e){onmessage=ea(new ek(e.data))},7,0)};function eC(e,t){return I(e,{i:2},t&&t.out,t&&t.dictionary)}(function(){function e(e,t){this.c=G(),this.l=0,this.v=1,eS.call(this,e,t)}e.prototype.push=function(e,t){this.c.p(e),this.l+=e.length,eS.prototype.push.call(this,e,t)},e.prototype.p=function(e,t){var s=F(e,this.o,this.v&&ev(this.o),t&&8,this.s);this.v&&(ed(s,this.o),this.v=0),t&&(el(s,s.length-8,this.c.d()),el(s,s.length-4,this.l)),this.ondata(s,t)},e.prototype.flush=function(){eS.prototype.flush.call(this)}})();var eR=function(){function e(e,t){this.v=1,this.r=0,ek.call(this,e,t)}return e.prototype.push=function(e,t){if(ek.prototype.e.call(this,e),this.r+=e.length,this.v){var s=this.p.subarray(this.v-1),n=s.length>3?ef(s):4;if(n>s.length){if(!t)return}else this.v>1&&this.onmember&&this.onmember(this.r-s.length);this.p=s.subarray(n),this.v=0}ek.prototype.c.call(this,t),!this.s.f||this.s.l||t||(this.v=P(this.s.p)+9,this.s={i:0},this.o=new r(0),this.push(new r(0),t))},e}(),eA=function(e,t){var s=this;ep([et,en,function(){return[ea,ek,eR]}],this,ey.call(this,e,t),function(e){var t=new eR(e.data);t.onmember=function(e){return postMessage(e)},onmessage=ea(t)},9,0,function(e){return s.onmember&&s.onmember(e)})},e_=(function(){function e(e,t){this.c=Y(),this.v=1,eS.call(this,e,t)}e.prototype.push=function(e,t){this.c.p(e),eS.prototype.push.call(this,e,t)},e.prototype.p=function(e,t){var s=F(e,this.o,this.v&&(this.o.dictionary?6:2),t&&4,this.s);this.v&&(eg(s,this.o),this.v=0),t&&el(s,s.length-4,this.c.d()),this.ondata(s,t)},e.prototype.flush=function(){eS.prototype.flush.call(this)}}(),function(){function e(e,t){ek.call(this,e,t),this.v=e&&e.dictionary?2:1}return e.prototype.push=function(e,t){if(ek.prototype.e.call(this,e),this.v){if(this.p.length<6&&!t)return;this.p=this.p.subarray(eb(this.p,this.v-1)),this.v=0}t&&(this.p.length<4&&O(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),ek.prototype.c.call(this,t)},e}()),eN=function(e,t){ep([et,er,function(){return[ea,ek,e_]}],this,ey.call(this,e,t),function(e){onmessage=ea(new e_(e.data))},11,0)},eP=function(){function e(e,t){this.o=ey.call(this,e,t)||{},this.G=eR,this.I=ek,this.Z=e_}return e.prototype.i=function(){var e=this;this.s.ondata=function(t,s){e.ondata(t,s)}},e.prototype.push=function(e,t){if(this.ondata||O(5),this.s)this.s.push(e,t);else{if(this.p&&this.p.length){var s=new r(this.p.length+e.length);s.set(this.p),s.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(this.o):(15&this.p[0])!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,t),this.p=null)}},e}();function eT(e,t){eP.call(this,e,t),this.queuedSize=0,this.G=eA,this.I=eE,this.Z=eN}eT.prototype.i=function(){var e=this;this.s.ondata=function(t,s,n){e.ondata(t,s,n)},this.s.ondrain=function(t){e.queuedSize-=t,e.ondrain&&e.ondrain(t)}},eT.prototype.push=function(e,t){this.queuedSize+=e.length,eP.prototype.push.call(this,e,t)};var eD=function(e,t,s,n){for(var o in e){var i=e[o],a=t+o,p=n;Array.isArray(i)&&(p=Q(n,i[1]),i=i[0]),i instanceof r?s[a]=[i,p]:(s[a+="/"]=[new r(0),p],eD(i,a,s,n))}},eO="u">typeof TextEncoder&&new TextEncoder,eI="u">typeof TextDecoder&&new TextDecoder,eU=0;try{eI.decode(V,{stream:!0}),eU=1}catch(e){}var eM=function(e){for(var t="",s=0;;){var n=e[s++],r=(n>127)+(n>223)+(n>239);if(s+r>e.length)return{s:t,r:T(e,s-1)};r?3==r?t+=String.fromCharCode(55296|(n=((15&n)<<18|(63&e[s++])<<12|(63&e[s++])<<6|63&e[s++])-65536)>>10,56320|1023&n):1&r?t+=String.fromCharCode((31&n)<<6|63&e[s++]):t+=String.fromCharCode((15&n)<<12|(63&e[s++])<<6|63&e[s++]):t+=String.fromCharCode(n)}};function ej(e,t){if(t){for(var s=new r(e.length),n=0;n<e.length;++n)s[n]=e.charCodeAt(n);return s}if(eO)return eO.encode(e);for(var o=e.length,i=new r(e.length+(e.length>>1)),a=0,p=function(e){i[a++]=e},n=0;n<o;++n){if(a+5>i.length){var u=new r(a+8+(o-n<<1));u.set(i),i=u}var c=e.charCodeAt(n);c<128||t?p(c):(c<2048?p(192|c>>6):(c>55295&&c<57344?(p(240|(c=65536+(1047552&c)|1023&e.charCodeAt(++n))>>18),p(128|c>>12&63)):p(224|c>>12),p(128|c>>6&63)),p(128|63&c))}return T(i,0,a)}(function(e){this.ondata=e,eU?this.t=new TextDecoder:this.p=V}).prototype.push=function(e,t){if(this.ondata||O(5),t=!!t,this.t){this.ondata(this.t.decode(e,{stream:!0}),t),t&&(this.t.decode().length&&O(8),this.t=null);return}this.p||O(4);var s=new r(this.p.length+e.length);s.set(this.p),s.set(e,this.p.length);var n=eM(s),o=n.s,i=n.r;t?(i.length&&O(8),this.p=null):this.p=i,this.ondata(o,t)},(function(e){this.ondata=e}).prototype.push=function(e,t){this.ondata||O(5),this.d&&O(4),this.ondata(ej(e),this.d=t||!1)};var eq=function(e){return 1==e?3:e<6?2:+(9==e)},eW=function(e,t){for(;1!=eu(e,t);t+=4+eu(e,t+2));return[eh(e,t+12),eh(e,t+4),eh(e,t+20)]},eL=function(e){var t=0;if(e)for(var s in e){var n=e[s].length;n>65535&&O(9),t+=n+4}return t},ez=function(e,t,s,n,r,o,i,a){var p=n.length,u=s.extra,c=a&&a.length,h=eL(u);el(e,t,null!=i?0x2014b50:0x4034b50),t+=4,null!=i&&(e[t++]=20,e[t++]=s.os),e[t]=20,t+=2,e[t++]=s.flag<<1|(o<0&&8),e[t++]=r&&8,e[t++]=255&s.compression,e[t++]=s.compression>>8;var l=new Date(null==s.mtime?Date.now():s.mtime),d=l.getFullYear()-1980;if((d<0||d>119)&&O(10),el(e,t,d<<25|l.getMonth()+1<<21|l.getDate()<<16|l.getHours()<<11|l.getMinutes()<<5|l.getSeconds()>>1),t+=4,-1!=o&&(el(e,t,s.crc),el(e,t+4,o<0?-o-2:o),el(e,t+8,s.size)),el(e,t+12,p),el(e,t+14,h),t+=16,null!=i&&(el(e,t,c),el(e,t+6,s.attrs),el(e,t+10,i),t+=14),e.set(n,t),t+=p,h)for(var f in u){var m=u[f],v=m.length;el(e,t,+f),el(e,t+2,v),e.set(m,t+4),t+=4+v}return c&&(e.set(a,t),t+=c),t},eB=function(e,t,s,n,r){el(e,t,0x6054b50),el(e,t+8,s),el(e,t+10,s),el(e,t+12,n),el(e,t+16,r)},eH=function(){function e(e){this.filename=e,this.c=G(),this.size=0,this.compression=0}return e.prototype.process=function(e,t){this.ondata(null,e,t)},e.prototype.push=function(e,t){this.ondata||O(5),this.c.p(e),this.size+=e.length,t&&(this.crc=this.c.d()),this.process(e,t||!1)},e}();function eV(e,t){var s=this;t||(t={}),eH.call(this,e),this.d=new eS(t,function(e,t){s.ondata(null,e,t)}),this.compression=8,this.flag=eq(t.level)}function eK(e,t){var s=this;t||(t={}),eH.call(this,e),this.d=new ew(t,function(e,t,n){s.ondata(e,t,n)}),this.compression=8,this.flag=eq(t.level),this.terminate=this.d.terminate}function e$(e){this.ondata=e,this.u=[],this.d=1}function eG(e,t){t||(t={});var s={},n=[];eD(e,"",s,t);var o=0,i=0;for(var a in s){var p=s[a],u=p[0],c=p[1],h=8*(0!=c.level),l=ej(a),d=l.length,f=c.comment,m=f&&ej(f),v=m&&m.length,g=eL(c.extra);d>65535&&O(11);var b=h?ex(u,c):u,y=b.length,S=G();S.p(u),n.push(Q(c,{size:u.length,crc:S.d(),c:b,f:l,m:m,u:d!=a.length||m&&f.length!=v,o:o,compression:h})),o+=30+d+g+y,i+=76+2*(d+g)+(v||0)+y}for(var w=new r(i+22),x=o,k=i-o,E=0;E<n.length;++E){var l=n[E];ez(w,l.o,l,l.f,l.u,l.c.length);var C=30+l.f.length+eL(l.extra);w.set(l.c,l.o+C),ez(w,o,l,l.f,l.u,l.c.length,l.o,l.m),o+=16+C+(l.m?l.m.length:0)}return eB(w,o,n.length,k,x),w}eV.prototype.process=function(e,t){try{this.d.push(e,t)}catch(e){this.ondata(e,null,t)}},eV.prototype.push=function(e,t){eH.prototype.push.call(this,e,t)},eK.prototype.process=function(e,t){this.d.push(e,t)},eK.prototype.push=function(e,t){eH.prototype.push.call(this,e,t)},e$.prototype.add=function(e){var t=this;if(this.ondata||O(5),2&this.d)this.ondata(O(4+(1&this.d)*8,0,1),null,!1);else{var s=ej(e.filename),n=s.length,o=e.comment,i=o&&ej(o),a=n!=e.filename.length||i&&o.length!=i.length,p=n+eL(e.extra)+30;n>65535&&this.ondata(O(11,0,1),null,!1);var u=new r(p);ez(u,0,e,s,a,-1);var c=[u],h=function(){for(var e=0,s=c;e<s.length;e++){var n=s[e];t.ondata(null,n,!1)}c=[]},l=this.d;this.d=0;var d=this.u.length,f=Q(e,{f:s,u:a,o:i,t:function(){e.terminate&&e.terminate()},r:function(){if(h(),l){var e=t.u[d+1];e?e.r():t.d=1}l=1}}),m=0;e.ondata=function(s,n,o){if(s)t.ondata(s,n,o),t.terminate();else if(m+=n.length,c.push(n),o){var i=new r(16);el(i,0,0x8074b50),el(i,4,e.crc),el(i,8,m),el(i,12,e.size),c.push(i),f.c=m,f.b=p+m+16,f.crc=e.crc,f.size=e.size,l&&f.r(),l=1}else l&&h()},this.u.push(f)}},e$.prototype.end=function(){var e=this;2&this.d?this.ondata(O(4+(1&this.d)*8,0,1),null,!0):(this.d?this.e():this.u.push({r:function(){1&e.d&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3)},e$.prototype.e=function(){for(var e=0,t=0,s=0,n=0,o=this.u;n<o.length;n++){var i=o[n];s+=46+i.f.length+eL(i.extra)+(i.o?i.o.length:0)}for(var a=new r(s+22),p=0,u=this.u;p<u.length;p++){var i=u[p];ez(a,e,i,i.f,i.u,-i.c-2,t,i.o),e+=46+i.f.length+eL(i.extra)+(i.o?i.o.length:0),t+=i.b}eB(a,e,this.u.length,s,t),this.ondata(null,a,!0),this.d=2},e$.prototype.terminate=function(){for(var e=0,t=this.u;e<t.length;e++)t[e].t();this.d=2};var eY=function(){function e(){}return e.prototype.push=function(e,t){this.ondata(null,e,t)},e.compression=0,e}();function eF(){var e=this;this.i=new ek(function(t,s){e.ondata(null,t,s)})}function eQ(e,t){var s=this;t<32e4?this.i=new ek(function(e,t){s.ondata(null,e,t)}):(this.i=new eE(function(e,t,n){s.ondata(e,t,n)}),this.terminate=this.i.terminate)}function eX(e){this.onfile=e,this.k=[],this.o={0:eY},this.p=V}eF.prototype.push=function(e,t){try{this.i.push(e,t)}catch(e){this.ondata(e,null,t)}},eF.compression=8,eQ.prototype.push=function(e,t){this.i.terminate&&(e=T(e,0)),this.i.push(e,t)},eQ.compression=8,eX.prototype.push=function(e,t){var s=this;if(this.onfile||O(5),this.p||O(4),this.c>0){var n=Math.min(this.c,e.length),o=e.subarray(0,n);if(this.c-=n,this.d?this.d.push(o,!this.c):this.k[0].push(o),(e=e.subarray(n)).length)return this.push(e,t)}else{var i=0,a=0,p=void 0,u=void 0;this.p.length?e.length?((u=new r(this.p.length+e.length)).set(this.p),u.set(e,this.p.length)):u=this.p:u=e;for(var c=u.length,h=this.c,l=h&&this.d,d=this;a<c-4&&"break"!==function(){var e=ec(u,a);if(0x4034b50==e){i=1,p=a,d.d=null,d.c=0;var t=eu(u,a+6),n=eu(u,a+8),r=8&t,o=eu(u,a+26),l=eu(u,a+28);if(c>a+30+o+l){var f,m,v=[];d.k.unshift(v),i=2;var g=ec(u,a+18),b=ec(u,a+22),y=function(e,t){if(t){for(var s="",n=0;n<e.length;n+=16384)s+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return s}if(eI)return eI.decode(e);var r=eM(e),o=r.s,s=r.r;return s.length&&O(8),o}(u.subarray(a+30,a+=30+o),!(2048&t));0xffffffff==g?(g=(f=r?[-2]:eW(u,a))[0],b=f[1]):r&&(g=-1),a+=l,d.c=g;var S={name:y,compression:n,start:function(){if(S.ondata||O(5),g){var e=s.o[n];e||S.ondata(O(14,"unknown compression type "+n,1),null,!1),(m=g<0?new e(y):new e(y,g,b)).ondata=function(e,t,s){S.ondata(e,t,s)};for(var t=0;t<v.length;t++){var r=v[t];m.push(r,!1)}s.k[0]==v&&s.c?s.d=m:m.push(V,!0)}else S.ondata(null,V,!0)},terminate:function(){m&&m.terminate&&m.terminate()}};g>=0&&(S.size=g,S.originalSize=b),d.onfile(S)}return"break"}if(h){if(0x8074b50==e)return p=a+=12+(-2==h&&8),i=3,d.c=0,"break";else if(0x2014b50==e)return p=a-=4,i=3,d.c=0,"break"}}();++a);if(this.p=V,h<0){var f=i?u.subarray(0,p-12-(-2==h&&8)-(0x8074b50==ec(u,p-16)&&4)):u.subarray(0,a);l?l.push(f,!!i):this.k[+(2==i)].push(f)}if(2&i)return this.push(u.subarray(a),t);this.p=u.subarray(a)}t&&(this.c&&O(13),this.p=null)},eX.prototype.register=function(e){this.o[e.compression]=e},"function"==typeof queueMicrotask&&queueMicrotask,e.s(["strToU8",()=>ej,"zipSync",()=>eG])},13885,e=>e.a(async(t,s)=>{try{var n=e.i(42746),r=e.i(74270),o=e.i(21783),i=e.i(45796),a=e.i(69751),p=e.i(18040),u=t([r]);[r]=u.then?(await u)():u;let h=(0,r.neon)(process.env.DATABASE_URL);async function c(e,{params:t}){let{id:s}=await t,{data:r}=await o.auth.getSession();if(!r?.user)return n.NextResponse.json({error:"Unauthenticated"},{status:401});let u=await h`
    SELECT id, product_id, status, tech_stack
    FROM orders
    WHERE id = ${s}
      AND user_id = ${r.user.id}
      AND product_id = 'template-code'
      AND status = 'completed'
    LIMIT 1
  `;if(0===u.length)return n.NextResponse.json({error:"Order not found or not eligible for download"},{status:404});let c=u[0],l={};if(c.tech_stack)try{l="string"==typeof c.tech_stack?JSON.parse(c.tech_stack):c.tech_stack}catch{l={}}let d=(0,i.generateTemplateFiles)(l);d["AGENTS.md"]=(0,a.generateAgentsMd)(l);let f={};for(let[e,t]of Object.entries(d))f[e]=(0,p.strToU8)(t);let m=(0,p.zipSync)(f,{level:6});return new n.NextResponse(m,{status:200,headers:{"Content-Type":"application/zip","Content-Disposition":`attachment; filename="saas-template-${s.slice(0,8)}.zip"`,"Content-Length":String(m.byteLength),"Cache-Control":"private, no-store"}})}e.s(["GET",()=>c]),s()}catch(e){s(e)}},!1),65813,e=>e.a(async(t,s)=>{try{var n=e.i(77066),r=e.i(54940),o=e.i(46543),i=e.i(92891),a=e.i(20961),p=e.i(89987),u=e.i(8150),c=e.i(22694),h=e.i(82817),l=e.i(88035),d=e.i(48621),f=e.i(73061),m=e.i(2429),v=e.i(87481),g=e.i(50517),b=e.i(93695);e.i(64146);var y=e.i(40154),S=e.i(13885),w=t([S]);[S]=w.then?(await w)():w;let E=new n.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/download/[id]/route",pathname:"/api/download/[id]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/download/[id]/route.ts",nextConfigOutput:"",userland:S}),{workAsyncStorage:C,workUnitAsyncStorage:R,serverHooks:A}=E;function x(){return(0,o.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:R})}async function k(e,t,s){E.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/download/[id]/route";n=n.replace(/\/index$/,"")||"/";let o=await E.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!o)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:S,params:w,nextConfig:x,parsedUrl:k,isDraftMode:C,prerenderManifest:R,routerServerContext:A,isOnDemandRevalidate:_,revalidateOnlyGenerated:N,resolvedPathname:P,clientReferenceManifest:T,serverActionsManifest:D}=o,O=(0,u.normalizeAppPath)(n),I=!!(R.dynamicRoutes[O]||R.routes[P]),U=async()=>((null==A?void 0:A.render404)?await A.render404(e,t,k,!1):t.end("This page could not be found"),null);if(I&&!C){let e=!!R.routes[P],t=R.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(x.experimental.adapterPath)return await U();throw new b.NoFallbackError}}let M=null;!I||E.isDev||C||(M=P,M="/index"===M?"/":M);let j=!0===E.isDev||!I,q=I&&!j;D&&T&&(0,p.setManifestsSingleton)({page:n,clientReferenceManifest:T,serverActionsManifest:D});let W=e.method||"GET",L=(0,a.getTracer)(),z=L.getActiveScopeSpan(),B={params:w,prerenderManifest:R,renderOpts:{experimental:{authInterrupts:!!x.experimental.authInterrupts},cacheComponents:!!x.cacheComponents,supportsDynamicResponse:j,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:x.cacheLife,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,s,n,r)=>E.onRequestError(e,t,n,r,A)},sharedContext:{buildId:S}},H=new c.NodeNextRequest(e),V=new c.NodeNextResponse(t),K=h.NextRequestAdapter.fromNodeNextRequest(H,(0,h.signalFromNodeResponse)(t));try{let o=async e=>E.handle(K,B).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let s=L.getRootSpanAttributes();if(!s)return;if(s.get("next.span_type")!==l.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${s.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=s.get("next.route");if(r){let t=`${W} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${W} ${n}`)}),p=!!(0,i.getRequestMeta)(e,"minimalMode"),u=async i=>{var a,u;let c=async({previousCacheEntry:r})=>{try{if(!p&&_&&N&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await o(i);e.fetchMetrics=B.renderOpts.fetchMetrics;let a=B.renderOpts.pendingWaitUntil;a&&s.waitUntil&&(s.waitUntil(a),a=void 0);let u=B.renderOpts.collectedTags;if(!I)return await (0,f.sendResponse)(H,V,n,B.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(n.headers);u&&(t[g.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let s=void 0!==B.renderOpts.collectedRevalidate&&!(B.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&B.renderOpts.collectedRevalidate,r=void 0===B.renderOpts.collectedExpire||B.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:B.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:s,expire:r}}}}catch(t){throw(null==r?void 0:r.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,d.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:_})},!1,A),t}},h=await E.handleResponse({req:e,nextConfig:x,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:R,isRoutePPREnabled:!1,isOnDemandRevalidate:_,revalidateOnlyGenerated:N,responseGenerator:c,waitUntil:s.waitUntil,isMinimalMode:p});if(!I)return null;if((null==h||null==(a=h.value)?void 0:a.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==h||null==(u=h.value)?void 0:u.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});p||t.setHeader("x-nextjs-cache",_?"REVALIDATED":h.isMiss?"MISS":h.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let l=(0,m.fromNodeOutgoingHttpHeaders)(h.value.headers);return p&&I||l.delete(g.NEXT_CACHE_TAGS_HEADER),!h.cacheControl||t.getHeader("Cache-Control")||l.get("Cache-Control")||l.set("Cache-Control",(0,v.getCacheControlHeader)(h.cacheControl)),await (0,f.sendResponse)(H,V,new Response(h.value.body,{headers:l,status:h.value.status||200})),null};z?await u(z):await L.withPropagatedContext(e.headers,()=>L.trace(l.BaseServerSpan.handleRequest,{spanName:`${W} ${n}`,kind:a.SpanKind.SERVER,attributes:{"http.method":W,"http.target":e.url}},u))}catch(t){if(t instanceof b.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,d.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:_})},!1,A),I)throw t;return await (0,f.sendResponse)(H,V,new Response(null,{status:500})),null}}e.s(["handler",()=>k,"patchFetch",()=>x,"routeModule",()=>E,"serverHooks",()=>A,"workAsyncStorage",()=>C,"workUnitAsyncStorage",()=>R]),s()}catch(e){s(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa081680._.js.map