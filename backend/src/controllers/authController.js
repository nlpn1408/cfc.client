const User = require("../models/User");
const response = require("../response/responseHandler");
const { generateToken } = require("../utils/jwtUtils");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username)
      return response.badRequest(res, "Tên đăng nhập không được để trống");
    if (username.length < 6 || username.length > 30)
      return response.badRequest(res, "Tên đăng nhập phải từ 6 đến 30 ký tự");
    if (!password)
      return response.badRequest(res, "Mật khẩu không được để trống");
    if (password.length < 6 || password.length > 30)
      return response.badRequest(res, "Mật khẩu phải từ 6 đến 30 ký tự");

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user)
      return response.notFound(res, "Tài khoản hoặc mật khẩu không chính xác");

    if (!(await user.comparePassword(password)))
      return response.unauthorized(
        res,
        "Tài khoản hoặc mật khẩu không chính xác"
      );

    const token = await generateToken({ id: user._id, roles: user.roles });

    const data = {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles,
      accessToken: token,
    };

    return response.success(res, data, "Đăng nhập thành công");
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, full_name: fullName } = req.body;

    if (!username)
      return response.badRequest(res, "Tên đăng nhập không được để trống");
    if (username.length < 6 || username.length > 30)
      return response.badRequest(res, "Tên đăng nhập phải từ 6 đến 30 ký tự");
    if (!email) return response.badRequest(res, "Email không được để trống");
    if (email.length < 6 || email.length > 30)
      return response.badRequest(res, "Email phải từ 6 đến 30 ký tự");
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      return response.badRequest(res, "Email không hợp lệ");
    if (!password)
      return response.badRequest(res, "Mật khẩu không được để trống");
    if (password.length < 6 || password.length > 30)
      return response.badRequest(res, "Mật khẩu phải từ 6 đến 30 ký tự");
    if (!fullName)
      return response.badRequest(res, "Họ và tên không được để trống");
    if (fullName.length < 6 || fullName.length > 50)
      return response.badRequest(res, "Họ và tên phải từ 6 đến 50 ký tự");

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username)
        return response.badRequest(res, "Tên đăng nhập đã tồn tại");
      if (existingUser.email === email)
        return response.badRequest(res, "Email đã tồn tại");
    }

    const newUser = new User({ username, email, password, fullName });

    await newUser.save();

    return response.created(res, undefined, "Đăng ký thành công");
  } catch (error) {
    next(error);
  }
};
// Lấy tổng số người dùng
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // Tính tổng số user trong database
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("Failed to get total users:", error.message);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Không trả về mật khẩu
    return res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get all users:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = {
  login,
  register,
  getTotalUsers,
  getAllUsers,
};
