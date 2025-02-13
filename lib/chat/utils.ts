import { openai } from "@ai-sdk/openai"
import { Langfuse, LangfuseTraceClient } from "langfuse"
import pRetry from "p-retry"

import { MODEL_ID } from "@/lib/config"
import { nanoid } from "@/lib/utils"

import { ClientMessage } from "./types"

export const sleep = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const getModel = () => openai(MODEL_ID)

interface ApplicationError extends Error {
	info: string
	status: number
}

export const handleUnauthorized = () => {
	window.location.href = "/auth/logout"
}

export const fetcher = async (url: string) => {
	const res = await fetch(url)

	if (!res.ok) {
		if (res.status === 401) {
			handleUnauthorized()
		}

		const error = new Error(
			"An error occurred while fetching the data."
		) as ApplicationError

		error.info = await res.json()
		error.status = res.status

		throw error
	}

	return res.json()
}

export const getPrompt = async (
	langfuse: Langfuse,
	trace: LangfuseTraceClient,
	promptName: string,
	spanName: string = "fetch-prompt",
	metadata?: any // eslint-disable-line
) => {
	const promptSpan = trace.span({
		name: spanName,
		input: {
			promptName,
			metadata
		}
	})

	const fetchPrompt = async () => {
		try {
			const prompt = await langfuse.getPrompt(promptName, undefined, {
				label: "latest"
			})
			return prompt
		} catch (error) {
			console.error(`Error fetching prompt ${promptName}:`, error)
			throw error
		}
	}

	try {
		const prompt = await pRetry(fetchPrompt, {
			retries: 3,
			onFailedAttempt: async (error: {
				attemptNumber: number
				retriesLeft: number
			}) => {
				console.log(
					`Attempt ${error.attemptNumber} failed for ${promptName}. ${error.retriesLeft} retries left.`
				)
				await sleep(1000 * error.attemptNumber)
			}
		})

		console.log("All retries completed, prompt fetched", { promptName })

		promptSpan.end({
			output: {
				prompt: prompt.prompt
			}
		})

		return prompt
	} catch (error) {
		console.error(`All retries failed for ${promptName}:`, error)

		promptSpan.end({
			level: "ERROR",
			output: {
				error: error instanceof Error ? error.message : String(error),
				retries: 2
			}
		})
		throw error
	}
}
export const transformMessages = (messages: ClientMessage[]) => {
	let lastTimestamp = 0
	return messages.map((msg: ClientMessage) => {
		const transformedMsg = { ...msg } as ClientMessage

		// Generate ID if missing
		if (!transformedMsg.id) {
			transformedMsg.id = nanoid()
		}

		// Generate createdAt if missing, ensuring it's greater than the last message's timestamp
		if (!transformedMsg.createdAt) {
			const currentTime = Date.now()
			const newTimestamp = Math.max(currentTime, lastTimestamp + 1)
			transformedMsg.createdAt = new Date(newTimestamp)
			lastTimestamp = newTimestamp
		} else {
			lastTimestamp = new Date(transformedMsg.createdAt).getTime()
		}

		// Process assistant messages with array content
		if (
			transformedMsg.role === "assistant" &&
			Array.isArray(transformedMsg.content)
		) {
			const textParts = transformedMsg.content
				.filter((item: { type: string }) => item.type === "text")
				.map((item: { text: string }) => item.text)
			transformedMsg.content = textParts.join("\n")
		}

		return transformedMsg
	})
}
