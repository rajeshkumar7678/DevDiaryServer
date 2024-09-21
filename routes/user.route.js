const express = require("express");
const { register, login } = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.status(200).send("userRoute");
});

userRoute.post("/login", login);

userRoute.post("/register", register);
module.exports = { userRoute };
