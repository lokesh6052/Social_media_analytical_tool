"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type BarChartProps = {
	chartData: {
		post_type: string;
		avgLikes: number;
		avgComments: number;
		avgShares: number;
	}[];
	keyInsights: string[];
};

const chartConfig = {
	likes: {
		label: "Likes",
		color: "hsl(var(--chart-1))",
	},
	comments: {
		label: "Comments",
		color: "hsl(var(--chart-2))",
	},
	shares: {
		label: "Shares",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

export function Component({ chartData, keyInsights }: BarChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Average Engagement Analytics</CardTitle>
				<CardDescription>
					Showing the Average: Likes, Shares, and Comments
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='post_type'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 30)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dashed' />}
						/>
						<Bar dataKey='avgLikes' fill='var(--color-likes)' radius={4} />
						<Bar
							dataKey='avgComments'
							fill='var(--color-comments)'
							radius={4}
						/>
						<Bar dataKey='avgShares' fill='var(--color-shares)' radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				{keyInsights.map((insight, index) => (
					<div key={index} className='flex gap-2 font-medium leading-none'>
						• {insight} <TrendingUp className='h-4 w-4' />
					</div>
				))}
			</CardFooter>
		</Card>
	);
}
