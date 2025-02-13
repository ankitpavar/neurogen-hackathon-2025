import { bedrock } from "@ai-sdk/amazon-bedrock"
import { streamText } from "ai"

export const runtime = "edge"
export const maxDuration = 30

export async function POST(req: Request) {
	const { messages } = await req.json()
	console.log(messages, "messages")

	const model = bedrock("amazon.nova-lite-v1:0")

	// Call the language model with the prompt
	const result = streamText({
		model,
		messages
	})

	return result.toDataStreamResponse()
}
