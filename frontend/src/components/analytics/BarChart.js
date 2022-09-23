import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const state = {
	labels: ["BSCS", "BBA", "LLB", "PharmD", "UTIS"],
	datasets: [
		{
			label: "Graduates from each field",
			backgroundColor: "rgba(75,192,192,1)",
			borderColor: "rgba(0,0,0,1)",
			borderWidth: 2,
			data: [65, 59, 80, 81, 56],
		},
	],
};

const BarChart = () => {
	return (
		<div>
			<h2>Graduates and Fields</h2>
			<Bar
				data={state}
				options={{
					title: {
						display: true,
						text: "Average Field Graduates",
						fontSize: 20,
					},
					legend: {
						display: true,
						position: "right",
					},
					responsive: true,
				}}
			/>
		</div>
	);
};
export default BarChart;
