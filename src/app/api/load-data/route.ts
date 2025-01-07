import getAstraDBConnection from "@/lib/dbConnect";
import fs from "fs";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
	const db = await getAstraDBConnection();
	// console.log(db);
	const collections = await db?.collection("devorbit");
	console.log(collections);

	//Json Data to be inserted

	const filePath = path.join(
		process.cwd(),
		"src",
		"app",
		"social_media_posts_data.json"
	);
	const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

	const insertData = await collections?.insertMany(data);
	console.log(insertData);

	return Response.json({
		success: true,
		message: "Data successfully inserted in the Database! 👍",
	});
}
