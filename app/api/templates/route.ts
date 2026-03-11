import { NextResponse } from "next/server"
import { getPublicTemplates } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get("limit") || "20")
  const offset = parseInt(searchParams.get("offset") || "0")

  const templates = await getPublicTemplates(limit, offset)

  return NextResponse.json(templates)
}