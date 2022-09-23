const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../middleware/register");
const validateLoginInput = require("../middleware/login");
const user_login = require("../models/user_login");
const user_info = require("../models/user_info");

router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	user_login.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const response = {}; 
			const newUser = new user_login({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});
			const newUserRegistration = new user_info({
				username: req.body.username,
				first_name: "",
				last_name: "",
				email: req.body.email,
				gender: null,
				dob: null,
				phone_number: null,
				academic_info: [],
				professional_info: [],
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUserRegistration.save()
						.then(user => {
							console.log(user)
						})
					newUser
						.save()
						.then((user) => response.user_login = user)
						.catch((err) => console.log(err));
				});
			});

			// const newUserInfo = new user_info({
			// 	username: req.body.username,
			// 	first_name: req.body.first_name,
			// 	last_name: req.body.last_name,
			// 	gender: req.body.gender,
			// 	dob: req.body.dob,
			// 	phone_number: req.body.phone_number,
			// 	academic_info: req.body.academic_info,
			// 	professional_info: req.body.professional_info,
			// });
			// newUserInfo
			// 	.save()
			// 	.then((user_info) => response.user_info = user_info)
			// 	.catch((err) => console.log(err));

			return res.json(response)
		}
	});
});

router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	console.log(req.body)
	const email = req.body.email;
	const password = req.body.password;

	user_login.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ emailNotFound: "Email not found" });
		}
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user.id,
					username: user.username,
				};
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 100000000,
					},
					(err, token) => {
						res.json({
							success: true,
							_id: user?._id,
							username: user?.username,
							token: "Bearer " + token,
							username: user.username
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});

router.get("/login-info", (req, res) => {
	user_login
		.find()
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

module.exports = router;
