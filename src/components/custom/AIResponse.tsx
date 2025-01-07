/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
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

		metricsData = Object.entries(parsedData["Metrics Summary"]).map(
			([post_type, metrics]) => ({
				post_type,
				avgLikes: (metrics as any)["Avg. Likes"],
				avgComments: (metrics as any)["Avg. Comments"],
				avgShares: (metrics as any)["Avg. Shares"],
			})
		);

		keyInsights = Object.keys(parsedData["Key Insights"]).filter(
			(key) => parsedData["Key Insights"][key]
		);
	} catch (error) {
		displayData = "Failed to parse response data.";
		console.error("Error parsing AI response:", error);
	}

	return (
		<Card className='max-w-xl'>
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>Deploy your new project in one-click.</CardDescription>
			</CardHeader>
			<CardContent>
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
