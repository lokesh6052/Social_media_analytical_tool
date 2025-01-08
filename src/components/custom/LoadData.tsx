/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { toast } from "@/components/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

export default function LoadData() {
	const [loading, setLoading] = useState(false);

	async function handleLoadData() {
		setLoading(true);
		try {
			const response = await axios.post("/api/load-data");
			if (response.data.success) {
				toast({
					title: "Success",
					description: response.data.message,
				});
			} else {
				toast({
					title: "Error",
					description: response.data.message || "Failed to load data.",
				});
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.response?.data?.message || "An error occurred.",
			});
			console.error("Load Data Error:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Button
			onClick={handleLoadData}
			disabled={loading}
			className='px-5 py-6 text-2xl font-bold uppercase'>
			{loading ? "Loading..." : "Load Data"}
		</Button>
	);
}
