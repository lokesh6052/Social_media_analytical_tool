"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Remove direct import of runLangflowFlow
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import AIResponse from "@/components/custom/AIResponse";
import type { AIResponseProps } from "@/components/custom/AIResponse";
import { useState } from "react";
import axios from "axios";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import LoadData from "@/components/custom/LoadData";
import Footer from "@/components/custom/Footer";
import { Github } from "lucide-react";
import Link from "next/link";

const FormSchema = z.object({
	selectQuery: z.string({
		required_error: "Please select a Query to Display the Analytics!",
	}),

	query: z.string().optional(),
});

export default function QueryForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			query: "",
		},
	});

	const [aiResponse, setAiResponse] = useState<AIResponseProps["data"] | null>(
		null
	);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);
		setAiResponse(null);
		try {
			const response = await axios.post("/api/langflow", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(response.status);

			const result = await response.data;

			console.log(result);

			if (result.success) {
				setAiResponse(result.data);
				toast({
					title: "AI Response Received",
					description: "Your query has been processed.",
				});
			} else {
				toast({
					title: "Error",
					description:
						result.message || "Failed to communicate with Langflow AI.",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to communicate with Langflow AI.",
			});
			console.error("AI Communication Error:", error);
		} finally {
			setLoading(false);
			form.reset();
		}
	}

	return (
		<>
			<div className='flex items-end justify-end py-4 px-4'>
				<Button asChild>
					<Link
						href={
							"https://github.com/lokesh6052/Social_media_analytical_tool.git"
						}>
						GitHub Repo <Github className='w-4 h-4' />
					</Link>
				</Button>
			</div>
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<div className='mb-10'>
					<h1 className='text-5xl font-bold text-center text-gradient bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent uppercase mb-7'>
						AI Analytics
					</h1>
					<div className='flex flex-col justify-center items-center'>
						<LoadData /> {/* Add the LoadData component */}
						<p className='text-sm mt-2 text-green-700'>
							Note: Before start Analytics, please load the Data in the
							Database!
						</p>
					</div>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-2/3 space-y-6'>
						<FormField
							control={form.control}
							name='selectQuery'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-3xl font-semibold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent uppercase'>
										Select Query for Analytics *
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a Query' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='Compare the posts types'>
												Compare Reels, Carousel, Static Posts
											</SelectItem>
											<SelectItem value='Compare the posts based on the time of upload, like which post is getting more reach in less time and also provide me the best suggestion to boost the reach'>
												Compare with Uploading Date
											</SelectItem>
											<SelectItem value='Compare the posts types and also provide me the best suggestion to boost the reach'>
												Suggestions to Boost the Posts
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Note: Selection of query is mandatory to display the
										analytical
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='query'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-3xl font-semibold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent uppercase'>
										Enter your Query
									</FormLabel>
									<FormControl>
										<Textarea
											className='h-12'
											placeholder='Write your query to find the desired analytical results...'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Note: Please enter a query that matches the data stored in
										the database.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='py-4 px-6 font-medium text-xl flex items-center justify-center'
							disabled={loading}>
							{loading ? (
								<svg
									className='animate-spin h-6 w-6 mr-3 text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8v8H4z'></path>
								</svg>
							) : null}
							{loading ? "Sending..." : "Submit"}
						</Button>
					</form>
					{aiResponse && <AIResponse data={aiResponse} />}{" "}
					{/* Render AIResponse component */}
				</Form>
			</div>
			<Footer />
		</>
	);
}
