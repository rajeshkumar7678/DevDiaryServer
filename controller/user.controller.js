const { hashSync } = require("bcrypt");
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    let { email, name, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    let hashPass = hashSync(password, 10);
    let newUser = new userModel({
      name,
      email,
      password: hashPass,
    });
    let result = await newUser.save();
    res.status(200).send({ message: "registration successfull" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    let comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).send("Invalid credentials");
    }
    let token = jwt.sign({ email: user.email, role: user.role }, "secretkey");
    res.status(200).send({ message: "login successfull", token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
