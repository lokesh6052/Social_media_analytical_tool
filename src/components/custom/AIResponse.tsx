/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Component as BarChart } from "./barChart";

type AIResponseProps = {
	data: any;
};

const AIResponse: React.FC<AIResponseProps> = ({ data }) => {
	let displayData;
	let metricsData: {
		post_type: string;
		avgLikes: number;
		avgComments: number;
		avgShares: number;
	}[] = [];
	let keyInsights: string[] = [];

	try {
		const parsedData = JSON.parse(
			data.outputs?.[0]?.outputs?.[0]?.results?.message?.text
		);
		displayData = JSON.stringify(parsedData, null, 2);

		metricsData = Object.entries(parsedData["metricsSummary"]).map(
			([post_type, metrics]) => ({
				post_type,
				avgLikes: (metrics as any)["avgLikes"],
				avgComments: (metrics as any)["avgComments"],
				avgShares: (metrics as any)["avgShares"],
			})
		);

		keyInsights = Object.keys(parsedData["keyInsights"]);
		// .filter(
		// 	(key, value) => parsedData["keyInsights"]?.[key]?. [value]
		// );
	} catch (error) {
		displayData = "Failed to parse response data.";
		console.error("Error parsing AI response:", error);
	}

	return (
		<Card className='max-w-5xl mt-10'>
			<CardHeader className='flex justify-between items-center'>
				<CardTitle className='text-3xl '>AI Response</CardTitle>
			</CardHeader>
			<CardContent className='flex items-center justify-center flex-col space-y-4 '>
				<BarChart chartData={metricsData} keyInsights={keyInsights} />
				{displayData}
			</CardContent>{" "}
			<CardFooter className='flex justify-between'>
				{" "}
				<div>Something...</div>{" "}
			</CardFooter>{" "}
		</Card>
	);
};

export default AIResponse;
