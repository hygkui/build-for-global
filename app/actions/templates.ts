"use server"

import { nanoid } from "nanoid"
import { auth } from "@/lib/auth/server"
import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplatesByUserId,
  getTemplateBySlug,
  getTemplateById,
  incrementTemplateView,
  incrementTemplateFork,
  addFavorite,
  removeFavorite,
  isFavorited,
  getFavoriteTemplates,
  type Template,
} from "@/lib/db"
import { revalidatePath } from "next/cache"

async function requireAuth() {
  const { data: session } = await auth.getSession()
  if (!session?.user) throw new Error("请先登录")
  return session.user
}

export async function saveTemplate(data: {
  name: string
  description?: string
  techStack: Record<string, string>
  isPublic?: boolean
}): Promise<Template> {
  const user = await requireAuth()

  const shareSlug = data.isPublic ? nanoid(8) : undefined

  return createTemplate({
    userId: user.id,
    name: data.name,
    description: data.description,
    techStack: data.techStack,
    isPublic: data.isPublic,
    shareSlug,
  })
}

export async function editTemplate(
  id: string,
  data: {
    name?: string
    description?: string
    techStack?: Record<string, string>
    isPublic?: boolean
  }
): Promise<Template | null> {
  const user = await requireAuth()

  const existing = await getTemplateById(id)
  if (!existing || existing.user_id !== user.id) {
    throw new Error("模板不存在或无权限")
  }

  const shareSlug = data.isPublic && !existing.share_slug ? nanoid(8) : undefined

  const result = await updateTemplate(id, {
    ...data,
    shareSlug,
  })

  revalidatePath("/dashboard/templates")
  return result
}

export async function removeTemplate(id: string): Promise<void> {
  const user = await requireAuth()

  const existing = await getTemplateById(id)
  if (!existing || existing.user_id !== user.id) {
    throw new Error("模板不存在或无权限")
  }

  await deleteTemplate(id)
  revalidatePath("/dashboard/templates")
}

export async function getMyTemplates(): Promise<Template[]> {
  const user = await requireAuth()
  return getTemplatesByUserId(user.id)
}

export async function forkTemplate(slug: string): Promise<Template> {
  const user = await requireAuth()

  const original = await getTemplateBySlug(slug)
  if (!original || !original.is_public) {
    throw new Error("模板不存在或不公开")
  }

  await incrementTemplateFork(original.id)

  return createTemplate({
    userId: user.id,
    name: `${original.name} (副本)`,
    description: original.description ?? undefined,
    techStack: original.tech_stack,
    isPublic: false,
  })
}

export async function toggleFavorite(templateId: string): Promise<boolean> {
  const user = await requireAuth()

  const favorited = await isFavorited(user.id, templateId)

  if (favorited) {
    await removeFavorite(user.id, templateId)
    return false
  } else {
    await addFavorite(user.id, templateId)
    return true
  }
}

export async function getMyFavorites(): Promise<Template[]> {
  const user = await requireAuth()
  return getFavoriteTemplates(user.id)
}

export async function getTemplateShare(slug: string): Promise<Template | null> {
  const template = await getTemplateBySlug(slug)

  if (template && template.is_public) {
    await incrementTemplateView(slug)
  }

  return template
}

export async function checkFavoriteStatus(templateId: string): Promise<boolean> {
  const { data: session } = await auth.getSession()
  if (!session?.user) return false
  return isFavorited(session.user.id, templateId)
}