const responseHandler = {
  success: (res, data, message = "Success") => {
    res.status(200).json({
      status: 200,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  },

  created: (res, data, message = "Created") => {
    res.status(201).json({
      status: 201,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  },

  noContent: (res, message = "No Content") => {
    res.status(204).send(); // Không có nội dung trả về
  },

  badRequest: (res, message = "Bad Request", errors = []) => {
    res.status(400).json({
      status: 400,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  },

  notFound: (res, message = "Not Found", resource = "") => {
    res.status(404).json({
      status: 404,
      message: `${message}: ${resource}`,
      timestamp: new Date().toISOString(),
    });
  },

  unauthorized: (res, message = "Unauthorized") => {
    res.status(401).json({
      status: 401,
      message,
      timestamp: new Date().toISOString(),
    });
  },

  forbidden: (res, message = "Forbidden") => {
    res.status(403).json({
      status: 403,
      message,
      timestamp: new Date().toISOString(),
    });
  },

  internalServerError: (
    res,
    message = "Internal Server Error",
    details = {}
  ) => {
    res.status(500).json({
      status: 500,
      message,
      details,
      timestamp: new Date().toISOString(),
    });
  },
};

module.exports = responseHandler;
