import { createContext, useEffect, useState } from "react";
import axios from "./api/axios";

const UserContext = createContext();

const USER_URL = '/api/user-info/'
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isAMember, setIsAMember] = useState(false);
	const [storage, setStorage] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUserData, setCurrentUserData] = useState(null)

	async function checkIfMember(username) {
		try {
			const res = await axios.get(
				"/api/is-member/" + username
			);
			if (res) {
				// console.log(res)
				const {_id, username, professional_info, location, academic_info} = res.data.result
				console.log("User ID, user_info wali: ", res.data.result._id)
				setCurrentUserData(prev => ({
					...prev,
					_id, 
					username, 
					professional_info, 
					location, 
					academic_info
				}))

				if(academic_info.length > 0 
					// && professional_info.length > 0
					){
					setIsAMember(res.data.isAMember);
				}
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	useEffect(() => {
		const userValue = JSON.parse(localStorage.getItem("user"));
		if (userValue) {
			const { email, accessToken, username } = userValue;
			// console.log(username)
			setCurrentUserData({
				email,
				accessToken,
			});
			setIsLoggedIn(true);
			checkIfMember(username);
		}
	}, [storage]);

	function setUserInfo(info) {
		localStorage.setItem("user", JSON.stringify(info));
		setStorage(info);
	}

	useEffect(() => {
		console.log("user: ", currentUserData);
	}, [currentUserData]);

	const resetAuth = () => {
		localStorage.clear();
		setCurrentUser({});
		setIsLoggedIn(false)
		setIsAMember(false)
	
	};

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				setUserInfo,
				isAMember,
				setIsAMember,
				isLoggedIn,
				resetAuth,
				currentUserData
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
