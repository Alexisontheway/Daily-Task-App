# Daily Task Checklist - Frontend

A clean, modern web interface for the Daily Task Checklist API.

## Features

✅ **Add Tasks** - Create new tasks with a simple input  
✅ **Mark Complete** - Check off tasks as you complete them  
✅ **Edit Tasks** - Update task titles at any time  
✅ **Delete Tasks** - Remove tasks you no longer need  
✅ **Filter Tasks** - View All, Pending, or Completed tasks  
✅ **Live Statistics** - See your progress with real-time counters  
✅ **Beautiful UI** - Modern, responsive design that works on mobile and desktop  
✅ **Error Handling** - Clear error messages if something goes wrong  

## Files Structure

```
client/
├── index.html          # Main HTML file - the structure
├── style.css           # Styling - beautiful, responsive design
├── script.js           # JavaScript - all functionality and API calls
└── README.md          # This file
```

## How to Use

### 1. **Open the Application**

Simply open `index.html` in your web browser:
- Double-click `index.html` file, or
- Right-click → Open with → Browser

Or if you're serving it via a web server:
```
http://localhost:3000  (if using a server)
or
file:///D:/PROJECTS 2026/Daily-Task-App/client/index.html  (local file)
```

### 2. **Make Sure the Server is Running**

Open a terminal in the `server` folder and start the backend:
```bash
npm start
```

You should see:
```
✓ Database connected successfully
✓ Server is running on http://localhost:5000
```

### 3. **Use the Application**

**Add a Task:**
- Type a task name in the input field
- Click "Add Task" or press Enter
- The task appears at the top of the list

**Complete a Task:**
- Click the checkbox next to any task
- The task will be marked as completed (strikethrough)
- Statistics update automatically

**Edit a Task:**
- Click the ✏️ edit button
- A prompt appears to edit the title
- Save your changes

**Delete a Task:**
- Click the 🗑️ delete button
- Confirm the deletion
- Task is removed

**Filter Tasks:**
- Use the filter buttons at the top
- **All** - Show all tasks
- **Pending** - Show only incomplete tasks
- **Completed** - Show only completed tasks

### 4. **View Statistics**

At the top of the app, you'll see three boxes showing:
- **Total Tasks** - How many tasks you have in total
- **Completed** - How many tasks you've completed
- **Pending** - How many tasks are still to do

These update in real-time as you work.

## Keyboard Shortcuts

- **Enter** - Add a new task (when focused on input field)

## Responsive Design

The app works perfectly on:
- 💻 Desktop computers
- 📱 Tablets
- 📲 Mobile phones

The layout automatically adjusts based on screen size.

## Error Handling

If something goes wrong:
- An error message appears at the top
- The message shows what went wrong
- It disappears after 3 seconds automatically
- You can always try again

## Features in Detail

### Real-time Updates
When you add, edit, or delete a task, it updates immediately without refreshing the page.

### Beautiful UI
- Modern gradient background (purple theme)
- Smooth animations and transitions
- Clear, readable fonts
- Icons for visual guidance
- Hover effects for better interactivity

### Loading Indicator
When waiting for the server to respond, a spinning loader appears briefly.

### Data Persistence
Your tasks are stored on the server's PostgreSQL database, so they persist even if you close the browser.

## Troubleshooting

### "Cannot access the application"
- Make sure you're opening the file correctly
- Try using a double-click on `index.html`
- Or open it with a right-click → Open With → Browser

### "Failed to load tasks" error
- Check if the server is running (`npm start` in the server folder)
- Make sure the server is on `http://localhost:5000`
- Check your internet connection

### Tasks not saving
- Make sure the backend server is running
- Check that PostgreSQL database is connected
- Look at the server terminal for error messages

### Checkbox not working
- Refresh the page
- Try restarting the server
- Check browser console for errors (F12 → Console)

## Future Enhancements

- 🔐 User authentication (login/signup)
- 📱 PWA support (offline mode)
- 🎨 Dark mode theme
- 📊 Task analytics and charts
- 🏷️ Task categories/tags
- 📅 Due dates and reminders
- 🔔 Email notifications
- 🌐 Mobile app (React Native)

## Getting Help

If you encounter any issues:
1. Check the error message
2. Look at the browser console (F12 → Console tab)
3. Check the server terminal for errors
4. Restart both the server and the browser tab

---

**Enjoy using Daily Task Checklist!** 🎉
