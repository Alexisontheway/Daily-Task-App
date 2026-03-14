/**
 * Daily Task Checklist API - Main Entry Point
 * 
 * This server demonstrates professional Express + PostgreSQL architecture:
 * - Clean separation of concerns (routes, controllers, middleware)
 * - Centralized error handling
 * - Parameterized SQL queries for security
 * - RESTful API design
 */

const express = require("express");
const pool = require("./db");
const tasksRouter = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend from file:// and http://localhost to access the API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the client folder (CSS, JS, etc)
app.use(express.static(path.join(__dirname, "../client")));

// Mount the tasks router at /tasks endpoint
app.use("/tasks", tasksRouter);

// Serve index.html for any path not matching above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Centralized error handling middleware
app.use(errorHandler);

/**
 * Initialize database connection and start server
 * Only starts the server after successful database connection
 */
pool.connect()
  .then(() => {
    console.log("✓ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`✓ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("✗ Database connection error:", err);
    process.exit(1);
  });