import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { orderId, productId } = session.metadata ?? {}
    if (!orderId) return NextResponse.json({ ok: true })

    if (productId === 'template-code') {
      // $20 自动交付：更新状态为 completed，下载链接由 return URL 生成
      await sql`
        UPDATE orders
        SET status = 'completed', stripe_session_id = ${session.id}, updated_at = NOW()
        WHERE id = ${orderId}
      `
    } else if (productId === 'mvp-service') {
      // $200 人工交付：更新为 paid，等待需求填写
      await sql`
        UPDATE orders
        SET status = 'paid', stripe_session_id = ${session.id}, updated_at = NOW()
        WHERE id = ${orderId}
      `
    }
  }

  return NextResponse.json({ ok: true })
}
