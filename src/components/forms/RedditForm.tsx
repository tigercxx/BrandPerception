import React, { useState, useRef } from 'react';

import { BACKEND_DOMAIN } from '../../config/env';
import { ResultsBody } from '../../types/types';

type Props = {
	state: ResultsBody | null;
	onStateChange: (results: ResultsBody) => void;
};

const RedditForm = (props: Props) => {
	const subredditRef = useRef<HTMLInputElement>(null);
	const contentInRedditRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasNoContent, setHasNoContent] = useState<boolean>(true);

	const redditOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		if (
			subredditRef.current?.value.length === 0 &&
			contentInRedditRef.current?.value.length === 0
		) {
			alert('Subreddit and content cannot be empty!');
			return;
		}
		setIsLoading(true);
		setHasNoContent(false);

		const body = {
			subreddit: subredditRef.current?.value,
			q: contentInRedditRef.current?.value,
		};

		const response = await fetch(BACKEND_DOMAIN + 'predict-reddit', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Failed to send');
		}
		const result = await response.json();
		setIsLoading(false);

		if (result?.predictions.length === 0) {
			setHasNoContent(true);
			return;
		}
		setHasNoContent(true);
		props.onStateChange(result);
	};

	return (
		<div>
			<label className="block mb-2 text-md md:text-xl font-medium text-[#d4a373] dark:text-[#d4a373]">
				Search in Reddit
			</label>
			<div className="grid grid-rows-3 gap-2">
				<div className="grid grid-cols-4 gap-4 content-center">
					<label
						htmlFor="subreddit"
						className="col-span-1 block mb-2 text-sm md:text-lg text-[#d4a373] dark:text-[#d4a373]"
					>
						Subreddit
					</label>
					<input
						id="subreddit"
						ref={subredditRef}
						name="subreddit"
						value="restaurant"
						autoFocus
						className="col-span-3 text-sm md:text-md px-2 rounded-md  text-[#d4a373] border border-[#d4a373] bg-[#fefae0] focus:ring-[#d4a373] focus:border-[#d4a373]"
					></input>
				</div>
				<div className="grid grid-cols-4 gap-4 content-center">
					<label
						htmlFor="contentInReddit"
						className="col-span-1 mb-2 text-sm md:text-lg text-[#d4a373] dark:text-[#d4a373]"
					>
						Content
					</label>
					<input
						id="contentInReddit"
						ref={contentInRedditRef}
						name="contentInReddit"
						className="col-span-3 px-2 text-sm md:text-md text-[#d4a373] border border-[#d4a373] rounded-md bg-[#fefae0] focus:ring-[#d4a373] focus:border-[#d4a373]"
					></input>
				</div>
				<div className="grid grid-cols-4 gap-4 content-center">
					{isLoading && (
						<p className="col-span-3 animate-bounce block mb-2 text-sm md:text-lg font-medium text-[#d4a373] dark:text-[#d4a373] m-2">
							Loading...
						</p>
					)}
					{!hasNoContent && !isLoading && (
						<p className="col-span-3 block mb-2 text-sm md:text-lg font-medium text-[#d4a373] dark:text-[#d4a373] m-2">
							Invalid subreddit
						</p>
					)}
					<button
						onClick={redditOnClick}
						className="col-span-1 col-end-5 bg-[#faedcd] py-2 rounded-md text-sm md:text-md text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd]"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default RedditForm;
