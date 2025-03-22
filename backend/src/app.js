const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoConnect = require("./config/MongoConnect");
const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv");
const productRouter = require("./routes/products");
dotenv.config();
const app = express();

const authRoutes = require("./routes/authRoutes");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const cartRouter = require("./routes/cart");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", express.static("public"));
app.use("/paginated", productRouter);

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3001", "http://your-other-allowed-domain.com"],
  credentials: true, // Cho phép gửi cookie nếu cần
};
app.use(cors(corsOptions));

//kết nối database
mongoConnect();

app.use(authMiddleware);

//định nghĩa routing
app.use("/api/auth", authRoutes); // Không yêu cầu xác thực
app.use(authMiddleware); // Áp dụng cho tất cả các tuyến sau
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/cart", cartRouter);

// middleware error handler
app.use(errorHandler);

module.exports = app;
