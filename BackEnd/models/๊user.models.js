const mongoose = require("mongoose");
const db = require("../configDB/db");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
});
userSchema.add({
  age: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
