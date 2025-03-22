const { getTokenFromHeaders, verifyToken } = require("../utils/jwtUtils");
const response = require("../response/responseHandler");

// Định nghĩa các route public
const publicRoutes = [
  { method: "GET", path: "/products" },
  { method: "GET", path: "/products/:id" },
  { method: "GET", path: "/products/hot" },
  { method: "GET", path: "/categories" },
  { method: "GET", path: "/categories/:id" },
  { method: "POST", path: "/api/auth/login" },
  { method: "POST", path: "/api/auth/register" },
  { method: "GET", path: "/products/lienquan/:categoryId" },
  { method: "GET", path: "/products/detail/:id" },
];

// Định nghĩa các route yêu cầu role
const roleRoutes = [
  { method: "GET", path: "/api/admin/products", roles: ["admin", "manager"] },
  { method: "POST", path: "/api/admin/products", roles: ["admin"] },
];

const matchRoute = (req, route) => {
  const regex = new RegExp(
    `^${route.path.replace(/:[a-zA-Z0-9]+/g, "[^/]+")}$`
  );
  return req.method === route.method && regex.test(req.path);
};

const isMatchRoute = (req, routes) => {
  return routes.some((route) => {
    const regex = new RegExp(
      `^${route.path.replace(/:[a-zA-Z0-9]+/g, "[^/]+")}$`
    );
    console.log(`Checking route: ${req.path} against ${route.path}`); // Kiểm tra log
    return route.method === req.method && regex.test(req.path);
  });
};

const authMiddleware = (req, res, next) => {
  // Kiểm tra route public
  if (isMatchRoute(req, publicRoutes)) return next();

  const token = getTokenFromHeaders(req);

  // Nếu không có token, trả về lỗi Unauthorized
  if (!token) {
    return response.unauthorized(res, "Token is required");
  }

  let user = null;
  try {
    user = verifyToken(token); // Kiểm tra tính hợp lệ của token
  } catch (error) {
    return response.unauthorized(res, "Invalid token");
  }

  if (!user) return response.unauthorized(res, "Unauthorized");
  req.user = user;

  // Kiểm tra route yêu cầu role
  const roleRoute = roleRoutes.find((route) => matchRoute(req, route));
  if (roleRoute && !user.roles.some((role) => roleRoute.roles.includes(role))) {
    return response.forbidden(res, "Bị cấm: Bạn không có quyền cần thiết");
  }

  next();
};

module.exports = authMiddleware;
