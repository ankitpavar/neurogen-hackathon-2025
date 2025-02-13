import "server-only"

import pRetry from "p-retry"

interface ApplicationError extends Error {
	info: string
	status: number
}

export const api = async (
	input: string | URL | globalThis.Request,
	init?: RequestInit,
	notJsonContent?: boolean
) => {


	const fetchWithRetry = async () => {
		const response = await fetch(input, {
			...(init || {}),
			headers: {
				// Authorization: `Bearer ${session.tokenSet.accessToken}`,
				...(!notJsonContent
					? {
							"Content-Type": "application/json"
						}
					: {}),
				...(init?.headers || {})
			}
		})

		if (!response.ok) {
			const error = new Error(
				"An error occurred while fetching the data."
			) as ApplicationError

			error.info = await response.json()
			error.status = response.status

			throw error
		}

		return response
	}

	try {
		return await pRetry(fetchWithRetry, {
			retries: 3,
			onFailedAttempt: error => {
				console.log(
					`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left. Error: ${error}`
				)
			}
		})
	} catch (error) {
		console.error("All retries failed:", error)
		throw error
	}
}
