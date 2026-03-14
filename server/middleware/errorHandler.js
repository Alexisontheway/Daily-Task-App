/**
 * Centralized error handling middleware
 * Catches errors from routes and controllers and sends appropriate HTTP responses
 */

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Default to 500 server error
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message,
  });
};

module.exports = errorHandler;
