export interface TechCategory {
  id: string
  name: string
  description: string
  options: TechOption[]
  multiSelect: boolean
}

export interface TechOption {
  id: string
  name: string
  description: string
  icon?: string
  docs?: string
}

export const TECH_STACKS: TechCategory[] = [
  {
    id: "deployment",
    name: "部署平台",
    description: "选择你的应用部署目标",
    multiSelect: false,
    options: [
      {
        id: "vercel",
        name: "Vercel",
        description: "零配置部署，全球 CDN，自动 HTTPS",
        docs: "https://vercel.com/docs",
      },
      {
        id: "cloudflare",
        name: "Cloudflare Workers",
        description: "边缘计算，超低延迟",
        docs: "https://developers.cloudflare.com/workers/",
      },
      {
        id: "railway",
        name: "Railway",
        description: "支持 Docker，简单易用",
        docs: "https://docs.railway.app/",
      },
      {
        id: "deno",
        name: "Deno Deploy",
        description: "Deno 原生支持，全球分布",
        docs: "https://deno.com/deploy/docs",
      },
    ],
  },
  {
    id: "database",
    name: "数据库",
    description: "选择数据库方案",
    multiSelect: false,
    options: [
      {
        id: "neon",
        name: "Neon",
        description: "Serverless PostgreSQL，自动扩缩容",
        docs: "https://neon.tech/docs",
      },
      {
        id: "supabase",
        name: "Supabase",
        description: "PostgreSQL + 实时订阅 + 存储",
        docs: "https://supabase.com/docs",
      },
      {
        id: "planetscale",
        name: "PlanetScale",
        description: "Serverless MySQL，分支工作流",
        docs: "https://planetscale.com/docs",
      },
    ],
  },
  {
    id: "storage",
    name: "文件存储",
    description: "上传图片、文件等静态资源",
    multiSelect: false,
    options: [
      {
        id: "vercel-blob",
        name: "Vercel Blob",
        description: "简单易用，与 Vercel 无缝集成",
        docs: "https://vercel.com/docs/storage/vercel-blob",
      },
      {
        id: "cloudflare-r2",
        name: "Cloudflare R2",
        description: "S3 兼容，无出站费用",
        docs: "https://developers.cloudflare.com/r2/",
      },
      {
        id: "aws-s3",
        name: "AWS S3",
        description: "行业标准，功能强大",
        docs: "https://aws.amazon.com/s3/",
      },
      {
        id: "aliyun-oss",
        name: "阿里云 OSS",
        description: "国内访问快速",
        docs: "https://www.aliyun.com/product/oss",
      },
    ],
  },
  {
    id: "auth",
    name: "用户认证",
    description: "登录注册、权限管理",
    multiSelect: false,
    options: [
      {
        id: "better-auth",
        name: "Better Auth",
        description: "现代化认证方案，类型安全",
        docs: "https://www.better-auth.com/docs",
      },
      {
        id: "supabase-auth",
        name: "Supabase Auth",
        description: "集成在 Supabase 中，多种登录方式",
        docs: "https://supabase.com/docs/guides/auth",
      },
      {
        id: "clerk",
        name: "Clerk",
        description: "功能丰富，UI 美观",
        docs: "https://clerk.com/docs",
      },
      {
        id: "auth-js",
        name: "Auth.js",
        description: "灵活配置，支持多种 OAuth",
        docs: "https://authjs.dev/",
      },
    ],
  },
  {
    id: "payment",
    name: "支付",
    description: "接受信用卡、订阅付款",
    multiSelect: false,
    options: [
      {
        id: "stripe",
        name: "Stripe",
        description: "全球支付标准，功能完善",
        docs: "https://stripe.com/docs",
      },
      {
        id: "polar",
        name: "Polar.sh",
        description: "面向开发者和创作者的支付平台",
        docs: "https://docs.polar.sh/",
      },
      {
        id: "lemonsqueezy",
        name: "Lemon Squeezy",
        description: "一体化商户服务",
        docs: "https://docs.lemonsqueezy.com/",
      },
    ],
  },
  {
    id: "email",
    name: "邮件服务",
    description: "发送交易邮件、通知",
    multiSelect: false,
    options: [
      {
        id: "resend",
        name: "Resend",
        description: "现代邮件 API，React Email 支持",
        docs: "https://resend.com/docs",
      },
      {
        id: "sendgrid",
        name: "SendGrid",
        description: "成熟稳定，功能丰富",
        docs: "https://docs.sendgrid.com/",
      },
      {
        id: "postmark",
        name: "Postmark",
        description: "专注交易邮件，送达率高",
        docs: "https://postmarkapp.com/developer",
      },
    ],
  },
  {
    id: "cache",
    name: "缓存",
    description: "提升性能，减少数据库查询",
    multiSelect: false,
    options: [
      {
        id: "upstash-redis",
        name: "Upstash Redis",
        description: "Serverless Redis，按请求付费",
        docs: "https://upstash.com/docs/redis",
      },
      {
        id: "vercel-kv",
        name: "Vercel KV",
        description: "基于 Upstash，Vercel 原生集成",
        docs: "https://vercel.com/docs/storage/vercel-kv",
      },
      {
        id: "cloudflare-kv",
        name: "Cloudflare KV",
        description: "全球分布式键值存储",
        docs: "https://developers.cloudflare.com/kv/",
      },
    ],
  },
  {
    id: "monitoring",
    name: "监控",
    description: "错误追踪、性能分析",
    multiSelect: false,
    options: [
      {
        id: "sentry",
        name: "Sentry.io",
        description: "错误监控与性能分析",
        docs: "https://docs.sentry.io/",
      },
      {
        id: "posthog",
        name: "PostHog",
        description: "产品分析、功能标志",
        docs: "https://posthog.com/docs",
      },
      {
        id: "axiom",
        name: "Axiom",
        description: "日志聚合与查询",
        docs: "https://axiom.co/docs",
      },
    ],
  },
]
