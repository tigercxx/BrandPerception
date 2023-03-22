import { useAtom } from 'jotai';
import { useState } from 'react';
import { polaritiesAtom } from '../../atoms/atoms';
import { Results } from '../../types/types';
import RedditResults from '../charts/RedditResults';
import TextUploadForm from '../forms/TextUploadForm';

function TextFileTab() {
	const [results, setResults] = useState<Results | null>(null);
	const [, setPolarities] = useAtom(polaritiesAtom);

	const handleResultChange = (results: Results) => {
		setResults(results);
		setPolarities({
			count: results.count,
			positive: results.positive,
			negative: results.negative,
			neutral: results.neutral,
		});
		console.log('changed');
	};

	return (
		<div className="">
			<div className="md:w-1/2 mx-auto">
				<div className="block mb-5 text-[#d4a373] dark:text-[#d4a373]">
					<label className="block font-medium text-md">
						Choose a text file (disabled)
					</label>
					<label className="text-sm md:text-xl">
						Note: The text file has to be split by \r\n or \n where each line is a
						sentence.
					</label>
				</div>
				<TextUploadForm
					state={results}
					onStateChange={handleResultChange}
				/>
			</div>

			<div className="mt-10 w-full">
				<RedditResults state={results ? results : null} />
			</div>
		</div>
	);
}

export default TextFileTab;
