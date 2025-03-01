"use client"

import { useCallback, useState } from "react"
import { ChatRequestOptions } from "ai"
import { CreateMessage, Message } from "ai/react"

import { ClientMessage } from "@/lib/chat/types"


interface ChatCardsProps {
	id: string
	title?: string
	messages: ClientMessage[] | Message[]
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions
	) => Promise<string | null | undefined>
}

export function ChatCards({ id, title, messages, append }: ChatCardsProps) {
	const [shareDialogOpen, setShareDialogOpen] = useState(false)

	const exampleMessages = [
		{
			heading: "What can you do?",
			subheading: "do?",
			message: "What can you do?"
		},
		{
			heading: "Analyze engagement",
			subheading: "metrics for top candidates",
			message: "Can you analyze the engagement metrics for our highest scoring candidates?"
		},
		{
			heading: "Pipeline health",
			subheading: "overview",
			message: "Give me an overview of our current pipeline health and candidate distribution."
		},
	]

	const onCreateChat = useCallback(
		async (message: string) => {
			await append({
				role: "user",
				content: message
			})
		},
		[id, append]
	)

	return (
		<div className="">
			<div className="mx-auto mb-2 grid grid-cols-1 gap-2 sm:px-0">
				{messages?.length === 0 &&
					exampleMessages.map((example, index) => (
						<div
							key={example.heading}
							onClick={() => onCreateChat(example.message)}
							className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
								index > 1 && "hidden md:block"
							}`}>
							<div className="text-sm font-semibold">{example.heading}</div>
							<div className="text-sm text-zinc-600">{example.subheading}</div>
						</div>
					))}
			</div>
		</div>
	)
}
