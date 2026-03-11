# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-11
**Commit:** a1d1439
**Branch:** v0/hygkui-4870-bdc92532

## OVERVIEW

Tech stack generator for global SaaS products. Next.js 16 App Router + Neon DB + Neon Auth + Stripe. Users select tech stacks → generate downloadable project templates.

## STRUCTURE

```
build-for-global/
├── app/                    # Next.js App Router routes + API
│   ├── actions/            # Server Actions (orders, stripe)
│   ├── api/                # API routes (auth, webhooks, download)
│   ├── auth/[path]/        # Neon Auth UI pages
│   ├── account/[path]/     # Neon Auth account management
│   ├── dashboard/          # Protected user dashboard
│   ├── checkout/           # Stripe checkout flow
│   └── pricing/            # Pricing cards page
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives (button, badge, etc.)
│   ├── navbar.tsx          # Global navigation
│   ├── tech-stack-selector.tsx  # Main tech stack picker
│   ├── pricing-cards.tsx   # Product pricing display
│   └── checkout.tsx        # Stripe checkout wrapper
├── lib/                    # Core business logic
│   ├── auth/               # Neon Auth client/server config
│   ├── db.ts               # Neon DB queries (orders table)
│   ├── stripe.ts           # Stripe singleton
│   ├── products.ts         # Product definitions ($20/$200)
│   ├── tech-stacks.ts      # Tech category definitions + compatibility matrix
│   ├── template-generator.ts  # ZIP file generator (730 lines, core logic)
│   └── templates/          # AGENTS.md template for generated projects
└── scripts/                # DB migrations
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new tech stack option | `lib/tech-stacks.ts` | Add to TECH_STACKS array + DEPLOYMENT_COMPAT if deployment-related |
| Modify checkout flow | `components/checkout.tsx`, `app/actions/stripe.ts` | Client + server action |
| Handle Stripe webhooks | `app/api/webhooks/stripe/route.ts` | Payment confirmation → order update |
| Add DB query | `lib/db.ts` | Uses Neon serverless SQL tagged templates |
| Change auth config | `lib/auth/server.ts`, `lib/auth/client.ts` | Server uses `createNeonAuth`, client uses `createAuthClient` |
| Protected routes | `middleware.ts` | Matcher: `/dashboard/:path*`, `/account/:path*` |
| Generate template files | `lib/template-generator.ts` | `generateTemplateFiles(techStack)` returns `Record<filePath, content>` |
| i18n conventions (for generated projects) | `lib/templates/AGENTS.md` | Full next-intl spec — included in generated ZIPs |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `generateTemplateFiles` | fn | `lib/template-generator.ts` | Core: generates ZIP files from tech stack selection |
| `TECH_STACKS` | const | `lib/tech-stacks.ts` | All tech categories + options (526 lines) |
| `DEPLOYMENT_COMPAT` | const | `lib/tech-stacks.ts` | Deployment platform compatibility matrix (cron/ws/docker) |
| `PRODUCTS` | const | `lib/products.ts` | Product definitions: template-code ($20), mvp-service ($200) |
| `Order` | interface | `lib/db.ts` | DB schema for orders table |
| `getSql` | fn | `lib/db.ts` | Lazy Neon SQL client singleton |
| `getStripe` | fn | `lib/stripe.ts` | Lazy Stripe singleton |
| `auth` | const | `lib/auth/server.ts` | Neon Auth server instance |
| `authClient` | const | `lib/auth/client.ts` | Neon Auth client instance |

## CONVENTIONS

**Singleton Pattern:** Lazy initialization with module-level cache (`let _sql`, `let _stripe`). Prevents multiple connections in dev hot reload.

**Server Actions:** Located in `app/actions/`. Use `'use server'` directive. Called from client components.

**API Routes:** Dynamic routes use `[id]` or `[...path]` for catch-alls. Auth handler uses catch-all: `app/api/auth/[...path]/route.ts`.

**Protected Routes:** `middleware.ts` uses Neon Auth middleware. Redirects to `/auth/sign-in` if unauthenticated.

**TypeScript Paths:** `@/*` maps to root. Import as `@/lib/db`, `@/components/navbar`.

## ANTI-PATTERNS (THIS PROJECT)

- **Never** use `as any` or `@ts-ignore` — fix the type instead
- **Never** suppress Neon Auth hydration warnings — use `suppressHydrationWarning` on `<html>` only
- **Never** hardcode product prices — use `lib/products.ts` as source of truth
- **Never** duplicate tech stack IDs — must match between `TECH_STACKS` and `DEPLOYMENT_COMPAT`

## UNIQUE STYLES

**Tech Stack Selection:** Multi-category picker with dependency validation. Deployment platform selection gates cron/websocket/docker availability (see `requiresDeploymentCheck` in `tech-stacks.ts`).

**Order Flow:**
1. User selects tech stack → stored in Order record
2. Stripe checkout → webhook updates order to `paid`
3. If `automatic` product → generate ZIP + signed download URL
4. If `manual` product (MVP service) → user submits requirements form

## COMMANDS

```bash
pnpm dev          # Development server (port 3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint via eslint-config-next
```

**Deployment:** Configured for Vercel via `vercel.json`. No CI/CD pipeline — relies on Vercel auto-deploy.

## NOTES

- **No tests configured.** Add `vitest` or `jest` if testing needed.
- **No i18n in this app.** Only for generated templates (see `lib/templates/AGENTS.md`).
- **Database migrations** in `scripts/migrate.sql` — run manually against Neon DB.
- **Large file:** `lib/template-generator.ts` (730 lines) contains all file generation logic. Edit carefully.