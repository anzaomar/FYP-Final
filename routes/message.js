const router = require("express").Router();
const Message = require("../models/Message");

// add
router.post("/", async (req, res) => {
	console.log(req.body);
	const newMessage = new Message(req.body);
	console.log(newMessage);
	try {
		const savedMessage = await newMessage.save();
		res.status(200).json(savedMessage);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get
// Get Convo by user Id
router.get("/:conversationId", async (req, res) => {
	try {
		const allMessages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(allMessages);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
