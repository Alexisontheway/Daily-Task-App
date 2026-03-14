@echo off
REM Daily Task Checklist API - Testing Examples (Windows)
REM This file contains example curl commands to test all API endpoints
REM Make sure the server is running on http://localhost:5000 before running these commands

echo ==========================================
echo Daily Task Checklist API - Test Examples
echo ==========================================

echo.
echo 1. GET /tasks - Retrieve all tasks
echo Command:
echo curl http://localhost:5000/tasks
echo.

echo 2. POST /tasks - Create a new task
echo Command:
echo curl -X POST http://localhost:5000/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"Finish backend practice\"}"
echo.

echo 3. GET /tasks/:id - Get a single task by ID
echo Command:
echo curl http://localhost:5000/tasks/1
echo.

echo 4. PATCH /tasks/:id - Update task completion status
echo Command:
echo curl -X PATCH http://localhost:5000/tasks/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"completed\": true}"
echo.

echo 5. PATCH /tasks/:id - Update task title
echo Command:
echo curl -X PATCH http://localhost:5000/tasks/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"Updated task title\"}"
echo.

echo 6. PATCH /tasks/:id - Update both title and status
echo Command:
echo curl -X PATCH http://localhost:5000/tasks/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"New title\", \"completed\": false}"
echo.

echo 7. DELETE /tasks/:id - Delete a task
echo Command:
echo curl -X DELETE http://localhost:5000/tasks/1
echo.

echo 8. Error Examples:
echo.
echo   Invalid input (missing title):
echo   curl -X POST http://localhost:5000/tasks ^
     -H "Content-Type: application/json" ^
     -d "{}"
echo.

echo   Task not found (non-existent ID):
echo   curl http://localhost:5000/tasks/9999
echo.

echo   Invalid update data:
echo   curl -X PATCH http://localhost:5000/tasks/1 ^
     -H "Content-Type: application/json" ^
     -d "{\"completed\": \"not-a-boolean\"}"
echo.

echo ==========================================
echo End of Test Examples
echo ==========================================
