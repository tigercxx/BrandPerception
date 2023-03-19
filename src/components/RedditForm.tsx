import React, { useState, useRef } from 'react';

import { BACKEND_DOMAIN } from '../config/env';

const RedditForm = () => {
	const subredditRef = useRef<HTMLInputElement>(null);
	const contentInRedditRef = useRef<HTMLInputElement>(null);

	const redditOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		if (
			subredditRef.current?.value.length === 0 &&
			contentInRedditRef.current?.value.length === 0
		) {
			alert('Subreddit and content cannot be empty!');
			return;
		}

		const body = {
			subreddit: subredditRef.current?.value,
			q: contentInRedditRef.current?.value,
		};

		const response = await fetch(BACKEND_DOMAIN + 'predict_reddit', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Failed to send');
		}
		const result = await response.json();
		console.log(result);
		return result;
	};

	return (
		<div>
			<label className="block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373]">
				Search in Reddit
			</label>
			<div className="grid grid-rows-3 gap-2">
				<div className="grid grid-cols-4 gap-4">
					<label
						htmlFor="subreddit"
						className="col-span-1 block mb-2 text-l font-medium text-[#d4a373] dark:text-[#d4a373]"
					>
						Subreddit
					</label>
					<input
						id="subreddit"
						ref={subredditRef}
						name="subreddit"
						className="col-span-3 block h-10 px-2 text-[#d4a373] border border-[#d4a373] rounded-md bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
					></input>
				</div>
				<div className="grid grid-cols-4 gap-4">
					<label
						htmlFor="contentInReddit"
						className="col-span-1 block mb-2 text-l font-medium text-[#d4a373] dark:text-[#d4a373]"
					>
						Content
					</label>
					<input
						id="contentInReddit"
						ref={contentInRedditRef}
						name="contentInReddit"
						className="col-span-3 block h-10 px-2 text-[#d4a373] border border-[#d4a373] rounded-md bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
					></input>
				</div>
				<div className="grid grid-cols-4 gap-4">
					<button
						onClick={redditOnClick}
						className="col-span-1 col-end-5 bg-[#faedcd] py-2 rounded-md text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd]"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default RedditForm;
