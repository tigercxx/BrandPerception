import { BarChart } from './BarChart';
import { GroupedBarChart } from './GroupedBarChart';

function Dashboard() {
	return (
		<div className="sm:grid grid-cols-2 gap-2">
			<div>
				<BarChart />
			</div>
			<div>
				<GroupedBarChart />
			</div>
		</div>
	);
}

export default Dashboard;
