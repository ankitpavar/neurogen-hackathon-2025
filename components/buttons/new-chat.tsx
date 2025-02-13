import Link from "next/link"
import { PlusIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

export function NewChatButton() {
	return (
		<div className="mb-2 px-2">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "outline" }),
					"h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10"
				)}>
				<PlusIcon className="-translate-x-2 stroke-2" />
				New Chat
			</Link>
		</div>
	)
}
