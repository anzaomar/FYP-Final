const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	email: {
		type: String,
	},
	gender: {
		type: String,
	},
	dob: {
		type: Date,
	},
	address: {
		type: Object,
	},
	location: [
		{
			type: String,
		},
	],
	profile_picture:{
		type: String
	},
	phone_number: {
		type: String,
	},
	academic_info: [
		{
			type: Object,
		},
	],
	professional_info: [
		{
			type: Object,
		},
	],
});
module.exports = User = mongoose.model(
	"user_info",
	UserInfoSchema,
	//real collection name
	"user_info"
);
