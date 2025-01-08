import axios from "axios"; // Ensure axios is imported

export async function runLangflowFlow(message: string): Promise<string> {
	try {
		const response = await axios.post(
			"https://api.langflow.astra.datastax.com/lf/c9592b60-963a-48be-99f5-dc1dbd0a922c/api/v1/run/f786c775-0db3-4094-8916-63438f222dba?stream=false",
			{
				input_value: `${message}, please give me this response in JSON format and please don't provide any other text. and please give me the other suggestion in their seprate key value pairs. and also please gave this : avgLikes, avgComments, avgShares and their key insights and please take the comparision seprately and suggestion seprately`,
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
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error(
				"Error communicating with Langflow API:",
				error.response?.data || error.message
			);
			throw new Error(error.response?.data || error.message);
		} else {
			console.error("Unexpected error:", error);
			throw new Error("Unexpected error occurred");
		}
	}
}
