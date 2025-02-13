export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export const CHAT_API = `${BACKEND_URL}/v1/chat/history/`
export const FILES_API = `${BACKEND_URL}/v1/files/`

export const MODEL_ID = process.env.MODEL_ID as string
