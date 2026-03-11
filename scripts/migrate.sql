-- 出海黄金组合 数据库迁移
-- user_id 存储 Neon Auth 的用户 ID（字符串）

-- ── 订单表 ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,              -- 'template-code' | 'mvp-service'
  product_name TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,         -- 价格（分）
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | processing | completed | cancelled
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  -- 技术栈选择（JSON）
  tech_stack JSONB,
  -- $20 代码包下载链接
  download_url TEXT,
  download_expires_at TIMESTAMPTZ,
  -- $200 需求收集
  requirements TEXT,
  requirements_submitted_at TIMESTAMPTZ,
  -- 时间戳
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 模板表（替代 saved_stacks，功能更完整）──────────────────────────────
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tech_stack JSONB NOT NULL,             -- Record<string, string>
  is_public BOOLEAN NOT NULL DEFAULT false,
  share_slug TEXT UNIQUE,                -- 短链接 /t/{slug}
  view_count INTEGER NOT NULL DEFAULT 0,
  fork_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 模板收藏表 ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS template_favorites (
  user_id TEXT NOT NULL,
  template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, template_id)
);

-- ── AI 对话会话表 ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── AI 对话消息表 ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  tech_stack_context JSONB,              -- 对话时的技术栈快照
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 更新时间触发器 ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── 索引 ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_public ON templates(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_templates_slug ON templates(share_slug);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

-- ── 清理旧表（如果存在）────────────────────────────────────────────────────
-- 注意：生产环境迁移时需要先备份数据
-- DROP TABLE IF EXISTS saved_stacks;