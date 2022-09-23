const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/user_login");
const userInfo = require("./routes/user_info");
const converationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const cors = require('cors');
const app = express();



app.use(cors({
	origin: '*'
}));

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch((err) => console.log(err));

app.use(passport.initialize()); // Passport config
require("./config/passport")(passport); // Routes
app.use("/api", users);
app.use("/api", userInfo);
app.use("/api/conversation", converationRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
