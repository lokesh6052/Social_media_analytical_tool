/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { runLangflowFlow } from "@/utils/api";
export async function POST(request: NextRequest) {
	try {
		const { query } = await request.json();

		if (!query || query.trim().length < 5) {
			return NextResponse.json(
				{
					success: false,
					message: "Query must be at least 5 characters long.",
				},
				{ status: 400 }
			);
		}

		const aiResponse = await runLangflowFlow(query.trim());
		console.log(
			"your AI response: ",
			aiResponse.outputs?.[0]?.outputs?.[0]?.results?.message?.text
		);

		return NextResponse.json({ success: true, data: aiResponse });
	} catch (error: any) {
		console.error("Server-side Langflow API error:", error);
		return NextResponse.json(
			{ success: false, message: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
