import React, { useContext, useEffect, useState } from "react";
import { MdWork } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { IoIosSchool } from "react-icons/io";
import image from "./wokers.jpg";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import axios from "../../api/axios";
import UserContext from "../../UserContext";
import { useLocation, useNavigate } from "react-router-dom";

function Timeline({ user }) {

	const location = useLocation()
	const [id, setId] = useState(null)

	useEffect(() => {
		setId(location?.state?.username)
	}, [location])


	const { isLoggedIn, resetAuth, isAMember, currentUserData} = useContext(UserContext);
	const [username, setUsername] = useState(() => (
		id ?? user ?? null
	))
	const [data, setData] = useState(null)
	const [professionalInfos, setProfessionalInfos] = useState(null)
	const [academicInfos, setAcademicInfos] = useState(null)
	const [merged_array, setMerged_array] = useState(null)

	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get('/api/user-info/' + username)
				setData("Timeline Info: ", res?.data)
				setProfessionalInfos(res?.data?.professional_info)
				setAcademicInfos(res?.data?.academic_info)
				setMerged_array(res?.data?.professional_info.concat(res?.data?.academic_info))
				console.log(res)
			} catch (error) {
				console.log(error?.message)
			}
		}
		
		getData()
	}, [username])


	useEffect(() => {
		if(data){
			setMerged_array(() => {
				return merged_array?.sort(function compare(a, b) {
					var dateA = new Date(a.start_date);
					var dateB = new Date(b.end_date);
					return dateB - dateA;
				});
			})
		}

	}, [data])

	useEffect(() => {
		setUsername(id ?? user ?? currentUserData?.username)
	}, [currentUserData?.username, user, id])

	return (
		<VerticalTimeline>
			<div>
				<h1 className="timeline-heading">TimeLine View</h1>
			</div>
			{merged_array?.map((item, index) => {
				// console.log(index);
				var classNames = "";
				if (index % 2) {
					classNames = "row flex-row-reverse";
				} else {
					classNames = "row";
				}
				const differentiator = Object.keys(item)[0];
				// console.log(differentiator);
				const starting_year = item.start_date.substring(0, 4);
				var ending_year = item.end_date.substring(0, 4);
				if (ending_year) {
					ending_year = item.end_date.substring(0, 4);
				} else {
					ending_year = "Present";
				}

				if (differentiator == "company") {
					return (
						<VerticalTimelineElement
							key={index}
							className="vertical-timeline-element--professional "
							contentStyle={{
								background: "rgb(33, 150, 243)",
								color: "black",
							}}
							contentArrowStyle={{
								borderRight: "7px solid  rgb(33, 150, 243)",
							}}
							date={starting_year + " - " + ending_year}
							iconStyle={{
								background: "rgb(33, 150, 243)",
								color: "#fff",
							}}
							icon={<MdWork />}
						>
							<div className={classNames}>
								<div className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center partitions">
									<h4 className="vertical-timeline-element-subtitle">
										{item.company}
									</h4>
									<h3 className="vertical-timeline-element-title">
										{item.job_title}
									</h3>

									<p>
										{/* {item.start_date} - {item.end_date} */}
									</p>
								</div>

								<div className="col-12 col-md-6">
									<img
										width="100%"
										height="100%"
										className="timeline-content-image"
										src={image}
										alt=""
									/>
								</div>
							</div>
						</VerticalTimelineElement>
					);
				} else if (differentiator == "institute") {
					return (
						<VerticalTimelineElement
							key={index}
							className="vertical-timeline-element--academic"
							contentStyle={{
								background: "rgb(233, 30, 99)",
								color: "#fff",
							}}
							date={starting_year + " - " + ending_year}
							iconStyle={{
								background: "rgb(233, 30, 99)",
								color: "#fff",
							}}
							icon={<IoIosSchool />}
						>
							<div className={classNames}>
								<div className="col-12 col-md-6">
									<div className="d-flex flex-column justify-content-center text-start p-5">
										<h3 className="vertical-timeline-element-title">
											{item.institute}
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											Online Course
										</h4>
										<p>Strategy, Social Media</p>
									</div>
								</div>
								{/* <div className="col-12 col-md-6">
									<img
										width="100%"
										height="100%"
										className="timeline-content-image"
										src={image}
										alt=""
									/>
								</div> */}
							</div>
						</VerticalTimelineElement>
					);
				}
			})}

			{/* {academicInfos.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--academic"
          contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          date="April 2013"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<IoIosSchool />}
        >
          <h3 className="vertical-timeline-element-title">{item.institute}</h3>
          <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
          <p>Strategy, Social Media</p>
        </VerticalTimelineElement>
      ))} */}

			{/* <VerticalTimelineElement
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        icon={<AiFillStar />}
      /> */}
		</VerticalTimeline>
	);
}

export default Timeline;
