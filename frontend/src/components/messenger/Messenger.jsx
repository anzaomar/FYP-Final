import React, { useContext, useEffect, useRef, useState } from "react";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import UserContext from "../../UserContext";
import axios from "../../api/axios";
import {io} from "socket.io-client"

export default function Messenger() {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	// const [socket, setSocket] = useState(null)
	const [arrivalMessage, setArrivalMessage] = useState(null)
	const socket = useRef()
	const scrollRef = useRef();
	const {currentUserData} = useContext(UserContext);
	const user = currentUserData;

	// console.log("messenger"+ JSON.stringify(user));

	useEffect(()=>{
		socket.current = io("ws://localhost:8000")
		socket.current.on("getMessage", data =>{
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now()
			})
		})
	},[])

	useEffect(()=>{
		arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev=>[...prev, arrivalMessage])
	}, [arrivalMessage, currentChat])

	useEffect(()=>{
		socket.current.emit("addUser", user._id)
		socket.current.on("getUsers",users=>{
			console.log(users)
		})
	},[user])

	// console.log(socket)

	// useEffect(()=>{
	// 	socket?.on("welcome", message=>{
	// 		console.log(message)
	// 	})
	// },[socket])

	useEffect(() => {
		const getConversation = async () => {
			try {
				const res = await axios.get("/api/conversation/" + user._id);
				// console.log(res.data);
				setConversations(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversation();
	}, [user._id]);

	// console.log(currentChat);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/api/message/" + currentChat?._id);
				// console.log(currentChat._id);
				// console.log(res?.data);
				setMessages(res?.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	// console.log(messages + ", " + currentChat);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user?._id,
			text: newMessage,
			conversationId: currentChat?._id,
		};

		const receiverId = currentChat.members.find(member=>member !== user._id)

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage
		})

		try {
			const res = await axios.post("/api/message", message);
			console.log(res.data);
			setMessages([...messages, res?.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(()=>{
		scrollRef.current?.scrollIntoView({behavior: "smooth"})
	},[messages])

	return (
		<div>
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							placeholder="Search for friends"
							className="chatMenuInput"
						/>
						{conversations.map((c) => {
							// console.log(c);
							return (
								<div onClick={() => setCurrentChat(c)}>
									<Conversation
										conversation={c}
										currentUser={user}
									/>
								</div>
							);
						})}
						{/* <Conversation /> */}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages.map((m) => (
										<div ref={scrollRef}>
											<Message
												message={m}
												own={m.sender === user._id}
											/>
										</div>
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										placeholder="Write Something"
										className="chatMessageInput"
										onChange={(e) =>
											setNewMessage(e.target.value)
										}
										value={newMessage}
									></textarea>
									<button
										className="chatSubmitButton"
										onClick={handleSubmit}
									>
										Send
									</button>
								</div>
							</>
						) : (
							<span className="noConversationText">
								Open a Conversation to start a chat
							</span>
						)}
					</div>
				</div>
				{/* <div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline />
					</div>
				</div> */}
			</div>
		</div>
	);
}
