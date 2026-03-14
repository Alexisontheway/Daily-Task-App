# 📊 Application Architecture & Workflow Diagrams

This document contains detailed diagrams showing how the Daily Task Checklist application works.

## System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        DAILY TASK CHECKLIST SYSTEM                           │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                           FRONTEND (Browser)                        │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                   HTML/CSS/JavaScript                        │  │    │
│  │  │  • Input validation                                          │  │    │
│  │  │  • API calls to backend                                      │  │    │
│  │  │  • UI rendering (tasks, stats, filters)                     │  │    │
│  │  │  • Error handling                                            │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │  Port: Local file (can also use http://localhost:3000)             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                    HTTP (JSON) ────┼──── HTTP (JSON)                       │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          BACKEND (Server)                           │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                   Node.js + Express.js                       │  │    │
│  │  │  ┌────────────────────────────────────────────────────────┐ │  │    │
│  │  │  │ Routes (routes/tasks.js)                               │ │  │    │
│  │  │  │ • GET /tasks                                           │ │  │    │
│  │  │  │ • GET /tasks/:id                                       │ │  │    │
│  │  │  │ • POST /tasks                                          │ │  │    │
│  │  │  │ • PATCH /tasks/:id                                     │ │  │    │
│  │  │  │ • DELETE /tasks/:id                                    │ │  │    │
│  │  │  └────────────────────────────────────────────────────────┘ │  │    │
│  │  │  ┌────────────────────────────────────────────────────────┐ │  │    │
│  │  │  │ Controllers (controllers/tasksController.js)           │ │  │    │
│  │  │  │ • Validation Logic                                     │ │  │    │
│  │  │  │ • Database Operations                                  │ │  │    │
│  │  │  │ • Error Handling                                       │ │  │    │
│  │  │  └────────────────────────────────────────────────────────┘ │  │    │
│  │  │  ┌────────────────────────────────────────────────────────┐ │  │    │
│  │  │  │ Middleware (middleware/errorHandler.js)                │ │  │    │
│  │  │  │ • Centralized Error Handling                           │ │  │    │
│  │  │  │ • Status Code Management                               │ │  │    │
│  │  │  └────────────────────────────────────────────────────────┘ │  │    │
│  │  │  ┌────────────────────────────────────────────────────────┐ │  │    │
│  │  │  │ Database Module (db.js)                                │ │  │    │
│  │  │  │ • Connection Pool                                      │ │  │    │
│  │  │  │ • Query Execution                                      │ │  │    │
│  │  │  └────────────────────────────────────────────────────────┘ │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │  Port: 5000                                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                    SQL Queries ────┼──── Results                           │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                     PostgreSQL Database                             │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │ USERS TABLE                   │ TASKS TABLE                  │  │    │
│  │  │ ├─ id (PK)                    │ ├─ id (PK)                  │  │    │
│  │  │ ├─ email                      │ ├─ title                    │  │    │
│  │  │ ├─ password_hash              │ ├─ completed                │  │    │
│  │  │ └─ created_at                 │ ├─ user_id (FK)             │  │    │
│  │  │                               │ └─ created_at               │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │  Host: localhost:5432                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Complete User Workflow Diagram

```
START
  │
  ├─▶ Open index.html in Browser
  │     │
  │     └─▶ Page Loads
  │         │
  │         ├─ Load JavaScript (script.js)
  │         ├─ Apply CSS Styling (style.css)
  │         └─ Fetch all tasks from /tasks API
  │             │
  │             ▼
  │         Display Tasks & Statistics
  │
  ├─▶ User Action: ADD TASK
  │     │
  │     ├─ Type task title in input field
  │     │  ("Buy Groceries")
  │     │
  │     ├─ Click "Add Task" or Press Enter
  │     │
  │     └─ Validation Check
  │         ├─ Is title provided? → If No → Show Error ✗
  │         ├─ Is title > 100 chars? → If Yes → Show Error ✗
  │         │
  │         └─ If Valid ✓
  │             │
  │             └─ POST request to /tasks
  │                 Headers: Content-Type: application/json
  │                 Body: { title: "Buy Groceries" }
  │                 │
  │                 ▼ (Backend validates again)
  │                 Database: INSERT INTO tasks
  │                 │
  │                 ▼ Returns
  │                 {
  │                   id: 1,
  │                   title: "Buy Groceries",
  │                   completed: false,
  │                   created_at: "2026-03-13..."
  │                 }
  │                 │
  │                 ▼
  │                 Add to allTasks array
  │                 Re-render UI
  │                 Update Stats
  │                 Clear Input Field
  │                 Show Success Message
  │
  ├─▶ User Action: COMPLETE TASK
  │     │
  │     ├─ Click checkbox next to task
  │     │
  │     └─ PATCH request to /tasks/1
  │         Body: { completed: true }
  │         │
  │         ▼ Database: UPDATE
  │         │
  │         ▼ Returns updated task
  │         │
  │         ▼ Update UI
  │         ├─ Apply strikethrough
  │         ├─ Reduce opacity
  │         └─ Update Statistics
  │
  ├─▶ User Action: FILTER TASKS
  │     │
  │     ├─ Click Filter Button (All/Pending/Completed)
  │     │
  │     └─ Filter allTasks array locally
  │         (No API call needed)
  │         │
  │         ▼ Re-render filtered list
  │
  ├─▶ User Action: EDIT TASK
  │     │
  │     ├─ Click ✏️ edit button
  │     │
  │     ├─ Prompt appears with current title
  │     │  User types new title
  │     │  ("Buy Groceries and Cook")
  │     │
  │     └─ PATCH request to /tasks/1
  │         Body: { title: "Buy Groceries and Cook" }
  │         │
  │         ▼ Database: UPDATE
  │         │
  │         ▼ Returns updated task
  │         │
  │         ▼ Update UI with new title
  │
  ├─▶ User Action: DELETE TASK
  │     │
  │     ├─ Click 🗑️ delete button
  │     │
  │     ├─ Confirmation popup
  │     │  "Are you sure?"
  │     │
  │     ├─ User clicks OK
  │     │
  │     └─ DELETE request to /tasks/1
  │         │
  │         ▼ Database: DELETE
  │         │
  │         ▼ Returns 204 No Content
  │         │
  │         ▼ Remove from allTasks
  │         │
  │         ▼ Re-render (task disappears)
  │         │
  │         ▼ Update Statistics
  │
  └─▶ Close Browser or Page
       │
       └─ Tasks are saved in PostgreSQL
          (Persistent - will appear next time app opens)

END
```

---

## Request-Response Flow Diagram

```
FRONTEND (Client Browser)         BACKEND (Express Server)         DATABASE (PostgreSQL)

    User adds task
         │
         ├─ Validate input
         │  (non-empty, < 100 chars)
         │
         ├─ Show loading spinner
         │
         ├─ Prepare HTTP request
         │  POST /tasks
         │  Content-Type: application/json
         │  { title: "Buy Groceries" }
         │
         ├─────────────────────────────────▶ Receive POST request
         │                                    │
         │                                    ├─ Extract body: { title: "..." }
         │                                    │
         │                                    ├─ Validate in controller
         │                                    │  • Is title provided?
         │                                    │  • Is title a string?
         │                                    │  • Trim whitespace
         │                                    │
         │                                    ├─ Execute query:
         │                                    │  INSERT INTO tasks
         │                                    │  (title, completed, created_at)
         │                                    │  VALUES ($1, $2, NOW())
         │                                    │  │
         │                                    │  ├──────────────────────────────▶ Execute INSERT
         │                                    │                                    │
         │                                    │                                    ├─ Generate ID: 1
         │                                    │                                    ├─ Insert row
         │                                    │                                    └─ Return row data
         │                                    │  │
         │                                    │  ◀──────────────────────────────── Return result
         │                                    │
         │                                    ├─ Prepare response:
         │                                    │  HTTP 201 Created
         │                                    │  {
         │                                    │    id: 1,
         │                                    │    title: "Buy Groceries",
         │                                    │    completed: false,
         │                                    │    created_at: "..."
         │                                    │  }
         │                                    │
         ◀───────────────────────────────────

    Hide loading spinner
    │
    ├─ Parse JSON response
    │
    ├─ Add to allTasks array
    │
    ├─ Call renderTasks()
    │  └─ Generate HTML for new task
    │     └─ Add to DOM
    │
    ├─ Call updateStats()
    │  └─ Increment total count
    │  └─ Update UI elements
    │
    ├─ Clear input field
    │
    └─ Show success message
       │
       ▼ User sees task in list!
```

---

## State Management Diagram

```
┌──────────────────────────────────────────────────────────┐
│             APPLICATION STATE IN MEMORY                  │
└──────────────────────────────────────────────────────────┘

allTasks = [                          currentFilter = 'all'
  {
    id: 1,                            • 'all'      → Show all tasks
    title: "Buy Groceries",           • 'pending'  → Show incomplete
    completed: true,                  • 'completed'→ Show complete
    created_at: "2026-03-13T10:30"
  },
  {
    id: 2,
    title: "Cook Dinner",
    completed: false,
    created_at: "2026-03-13T11:45"
  },
  {
    id: 3,
    title: "Clean House",
    completed: true,
    created_at: "2026-03-12T14:20"
  }
]

┌──────────────────────────────────────────────────────────┐
│           STATE CHANGES ON EACH ACTION                   │
└──────────────────────────────────────────────────────────┘

ADD TASK:
  allTasks = [newTask, ...allTasks]

COMPLETE TASK (id=1):
  allTasks[0].completed = !allTasks[0].completed

EDIT TASK (id=2):
  allTasks[1].title = "New Title"

DELETE TASK (id=3):
  allTasks = allTasks.filter(t => t.id !== 3)

CHANGE FILTER:
  currentFilter = 'pending'
  (Re-render only matching tasks)
```

---

## Error Handling Flow Diagram

```
User tries to:
  ADD task with empty title
         │
         ▼
Frontend Validation:
  if (!title || title.trim().length === 0)
         │
         ├─ YES (Empty) → Show Error Message ✗
         │              Display: "Please enter a task title"
         │              No API call made
         │              Message auto-clears after 3 seconds
         │
         └─ NO (Valid) → Proceed to API call


API Request Fails:
  (e.g., server is down)
         │
         ▼
Error in try-catch block
         │
         ├─ Capture error
         │
         ├─ Log to console
         │
         └─ Show user-friendly error
            "Failed to load tasks. Please try again."


Backend Validation Fails:
  (e.g., title is not a string)
         │
         ▼
Controller catches error
         │
         ├─ Return HTTP 400
         │
         └─ Response: { error: "Title must be a string" }
            │
            ▼ Frontend receives
            │
            └─ Display error to user


Database Connection Error:
         │
         ▼
Backend middleware catches
         │
         ├─ Return HTTP 500
         │
         └─ Log error details (not shown to user)
            Response: { error: "Internal Server Error" }
```

---

## File Structure & Role Diagram

```
Daily-Task-App/
│
├── server/                          BACKEND APPLICATION
│   ├── index.js                     Entry point, initialize Express
│   ├── db.js                        PostgreSQL connection setup
│   │
│   ├── routes/
│   │   └── tasks.js                 Define API endpoints
│   │       ├─ GET /tasks
│   │       ├─ GET /tasks/:id
│   │       ├─ POST /tasks
│   │       ├─ PATCH /tasks/:id
│   │       └─ DELETE /tasks/:id
│   │
│   ├── controllers/
│   │   └── tasksController.js       Business logic & validation
│   │       ├─ getAllTasks()
│   │       ├─ getTaskById()
│   │       ├─ createTask()
│   │       ├─ updateTask()
│   │       └─ deleteTask()
│   │
│   ├── middleware/
│   │   └── errorHandler.js          Global error handling
│   │
│   ├── package.json                 Dependencies: express, pg, dotenv
│   └── .env                         DB credentials (don't commit)
│
└── client/                           FRONTEND APPLICATION
    ├── index.html                   HTML structure
    │   └─ Contains all UI elements
    │
    ├── style.css                    Styling & animations
    │   ├─ Colors & gradients
    │   ├─ Responsive layout
    │   └─ UI animations
    │
    └── script.js                    JavaScript functionality
        ├─ DOM event listeners
        ├─ API calls (fetch)
        ├─ State management (allTasks)
        ├─ UI rendering
        └─ Error handling
```

---

## Technology Stack Diagram

```
┌────────────────────────────────────────────────────────┐
│                   TECHNOLOGY STACK                     │
├────────────────────────────────────────────────────────┤
│                                                         │
│  FRONTEND (Client)                 BACKEND (Server)    │
│  ├─ HTML5                          ├─ Node.js          │
│  ├─ CSS3 (Flexbox/Grid)            ├─ Express.js       │
│  └─ Vanilla JavaScript              ├─ PostgreSQL       │
│     • No frameworks                 └─ pg (driver)      │
│     • No build tools                                    │
│     • Pure, lightweight              ENVIRONMENT        │
│                                      ├─ dotenv          │
│  COMMUNICATION                       └─ Node v14+       │
│  ├─ HTTP/HTTPS                                         │
│  ├─ REST API                        DEPLOYMENT         │
│  └─ JSON format                     ├─ Local dev        │
│                                      ├─ Heroku          │
│                                      ├─ AWS             │
│                                      └─ Azure           │
│                                                         │
│  PERSISTENCE                                           │
│  └─ PostgreSQL Database                               │
│     on localhost:5432                                  │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## Performance & Security Diagram

```
┌────────────────────────────────────────────────────────┐
│           SECURITY MEASURES IN PLACE                   │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ✓ SQL Injection Prevention                           │
│    └─ Parameterized queries: WHERE id = $1            │
│       (Never: WHERE id = ${id})                       │
│                                                         │
│  ✓ Input Validation                                   │
│    └─ Frontend: Type checking, length limits          │
│    └─ Backend: Double validation for security         │
│                                                         │
│  ✓ Error Handling                                     │
│    └─ Database errors never shown to users            │
│    └─ Generic error messages for security             │
│                                                         │
│  ✓ Database Security                                  │
│    └─ Connection pooling for efficiency               │
│    └─ Environment variables for credentials           │
│    └─ no hardcoded passwords                          │
│                                                         │
│  ✓ API Design                                         │
│    └─ Proper HTTP methods (GET, POST, PATCH, DELETE) │
│    └─ Appropriate status codes                        │
│    └─ JSON validation                                 │
│                                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│           PERFORMANCE OPTIMIZATIONS                    │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ✓ Database Connection Pooling                        │
│    └─ Reuse connections for faster queries            │
│                                                         │
│  ✓ Client-side Filtering                              │
│    └─ Filter tasks locally (no API calls)             │
│                                                         │
│  ✓ Async/Await Pattern                                │
│    └─ Non-blocking operations                         │
│    └─ Better resource utilization                     │
│                                                         │
│  ✓ Optimized Front-end                                │
│    └─ No external libraries/frameworks                │
│    └─ Fast loading and interaction                    │
│                                                         │
│  ✓ CSS Grid/Flexbox                                   │
│    └─ Modern layout (better than floats)              │
│    └─ Responsive without media query overhead         │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## HTTP Status Codes Used

```
✅ SUCCESS RESPONSES
├─ 200 OK
│  └─ GET, PATCH requests successful
│
├─ 201 Created
│  └─ POST request successful
│  └─ New task created in database
│
└─ 204 No Content
   └─ DELETE request successful
   └─ Task deleted (no response body needed)


❌ CLIENT ERROR RESPONSES
├─ 400 Bad Request
│  ├─ Missing required fields
│  ├─ Invalid data type
│  ├─ Title is empty
│  └─ title is not a string
│
└─ 404 Not Found
   └─ Task with ID doesn't exist
   └─ User tries to get/edit/delete non-existent task


🔴 SERVER ERROR RESPONSES
└─ 500 Internal Server Error
   ├─ Database connection failed
   ├─ Unexpected error in processing
   └─ User sees: "Failed to retrieve tasks"
```

---

## Browser DevTools Inspection Guide

When debugging, you can inspect the application:

```
Open DevTools: F12 or Right-click → Inspect

📍 NETWORK TAB
├─ Monitor all API calls
├─ See request/response
├─ Check status codes
└─ Inspect JSON payloads

📍 CONSOLE TAB
├─ View error messages
├─ See logged data
├─ Test JavaScript commands
└─ Check for issues

📍 ELEMENTS TAB
├─ Inspect HTML structure
├─ See CSS classes applied
└─ Watch DOM changes in real-time

📍 APPLICATION TAB
├─ View localStorage (if used in future)
├─ See session info
└─ Inspect cookies

📍 STORAGE TAB
├─ Browser cache
├─ Session storage
└─ Local storage
```

---

This completes the architectural and workflow documentation of the Daily Task Checklist application!
