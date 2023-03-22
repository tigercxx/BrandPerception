import { useState } from 'react';
import Dashboard from '../charts/Dashboard';
import RedditResults from '../charts/RedditResults';
import RedditForm from '../forms/RedditForm';

import { Polarities, RestaurantCategorySentiment, Results, ResultsBody } from '../../types/types';
import { polaritiesAtom, aspectCategoryPolaritiesAtom } from '../../atoms/atoms';
import { useAtom } from 'jotai';
import restaurantDictionary from '../../data/dictionary';

function RedditTab() {
	const [results, setResults] = useState<ResultsBody | null>(null);
	const [, setPolarities] = useAtom(polaritiesAtom);
	const [, setAspectCategoryPolarities] = useAtom(aspectCategoryPolaritiesAtom);

	const categoriseAspects = (result: Results) => {
		const posts = result.data;

		// Categorise the aspects into categories
		// Get the counts of polarity of each category

		let output = {} as RestaurantCategorySentiment;

		for (let i = 0; i < posts.length; i++) {
			Object.entries(posts[i].output)
				.filter(([key]) => key !== null)
				.forEach(([key, value]) => {
					const category: string = findCategory(key);
					if (!(category in output)) {
						output[category] = {
							count: 0,
							positive: 0,
							negative: 0,
							neutral: 0,
						} as Polarities;
					}
					output[category].count += 1;

					if (value === 'POS') output[category].positive += 1;
					else if (value === 'NEG') output[category].negative += 1;
					else output[category].neutral += 1;
				});
		}
		return output;
	};

	const findCategory = (aspect: string) => {
		for (let [category, definedAspects] of Object.entries(restaurantDictionary)) {
			if (definedAspects.includes(aspect)) {
				return category;
			}
		}
		return 'others';
	};

	const handleResultChange = (results: ResultsBody) => {
		setResults(results);
		setPolarities({
			count: results.predictions.count,
			positive: results.predictions.positive,
			negative: results.predictions.negative,
			neutral: results.predictions.neutral,
		});
		let aspectCategoriesSentiment = categoriseAspects(results.predictions);
		setAspectCategoryPolarities(aspectCategoriesSentiment);
		console.log('changed');
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
				<div className="col-span-1">
					<RedditForm
						state={results}
						onStateChange={handleResultChange}
					/>
				</div>
				<div className="col-span-2">
					<Dashboard />
				</div>
			</div>
			<div>
				<RedditResults state={results ? results.predictions : null} />
			</div>
		</div>
	);
}

export default RedditTab;
