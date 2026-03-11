import { Metadata } from "next"
import { TemplatesList } from "./templates-list"

export const metadata: Metadata = {
  title: "我的模板",
}

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的模板</h1>
      <TemplatesList />
    </div>
  )
}