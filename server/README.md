# Daily Task Checklist API - Backend

A professional, production-ready backend API for a task management application built with Node.js, Express, and PostgreSQL.

## Project Structure

```
server/
├── index.js                      # Main entry point - initializes Express and database
├── db.js                         # PostgreSQL connection pool configuration
├── package.json                  # Project dependencies
├── routes/
│   └── tasks.js                 # Task-related API endpoints
├── controllers/
│   └── tasksController.js       # Business logic for task CRUD operations
├── middleware/
│   └── errorHandler.js          # Centralized error handling
└── utils/                        # Reusable utility functions (future)
```

## Architecture Overview

This API follows **clean architecture** principles with separation of concerns:

- **Routes**: Define HTTP endpoints and map them to controller functions
- **Controllers**: Handle business logic, validation, and database queries
- **Middleware**: Handle cross-cutting concerns like error handling
- **Database**: Managed through a connection pool for efficiency and security

## API Endpoints

### GET `/tasks`

Retrieve all tasks ordered by creation date (newest first).

**Response:**

```json
[
  {
    "id": 1,
    "title": "Finish backend practice",
    "completed": false,
    "created_at": "2026-03-12T10:30:00.000Z"
  }
]
```

---

### GET `/tasks/:id`

Retrieve a single task by ID.

**Response (Success):**

```json
{
  "id": 1,
  "title": "Finish backend practice",
  "completed": false,
  "created_at": "2026-03-12T10:30:00.000Z"
}
```

**Response (404 Not Found):**

```json
{
  "error": "Task not found"
}
```

---

### POST `/tasks`

Create a new task.

**Request Body:**

```json
{
  "title": "Complete project documentation"
}
```

**Validation Rules:**

- `title` is required
- `title` must be a string
- `title` is trimmed of whitespace
- `title` cannot be empty after trimming

**Response (Success - 201 Created):**

```json
{
  "id": 2,
  "title": "Complete project documentation",
  "completed": false,
  "created_at": "2026-03-12T11:15:00.000Z"
}
```

**Response (400 Bad Request):**

```json
{
  "error": "Title is required and must be a string"
}
```

---

### PATCH `/tasks/:id`

Update a task's title and/or completion status.

**Request Body (partial update):**

```json
{
  "title": "Updated task title",
  "completed": true
}
```

**Validation Rules:**

- At least one field (`title` or `completed`) must be provided
- `title` must be a string (if provided)
- `completed` must be a boolean (if provided)

**Response (Success):**

```json
{
  "id": 1,
  "title": "Updated task title",
  "completed": true,
  "created_at": "2026-03-12T10:30:00.000Z"
}
```

**Response (404 Not Found):**

```json
{
  "error": "Task not found"
}
```

**Response (400 Bad Request):**

```json
{
  "error": "Title cannot be empty"
}
```

---

### DELETE `/tasks/:id`

Delete a task by ID.

**Response (204 No Content):**
Empty response on success.

**Response (404 Not Found):**

```json
{
  "error": "Task not found"
}
```

---

## Error Handling

The API uses standardized HTTP status codes:

- **200 OK**: Successful GET or PATCH request
- **201 Created**: Successful POST request
- **204 No Content**: Successful DELETE request
- **400 Bad Request**: Invalid input or validation error
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server-side error

All errors return JSON responses with an `error` field explaining the issue.

## Key Features

### 1. Parameterized Queries

All database queries use parameterized statements (`$1, $2`) to prevent SQL injection:

```javascript
const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
```

### 2. Async/Await

All asynchronous operations use `async/await` for clean, readable code:

```javascript
const getAllTasks = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    next({ status: 500, message: "Failed to retrieve tasks" });
  }
};
```

### 3. Centralized Error Handling

The `errorHandler` middleware catches all errors and sends appropriate HTTP responses:

```javascript
app.use(errorHandler);
```

### 4. Input Validation

All inputs are validated before database operations:

- Type checking
- Required field validation
- String trimming for whitespace

## Database Schema

The API expects the following PostgreSQL tables:

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Server

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- `.env` file with database credentials

### Environment Variables

Create a `.env` file:

```
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=your_db_password
DB_PORT=5432
PORT=5000
```

### Installation & Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Start with auto-reload (development)
npm run dev
```

The server will start on `http://localhost:5000`.

## Learning Points for Backend Developers

### 1. Separation of Concerns

- **Routes** define endpoints
- **Controllers** contain business logic
- **Middleware** handle cross-cutting concerns
- **Database** module is separate from application logic

### 2. Error Handling

- Try-catch blocks catch errors
- Errors are passed to middleware with `next()`
- Centralized middleware handles response sending

### 3. SQL Security

- Always use parameterized queries
- Never concatenate user input into SQL strings
- Connection pooling improves performance

### 4. RESTful Design

- GET for retrieval
- POST for creation
- PATCH for updates
- DELETE for removal
- Appropriate HTTP status codes for different scenarios

### 5. Async/Await Pattern

- Cleaner than callbacks or promise chains
- Easier error handling with try-catch
- More readable code flow

## Future Enhancements

- User authentication & authorization
- Request validation middleware
- Rate limiting
- Logging system
- Unit & integration tests
- API documentation (Swagger/OpenAPI)
- Pagination for large datasets
- Task filtering and search
