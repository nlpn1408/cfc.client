const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    roles: { type: Array, default: ["user"] },
    primaryAddress: { type: Schema.Types.ObjectId, ref: "Address" },
    addresses: [addressSchema],
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
