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

// Serve index.html for any path not matching above (SPA catch-all)
// Place after API routes so /tasks endpoints still work
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Centralized error handling middleware
app.use(errorHandler);

/**
 * Initialize database schema and start server
 * Ensures all required tables and columns exist
 */
async function initializeDatabase() {
  try {
    // Create tasks table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await pool.query(createTableQuery);

    // Add new columns if they don't exist (for existing tables)
    const migrationQueries = [
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS description TEXT;`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS priority VARCHAR(10) DEFAULT 'medium';`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS category VARCHAR(50);`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS due_date DATE;`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();`,
    ];

    for (const query of migrationQueries) {
      await pool.query(query);
    }

    // Create indexes for better performance
    const createIndexesQuery = `
      CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
      CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
      CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
      CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
      CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);
    `;

    await pool.query(createIndexesQuery);

    console.log("✓ Database schema initialized successfully");
  } catch (err) {
    console.error("✗ Database initialization error:", err);
    throw err;
  }
}

/**
 * Connect to database and start server
 */
pool.connect()
  .then(() => {
    console.log("✓ Database connected successfully");
    return initializeDatabase();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✓ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("✗ Server startup error:", err);
    process.exit(1);
  });