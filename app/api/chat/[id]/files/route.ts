
import { FILES_API } from "@/lib/config"
import { api } from "@/lib/utils/api.util"

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id: chatId } = await params

	const formData = await req.formData()
	// Get file names and create new FormData with non-empty files
	const files = formData.getAll("files") as File[]
	const validFiles = files.filter((file: File) => Boolean(file.size))

	// Create new FormData with only valid files
	const filteredFormData = new FormData()
	validFiles.forEach(file => {
		filteredFormData.append("files", file)
	})

	const fileNames = validFiles.map((file: File) => file.name)
	const response = await api(
		`${FILES_API}${chatId}/`,
		{
			method: "POST",
			body: filteredFormData
		},
		true
	)

	if (!response.ok) {
		return new Response("Failed to upload files", { status: response.status })
	}

	return Response.json({
		success: true,
		files: fileNames
	})
}
