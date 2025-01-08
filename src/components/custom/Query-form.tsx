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
import { useState } from "react";
import axios from "axios";

const FormSchema = z.object({
	query: z.string().min(5, {
		message: "Description must be at least 5 characters long.",
	}),
});

export default function QueryForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			query: "",
		},
	});

	const [aiResponse, setAiResponse] = useState<{
		outputs?: {
			outputs?: {
				results?: {
					message?: {
						text?: string;
					};
				};
			}[];
		}[];
	} | null>(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);
		setAiResponse(null);
		try {
			const response = await axios.post(
				"/api/langflow",
				{ query: data.query },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const result = await response.data; // Assuming the response is in the expected format

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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
				<FormField
					control={form.control}
					name='query'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-4xl font-semibold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent uppercase'>
								Enter your Query
							</FormLabel>
							<FormControl>
								<Textarea
									className='h-52'
									placeholder='Write your query to find the desired analytical results...'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Please enter a query that matches the data stored in the
								database.
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
	);
}
