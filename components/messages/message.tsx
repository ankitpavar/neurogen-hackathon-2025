"use client"

import { cn } from "@/lib/utils"
import { UserIcon } from "@/components/ui/icons"
import { Brain as Bot } from "lucide-react"

import { Markdown } from "./markdown"
import { spinner } from "./spinner"

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
	return (
		<div className="group relative flex items-start">
			<div className="bg-background flex size-[25px] shrink-0 items-center justify-center rounded-md border shadow-xs select-none">
				<UserIcon />
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
				{children}
			</div>
		</div>
	)
}

export function BotMessage({
	content,
	className
}: {
	content: string
	className?: string
}) {
	return (
		<div className={cn("group relative flex items-start", className)}>
			<div className="bg-background text-primary-foreground flex size-[24px] shrink-0 items-center justify-center rounded-md border shadow-xs select-none">
			<Bot size={16} color='#4F39F6' />
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
				<Markdown>{content}</Markdown>
			</div>
		</div>
	)
}

export function BotCard({
	children,
	showAvatar = true
}: {
	children: React.ReactNode
	showAvatar?: boolean
}) {
	return (
		<div className="group relative flex items-start">
			<div
				className={cn(
					"bg-background text-primary-foreground flex size-[24px] shrink-0 items-center justify-center rounded-md border shadow-xs select-none",
					!showAvatar && "invisible"
				)}>
				<Bot size={16} color='#4F39F6' />
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
				{children}
			</div>
		</div>
	)
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={
				"mt-2 flex items-center justify-center gap-2 text-xs text-gray-500"
			}>
			<div className={"max-w-[600px] flex-initial p-2"}>{children}</div>
		</div>
	)
}

export function SpinnerMessage({ content }: { content?: string }) {
	return (
		<div className="group relative mt-2 flex items-start">
			<div className="bg-background text-primary-foreground flex size-[24px] shrink-0 items-center justify-center rounded-md border shadow-xs select-none">
			<Bot size={16} color='#4F39F6' />
			</div>
			<div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
				{spinner}
				{content && (
					<p className="ml-4 gap-2 text-xs text-gray-500">{content}</p>
				)}
			</div>
		</div>
	)
}
