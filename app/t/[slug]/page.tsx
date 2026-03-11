import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTemplateShare } from "@/app/actions/templates"
import { TemplateDetail } from "./template-detail"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = await getTemplateShare(slug)
  
  if (!template) {
    return { title: "模板不存在" }
  }
  
  return {
    title: template.name,
    description: template.description || "技术栈模板",
  }
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params
  const template = await getTemplateShare(slug)

  if (!template) {
    notFound()
  }

  return <TemplateDetail template={template} />
}