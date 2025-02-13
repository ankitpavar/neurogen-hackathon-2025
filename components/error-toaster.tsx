"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ErrorToasterProps {
	error: string
	redirect?: string
	position?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right"
		| "top-center"
		| "bottom-center"
}

export function ErrorToaster({
	error,
	redirect,
	position = "bottom-left"
}: ErrorToasterProps) {
	const router = useRouter()
	const toastShownRef = useRef(false)

	useEffect(() => {
		if (!toastShownRef.current) {
			toast.error(error, {
				position
			})
			toastShownRef.current = true

			if (redirect) {
				router.push(redirect)
			}
		}
	}, [error, redirect, position, router])

	return null
}
