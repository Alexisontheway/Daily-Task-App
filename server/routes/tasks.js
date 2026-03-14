/**
 * Tasks Routes
 * Defines all task-related endpoints (GET, POST, PATCH, DELETE)
 * Routes are handled by controllers which contain the business logic
 */

const express = require("express");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

/**
 * GET /tasks
 * Retrieve all tasks
 */
router.get("/", getAllTasks);

/**
 * GET /tasks/:id
 * Retrieve a single task by ID
 */
router.get("/:id", getTaskById);

/**
 * POST /tasks
 * Create a new task
 * Body: { title: string }
 */
router.post("/", createTask);

/**
 * PATCH /tasks/:id
 * Update a task's title and/or completed status
 * Body: { title?: string, completed?: boolean }
 */
router.patch("/:id", updateTask);

/**
 * DELETE /tasks/:id
 * Delete a task by ID
 */
router.delete("/:id", deleteTask);

module.exports = router;
