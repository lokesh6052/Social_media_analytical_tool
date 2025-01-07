import axios from "axios"; // Ensure axios is imported

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function runLangflowFlow(message: string): Promise<any> {
	try {
		const response = await axios.post(
			"https://api.langflow.astra.datastax.com/lf/c4ce29ec-367a-4dbd-abc9-1974bd8a10f4/api/v1/run/006dcce4-55c6-4c1a-95df-a6b74a3d5cee?stream=false",
			{
				input_value: `${message}and please give me this response in JSON format`,
				output_type: "chat",
				input_type: "chat",
				tweaks: {
					"Agent-9ifXs": {},
					"ChatInput-WsnMG": {},
					"ChatOutput-0iBqy": {},
					"URL-TFLss": {},
					"AstraDBCQLToolComponent-mx9K3": {},
					"MistralModel-nUEDC": {},
					"AstraDBToolComponent-5UI6u": {},
				},
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.LANGFLOW_API_TOKEN}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		console.error(
			"Error communicating with Langflow API:",
			error.response?.data || error.message
		);
		throw new Error(error.response?.data || error.message);
	}
}
