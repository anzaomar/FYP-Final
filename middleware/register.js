const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.username = !isEmpty(data.username) ? data.username : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (Validator.isEmpty(data.username)) {
		errors.username = "Userame field is required";
	} else if (!Validator.matches(data.username, "^[a-zA-Z0-9_\.\-]*$")) {
		errors.username = "Username not valid, Please remove any special Characters or spaces";
	}

	if (!Validator.isEmpty(data.username) && !Validator.isLength(data.username, { min: 6, max: 30 })) {
		errors.username = "Username must be at least 6 characters";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
	}

	if (!Validator.isEmpty(data.password) && !Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	if (!Validator.isEmpty(data.password2) && !Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
