import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { aspectCategoryPolaritiesAtom } from '../../atoms/atoms';
import { useAtom } from 'jotai';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function GroupedBarChart() {
	const [aspectCategory] = useAtom(aspectCategoryPolaritiesAtom);

	const options = {
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			title: {
				display: true,
				text: 'Aspect Categories',
			},
		},
		responsive: true,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};

	let dataPositive = [];
	let dataNegative = [];
	let dataNeutral = [];
	for (const [, polarities] of Object.entries(aspectCategory)) {
		dataPositive.push(polarities.positive);
		dataNegative.push(polarities.negative);
		dataNeutral.push(polarities.neutral);
	}

	const data = {
		labels: Object.keys(aspectCategory),
		datasets: [
			{
				label: 'Positive',
				backgroundColor: 'rgba(0, 230, 118, 0.7)',
				data: dataPositive,
				stack: 'Stack 0',
			},
			{
				label: 'Negative',
				backgroundColor: 'rgba(229, 57, 53, 0.7)',
				data: dataNegative,
				stack: 'Stack 1',
			},
			{
				label: 'Neutral',
				backgroundColor: 'rgba(30, 136, 229, 0.7)',
				data: dataNeutral,
				stack: 'Stack 2',
			},
		],
	};

	return (
		<Bar
			options={options}
			data={data}
		/>
	);
}
