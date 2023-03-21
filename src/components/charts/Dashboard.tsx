import { BarChart } from './BarChart';

function Dashboard() {
	return (
		<div className="sm:grid grid-cols-2 gap-2">
			<div>
				<BarChart />
			</div>
		</div>
	);
}

export default Dashboard;
