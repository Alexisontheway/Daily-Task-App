# 🚀 Complete Setup & Getting Started Guide

This guide walks you through every step to get the Daily Task Checklist application running on your machine.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Running the Application](#running-the-application)
4. [Testing the Application](#testing-the-application)
5. [How the Application Works](#how-the-application-works)
6. [Pushing to GitHub](#pushing-to-github)

---

## ✅ Prerequisites

Before you start, make sure you have:

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** (for GitHub) - [Download](https://git-scm.com/download/win)
- **Web Browser** - Chrome, Firefox, Edge, or Safari

### Verify Installation
Open PowerShell and check:

```powershell
# Check Node.js
node --version          # Should show v14.0.0 or higher

# Check npm
npm --version          # Should show 6.0.0 or higher

# Check Git
git --version          # Should show git version 2.x.x

# Check PostgreSQL (if installed)
psql --version         # Should show PostgreSQL version
```

---

## 💾 Installation Steps

### Step 1: Create PostgreSQL Database

Open PowerShell and connect to PostgreSQL:

```powershell
psql -U postgres
```

Then run these SQL commands:

```sql
-- Create the database
CREATE DATABASE daily_tasks_db;

-- Connect to it
\c daily_tasks_db

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify tables
\dt
```

Exit psql by typing `\q` and pressing Enter.

### Step 2: Configure Environment Variables

Navigate to the server folder in PowerShell:

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\server"
```

Create a `.env` file (if it doesn't exist):

```powershell
# Create .env file
New-Item -Path .env -ItemType File

# Or open Notepad and create it manually
notepad .env
```

Add this content to `.env`:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=postgres
DB_PORT=5432
PORT=5000
```

**Note:** Replace `postgres` password with your actual PostgreSQL password if different.

### Step 3: Install Backend Dependencies

In the same PowerShell terminal (in the server folder):

```powershell
npm install
```

You should see output like:
```
added 50 packages in 5s
```

### Step 4: Verify Installation

Test that everything works:

```powershell
npm start
```

You should see:
```
✓ Database connected successfully
✓ Server is running on http://localhost:5000
```

If successful, press Ctrl+C to stop the server for now.

---

## 🎬 Running the Application

### Terminal 1: Start the Backend Server

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\server"
npm start
```

Wait for:
```
✓ Server is running on http://localhost:5000
```

**Leave this running** for the entire session.

### Terminal 2: Open the Frontend

Open a new PowerShell/Command Prompt window:

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\client"
```

Then **double-click** on `index.html` or open it in your browser using:

```
file:///D:/PROJECTS%202026/Daily-Task-App/client/index.html
```

You should see the beautiful task management interface!

---

## 🧪 Testing the Application

### Test 1: Create a Task

1. In the app, type `"Buy groceries"` in the input field
2. Click **"Add Task"** or press **Enter**
3. You should see the task appear in the list
4. Statistics should update: Total Tasks = 1, Pending = 1

### Test 2: Complete a Task

1. Click the **checkbox** next to "Buy groceries"
2. The task title should get a strikethrough
3. Statistics should update: Completed = 1, Pending = 0

### Test 3: Edit a Task

1. Click the **✏️ edit button**
2. Type a new name: `"Buy groceries and cook dinner"`
3. Click **OK**
4. Task title should update immediately

### Test 4: Filter Tasks

1. Click the **"Pending"** filter button
2. Only incomplete tasks should show
3. Click **"Completed"** - only completed tasks show
4. Click **"All"** - all tasks show

### Test 5: Delete a Task

1. Click the **🗑️ delete button** on any task
2. Confirm deletion by clicking **OK**
3. Task should disappear from the list
4. Statistics should update

### Test 6: Error Handling

Try invalid inputs:

1. Click "Add Task" **without** typing anything
2. You should see an error: `"Please enter a task title"`
3. Error message disappears after 3 seconds

---

## 🏗️ How the Application Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     DAILY TASK CHECKLIST APP                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐           ┌────────────────────┐  │
│  │   FRONTEND (Client)  │           │  BACKEND (Server)  │  │
│  │  - HTML/CSS/JS       │──HTTP──┬─▶│  - Node.js/Express │  │
│  │  - User Interface    │◀──────┘   │  - Validation      │  │
│  │  - Input Validation  │           │  - Database Queries│  │
│  │                      │           └────────────────────┘  │
│  │                      │                    │                │
│  │                      │           ┌────────▼────────────┐  │
│  │                      │           │   PostgreSQL DB     │  │
│  │                      │           │   - Store Tasks     │  │
│  │                      │           │   - Store Users     │  │
│  │                      │           └─────────────────────┘  │
│  └──────────────────────┘                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow: Adding a Task

```
User Types Task
    ↓
"Buy Groceries"
    ↓
Click "Add Task"
    ↓
JavaScript validates input
    ├─ Is title provided? ✓
    ├─ Is title not empty? ✓
    ├─ Is title <= 100 chars? ✓
    ↓
Send HTTP POST Request to http://localhost:5000/tasks
    {
      "title": "Buy Groceries"
    }
    ↓
Backend validates again (for security)
    ├─ Is title provided? ✓
    ├─ Is title a string? ✓
    ├─ Trim whitespace ✓
    ↓
Insert into PostgreSQL Database
    ↓
Return new task object with ID and timestamp
    {
      "id": 1,
      "title": "Buy Groceries",
      "completed": false,
      "created_at": "2026-03-13T10:30:00.000Z"
    }
    ↓
Frontend receives response
    ↓
Add task to the list
    ↓
Update statistics
    ↓
Clear input field
    ↓
Display success message
    ↓
User sees new task in the list ✓
```

### Data Flow: Completing a Task

```
User clicks Checkbox
    ↓
JavaScript toggles completed status (true/false)
    ↓
Send HTTP PATCH request to http://localhost:5000/tasks/1
    {
      "completed": true
    }
    ↓
Backend updates database
    ↓
Return updated task with new status
    ↓
Frontend updates the UI
    ├─ Show strikethrough
    ├─ Change opacity
    ├─ Update statistics
    ↓
User sees task marked as complete ✓
```

### Data Flow: Deleting a Task

```
User clicks Delete Button
    ↓
Confirmation popup appears
    "Are you sure?"
    ↓
User clicks OK
    ↓
Send HTTP DELETE request to http://localhost:5000/tasks/1
    ↓
Backend deletes from PostgreSQL
    ↓
Return success status (204 No Content)
    ↓
Frontend removes task from list
    ↓
Update statistics
    ↓
User sees task removed ✓
```

### Request-Response Cycle

```
Frontend                              Backend                 Database
   │                                    │                         │
   │──POST /tasks (add)──────────────▶  │                         │
   │  {"title":"Buy Groceries"}        │──INSERT INTO tasks──▶    │
   │                                     │◀──Success──────────     │
   │  ◀──201 Created────────────────────│                         │
   │  {"id": 1, ...}                    │                         │
   │                                    │                         │
   │──GET /tasks (retrieve)────────────▶ │                         │
   │                                     │──SELECT * FROM tasks─▶  │
   │                                     │◀──[tasks]───────────    │
   │  ◀──200 OK────────────────────────│                         │
   │  [{id: 1, ...}, {id: 2, ...}]    │                         │
   │                                    │                         │
   │──PATCH /tasks/1 (update)─────────▶ │                         │
   │  {"completed": true}               │──UPDATE tasks──────▶    │
   │                                     │◀──Success──────────     │
   │  ◀──200 OK────────────────────────│                         │
   │  {"id": 1, "completed": true, ...}│                         │
   │                                    │                         │
   │──DELETE /tasks/1─────────────────▶ │                         │
   │                                     │──DELETE FROM tasks──▶   │
   │                                     │◀──Success──────────     │
   │  ◀──204 No Content─────────────────│                         │
   │                                    │                         │
```

### User Interface Flow

```
┌──────────────────────────────────────────┐
│         Daily Task Checklist             │
│  📋 Stay organized and track tasks       │
├──────────────────────────────────────────┤
│                                          │
│  ┌────────────────────────────────────┐ │
│  │📝 Add a new task...  │ Add Task    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ Total: 3  │ Completed: 2 │ Pending: 1 │
│  └──────────────────────────────────┘  │
│                                          │
│  [All]  [Pending]  [Completed]          │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ ☑ Buy Groceries         ✏️ 🗑️   │  │ (Completed)
│  │   Added today                    │  │
│  │                                   │  │
│  │ ☐ Cook Dinner          ✏️ 🗑️   │  │ (Pending)
│  │   Added today                    │  │
│  │                                   │  │
│  │ ☑ Clean House          ✏️ 🗑️   │  │ (Completed)
│  │   Added yesterday                │  │
│  └──────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

---

## 📤 Pushing to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Log in to your account
3. Click **"+" icon** → **"New repository"**
4. Name it: `daily-task-app`
5. Add description: `A clean, modern task management application with Node.js backend and web frontend`
6. Click **"Create repository"**

### Step 2: Initialize Git (if not already done)

Open PowerShell in your project root folder:

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App"
```

Initialize git:

```powershell
git init
```

### Step 3: Add Files

```powershell
git add .
```

Verify files are staged:

```powershell
git status
```

You should see all files ready to commit.

### Step 4: Create Initial Commit

```powershell
git commit -m "Initial commit: Daily Task Checklist App with backend API and web frontend"
```

### Step 5: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/daily-task-app.git
```

Or if using SSH:

```powershell
git remote add origin git@github.com:YOUR_USERNAME/daily-task-app.git
```

### Step 6: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

You might be asked to authenticate. Follow GitHub's instructions.

### Step 7: Verify

Go to `https://github.com/YOUR_USERNAME/daily-task-app` and you should see your code!

---

## 📝 Making Updates

After pushing to GitHub, whenever you make changes:

```powershell
# Check what changed
git status

# Stage all changes
git add .

# Commit with a message
git commit -m "Add feature: task filtering"

# Push to GitHub
git push
```

---

## 🔑 Key Terminal Commands

### Backend Commands

```powershell
# Navigate to server
cd "D:\PROJECTS 2026\Daily-Task-App\server"

# Install dependencies
npm install

# Start server
npm start

# Start with auto-reload (development)
npm run dev
```

### Frontend

The frontend is just HTML/CSS/JavaScript - no build step needed. Just open `index.html` in a browser.

### Git Commands

```powershell
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push

# Pull from GitHub
git pull
```

---

## ✨ Summary

Now you have:
- ✅ PostgreSQL database with tables
- ✅ Backend API running on port 5000
- ✅ Beautiful frontend UI
- ✅ Full working application
- ✅ Code pushed to GitHub

**Your app is complete and ready to use!** 🎉

For more details, see:
- `server/README.md` - Backend API documentation
- `client/README.md` - Frontend UI documentation
- Main `README.md` - Overview and architecture
