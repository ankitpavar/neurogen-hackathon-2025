"use client"

import { useRouter } from "next/navigation"
import { Message } from "ai"
import { useChat } from "ai/react"

import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatList } from "@/components/chat-list"
import { ChatPanel } from "@/components/chat-panel"
import { EmptyScreen } from "@/components/empty-screen"

export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[]
	id: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
	const router = useRouter()

	const { messages, input, setInput, handleSubmit, append, isLoading } =
		useChat({
			id,
			initialMessages,
			body: { id },
			api: "/api/chat",
			sendExtraMessageFields: true,
			onResponse: response => {
				if (!response.ok) {
					router.push("/")
				}
			},
			onError: (error) => {
				console.log(error, 'erorr');
				
			},
		})
console.log(messages, 'messages');

	const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
		useScrollAnchor()

	return (
		<div className="bg-zink-100 flex size-full flex-col pl-0">
			<ScrollArea
				className={cn("flex grow overflow-auto pt-16 pb-4", className)}
				data-scroll-lock="false"
				viewportRef={scrollRef}>
				<div ref={messagesRef}>
					{messages.length ? (
						<ChatList id={id} messages={messages} isLoading={isLoading} />
					) : (
						<EmptyScreen />
					)}
					<div className="h-px w-full" ref={visibilityRef} />
				</div>
			</ScrollArea>
			<ChatPanel
				id={id}
				input={input}
				setInput={setInput}
				handleSubmit={handleSubmit}
				isAtBottom={isAtBottom}
				scrollToBottom={scrollToBottom}
				append={append}
				messages={messages}
			/>
		</div>
	)
}
