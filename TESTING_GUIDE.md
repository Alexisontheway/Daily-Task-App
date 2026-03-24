# 🧪 COMPLETE TESTING & SETUP GUIDE
## Daily Task App - Full Implementation Testing

---

## 🚀 QUICK START (5 Minutes)

```bash
# 1. Database ready? PostgreSQL running? ✓
# 2. Create /server/.env file with:
DB_USER=postgres
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=postgres
DB_PORT=5432
PORT=5000

# 3. Install and start server
cd server
npm install
npm start

# 4. Open ANOTHER terminal/PowerShell
cd client
python -m http.server 8000

# 5. Browser: http://localhost:8000
```

---

## 📋 PART 1: DATABASE SETUP

### Step 1.1: Verify PostgreSQL is Installed
```powershell
psql --version
# Should show: psql (PostgreSQL) 15.x
```

### Step 1.2: Start PostgreSQL (Windows)
```powershell
# Option A: PowerShell as Administrator
net start postgresql-x64-15

# Option B: Services
# Press Win+R → services.msc → Find PostgreSQL → Right-click → Start
```

**Mac/Linux:**
```bash
brew services start postgresql
sudo systemctl start postgresql
```

### Step 1.3: Create Database
```powershell
# Login to PostgreSQL
psql -U postgres

# Inside psql prompt:
CREATE DATABASE daily_tasks_db;

# Verify created
\l

# Exit
\q
```

---

## 🖥️ PART 2: SERVER SETUP

### Step 2.1: Navigate to Server
```powershell
cd "d:\PROJECTS 2026\Daily-Task-App\server"
```

### Step 2.2: Create .env File
Create file: `server\.env`

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=postgres
DB_PORT=5432
PORT=5000
NODE_ENV=development
```

### Step 2.3: Install Dependencies
```bash
npm install
```

### Step 2.4: Start Server
```bash
npm start
```

**Expected Output:**
```
✓ Database connected successfully
✓ Database schema initialized successfully
✓ Server is running on http://localhost:5000
```

⚠️ **KEEP THIS TERMINAL OPEN!**

---

## 🌐 PART 3: ACCESS FRONTEND

**Open NEW PowerShell Window:**
```powershell
cd "d:\PROJECTS 2026\Daily-Task-App\client"
python -m http.server 8000
```

**Open Browser:**
```
http://localhost:8000
```

**Verify Connection:**
1. Press F12 (DevTools)
2. Go to Console
3. Should show: `API URL: http://localhost:5000`
4. No red errors

---

## ✅ PART 4: 20-POINT TESTING CHECKLIST

### Test 1: Add Basic Task ✓
1. Type: "Buy groceries"
2. Click "Add Task"
3. **Expected**: Task appears, stats update

### Test 2: Add Task with All Fields ✓
1. Title: "Complete project"
2. Description: "Finish quarterly report"
3. Priority: "🔴 High"
4. Due Date: Tomorrow
5. Category: "Work"
6. Click "Add Task"
7. **Expected**: All details visible on card

### Test 3: Toggle Completion ✓
1. Click checkbox on task
2. **Expected**: Strikethrough, completed stat updates
3. Click again
4. **Expected**: Reverts to pending

### Test 4: Search Functionality ✓
1. Create: "Buy milk", "Clean house", "Buy eggs"
2. Search: "buy"
3. **Expected**: Shows 2 tasks
4. Clear search
5. **Expected**: Shows all tasks

### Test 5: Filter by Priority ✓
1. Create tasks with High/Medium/Low priorities
2. Filter: "High Priority"
3. **Expected**: Only high-priority tasks
4. Filter: "All Priorities"
5. **Expected**: All tasks return

### Test 6: Filter by Category ✓
1. Create tasks: "Work", "Personal", "Shopping"
2. Filter: "Work"
3. **Expected**: Shows Work tasks only
4. Category dropdown auto-populates with existing categories

### Test 7: Sort Operations ✓
1. Create tasks on different dates
2. Try each sort:
   - "Newest First" → Most recent first
   - "By Due Date" → By due date
   - "By Priority" → High/Medium/Low order
   - "By Title" → Alphabetical

### Test 8: Quick Filter Buttons ✓
1. Click "Pending" → Shows incomplete tasks
2. Click "Completed" → Shows completed tasks
3. Click "All" → Shows all
4. Click "🔴 High Priority" → High priority pending tasks

### Test 9: Edit Task Modal ✓
1. Click pencil icon (✏️)
2. Modal opens with all fields
3. Change title, description, priority, category, due date
4. Click "Save Changes"
5. **Expected**: Modal closes, updates appear

### Test 10: Delete Task with Confirmation ✓
1. Click trash icon (🗑️)
2. Confirmation dialog
3. Click "OK"
4. **Expected**: Task deleted from list and database
5. Try again, click "Cancel"
6. **Expected**: Nothing happens

### Test 11: Real-time Statistics ✓
1. Add 5 tasks → Total: 5, Pending: 5, Completed: 0
2. Complete 3 → Total: 5, Pending: 2, Completed: 3
3. Delete 1 → Total: 4, Pending: 2, Completed: 2
4. **Expected**: Stats update immediately

### Test 12: Dark Mode Toggle ✓
1. Click moon icon (🌙)
2. **Expected**: Dark background, light text
3. Icon changes to sun (☀️)
4. Refresh page
5. **Expected**: Stays in dark mode (saved)

### Test 13: Keyboard Shortcuts ✓
1. Ctrl+Enter → Adds task (fill form first)
2. Escape → Clears form
3. Ctrl+S → Focuses search bar
4. Tab → Navigate form fields

### Test 14: Clear Form Button ✓
1. Fill all form fields
2. Click "Clear"
3. **Expected**: All fields empty, cursor in title

### Test 15: Mobile Responsive ✓
1. Press F12 → Device toggle (Ctrl+Shift+M)
2. Select "iPhone 12"
3. **Expected**:
   - Layout stacks vertically
   - Touch-friendly buttons
   - No horizontal scrolling
   - All features work

### Test 16: 3D Star Background ✓
1. Observe 300+ stars on black background
2. Move mouse side to side
3. **Expected**: Stars follow parallax effect
4. Stars brighten as they approach camera
5. Connecting lines appear between nearby stars
6. Smooth 60 FPS animation

### Test 17: Empty State Messages ✓
1. Delete all tasks
2. **Expected**: "📝 No tasks yet. Add one to get started!"
3. Create 1 task, complete it
4. Click "Pending"
5. **Expected**: "✨ All tasks completed! Great job!"

### Test 18: Error Handling ✓
1. Try adding empty task
2. **Expected**: "Please enter a task title"
3. Stop server, try adding
4. **Expected**: "Failed to load tasks" error
5. Restart server
6. **Expected**: Works again

### Test 19: Category Auto-Population ✓
1. Create 5 tasks with categories: "Work", "Personal", "Work", "Shopping", "Health"
2. Click category filter dropdown
3. **Expected**: Shows: "Health", "Personal", "Shopping", "Work" (no duplicates, sorted)
4. Add task with new category "Hobbies"
5. Reopen dropdown
6. **Expected**: "Hobbies" appears

### Test 20: Due Date Smart Formatting ✓
1. Create tasks:
   - Due today → Shows "Today"
   - Due tomorrow → Shows "Tomorrow"
   - Due next week → Shows "Mar 30, 2026"
   - Due past → Shows "Mar 20, 2026"

---

## 🔧 PART 5: API TESTING (Advanced)

### Direct Database Check
```powershell
psql -U postgres -d daily_tasks_db

# View all tasks
SELECT * FROM tasks;

# Count by priority
SELECT priority, COUNT(*) FROM tasks GROUP BY priority;

# Exit
\q
```

### API Testing with Curl
```powershell
# GET all tasks
curl http://localhost:5000/tasks

# POST new task
$body = @{
    title = "Test from PowerShell"
    priority = "high"
    category = "Testing"
    description = "API test"
} | ConvertTo-Json

curl -Method POST `
  -Uri http://localhost:5000/tasks `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body

# GET by ID
curl http://localhost:5000/tasks/1

# PATCH update
$updateBody = @{
    completed = $true
    priority = "medium"
} | ConvertTo-Json

curl -Method PATCH `
  -Uri http://localhost:5000/tasks/1 `
  -Headers @{"Content-Type"="application/json"} `
  -Body $updateBody

# DELETE
curl -Method DELETE http://localhost:5000/tasks/1
```

---

## 🐛 PART 6: TROUBLESHOOTING

| Problem | Cause | Fix |
|---------|-------|-----|
| `ERR_INTERNET_DISCONNECTED` | Server not running | Check server terminal |
| `Cannot find module 'pg'` | Missing npm packages | `npm install` |
| `database does not exist` | DB not created | `CREATE DATABASE daily_tasks_db;` |
| `Port 5000 in use` | Another app on port | Change PORT in .env |
| Dark mode doesn't save | localStorage disabled | Try incognito window |
| Styling broken | Cache issue | Ctrl+Shift+Delete to clear cache |
| Tasks don't save | Database error | Check PostgreSQL running |

---

## 📊 PERFORMANCE TESTING

### Stress Test
1. Create 100+ tasks via form or API
2. Search → Should be instant
3. Scroll → Should be smooth 60 FPS
4. Filter → Should be instant
5. Sort → Should be quick
6. **Expected**: No lag, responsive

### Network Throttling
1. DevTools → Network → Slow 3G
2. Add task
3. **Expected**: Spinner shows, task loads in 5-10 seconds

### Multi-Tab Test
1. Open app in 2 browser tabs
2. Tab 1: Add task → Should see
3. Tab 2: Refresh → Should see same task
4. Tab 2: Delete → Task gone
5. Tab 1: Refresh → Task gone in both

---

## ✨ QUICK REFERENCE

### Important Directories
```
d:\PROJECTS 2026\Daily-Task-App\
├── client/          # Frontend HTML, CSS, JS
├── server/          # Backend Node/Express
├── server/.env      # Database credentials
└── README.md        # Project documentation
```

### Important Commands
```bash
# Start server
cd server && npm start

# Start frontend
cd client && python -m http.server 8000

# Check database
psql -U postgres -d daily_tasks_db -c "SELECT * FROM tasks;"

# Stop server
Ctrl+C in server terminal
```

### Important URLs
```
Frontend: http://localhost:8000
API: http://localhost:5000
Database: localhost:5432 (PostgreSQL)
```

### Important Files to Check
- `server/.env` - Database credentials
- `server/index.js` - Server entry point
- `server/controllers/tasksController.js` - API logic
- `client/script.js` - Frontend logic
- `client/style.css` - Styling
- `client/index.html` - HTML structure

---

## 🎯 FINAL CHECKLIST

Before declaring complete:
- ✅ Server starts without errors
- ✅ Frontend loads at localhost:8000
- ✅ API URL shows in console
- ✅ Can add, edit, delete tasks
- ✅ Database saves data
- ✅ Dark mode works
- ✅ Search and filters work
- ✅ Mobile view responsive
- ✅ Star background interactive
- ✅ Keyboard shortcuts work
- ✅ 20 tests all pass

**If all checked → App is ready! 🎉**

---

## 📞 QUICK HELP

**Server won't start?**
```
1. Is PostgreSQL running?
2. Is .env file correct?
3. Are all npm packages installed?
4. Is port 5000 available?
```

**Frontend won't load?**
```
1. Is server running?
2. Is frontend server running (python http.server)?
3. Is browser using http:// not file://?
4. Check console for errors (F12)
```

**Tasks won't save?**
```
1. Check server console for database errors
2. Verify PostgreSQL running and daily_tasks_db exists
3. Check .env credentials
4. Try DELETE query to reset: DELETE FROM tasks;
```

**Need to reset everything?**
```powershell
# 1. Stop server (Ctrl+C)
# 2. Stop client server (Ctrl+C in other terminal)
# 3. Delete all data
psql -U postgres -d daily_tasks_db -c "DELETE FROM tasks;"

# 4. Restart server
npm start

# 5. Restart client
python -m http.server 8000
```

---

**Ready to test? Good luck! 🚀**
