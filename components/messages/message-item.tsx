import { memo } from "react"
import { motion } from "motion/react"

import { ClientMessage } from "@/lib/chat/types"
import { Separator } from "@/components/ui/separator"
import {
	BotCard,
	BotMessage,
	SystemMessage,
	UserMessage
} from "@/components/messages/message"

interface MessageItemProps {
	message: ClientMessage
	id: string
	showSeparator?: boolean
}
const MESSAGE_ANIMATION = {
	initial: "hidden",
	animate: "visible",
	variants: {
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
		hidden: { opacity: 0, y: -10, transition: { duration: 0.5 } }
	}
}


const handleToolResult = (toolName: string, result: unknown) => {
	switch (toolName) {
		case "workflowDetails":
			return null

		case "startWorkflow":
			return <SystemMessage>{result as string}</SystemMessage>

		default:
			return <BotMessage content={JSON.stringify(result)} />
	}
}

export const MessageItem = memo(function MessageItem({
	message,
	id,
	showSeparator
}: MessageItemProps) {
	return (
		<motion.div key={`${id}-${message.id}`} {...MESSAGE_ANIMATION}>
			{message.role === "tool" && Array.isArray(message.content) && (
				<>
					{message.content.map(tool =>
						handleToolResult(tool.toolName, tool.result)
					)}
				</>
			)}

			{message.role === "user" && (
				<UserMessage>{message.content as string}</UserMessage>
			)}

			{message.role === "system" && (
				<SystemMessage>{message.content as string}</SystemMessage>
			)}

			{message.role === "assistant" && (
				<>
					{message.content && typeof message.content === "string" && (
						<BotMessage content={message.content} />
					)}
					{(message.toolInvocations ?? []).map((tool, idx) => (
						<div key={`${tool.toolName}-${idx}`}>
							{handleToolResult(
								tool.toolName,
								"result" in tool ? tool.result : 'Work is pending, no results yet.'
							)}
						</div>
					))}
				</>
			)}

			{showSeparator && <Separator className="my-4" />}
		</motion.div>
	)
})
