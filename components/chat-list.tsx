import { memo, useMemo } from "react"
import { Message as AIMessage } from "ai"
import { motion } from "motion/react"

import { ClientMessage } from "@/lib/chat/types"
import { SpinnerMessage } from "@/components/messages/message"
import { MessageItem } from "@/components/messages/message-item"

interface ChatListProps {
	id: string
	messages: AIMessage[]
	isLoading?: boolean
}

const CONTAINER_ANIMATION = {
	initial: "hidden",
	animate: "visible",
	transition: { staggerChildren: 0.2 },
	variants: {
		visible: { transition: { staggerChildren: 0.2 } },
		hidden: { transition: { staggerChildren: 0.2 } }
	}
}

const transformMessages = (messages: AIMessage[]): ClientMessage[] => {
	return messages.map(msg => ({
		...msg,
		role: msg.role === "data" ? "tool" : msg.role
	})) as ClientMessage[]
}

export const ChatList = memo(function ChatList({
	id,
	messages,
	isLoading
}: ChatListProps) {
	const clientMessages = useMemo(() => transformMessages(messages), [messages])
	const lastMessage = clientMessages[clientMessages.length - 1]
	const isStreaming =
		lastMessage?.role === "assistant" && typeof lastMessage.content === "string"
	const shouldShowLoading = isLoading && !isStreaming

	const filteredMessages = useMemo(
		() =>
			clientMessages.filter(message => {
				if (message.role === "assistant") {
					const hasContent = Array.isArray(message.content)
						? message.content.some(item => "result" in item || "text" in item)
						: !!message.content
					return hasContent || message.toolInvocations?.length
				}
				if (message.role === "tool") {
					return Array.isArray(message.content)
						? message.content.some(item => item.toolName !== "workflowDetails")
						: !!message.content
				}
				return true
			}),
		[clientMessages]
	)

	if (!clientMessages.length) return null

	return (
		<motion.div
			className="relative mx-auto max-w-2xl px-4"
			{...CONTAINER_ANIMATION}>
			{filteredMessages.map((message, index) => {
				const isLastMessage = index === clientMessages.length - 1
				const showSeparator = !isLastMessage || shouldShowLoading

				return (
					<MessageItem
						key={`${id}-${message.id}`}
						message={message}
						id={id}
						showSeparator={showSeparator}
					/>
				)
			})}

			{shouldShowLoading && <SpinnerMessage />}
		</motion.div>
	)
})
