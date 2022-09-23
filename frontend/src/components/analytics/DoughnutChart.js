import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "../../api/axios";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	ArcElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	ArcElement
);

const ALL_USER_INFO_URL = "/api/all-user-info";
const options = {responsive:true };

function DoughnutChart() {
	const [data, setData] = useState({
		labels: ["Employed", "Unemployed"],
		datasets: [
			{
				data: [],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	});

	async function getUsersInfo() {
		let unemployeed = 0;
		let users_info = await axios.get(ALL_USER_INFO_URL);
		let totalAlumni = users_info.data.length;
		users_info.data.map((user) => {
			return user.professional_info.map((job) => {
				if (job.end_date === "") {
					unemployeed++;
				}
				// return unemployeed;
				setData((prev) => {
					const dataset = prev.datasets[0];
					return {
						...prev,
						datasets: [
							{
								...dataset,
								data: [totalAlumni - unemployeed, unemployeed],
							},
						],
					};
				});
			});
		});
	}

	useEffect(() => {
		getUsersInfo();
	}, [data.datasets.data]);

	return (
		<div>
			<h2>Employment Ratio</h2>
			<Doughnut
				data={data}
				// width={width}
				// height={height}
				options={options}
			/>
		</div>
	);
}

export default DoughnutChart;
