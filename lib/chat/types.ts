import "server-only"

import { Message } from "ai"

export type ServerMessage = Message & {
	id: string
	createdAt: string
}

export type ClientMessage = Omit<Message, "role"> & {
	role: "user" | "assistant" | "system" | "tool"
}

export type AIState = {
	chatId: string
	messages: ServerMessage[]
}

export type UIState = ClientMessage[]

export type AIStateUpdater = (messages: ServerMessage[], done: boolean) => void
export type AIStateMessageGetter = () => Message[]
