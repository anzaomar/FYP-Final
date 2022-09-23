import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import debounce from "lodash/debounce";
import axios from "../../api/axios";
import NavMenu from "./NavMenu";
import ManagementMenu from "./ManagementMenu";
import { zoom } from "d3";
import { createContextMenu } from "./ContextMenu";
import Timeline from "../timeline/Timeline";
import instituteImage from "../../images/institute.png";
import programImage from "../../images/program.png";
import batchImage from "../../images/batch.png";
import classImage from "../../images/class.png";
import { useContext } from "react";
import UserContext from "../../UserContext";

export const Connections = () => {
	const nav = useNavigate();
	const { currentUserData } = useContext(UserContext);
	const [expand, setExpand] = useState(false);
	const [expandTimeline, setExpandTimeline] = useState(false);
	const [currentNode, setCurrentNode] = useState("");
	const [userTimeline, setUserTimeline] = useState("");
	const [profilePictures, setProfilePictures] = useState({
		// "omar.farooq":
		// 	"https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png",
		// "farhan.ali":
		// 	"https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png",
		instituteImage: instituteImage,
		programImage: programImage,
		batchImage: batchImage,
		classImage: classImage,
		default:
			"https://cdn0.iconfinder.com/data/icons/flat-round-system/512/android-128.png",
	});
	// const [svg, setSvg] = useState(null);
	const containerRef = useRef(null);
	let width = 1920;
	let height = 800;

	useEffect(() => {
		const getProfilePictures = async () => {
			try {
				let res = await axios.get("/api/all-user-info");
				res.data.forEach((userInfo) => {
					if (userInfo.profile_picture !== "") {
						setProfilePictures((prev) => ({
							...prev,
							[userInfo.username]: userInfo.profile_picture,
						}));
					}
				});
			} catch (err) {
				console.log(err);
			}
		};
		getProfilePictures();
	}, [currentUserData]);

	// let profilePictures = {
	// 	// "omar.farooq":
	// 	// 	"https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png",
	// 	// "farhan.ali":
	// 	// 	"https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png",
	// 	instituteImage: instituteImage,
	// 	programImage: programImage,
	// 	batchImage: batchImage,
	// 	classImage: classImage,
	// 	default:
	// 		"https://cdn0.iconfinder.com/data/icons/flat-round-system/512/android-128.png",
	// };

	const menuItems = [
		{
			title: "Timeline",
			action: async (d) => {
				console.log(d)
				nav('/timeline', {state: { username: d.id }})
				// TODO: add any action you want to perform
				// try {

				// 	// let res = await axios.get("/api/user-info/" + d.id);
				// 	// console.log(res.data);
				// 	// setUserTimeline(res.data);
				// 	// setExpandTimeline(true);
				// 	// console.log(d);
				// } catch (error) {
				// 	console.log(error);
				// }
			},
		},
		{
			title: "Message",
			action: async (d) => {
				let receiverId = "";
				try {
					let res = await axios.get("/api/user-info/" + d.id);
					receiverId = res.data._id;
				} catch (error) {
					console.log(error);
				}
				let response = {};
				try {
					let res = await axios.get(
						"/api/conversation/" + receiverId
					);
					response = res;
				} catch (error) {
					console.log(error);
					response = error;
				}
				console.log(response.data);
				if (response.status === 200 && response.data.length !== 0 && response.data.some((convo) => convo.members.includes(receiverId) && convo.members.includes(currentUserData._id))) {
					console.log(response.data);
					nav("/messaging");
				} else if (response.status === 200) {
					try {
						let body = {
							senderId: currentUserData._id,
							receiverId: receiverId,
						};
						console.log(body)
						let res = await axios.post("/api/conversation/", body);
						nav("/messaging");
						console.log(res);
					} catch (error) {
						console.log(error);
					}
					console.log("not found with 200 OK");
				} else {
					console.log("API not found ");
				}
			},
		},
	];

	const containsObject = (obj, list) => {
		return list.some(
			(e) =>
				Object.entries(e).toString() === Object.entries(obj).toString()
		);
	};
	function initZoom() {
		d3.select("svg").call(zoom);
	}
	const generateConnections = (data, endNodes) => {
		// console.log(data);
		// let data = [
		// 	{ child: "SZABIST", parent: "" },
		// 	{ child: "BSCS", parent: "SZABIST" },
		// 	{ child: "2018", parent: "BSCS" },
		// 	{ child: "2019", parent: "BSCS" },
		// 	{ child: "2018-A", parent: "2018" },
		// 	{ child: "2018-B", parent: "2018" },
		// 	{ child: "2019-A", parent: "2019" },
		// 	{ child: "2019-B", parent: "2019" },
		// 	{ child: "Omar", parent: "2018-A" },
		// 	{ child: "Rose", parent: "2018-A" },
		// 	{ child: "Ann", parent: "2018-A" },
		// 	{ child: "Sara", parent: "2018-B" },
		// 	{ child: "Mark", parent: "2018-B" },
		// 	{ child: "Angle", parent: "2018-B" },
		// 	{ child: "Omar", parent: "2019-A" },
		// 	{ child: "Rose", parent: "2019-A" },
		// 	{ child: "Ann", parent: "2019-A" },
		// 	{ child: "Sara", parent: "2019-B" },
		// 	{ child: "Mark", parent: "2019-B" },
		// 	{ child: "Angle", parent: "2019-B" },
		// ];

		let config = {
			avatar_size: 100, //define the size of teh circle radius
		};

		// setSvg(d3.select("g"));

		let svg = d3.select("g");
		// console.log(data);
		// setSvg(svg)
		// let defs = svg.append("svg:defs");

		// defs.append("svg:pattern")
		// 	.attr("id", "grump_avatar")
		// 	.attr("width", config.avatar_size)
		// 	.attr("height", config.avatar_size)
		// 	.attr("patternUnits", "userSpaceOnUse")
		// .append("svg:image")
		// .attr(
		// 	"xlink:href",
		// 	"https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png"
		// )
		// .attr("width", config.avatar_size)
		// .attr("height", config.avatar_size)
		// .attr("x", 0)
		// .attr("y", 0);

		let dataStructure = d3
			.stratify()
			.id((d) => d.child)
			.parentId((d) => d.parent)(data);

		let groupWidth = 1000 + endNodes * 150;
		width = groupWidth;
		let treeStructure = d3.tree().size([groupWidth, 1000]);
		let information = treeStructure(dataStructure);

		// console.log("information: " + information.descendants());

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

		let rects = svg
			.append("g")
			.selectAll("rect")
			.data(information.descendants());

		rects
			.enter()
			.append("rect")
			.attr("width", 120)
			.attr("height", 150)
			.attr("x", (d) => d.x - 60)
			.attr("y", (d) => d.y - 60)
			.attr("rx", "0.5%")
			.attr("ry", "1%")
			.style("stroke", "#26a69a")
			.style("stroke-width", 1);

		let images = svg
			.append("g")
			.selectAll("image")
			.data(information.descendants());

		images
			.enter()
			.append("svg:image")
			.attr("xlink:href", (d) => {
				if (d.depth === 0) {
					return profilePictures["instituteImage"];
				} else if (d.depth === 1) {
					return profilePictures["programImage"];
				} else if (d.depth === 2) {
					return profilePictures["batchImage"];
				} else if (d.depth === 3) {
					return profilePictures["classImage"];
				} else if (d.depth === 4) {
					if (profilePictures[d.data.child] !== undefined)
						return profilePictures[d.data.child];
					else return profilePictures["default"];
				}
			})
			.attr("width", config.avatar_size)
			.attr("height", config.avatar_size)
			.attr("x", (d) => d.x - 50)
			.attr("y", (d) => d.y - 50)
			.style("border-radius", "50%");

		let circles = svg
			.append("g")
			.selectAll("circle")
			.data(information.descendants());

		// console.log(circles);

		circles
			.enter()
			.append("circle")
			.attr("cx", (d) => d.x)
			.attr("cy", (d) => d.y)
			.attr("id", (d) => d.data.child)
			.attr("r", 50)
			.style("stroke-width", 1)
			.style("stroke", "#26a69a")
			.style("fill", "transparent")
			.attr("class", function (n) {
				if (n.children) {
					// console.log(n);
					return "inner-node";
				} else {
					// console.log("leaf");
					return "leaf-node";
				}
			})
			.on("contextmenu", (event, d) => {
				createContextMenu(
					event,
					d,
					menuItems,
					width,
					height,
					"#hierarchy"
				);
			})
			.on("click", (e, d) => {
				// console.log(e, d.data.child);
				setExpand(true);
				setCurrentNode(d.data.child);
				return null;
			});

		let names = svg
			.append("g")
			.selectAll("svg")
			.data(information.descendants());
		names
			.enter()
			.append("svg")
			.attr("x", (d) => d.x - 50)
			.attr("y", (d) => d.y + 50)
			.attr("width", "100")
			.attr("height", "20")
			.style("overflow", "hidden")
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
			.attr("x", (d) => 50)
			.attr("y", (d) => 15)
			.attr("dominant-baseline", "middle")
			.attr("text-anchor", "middle");

		initZoom();

		svg.exit().remove();
	};

	function handleZoom(e) {
		d3.select("svg g").attr("transform", e.transform);
	}
	let zoom = d3.zoom().on("zoom", handleZoom);

	function pane(x, y) {
		d3.select("svg").transition().call(zoom.translateBy, x, y);
	}

	function paneCenter() {
		d3.select("svg")
			.transition()
			.call(zoom.translateTo, 0.5 * width, 0.5 * height);
	}

	function zoomControl(z) {
		d3.select("svg").transition().call(zoom.scaleBy, z);
	}
	function zoomReset(z) {
		d3.select("svg").transition().call(zoom.scaleTo, z);
	}

	const update = async (username) => {
		let data = [];
		let endNodes = 0;

		let userInfo = await axios.get("/api/user-info/" + username);
		// console.log(userInfo);
		let institute = userInfo.data.academic_info[0]?.institute;
		data.push({ child: institute, parent: "" });
		let usersInfoByInstitute = await axios.get(
			"/api/some-user-info/" + institute
		);
		// console.log(usersInfoByInstitute);
		usersInfoByInstitute?.data?.forEach((userInfo) => {
			// setProfilePictures(prev => (
			// 	{
			// 		...prev,
			// 		[userInfo.username]: userInfo.profile_picture
			// 	}
			// ))
			userInfo?.academic_info?.forEach((academic_info) => {
				if (academic_info.institute === institute) {
					let nodeData = {
						child: academic_info.program,
						parent: academic_info.institute,
					};
					if (!containsObject(nodeData, data)) {
						data.push(nodeData);
					}
					nodeData = {
						child:
							academic_info.program + "-" + academic_info.batch,
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
							academic_info.program + "-" + academic_info.batch,
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
				}
			});
		});

		generateConnections(data, endNodes);
	};

	useLayoutEffect(() => {
		// if (svg != null) {
		// 	svg.selectAll("*").remove();
		// }
		update(currentUserData?.username);
		// paneCenter();
	});

	return (
		<div style={{ position: "relative" }}>
			<NavMenu
				pane={pane}
				paneCenter={paneCenter}
				zoomControl={zoomControl}
				zoomReset={zoomReset}
			></NavMenu>
			{expand && (
				<ManagementMenu
					currentNode={currentNode}
					setExpand={setExpand}
				></ManagementMenu>
			)}
			{/* {expandTimeline && userTimeline ? (
				<Timeline user={userTimeline} />
			) : (
				<></>
			)} */}
			<svg id="hierarchy" width="100%" height="99.5vh" ref={containerRef}>
				<g transform="translate(0,0)"></g>
			</svg>
		</div>
	);
};
