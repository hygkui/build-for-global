import { neon } from '@neondatabase/serverless'
import { auth } from '@neondatabase/auth'

const sql = neon(process.env.DATABASE_URL!)

export const neonAuth = auth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookieSecret: process.env.NEON_AUTH_COOKIE_SECRET!,
})

export async function getCurrentUser() {
  try {
    const user = await neonAuth.getUser()
    return user
  } catch {
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}
