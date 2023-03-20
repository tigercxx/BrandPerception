import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { polaritiesAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "Polarities",
        },
    },
};

export function BarChart() {
    const [polarities] = useAtom(polaritiesAtom);

    const data = {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
            {
                label: "Count",
                backgroundColor: "rgba(75,192,192,1)",
                data: [
                    polarities.positive,
                    polarities.negative,
                    polarities.neutral,
                ],
            },
        ],
    };
    return <Bar data={data} options={options} />;
}
