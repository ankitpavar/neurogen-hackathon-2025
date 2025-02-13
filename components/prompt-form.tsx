"use client"

import * as React from "react"
import { ArrowRightIcon, PlusIcon } from "@radix-ui/react-icons"
import { ChatRequestOptions, CreateMessage, Message } from "ai"
import Textarea from "react-textarea-autosize"

import { useEnterSubmit } from "@/lib/hooks/use-enter-submit"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerTrigger } from "@/components/ui/drawer"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/components/ui/tooltip"
import { PromptFormDrawerContent } from "@/components/prompt-form-drawer-content"

interface FormElements extends HTMLFormControlsCollection {
	message: HTMLInputElement
}

interface PromptFormElement extends HTMLFormElement {
	// now we can override the elements type to be an HTMLFormControlsCollection
	// of our own design...
	readonly elements: FormElements
}

export function PromptForm({
	input,
	id,
	setInput,
	handleSubmit,
	append
}: {
	input: string
	id: string
	setInput: (value: string) => void
	handleSubmit: () => void
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions
	) => Promise<string | null | undefined>
}) {
	const { formRef, onKeyDown } = useEnterSubmit()
	const inputRef = React.useRef<HTMLTextAreaElement>(null)
	const [drawerOpen, setDrawerOpen] = React.useState(false)

	const onSubmit = async (e: React.FormEvent<PromptFormElement>) => {
		e.preventDefault()

		if (window.innerWidth < 600) {
			e.currentTarget.elements["message"].blur()
		}

		const value = input.trim()
		if (!value) return
		handleSubmit()

		setInput("")
	}

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	return (
		<div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-lg border px-8 sm:px-12">
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="bg-background absolute top-[16px] left-4 size-8 rounded-full p-0 sm:top-[14px]"
						onClick={() => setDrawerOpen(true)}>
						<PlusIcon />
						<span className="sr-only">Add files to the session</span>
					</Button>
				</DrawerTrigger>
				<PromptFormDrawerContent
					id={id}
					close={() => setDrawerOpen(false)}
					append={append}
				/>
			</Drawer>
			<form ref={formRef} onSubmit={onSubmit}>
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					placeholder="Send a message."
					className={cn(
						"[&::-webkit-scrollbar-track]:transparent max-h-[200px] min-h-[30px] w-[92%] resize-none overflow-y-auto",
						"bg-transparent px-8 py-[1.3rem] pr-14 focus-within:outline-hidden sm:min-h-[60px] sm:w-full sm:px-4 sm:pr-12",
						"[&::-webkit-scrollbar-thumb]:bg-secondary/50 sm:text-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full"
					)}
					autoFocus
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					name="message"
					rows={1}
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<div className="absolute top-[15px] right-4 sm:top-[13px]">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button type="submit" size="icon" disabled={input === ""}>
								<ArrowRightIcon />
								<span className="sr-only">Send message</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Send message</TooltipContent>
					</Tooltip>
				</div>
			</form>
		</div>
	)
}
