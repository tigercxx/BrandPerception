import { useState } from 'react';
import Dashboard from '../charts/Dashboard';
import RedditResults from '../charts/RedditResults';
import RedditForm from '../forms/RedditForm';

import { ResultsBody } from '../../types/types';
import { polaritiesAtom } from '../../atoms/atoms';
import { useAtom } from 'jotai';

function RedditTab() {
	const [results, setResults] = useState<ResultsBody | null>(null);
	const [, setPolarities] = useAtom(polaritiesAtom);

	const handleResultChange = (results: ResultsBody) => {
		setResults(results);
		setPolarities({
			count: results.predictions.count,
			positive: results.predictions.positive,
			negative: results.predictions.negative,
			neutral: results.predictions.neutral,
		});
		console.log('changed');
	};

	return (
		<div>
			<div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-10">
				<div className="col-span-2">
					<Dashboard />
				</div>
				<div className="col-span-1">
					<RedditForm
						state={results}
						onStateChange={handleResultChange}
					/>
				</div>
			</div>
			<RedditResults state={results ? results.predictions : null} />
		</div>
	);
}

export default RedditTab;
