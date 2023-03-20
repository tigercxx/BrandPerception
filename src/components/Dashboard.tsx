import React from 'react';
import { BarChart } from './charts/BarChart';
import { LineChart } from './charts/LineChart';

function Dashboard() {
	return (
		<div>
			<BarChart />
			<LineChart />
		</div>
	);
}

export default Dashboard;
