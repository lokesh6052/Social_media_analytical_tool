/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { runLangflowFlow } from "@/utils/api";
export async function POST(request: NextRequest) {
	try {
		const { query, selectQuery } = await request.json();

		if (!selectQuery || selectQuery.trim().length < 5) {
			return NextResponse.json(
				{
					success: false,
					message: "select Query must be at least 5 characters long.",
				},
				{ status: 400 }
			);
		}

		const aiResponse = await runLangflowFlow(
			query.trim() || selectQuery.trim()
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
