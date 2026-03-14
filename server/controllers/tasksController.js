/**
 * Tasks Controller
 * Handles all business logic for task CRUD operations
 * Returns appropriate JSON responses and error status codes
 */

const pool = require("../db");

/**
 * GET all tasks
 * Returns tasks ordered by created_at in descending order (newest first)
 */
const getAllTasks = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    next({
      status: 500,
      message: "Failed to retrieve tasks",
    });
  }
};

/**
 * GET a single task by ID
 * Returns 404 if task not found
 */
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Parameterized query prevents SQL injection
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    // Check if task exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next({
      status: 500,
      message: "Failed to retrieve task",
    });
  }
};

/**
 * CREATE a new task
 * Validates that title is provided and trims whitespace
 * Returns 400 for invalid input
 */
const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Validate that title is provided
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Title is required and must be a string" });
    }

    // Trim whitespace from title
    const trimmedTitle = title.trim();

    // Check that title is not empty after trimming
    if (trimmedTitle.length === 0) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    // Insert new task with parameterized query
    const result = await pool.query(
      "INSERT INTO tasks (title, completed, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [trimmedTitle, false]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next({
      status: 500,
      message: "Failed to create task",
    });
  }
};

/**
 * UPDATE a task's title and/or completed status
 * Allows partial updates (only send fields you want to update)
 * Returns 404 if task not found
 */
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Build dynamic update query based on provided fields
    const updates = [];
    const values = [];
    let paramCount = 1;

    // If title is provided, add it to the update
    if (title !== undefined) {
      if (typeof title !== "string") {
        return res.status(400).json({ error: "Title must be a string" });
      }

      const trimmedTitle = title.trim();
      if (trimmedTitle.length === 0) {
        return res.status(400).json({ error: "Title cannot be empty" });
      }

      updates.push(`title = $${paramCount}`);
      values.push(trimmedTitle);
      paramCount++;
    }

    // If completed is provided, add it to the update
    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed must be a boolean" });
      }

      updates.push(`completed = $${paramCount}`);
      values.push(completed);
      paramCount++;
    }

    // If no fields to update, return error
    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Add task ID at the end for the WHERE clause
    values.push(id);

    // Execute update query
    const result = await pool.query(
      `UPDATE tasks SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    // Check if task exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next({
      status: 500,
      message: "Failed to update task",
    });
  }
};

/**
 * DELETE a task by ID
 * Returns 404 if task not found
 * Returns 204 (No Content) on successful deletion
 */
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Parameterized query to delete task
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING id",
      [id]
    );

    // Check if task existed (if no rows were deleted)
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Return 204 No Content on successful deletion
    res.status(204).send();
  } catch (err) {
    next({
      status: 500,
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
