import React, { useEffect, useContext, useState, useRef } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import UserContext from "../UserContext";
import {BiImageAdd} from 'react-icons/bi'
import { useFileUpload } from '../hooks/useFileUpload'
import AcademicInfoSection from "./AcademicInfoSection";
import ProfessionalInfoSection from "./ProfessionalInfoSection";

const AcademicInfo = () => {

	const { upload } = useFileUpload()
	const nav = useNavigate();
	const { isAMember, currentUserData, setIsAMember } = useContext(UserContext);
	const [isAllowed, setIsAllowed] = useState(false);
	const [showAcademicInfo, setShowAcademicInfo] = useState(false)
	const [showProfessionalInfo, setShowProfessionalInfo] = useState(false)
	const [formValues, setFormValues] = useState({
		username: currentUserData?.username,
		first_name: "",
		last_name: "",
		gender: "",
		dob: "",
		phone_number: "",
		profile_picture: "",
		academic_info: [],
		professional_info: [],
	})
	
	const profilePictureRef = useRef()

	const handleSetImage = (ref) => {
        ref.click()
    }

    const handleProfilePictureUpload = (file) => {
        upload(file, "images", "profile_picture", setFormValues)
    }


	useEffect(() => {
		console.log(isAMember);
	}, [isAMember]);

	useEffect(() => {
		var timer;

		if (!isAMember) {
			setIsAllowed(true);
		} else {
			setIsAllowed(false);
			timer = setTimeout(() => {
				nav("/");
			}, 2000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isAMember]);

	function handleChange(name, value) {
		name !== "" &&
			setFormValues((prev) => ({
				...prev,
				[name]: value,
			}));
	}

	function handleRemoveAcademicInfo(obj) {
		setFormValues(prev => (
			{
				...prev,
				academic_info: [...prev.academic_info].filter(item => item != obj)
			}
		))
	}

	function handleRemoveProfessionalInfo(obj) {
		setFormValues(prev => (
			{
				...prev,
				professional_info: [...prev.professional_info].filter(item => item != obj)
			}
		))
	}

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition);
		}
		function getPosition(position) {
			setFormValues(prev => (
				{
					...prev,
					location: [position.coords.latitude, position.coords.longitude]
				}
			))
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(formValues)
		// This Function will be handled properly once
		// API is setup to insert academic info to a user document.

		// For now the flow is set as to where to navigate after the form is submitted.

		try {
			console.log("User ID, on AcademicInfo: ", currentUserData?._id)
			const response = await axios.put("/api/user-info/" + currentUserData?._id,
				 
				JSON.stringify(formValues),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			
			console.log(response?.data)
			setIsAMember(true)
			nav("/dashboard");
			
		} catch (error) {
			console.log(error)
		}

	}

	useEffect(() => {
		setFormValues(prev => (
			{
				...prev,
				username: currentUserData?.username
			}
		))
	}, [currentUserData?.username]);

	useEffect(() => {
		console.log(formValues);
	}, [formValues])

	return (
		isAllowed && (
			<Container>
				<Row className="align-items-center justify-content-center pt-5">
					<Col xs="12" md="6">
						<div className="text-center pt-4">
							{/* {
                            <h5>{successMsg != '' ? successMsg : errMsg != '' && errMsg}</h5>
                        } */}
							<h3>
								<span className="bold">Getting</span> Started
							</h3>
						</div>
						<Form
							className="py-4"
							onSubmit={(e) => handleSubmit(e)}
						>
							<div className='d-flex flex-column align-items-center'>
								{/* Profile Picture */}
								<div className='accounts--profile-picture'>
									<span className="hover-placeholder" onClick={() => (handleSetImage(profilePictureRef.current))}>
										<BiImageAdd size={25} color="grey" />
										<Form.Control 
											ref={profilePictureRef}
											className='d-none'
											type='file'
											accept='image/.png, image/.jpeg, image/.jpg' 
											onChange={
												(e) => (
													handleProfilePictureUpload(e.target.files[0])
												)}
										/>
									</span>
									<Image src={formValues?.profile_picture} width="101%" height="101%" alt="" style={{objectFit: "cover", objectPosition: "top"}} />
								</div>
								<Form.Label className='bold'>Profile Picture</Form.Label>
							</div> 
							<div className="mb-5">
								<div className="d-flex align-items-center gap-3 cursor-pointer" onClick={getLocation}>
									<Form.Label className="fw-bolder mt-2 cursor-pointer">Get My Location</Form.Label>
									<i className="material-icons">location_searching</i>
								</div>
								{
									formValues?.location?.length > 0 &&
									<div className="px-3 py-3 border border-2">
										<p>lat: {formValues?.location[0]}</p>
										<hr />
										<p>long: {formValues?.location[1]}</p>
									</div>
								}
							</div>
							<Form.Group>
								<Form.Control
									placeholder="First Name"
									type="text"
									className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
									name="first_name"
									value={formValues?.first_name}
									onChange={(e) =>
										handleChange(
											e.target.name,
											e.target.value
										)
									}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									placeholder="Last Name"
									type="text"
									className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
									name="last_name"
									value={formValues?.last_name}
									onChange={(e) =>
										handleChange(
											e.target.name,
											e.target.value
										)
									}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									placeholder="Gender"
									as="select"
									type="text"
									className="py-2 px-0 border-0 border-bottom border-2 rounded-0"
									name="gender"
									value={formValues?.gender}
									onChange={(e) =>
										handleChange(
											e.target.name,
											e.target.value
										)
									}
								>
									<option value="">Gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</Form.Control>
							</Form.Group>
							<Form.Group className="py-3 px-0">
								<Form.Label className="fw-bold">Date of Birth</Form.Label>
								<Form.Control
									placeholder="Date of Birth - YYYY-MM-DD"
									type="date"
									className="border-0 border-bottom border-2 rounded-0"
									name="dob"
									value={formValues?.dob}
									onChange={(e) =>
										handleChange(
											e.target.name,
											e.target.value
										)
									}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									placeholder="Phone Number"
									type="text"
									className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
									name="phone_number"
									value={formValues?.phone_number}
									onChange={(e) =>
										handleChange(
											e.target.name,
											e.target.value
										)
									}
								/>
							</Form.Group>
							{/* Academic Info Section */}
							<div className="d-flex align-items-center justify-content-between">
								<Form.Label className="mt-3 fw-bold">Academic Info</Form.Label>
								{
								!showAcademicInfo ?
								<Button type="button" onClick={setShowAcademicInfo} className="bg-transparent text-dark border-0 p-0 m-0">
									<i className="large material-icons teal lighten-2 white-text ms-auto cursor-pointer mt-2" style={{width: "20px"}}>
									add_circle_outline_icon
									</i>
								</Button>
								:
								<Button type="button" onClick={() => (setShowAcademicInfo(false))} className="bg-transparent text-dark border-0 p-0 m-0">
									<i className="large material-icons teal lighten-2 white-text ms-auto cursor-pointer mt-2" style={{width: "20px"}}>
									remove_circle_outline_icon
									</i>
								</Button>

								}
							</div>
							{
								formValues?.academic_info?.length > 0 &&
								formValues?.academic_info?.map((item, i) => {
									let arr = Object.entries(item);
									return <div className="px-3 py-2 border border-2 rounded mb-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h5 className="fw-bolder">Academic info {i+1}</h5>
										<div className="cursor-pointer" style={{width: "20px"}} onClick={() => (handleRemoveAcademicInfo(item))}>	
											<i className="material-icons large">delete</i>
										</div>
									</div>
									{
										arr.map(obj => (
											obj[1] ? <div className="d-flex align-items-center justify-content-between">
												<Form.Label className="fw-bold capitalize">{obj[0]}:</Form.Label>
												<span className="fw-400">{obj[1]}</span>
											</div>
											: 
											<></>
										))
									}
									</div>
								})
							}
							<div className="px-3">
								<AcademicInfoSection setFormValues={setFormValues} showAcademicInfo={showAcademicInfo} setShowAcademicInfo={setShowAcademicInfo} />
							</div>

							<div className="d-flex align-items-center justify-content-between">
								<Form.Label className="mt-3 fw-bold">Professional Info</Form.Label>
								{
								!showProfessionalInfo ?
								<Button type="button" onClick={setShowProfessionalInfo} className="bg-transparent text-dark border-0 p-0 m-0">
									<i className="large material-icons teal lighten-2 white-text ms-auto cursor-pointer mt-2" style={{width: "20px"}}>
									add_circle_outline_icon
									</i>
								</Button>
								:
								<Button type="button" onClick={() => (setShowProfessionalInfo(false))} className="bg-transparent text-dark border-0 p-0 m-0">
									<i className="large material-icons teal lighten-2 white-text ms-auto cursor-pointer mt-2" style={{width: "20px"}}>
									remove_circle_outline_icon
									</i>
								</Button>

								}
							</div>
							{
								formValues?.professional_info?.length > 0 &&
								formValues?.professional_info?.map((item, i) => {
									let arr = Object.entries(item);
									return <div className="px-3 py-2 border border-2 rounded mb-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h5 className="fw-bolder">Profesional info {i+1}</h5>
										<div className="cursor-pointer" style={{width: "20px"}} onClick={() => (handleRemoveProfessionalInfo(item))}>	
											<i className="material-icons large">delete</i>
										</div>
									</div>
									{
										arr.map(obj => (
											obj[1] ? <div className="d-flex align-items-center justify-content-between">
												<Form.Label className="fw-bold capitalize">{obj[0]}:</Form.Label>
												<span className="fw-400">{obj[1]}</span>
											</div>
											: 
											<></>
										))
									}
									</div>
								})
							}
							<div className="px-3">
								<ProfessionalInfoSection setFormValues={setFormValues} showProfessionalInfo={showProfessionalInfo} setShowProfessionalInfo={setShowProfessionalInfo} />
							</div>

							<Row className="justify-content-center mt-5">
								<Col xs="12" md="3">
									<Button
										className="custom-button green-button uppercase"
										type="submit"
									>
										Submit
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	);
};

export default AcademicInfo;
