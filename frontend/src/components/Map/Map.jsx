import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import ImageIcon from "./ImageIcon";
import { useState } from "react";
import axios from "../../api/axios";
import { connectStorageEmulator } from "firebase/storage";

export const Map = () => {
	const [arrCoordinates,setArrCoordinates] = useState([])
	// const [profilePictures, setProfilePictures] = useState([])

	useEffect(()=>{
		const getUserInfo = async () =>{
			try {
				const res = await  axios.get("/api/all-user-info")
				res.data.forEach((user)=>{
					console.log(user)
						if(user.location.length === 2){
							console.log(user.location)
							setArrCoordinates((prev)=> [...prev, {location: user.location, profile_picture: user.profile_picture}])
							// setProfilePictures((prev) =>[...prev, user.profile_picture])
						}
						console.log(arrCoordinates)
						// console.log(profilePictures)
				})
				console.log(arrCoordinates)
			} catch (error) {
				console.log(error)	
			}
		}
		getUserInfo()
	},[])

	// var arrCoordinates = [
	// 	[61.505, -0.09],
	// 	[51.605, -0.09],
	// 	[71.705, -0.09],
	// 	[51.405, -0.09],
	// 	[11.305, -0.09],
	// ];

	const imageIcon = L.divIcon({
		className: "custom-icon",
		iconSize: "auto",
		iconAnchor: [50, 150],
		html: ReactDOMServer.renderToString(<ImageIcon />),
	});

	function MultipleMarkers() {
		return arrCoordinates.map((coordinata, index) => {
			return (
				<Marker
					key={index}
					position={coordinata.location}
					icon={imageIcon}
				></Marker>
			);
		});
	}

	return (
		<div className="App">
			<MapContainer
				center={[0, 0]}
				zoom={3}
				style={{ height: "100vh" }}
				minZoom={3}
				maxZoom={12}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MultipleMarkers />
			</MapContainer>
		</div>
	);
};

export default Map;
