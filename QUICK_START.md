# 🚀 Quick Start Guide

Get the Daily Task Checklist running in 5 minutes!

## Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js installed (`node --version`)
- [ ] PostgreSQL installed and running
- [ ] Git installed (`git --version`)
- [ ] A text editor (VS Code, Notepad++)
- [ ] A web browser (Chrome, Firefox, etc.)

---

## Installation & Setup (One-Time)

### 1. Create Database (Open PowerShell)

```powershell
psql -U postgres

# Run in psql prompt:
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

### 2. Configure Backend (.env file)

In the `server` folder, create a `.env` file:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=daily_tasks_db
DB_PASSWORD=postgres
DB_PORT=5432
PORT=5000
```

### 3. Install Dependencies

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\server"
npm install
```

---

## Running the App (Every Time)

### Terminal 1: Start Backend

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\server"
npm start
```

**Keep this running!** You should see:
```
✓ Database connected successfully
✓ Server is running on http://localhost:5000
```

### Terminal 2: Open Frontend

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App\client"
```

**Double-click** `index.html` to open in browser.

---

## Using the App

| Action | How |
|--------|-----|
| **Add Task** | Type in input → Click "Add Task" or press Enter |
| **Complete Task** | Click the checkbox next to task |
| **Edit Task** | Click ✏️ button, edit, and confirm |
| **Delete Task** | Click 🗑️ button and confirm deletion |
| **Filter Tasks** | Click filter buttons: All / Pending / Completed |

---

## Pushing to GitHub

### 1. Go to GitHub

- Visit [github.com](https://github.com)
- Log in to your account
- Click **"+"** → **"New repository"**
- Name: `daily-task-app`
- Click **"Create repository"**

### 2. In PowerShell (Project Root Folder)

```powershell
cd "D:\PROJECTS 2026\Daily-Task-App"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Daily Task Checklist App"

# Replace YOUR_USERNAME with your actual username
git remote add origin https://github.com/YOUR_USERNAME/daily-task-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Done!** Your code is now on GitHub! 🎉

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Server won't start** | Check PostgreSQL is running. Verify `.env` file. |
| **Frontend can't connect** | Make sure backend is running on port 5000. |
| **Database error** | Run the CREATE TABLE commands again. |
| **Git push failed** | Check your GitHub username. Make sure repository exists. |

---

## Next Steps

1. Test all features thoroughly
2. Share your GitHub link with others
3. Add more features (due dates, categories, etc.)
4. Deploy to cloud (Heroku, AWS, Azure)

---

For detailed documentation, see:
- `SETUP_GUIDE.md` - Complete step-by-step setup
- `ARCHITECTURE_DIAGRAMS.md` - Visual workflows and diagrams
- `server/README.md` - Backend API docs
- `client/README.md` - Frontend usage docs

**Enjoy using Daily Task Checklist!** 🎉
