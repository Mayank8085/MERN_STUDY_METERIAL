var express = require("express");
var router = express.Router();
const { validationResult, check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { isLength } = require("lodash");

router.post(
	"/signup",
	[
		check("name", "Name should be at least 3 character").isLength({ min: 3 }),
		check("email", "Email is required").isEmail(),
		check("password", "Password should be at least 3 character").isLength({
			min: 3,
		}),
	],
	signup
);

router.post(
	"/signin", 
	[
		check("email", "Email is required").isEmail(),
		check("password", "Password feild is require").isLength({
			min: 3,
		}),
	],
	signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
	res.send("A protected route");
});

module.exports = router;
