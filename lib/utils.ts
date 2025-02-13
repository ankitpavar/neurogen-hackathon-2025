import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	10
)

export const getApiHeaders = async () => {
	
	return {
		"Content-Type": "application/json",
		// Authorization: `Bearer ${session.tokenSet.accessToken}`
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keysToCamel = (value: any): any => {
	console.log("keysToCamel: ", value)
	if (Array.isArray(value)) {
		return value.map(keysToCamel)
	}
	if (
		typeof value !== "object" ||
		value === null ||
		value instanceof RegExp ||
		value instanceof Error ||
		value instanceof Date
	) {
		return value
	}
	const n = {}

	Object.entries(value).forEach(([key, value]) => {
		key = key.replace(/_([a-z])/g, g => g[1].toUpperCase())
		Object.assign(n, { [key]: keysToCamel(value) })
	})

	return n
}

export const parseJsonCamelCase = (json: string) => {
	const obj = JSON.parse(json)
	return keysToCamel(obj)
}
