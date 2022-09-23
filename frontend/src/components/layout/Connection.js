import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import debounce from "lodash/debounce";
import axios from "../../api/axios";

export const Connections = ({ username }) => {
	// const [width, setWidth] = useState(0);
	const containerRef = useRef(null);

	const containsObject = (obj, list) => {
		return list.some(
			(e) =>
				Object.entries(e).toString() === Object.entries(obj).toString()
		);
	};

	const generateGraph = (data, endNodes) => {
		console.log(data);
		let svg = d3
			.select(containerRef.current)
			.append("svg")
			.attr("width", "100vw")
			.attr("height", "99.5vh")
			.append("g")
			.attr("transform", "translate(50,50)");

		let dataStructure = d3
			.stratify()
			.id((d) => d.child)
			.parentId((d) => d.parent)(data);

		let groupWidth = 1000 + endNodes * 110;
		let width = groupWidth;
		let treeStructure = d3.tree().size([groupWidth, 800]);
		let information = treeStructure(dataStructure);

		let connections = svg
			.append("g")
			.selectAll("path")
			.data(information.links());

		connections
			.enter()
			.append("path")
			.attr(
				"d",
				(d) =>
					"M" +
					d.source.x +
					"," +
					d.source.y +
					" C " +
					d.source.x +
					"," +
					(d.source.y + d.target.y) / 2 +
					" " +
					d.target.x +
					"," +
					(d.source.y + d.target.y) / 2 +
					" " +
					d.target.x +
					"," +
					d.target.y
			);

		let circles = svg
			.append("g")
			.selectAll("circle")
			.data(information.descendants());

		console.log(circles);
		circles
			.enter()
			.append("circle")
			.attr("cx", (d) => d.x)
			.attr("cy", (d) => d.y)
			.attr("r", 20)
			.on("click", () => {
				console.log("click event");
				return null;
			});

		let names = svg
			.append("g")
			.selectAll("text")
			.data(information.descendants());
		names
			.enter()
			.append("text")
			.text((d) => {
				let data = d.data.child;
				// if (data.includes("2018-")) {
				// 	data = data.replace("2018-", "");
				// } else if (data.includes("2019-")) {
				// 	data = data.replace("2019-", "");
				// }
				return data;
			})
			.attr("x", (d) => d.x + 25)
			.attr("y", (d) => d.y);
		let zoom = d3.zoom().on("zoom", handleZoom);
		function initZoom() {
			d3.select("svg").call(zoom);
		}

		function handleZoom(e) {
			d3.select("svg g").attr("transform", e.transform);
		}
		initZoom();
	};

	const update = () => {
		let data = [];
		let endNodes = 0;
		axios.get("/api/user-info/" + username).then((res) => {
			let institute = res.data.academic_info[0].institute;
			data.push({ child: institute, parent: "" });
			axios.get("/api/some-user-info/" + institute).then((res) => {
				res.data.forEach((userInfo) => {
					userInfo.academic_info.forEach((academic_info) => {
						let nodeData = {
							child: academic_info.program,
							parent: academic_info.institute,
						};
						if (!containsObject(nodeData, data)) {
							data.push(nodeData);
						}
						nodeData = {
							child:
								academic_info.program +
								"-" +
								academic_info.batch,
							parent: academic_info.program,
						};
						if (!containsObject(nodeData, data)) {
							data.push(nodeData);
						}
						nodeData = {
							child:
								academic_info.program +
								"-" +
								academic_info.batch +
								"-" +
								academic_info.section,
							parent:
								academic_info.program +
								"-" +
								academic_info.batch,
						};
						if (!containsObject(nodeData, data)) {
							data.push(nodeData);
						}
						nodeData = {
							child: userInfo.username,
							parent:
								academic_info.program +
								"-" +
								academic_info.batch +
								"-" +
								academic_info.section,
						};
						if (!containsObject(nodeData, data)) {
							data.push(nodeData);
							endNodes++;
						}
					});
				});
				generateGraph(data, endNodes);
			});
		});
	};

	useEffect();
	//     () => {
	//     function updateWidth() {
	//       setWidth(containerRef.current.clientWidth / (data.length + 1));
	//     }
	//     const handleResize = debounce(updateWidth, 500);
	//     updateWidth();
	//     window.addEventListener('resize', handleResize);
	//     return () => window.removeEventListener('resize', handleResize);
	//   }, [data.length]

	useLayoutEffect(
		() => {
			update();
		}
		//   , [data, width]
	);

	return (<div ref={containerRef}></div>);
};
