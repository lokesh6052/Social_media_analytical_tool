import { DataAPIClient } from "@datastax/astra-db-ts";

let dbClient: DataAPIClient | null = null;

async function getAstraDBConnection() {
	try {
		if (dbClient) {
			console.log("AstraDB client already initialized.");
			return;
		} else if (!dbClient) {
			// Initialize the DataAPIClient with the token
			dbClient = new DataAPIClient(process.env.ASTRA_DB_TOKEN || "");

			return dbClient.db(process.env.ASTRA_DB_URL || "", {
				keyspace: process.env.ASTRA_DB_KEYSPACE || "default_keyspace",
			});
		}
	} catch (error) {
		console.error("Error initializing AstraDB client: ", error);
		process.exit(1);
	}
}
export default getAstraDBConnection;
