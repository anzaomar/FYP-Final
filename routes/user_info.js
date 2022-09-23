const validateGettingStartedInput = require("../middleware/gettingStarted");
const express = require("express");
const router = express.Router();
const user_info = require("../models/user_info");

router.get("/all-user-info", (req, res) => {
	user_info
		.find()
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.get("/user-info/:username", (req, res) => {
	// res.header("Access-Control-Allow-Origin", "*");
	username = req.params.username;
	user_info
		.findOne({ username })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.get("/user-info-by-id/:id", (req, res) => {
	// res.header("Access-Control-Allow-Origin", "*");
	_id = req.params.id;
	user_info
		.findOne({ _id })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.get("/is-member/:username", (req, res) => {
	// res.header("Access-Control-Allow-Origin", "*");
	username = req.params.username;
	user_info
		.findOne({ username })
		.then((result) => {
			if ("academic_info" in result && result.academic_info.length > 0) {
				res.status(200).send({ isAMember: true, result });
			} else {
				res.status(200).send({ isAMember: false, result });
			}
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.get("/some-user-info/:institute", (req, res) => {
	// res.header("Access-Control-Allow-Origin", "*");
	institute = req.params.institute;
	user_info
		.find({ academic_info: { $elemMatch: { institute: institute } } })
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.put("/user-info/:id", (req, res) => {
	const { errors, isValid } = validateGettingStartedInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	} else if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!",
		});
	}
	const id = req.params.id;
	console.log(id)
	user_info
		.findByIdAndUpdate(id, req.body, { new: true, upsert: true })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update User with id=${id}. Maybe User was not found!`,
				});
			} else
				res.send({
					message: `User ${req.body.username} was updated successfully.`,
				});
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating User with id=" + id,
			});
		});
	// const newInstituteRegistration = new user_info({
	// 	username: req.body.username,
	// 	first_name: req.body.first_name,
	// 	last_name: req.body.last_name,
	// 	gender: req.body.gender,
	// 	dob: req.body.dob,
	// 	phone_number: req.body.phone_number,
	// 	academic_info: req.body.academic_info,
	// 	professional_info: req.body.professional_info,
	// });
	// newInstituteRegistration
	// 	.save()
	// 	.then((user_info) => res.json(user_info))
	// 	.catch((err) => console.log(err));
});

module.exports = router;
