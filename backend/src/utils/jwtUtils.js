const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

dotenv.config();

const getTokenFromHeaders = (req) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.split(" ")[1];
  return null;
};

const verifyToken = (token) => {
  console.log({ token: token });
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return User.findById(decoded.id);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  getTokenFromHeaders,
  verifyToken,
  generateToken,
};
