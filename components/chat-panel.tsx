import * as React from "react"
import { ChatRequestOptions, CreateMessage } from "ai"
import { Message } from "ai/react"

import { ClientMessage } from "@/lib/chat/types"
import { ButtonScrollToBottom } from "@/components/buttons/scroll-to-bottom"
import { PromptForm } from "@/components/prompt-form"

import { ChatCards } from "./chat-cards"

export interface ChatPanelProps {
	input: string
	setInput: (value: string) => void
	isAtBottom: boolean
	scrollToBottom: () => void
	handleSubmit: () => void
	id: string
	messages: ClientMessage[] | Message[]
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions
	) => Promise<string | null | undefined>
}

export function ChatPanel({
	input,
	setInput,
	isAtBottom,
	scrollToBottom,
	id,
	handleSubmit,
	messages,
	append
}: ChatPanelProps) {
	return (
		<div className="relative inset-x-5 flex w-[calc(100vw_-_40px)] flex-col md:inset-x-0 md:w-[unset]">
			<ButtonScrollToBottom
				isAtBottom={isAtBottom}
				scrollToBottom={scrollToBottom}
			/>
			<div className="mx-auto w-full sm:max-w-2xl sm:px-4 sm:pb-6">
				<ChatCards id={id} messages={messages} append={append} />
				<PromptForm
					input={input}
					id={id}
					setInput={setInput}
					handleSubmit={handleSubmit}
					append={append}
				/>
			</div>
		</div>
	)
}
