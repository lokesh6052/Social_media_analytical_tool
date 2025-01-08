
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Component as BarChart } from "./barChart";
import { ChevronRight } from "lucide-react";

export type AIResponseProps = {
	data: {
		outputs?: {
			outputs?: {
				results?: {
					message?: {
						text?: string;
					};
				};
			}[];
		}[];
	};
};

type KeyInsights = {
	comparison: {
		[key: string]: string;
	};
	suggestion: {
		[key: string]: string;
	};
};

const AIResponse: React.FC<AIResponseProps> = ({ data }) => {
	let displayData;
	let metricsData: {
		post_type: string;
		avgLikes: number;
		avgComments: number;
		avgShares: number;
	}[] = [];
	let keyInsights: KeyInsights = {
		comparison: {},
		suggestion: {},
	};

	try {
		const messageText = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
		const parsedData = messageText ? JSON.parse(messageText) : {};

		type Metrics = {
			avgLikes: number;
			avgComments: number;
			avgShares: number;
		};

		metricsData = Object.entries(parsedData["metricsSummary"]).map(
			([post_type, metrics]) => ({
				post_type,
				avgLikes: (metrics as Metrics).avgLikes,
				avgComments: (metrics as Metrics).avgComments,
				avgShares: (metrics as Metrics).avgShares,
			})
		);

		keyInsights = parsedData["keyInsights"] as KeyInsights;

		displayData = (
			<div className='py-10 px-10 space-y-10'>
				<h2 className='text-3xl text-center font-semibold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent'>
					Metrics Summary
				</h2>
				<ul>
					{metricsData.map((metric) => (
						<li key={metric.post_type} className='mb-4'>
							<h3 className='text-lg font-semibold'>
								{metric.post_type.charAt(0).toUpperCase() +
									metric.post_type.slice(1)}
							</h3>
							<p className='flex'>
								<ChevronRight className='w-4 h-4 mt-1' />
								Average Likes: {metric.avgLikes}
							</p>
							<p className='flex'>
								<ChevronRight className='w-4 h-4 mt-1' />
								Average Comments: {metric.avgComments}
							</p>
							<p className='flex'>
								<ChevronRight className='w-4 h-4 mt-1' />
								Average Shares: {metric.avgShares}
							</p>
						</li>
					))}
				</ul>
				<h2 className='text-3xl font-semibold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent text-center'>
					Key Insights
				</h2>
				<div>
					<h3 className='text-xl font-semibold uppercase'>Comparisons:</h3>
					<ul>
						{keyInsights.comparison &&
						Object.keys(keyInsights.comparison).length > 0 ? (
							Object.entries(keyInsights.comparison).map(([key, insight]) => (
								<li key={key} className='mb-2'>
									• {insight}
								</li>
							))
						) : (
							<li>No comparison insights available.</li>
						)}
					</ul>
					<br />
					<h3 className='text-xl font-semibold uppercase'>Suggestion:</h3>
					<ul>
						{keyInsights.suggestion &&
						Object.keys(keyInsights.suggestion).length > 0 ? (
							Object.entries(keyInsights.suggestion).map(
								([key, suggestion]) => (
									<li key={key} className='mb-2'>
										• {suggestion}
									</li>
								)
							)
						) : (
							<li>No suggestions available.</li>
						)}
					</ul>
				</div>
			</div>
		);
	} catch (error) {
		displayData = "Failed to parse response data.";
		console.error("Error parsing AI response:", error);
	}

	return (
		<Card className='max-w-full mt-10 from-violet-900 to-pink-700 bg-gradient-to-r'>
			<CardHeader className='flex justify-between items-center'>
				<CardTitle className='text-3xl text-white font-bold'>
					AI Response
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col items-center justify-center  space-y-4 py-10'>
				<BarChart
					chartData={metricsData}
					keyInsights={Object.values(keyInsights.comparison)}
				/>
				<Card className='max-w-3xl ml-10'>{displayData}</Card>
			</CardContent>
		</Card>
	);
};

export default AIResponse;
