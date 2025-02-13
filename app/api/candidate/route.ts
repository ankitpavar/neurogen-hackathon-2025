import { NextResponse } from "next/server"

const ENDPOINT =
	"https://candidate-historical-data-json.s3.us-east-1.amazonaws.com/candidate_activity_historical_data.json"

export async function GET(request: Request) {
	try {
		const response = await fetch(ENDPOINT, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (!response.ok) {
			throw new Error("Failed to fetch candidates")
		}

		const candidates = await response.json()

		return NextResponse.json({
			success: true,
			data: candidates
		})
	} catch (error) {
		console.error("Error fetching candidates:", error)
		return NextResponse.json(
			{ success: false, error: "Failed to fetch candidates" },
			{ status: 500 }
		)
	}
}
