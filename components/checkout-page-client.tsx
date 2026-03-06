'use client'

import dynamic from 'next/dynamic'

const Checkout = dynamic(() => import('@/components/checkout'), { ssr: false })

interface CheckoutPageClientProps {
  productId: string
  userId: string
  techStack?: string
}

export default function CheckoutPageClient({ productId, userId, techStack }: CheckoutPageClientProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Checkout productId={productId} userId={userId} techStack={techStack} />
    </div>
  )
}
