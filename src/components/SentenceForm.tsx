import React, { useState, useRef } from 'react';

import classes from '../App.module.css';

import { BACKEND_DOMAIN } from '../config/env';

const SentenceForm = () => {
	const sentenceRef = useRef<HTMLInputElement>(null);
	const [hasSearchedSentence, setHasSearchedSentence] = useState(false);
	const [sentenceResult, setSentenceResult] = useState({});
	const [sentenceLoading, setSentenceLoading] = useState(false);

	const sentenceOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {

		if (sentenceRef.current?.value.length === 0) {
			alert('Enter your sentence!');
			return;
		}
		setSentenceLoading(true);
		setSentenceResult({});
        
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
		setHasSearchedSentence(true);
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
		<div>
			<label
				htmlFor="sentence"
				className="block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373]"
			>
				Enter a sentence to test out our ABSA model
			</label>
			<div className="grid grid-rows-2">
				<div className="grid grid-cols-4 gap-4 row-span-1">
					<input
						id="sentence"
						ref={sentenceRef}
						name="sentence"
						className="col-span-3 block h-10 px-2 text-[#d4a373] border border-[#d4a373] rounded-md bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
					></input>
					<div className="col-span-1 w-full justify-center items-center">
						<button
							onClick={sentenceOnClick}
							className="bg-[#faedcd] w-full py-2 rounded-md text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd]"
						>
							Submit
						</button>
					</div>
				</div>
				<div className="row-span-1">
					{sentenceLoading && (
						<p className="animate-bounce block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373] m-5">
							Loading...
						</p>
					)}
					{!sentenceLoading && hasSearchedSentence && (
						<p className={classes.test}>{sentenceResultRenderer(sentenceResult)}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SentenceForm;
