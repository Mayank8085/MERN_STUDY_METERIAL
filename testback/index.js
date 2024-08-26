const express = require("express");

const app = express();
const port = 1000;
app.get("/", (req, res) => {
	return res.send("hello there..");
});
app.get("/login", (req, res) => {
	return res.send("you are visiting a login router...");
});
app.get("/signin", (req, res) => {
	return res.send("you are visiting a signin router...");
});
app.get("/signout", (req, res) => {
	return res.send("you are in signout");
});
app.get("/hitesh", (req, res) => {
	return res.send("hitesh instagram user");
});

app.listen(port, () => {
	console.log("server is up and running.....");
});

const admin = (req, res) => {
	return res.send("This is admin dashboard");
};
const isAdmin = (req, res, next) => {
	console.log("Is admin running");
	next();
};
const isLogIn = (req, res, next) => {
	console.log("Is admin log in");
	next();
};
app.get("/admin", isLogIn, isAdmin, admin);

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
