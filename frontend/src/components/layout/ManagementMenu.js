import { color } from "d3";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import axios from "../../api/axios";
import {BiImageAdd} from 'react-icons/bi'
import { useFileUpload } from '../../hooks/useFileUpload'
import AcademicInfoSection from "../AcademicInfoSection";
import ProfessionalInfoSection from "../ProfessionalInfoSection";
import UserContext from "../../UserContext";

const ManagementMenu = ({currentNode, setExpand}) => {

	const { upload } = useFileUpload()
	const [edit, setEdit] = useState(false);
	const { isAMember, currentUserData, setIsAMember } = useContext(UserContext);
	const [isAllowed, setIsAllowed] = useState(false);
	const [showAcademicInfo, setShowAcademicInfo] = useState(false)
	const [showProfessionalInfo, setShowProfessionalInfo] = useState(false)
	const [academicInfo, setAcademicInfo] = useState([
        
    ]);
    const [currentData, setCurrentData] = useState(null)

	function handleChange(name, value) {
		name !== "" &&
			setCurrentData((prev) => ({
				...prev,
				[name]: value,
			}));
	}
	
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition);
		}
		function getPosition(position) {
			setCurrentData(prev => (
				{
					...prev,
					location: [position.coords.latitude, position.coords.longitude]
				}
			))
		}
	}

	function handleRemoveAcademicInfo(obj) {
		setCurrentData(prev => (
			{
				...prev,
				academic_info: [...prev.academic_info].filter(item => item != obj)
			}
		))
	}

	function handleRemoveProfessionalInfo(obj) {
		setCurrentData(prev => (
			{
				...prev,
				professional_info: [...prev.professional_info].filter(item => item != obj)
			}
		))
	}

		
	const profilePictureRef = useRef()

	const handleSetImage = (ref) => {
        ref.click()
    }

    const handleProfilePictureUpload = (file) => {
        upload(file, "images", "profile_picture", setCurrentData)
    }

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('/api/user-info/' + currentNode)
                console.log(res?.data)
                setCurrentData(res?.data)
                
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [currentNode])

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(currentData);
		try {
			console.log("User ID, on AcademicInfo: ", currentUserData?._id)
			const response = await axios.put("/api/user-info/" + currentUserData?._id,
				 
				JSON.stringify(currentData),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			
			console.log(response?.data)
			setIsAMember(true)
			
		} catch (error) {
			console.log(error)
		}

	}

	useEffect(() => {
		setCurrentData(prev => (
			{
				...prev,
				username: currentUserData?.username
			}
		))
	}, [currentUserData?.username]);
    

    useEffect(() => {
        console.log("CurrentData: ", currentData)
        // setAcademicInfo(currentData?.academic_info)
    }, [currentData])

	return (
		<div style={{position: "absolute", top: "20%", right: 20, transform: "translateY(-20%)", width: "400px", borderRadius: 20, overflow: "hidden"}}>
			<div className="hide-scroll" style={{overflow: "scroll", height: "65vh", overflowX: "hidden"}}>
				<div style={{ position: "relative"}} className="z-depth-2 card white">
						<div
							style={{
								width: "400px",
								borderTopLeftRadius: "20px",
								borderTopRightRadius: "20px",
							}}
						>
							<div
								class="card-title center-align teal lighten-1 white-text"
								style={{
									paddingTop: 10,
									paddingBottom: 10,
									position: "fixed",
									top: "-1px",
									width: "100%",
									zIndex: "999"
								}}
							>
								Manage Node
							</div>
							<button
								className="btn-floating btn-small waves-effect waves-light close"
								onClick={() => (setExpand(false))}
								style={{
									position: "fixed",
									top: 5,
									right: 15,
									zIndex: "999"
								}}
							>
								<i className="small material-icons teal lighten-1 white-text">
									close
								</i>
							</button>
						</div>
						<div className="p-3 mt-5">
							<Form onSubmit={(e) => handleSubmit(e)}>
								{
									currentData?._id === currentUserData?._id &&
									<div className="d-flex align-items-center justify-content-end">
										<button
											className="edit-btn"
											type="button"
											onClick={() => {
												setEdit((prev) => !prev);
											}}
											style={{
												border: "none",
												backgroundColor: "transparent",
											}}
										>
											Edit
										</button>
									</div>
								}
								<fieldset disabled={!edit}>
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
											<Image src={currentData?.profile_picture} width="101%" height="101%" alt="" style={{objectFit: "cover", objectPosition: "top"}} />
										</div>
										<Form.Label className='bold'>Profile Picture</Form.Label>
									</div> 
									<div className="mb-5">
										<div className="d-flex align-items-center gap-3 cursor-pointer" onClick={getLocation}>
											<Form.Label className="fw-bolder mt-2 cursor-pointer">Get My Location</Form.Label>
											<i className="material-icons">location_searching</i>
										</div>
										{
											currentData?.location?.length > 0 &&
											<div className="px-3 py-3 border border-2">
												<p>lat: {currentData?.location[0]}</p>
												<hr />
												<p>long: {currentData?.location[1]}</p>
											</div>
										}
									</div>
									<Form.Group>
										<Form.Control
											placeholder="First Name"
											type="text"
											className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
											name="first_name"
											value={currentData?.first_name}
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
											value={currentData?.last_name}
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
											value={currentData?.gender}
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
											value={currentData?.dob}
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
											value={currentData?.phone_number}
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
										currentData?.academic_info?.length > 0 &&
										currentData?.academic_info?.map((item, i) => {
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
										<AcademicInfoSection setFormValues={setCurrentData} showAcademicInfo={showAcademicInfo} setShowAcademicInfo={setShowAcademicInfo} />
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
										currentData?.professional_info?.length > 0 &&
										currentData?.professional_info?.map((item, i) => {
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
										<ProfessionalInfoSection setFormValues={setCurrentData} showProfessionalInfo={showProfessionalInfo} setShowProfessionalInfo={setShowProfessionalInfo} />
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
								</fieldset>
							</Form>
						</div>
				</div>
			</div>

		</div>
	);
};

export default ManagementMenu;
