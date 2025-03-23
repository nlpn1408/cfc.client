const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: { type: String, },
    profileImage: String,
    bio:{type: String, maxlength: 200},
    profession:String,
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

})

// hashing password
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

const User = new model('User', userSchema);
module.exports = User;