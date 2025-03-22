const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token không được truyền" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Token Authentication Error:", error.message);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = authenticateToken;
