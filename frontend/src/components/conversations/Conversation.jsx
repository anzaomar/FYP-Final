import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "../../api/axios";
import noAvatar from "../../images/NoAvatar.png"

export default function Conversation({conversation, currentUser}) {
	const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

	useEffect(() => {
    // console.log(conversation)
		const friendId = conversation.members.find((m) => m !== currentUser._id);
    // console.log(friendId)
		const getUser = async () => {
			try {
				const res = await axios("/api/user-info-by-id/" + friendId);
				// console.log(res?.data);
        setUser(res?.data)
			} catch (err) {
				console.log(err);
			}
		};
    getUser()

	},[currentUser, conversation]);

	return (
		<div className="conversation">
			<img
				className="conversationImg"
				src={user?.profilePicture ? user?.profilePicture: noAvatar}
				alt=""
			/>
			<span className="conversationName">{user?.username}</span>
		</div>
	);
}
