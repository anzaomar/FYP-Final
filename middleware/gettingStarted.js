const Validator = require("validator");
const isEmpty = require("is-empty");
const user_info = require("../models/user_info");
const bodyParser = require("body-parser");

module.exports = function validateGettingStartedInput(data) {
	let errors = {};
	data.email = !isEmpty(data.username) ? data.username : "";
	data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
	data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
	data.gender = !isEmpty(data.gender) ? data.gender : "";
	data.dob = !isEmpty(data.dob) ? data.dob : "";
	data.academic_info = !isEmpty(data.academic_info) ? data.academic_info : [];
	data.professional_info = !isEmpty(data.professional_info) ? data.professional_info : [];
	data.address = !isEmpty(data.address) ? data.address: {};
	data.profile_picture = !isEmpty(data.profile_picture) ? data.profile_picture: "";

	if (Validator.isEmpty(data.username)) {
		errors.username = "Username field is required";
	}
	// else if (!Validator.isEmail(data.email)) {
	// 	errors.email = "Email is invalid";
	// }

	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = "First name field is required";
	}

	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = "Last name field is required";
	}

	if (Validator.isEmpty(data.gender)) {
		errors.gender = "Gender field is required";
	}

	if (Validator.isEmpty(data.dob)) {
		errors.dob = "Date of Birth field is required";
	}

	// if (data.academic_info.length > 0) {
	// 	username = data.username;
	// 	let result = await user_info.findOne({ username });
	// 	if (
	// 		result.username == data.username &&
	// 		result.academic_info.length > 0
	// 	) {
	// 		errors.username ==
	// 			"Username is already registered with an Institute";
	// 	} else if (
	// 		result.username == data.username &&
	// 		result.academic_info.length == 0
	// 	) {
	// 		errors.username == "Username is already registered";
	// 	}
	// } else {
	// 	errors.academic_info = "Academic Information is required";
	// }

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
