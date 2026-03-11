import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"

export type AIProvider = "openai" | "google"

function getModel(provider: AIProvider = "openai") {
  switch (provider) {
    case "google":
      return google("gemini-2.0-flash")
    case "openai":
    default:
      return openai("gpt-4o-mini")
  }
}

export const aiModel = getModel()

export function getAIModel(provider?: AIProvider) {
  return getModel(provider)
}