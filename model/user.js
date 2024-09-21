const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Corrected spelling
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Restricting to "user" or "admin"
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
