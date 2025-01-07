/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

type AIResponseProps = {
	data: any;
};

const AIResponse: React.FC<AIResponseProps> = ({ data }) => {
	return (
		<div className='mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded'>
			<h2 className='text-lg font-bold text-gray-800 dark:text-gray-200'>
				AI Response:
			</h2>
			<pre className='whitespace-pre-wrap text-gray-700 dark:text-gray-300'>
				{JSON.stringify(
					data.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
						"No response received",
					null,
					2
				)}
			</pre>
		</div>
	);
};

export default AIResponse;
