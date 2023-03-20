import React from "react";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

function Dashboard() {
    return (
        <div className="sm:grid grid-cols-2 gap-2">
            <div>
                <BarChart />
            </div>
            <div>
                <LineChart />
            </div>
        </div>
    );
}

export default Dashboard;
