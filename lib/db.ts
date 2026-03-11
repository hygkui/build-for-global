import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

function createSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set")
  }
  return neon(process.env.DATABASE_URL)
}

let _sql: NeonQueryFunction<any, any> | undefined

export function getSql(): NeonQueryFunction<any, any> {
  if (!_sql) {
    _sql = createSql()
  }
  return _sql
}

export interface Order {
  id: string
  user_id: string
  product_id: string
  product_name: string
  amount_cents: number
  currency: string
  status: "pending" | "paid" | "processing" | "completed" | "cancelled"
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  tech_stack: Record<string, string[]> | null
  download_url: string | null
  download_expires_at: string | null
  requirements: string | null
  requirements_submitted_at: string | null
  created_at: string
  updated_at: string
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM orders
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
  return rows as Order[]
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM orders
    WHERE stripe_session_id = ${sessionId}
    LIMIT 1
  `
  return (rows as unknown as Order[])[0] ?? null
}

export async function createOrder(data: {
  userId: string
  productId: string
  productName: string
  amountCents: number
  stripeSessionId: string
  techStack?: Record<string, string[]>
}): Promise<Order> {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO orders (
      user_id, product_id, product_name, amount_cents,
      stripe_session_id, tech_stack, status
    ) VALUES (
      ${data.userId},
      ${data.productId},
      ${data.productName},
      ${data.amountCents},
      ${data.stripeSessionId},
      ${data.techStack ? JSON.stringify(data.techStack) : null},
      'pending'
    )
    RETURNING *
  `
  return (rows as unknown as Order[])[0]
}

export async function updateOrderStatus(
  sessionId: string,
  status: Order["status"],
  extra?: { downloadUrl?: string; paymentIntentId?: string }
): Promise<void> {
  const sql = getSql()
  await sql`
    UPDATE orders
    SET
      status = ${status},
      download_url = COALESCE(${extra?.downloadUrl ?? null}, download_url),
      stripe_payment_intent_id = COALESCE(${extra?.paymentIntentId ?? null}, stripe_payment_intent_id),
      updated_at = NOW()
    WHERE stripe_session_id = ${sessionId}
  `
}

export interface Template {
  id: string
  user_id: string
  name: string
  description: string | null
  tech_stack: Record<string, string>
  is_public: boolean
  share_slug: string | null
  view_count: number
  fork_count: number
  created_at: string
  updated_at: string
}

export interface TemplateWithAuthor extends Template {
  author_email?: string
  is_favorited?: boolean
}

export async function getTemplatesByUserId(userId: string): Promise<Template[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM templates
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `
  return rows as Template[]
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM templates WHERE id = ${id} LIMIT 1
  `
  return (rows as Template[])[0] ?? null
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM templates WHERE share_slug = ${slug} LIMIT 1
  `
  return (rows as Template[])[0] ?? null
}

export async function getPublicTemplates(limit = 20, offset = 0): Promise<Template[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM templates
    WHERE is_public = true
    ORDER BY view_count DESC, created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
  return rows as Template[]
}

export async function createTemplate(data: {
  userId: string
  name: string
  description?: string
  techStack: Record<string, string>
  isPublic?: boolean
  shareSlug?: string
}): Promise<Template> {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO templates (user_id, name, description, tech_stack, is_public, share_slug)
    VALUES (
      ${data.userId},
      ${data.name},
      ${data.description ?? null},
      ${JSON.stringify(data.techStack)},
      ${data.isPublic ?? false},
      ${data.shareSlug ?? null}
    )
    RETURNING *
  `
  return (rows as Template[])[0]
}

export async function updateTemplate(
  id: string,
  data: {
    name?: string
    description?: string
    techStack?: Record<string, string>
    isPublic?: boolean
    shareSlug?: string | null
  }
): Promise<Template | null> {
  const sql = getSql()
  const rows = await sql`
    UPDATE templates
    SET
      name = COALESCE(${data.name ?? null}, name),
      description = COALESCE(${data.description ?? null}, description),
      tech_stack = COALESCE(${data.techStack ? JSON.stringify(data.techStack) : null}, tech_stack),
      is_public = COALESCE(${data.isPublic ?? null}, is_public),
      share_slug = COALESCE(${data.shareSlug ?? null}, share_slug)
    WHERE id = ${id}
    RETURNING *
  `
  return (rows as Template[])[0] ?? null
}

export async function deleteTemplate(id: string): Promise<void> {
  const sql = getSql()
  await sql`DELETE FROM templates WHERE id = ${id}`
}

export async function incrementTemplateView(slug: string): Promise<void> {
  const sql = getSql()
  await sql`
    UPDATE templates SET view_count = view_count + 1
    WHERE share_slug = ${slug}
  `
}

export async function incrementTemplateFork(id: string): Promise<void> {
  const sql = getSql()
  await sql`
    UPDATE templates SET fork_count = fork_count + 1
    WHERE id = ${id}
  `
}

export async function getFavoriteTemplates(userId: string): Promise<Template[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT t.* FROM templates t
    JOIN template_favorites f ON t.id = f.template_id
    WHERE f.user_id = ${userId}
    ORDER BY f.created_at DESC
  `
  return rows as Template[]
}

export async function addFavorite(userId: string, templateId: string): Promise<void> {
  const sql = getSql()
  await sql`
    INSERT INTO template_favorites (user_id, template_id)
    VALUES (${userId}, ${templateId})
    ON CONFLICT DO NOTHING
  `
}

export async function removeFavorite(userId: string, templateId: string): Promise<void> {
  const sql = getSql()
  await sql`
    DELETE FROM template_favorites
    WHERE user_id = ${userId} AND template_id = ${templateId}
  `
}

export async function isFavorited(userId: string, templateId: string): Promise<boolean> {
  const sql = getSql()
  const rows = await sql`
    SELECT 1 FROM template_favorites
    WHERE user_id = ${userId} AND template_id = ${templateId}
  `
return (rows as unknown[]).length > 0
}

export interface ChatSession {
  id: string
  user_id: string
  template_id: string | null
  title: string | null
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  role: "user" | "assistant"
  content: string
  tech_stack_context: Record<string, string> | null
  created_at: string
}

export async function getChatSessionsByUserId(userId: string): Promise<ChatSession[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM chat_sessions
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `
  return rows as ChatSession[]
}

export async function getChatSessionById(id: string): Promise<ChatSession | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM chat_sessions WHERE id = ${id} LIMIT 1
  `
  return (rows as ChatSession[])[0] ?? null
}

export async function createChatSession(data: {
  userId: string
  templateId?: string
  title?: string
}): Promise<ChatSession> {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO chat_sessions (user_id, template_id, title)
    VALUES (${data.userId}, ${data.templateId ?? null}, ${data.title ?? null})
    RETURNING *
  `
  return (rows as ChatSession[])[0]
}

export async function updateChatSessionTitle(id: string, title: string): Promise<void> {
  const sql = getSql()
  await sql`
    UPDATE chat_sessions SET title = ${title} WHERE id = ${id}
  `
}

export async function deleteChatSession(id: string): Promise<void> {
  const sql = getSql()
  await sql`DELETE FROM chat_sessions WHERE id = ${id}`
}

export async function getChatMessages(sessionId: string, limit = 50): Promise<ChatMessage[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM chat_messages
    WHERE session_id = ${sessionId}
    ORDER BY created_at ASC
    LIMIT ${limit}
  `
  return rows as ChatMessage[]
}

export async function createChatMessage(data: {
  sessionId: string
  role: "user" | "assistant"
  content: string
  techStackContext?: Record<string, string>
}): Promise<ChatMessage> {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO chat_messages (session_id, role, content, tech_stack_context)
    VALUES (
      ${data.sessionId},
      ${data.role},
      ${data.content},
      ${data.techStackContext ? JSON.stringify(data.techStackContext) : null}
    )
    RETURNING *
  `
  return (rows as ChatMessage[])[0]
}
