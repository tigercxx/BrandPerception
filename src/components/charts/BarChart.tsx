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
import { polaritiesAtom } from '../../atoms/atoms';
import { useAtom } from 'jotai';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: 'Polarities',
		},
		datalabels: {},
	},
};

export function BarChart() {
	const [polarities] = useAtom(polaritiesAtom);

	const data = {
		labels: ['Positive', 'Negative', 'Neutral'],
		datasets: [
			{
				label: 'Count',
				backgroundColor: [
					'rgba(0, 230, 118, 0.7)',
					'rgba(229, 57, 53, 0.7)',
					'rgba(30, 136, 229, 0.7)',
				],
				data: [polarities.positive, polarities.negative, polarities.neutral],
			},
		],
	};
	return (
		<Bar
			data={data}
			options={options}
		/>
	);
}
