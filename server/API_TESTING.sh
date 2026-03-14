#!/bin/bash

# Daily Task Checklist API - Testing Examples
# This file contains example curl commands to test all API endpoints
# Make sure the server is running on http://localhost:5000 before running these commands

echo "=========================================="
echo "Daily Task Checklist API - Test Examples"
echo "=========================================="

# 1. Get all tasks
echo -e "\n1. GET /tasks - Retrieve all tasks"
echo "Command:"
echo "curl http://localhost:5000/tasks"

# 2. Create a new task
echo -e "\n\n2. POST /tasks - Create a new task"
echo "Command:"
echo 'curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Finish backend practice\"}"'

# 3. Get a single task
echo -e "\n\n3. GET /tasks/:id - Get a single task by ID"
echo "Command:"
echo "curl http://localhost:5000/tasks/1"

# 4. Update a task (mark as completed)
echo -e "\n\n4. PATCH /tasks/:id - Update task completion status"
echo "Command:"
echo 'curl -X PATCH http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"completed\": true}"'

# 5. Update task title
echo -e "\n\n5. PATCH /tasks/:id - Update task title"
echo "Command:"
echo 'curl -X PATCH http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Updated task title\"}"'

# 6. Update both title and completion status
echo -e "\n\n6. PATCH /tasks/:id - Update both title and status"
echo "Command:"
echo 'curl -X PATCH http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"New title\", \"completed\": false}"'

# 7. Delete a task
echo -e "\n\n7. DELETE /tasks/:id - Delete a task"
echo "Command:"
echo "curl -X DELETE http://localhost:5000/tasks/1"

# 8. Error examples
echo -e "\n\n8. Error Examples:"
echo -e "\n  Invalid input (missing title):"
echo '  curl -X POST http://localhost:5000/tasks \
    -H "Content-Type: application/json" \
    -d "{}"'

echo -e "\n  Task not found (non-existent ID):"
echo "  curl http://localhost:5000/tasks/9999"

echo -e "\n  Invalid update data:"
echo '  curl -X PATCH http://localhost:5000/tasks/1 \
    -H "Content-Type: application/json" \
    -d "{\"completed\": \"not-a-boolean\"}"'

echo -e "\n=========================================="
echo "End of Test Examples"
echo "=========================================="
