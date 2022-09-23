const io = require("socket.io")(8000, {
	cors: {
		origin: "*",
	},
});

let users = [];

function addUser(userId, socketId) {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
}

function removeUser(socketId) {
	users = users.filter((user) => user.socketId !== socketId);
}

function getUser(userId) {
	return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
	console.log("A User Connected.");
	//take userid and socketid
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		console.log(users);
		io.emit("getUsers", users);
	});

	//send and get message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		console.log(user);
		io.to(user.socketId).emit("getMessage", {
			senderId,
			text,
		});
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
