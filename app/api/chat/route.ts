import { bedrock } from "@ai-sdk/amazon-bedrock"
import { smoothStream, streamText } from "ai"
import { prompt } from "@/lib/constant"
export const runtime = "edge"
export const maxDuration = 30

export async function POST(req: Request) {
	const { messages } = await req.json()
	console.log(messages, "messages")

	const model = bedrock('meta.llama3-70b-instruct-v1:0');

	const result = streamText({
		model,
		messages,
    experimental_transform: smoothStream({ chunking: 'word' }),
    system: prompt,
    
	})

	return result.toDataStreamResponse()
}
