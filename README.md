# 📋 Daily Task Checklist Application

A **complete, production-ready** task management application with a clean, professional interface. Built with Node.js, Express, PostgreSQL, and Vanilla JavaScript.

**Live Demo Features:**
- ✅ Add, edit, complete, and delete tasks
- 📊 Real-time statistics tracking
- 🎨 Beautiful, responsive UI
- 🔒 Secure backend with parameterized queries
- 🚀 RESTful API with proper error handling

---

## 📚 Documentation Index

Start here based on what you want to do:

| Document | Purpose |
|----------|---------|
| **[QUICK_START.md](./QUICK_START.md)** ⭐ | **Start here!** 5-minute setup guide |
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** | Complete step-by-step installation (with database setup) |
| **[ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md)** | Visual workflows, system architecture, data flow diagrams |
| **[server/README.md](./server/README.md)** | Backend API documentation, endpoints, error codes |
| **[client/README.md](./client/README.md)** | Frontend usage guide, features, troubleshooting |

---

## 🎯 What You Get

This is a **fully functional, real-world application** including:

### Backend Features
- ✅ RESTful API with 5 endpoints (CRUD operations)
- ✅ PostgreSQL database with proper schema
- ✅ Input validation and error handling
- ✅ Parameterized SQL queries (SQL injection protection)
- ✅ Async/await patterns
- ✅ Centralized error handling middleware
- ✅ Professional code structure (MVC-like)

### Frontend Features
- ✅ Beautiful, modern UI with CSS animations
- ✅ Real-time task management
- ✅ Filter tasks (All/Pending/Completed)
- ✅ Live statistics (Total/Completed/Pending)
- ✅ Input validation
- ✅ Error messages with auto-dismiss
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Loading indicators

### Code Quality
- ✅ Well-documented code with comments
- ✅ Clean separation of concerns
- ✅ Scalable architecture
- ✅ Security best practices
- ✅ Production-ready code

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v14+
- PostgreSQL
- Git (for GitHub)
- Any web browser

### 1. Setup Database

```powershell
psql -U postgres

# In psql:
CREATE DATABASE daily_tasks_db;
\c daily_tasks_db

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\q
```

### 2. Configure Backend

Create `.env` file in `server/` folder:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=postgres
DB_PORT=5432
PORT=5000
```

### 3. Install & Start Backend

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\server"
npm install
npm start
```

Expected output:
```
✓ Database connected successfully
✓ Server is running on http://localhost:5000
```

### 4. Open Frontend

In another terminal:

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\client"
# Double-click index.html or open in browser
```

**That's it!** Your app is running! 🎉

---

## 📁 Project Structure

```
Daily-Task-App/                          
├── README.md                            ← You are here
├── QUICK_START.md                       ← Start here (5 min)
├── SETUP_GUIDE.md                       ← Detailed setup
├── ARCHITECTURE_DIAGRAMS.md             ← Visual diagrams
├── .gitignore                           ← Git configuration
│
├── server/                              BACKEND (Node.js + Express)
│   ├── index.js                         Entry point (Express app init)
│   ├── db.js                            PostgreSQL connection pool
│   ├── package.json                     Dependencies, scripts
│   │
│   ├── routes/
│   │   └── tasks.js                     API endpoint definitions
│   │       • GET /tasks
│   │       • GET /tasks/:id
│   │       • POST /tasks
│   │       • PATCH /tasks/:id
│   │       • DELETE /tasks/:id
│   │
│   ├── controllers/
│   │   └── tasksController.js           Business logic
│   │       • getAllTasks()
│   │       • getTaskById()
│   │       • createTask()      (with validation)
│   │       • updateTask()      (supports partial updates)
│   │       • deleteTask()
│   │
│   ├── middleware/
│   │   └── errorHandler.js              Global error handling
│   │
│   ├── utils/                           (For future utilities)
│   ├── .env                             Database credentials
│   ├── .env.example                     Template (no secrets)
│   ├── README.md                        Backend docs
│   ├── API_TESTING.bat                  Test commands (Windows)
│   └── API_TESTING.sh                   Test commands (Mac/Linux)
│
└── client/                              FRONTEND (HTML/CSS/JS)
    ├── index.html                       Page structure
    ├── style.css                        Styling (no dependencies!)
    ├── script.js                        Functionality
    │   • DOM event listeners
    │   • Fetch API calls
    │   • State management
    │   • UI rendering
    │
    └── README.md                        Frontend docs
```

---

## 🎮 How to Use the Application

### Add a Task
1. Type task name in the input field
2. Click "Add Task" or press **Enter**
3. Task appears at the top of the list

### Mark as Complete
1. Click the **checkbox** next to any task
2. Task gets a strikethrough (visual indicator)
3. Statistics update automatically

### Edit a Task
1. Click the **✏️ edit button**
2. Edit the title in the popup
3. Click **OK** to save

### Delete a Task
1. Click the **🗑️ delete button**
2. Confirm deletion
3. Task is removed immediately

### Filter Tasks
- **All** - Show all tasks
- **Pending** - Show only incomplete tasks
- **Completed** - Show only done tasks

### Monitor Progress
- **Total Tasks** - Count of all tasks
- **Completed** - Count of finished tasks
- **Pending** - Count of remaining tasks

---

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                   USER (You)                            │
└────────────────┬────────────────────────────────────────┘
                 │
         Opens in Browser
                 │
        ┌────────▼────────┐
        │  index.html      │  ← Client-side app
        │  ├─ HTML         │     Runs in your browser
        │  ├─ CSS          │
        │  └─ JavaScript   │
        └────────┬────────┘
                 │
         HTTP Requests (JSON)
         ↓ Add Task
         ↓ Complete Task
         ↓ Update Task
         ↓ Delete Task
                 │
        ┌────────▼────────────────┐
        │  http://localhost:5000  │  ← Backend API
        │  ├─ Node.js             │     Runs on your machine
        │  ├─ Express             │
        │  └─ Business Logic      │
        └────────┬────────────────┘
                 │
         SQL Queries
         ↓ INSERT Tasks
         ↓ SELECT Tasks
         ↓ UPDATE Tasks
         ↓ DELETE Tasks
                 │
        ┌────────▼────────────┐
        │   PostgreSQL DB     │  ← Database
        │   daily_tasks_db    │     Stores all data
        │   TASKS Table       │     Persists on disk
        │   USERS Table       │
        └─────────────────────┘
```

### Request-Response Cycle

When you add a task:

1. **Frontend:** You type "Buy Groceries"
2. **Frontend:** Click "Add Task"
3. **Frontend:** Send HTTP POST to `/tasks`
4. **Backend:** Receive request, validate
5. **Backend:** Database INSERT
6. **Database:** Create new task record
7. **Database:** Return task with ID
8. **Backend:** Send HTTP response (201 Created)
9. **Frontend:** Receive response
10. **Frontend:** Add to list, update stats
11. **UI:** Task appears on screen ✓

---

## 🔌 API Endpoints

### All Available Endpoints

| Verb | Endpoint | Purpose | Status |
|------|----------|---------|--------|
| GET | `/tasks` | Get all tasks | 200 OK |
| GET | `/tasks/:id` | Get single task | 200 OK or 404 |
| POST | `/tasks` | Create new task | 201 Created or 400 |
| PATCH | `/tasks/:id` | Update task | 200 OK or 404 |
| DELETE | `/tasks/:id` | Delete task | 204 No Content or 404 |

### Example: Create Task

**Request:**
```json
POST http://localhost:5000/tasks
Content-Type: application/json

{
  "title": "Buy Groceries"
}
```

**Success Response (201):**
```json
{
  "id": 1,
  "title": "Buy Groceries",
  "completed": false,
  "created_at": "2026-03-13T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Title is required and must be a string"
}
```

---

## 🔒 Security Features

✅ **SQL Injection Prevention** - Parameterized queries everywhere  
✅ **Input Validation** - Frontend AND backend validation  
✅ **Error Handling** - Doesn't expose sensitive info  
✅ **Password Protection** - Environment variables (no hardcoded secrets)  
✅ **Connection Pooling** - Efficient database resource management  

---

## 📊 Technology Stack

| Layer | Technology | Details |
|-------|------------|---------|
| **Database** | PostgreSQL v12+ | Persistent data storage |
| **Backend** | Node.js v14+ | JavaScript runtime |
| **Framework** | Express.js | Web server framework |
| **Driver** | pg | PostgreSQL client |
| **Frontend** | HTML5 | Page structure |
| **Styling** | CSS3 | Modern styling |
| **Logic** | Vanilla JS | Pure JavaScript (no frameworks) |
| **Communication** | REST API | HTTP with JSON |

**No build tools needed!** Frontend is pure HTML/CSS/JavaScript.

---

## 📤 Push to GitHub

### Step 1: Create Repository

1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name: `daily-task-app`
4. Click **"Create repository"**

### Step 2: Push Code

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App"

git init
git add .
git commit -m "Initial commit: Daily Task Checklist App"

# Replace YOUR_USERNAME
git remote add origin https://github.com/YOUR_USERNAME/daily-task-app.git

git branch -M main
git push -u origin main
```

**Done!** Code is now on GitHub! 🎉

---

## 🧪 Testing the Application

### Test 1: Create Tasks
- Add 3 tasks with different names
- Verify statistics update

### Test 2: Complete Tasks
- Complete 2 tasks
- Check counts update
- Verify strikethrough appears

### Test 3: Filter
- Click "Pending" - should show only incomplete
- Click "Completed" - should show only done
- Click "All" - should show all

### Test 4: Edit
- Edit a task title
- Verify change persists

### Test 5: Delete
- Delete a task
- Verify removed from list
- Verify counts update

### Test 6: Error Handling
- Try adding empty task
- See error message
- Try non-existent task ID
- See 404 error

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won't start | Check PostgreSQL running. Check `.env` file. |
| Frontend can't connect | Make sure backend running on port 5000. |
| "Task not found" | Task may have been deleted. Refresh page. |
| Database connection error | Verify database exists and credentials correct. |
| Git push failed | Check username/password. Repository URL correct. |

---

## 📖 Learn From This Code

This project demonstrates:

1. **REST API Design** - Proper endpoints, methods, status codes
2. **MVC Pattern** - Routes, controllers, models separation
3. **Input Validation** - Both client and server-side
4. **Error Handling** - Centralized middleware, user-friendly messages
5. **SQL Security** - Parameterized queries always
6. **Async/Await** - Modern JavaScript patterns
7. **Frontend-Backend** - How they communicate via HTTP
8. **UI/UX** - Professional, responsive design
9. **Database** - Schema design, relationships, querying

Perfect for: Learning backend, APIs, databases, full-stack development!

---

## 🚀 Next Steps

After running the app:

1. **Customize** - Change colors, add your theme
2. **Extend** - Add due dates, categories, priority
3. **Deploy** - Put on Heroku, AWS, or Azure
4. **Test** - Write unit and integration tests
5. **Document** - Create API documentation
6. **Monitor** - Add logging and analytics

---

## 📝 License

This project is provided as-is for educational purposes.

---

## ❓ Need Help?

Check these files:
- `QUICK_START.md` - Common setup issues
- `SETUP_GUIDE.md` - Detailed instructions
- `ARCHITECTURE_DIAGRAMS.md` - Visual explanations
- `server/README.md` - API reference
- `client/README.md` - UI guide

Or check the browser console (F12) for error messages!

---

## 🎉 You're All Set!

**[Go to QUICK_START.md →](./QUICK_START.md)** to get started in 5 minutes!

**Status:** ✅ Ready to use  
**Quality:** Production-ready  
**Learning Value:** Excellent for backend/full-stack learning  
**Real-World Use:** Perfect for personal task management  

---

**Built with ❤️ for backend learners everywhere!**

Or use the file path directly in your browser's address bar:
```
file:///D:/PROJECTS%202026/Daily-Task-App/client/index.html
```

### Step 3: Start Using the App!

- ✍️ Add tasks in the input field
- ✅ Check them off as you complete them
- ✏️ Edit task titles anytime
- 🗑️ Delete tasks you no longer need
- 📊 Watch your statistics update in real-time

---

## 📚 Documentation

### Backend
For API documentation, endpoints, and technical details:
→ See `server/README.md`

### Frontend
For UI features, how to use the app, and troubleshooting:
→ See `client/README.md`

---

## ✨ Features

### What You Get

✅ **Complete Task Management**
- Add, edit, update, and delete tasks
- Mark tasks as complete/incomplete
- View statistics (total, completed, pending)

✅ **Modern, Beautiful UI**
- Clean, professional interface
- Smooth animations and transitions
- Responsive design (works on desktop, tablet, mobile)
- Dark purple gradient theme

✅ **Filter & Organize**
- View all tasks
- Show only pending tasks
- Show only completed tasks
- Tasks sorted by creation date

✅ **Professional Backend**
- RESTful API
- PostgreSQL database
- Parameterized SQL queries (secure)
- Comprehensive error handling
- Async/await patterns

✅ **Production-Ready Code**
- Well-documented code
- Clear separation of concerns
- Scalable architecture
- Error messages for users

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (with animations)
- **Vanilla JavaScript** - Interactivity (no frameworks needed)

No external dependencies on the frontend - pure, fast JavaScript!

---

## 🗄️ Database Schema

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

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server folder:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=your_secure_password
DB_PORT=5432
PORT=5000
```

See `server/.env.example` for a template.

---

## 📝 API Endpoints

The backend provides these endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

See `server/README.md` for detailed API documentation.

---

## 🎨 UI Colors & Design

- **Primary Color**: `#667eea` (Purple)
- **Secondary Color**: `#764ba2` (Dark Purple)
- **Success Color**: `#27ae60` (Green)
- **Error Color**: `#e74c3c` (Red)
- **Background**: Gradient `135deg from #667eea to #764ba2`

---

## 🧪 Testing the API

You can test the backend API using curl commands from PowerShell:

```powershell
# Get all tasks
Invoke-RestMethod -Uri http://localhost:5000/tasks

# Create a task
$body = @{ title = "Buy groceries" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:5000/tasks -Method POST -ContentType "application/json" -Body $body

# Update a task
$body = @{ completed = $true } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:5000/tasks/1 -Method PATCH -ContentType "application/json" -Body $body

# Delete a task
Invoke-RestMethod -Uri http://localhost:5000/tasks/1 -Method DELETE
```

See `server/API_TESTING.bat` for more examples.

---

## 🐛 Troubleshooting

### Server won't start
- Check if PostgreSQL is running
- Verify `.env` file exists with correct credentials
- Run `npm install` to install dependencies

### Frontend can't connect to backend
- Make sure server is running on `http://localhost:5000`
- Check browser console for errors (F12)
- Try refreshing the page

### Database connection error
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure the database and tables exist

### Tasks not appearing
- Check server logs for errors
- Make sure you've created the tasks
- Try refreshing the browser

---

## 📚 Learning Resources

This project demonstrates:

1. **RESTful API Design** - Clean endpoint structure
2. **MVC Pattern** - Separation of concerns
3. **Async/Await** - Modern JavaScript patterns
4. **SQL Security** - Parameterized queries
5. **Frontend-Backend Communication** - Fetch API usage
6. **Error Handling** - Both frontend and backend
7. **UI/UX Design** - Professional interface
8. **Responsive Design** - Mobile-friendly layout

---

## 📦 Installation Requirements

### System Requirements
- Windows 10+ / Mac / Linux
- Node.js v14+ installed
- PostgreSQL database running
- Web browser (Chrome, Firefox, Edge, Safari)

### Node Packages
```json
{
  "dependencies": {
    "express": "^5.2.1",
    "pg": "^8.19.0",
    "dotenv": "^17.3.1"
  }
}
```

---

## 🚀 Next Steps

1. **Customize the theme** - Change colors in `client/style.css`
2. **Add categories** - Extend the database and API
3. **Add authentication** - User login/signup
4. **Add due dates** - Task scheduling
5. **Deploy to cloud** - Heroku, AWS, Azure, etc.

---

## 📄 License

This project is provided as-is for learning purposes.

---

## 🎯 Summary

You now have:
- ✅ A professional backend API with full CRUD functionality
- ✅ A beautiful, responsive frontend UI
- ✅ Clean, well-documented code for learning
- ✅ Proper error handling and validation
- ✅ A real, functional application you can use today

**Start using Daily Task Checklist now!** 🎉

---

**Questions?** Check the README files in both `server/` and `client/` folders for additional documentation.
