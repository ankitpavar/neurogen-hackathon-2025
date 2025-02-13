"use client"

import { ReactNode, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { ChatRequestOptions, CreateMessage, Message } from "ai"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function FileUploadInput(id: number) {
	return (
		<div
			key={`file-${id}`}
			className="grid w-full max-w-md items-center gap-1.5">
			<Label htmlFor={`file-${id}`}>Select file</Label>
			<Input id={`file-${id}`} name="files" type="file" />
		</div>
	)
}

interface PromptFormDrawerContentProps {
	id: string
	close: () => void
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions
	) => Promise<string | null | undefined>
}

export function PromptFormDrawerContent({
	id,
	close,
	append
}: PromptFormDrawerContentProps) {
	const router = useRouter()
	const formRef = useRef<HTMLFormElement>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [fileInputs, setFileInputs] = useState<
		{ id: number; display: ReactNode }[]
	>([{ id: 0, display: FileUploadInput(0) }])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const files = formData.getAll("files") as File[]
		if (!files.length) return

		if (files.some(file => !file.name)) {
			toast.error("Please select all files before uploading")
			return
		}

		setIsUploading(true)
		try {
			const response = await fetch(`/api/chat/${id}/files`, {
				method: "POST",
				body: formData
			})

			if (!response.ok) {
				console.log(response)
				throw new Error(`Upload failed: ${response.statusText}`)
			}

			const data = await response.json()
			const fileNames = data?.files
			// Reset the form and close the drawer
			setFileInputs([{ id: 0, display: FileUploadInput(0) }])
			formRef.current?.reset()
			close()
			setIsUploading(false)
			router.refresh()
			await append({
				role: "system",
				content: `[User has uploaded files: ${fileNames.toString()}]`
			})
		} catch (error) {
			setIsUploading(false)
			console.error("Upload error:", error)
			toast.error("Failed to upload files")
		}
	}
	return (
		<DrawerContent className="mb-16 md:mb-2">
			<form ref={formRef} onSubmit={handleSubmit}>
				<div className="mx-auto w-full max-w-xl">
					<DrawerHeader>
						<DrawerTitle>Add files to the session</DrawerTitle>
						<DrawerDescription>
							Upload files to the session to help the assistant understand your
							request better.
						</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="grid max-h-[408px] w-full items-center gap-1.5 space-y-2 overflow-y-auto">
							{fileInputs.map(v => v.display)}
						</div>
					</div>
					<DrawerFooter className="mb-2">
						<div className="max-w grid grid-flow-col grid-cols-4 gap-1.5">
							<Button
								variant="secondary"
								type="button"
								disabled={isUploading}
								onClick={() =>
									setFileInputs(current => [
										...current,
										{
											id: current.length,
											display: FileUploadInput(current.length)
										}
									])
								}>
								<PlusIcon className="mr-2" />
								More files
							</Button>
							<Button
								variant="secondary"
								type="button"
								disabled={fileInputs.length === 1 || isUploading}
								onClick={() => setFileInputs(current => current.slice(0, -1))}>
								<MinusIcon className="mr-2" />
								Less files
							</Button>
							<Button
								type="submit"
								className="col-span-2"
								disabled={isUploading}>
								{isUploading ? "Uploading..." : "Upload"}
							</Button>
						</div>
						<DrawerClose asChild>
							<Button variant="outline" type="reset" disabled={isUploading}>
								Cancel
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</form>
		</DrawerContent>
	)
}
