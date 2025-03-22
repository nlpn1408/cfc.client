const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getTotalUsers,
  getAllUsers,
} = require("../controllers/authController");

router.post("/register", (req, res, next) => {
  register(req, res, next);
});

router.post("/login", (req, res, next) => {
  login(req, res, next);
});
router.get("/total-users", (req, res) => {
  getTotalUsers(req, res);
});
// Route lấy danh sách tất cả người dùng
router.get("/all-users", (req, res) => {
  getAllUsers(req, res);
});
module.exports = router;
