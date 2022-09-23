import React from "react";
import "./chatOnline.css";

export default function ChatOnline() {
	return (
		<div className="chatOnline">
			<div className="chatOnlineFriend">
				<div className="chatOnlineImgContainer">
					<img
						src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
						alt=""
						className="chatOnlineImg"
					/>
					<div className="chatOnlineBadge"></div>
				</div>
				<span className="chatOnlineName">Tajwar</span>
			</div>
		</div>
	);
}
