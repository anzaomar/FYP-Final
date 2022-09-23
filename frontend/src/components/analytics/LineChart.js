import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale
);

const ALL_USER_INFO_URL = "/api/all-user-info";
const options = { responsive: true };

export default function LineChart(institute) {
	let [data, setData] = useState({
		labels: [],
		datasets: [
			{
				label: "Rainfall",
				fill: false,
				lineTension: 0.5,
				backgroundColor: "rgba(75,192,192,1)",
				borderColor: "rgba(0,0,0,1)",
				borderWidth: 2,
				data: [65, 59, 80, 81, 56],
			},
		],
	});

	async function getUsersInfo() {
		let users_info = await axios.get(ALL_USER_INFO_URL);
		let allLabels = [];
		let studentsPerYearByProgram = [];
		let programAndYear = [];
		let yearsP = [];
		let years = [];
		users_info.data.map((user) => {
			user.academic_info.map((edInstitute) => {
				//validatio not enabled
				// if (institute === edInstitute.institute){
				allLabels.push(edInstitute.batch);

				// }
				if (studentsPerYearByProgram.length === 0) {
					let studentsPerYear = {};
					studentsPerYear["" + edInstitute.batch + ""] = 1;
					let studentsByProgram = {};
					studentsByProgram["" + edInstitute.program + ""] =
						studentsPerYear;
					studentsPerYearByProgram.push(studentsByProgram);
					programAndYear.push(edInstitute.program);
					years.push(edInstitute.batch);
					yearsP.push({ program: edInstitute.program, years: years });
					// programAndYear.push(edInstitute.batch);
				} else {
					// console.log(programAndYear.includes(edInstitute.program))
					// console.log(edInstitute.program)
					// console.log(programAndYear);
					let newProgramYear = {};
					let newProgram = {};
					newProgramYear["" + edInstitute.batch + ""] = 1;
					newProgram["" + edInstitute.program + ""] = newProgramYear;
					studentsPerYearByProgram.forEach((program) => {
						let newProgramYear = {};
						let newProgram = {};
						newProgramYear["" + edInstitute.batch + ""] = 1;
						newProgram["" + edInstitute.program + ""] =
							newProgramYear;
						Object.keys(program).forEach((programKey) => {
							// console.log(programKey);
							if (
								programKey === edInstitute.program &&
								programAndYear.includes(edInstitute.program)
							) {
								// console.log(edInstitute.batch);
								Object.keys(program[programKey]).forEach(
									(year) => {
										let hasBatch = false;
										yearsP.map((info) => {
											if (
												info.program ===
													edInstitute.program &&
												info.years.includes(
													edInstitute.batch
												)
											) {
												hasBatch = true;
											}
										});
										// 	programAndYear.indexOf(
										// 		edInstitute.program
										// 	) <
										// 	programAndYear.indexOf(
										// 		edInstitute.batch
										// 	);
										// console.log(programAndYear);
										// console.log(
										// 	programAndYear.indexOf(
										// 		edInstitute.program
										// 	) +
										// 		" " +
										// 		programAndYear.indexOf(
										// 			edInstitute.batch
										// 		)
										// );
										// console.log(yearsP);

										if (
											year === edInstitute.batch &&
											hasBatch
										) {
											studentsPerYearByProgram[
												studentsPerYearByProgram.indexOf(
													program
												)
											][edInstitute.program][
												edInstitute.batch
											]++;

											// console.log(studentsPerYearByProgram[studentsPerYearByProgram.indexOf(program)][edInstitute.program])
										} else if (
											!studentsPerYearByProgram.includes(
												newProgram
											) &&
											!hasBatch
										) {
											// console.log(studentsPerYearByProgram[studentsPerYearByProgram.indexOf(program)][edInstitute.program])
											// console.log(program);
											studentsPerYearByProgram[
												studentsPerYearByProgram.indexOf(
													program
												)
											][edInstitute.program][
												edInstitute.batch
											] = 1;
											programAndYear.push(
												edInstitute.program
											);
											years.push(edInstitute.batch);
											yearsP.push({
												program: edInstitute.program,
												years: years,
											});
											// programAndYear.push(
											// 	edInstitute.program
											// );
											// programAndYear.push(
											// 	edInstitute.batch
											// );
										}
										// // // console.log(
										// // 	studentsPerYearByProgram[
										// // 		studentsPerYearByProgram.indexOf(
										// // 			program
										// // 		)
										// // 	][edInstitute.program]
										// );
									}
								);
							} else if (
								programKey !== edInstitute.program &&
								!programAndYear.includes(edInstitute.program)
							) {
								let studentsPerYear = {};
								studentsPerYear[
									"" + edInstitute.batch + ""
								] = 1;
								let studentsByProgram = {};
								studentsByProgram[
									"" + edInstitute.program + ""
								] = studentsPerYear;
								studentsPerYearByProgram.push(
									studentsByProgram
								);
								programAndYear.push(edInstitute.program);
								years.push(edInstitute.batch);
								yearsP.push({
									program: edInstitute.program,
									years: years,
								});
								// programAndYear.push(edInstitute.program);
								// programAndYear.push(edInstitute.batch);
							}
						});
					});
				}
			});

			return studentsPerYearByProgram;
		});
		let labels = [...new Set(allLabels)];
		labels.sort();

		let programs = [...new Set(programAndYear)];
		programs.sort();
		// console.log(programs)

		studentsPerYearByProgram.map((lineChart) => {
      Object.keys(lineChart).forEach(()=>{
        console.log(lineChart)
      })
    });
      
		setData({
			labels: labels,
			datasets: [
				{
					label: "Rainfall",
					fill: false,
					lineTension: 0.5,
					backgroundColor: "rgba(75,192,192,1)",
					borderColor: "rgba(0,0,0,1)",
					borderWidth: 2,
					data: [65, 59, 80, 81, 56],
				},
			],
		});
	}

	useEffect(() => {
		getUsersInfo();
	}, [data.datasets, data.labels]);

	return (
		<div>
			<h2>Employment Ratio</h2>
			<Line data={data} options={options} />
		</div>
	);
}
