const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: Array, default: [] },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
