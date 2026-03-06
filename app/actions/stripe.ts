'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function createCheckoutSession(
  productId: string,
  userId: string,
  techStack?: string,
): Promise<string> {
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) throw new Error(`Product "${productId}" not found`)

  const [order] = await sql`
    INSERT INTO orders (user_id, product_id, product_name, amount, status, tech_stack)
    VALUES (${userId}, ${productId}, ${product.name}, ${product.priceInCents}, 'pending', ${techStack ?? null})
    RETURNING id
  `

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: product.priceInCents,
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      orderId: order.id,
      productId,
      userId,
    },
  })

  return session.client_secret!
}
