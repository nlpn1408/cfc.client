const mongoose = require("mongoose");
const User = require("./path/to/your/userModel"); // Đường dẫn đến file userModel

mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdminUser = async () => {
  try {
    // Kiểm tra xem đã có admin nào trong hệ thống chưa
    const existingAdmin = await User.findOne({ roles: "admin" });
    if (existingAdmin) {
      console.log("Admin đã tồn tại!");
      return;
    }

    // Tạo tài khoản admin mới
    const adminUser = new User({
      username: "admin123",
      email: "admin@example.com",
      password: "123456",
      fullName: "Admin User",
      roles: ["admin"],
      addresses: [
        {
          street: "123 Admin Street",
          city: "Admin City",
        },
      ],
    });

    // Lưu vào cơ sở dữ liệu
    await adminUser.save();
    console.log("Tài khoản admin đã được tạo thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
