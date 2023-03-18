import React, { useState, useRef } from 'react';

import classes from '../App.module.css';

import { BACKEND_DOMAIN } from '../config/env';

const SentenceForm = () => {
	const sentenceRef = useRef<HTMLInputElement>(null);
	const [sentenceResult, setSentenceResult] = useState({});
	const [sentenceLoading, setSentenceLoading] = useState(false);

	const sentenceOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log(BACKEND_DOMAIN);
		if (sentenceRef.current?.value.length === 0) {
			alert('Enter your sentence!');
			return;
		}
		setSentenceLoading(true);
		setSentenceResult({});
		console.log(sentenceRef.current?.value);
		const body = { inputText: sentenceRef.current?.value };
		const response = await fetch(BACKEND_DOMAIN + 'predict', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw new Error('Failed to send');
		}
		const result = await response.json();
		setSentenceLoading(false);
		setSentenceResult(result.data[0].output);
		return result;
	};

	const sentenceResultRenderer = (result: { [key: string]: string }): string => {
		let output = '';
		if (Object.entries(result).length === 0) {
			return 'No aspects found!';
		}
		if (Object.entries(result).length === 1) {
			return `${Object.entries(result)[0][0]}: ${Object.entries(result)[0][1]}`;
		}
		for (const [key, value] of Object.entries(result)) {
			output = output.concat(`${key}: ${value}, `);
		}
		return output.slice(0, output.length - 2);
	};

	return (
		<>
			<label
				htmlFor="subreddit"
				className="block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373]"
			>
				Enter a sentence to test out our ABSA model
			</label>
			<div className="grid grid-rows-2">
				<div className="grid grid-cols-4 row-span-1">
					<input
						id="subreddit"
						ref={sentenceRef}
						name="subreddit"
						className="col-span-2 block w-full p-4 text-[#d4a373] border border-[#d4a373] rounded-lg bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
					></input>
					<div className="col-span-1 flex justify-center items-center">
						<button
							onClick={sentenceOnClick}
							className="bg-[#faedcd] h-1/2 w-1/3 rounded-lg text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd] min-w-fit	"
						>
							Submit
						</button>
					</div>
					<div className="col-span-1 "></div>
				</div>
				<div className="row-span-1">
					{sentenceLoading && (
						<p className="animate-bounce block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373] m-5">
							Loading...
						</p>
					)}
					{Object.keys(sentenceResult).length !== 0 && (
						<p className={Object.keys(sentenceResult).length !== 0 ? classes.test : ''}>
							{sentenceResultRenderer(sentenceResult)}
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default SentenceForm;
