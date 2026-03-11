import { NextResponse } from "next/server"
import { getTemplateBySlug, incrementTemplateView } from "@/lib/db"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const template = await getTemplateBySlug(slug)

  if (!template) {
    return NextResponse.json({ error: "模板不存在" }, { status: 404 })
  }

  if (!template.is_public) {
    return NextResponse.json({ error: "模板不公开" }, { status: 403 })
  }

  await incrementTemplateView(slug)

  return NextResponse.json(template)
}