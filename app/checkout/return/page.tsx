import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, MessageSquare } from 'lucide-react'
import { stripe } from '@/lib/stripe'
import { Button } from '@/components/ui/button'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

interface ReturnPageProps {
  searchParams: Promise<{ session_id?: string; order_id?: string }>
}

export default async function CheckoutReturnPage({ searchParams }: ReturnPageProps) {
  const { session_id, order_id } = await searchParams
  if (!session_id) redirect('/pricing')

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if (session.status !== 'complete') {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-3">支付未完成</h1>
          <p className="text-muted mb-6">你的支付尚未完成，请重新尝试。</p>
          <Link href="/pricing">
            <Button variant="outline">返回定价页</Button>
          </Link>
        </div>
      </main>
    )
  }

  const productId = session.metadata?.productId
  const isTemplate = productId === 'template-code'

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-accent" />
        </div>
        <h1 className="text-3xl font-bold font-sans text-foreground mb-3">
          支付成功！
        </h1>
        <p className="text-muted leading-relaxed mb-10">
          {isTemplate
            ? '你的模板代码已准备就绪，点击下方按钮立即下载。'
            : '感谢你的信任！我们已收到你的订单，将在 24 小时内通过邮件联系你确认需求。'}
        </p>

        <div className="border border-border rounded-2xl bg-card p-8 mb-8">
          {isTemplate ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-foreground mb-2">
                <Download className="w-5 h-5 text-accent" />
                <span className="font-semibold">下载模板代码</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                模板代码包含完整的项目结构、配置文件和部署说明，下载后即可开始开发。
              </p>
              <Link href={`/dashboard/orders`}>
                <Button className="w-full">前往我的订单下载</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-foreground mb-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                <span className="font-semibold">填写项目需求</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                请填写详细的项目需求，帮助我们更好地理解你的目标，确保交付符合期望。
              </p>
              <Link href={`/dashboard/orders/${order_id}/requirements`}>
                <Button className="w-full">立即填写需求</Button>
              </Link>
            </div>
          )}
        </div>

        <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">
          前往仪表盘查看订单
        </Link>
      </div>
    </main>
  )
}
